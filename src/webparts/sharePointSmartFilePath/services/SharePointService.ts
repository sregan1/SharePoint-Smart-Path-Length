import { WebPartContext } from '@microsoft/sp-webpart-base';
import { LibraryInfo } from '../models/models';
import { SpApiClient } from './sp/spCore';
import { getSiteTitle, getLibraries } from './sp/siteDiscovery';
import { getFolderContents, fullScanLibrary, RawItem, ScannedItem } from './sp/pathExplorer';

export class SharePointService {
  private readonly client: SpApiClient;

  constructor(context: WebPartContext) {
    this.client = new SpApiClient(context);
  }

  public get scanConcurrency(): number {
    return this.client.scanConcurrency;
  }
  public set scanConcurrency(value: number) {
    this.client.scanConcurrency = value;
  }

  getSiteTitle(siteUrl: string, signal?: AbortSignal): Promise<string> {
    return getSiteTitle(this.client, siteUrl, signal);
  }

  getLibraries(siteUrl: string, includeHidden: boolean, signal?: AbortSignal): Promise<LibraryInfo[]> {
    return getLibraries(this.client, siteUrl, includeHidden, signal);
  }

  getFolderContents(siteUrl: string, folderUrl: string, signal?: AbortSignal): Promise<RawItem[]> {
    return getFolderContents(this.client, siteUrl, folderUrl, signal);
  }

  fullScanLibrary(
    siteUrl: string,
    libraryRootUrl: string,
    onProgress?: (scanned: number) => void,
    signal?: AbortSignal,
  ): Promise<ScannedItem[]> {
    return fullScanLibrary(this.client, siteUrl, libraryRootUrl, onProgress, signal);
  }
}
