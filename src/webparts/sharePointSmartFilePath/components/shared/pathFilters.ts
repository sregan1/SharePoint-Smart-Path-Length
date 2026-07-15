import { ExportScope, PathReportEntry } from '../../models/models';

// Shared by the on-screen Report table and the Export service so the two can
// never diverge (mirrors the Permissions Explorer's applyPermFilters pattern).
export function applyPathFilter(entries: PathReportEntry[], scope: ExportScope): PathReportEntry[] {
  switch (scope) {
    case 'overOnly':
      return entries.filter((e) => e.status === 'error');
    case 'warningAndOver':
      return entries.filter((e) => e.status === 'warning' || e.status === 'error');
    default:
      return entries;
  }
}

export function scopeLabel(scope: ExportScope): string {
  switch (scope) {
    case 'overOnly': return 'Paths over the limit only';
    case 'warningAndOver': return 'Paths at warning level and over';
    default: return 'All paths';
  }
}
