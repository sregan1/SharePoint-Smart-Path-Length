export type PathStatus = 'normal' | 'warning' | 'error';
export type ExportFormat = 'csv' | 'xlsx';
export type ExportScope = 'all' | 'warningAndOver' | 'overOnly';

export interface LibraryInfo {
  title: string;
  serverRelativeUrl: string;
  noCrawl?: boolean;
}

export interface PathThresholds {
  warningLength: number;
  errorLength: number;
}

export interface PathNode {
  name: string;
  serverRelativeUrl: string;
  isFolder: boolean;
  hasChildren: boolean;
  /** Path segments from the library's OneDrive sync-root folder down to (and including) this node. */
  relativeSegments: string[];
  /** serverRelativeUrl of the library root this node belongs to — used to look up its sync-folder name. */
  libraryRootUrl: string;
  oneDrivePathLength: number;
  status: PathStatus;
  /** True when a descendant (not yet expanded) is at warning/error length — propagated up on load, like the Permissions Explorer's hasUniquePermissionsBelow. */
  hasWarningBelow?: boolean;
  hasErrorBelow?: boolean;
  isLoading?: boolean;
  expanded?: boolean;
  parent?: PathNode;
  children: PathNode[];
  loadError?: string;
}

export interface PathReportEntry {
  isFolder: boolean;
  name: string;
  serverRelativeUrl: string;
  libraryTitle: string;
  oneDrivePath: string;
  oneDrivePathLength: number;
  status: PathStatus;
}

export interface ScanProgress {
  message: string;
  scanned: number;
}
