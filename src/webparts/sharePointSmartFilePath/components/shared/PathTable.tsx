import * as React from 'react';
import { makeStyles, tokens, Badge, Text } from '@fluentui/react-components';
import { Folder24Regular, Document24Regular, ChevronUp16Regular, ChevronDown16Regular } from '@fluentui/react-icons';
import { PathReportEntry } from '../../models/models';
import { pathStatusBadgeColor, pathStatusLabel } from './pathStatus';

const useStyles = makeStyles({
  table: { width: '100%', borderCollapse: 'collapse', fontSize: tokens.fontSizeBase300 },
  th: {
    textAlign: 'left', padding: '8px 12px', borderBottom: `2px solid ${tokens.colorNeutralStroke2}`,
    cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap',
  },
  td: { padding: '6px 12px', borderBottom: `1px solid ${tokens.colorNeutralStroke2}`, verticalAlign: 'middle' },
  pathCell: { fontFamily: 'Consolas, monospace', overflowWrap: 'anywhere' },
  statusCell: { whiteSpace: 'nowrap' },
  headerInner: { display: 'flex', alignItems: 'center', gap: '4px' },
});

type SortKey = 'name' | 'library' | 'length' | 'status';

export interface PathTableProps {
  entries: PathReportEntry[];
}

export const PathTable: React.FC<PathTableProps> = ({ entries }) => {
  const styles = useStyles();
  const [sortKey, setSortKey] = React.useState<SortKey>('length');
  const [sortDesc, setSortDesc] = React.useState(true);

  const sorted = React.useMemo(() => {
    const copy = [...entries];
    copy.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'name': cmp = a.oneDrivePath.localeCompare(b.oneDrivePath); break;
        case 'library': cmp = a.libraryTitle.localeCompare(b.libraryTitle); break;
        case 'status': cmp = a.status.localeCompare(b.status); break;
        default: cmp = a.oneDrivePathLength - b.oneDrivePathLength;
      }
      return sortDesc ? -cmp : cmp;
    });
    return copy;
  }, [entries, sortKey, sortDesc]);

  const toggleSort = (key: SortKey): void => {
    if (key === sortKey) setSortDesc((d) => !d);
    else { setSortKey(key); setSortDesc(true); }
  };

  const headerArrow = (key: SortKey): React.ReactNode =>
    sortKey === key ? (sortDesc ? <ChevronDown16Regular /> : <ChevronUp16Regular />) : null;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th} style={{ width: '32px' }} />
          <th className={styles.th} onClick={() => toggleSort('library')}>
            <span className={styles.headerInner}>Library {headerArrow('library')}</span>
          </th>
          <th className={styles.th} onClick={() => toggleSort('name')}>
            <span className={styles.headerInner}>Estimated OneDrive path {headerArrow('name')}</span>
          </th>
          <th className={styles.th} onClick={() => toggleSort('length')}>
            <span className={styles.headerInner}>Length {headerArrow('length')}</span>
          </th>
          <th className={styles.th} onClick={() => toggleSort('status')}>
            <span className={styles.headerInner}>Status {headerArrow('status')}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((e) => (
          <tr key={e.serverRelativeUrl}>
            <td className={styles.td}>{e.isFolder ? <Folder24Regular /> : <Document24Regular />}</td>
            <td className={styles.td}>{e.libraryTitle}</td>
            <td className={`${styles.td} ${styles.pathCell}`}>{e.oneDrivePath}</td>
            <td className={styles.td}>{e.oneDrivePathLength}</td>
            <td className={`${styles.td} ${styles.statusCell}`}>
              <Badge color={pathStatusBadgeColor(e.status)} appearance="filled" style={{ whiteSpace: 'nowrap' }}>{pathStatusLabel(e.status)}</Badge>
            </td>
          </tr>
        ))}
        {sorted.length === 0 && (
          <tr><td className={styles.td} colSpan={5}><Text>No items match the current filter.</Text></td></tr>
        )}
      </tbody>
    </table>
  );
};
