import { LibraryInfo } from '../../models/models';
import { SpApiClient, isSystemLibrary } from './spCore';

export async function getSiteTitle(client: SpApiClient, siteUrl: string, signal?: AbortSignal): Promise<string> {
  const data = await client.getJson(`${siteUrl}/_api/web?$select=Title`, 0, signal);
  return data?.Title ?? siteUrl;
}

export async function getLibraries(
  client: SpApiClient,
  siteUrl: string,
  includeHidden = false,
  signal?: AbortSignal,
): Promise<LibraryInfo[]> {
  // Library-like templates only (the tree/scan need Files/Folders semantics).
  // IsSiteAssetsLibrary is filtered client-side because it is not reliably
  // filterable via OData across all SPO tenants.
  const baseFilter = '(BaseTemplate eq 101 or BaseTemplate eq 109 or BaseTemplate eq 119)';
  const filter = includeHidden ? baseFilter : `${baseFilter} and Hidden eq false`;
  const url =
    `${siteUrl}/_api/web/lists` +
    `?$filter=${encodeURIComponent(filter)}` +
    `&$select=Id,Title,RootFolder/ServerRelativeUrl,RootFolder/UniqueId,NoCrawl,IsSiteAssetsLibrary` +
    `&$expand=RootFolder&$orderby=Title&$top=500`;
  const libs = await client.getJsonPaged(url, signal);
  return libs
    .filter((l: any) => includeHidden || !isSystemLibrary(l))
    .map((l: any) => ({
      title: l.Title,
      serverRelativeUrl: l.RootFolder?.ServerRelativeUrl ?? '',
      uniqueId: l.RootFolder?.UniqueId,
      id: l.Id,
      noCrawl: !!l.NoCrawl || undefined,
    }));
}
