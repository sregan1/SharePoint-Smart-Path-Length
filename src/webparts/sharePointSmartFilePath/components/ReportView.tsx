import * as React from 'react';
import {
  makeStyles, tokens, Button, Text, Checkbox, Spinner, ProgressBar, Link,
  Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, DialogTrigger,
  RadioGroup, Radio, Label,
} from '@fluentui/react-components';
import { ArrowLeft24Regular, ArrowDownload24Regular } from '@fluentui/react-icons';
import * as strings from 'SharePointSmartFilePathWebPartStrings';

import { SharePointService } from '../services/SharePointService';
import { ExportService } from '../services/ExportService';
import { LibraryInfo, PathReportEntry, ExportScope, ExportFormat } from '../models/models';
import { buildOneDrivePath, defaultSyncFolderName, getPathStatus } from './shared/oneDrivePath';
import { applyPathFilter, scopeLabel } from './shared/pathFilters';
import { PathTable } from './shared/PathTable';
import { fmt } from './shared/format';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', height: '100%' },
  toolbar: {
    display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: tokens.spacingHorizontalXXL,
    padding: tokens.spacingHorizontalM, borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  libList: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS, maxHeight: '140px', overflowY: 'auto' },
  actions: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM },
  body: { flexGrow: 1, overflowY: 'auto', padding: tokens.spacingHorizontalM },
  filterRow: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalL, marginBottom: tokens.spacingVerticalM },
});

