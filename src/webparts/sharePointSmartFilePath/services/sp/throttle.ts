// Tenant-wide throttling is a *shared* condition, not a per-request one: when
// SharePoint returns HTTP 429 for one request it is telling us the whole client
// is over budget, so retrying just that one request while the other N in-flight
// ones keep hammering is what turns a brief throttle into a sustained one (and
// eventually a 503 / "resource unavailable" block for the whole app).
//
// This controller is the single shared place that knows we're being throttled.
// Every request goes through its gate, so one 429 pauses *all* traffic, and the
// concurrency allowance every scan queue reads from is adjusted here.
//
// The allowance follows a slow-start / congestion-avoidance shape borrowed from
// TCP, with one deliberate difference. TCP probes upward until it drops a
// packet, because overshooting costs it a private retransmit. Overshooting here
// draws down a request budget shared with every other consumer on the tenant
// (OneDrive sync, Outlook, Teams, other web parts, other users), and SharePoint
// escalates repeated 429s into longer waits, 503s and eventually app-level
// blocking — so provoking a throttle to discover the limit is not a measurement
// we're entitled to take. Instead:
//
//   * Start low and ramp up fast (doubling) while no throttling has ever been
//     seen — a first scan on a throttled tenant must not charge straight in at
//     full concurrency, but on a healthy tenant additive-only growth would take
//     hundreds of requests to reach a useful rate.
//   * The first throttle (or a near-limit warning from the RateLimit-* headers)
//     records the edge: the allowance that provoked it. Growth switches to
//     one-step-at-a-time from then on, and never returns to the level that
//     failed — recovery approaches the limit from below instead of rediscovering
//     it by breaching it again.
//   * Where the tenant sends the RateLimit-* decoration headers, a draining
//     budget stops the ramp *before* any 429 arrives — reaching the limit
//     without crossing it.

/** Absolute sanity bound; the working ceiling is learned from callers' demand. */
export const HARD_MAX_CONCURRENCY = 12;
const MIN_CONCURRENCY = 1;

/**
 * Where the ramp begins. Low enough that a first scan on an already-saturated
 * tenant doesn't open with a burst, high enough not to feel broken.
 */
const SLOW_START_INITIAL_LIMIT = 2;

/** Backoff used when SharePoint throttles us without a Retry-After header. */
const FIRST_BACKOFF_MS = 2000;
const MAX_BACKOFF_MS = 120000;
/**
 * Retry-After is authoritative and honored as given, but capped: SharePoint can
 * ask for several minutes, and a scan that silently freezes for that long is
 * indistinguishable from a hung web part. The retry loop gives up (surfacing a
 * ThrottledError) rather than waiting past this.
 */
const RETRY_AFTER_CAP_MS = 120000;

/** Throttles closer together than this are treated as one escalating episode. */
const THROTTLE_EPISODE_MS = 60000;
/** Clean requests needed per doubling while still in slow start. */
const SLOW_START_SUCCESSES_PER_STEP = 8;
/** Clean requests needed per +1 step once the edge is known. */
const SUCCESSES_PER_RECOVERY_STEP = 25;
/** ...and how long since the last throttle before recovery may start at all. */
const RECOVERY_QUIET_MS = 15000;

/**
 * Fraction of the tenant's per-app request budget left (from the RateLimit-*
 * decoration headers, when the tenant sends them) below which we back off
 * *before* being throttled — the cheapest throttle is the one that never fires.
 */
const PROACTIVE_REMAINING_FRACTION = 0.15;
const PROACTIVE_PAUSE_MS = 5000;

export interface ThrottleSnapshot {
  /** Current concurrency allowance — callers use min(their own budget, this). */
  limit: number;
  /** What the allowance is currently ramping toward. */
  target: number;
  /** Total 429/503 responses seen this session. */
  throttleEvents: number;
  /** ms until the shared gate opens again (0 when not backing off). */
  waitMsRemaining: number;
  /** True while still ramping up having never been throttled. */
  slowStart: boolean;
  /** True when throttling (not merely the initial ramp) is holding us back. */
  reduced: boolean;
}

export type ThrottleListener = (snapshot: ThrottleSnapshot, message: string) => void;

