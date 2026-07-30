import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ThrottleController, ThrottleListener, sleep } from './throttle';

// Escape single-quotes in OData string literals (SQL-style doubling).
export function odata(s: string): string {
  return s.replace(/'/g, "''");
}

// API bases for a folder/file addressed by server-relative path. The
// *ByServerRelativePath(decodedUrl=...) forms plus URI-encoding handle names
// containing &, #, % and other characters that break the legacy
// GetFolderByServerRelativeUrl('...') form (& truncates the query string,
// # and % break URL parsing — items in such paths would otherwise silently vanish).
export function folderApi(siteUrl: string, serverRelativeUrl: string): string {
  return `${siteUrl}/_api/web/GetFolderByServerRelativePath(decodedUrl='${encodeURIComponent(odata(serverRelativeUrl))}')`;
}
export function fileApi(siteUrl: string, serverRelativeUrl: string): string {
  return `${siteUrl}/_api/web/GetFileByServerRelativePath(decodedUrl='${encodeURIComponent(odata(serverRelativeUrl))}')`;
}

// Addresses a folder by its SharePoint GUID instead of its server-relative
// path. The URL is a fixed length regardless of how deep/long the folder's
// actual path is, which sidesteps the HTTP 406/414 GetFolderByServerRelativePath
// throws once a path gets too long to embed in a REST URL. Undocumented for
// REST (only CSOM has an official reference), but well-established and in
// active community use with no indication of deprecation.
export function folderApiById(siteUrl: string, uniqueId: string): string {
  return `${siteUrl}/_api/web/GetFolderById('${uniqueId.replace(/[{}]/g, '')}')`;
}

// Single shared work queue with a global concurrency cap. Unlike nested
// runConcurrent pools (which multiply: N workers each spawning N more per
// recursion level), tasks here can enqueue follow-up tasks — e.g. recursive
// folder walks — while total in-flight work stays capped at `concurrency`.
export class TaskQueue {
  private active = 0;
  private pending: (() => Promise<void>)[] = [];
  private idleResolvers: (() => void)[] = [];
  private readonly concurrencyFn: () => number;

  /**
   * `concurrency` may be a function, re-read on every scheduling decision, so a
   * queue that's already running can be squeezed down (or let back up) live by
   * the shared ThrottleController — a fixed value captured at construction
   * would mean an in-flight scan keeps its original concurrency for its entire
   * run no matter how hard the tenant is throttling us.
   */
  constructor(concurrency: number | (() => number)) {
    const read = typeof concurrency === 'function' ? concurrency : () => concurrency;
    // pump()'s loop condition is `active < concurrency` — for a NaN (or
    // <= 0) concurrency that's never true, so the queue would silently
    // accept tasks forever without ever running one, and drain() would
    // never resolve. Callers already try to guard against this upstream,
    // but this is the one place that can make it impossible regardless.
    this.concurrencyFn = () => {
      const value = read();
      return Number.isFinite(value) && value > 0 ? value : 1;
    };
  }

  add(task: () => Promise<void>): void {
    this.pending.push(task);
    this.pump();
  }

  private pump(): void {
    while (this.active < this.concurrencyFn() && this.pending.length > 0) {
      const task = this.pending.shift()!;
      this.active++;
      const onDone = (): void => {
        this.active--;
        this.pump();
        if (this.active === 0 && this.pending.length === 0) {
          this.idleResolvers.splice(0).forEach((resolve) => resolve());
        }
      };
      // Individual task errors don't stop the queue.
      task().then(onDone, onDone);
    }
  }

  drain(): Promise<void> {
    if (this.active === 0 && this.pending.length === 0) return Promise.resolve();
    return new Promise((resolve) => this.idleResolvers.push(resolve));
  }
}

// SharePoint's REST endpoints address a folder/file by embedding its own
// server-relative path in the request URL (see folderApi/fileApi above). Once
// that path gets long enough — which for the "over the limit" folders this
// tool exists to find is exactly when it matters most — SharePoint Online
// rejects the request outright (typically HTTP 406, sometimes 414) rather
// than returning a normal listing. Callers can treat this as authoritative
// proof the path is over the limit, instead of just a failed request.
export class PathTooLongError extends Error {
  constructor(message: string) {
    super(message);
    // This project compiles to ES5 (see tsconfig's target), and TypeScript's
    // ES5 class emit does not correctly wire up the prototype chain for a
    // class extending a built-in like Error — without this line, the error
    // is still thrown and its .message is fine, but `instanceof
    // PathTooLongError` at every catch site silently evaluates to false.
    Object.setPrototypeOf(this, PathTooLongError.prototype);
    this.name = 'PathTooLongError';
  }
}

// Thrown when a request kept being throttled (HTTP 429/503) until the retry
// budget ran out. Distinct from a generic HTTP failure so callers can say
// "we backed off and still couldn't get this" rather than implying the folder
// itself is broken — the data is fine, the tenant is just saturated.
export class ThrottledError extends Error {
  constructor(message: string) {
    super(message);
    // See PathTooLongError above for why this line is required under ES5.
    Object.setPrototypeOf(this, ThrottledError.prototype);
    this.name = 'ThrottledError';
  }
}

// Normalise top-level value arrays: SPO REST returns a direct array with
// odata=nometadata; legacy verbose mode wraps it in { results: [] } or { value: [] }.
export function valueArray(data: any): any[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.value)) return data.value;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}

