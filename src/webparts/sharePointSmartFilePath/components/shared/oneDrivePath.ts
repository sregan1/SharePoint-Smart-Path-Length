import { PathStatus } from '../../models/models';

// The local folder OneDrive creates for a "Shortcut to OneDrive"/synced document
// library is conventionally "{Site Title} - {Library Title}" (e.g. "Clinical -
// Documents"), placed directly under the user's OneDrive sync root. This isn't
// documented/guaranteed by Microsoft and can vary (renamed libraries, name
// collisions get a numeric suffix, etc.) — callers should let the user override it.
export function defaultSyncFolderName(siteTitle: string, libraryTitle: string): string {
  const site = siteTitle.trim();
  const lib = libraryTitle.trim();
  if (!site || site.toLowerCase() === lib.toLowerCase()) return lib;
  return `${site} - ${lib}`;
}

function stripTrailingSlash(s: string): string {
  return s.replace(/[\\/]+$/, '');
}

function stripLeadingSlash(s: string): string {
  return s.replace(/^[\\/]+/, '');
}

// Builds the estimated local path OneDrive would create for an item, given the
// user's sample OneDrive sync-root prefix, the library's sync folder name, and
// the item's path segments relative to the library root.
export function buildOneDrivePath(
  syncRootPrefix: string,
  syncFolderName: string,
  relativeSegments: string[],
): string {
  const prefix = stripTrailingSlash(syncRootPrefix.trim());
  const folder = stripLeadingSlash(stripTrailingSlash(syncFolderName.trim()));
  const rest = relativeSegments.map((s) => s.trim()).filter(Boolean).join('\\');
  return rest ? `${prefix}\\${folder}\\${rest}` : `${prefix}\\${folder}`;
}

export function getPathStatus(length: number, warningLength: number, errorLength: number): PathStatus {
  if (length >= errorLength) return 'error';
  if (length >= warningLength) return 'warning';
  return 'normal';
}

export function worseStatus(a: PathStatus, b: PathStatus): PathStatus {
  if (a === 'error' || b === 'error') return 'error';
  if (a === 'warning' || b === 'warning') return 'warning';
  return 'normal';
}