/** setTimeout as an awaitable, resolving early (not rejecting) if aborted. */
export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise<void>((resolve) => {
    if (signal?.aborted || ms <= 0) { resolve(); return; }
    let timer: ReturnType<typeof setTimeout>;
    const finish = (): void => {
      clearTimeout(timer);
      signal?.removeEventListener('abort', finish);
      resolve();
    };
    timer = setTimeout(finish, ms);
    signal?.addEventListener('abort', finish);
  });
}

export class ThrottleController {
  /** Current allowance. Starts low — see the slow-start note above. */
  private limitValue = SLOW_START_INITIAL_LIMIT;
  /**
   * Highest concurrency any caller has actually asked for, learned from
   * noteDemand rather than configured separately. This is what makes the
   * user's existing "concurrent requests during a full scan" setting also the
   * recovery target: a ceiling above the largest real request would make the
   * first halving a no-op (min(4, 6) is still 4), so throttling would have to
   * happen twice before the scan actually slowed down.
   */
  private ceiling = SLOW_START_INITIAL_LIMIT;
  /**
   * The allowance that provoked throttling, once we've seen it. Recovery stops
   * one below this, so the level known to fail is never reattempted.
   * Monotonically non-increasing: a lower edge always wins.
   */
  private edge: number | undefined;
  private slowStartPhase = true;
  /** Timestamp until which *all* requests are held. */
  private gateUntil = 0;
  private throttleEventCount = 0;
  private lastThrottleAt = 0;
  private episodeCount = 0;
  private consecutiveOk = 0;
  private listeners: ThrottleListener[] = [];

  public get limit(): number {
    return this.limitValue;
  }

  public get throttleEvents(): number {
    return this.throttleEventCount;
  }

  /** What the allowance may grow to: caller demand, capped below any known edge. */
  private target(): number {
    const edgeCap = this.edge === undefined ? HARD_MAX_CONCURRENCY : Math.max(MIN_CONCURRENCY, this.edge - 1);
    return Math.max(MIN_CONCURRENCY, Math.min(this.ceiling, edgeCap));
  }

  /**
   * Records that a caller would like `requested` concurrency, which is what
   * raises the ceiling the ramp aims for. Called on every scheduling decision,
   * so it must stay cheap and must not itself change the current allowance.
   */
  public noteDemand(requested: number): void {
    if (!Number.isFinite(requested) || requested <= 0) return;
    this.ceiling = Math.max(this.ceiling, Math.min(Math.floor(requested), HARD_MAX_CONCURRENCY));
  }

  public snapshot(): ThrottleSnapshot {
    const waitMsRemaining = Math.max(0, this.gateUntil - Date.now());
    const target = this.target();
    return {
      limit: this.limitValue,
      target,
      throttleEvents: this.throttleEventCount,
      waitMsRemaining,
      slowStart: this.slowStartPhase,
      reduced: this.throttleEventCount > 0 && this.limitValue < this.ceiling,
    };
  }

  /** Subscribe to throttle/recovery notices (for the activity log and status UI). */
  public subscribe(listener: ThrottleListener): () => void {
    this.listeners.push(listener);
    return () => {
      const i = this.listeners.indexOf(listener);
      if (i !== -1) this.listeners.splice(i, 1);
    };
  }

  private notify(message: string): void {
    const snap = this.snapshot();
    // A listener throwing must never break the request that reported the
    // throttle — it would turn a recoverable slowdown into a failed scan.
    this.listeners.slice().forEach((l) => {
      try { l(snap, message); } catch { /* best-effort telemetry */ }
    });
  }

  /**
   * Held by every request before it goes out. Loops rather than sleeping once,
   * because another request being throttled while we wait pushes the gate
   * further out — and honoring that is the entire point of a shared gate.
   */
  public async waitForGate(signal?: AbortSignal): Promise<void> {
    for (;;) {
      const remaining = this.gateUntil - Date.now();
      if (remaining <= 0 || signal?.aborted) return;
      // Capped per iteration so a later extension is picked up promptly and a
      // cancelled scan doesn't sit inside one enormous timer.
      await sleep(Math.min(remaining, 1000), signal);
    }
  }

  /**
   * Marks the allowance that just proved too high, ending slow start. Returns
   * the new allowance after halving.
   */
  private recordEdge(): number {
    this.edge = this.edge === undefined ? this.limitValue : Math.min(this.edge, this.limitValue);
    this.slowStartPhase = false;
    this.consecutiveOk = 0;
    this.limitValue = Math.max(MIN_CONCURRENCY, Math.min(this.limitValue, this.target(), Math.floor(this.limitValue / 2)));
    return this.limitValue;
  }

