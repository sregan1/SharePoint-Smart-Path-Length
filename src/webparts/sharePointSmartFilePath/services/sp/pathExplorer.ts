import {
  SpApiClient, folderApi, folderApiById, TaskQueue, PathTooLongError, odata,
} from './spCore';

// Identifies a folder for listing purposes. uniqueId, when known, is always
// preferred (see folderApiById) — it's what lets a folder several levels
// deep still be listed after its own path has grown too long to address by
// GetFolderByServerRelativePath.
export interface FolderRef {
  serverRelativeUrl: string;
  uniqueId?: string;
}

export interface RawItem {
  name: string;
  serverRelativeUrl: string;
  isFolder: boolean;
  hasChildren: boolean;
  /** Only present for folders — carried forward so a deeper listing can address them by ID. */
  uniqueId?: string;
}

function joinServerRelativeUrl(parentUrl: string, childName: string): string {
  return `${parentUrl.replace(/\/+$/, '')}/${childName}`;
}

function sortRawItems(nodes: RawItem[]): RawItem[] {
  return nodes.sort((a, b) => {
    if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

// Last-resort fallback for a folder that SP.Folder/SP.File navigation can't
// list any other way (see PathTooLongError) — queries the library's
// underlying list items directly instead, filtering by FileDirRef (the
// item's parent-folder path). FileDirRef/FileLeafRef are stored, indexed
// list-item columns populated once when an item is created or moved — they
// aren't resolved/validated live at query time the way SP.Folder/SP.File
// *addressing* is, so this can still enumerate a folder whose own path (or
// a descendant's) is too long for every other approach to even attempt.
// Addresses the library by its list GUID (lists(guid'...')), never by path,
// so this never hits the same problem it exists to route around.
//
// Folder child counts are deliberately NOT requested here — an unverified
// field name failing would break this last-resort path outright, which is
// worse than the minor cost of always showing every folder as expandable
// and letting an actually-empty one just show nothing on expand.
async function getFolderContentsViaListItems(
  client: SpApiClient,
  siteUrl: string,
  listId: string,
  folderServerRelativeUrl: string,
  signal?: AbortSignal,
): Promise<RawItem[]> {
  const filter = `FileDirRef eq '${odata(folderServerRelativeUrl)}'`;
  const url =
    `${siteUrl}/_api/web/lists(guid'${listId}')/items` +
    `?$filter=${encodeURIComponent(filter)}` +
    `&$select=FileLeafRef,FSObjType,UniqueId&$top=2000`;
  const rows = await client.getJsonPaged(url, signal);
  const nodes: RawItem[] = [];
  for (const row of rows) {
    const name: string | undefined = row.FileLeafRef;
    if (!name || name.startsWith('_')) continue;
    const isFolder = Number(row.FSObjType) === 1;
    nodes.push({
      name,
      serverRelativeUrl: joinServerRelativeUrl(folderServerRelativeUrl, name),
      isFolder,
      hasChildren: isFolder,
      uniqueId: isFolder ? row.UniqueId : undefined,
    });
  }
  return sortRawItems(nodes);
}

// Single-level folder listing, used by the lazily-expanding Explorer tree.
// libraryId (the list's GUID) is optional so existing call sites keep
// working without it, but without it a folder that hits PathTooLongError
// has no fallback to try and simply can't be listed.
export async function getFolderContents(
  client: SpApiClient,
  siteUrl: string,
  folder: FolderRef,
  signal?: AbortSignal,
  libraryId?: string,
): Promise<RawItem[]> {
  const addressedById = !!folder.uniqueId;
  const apiBase = addressedById ? folderApiById(siteUrl, folder.uniqueId!) : folderApi(siteUrl, folder.serverRelativeUrl);
  let folders: any[];
  let files: any[];
  try {
    // ServerRelativeUrl is deliberately NOT requested here: it forces
    // SharePoint to compute each item's full absolute path server-side to
    // serialize it, which is exactly the kind of computation that can trip
    // the same internal length guard behind the 406/414 in PathTooLongError
    // — for a child item, regardless of how the *parent* folder itself was
    // addressed. We already know the parent's own path, so each child's is
    // just built client-side from that plus its Name — no server round-trip
    // (or server-side path computation) needed for it at all.
    [folders, files] = await Promise.all([
      client.getJsonPaged(
        `${apiBase}/Folders?$select=Name,ItemCount,UniqueId&$top=2000`,
        signal,
      ),
      client.getJsonPaged(
        `${apiBase}/Files?$select=Name&$top=2000`,
        signal,
      ),
    ]);
  } catch (err) {
    if (err instanceof PathTooLongError && libraryId) {
      try {
        return await getFolderContentsViaListItems(client, siteUrl, libraryId, folder.serverRelativeUrl, signal);
      } catch {
        // The fallback itself failed too — fall through to the original,
        // more informative error rather than the fallback's.
      }
    }
    if (err instanceof PathTooLongError) {
      // Records which addressing mode actually failed — if this still
      // happens when addressedById is true, the folder itself isn't the
      // problem (its URL is a fixed-length GUID); something being listed
      // *inside* it has too long a path for SharePoint to describe in the
      // response, which ID-based addressing can't work around.
      throw new PathTooLongError(
        `${err.message} (addressed by ${addressedById ? 'ID — the problem is likely an item inside this folder, not the folder itself' : 'path — no ID was available for this folder yet'})`,
      );
    }
    throw err;
  }

  const nodes: RawItem[] = [];
  for (const f of folders.filter((f: any) => !f.Name.startsWith('_'))) {
    nodes.push({
      name: f.Name,
      serverRelativeUrl: joinServerRelativeUrl(folder.serverRelativeUrl, f.Name),
      isFolder: true,
      hasChildren: (f.ItemCount ?? 0) > 0,
      uniqueId: f.UniqueId,
    });
  }
  for (const file of files) {
    nodes.push({
      name: file.Name,
      serverRelativeUrl: joinServerRelativeUrl(folder.serverRelativeUrl, file.Name),
      isFolder: false,
      hasChildren: false,
    });
  }
  return sortRawItems(nodes);
}

export interface ScannedItem {
  name: string;
  serverRelativeUrl: string;
  isFolder: boolean;
  /** Path segments from the library root down to (and including) this item. */
  relativeSegments: string[];
  /**
   * True when SharePoint itself refused (HTTP 406/414 — see PathTooLongError)
   * to list this folder's contents because its own server-relative path is
   * too long — authoritative proof it's over the limit, independent of the
   * configured warning/error thresholds.
   */
  tooLongToEnumerate?: boolean;
  /**
   * True when this folder's contents couldn't be listed for some OTHER
   * reason (permission error, transient network failure, etc) — distinct
   * from tooLongToEnumerate. This is NOT proof the folder is over the limit,
   * just that its true contents are unknown, which callers should still
   * surface rather than silently reporting a false "OK" for it.
   */
  enumerationFailed?: boolean;
}

// Recursively walks an entire library (bounded by client.scanConcurrency, or
// by concurrencyOverride when the caller wants this specific call throttled
// differently — e.g. the Explorer's background scanner runs the library the
// user is actually looking at at full speed but every other library nearly
// serially, to avoid piling enough concurrent requests onto a large tenant
// to trip SharePoint's throttling), for the Report view / export — separate
// from the lazy tree, which only ever fetches what the user has expanded.
export async function fullScanLibrary(
  client: SpApiClient,
  siteUrl: string,
  libraryRoot: FolderRef,
  onProgress?: (scanned: number) => void,
  signal?: AbortSignal,
  concurrencyOverride?: number,
  libraryId?: string,
): Promise<ScannedItem[]> {
  const results: ScannedItem[] = [];
  const resultByUrl = new Map<string, ScannedItem>();
  const queue = new TaskQueue(Math.max(1, concurrencyOverride ?? client.scanConcurrency));
  let scanned = 0;

  const walk = (folder: FolderRef, segments: string[]): void => {
    queue.add(async () => {
      if (signal?.aborted) return;
      let items: RawItem[];
      try {
        items = await getFolderContents(client, siteUrl, folder, signal, libraryId);
      } catch (err) {
        // A folder that SharePoint itself refuses to enumerate because its
        // own path is too long is exactly the case this scan exists to find
        // — flag the (already-recorded, from its parent's listing) entry for
        // it. Any OTHER failure (permission error, transient network issue)
        // still gets flagged too, just differently — the scan silently
        // treating an unknown subtree as "nothing to see here" would produce
        // a false-clean report, which is worse than surfacing "couldn't
        // verify this one." With uniqueId-based addressing, too-long-path
        // failures below the library root should now be rare — folders are
        // only ever addressed by path if their own UniqueId somehow wasn't
        // available from their parent's listing.
        const entry = resultByUrl.get(folder.serverRelativeUrl);
        if (entry) {
          if (err instanceof PathTooLongError) entry.tooLongToEnumerate = true;
          else entry.enumerationFailed = true;
        }
        return;
      }
      for (const item of items) {
        const itemSegments = [...segments, item.name];
        const scannedItem: ScannedItem = {
          name: item.name,
          serverRelativeUrl: item.serverRelativeUrl,
          isFolder: item.isFolder,
          relativeSegments: itemSegments,
        };
        results.push(scannedItem);
        resultByUrl.set(item.serverRelativeUrl, scannedItem);
        scanned++;
        if (item.isFolder && item.hasChildren) {
          walk({ serverRelativeUrl: item.serverRelativeUrl, uniqueId: item.uniqueId }, itemSegments);
        }
      }
      onProgress?.(scanned);
    });
  };

  walk(libraryRoot, []);
  await queue.drain();
  return results;
}