// Known system/infrastructure library URL suffixes (lowercased, site-relative).
// Checked as a suffix so they match regardless of site path prefix.
export const SYSTEM_LIB_SUFFIXES = [
  '/formservertemplates', // Form Templates
  '/style library',       // Style Library
];

// Returns true if this list entry should be treated as a system/hidden library
// and excluded when includeHidden is false.
export function isSystemLibrary(lib: any): boolean {
  if (lib.IsSiteAssetsLibrary) return true;
  const url = ((lib.RootFolder?.ServerRelativeUrl) ?? '').toLowerCase();
  return SYSTEM_LIB_SUFFIXES.some((s) => url.endsWith(s));
}

// Base templates that behave like document libraries (have Files/Folders and
// can be walked): 101 = Document Library, 109 = Picture Library, 119 = Site Pages.
export const LIBRARY_TEMPLATES = [101, 109, 119];
export function isLibraryTemplate(baseTemplate: number): boolean {
  return LIBRARY_TEMPLATES.indexOf(baseTemplate) !== -1;
}

// Shared API client: SPFx context plus the throttling-aware fetch helpers and
// user-tunable scan concurrency. All sp/ modules take this as their first argument.
export class SpApiClient {
  /**
   * Throttle retries per request. Deliberately generous — each attempt waits at
   * the shared gate (up to 2 min per Retry-After), so this is a "ride out a
   * throttling episode" budget, not a "hammer 8 times" one.
   */
  private static readonly MAX_THROTTLE_ATTEMPTS = 8;

  public readonly context: WebPartContext;
  /** Max concurrent API requests during scans. Settable from Settings. */
  public scanConcurrency = 4;
  /**
   * Shared across every request this client makes, so being throttled on one
   * request pauses and slows down all the others too (see throttle.ts).
   */
  public readonly throttle = new ThrottleController();

  constructor(context: WebPartContext) {
    this.context = context;
  }

  /**
   * Effective concurrency for a caller that would like `requested` — clamped by
   * the shared throttle ceiling. Pass this (as a function) to TaskQueue so an
   * in-flight scan shrinks the moment the tenant starts pushing back.
   */
  public effectiveConcurrency(requested: number): number {
    const wanted = Number.isFinite(requested) && requested > 0 ? requested : 1;
    // Asking is also how the throttle controller learns what the ramp should
    // aim for — the ceiling is derived from real caller demand (ultimately the
    // user's scan-concurrency setting) rather than configured separately.
    this.throttle.noteDemand(wanted);
    return Math.max(1, Math.min(wanted, this.throttle.limit));
  }

  /** Subscribe to throttle/recovery notices (activity log, scan status UI). */
  public onThrottleChange(listener: ThrottleListener): () => void {
    return this.throttle.subscribe(listener);
  }

