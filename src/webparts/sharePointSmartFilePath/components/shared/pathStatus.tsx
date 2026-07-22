import * as React from 'react';
import { tokens } from '@fluentui/react-components';
import { CheckmarkCircle16Regular, Warning16Regular, ErrorCircle16Filled } from '@fluentui/react-icons';
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

// Longer, hover-friendly explanation of what each status icon means —
// shared by the tree's per-row tooltip and the icon legend, so the wording
// stays consistent between the two.
export function pathStatusDescription(status: PathStatus): string {
  switch (status) {
    case 'error': return "This path is at or over the configured limit — it likely won't sync to OneDrive correctly.";
    case 'warning': return 'This path is approaching the configured limit — worth shortening soon.';
    default: return "This path is comfortably within the configured limit — nothing to do here.";
  }
}

export const PathStatusIcon: React.FC<{ status: PathStatus; fontSize?: number }> = ({ status, fontSize = 16 }) => {
  // flexShrink: 0 keeps this a fixed size inside flex rows — without it, a
  // narrow row (deep tree nesting, a long truncated name) squeezes the icon
  // down along with the text instead of only truncating the text.
  if (status === 'error') {
    // A solid red rectangle with the icon inverted to white, deliberately
    // NOT just a red circle — a circle here reads too similarly to the OK
    // checkmark's circle at a glance, and this is the one state that needs
    // to stand out as actually needing attention.
    const badgeSize = fontSize + 4;
    return (
      <span
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: `${badgeSize}px`, height: `${badgeSize}px`,
          background: tokens.colorPaletteRedForeground1,
          borderRadius: tokens.borderRadiusSmall,
          flexShrink: 0,
        }}
      >
        <ErrorCircle16Filled style={{ color: 'white', fontSize: `${fontSize}px` }} />
      </span>
    );
  }
  const style: React.CSSProperties = { color: pathStatusColor(status), fontSize: `${fontSize}px`, flexShrink: 0 };
  return status === 'warning' ? <Warning16Regular style={style} /> : <CheckmarkCircle16Regular style={style} />;
};
