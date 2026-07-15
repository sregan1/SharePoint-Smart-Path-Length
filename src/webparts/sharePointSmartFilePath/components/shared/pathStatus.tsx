import * as React from 'react';
import { tokens } from '@fluentui/react-components';
import { CheckmarkCircle16Regular, Warning16Regular, ErrorCircle16Regular } from '@fluentui/react-icons';
import { PathStatus } from '../../models/models';

export function pathStatusColor(status: PathStatus): string {
  switch (status) {
    case 'error': return tokens.colorPaletteRedForeground1;
    case 'warning': return tokens.colorPaletteMarigoldForeground1;
    default: return tokens.colorPaletteGreenForeground1;
  }
}

export function pathStatusBadgeColor(status: PathStatus): 'success' | 'warning' | 'danger' {
  switch (status) {
    case 'error': return 'danger';
    case 'warning': return 'warning';
    default: return 'success';
  }
}

export function pathStatusLabel(status: PathStatus): string {
  switch (status) {
    case 'error': return 'Over limit';
    case 'warning': return 'Warning';
    default: return 'OK';
  }
}

export const PathStatusIcon: React.FC<{ status: PathStatus; fontSize?: number }> = ({ status, fontSize = 16 }) => {
  const style: React.CSSProperties = { color: pathStatusColor(status), fontSize: `${fontSize}px` };
  switch (status) {
    case 'error': return <ErrorCircle16Regular style={style} />;
    case 'warning': return <Warning16Regular style={style} />;
    default: return <CheckmarkCircle16Regular style={style} />;
  }
};
