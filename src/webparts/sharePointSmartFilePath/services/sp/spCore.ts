import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

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

// Single shared work queue with a global concurrency cap. Unlike nested
// runConcurrent pools (which multiply: N workers each spawning N more per
// recursion level), tasks here can enqueue follow-up tasks — e.g. recursive
// folder walks — while total in-flight work stays capped at `concurrency`.
export class TaskQueue {
  private active = 0;
  private pending: (() => Promise<void>)[] = [];
  private idleResolvers: (() => void)[] = [];

  constructor(private readonly concurrency: number) {}

  add(task: () => Promise<void>): void {
    this.pending.push(task);
    this.pump();
  }

  private pump(): void {
    while (this.active < this.concurrency && this.pending.length > 0) {
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
  public readonly context: WebPartContext;
  /** Max concurrent API requests during scans. Settable from Settings. */
  public scanConcurrency = 4;

  constructor(context: WebPartContext) {
    this.context = context;
  }

  // Retries on 429/503 using the Retry-After header, and on thrown/rejected
  // errors (network blips) using capped exponential backoff with jitter —
  // both share the same 3-attempt cap.
  public async getJson(url: string, attempt = 0, signal?: AbortSignal): Promise<any> {
    let resp: SPHttpClientResponse;
    try {
      // ISPHttpClientOptions extends the standard RequestInit, so a signal
      // here really does abort the underlying fetch — not just skip our own
      // retry loop — letting a cancelled scan stop an in-flight request.
      resp = await this.context.spHttpClient.get(url, SPHttpClient.configurations.v1, signal ? { signal } : undefined);
    } catch (err) {
      if (signal?.aborted || attempt >= 3) throw err;
      const backoff = Math.min(1000 * 2 ** attempt, 8000) + Math.random() * 500;
      await new Promise((r) => setTimeout(r, backoff));
      return this.getJson(url, attempt + 1, signal);
    }
    if ((resp.status === 429 || resp.status === 503) && attempt < 3) {
      const retryAfter = parseInt(resp.headers.get('Retry-After') ?? '10', 10);
      await new Promise((r) => setTimeout(r, (isNaN(retryAfter) ? 10 : retryAfter) * 1000));
      return this.getJson(url, attempt + 1, signal);
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
    const worker = async (): Promise<void> => {
      while (idx < tasks.length) {
        const i = idx++;
        try { results[i] = await tasks[i](); }
        catch { results[i] = undefined; }
      }
    };
    await Promise.all(Array.from({ length: Math.min(concurrency, tasks.length) }, worker));
    return results;
  }
}
