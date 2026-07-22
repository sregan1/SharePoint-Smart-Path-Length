import * as React from 'react';
import {
  makeStyles, tokens, Input, Text, Badge, Spinner, Tooltip, Label, Button,
  Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, DialogTrigger,
} from '@fluentui/react-components';
import {
  ChevronRight16Regular, ChevronDown16Regular,
  Folder24Regular, Document24Regular, Info16Regular,
  ArrowClockwise16Regular, DocumentBulletList16Regular,
} from '@fluentui/react-icons';

import { SharePointService } from '../services/SharePointService';
import { LibraryInfo, PathNode, PathStatus } from '../models/models';
import {
  PathStatusIcon, pathStatusBadgeColor, pathStatusColor, pathStatusDescription, pathStatusLabel,
} from './shared/pathStatus';
import { buildOneDrivePath, defaultSyncFolderName, getPathStatus, worseStatus } from './shared/oneDrivePath';
import { TaskQueue, PathTooLongError } from '../services/sp/spCore';
import { ScannedItem } from '../services/sp/pathExplorer';

const LS_LAST_LIBRARY = 'sp-smart-path-length-lastLibrary';

// Per-site memory of which library the user last opened, so the tree can
// re-expand the same one on their next visit instead of always defaulting
// to the "Documents" library.
function readLastLibraryMap(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(LS_LAST_LIBRARY) ?? '{}');
  } catch {
    return {};
  }
}

function getLastLibrary(siteUrl: string): string | undefined {
  return readLastLibraryMap()[siteUrl];
}

function setLastLibrary(siteUrl: string, libraryServerRelativeUrl: string): void {
  const map = readLastLibraryMap();
  map[siteUrl] = libraryServerRelativeUrl;
  localStorage.setItem(LS_LAST_LIBRARY, JSON.stringify(map));
}

// The out-of-the-box document library is titled "Documents" but its internal
// folder name (and serverRelativeUrl) stays "Shared Documents" even if the
// site is provisioned in another language, so check both.
function isDefaultDocumentsLibrary(lib: LibraryInfo): boolean {
  const folderName = lib.serverRelativeUrl.replace(/[\\/]+$/, '').split('/').pop() ?? '';
  return folderName.toLowerCase() === 'shared documents' || lib.title.trim().toLowerCase() === 'documents';
}

// Caches each library's full background-scan results in sessionStorage, keyed
// by site + library, so re-mounting this component (editing the page toggles
// display mode, which SPFx re-renders for, and can also trigger a full page
// reload) doesn't mean re-running every library's full recursive scan from
// scratch — the single biggest source of the throttling this was causing.
// sessionStorage (not localStorage) so it still self-clears when the tab
// closes rather than serving indefinitely-stale data in some future session;
// the TTL below is a second line of defense for long-lived tabs.
const SCAN_CACHE_PREFIX = 'sp-smart-path-length-scanCache::';
const SCAN_CACHE_TTL_MS = 60 * 60 * 1000;
// Bump this whenever a change could affect what a scan result means (e.g. a
// fix to how failures/over-limit folders get flagged) — otherwise a cached
// result produced by the OLD logic keeps getting trusted for up to an hour
// after the fix ships, silently showing stale (and now-wrong) statuses.
const SCAN_CACHE_VERSION = 2;

// How long a background library scan stands down after the user's last
// tree interaction before starting its next library.
const INTERACTION_QUIET_MS = 1500;

// The library the user is actually looking at gets far more concurrent
// requests than the Settings-configured default (meant for conservative,
// unattended Report-view scans) — nothing else is competing with it (see
// runNextLibraryScan/interruptForPriority), so there's no reason to hold it
// back to the same throttle as a background library.
const PRIORITY_SCAN_CONCURRENCY = 8;

interface CachedScan {
  version: number;
  items: ScannedItem[];
  scannedAt: number;
}

function scanCacheKey(siteUrl: string, libraryRootUrl: string): string {
  return `${SCAN_CACHE_PREFIX}${siteUrl}::${libraryRootUrl}`;
}

function readScanCache(siteUrl: string, libraryRootUrl: string): CachedScan | undefined {
  try {
    const raw = sessionStorage.getItem(scanCacheKey(siteUrl, libraryRootUrl));
    if (!raw) return undefined;
    const parsed: CachedScan = JSON.parse(raw);
    if (parsed.version !== SCAN_CACHE_VERSION) return undefined;
    if (Date.now() - parsed.scannedAt > SCAN_CACHE_TTL_MS) return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

function writeScanCache(siteUrl: string, libraryRootUrl: string, items: ScannedItem[]): void {
  try {
    const entry: CachedScan = { version: SCAN_CACHE_VERSION, items, scannedAt: Date.now() };
    sessionStorage.setItem(scanCacheKey(siteUrl, libraryRootUrl), JSON.stringify(entry));
  } catch {
    // Best-effort — quota exceeded or storage disabled just means no cache;
    // the library still gets scanned live, just every time.
  }
}

function describeAge(at: number): string {
  const minutes = Math.round((Date.now() - at) / 60000);
  if (minutes < 1) return 'just now';
  if (minutes === 1) return '1 min ago';
  return `${minutes} min ago`;
}

// Propagates each loaded node's own status/hasErrorBelow up through its
// ancestors — shared by both loadChildren's success path (new children just
// arrived) and its failure path (a PathTooLongError on a node's own children
// still needs to bubble that node's own now-forced 'error' status upward).
function recomputeBelowStatus(node: PathNode): void {
  let below: 'normal' | 'warning' | 'error' = 'normal';
  for (const c of node.children) {
    below = worseStatus(below, c.status);
    below = worseStatus(below, c.hasErrorBelow ? 'error' : c.hasWarningBelow ? 'warning' : 'normal');
  }
  node.hasWarningBelow = below === 'warning' || below === 'error';
  node.hasErrorBelow = below === 'error';
  if (node.parent) recomputeBelowStatus(node.parent);
}

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', height: '100%' },
  toolbar: {
    display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: tokens.spacingHorizontalL,
    padding: tokens.spacingHorizontalM, borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  field: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS, minWidth: '220px' },
  legend: {
    display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS,
    color: tokens.colorNeutralForeground3, fontSize: tokens.fontSizeBase200,
  },
  iconLegend: {
    display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacingHorizontalL,
    padding: `0 ${tokens.spacingHorizontalM} ${tokens.spacingVerticalS}`,
    color: tokens.colorNeutralForeground3, fontSize: tokens.fontSizeBase200,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  iconLegendItem: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXXS, cursor: 'default' },
  twoCol: {
    display: 'grid', gridTemplateColumns: '340px 1fr', flexGrow: 1, minHeight: 0,
    '@media (max-width: 700px)': { gridTemplateColumns: '1fr' },
  },
  treePanel: {
    overflowY: 'auto', borderRight: `1px solid ${tokens.colorNeutralStroke2}`, padding: tokens.spacingVerticalS,
  },
  detailPanel: { overflowY: 'auto', padding: tokens.spacingHorizontalL },
  row: {
    display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS,
    padding: '4px 6px', borderRadius: tokens.borderRadiusMedium, cursor: 'pointer',
    ':hover': { background: tokens.colorNeutralBackground1Hover },
    ':focus-visible': { outline: `2px solid ${tokens.colorStrokeFocus2}`, outlineOffset: '-2px' },
  },
  rowSelected: { background: tokens.colorBrandBackground2 },
  chevronSpacer: { width: '16px', display: 'inline-block', flexShrink: 0 },
  pathBox: {
    fontFamily: 'Consolas, monospace', fontSize: tokens.fontSizeBase300,
    background: tokens.colorNeutralBackground3, padding: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium, overflowWrap: 'anywhere', marginTop: tokens.spacingVerticalS,
  },
  breakdownTable: { borderCollapse: 'collapse', marginTop: tokens.spacingVerticalM },
});

