import * as React from 'react';
import {
  makeStyles, tokens, Button, Input, Text, Checkbox, SpinButton, Label, Tooltip, Title2,
} from '@fluentui/react-components';
import { ArrowLeft24Regular, Info16Regular } from '@fluentui/react-icons';

import * as strings from 'SharePointSmartFilePathWebPartStrings';
import { fmt } from './shared/format';

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
        <Button appearance="subtle" icon={<ArrowLeft24Regular />} onClick={onBack}>{strings.Common_Back}</Button>
        <Title2>{strings.Settings_Title}</Title2>
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <Label htmlFor="settingsSamplePath">{strings.Common_SamplePathLabel}</Label>
          <Tooltip content={strings.Settings_SamplePathTooltip} relationship="description">
            <Info16Regular />
          </Tooltip>
        </div>
        <Input id="settingsSamplePath" value={samplePath} onChange={(_, d) => onSamplePathChange(d.value)} />
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <Label>{strings.Settings_ConcurrencyLabel}</Label>
          <Tooltip content={strings.Settings_ConcurrencyTooltip} relationship="description">
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
        label={strings.Settings_IncludeHidden}
        checked={includeHidden}
        onChange={(_, d) => onIncludeHiddenChange(!!d.checked)}
      />

      <Text className={styles.thresholds}>
        {fmt(strings.Settings_ThresholdsNote, { warning: warningLength, error: errorLength })}
      </Text>
    </div>
  );
};
