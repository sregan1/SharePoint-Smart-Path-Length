import { WebPartContext } from '@microsoft/sp-webpart-base';
import { LibraryInfo } from '../models/models';
import { SpApiClient } from './sp/spCore';
import { ThrottleSnapshot, ThrottleListener } from './sp/throttle';
import { getSiteTitle, getLibraries } from './sp/siteDiscovery';
import {
  getFolderContents, fullScanLibrary, FolderRef, RawItem, ScannedItem,
} from './sp/pathExplorer';

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

  /**
   * Live view of the shared throttling state — how hard SharePoint is currently
   * pushing back, and the concurrency ceiling every scan is being held to
   * because of it.
   */
  public throttleSnapshot(): ThrottleSnapshot {
    return this.client.throttle.snapshot();
  }

  /** Subscribe to throttle/recovery notices. Returns an unsubscribe function. */
  public onThrottleChange(listener: ThrottleListener): () => void {
    return this.client.onThrottleChange(listener);
  }

  /** Concurrency a caller will actually get for `requested`, after clamping. */
  public effectiveConcurrency(requested: number): number {
    return this.client.effectiveConcurrency(requested);
  }

  getSiteTitle(siteUrl: string, signal?: AbortSignal): Promise<string> {
    return getSiteTitle(this.client, siteUrl, signal);
  }

  getLibraries(siteUrl: string, includeHidden: boolean, signal?: AbortSignal): Promise<LibraryInfo[]> {
    return getLibraries(this.client, siteUrl, includeHidden, signal);
  }

  getFolderContents(siteUrl: string, folder: FolderRef, signal?: AbortSignal, libraryId?: string): Promise<RawItem[]> {
    return getFolderContents(this.client, siteUrl, folder, signal, libraryId);
  }

  fullScanLibrary(
    siteUrl: string,
    libraryRoot: FolderRef,
    onProgress?: (scanned: number) => void,
    signal?: AbortSignal,
    concurrencyOverride?: number,
    libraryId?: string,
  ): Promise<ScannedItem[]> {
    return fullScanLibrary(this.client, siteUrl, libraryRoot, onProgress, signal, concurrencyOverride, libraryId);
  }
}
