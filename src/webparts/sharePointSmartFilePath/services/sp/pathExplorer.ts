import { SpApiClient, folderApi, TaskQueue } from './spCore';

export interface RawItem {
  name: string;
  serverRelativeUrl: string;
  isFolder: boolean;
  hasChildren: boolean;
}

// Single-level folder listing, used by the lazily-expanding Explorer tree.
export async function getFolderContents(
  client: SpApiClient,
  siteUrl: string,
  folderUrl: string,
  signal?: AbortSignal,
): Promise<RawItem[]> {
  const apiBase = folderApi(siteUrl, folderUrl);
  const [folders, files] = await Promise.all([
    client.getJsonPaged(
      `${apiBase}/Folders?$select=Name,ServerRelativeUrl,ItemCount&$top=2000`,
      signal,
    ),
    client.getJsonPaged(
      `${apiBase}/Files?$select=Name,ServerRelativeUrl&$top=2000`,
      signal,
    ),
  ]);

  const nodes: RawItem[] = [];
  for (const f of folders.filter((f: any) => !f.Name.startsWith('_'))) {
    nodes.push({
      name: f.Name,
      serverRelativeUrl: f.ServerRelativeUrl,
      isFolder: true,
      hasChildren: (f.ItemCount ?? 0) > 0,
    });
  }
  for (const file of files) {
    nodes.push({
      name: file.Name,
      serverRelativeUrl: file.ServerRelativeUrl,
      isFolder: false,
      hasChildren: false,
    });
  }
  return nodes.sort((a, b) => {
    if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

export interface ScannedItem {
  name: string;
  serverRelativeUrl: string;
  isFolder: boolean;
  /** Path segments from the library root down to (and including) this item. */
  relativeSegments: string[];
}

// Recursively walks an entire library (bounded by client.scanConcurrency),
// for the Report view / export — separate from the lazy tree, which only
// ever fetches what the user has actually expanded.
export async function fullScanLibrary(
  client: SpApiClient,
  siteUrl: string,
  libraryRootUrl: string,
  onProgress?: (scanned: number) => void,
  signal?: AbortSignal,
): Promise<ScannedItem[]> {
  const results: ScannedItem[] = [];
  const queue = new TaskQueue(Math.max(1, client.scanConcurrency));
  let scanned = 0;

  const walk = (folderUrl: string, segments: string[]): void => {
    queue.add(async () => {
      if (signal?.aborted) return;
      let items: RawItem[];
      try {
        items = await getFolderContents(client, siteUrl, folderUrl, signal);
      } catch {
        return;
      }
      for (const item of items) {
        const itemSegments = [...segments, item.name];
        results.push({
          name: item.name,
          serverRelativeUrl: item.serverRelativeUrl,
          isFolder: item.isFolder,
          relativeSegments: itemSegments,
        });
        scanned++;
        if (item.isFolder && item.hasChildren) {
          walk(item.serverRelativeUrl, itemSegments);
        }
      }
      onProgress?.(scanned);
    });
  };

  walk(libraryRootUrl, []);
  await queue.drain();
  return results;
}