export interface ReportViewProps {
  sp: SharePointService;
  exportService: ExportService;
  siteUrl: string;
  includeHidden: boolean;
  warningLength: number;
  errorLength: number;
  samplePath: string;
  onBack: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  sp, exportService, siteUrl, includeHidden, warningLength, errorLength, samplePath, onBack,
}) => {
  const styles = useStyles();
  const [siteTitle, setSiteTitle] = React.useState('');
  const [libraries, setLibraries] = React.useState<LibraryInfo[] | null>(null);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [loadError, setLoadError] = React.useState<string | null>(null);

  const [scanning, setScanning] = React.useState(false);
  const [cancelling, setCancelling] = React.useState(false);
  const [scanned, setScanned] = React.useState(0);
  const [entries, setEntries] = React.useState<PathReportEntry[] | null>(null);
  const abortRef = React.useRef<AbortController>();

  // Throttling makes a scan slow with no other outward sign, which reads as a
  // hung web part. Mirror the shared controller's state into the scan status so
  // a long scan says *why* it's long. A ticker keeps the countdown live: the
  // controller only notifies on state changes, not once per second.
  const [throttleState, setThrottleState] = React.useState(() => sp.throttleSnapshot());
  React.useEffect(() => sp.onThrottleChange((snap) => setThrottleState(snap)), [sp]);
  React.useEffect(() => {
    if (!scanning) return undefined;
    const id = setInterval(() => setThrottleState(sp.throttleSnapshot()), 1000);
    return () => clearInterval(id);
  }, [scanning, sp]);
  // Deliberately silent during slow start: the opening ramp is normal, healthy
  // behavior, and reporting it would make every scan look like it was in
  // trouble. Only an actual wait or a throttling-imposed reduction is worth
  // saying out loud.
  const throttleNote = throttleState.waitMsRemaining > 0
    ? fmt(strings.Throttle_ReportWaiting, { seconds: Math.ceil(throttleState.waitMsRemaining / 1000) })
    : throttleState.reduced
      ? fmt(strings.Throttle_ReportGentle, { limit: throttleState.limit, target: throttleState.target, events: throttleState.throttleEvents })
      : '';

  const [filterScope, setFilterScope] = React.useState<ExportScope>('all');
  const [exportOpen, setExportOpen] = React.useState(false);
  const [exportFormat, setExportFormat] = React.useState<ExportFormat>('csv');
  const [exportScope, setExportScope] = React.useState<ExportScope>('all');
  const [exporting, setExporting] = React.useState(false);

  React.useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      sp.getSiteTitle(siteUrl, controller.signal),
      sp.getLibraries(siteUrl, includeHidden, controller.signal),
    ]).then(([title, libs]) => {
      if (controller.signal.aborted) return;
      setSiteTitle(title);
      setLibraries(libs);
      setSelected(new Set(libs.map((l) => l.serverRelativeUrl)));
    }).catch((err) => {
      if (!controller.signal.aborted) setLoadError(err?.message ?? String(err));
    });
    return () => controller.abort();
  }, [sp, siteUrl, includeHidden]);

  const toggleLibrary = (url: string): void => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url); else next.add(url);
      return next;
    });
  };

  const runScan = async (): Promise<void> => {
    if (!libraries) return;
    const controller = new AbortController();
    abortRef.current = controller;
    setScanning(true);
    setCancelling(false);
    setScanned(0);
    setEntries(null);
    setLoadError(null);

    const targets = libraries.filter((l) => selected.has(l.serverRelativeUrl));
    const all: PathReportEntry[] = [];
    let totalScanned = 0;

    for (const lib of targets) {
      if (controller.signal.aborted) break;
      const syncFolder = defaultSyncFolderName(siteTitle, lib.title);

      // The library root folder itself is also a path OneDrive has to create.
      const rootPath = buildOneDrivePath(samplePath, syncFolder, []);
      all.push({
        isFolder: true,
        name: lib.title,
        serverRelativeUrl: lib.serverRelativeUrl,
        libraryTitle: lib.title,
        oneDrivePath: rootPath,
        oneDrivePathLength: rootPath.length,
        status: getPathStatus(rootPath.length, warningLength, errorLength),
      });

      try {
        // eslint-disable-next-line no-await-in-loop
        const items = await sp.fullScanLibrary(siteUrl, { serverRelativeUrl: lib.serverRelativeUrl, uniqueId: lib.uniqueId }, (n) => {
          setScanned(totalScanned + n);
        }, controller.signal, undefined, lib.id);
        totalScanned += items.length;
        for (const item of items) {
          const path = buildOneDrivePath(samplePath, syncFolder, item.relativeSegments);
          let status = getPathStatus(path.length, warningLength, errorLength);
          // A folder SharePoint couldn't enumerate — because its path (or
          // something inside it) was too long, or for any other reason
          // (permissions, a network blip) — must not silently report as a
          // clean "OK" here; that would produce a false-clean report for
          // exactly the kind of folder this tool exists to catch.
          if (item.tooLongToEnumerate) status = 'error';
          else if (item.enumerationFailed && status === 'normal') status = 'warning';
          all.push({
            isFolder: item.isFolder,
            name: item.name,
            serverRelativeUrl: item.serverRelativeUrl,
            libraryTitle: lib.title,
            oneDrivePath: path,
            oneDrivePathLength: path.length,
            status,
          });
        }
      } catch (err: any) {
        setLoadError(fmt(strings.Report_ScanFailed, { library: lib.title, error: err?.message ?? String(err) }));
      }
    }

    setEntries(all);
    setScanning(false);
    setCancelling(false);
  };

  // Only requests cancellation — runScan's own loop notices the aborted signal
  // and is the single place that flips `scanning` back off, once it has
  // actually stopped (SPHttpClient requests already in flight can't be
  // hard-cancelled, so "stopped" may lag the click by one in-flight request).
  const cancelScan = (): void => {
    abortRef.current?.abort();
    setCancelling(true);
  };

  const filtered = React.useMemo(() => (entries ? applyPathFilter(entries, filterScope) : []), [entries, filterScope]);

  const runExport = async (): Promise<void> => {
    if (!entries) return;
    const toExport = applyPathFilter(entries, exportScope);
    setExporting(true);
    try {
      if (exportFormat === 'csv') exportService.exportCsv(toExport);
      else await exportService.exportExcel(toExport);
      setExportOpen(false);
    } finally {
      setExporting(false);
    }
  };

  const overCount = entries?.filter((e) => e.status === 'error').length ?? 0;
  const warningCount = entries?.filter((e) => e.status === 'warning').length ?? 0;

  return (
    <div className={styles.root}>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, padding: tokens.spacingHorizontalM }}>
        <Button appearance="subtle" icon={<ArrowLeft24Regular />} onClick={onBack}>{strings.App_Explorer}</Button>
        <Text weight="semibold" size={400}>{strings.Report_Title}</Text>
      </div>

      <div className={styles.toolbar}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
            <Label>{strings.Report_LibrariesToScan}</Label>
            {libraries && libraries.length > 1 && (
              <>
                <Link as="button" onClick={() => setSelected(new Set(libraries.map((l) => l.serverRelativeUrl)))}>
                  {strings.Report_SelectAll}
                </Link>
                <Link as="button" onClick={() => setSelected(new Set())}>
                  {strings.Report_SelectNone}
                </Link>
              </>
            )}
          </div>
          <div className={styles.libList}>
            {libraries === null && <Spinner size="tiny" label={strings.Common_LoadingLibraries} />}
            {libraries?.map((lib) => (
              <Checkbox
                key={lib.serverRelativeUrl}
                label={lib.title}
                checked={selected.has(lib.serverRelativeUrl)}
                onChange={() => toggleLibrary(lib.serverRelativeUrl)}
              />
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          {!scanning && (
            <Button appearance="primary" onClick={runScan} disabled={selected.size === 0}>{strings.Report_RunFullScan}</Button>
          )}
          {scanning && (
            <>
              <Spinner size="tiny" />
              <Text>{cancelling ? strings.Report_Cancelling : fmt(strings.Report_Scanned, { count: scanned, note: throttleNote })}</Text>
              <Button appearance="secondary" onClick={cancelScan} disabled={cancelling}>{strings.Common_Cancel}</Button>
            </>
          )}
          {entries && !scanning && (
            <Button appearance="primary" icon={<ArrowDownload24Regular />} onClick={() => { setExportScope(filterScope); setExportOpen(true); }}>
              {strings.Report_ExportButton}
            </Button>
          )}
        </div>
      </div>

      {scanning && <ProgressBar />}
      {loadError && <Text style={{ color: tokens.colorPaletteRedForeground1, padding: tokens.spacingHorizontalM }}>{loadError}</Text>}

      <div className={styles.body}>
        {entries && (
          <>
            <div className={styles.filterRow}>
              <Text>{fmt(strings.Report_Summary, { total: entries.length, over: overCount, warning: warningCount })}</Text>
              <RadioGroup layout="horizontal" value={filterScope} onChange={(_, d) => setFilterScope(d.value as ExportScope)}>
                <Radio value="all" label={strings.Filter_All} />
                <Radio value="warningAndOver" label={strings.Filter_WarningAndOver} />
                <Radio value="overOnly" label={strings.Filter_OverOnly} />
              </RadioGroup>
            </div>
            <PathTable entries={filtered} />
          </>
        )}
        {!entries && !scanning && <Text>{strings.Report_Empty}</Text>}
      </div>

      <Dialog open={exportOpen} onOpenChange={(_, d) => setExportOpen(d.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>{strings.Export_DialogTitle}</DialogTitle>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL }}>
              <div>
                <Label>{strings.Export_Format}</Label>
                <RadioGroup value={exportFormat} onChange={(_, d) => setExportFormat(d.value as ExportFormat)}>
                  <Radio value="csv" label="CSV" />
                  <Radio value="xlsx" label="Excel (.xlsx)" />
                </RadioGroup>
              </div>
              <div>
                <Label>{strings.Export_Scope}</Label>
                <RadioGroup value={exportScope} onChange={(_, d) => setExportScope(d.value as ExportScope)}>
                  <Radio value="all" label={scopeLabel('all')} />
                  <Radio value="warningAndOver" label={scopeLabel('warningAndOver')} />
                  <Radio value="overOnly" label={scopeLabel('overOnly')} />
                </RadioGroup>
              </div>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">{strings.Common_Cancel}</Button>
              </DialogTrigger>
              <Button appearance="primary" onClick={runExport} disabled={exporting}>
                {exporting ? <Spinner size="tiny" /> : strings.Common_Export}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};
