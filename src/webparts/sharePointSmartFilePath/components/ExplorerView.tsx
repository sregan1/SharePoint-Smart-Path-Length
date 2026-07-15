import * as React from 'react';
import {
  makeStyles, tokens, Input, Text, Badge, Spinner, Tooltip, Label,
} from '@fluentui/react-components';
import {
  ChevronRight16Regular, ChevronDown16Regular,
  Folder24Regular, Document24Regular, Info16Regular,
} from '@fluentui/react-icons';

import { SharePointService } from '../services/SharePointService';
import { LibraryInfo, PathNode } from '../models/models';
import { PathStatusIcon, pathStatusBadgeColor, pathStatusLabel } from './shared/pathStatus';
import { buildOneDrivePath, defaultSyncFolderName, getPathStatus, worseStatus } from './shared/oneDrivePath';
import { TaskQueue } from '../services/sp/spCore';

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
  onToggle: (node: PathNode) => void;
  onSelect: (node: PathNode) => void;
  onKeyDown: (e: React.KeyboardEvent, node: PathNode) => void;
  registerRow: (url: string, el: HTMLDivElement | null) => void;
}

const TreeNodeView: React.FC<TreeNodeProps> = ({
  node, depth, selectedUrl, tabbableUrl, onToggle, onSelect, onKeyDown, registerRow,
}) => {
  const styles = useStyles();
  const isSelected = node.serverRelativeUrl === selectedUrl;
  const canExpand = node.isFolder && node.hasChildren;
  const below = worseStatus(node.hasErrorBelow ? 'error' : 'normal', node.hasWarningBelow ? 'warning' : 'normal');

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
          node.expanded ? <ChevronDown16Regular /> : <ChevronRight16Regular />
        ) : <span className={styles.chevronSpacer} />}
        {node.isFolder ? <Folder24Regular /> : <Document24Regular />}
        <Text truncate wrap={false} style={{ flexGrow: 1 }}>{node.name}</Text>
        {node.isLoading && <Spinner size="extra-tiny" />}
        <PathStatusIcon status={node.status} />
        {!node.expanded && below !== 'normal' && (
          <Tooltip content={`Contains an item ${below === 'error' ? 'over the limit' : 'at warning level'} below`} relationship="label">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: below === 'error' ? tokens.colorPaletteRedForeground1 : tokens.colorPaletteMarigoldForeground1 }} />
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
}

export const ExplorerView: React.FC<ExplorerViewProps> = ({
  sp, siteUrl, includeHidden, warningLength, errorLength, samplePath, onSamplePathChange,
}) => {
  const styles = useStyles();
  const [siteTitle, setSiteTitle] = React.useState('');
  const [libraries, setLibraries] = React.useState<LibraryInfo[] | null>(null);
  const [roots, setRoots] = React.useState<PathNode[]>([]);
  const [syncFolderOverrides, setSyncFolderOverrides] = React.useState<Record<string, string>>({});
  const [selectedNode, setSelectedNode] = React.useState<PathNode | null>(null);
  const [version, setVersion] = React.useState(0);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  const prefetchQueueRef = React.useRef(new TaskQueue(3));
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

  // Initial load: site title + libraries → tree roots.
  React.useEffect(() => {
    setLibraries(null);
    setRoots([]);
    setSelectedNode(null);
    setLoadError(null);
    const controller = new AbortController();
    abortRef.current = controller;

    Promise.all([
      sp.getSiteTitle(siteUrl, controller.signal),
      sp.getLibraries(siteUrl, includeHidden, controller.signal),
    ]).then(([title, libs]) => {
      if (controller.signal.aborted) return;
      setSiteTitle(title);
      setLibraries(libs);
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
          oneDrivePathLength: path.length,
          status: getPathStatus(path.length, warningLength, errorLength),
          children: [],
        };
      });
      setRoots(newRoots);
    }).catch((err) => {
      if (!controller.signal.aborted) setLoadError(err?.message ?? String(err));
    });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteUrl, includeHidden]);

  const loadChildren = React.useCallback((node: PathNode, isPrefetch: boolean): Promise<void> => {
    // node.isLoading guards against a second concurrent fetch for the same
    // folder — without it, rapidly toggling a folder open/closed/open (or an
    // in-flight prefetch racing a real expand-click) fires a duplicate request.
    if (node.children.length > 0 || !node.hasChildren || node.isLoading) return Promise.resolve();
    node.isLoading = true;
    if (!isPrefetch) touch();
    return sp.getFolderContents(siteUrl, node.serverRelativeUrl, abortRef.current?.signal)
      .then((items) => {
        node.children = items.map((item) => {
          const child: PathNode = {
            name: item.name,
            serverRelativeUrl: item.serverRelativeUrl,
            isFolder: item.isFolder,
            hasChildren: item.hasChildren,
            relativeSegments: [...node.relativeSegments, item.name],
            libraryRootUrl: node.libraryRootUrl,
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
        const recomputeBelow = (n: PathNode): void => {
          let below: 'normal' | 'warning' | 'error' = 'normal';
          for (const c of n.children) {
            below = worseStatus(below, c.status);
            below = worseStatus(below, c.hasErrorBelow ? 'error' : c.hasWarningBelow ? 'warning' : 'normal');
          }
          n.hasWarningBelow = below === 'warning' || below === 'error';
          n.hasErrorBelow = below === 'error';
          if (n.parent) recomputeBelow(n.parent);
        };
        recomputeBelow(node);
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
        node.loadError = `Couldn't load: ${err?.message ?? String(err)}`;
        touch();
      });
  }, [sp, siteUrl, computeMetrics]);

  const handleToggle = (node: PathNode): void => {
    node.expanded = !node.expanded;
    if (node.expanded) {
      loadChildren(node, false);
    }
    touch();
  };

  const handleSelect = (node: PathNode): void => setSelectedNode(node);

  const registerRow = React.useCallback((url: string, el: HTMLDivElement | null): void => {
    if (el) rowRefs.current.set(url, el);
    else rowRefs.current.delete(url);
  }, []);

  // Moving focus doubles as selecting — this tree has no separate multi-select
  // concept, so "the focused row" and "the selected row" are the same thing.
  const focusNode = (node: PathNode): void => {
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

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <div className={styles.field}>
          <Label htmlFor="samplePathInput">Sample OneDrive path prefix</Label>
          <Input id="samplePathInput" value={samplePath} onChange={(_, d) => onSamplePathChange(d.value)}
            placeholder={'C:\\Users\\UserName\\OneDrive - Company\\'} />
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
    </div>
  );
};