  /**
   * Records a 429/503. Returns the ms the shared gate is now closed for, so the
   * caller can log it; the caller waits by calling waitForGate again.
   */
  public noteThrottled(status: number, retryAfterHeader: string | null): number {
    const now = Date.now();
    this.episodeCount = now - this.lastThrottleAt < THROTTLE_EPISODE_MS ? this.episodeCount + 1 : 1;
    this.lastThrottleAt = now;
    this.throttleEventCount++;

    const retryAfterSec = parseInt(retryAfterHeader ?? '', 10);
    const honored = Number.isFinite(retryAfterSec) && retryAfterSec > 0;
    const base = honored
      ? Math.min(retryAfterSec * 1000, RETRY_AFTER_CAP_MS)
      : Math.min(FIRST_BACKOFF_MS * Math.pow(2, this.episodeCount - 1), MAX_BACKOFF_MS);
    // Jitter so the concurrent requests released when the gate opens don't all
    // fire on the same millisecond and immediately re-trip the throttle.
    const waitMs = base + Math.random() * Math.min(2000, base * 0.2 + 250);
    this.gateUntil = Math.max(this.gateUntil, now + waitMs);

    const before = this.limitValue;
    const after = this.recordEdge();
    this.notify(
      `Throttled by SharePoint (HTTP ${status}) — pausing all requests for ${Math.round(waitMs / 100) / 10}s`
      + `${honored ? ` (Retry-After: ${retryAfterSec}s)` : ' (no Retry-After header — using exponential backoff)'}`
      + `${before !== after ? `, concurrency ${before} → ${after}` : `, concurrency already at ${after}`}`
      + `. Will not go back above ${this.target()} (concurrency ${this.edge} is now known to throttle).`,
    );
    return waitMs;
  }

  /**
   * Records a response that wasn't throttled. Reads the RateLimit-* decoration
   * headers (sent by tenants that have them enabled) to stop the ramp *before*
   * hitting the limit, and otherwise counts toward growing the allowance.
   */
  public noteResponse(headers: { get(name: string): string | null }, ok: boolean): void {
    const remaining = parseFloat(headers.get('RateLimit-Remaining') ?? '');
    const limitHeader = parseFloat(headers.get('RateLimit-Limit') ?? '');
    if (Number.isFinite(remaining) && Number.isFinite(limitHeader) && limitHeader > 0
      && remaining / limitHeader <= PROACTIVE_REMAINING_FRACTION) {
      // The budget is draining. This is the ramp-stop we actually want: it
      // marks the edge without ever having crossed it.
      const before = this.limitValue;
      const after = this.recordEdge();
      this.gateUntil = Math.max(this.gateUntil, Date.now() + PROACTIVE_PAUSE_MS);
      this.notify(
        `Approaching the tenant request limit (${remaining} of ${limitHeader} left) — `
        + `pausing ${PROACTIVE_PAUSE_MS / 1000}s and reducing concurrency ${before} → ${after} before being throttled. `
        + `Ramp stops at ${this.target()} from here.`,
      );
      return;
    }
    if (!ok) return;

    this.consecutiveOk++;
    const target = this.target();
    if (this.limitValue >= target) return;
    const needed = this.slowStartPhase ? SLOW_START_SUCCESSES_PER_STEP : SUCCESSES_PER_RECOVERY_STEP;
    if (this.consecutiveOk < needed) return;
    // Only relevant once throttling has actually happened — in slow start
    // lastThrottleAt is still 0, so this never blocks the initial ramp.
    if (!this.slowStartPhase && Date.now() - this.lastThrottleAt < RECOVERY_QUIET_MS) return;

    this.consecutiveOk = 0;
    const before = this.limitValue;
    // Doubling while nothing has ever pushed back (reaching a useful rate in a
    // few steps instead of a few hundred requests); single steps once the edge
    // is known, so we creep toward it rather than jumping onto it.
    const next = this.slowStartPhase ? this.limitValue * 2 : this.limitValue + 1;
    this.limitValue = Math.min(target, next);
    this.notify(
      this.slowStartPhase
        ? `No throttling seen — ramping concurrency ${before} → ${this.limitValue} (target ${target}).`
        : `Recovering after ${needed} clean requests — concurrency ${before} → ${this.limitValue} (will not exceed ${target}).`,
    );
  }
}
