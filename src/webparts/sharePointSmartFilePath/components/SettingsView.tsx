import * as React from 'react';
import {
  makeStyles, tokens, Button, Input, Text, Checkbox, SpinButton, Label, Tooltip, Title2,
} from '@fluentui/react-components';
import { ArrowLeft24Regular, Info16Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: { padding: tokens.spacingHorizontalXXL, display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL, maxWidth: '600px' },
  field: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS },
  labelRow: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS },
  thresholds: { color: tokens.colorNeutralForeground3, fontSize: tokens.fontSizeBase200 },
});

export interface SettingsViewProps {
  samplePath: string;
  onSamplePathChange: (value: string) => void;
  scanConcurrency: number;
  onScanConcurrencyChange: (value: number) => void;
  includeHidden: boolean;
  onIncludeHiddenChange: (value: boolean) => void;
  warningLength: number;
  errorLength: number;
  onBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  samplePath, onSamplePathChange, scanConcurrency, onScanConcurrencyChange,
  includeHidden, onIncludeHiddenChange, warningLength, errorLength, onBack,
}) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
        <Button appearance="subtle" icon={<ArrowLeft24Regular />} onClick={onBack}>Back</Button>
        <Title2>Settings</Title2>
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <Label htmlFor="settingsSamplePath">Sample OneDrive path prefix</Label>
          <Tooltip content="Your OneDrive sync root, e.g. C:\Users\UsernamePath\OneDrive - Company\. Saved to this browser only — it isn't shared with other users." relationship="description">
            <Info16Regular />
          </Tooltip>
        </div>
        <Input id="settingsSamplePath" value={samplePath} onChange={(_, d) => onSamplePathChange(d.value)} />
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <Label>Concurrent API requests during a full scan</Label>
          <Tooltip content="Higher values scan faster but put more load on SharePoint. Lower this if you see throttling errors." relationship="description">
            <Info16Regular />
          </Tooltip>
        </div>
        <SpinButton
          value={scanConcurrency}
          min={1}
          max={10}
          onChange={(_, d) => { if (d.value !== undefined && d.value !== null) onScanConcurrencyChange(d.value); }}
        />
      </div>

      <Checkbox
        label="Include hidden and system libraries"
        checked={includeHidden}
        onChange={(_, d) => onIncludeHiddenChange(!!d.checked)}
      />

      <Text className={styles.thresholds}>
        The warning ({warningLength} characters) and over-limit ({errorLength} characters) thresholds are
        set by whoever edits this page — from the web part's property pane ("Edit web part" → SharePoint Smart Path Length settings), not here.
      </Text>
    </div>
  );
};