interface TreeNodeProps {
  node: PathNode;
  depth: number;
  selectedUrl?: string;
  tabbableUrl?: string;
  belowStatusMap: Record<string, PathStatus>;
  scanningLibraries: Set<string>;
  scanInfo: Record<string, { source: 'cache' | 'live'; at: number }>;
  onToggle: (node: PathNode) => void;
  onSelect: (node: PathNode) => void;
  onKeyDown: (e: React.KeyboardEvent, node: PathNode) => void;
  registerRow: (url: string, el: HTMLDivElement | null) => void;
}

const TreeNodeView: React.FC<TreeNodeProps> = ({
  node, depth, selectedUrl, tabbableUrl, belowStatusMap, scanningLibraries, scanInfo, onToggle, onSelect, onKeyDown, registerRow,
}) => {
  const styles = useStyles();
  const isSelected = node.serverRelativeUrl === selectedUrl;
  const canExpand = node.isFolder && node.hasChildren;
  // Combine what the lazy-loaded subtree has already found (hasErrorBelow/
  // hasWarningBelow, populated as folders are expanded) with the background
  // full-library scan's map — the map alone covers folders the user has
  // never expanded, which is what makes the alarm show up on load rather
  // than only after manually drilling down to the offending file.
  const liveBelow = worseStatus(node.hasErrorBelow ? 'error' : 'normal', node.hasWarningBelow ? 'warning' : 'normal');
  const scannedBelow = belowStatusMap[node.serverRelativeUrl] ?? 'normal';
  const below = worseStatus(liveBelow, scannedBelow);
  // The row's main icon reflects ONLY this node's own path length — a
  // folder whose own path is fine never shows red/amber just because
  // something inside it is over the limit. That's what the separate dot
  // (below) is for, so the two questions ("is *this* too long?" vs "is
  // something *inside this* too long?") don't get blurred into one icon.
  const isScanning = node.isFolder && scanningLibraries.has(node.libraryRootUrl);
  const isLibraryRoot = node.libraryRootUrl === node.serverRelativeUrl;
  const rootScanInfo = isLibraryRoot ? scanInfo[node.serverRelativeUrl] : undefined;
  const statusTooltip = rootScanInfo
    ? `${pathStatusDescription(node.status)} (Below-item check: ${rootScanInfo.source === 'cache' ? 'from cache' : 'live scan'}, ${describeAge(rootScanInfo.at)}.)`
    : pathStatusDescription(node.status);

  return (
    <div role="treeitem" aria-expanded={canExpand ? !!node.expanded : undefined} aria-selected={isSelected} aria-level={depth + 1}>
      <div
        ref={(el) => registerRow(node.serverRelativeUrl, el)}
        className={`${styles.row} ${isSelected ? styles.rowSelected : ''}`}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
        tabIndex={node.serverRelativeUrl === tabbableUrl ? 0 : -1}
        onClick={() => { if (canExpand) onToggle(node); onSelect(node); }}
        onKeyDown={(e) => onKeyDown(e, node)}
      >
        {canExpand ? (
          node.expanded
            ? <ChevronDown16Regular style={{ flexShrink: 0 }} />
            : <ChevronRight16Regular style={{ flexShrink: 0 }} />
        ) : <span className={styles.chevronSpacer} />}
        {node.isFolder
          ? <Folder24Regular style={{ flexShrink: 0 }} />
          : <Document24Regular style={{ flexShrink: 0 }} />}
        <Tooltip content={node.name} relationship="description" positioning="below">
          <Text truncate wrap={false} style={{ flexGrow: 1, minWidth: 0 }}>{node.name}</Text>
        </Tooltip>
        {node.isLoading && <Spinner size="extra-tiny" style={{ flexShrink: 0 }} />}
        <Tooltip content={statusTooltip} relationship="label">
          <PathStatusIcon status={node.status} />
        </Tooltip>
        {isScanning && (
          <Tooltip content="Still checking this library for issues below — the dot may not be final yet" relationship="label">
            <Spinner size="extra-tiny" style={{ flexShrink: 0 }} />
          </Tooltip>
        )}
        {below !== 'normal' && (
          <Tooltip content={`Contains an item ${below === 'error' ? 'over the limit' : 'at warning level'} below`} relationship="label">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, background: below === 'error' ? tokens.colorPaletteRedForeground1 : tokens.colorPaletteMarigoldForeground1 }} />
          </Tooltip>
        )}
      </div>
      {node.expanded && node.loadError && (
        <div style={{ paddingLeft: `${(depth + 1) * 16 + 4}px`, color: tokens.colorPaletteRedForeground1, fontSize: tokens.fontSizeBase200 }}>
          {node.loadError}
        </div>
      )}
      {node.expanded && (
        <div role="group">
          {node.children.map((child) => (
            <TreeNodeView
              key={child.serverRelativeUrl}
              node={child}
              depth={depth + 1}
              selectedUrl={selectedUrl}
              tabbableUrl={tabbableUrl}
              belowStatusMap={belowStatusMap}
              scanningLibraries={scanningLibraries}
              scanInfo={scanInfo}
              onToggle={onToggle}
              onSelect={onSelect}
              onKeyDown={onKeyDown}
              registerRow={registerRow}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export interface ExplorerViewProps {
  sp: SharePointService;
  siteUrl: string;
  includeHidden: boolean;
  warningLength: number;
  errorLength: number;
  samplePath: string;
  onSamplePathChange: (value: string) => void;
  isEditMode: boolean;
}

export const ExplorerView: React.FC<ExplorerViewProps> = ({
  sp, siteUrl, includeHidden, warningLength, errorLength, samplePath, onSamplePathChange, isEditMode,
}) => {
  const styles = useStyles();
  const [siteTitle, setSiteTitle] = React.useState('');
  const [libraries, setLibraries] = React.useState<LibraryInfo[] | null>(null);
  const [roots, setRoots] = React.useState<PathNode[]>([]);
  const [syncFolderOverrides, setSyncFolderOverrides] = React.useState<Record<string, string>>({});
  const [selectedNode, setSelectedNode] = React.useState<PathNode | null>(null);
  const [version, setVersion] = React.useState(0);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  // Background full-library scans, so ancestor folders can show an alarm for
  // over-limit descendants immediately on load — not just once the user has
  // manually expanded down to them. Keyed by library serverRelativeUrl.
  const [libraryScans, setLibraryScans] = React.useState<Record<string, ScannedItem[]>>({});
  const [scanningLibraries, setScanningLibraries] = React.useState<Set<string>>(new Set());
  // How each library's current libraryScans entry was obtained and when —
  // surfaced in the UI so it's never ambiguous whether a status came from a
  // fresh check or a possibly-stale cached one.
  const [scanInfo, setScanInfo] = React.useState<Record<string, { source: 'cache' | 'live'; at: number }>>({});
  // A running, timestamped record of scan/load activity — surfaced via the
  // "Activity log" button so scanning/caching/priority behavior is something
  // that can be inspected directly instead of inferred from what the icons
  // happen to show at the moment someone looks.
  const [activityLog, setActivityLog] = React.useState<{ time: number; message: string }[]>([]);
  const [showActivityLog, setShowActivityLog] = React.useState(false);
  const logActivity = React.useCallback((message: string): void => {
    setActivityLog((prev) => {
      const next = [...prev, { time: Date.now(), message }];
      return next.length > 300 ? next.slice(next.length - 300) : next;
    });
  }, []);

  const prefetchQueueRef = React.useRef(new TaskQueue(3));
  // Libraries still waiting for their background scan, in scan order — kept
  // as a plain array (not a TaskQueue) so the currently-expanded library can
  // jump the line via prioritizeLibraryScan below. Scanned one at a time:
  // each fullScanLibrary call already parallelizes internally (via
  // sp.scanConcurrency), so doing more than one library at once would just
  // multiply that concurrency and risk throttling — slower overall, not faster.
  const pendingLibraryScansRef = React.useRef<LibraryInfo[]>([]);
  // The library the user is actually looking at — it scans at full
  // (Settings-configured) concurrency; every other library gets throttled
  // down hard (see runNextLibraryScan) so scanning several large libraries
  // in the background doesn't add up to enough concurrent requests to trip
  // SharePoint's throttling.
  const expandedLibraryUrlRef = React.useRef<string | undefined>();
  // The library (if any) whose fullScanLibrary call is actually in flight
  // right now, and the AbortController scoped to just that one call — lets
  // interruptForPriority below cut a background library's scan short the
  // moment the user expands a *different* library, instead of making them
  // wait for whatever was already running to finish on its own first.
  const activeScanLibraryUrlRef = React.useRef<string | undefined>();
  const activeScanControllerRef = React.useRef<AbortController | undefined>();
  // Guards beginBackgroundScans against running more than once per
  // site/includeHidden load — the gating effect below re-evaluates whenever
  // isEditMode changes, but should only actually kick anything off the first
  // time it finds libraries loaded and not-edit-mode true together.
  const scansStartedRef = React.useRef(false);
  // Mirrors the isEditMode prop for runNextLibraryScan to read — it's a
  // useCallback with a stable identity, so it needs a ref (not the prop
  // directly) to see the *current* value from inside its own recursion.
  const isEditModeRef = React.useRef(isEditMode);
  const isEditModeMountedRef = React.useRef(false);
  React.useEffect(() => {
    isEditModeRef.current = isEditMode;
    if (isEditModeMountedRef.current) {
      logActivity(isEditMode ? 'Page entered edit mode — background scanning paused.' : 'Page left edit mode — background scanning resumes.');
    }
    isEditModeMountedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode]);
  // Last time the user clicked something in the tree — the background
  // scanner shares the same tenant-wide request budget as whatever the user
  // is doing interactively, so it briefly stands down after a click instead
  // of piling more requests on right when the user is waiting on one.
  const lastInteractionRef = React.useRef(0);
  const abortRef = React.useRef<AbortController>();
  const rowRefs = React.useRef(new Map<string, HTMLDivElement>());

  const librariesByUrl = React.useMemo(() => {
    const map: Record<string, LibraryInfo> = {};
    (libraries ?? []).forEach((l) => { map[l.serverRelativeUrl] = l; });
    return map;
  }, [libraries]);

  const getSyncFolderName = React.useCallback((libraryRootUrl: string): string => {
    if (syncFolderOverrides[libraryRootUrl] !== undefined) return syncFolderOverrides[libraryRootUrl];
    const lib = librariesByUrl[libraryRootUrl];
    return lib ? defaultSyncFolderName(siteTitle, lib.title) : libraryRootUrl;
  }, [syncFolderOverrides, librariesByUrl, siteTitle]);

  // Worst status found anywhere below each folder, derived from the
  // background full-library scans — independent of what the lazy tree
  // happens to have expanded/loaded. Recomputed (cheaply, no network calls)
  // whenever a scan lands or anything affecting path length changes.
  const belowStatusMap = React.useMemo(() => {
    const map: Record<string, PathStatus> = {};
    const bump = (url: string, status: PathStatus): void => {
      if (status === 'normal') return;
      map[url] = worseStatus(map[url] ?? 'normal', status);
    };
    for (const lib of libraries ?? []) {
      const items = libraryScans[lib.serverRelativeUrl];
      if (!items) continue;
      const syncFolder = getSyncFolderName(lib.serverRelativeUrl);
      // Folder serverRelativeUrls keyed by their relativeSegments path, so an
      // item's ancestor folders can be found by exact URL rather than by
      // re-joining names (which can mismatch the real URL for names with
      // special characters like & or #).
      const urlBySegments: Record<string, string> = { '': lib.serverRelativeUrl };
      for (const item of items) {
        if (item.isFolder) urlBySegments[item.relativeSegments.join('')] = item.serverRelativeUrl;
        const path = buildOneDrivePath(samplePath, syncFolder, item.relativeSegments);
        let status = getPathStatus(path.length, warningLength, errorLength);
        // SharePoint refusing to enumerate this folder's own contents is
        // either authoritative proof it's over the limit (path too long) or
        // at least proof we can't vouch for what's inside it (any other
        // failure — permissions, a network blip) — either way, don't let it
        // silently read as a clean "OK" it hasn't earned.
        if (item.tooLongToEnumerate) status = 'error';
        else if (item.enumerationFailed && status === 'normal') status = 'warning';
        if (status === 'normal') continue;
        // Bump every ancestor (the library root plus each intermediate
        // folder) — not the item's own node.
        for (let i = 0; i < item.relativeSegments.length; i++) {
          const ancestorUrl = urlBySegments[item.relativeSegments.slice(0, i).join('')];
          if (ancestorUrl) bump(ancestorUrl, status);
        }
        // A folder that couldn't be enumerated has no descendant to point
        // to — flag the folder's own row too, since it can't be expanded to
        // reveal the problem any other way.
        if (item.tooLongToEnumerate || item.enumerationFailed) bump(item.serverRelativeUrl, status);
      }
    }
    return map;
  }, [libraries, libraryScans, getSyncFolderName, samplePath, warningLength, errorLength]);

  const touch = (): void => setVersion((v) => v + 1);

  const computeMetrics = React.useCallback((node: PathNode): void => {
    const syncFolder = getSyncFolderName(node.libraryRootUrl);
    const path = buildOneDrivePath(samplePath, syncFolder, node.relativeSegments);
    node.oneDrivePathLength = path.length;
    node.status = getPathStatus(path.length, warningLength, errorLength);
  }, [getSyncFolderName, samplePath, warningLength, errorLength]);

  // Recompute status/length for every currently-loaded node whenever the sample
  // path, sync-folder overrides, or thresholds change (structure itself is untouched).
  const recomputeAll = React.useCallback((nodes: PathNode[]): void => {
    for (const n of nodes) {
      computeMetrics(n);
      if (n.children.length > 0) recomputeAll(n.children);
    }
  }, [computeMetrics]);

  React.useEffect(() => {
    recomputeAll(roots);
    touch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [samplePath, syncFolderOverrides, warningLength, errorLength, siteTitle]);

  const loadChildren = React.useCallback((node: PathNode, isPrefetch: boolean): Promise<void> => {
    // node.isLoading guards against a second concurrent fetch for the same
    // folder — without it, rapidly toggling a folder open/closed/open (or an
    // in-flight prefetch racing a real expand-click) fires a duplicate request.
    if (node.children.length > 0 || !node.hasChildren || node.isLoading) return Promise.resolve();
    node.isLoading = true;
    if (!isPrefetch) touch();
    return sp.getFolderContents(
      siteUrl,
      { serverRelativeUrl: node.serverRelativeUrl, uniqueId: node.uniqueId },
      abortRef.current?.signal,
      librariesByUrl[node.libraryRootUrl]?.id,
    )
      .then((items) => {
        node.children = items.map((item) => {
          const child: PathNode = {
            name: item.name,
            serverRelativeUrl: item.serverRelativeUrl,
            isFolder: item.isFolder,
            hasChildren: item.hasChildren,
            relativeSegments: [...node.relativeSegments, item.name],
            libraryRootUrl: node.libraryRootUrl,
            uniqueId: item.uniqueId,
            oneDrivePathLength: 0,
            status: 'normal',
            parent: node,
            children: [],
          };
          computeMetrics(child);
          return child;
        });
        node.isLoading = false;
        node.loadError = undefined;

        // Ancestor propagation + one-level-ahead prefetch (bounded), mirroring
        // the Permissions Explorer's hasUniquePermissionsBelow technique.
        recomputeBelowStatus(node);
        touch();

        if (!isPrefetch) {
          for (const child of node.children) {
            if (child.isFolder && child.hasChildren) {
              prefetchQueueRef.current.add(() => loadChildren(child, true));
            }
          }
        }
      })
      .catch((err) => {
        node.isLoading = false;
        // Spelled out so the message is still useful copy-pasted out of the
        // tree (e.g. into a chat or ticket) without needing a screenshot of
        // where it sits in the (possibly scrolled/collapsed) tree.
        const libraryTitle = librariesByUrl[node.libraryRootUrl]?.title ?? node.libraryRootUrl;
        const folderPath = [libraryTitle, ...node.relativeSegments].join(' / ');
        if (err instanceof PathTooLongError) {
          // SharePoint refusing to enumerate this folder — because either
          // its own path, or an item inside it, is too long — is itself
          // proof something here is over the limit, so treat it that way
          // instead of just showing a generic load error. err.message
          // already says which addressing mode was used (see
          // getFolderContents), which pins down which of the two it is.
          node.loadError = `Couldn't list "${folderPath}": ${err.message}`;
          node.status = 'error';
        } else {
          node.loadError = `Couldn't load "${folderPath}": ${err?.message ?? String(err)}`;
          // A folder that failed to load for any other reason (permissions,
          // a network blip) still shouldn't silently keep reading "OK" —
          // treat it as at least a warning, mirroring how the background
          // scan's enumerationFailed flag is handled, rather than leaving it
          // (and everything above it) looking clean when it's really unverified.
          if (node.status === 'normal') node.status = 'warning';
        }
        logActivity(`Interactive load FAILED — "${folderPath}": ${err?.message ?? String(err)}`);
        recomputeBelowStatus(node);
        touch();
      });
  }, [sp, siteUrl, computeMetrics, librariesByUrl, logActivity]);

  // Scans pendingLibraryScansRef one library at a time, recursing until it's
  // empty. Kept as its own function (rather than a TaskQueue) so a library
  // can be reprioritized mid-flight via prioritizeLibraryScan. Pauses
  // (without dropping any pending library) the moment the page enters edit
  // mode — a scan already in flight for one library is left to finish
  // naturally, but no further library is started until the effect below
  // resumes this same queue after the page leaves edit mode again.
  const runNextLibraryScan = React.useCallback(async (controller: AbortController): Promise<void> => {
    if (controller.signal.aborted) return;
    if (isEditModeRef.current) {
      logActivity('Background scanning paused (page is in edit mode) — queue left as-is.');
      return;
    }
    const lib = pendingLibraryScansRef.current.shift();
    if (!lib) return;
    const isPriorityLibrary = lib.serverRelativeUrl === expandedLibraryUrlRef.current;
    if (!isPriorityLibrary) {
      // A background (non-expanded) library is about to start firing
      // requests — if the user just clicked something, give that click a
      // clear runway first rather than immediately competing with it for
      // the same tenant-wide request budget.
      const sinceInteraction = Date.now() - lastInteractionRef.current;
      if (sinceInteraction < INTERACTION_QUIET_MS) {
        const waitMs = INTERACTION_QUIET_MS - sinceInteraction;
        logActivity(`"${lib.title}": waiting ${waitMs}ms for a quiet moment (recent interaction) before starting a background scan.`);
        await new Promise((r) => setTimeout(r, waitMs));
        if (controller.signal.aborted) return;
        if (isEditModeRef.current) {
          pendingLibraryScansRef.current.unshift(lib);
          logActivity(`"${lib.title}": page entered edit mode during the quiet-wait — put back at the front of the queue.`);
          return;
        }
      }
    }
    // Own AbortController per scan (chained to the shared one) so
    // interruptForPriority can cut *this specific* library's scan short
    // without cancelling anything else the component has in flight.
    const scanController = new AbortController();
    if (controller.signal.aborted) return;
    const onOuterAbort = (): void => scanController.abort();
    controller.signal.addEventListener('abort', onOuterAbort);
    activeScanControllerRef.current = scanController;
    activeScanLibraryUrlRef.current = lib.serverRelativeUrl;
    // Only the expanded library gets a large, dedicated concurrency budget —
    // every other one is throttled to fully serial requests, and nothing
    // else competes with the priority library's requests at all (see
    // interruptForPriority), so it can safely run much hotter than the
    // Settings-configured default meant for unattended background use.
    const concurrency = isPriorityLibrary ? PRIORITY_SCAN_CONCURRENCY : 1;
    logActivity(`"${lib.title}": starting ${isPriorityLibrary ? 'PRIORITY' : 'background'} live scan (concurrency ${concurrency}).`);
    const startedAt = Date.now();
    let wasInterrupted = false;
    try {
      const items = await sp.fullScanLibrary(
        siteUrl,
        { serverRelativeUrl: lib.serverRelativeUrl, uniqueId: lib.uniqueId },
        undefined,
        scanController.signal,
        concurrency,
        lib.id,
      );
      // fullScanLibrary swallows per-folder failures internally (including
      // ones caused by aborting mid-flight) and always *resolves* — so an
      // interrupt shows up here as a normal-looking success with a merely
      // truncated `items`, not a rejection. Check the signal explicitly:
      // that partial snapshot must not be cached as if it were the complete
      // picture, or a genuinely over-limit item past the cutoff point could
      // read as "scanned, all clear."
      if (scanController.signal.aborted && !controller.signal.aborted) {
        wasInterrupted = true;
        pendingLibraryScansRef.current.push(lib);
        logActivity(`"${lib.title}": scan interrupted after ${Date.now() - startedAt}ms (preempted by a new priority library) — requeued, not cached.`);
      } else if (!controller.signal.aborted) {
        setLibraryScans((prev) => ({ ...prev, [lib.serverRelativeUrl]: items }));
        setScanInfo((prev) => ({ ...prev, [lib.serverRelativeUrl]: { source: 'live', at: Date.now() } }));
        writeScanCache(siteUrl, lib.serverRelativeUrl, items);
        logActivity(`"${lib.title}": scan complete in ${Date.now() - startedAt}ms — ${items.length} item(s), ${items.filter((i) => i.tooLongToEnumerate).length} unlistable, ${items.filter((i) => i.enumerationFailed).length} failed.`);
      }
    } catch (err: any) {
      // A genuine failure (fullScanLibrary itself doesn't normally reject,
      // but guard against the unexpected) — best-effort: this library's
      // ancestors won't get the early alarm, but the lazy tree still
      // surfaces problems as the user expands into it.
      logActivity(`"${lib.title}": scan threw unexpectedly after ${Date.now() - startedAt}ms — ${err?.message ?? String(err)}`);
    } finally {
      controller.signal.removeEventListener('abort', onOuterAbort);
      if (activeScanLibraryUrlRef.current === lib.serverRelativeUrl) {
        activeScanControllerRef.current = undefined;
        activeScanLibraryUrlRef.current = undefined;
      }
      if (!controller.signal.aborted && !wasInterrupted) {
        setScanningLibraries((prev) => {
          const updated = new Set(prev);
          updated.delete(lib.serverRelativeUrl);
          return updated;
        });
      }
    }
    if (!controller.signal.aborted) await runNextLibraryScan(controller);
  }, [sp, siteUrl, logActivity]);

  // Cuts short whichever library's background scan is currently in flight
  // the moment it stops being the priority — so switching which library
  // you're looking at redirects scanning resources to it immediately,
  // instead of waiting out whatever was already running.
  const interruptForPriority = (newPriorityUrl: string): void => {
    if (activeScanLibraryUrlRef.current && activeScanLibraryUrlRef.current !== newPriorityUrl) {
      const interruptedTitle = librariesByUrl[activeScanLibraryUrlRef.current]?.title ?? activeScanLibraryUrlRef.current;
      const newTitle = librariesByUrl[newPriorityUrl]?.title ?? newPriorityUrl;
      logActivity(`Priority switched to "${newTitle}" — interrupting "${interruptedTitle}"'s in-progress scan.`);
      activeScanControllerRef.current?.abort();
    }
  };

  // Moves a library that's still waiting for its scan to the front of the
  // queue — called when the user expands a library so its alarm (if any)
  // resolves as fast as possible, ahead of libraries they haven't looked at.
  // A no-op if the library is already scanning, already scanned, or unknown.
  const prioritizeLibraryScan = (libraryRootUrl: string): void => {
    const pending = pendingLibraryScansRef.current;
    const idx = pending.findIndex((l) => l.serverRelativeUrl === libraryRootUrl);
    if (idx > 0) {
      const [lib] = pending.splice(idx, 1);
      pending.unshift(lib);
    }
  };

  // Kicks off the background scan pass over a freshly-loaded library list.
  // Every library — cache hit or miss — shows as "scanning" the instant this
  // starts, so the tree never silently presents a checkmark the user hasn't
  // seen get verified this load; a cache hit still skips the network call
  // (that's the whole point — see readScanCache/writeScanCache above), it
  // just resolves on the next tick instead of synchronously, so React
  // actually renders the scanning state for at least a moment first. Split
  // out from the initial-load effect so it can also be deferred until the
  // page leaves edit mode (see the effect below) instead of always firing
  // the moment libraries are fetched.
  const beginBackgroundScans = React.useCallback((libs: LibraryInfo[], controller: AbortController, forceRefresh = false): void => {
    const toScan: LibraryInfo[] = [];
    const cachedScans: Record<string, ScannedItem[]> = {};
    const cachedInfo: Record<string, { source: 'cache'; at: number }> = {};
    for (const lib of libs) {
      const cached = forceRefresh ? undefined : readScanCache(siteUrl, lib.serverRelativeUrl);
      if (cached) {
        cachedScans[lib.serverRelativeUrl] = cached.items;
        cachedInfo[lib.serverRelativeUrl] = { source: 'cache', at: cached.scannedAt };
      } else {
        toScan.push(lib);
      }
    }
    logActivity(
      forceRefresh
        ? `Manual refresh: re-scanning all ${libs.length} librar${libs.length === 1 ? 'y' : 'ies'} live, ignoring cache.`
        : `Background scan pass: ${Object.keys(cachedScans).length} librar${Object.keys(cachedScans).length === 1 ? 'y' : 'ies'} from cache, ${toScan.length} to scan live.`,
    );

    setScanningLibraries(new Set(libs.map((l) => l.serverRelativeUrl)));

    const cachedUrls = Object.keys(cachedScans);
    if (cachedUrls.length > 0) {
      setTimeout(() => {
        if (controller.signal.aborted) return;
        setLibraryScans((prev) => ({ ...prev, ...cachedScans }));
        setScanInfo((prev) => ({ ...prev, ...cachedInfo }));
        setScanningLibraries((prev) => {
          const updated = new Set(prev);
          cachedUrls.forEach((url) => updated.delete(url));
          return updated;
        });
        cachedUrls.forEach((url) => {
          const ageMin = Math.round((Date.now() - cachedInfo[url].at) / 60000);
          logActivity(`"${librariesByUrl[url]?.title ?? url}": applied from cache (checked ${ageMin < 1 ? '<1' : ageMin} min ago).`);
        });
      }, 0);
    }

    const scanOrder = [...toScan];
    const priorityUrl = expandedLibraryUrlRef.current;
    if (priorityUrl) {
      const idx = scanOrder.findIndex((l) => l.serverRelativeUrl === priorityUrl);
      if (idx > 0) scanOrder.unshift(scanOrder.splice(idx, 1)[0]);
    }
    pendingLibraryScansRef.current = scanOrder;
    runNextLibraryScan(controller);
  }, [siteUrl, runNextLibraryScan, logActivity, librariesByUrl]);

  // Defers the background scan pass while the page is in edit mode — editing
  // a page can re-render (or even reload) this web part, and re-running a
  // full recursive scan of every library on every such re-render is exactly
  // what was tripping SharePoint's throttling. Runs once libraries are loaded
  // and the page is back in read mode. If a scan pass was already underway
  // and got paused by entering edit mode (see runNextLibraryScan), leaving
  // edit mode resumes that same queue instead of starting over.
  React.useEffect(() => {
    if (isEditMode || !libraries || libraries.length === 0) return;
    if (!abortRef.current || abortRef.current.signal.aborted) return;
    if (!scansStartedRef.current) {
      scansStartedRef.current = true;
      beginBackgroundScans(libraries, abortRef.current);
    } else if (pendingLibraryScansRef.current.length > 0) {
      runNextLibraryScan(abortRef.current);
    }
  }, [libraries, isEditMode, beginBackgroundScans, runNextLibraryScan]);

  // Initial load: site title + libraries → tree roots.
  React.useEffect(() => {
    setLibraries(null);
    setRoots([]);
    setSelectedNode(null);
    setLoadError(null);
    setLibraryScans({});
    setScanInfo({});
    scansStartedRef.current = false;
    const controller = new AbortController();
    abortRef.current = controller;
    logActivity(`Loading site "${siteUrl}"...`);

    Promise.all([
      sp.getSiteTitle(siteUrl, controller.signal),
      sp.getLibraries(siteUrl, includeHidden, controller.signal),
    ]).then(([title, libs]) => {
      if (controller.signal.aborted) return;
      setSiteTitle(title);
      setLibraries(libs);
      logActivity(`Loaded ${libs.length} librar${libs.length === 1 ? 'y' : 'ies'} for "${title}".`);
      // Computed directly from the just-fetched title/libs rather than via
      // computeMetrics()/getSyncFolderName() — those read librariesByUrl from
      // component state, which still holds the *previous* render's value here
      // (setLibraries above hasn't been committed yet), so they'd resolve to
      // no library match and fall back to the raw URL as the "sync folder
      // name" for one frame until the recomputeAll effect (triggered by the
      // siteTitle change) corrected it.
      const newRoots: PathNode[] = libs.map((lib) => {
        const syncFolder = defaultSyncFolderName(title, lib.title);
        const path = buildOneDrivePath(samplePath, syncFolder, []);
        return {
          name: lib.title,
          serverRelativeUrl: lib.serverRelativeUrl,
          isFolder: true,
          hasChildren: true,
          relativeSegments: [],
          libraryRootUrl: lib.serverRelativeUrl,
          uniqueId: lib.uniqueId,
          oneDrivePathLength: path.length,
          status: getPathStatus(path.length, warningLength, errorLength),
          children: [],
        };
      });

      // Auto-expand the library the user last opened on this site, falling
      // back to the default "Documents" library on a first-ever visit.
      const rememberedUrl = getLastLibrary(siteUrl);
      const defaultLib = libs.find(isDefaultDocumentsLibrary);
      const targetUrl = (rememberedUrl && newRoots.some((r) => r.serverRelativeUrl === rememberedUrl))
        ? rememberedUrl
        : defaultLib?.serverRelativeUrl;
      const autoExpandRoot = newRoots.find((r) => r.serverRelativeUrl === targetUrl);
      if (autoExpandRoot) {
        autoExpandRoot.expanded = true;
        loadChildren(autoExpandRoot, false);
        expandedLibraryUrlRef.current = autoExpandRoot.serverRelativeUrl;
        logActivity(`Auto-expanding "${autoExpandRoot.name}" (${rememberedUrl ? 'last opened' : 'default'}) — set as scan priority.`);
      }

      setRoots(newRoots);
      // The background scan pass itself (cache lookup + kicking off real
      // scans for anything not cached) happens in the effect above, once
      // `libraries` lands here and the page isn't in edit mode.
    }).catch((err) => {
      if (!controller.signal.aborted) setLoadError(err?.message ?? String(err));
    });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteUrl, includeHidden]);

  const handleToggle = (node: PathNode): void => {
    lastInteractionRef.current = Date.now();
    node.expanded = !node.expanded;
    if (node.expanded) {
      loadChildren(node, false);
      if (node.libraryRootUrl === node.serverRelativeUrl) {
        setLastLibrary(siteUrl, node.serverRelativeUrl);
        prioritizeLibraryScan(node.serverRelativeUrl);
        interruptForPriority(node.serverRelativeUrl);
        expandedLibraryUrlRef.current = node.serverRelativeUrl;
        logActivity(`User expanded "${node.name}" — now the scan priority.`);
      }
    }
    touch();
  };

  const handleSelect = (node: PathNode): void => {
    lastInteractionRef.current = Date.now();
    setSelectedNode(node);
  };

  // Forces a live re-check of every library, ignoring the session cache —
  // for when the user wants to know for certain the tree reflects the
  // library's current contents rather than whatever was cached earlier.
  const handleRefreshScans = (): void => {
    if (!libraries || libraries.length === 0 || !abortRef.current || abortRef.current.signal.aborted) return;
    activeScanControllerRef.current?.abort();
    pendingLibraryScansRef.current = [];
    setLibraryScans({});
    setScanInfo({});
    beginBackgroundScans(libraries, abortRef.current, true);
  };

  const registerRow = React.useCallback((url: string, el: HTMLDivElement | null): void => {
    if (el) rowRefs.current.set(url, el);
    else rowRefs.current.delete(url);
  }, []);

  // Moving focus doubles as selecting — this tree has no separate multi-select
  // concept, so "the focused row" and "the selected row" are the same thing.
  const focusNode = (node: PathNode): void => {
    lastInteractionRef.current = Date.now();
    setSelectedNode(node);
    // tabIndex=-1 elements can still receive an explicit focus() call — only
    // sequential Tab navigation skips them — so this doesn't need to wait for
    // the re-render that flips this row's tabIndex to 0.
    rowRefs.current.get(node.serverRelativeUrl)?.focus();
  };

  const flattenVisible = (nodes: PathNode[]): PathNode[] => {
    const out: PathNode[] = [];
    for (const n of nodes) {
      out.push(n);
      if (n.expanded && n.children.length > 0) out.push(...flattenVisible(n.children));
    }
    return out;
  };

  const handleTreeKeyDown = (e: React.KeyboardEvent, node: PathNode): void => {
    lastInteractionRef.current = Date.now();
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const visible = flattenVisible(roots);
        const next = visible[visible.indexOf(node) + 1];
        if (next) focusNode(next);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const visible = flattenVisible(roots);
        const prev = visible[visible.indexOf(node) - 1];
        if (prev) focusNode(prev);
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        if (!node.isFolder || !node.hasChildren) break;
        if (!node.expanded) handleToggle(node);
        else if (node.children.length > 0) focusNode(node.children[0]);
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        if (node.isFolder && node.expanded) handleToggle(node);
        else if (node.parent) focusNode(node.parent);
        break;
      }
      case 'Home': {
        e.preventDefault();
        const visible = flattenVisible(roots);
        if (visible[0]) focusNode(visible[0]);
        break;
      }
      case 'End': {
        e.preventDefault();
        const visible = flattenVisible(roots);
        if (visible.length > 0) focusNode(visible[visible.length - 1]);
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        if (node.isFolder && node.hasChildren) handleToggle(node);
        setSelectedNode(node);
        break;
      }
      default:
        break;
    }
  };

  const selectedSyncFolder = selectedNode ? getSyncFolderName(selectedNode.libraryRootUrl) : '';
  const selectedFullPath = selectedNode ? buildOneDrivePath(samplePath, selectedSyncFolder, selectedNode.relativeSegments) : '';
  const selectedLib = selectedNode ? librariesByUrl[selectedNode.libraryRootUrl] : undefined;
  // Roving tabindex target: the selected row, or the first root so Tab has
  // somewhere to land before anything's been picked yet.
  const tabbableUrl = selectedNode?.serverRelativeUrl ?? roots[0]?.serverRelativeUrl;

  const prefixLen = samplePath.replace(/[\\/]+$/, '').length;
  const relativeLen = selectedNode ? selectedNode.relativeSegments.join('\\').length : 0;
  const selectedBelow = selectedNode
    ? worseStatus(
      worseStatus(selectedNode.hasErrorBelow ? 'error' : 'normal', selectedNode.hasWarningBelow ? 'warning' : 'normal'),
      belowStatusMap[selectedNode.serverRelativeUrl] ?? 'normal',
    )
    : 'normal';

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <div className={styles.field}>
          <Label htmlFor="samplePathInput">Sample OneDrive path prefix</Label>
          <Input id="samplePathInput" value={samplePath} onChange={(_, d) => onSamplePathChange(d.value)}
            placeholder={'C:\\Users\\UsernamePath\\OneDrive - Company\\'} />
        </div>
        {selectedNode && (
          <div className={styles.field}>
            <Label htmlFor="syncFolderInput">Library sync folder name{selectedLib ? ` (${selectedLib.title})` : ''}</Label>
            <Input id="syncFolderInput" value={selectedSyncFolder}
              onChange={(_, d) => setSyncFolderOverrides((prev) => ({ ...prev, [selectedNode.libraryRootUrl]: d.value }))} />
          </div>
        )}
        <div className={styles.legend}>
          <Info16Regular />
          <span>Warning at {warningLength}+ characters, over limit at {errorLength}+ (set in the web part's edit properties)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS, marginLeft: 'auto' }}>
          <Tooltip content="Re-check every library live, ignoring cached results" relationship="label">
            <Button appearance="secondary" icon={<ArrowClockwise16Regular />} onClick={handleRefreshScans}>
              Refresh
            </Button>
          </Tooltip>
          <Button appearance="secondary" icon={<DocumentBulletList16Regular />} onClick={() => setShowActivityLog(true)}>
            Activity log
          </Button>
        </div>
      </div>

      <div className={styles.iconLegend}>
        <Tooltip content={pathStatusDescription('normal')} relationship="description">
          <span className={styles.iconLegendItem}>
            <PathStatusIcon status="normal" />
            <Text size={200}>OK</Text>
          </span>
        </Tooltip>
        <Tooltip content={pathStatusDescription('warning')} relationship="description">
          <span className={styles.iconLegendItem}>
            <PathStatusIcon status="warning" />
            <Text size={200}>Warning</Text>
          </span>
        </Tooltip>
        <Tooltip content={pathStatusDescription('error')} relationship="description">
          <span className={styles.iconLegendItem}>
            <PathStatusIcon status="error" />
            <Text size={200}>Over limit</Text>
          </span>
        </Tooltip>
        <Tooltip content="This library's background scan hasn't finished yet — the dot indicator (not the icon itself) may not be final." relationship="description">
          <span className={styles.iconLegendItem}>
            <Spinner size="extra-tiny" />
            <Text size={200}>Scanning</Text>
          </span>
        </Tooltip>
        <Tooltip content="This folder contains a warning- or over-limit item somewhere inside it, even if its own path is fine — expand it to find which one." relationship="description">
          <span className={styles.iconLegendItem}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: tokens.colorPaletteMarigoldForeground1 }} />
            <Text size={200}>Issue below</Text>
          </span>
        </Tooltip>
      </div>

      <div className={styles.twoCol}>
        <div className={styles.treePanel} role="tree" aria-label="Document libraries">
          {loadError && <Text style={{ color: tokens.colorPaletteRedForeground1 }}>{loadError}</Text>}
          {!loadError && libraries === null && <Spinner label="Loading libraries…" />}
          {!loadError && libraries !== null && libraries.length === 0 && <Text>No document libraries found on this site.</Text>}
          {roots.map((root) => (
            <TreeNodeView
              key={root.serverRelativeUrl}
              node={root}
              depth={0}
              selectedUrl={selectedNode?.serverRelativeUrl}
              tabbableUrl={tabbableUrl}
              belowStatusMap={belowStatusMap}
              scanningLibraries={scanningLibraries}
              scanInfo={scanInfo}
              onToggle={handleToggle}
              onSelect={handleSelect}
              onKeyDown={handleTreeKeyDown}
              registerRow={registerRow}
            />
          ))}
        </div>
        <div className={styles.detailPanel}>
          {!selectedNode && <Text>Select an item in the tree to see its estimated OneDrive path and character count.</Text>}
          {selectedNode && (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                {selectedNode.isFolder ? <Folder24Regular /> : <Document24Regular />}
                <Text weight="semibold" size={500} style={{ overflowWrap: 'anywhere' }}>{selectedNode.name}</Text>
                <Badge color={pathStatusBadgeColor(selectedNode.status)} appearance="filled" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {pathStatusLabel(selectedNode.status)} — {selectedNode.oneDrivePathLength} chars
                </Badge>
              </div>
              {selectedNode.isFolder && selectedBelow !== 'normal' && (
                <Text style={{ display: 'block', marginTop: tokens.spacingVerticalXS, color: pathStatusColor(selectedBelow) }}>
                  Contains an item {selectedBelow === 'error' ? 'over the limit' : 'at warning level'} somewhere below this folder.
                </Text>
              )}
              <div className={styles.pathBox}>{selectedFullPath}</div>
              <table className={styles.breakdownTable}>
                <tbody>
                  <tr><td style={{ paddingRight: 16, color: tokens.colorNeutralForeground3 }}>Sample path prefix</td><td>{prefixLen} chars</td></tr>
                  <tr><td style={{ paddingRight: 16, color: tokens.colorNeutralForeground3 }}>Library sync folder ("{selectedSyncFolder}")</td><td>{selectedSyncFolder.length} chars</td></tr>
                  <tr><td style={{ paddingRight: 16, color: tokens.colorNeutralForeground3 }}>Relative path within library</td><td>{relativeLen} chars</td></tr>
                  <tr><td style={{ paddingRight: 16, fontWeight: tokens.fontWeightSemibold }}>Total (incl. separators)</td><td style={{ fontWeight: tokens.fontWeightSemibold }}>{selectedNode.oneDrivePathLength} chars</td></tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>

      <Dialog open={showActivityLog} onOpenChange={(_, d) => setShowActivityLog(d.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Activity log</DialogTitle>
            <DialogContent>
              <div style={{
                display: 'flex', flexDirection: 'column-reverse', gap: '2px', maxHeight: '50vh', overflowY: 'auto',
                fontFamily: 'Consolas, monospace', fontSize: tokens.fontSizeBase200,
                background: tokens.colorNeutralBackground3, padding: tokens.spacingHorizontalM, borderRadius: tokens.borderRadiusMedium,
              }}
              >
                {activityLog.length === 0 && <Text>Nothing logged yet.</Text>}
                {activityLog.map((entry, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={i} style={{ overflowWrap: 'anywhere' }}>
                    <Text style={{ color: tokens.colorNeutralForeground3 }}>[{new Date(entry.time).toLocaleTimeString()}]</Text> {entry.message}
                  </div>
                ))}
              </div>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setActivityLog([])} disabled={activityLog.length === 0}>Clear</Button>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="primary">Close</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};