  /**
   * Retries throttling (HTTP 429/503) and network blips on *separate* budgets:
   * a saturated tenant is a wait-it-out condition, not a broken request, so it
   * gets far more attempts (and honors Retry-After) than a socket failure does.
   * Throttle waits happen at the shared gate, which holds back every other
   * in-flight request too — retrying alone while its siblings keep hammering is
   * what prolongs throttling instead of clearing it.
   *
   * `attempt` seeds the throttle attempt counter; it stays in the signature for
   * existing call sites (which all pass 0).
   */
  public async getJson(url: string, attempt = 0, signal?: AbortSignal): Promise<any> {
    let throttleAttempts = attempt;
    let networkAttempts = 0;
    let resp: SPHttpClientResponse;

    for (;;) {
      // Hold if anything else is currently backing off.
      await this.throttle.waitForGate(signal);
      try {
        // ISPHttpClientOptions extends the standard RequestInit, so a signal
        // here really does abort the underlying fetch — not just skip our own
        // retry loop — letting a cancelled scan stop an in-flight request.
        resp = await this.context.spHttpClient.get(url, SPHttpClient.configurations.v1, signal ? { signal } : undefined);
      } catch (err) {
        if (signal?.aborted || networkAttempts >= 3) throw err;
        const backoff = Math.min(1000 * 2 ** networkAttempts, 8000) + Math.random() * 500;
        networkAttempts++;
        await sleep(backoff, signal);
        continue;
      }

      if (resp.status === 429 || resp.status === 503) {
        // Closes the shared gate and reduces concurrency for everyone, whether
        // or not this particular request has retries left.
        this.throttle.noteThrottled(resp.status, resp.headers.get('Retry-After'));
        if (signal?.aborted) throw new Error('Request cancelled while throttled.');
        if (throttleAttempts >= SpApiClient.MAX_THROTTLE_ATTEMPTS) {
          throw new ThrottledError(
            `SharePoint is throttling this tenant (HTTP ${resp.status}) and kept doing so after `
            + `${SpApiClient.MAX_THROTTLE_ATTEMPTS} backoff attempts. Try again later, or lower the scan `
            + 'concurrency in Settings.',
          );
        }
        throttleAttempts++;
        continue;
      }

      // Non-throttled response: feeds the RateLimit-* decoration headers and
      // the success streak that lets concurrency recover.
      this.throttle.noteResponse(resp.headers, resp.ok);
      break;
    }

    if (resp.status === 406 || resp.status === 414) {
      // Surface SharePoint's actual response body — the theory that this is
      // always a path-length issue is our best guess, not a documented
      // guarantee, and the real message (when present) is the fastest way to
      // confirm or rule that out if this fires for an unrelated reason.
      let detail = '';
      try { detail = (await resp.text()).substring(0, 300); } catch { /* best-effort */ }
      throw new PathTooLongError(
        `SharePoint rejected this request (HTTP ${resp.status}) — usually because the folder's own path (or an item inside it) is too long to address via the REST API.${detail ? ` Detail: ${detail}` : ''}`,
      );
    }
    if (!resp.ok) {
      const txt = await resp.text();
      throw new Error(`HTTP ${resp.status} — ${txt.substring(0, 300)}`);
    }
    return resp.json();
  }

  // Fetches a collection endpoint and follows server-side paging links so
  // results beyond the $top page size are not silently dropped. maxPages is a
  // safety valve against runaway loops on enormous collections.
  public async getJsonPaged(url: string, signal?: AbortSignal, maxPages = 50): Promise<any[]> {
    const all: any[] = [];
    let next: string | undefined = url;
    for (let page = 0; next && page < maxPages && !signal?.aborted; page++) {
      const data = await this.getJson(next, 0, signal);
      all.push(...valueArray(data));
      next = data?.['odata.nextLink'] ?? data?.['@odata.nextLink'] ?? data?.d?.__next;
    }
    return all;
  }

  public async runConcurrent<T>(
    tasks: (() => Promise<T | undefined>)[],
    concurrency = 5,
  ): Promise<(T | undefined)[]> {
    if (tasks.length === 0) return [];
    const results: (T | undefined)[] = new Array(tasks.length);
    let idx = 0;
    const effective = this.effectiveConcurrency(concurrency);
    const worker = async (): Promise<void> => {
      while (idx < tasks.length) {
        const i = idx++;
        try { results[i] = await tasks[i](); }
        catch { results[i] = undefined; }
      }
    };
    await Promise.all(Array.from({ length: Math.min(effective, tasks.length) }, worker));
    return results;
  }
}
