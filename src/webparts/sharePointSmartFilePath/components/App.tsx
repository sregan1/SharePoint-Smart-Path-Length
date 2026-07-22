import * as React from 'react';
import {
  FluentProvider,
  webLightTheme,
  createDOMRenderer,
  RendererProvider,
  Button,
  Input,
  Text,
  tokens,
  Theme,
} from '@fluentui/react-components';
import { Settings24Regular, FolderProhibited24Regular, DocumentTable24Regular } from '@fluentui/react-icons';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import { SharePointService } from '../services/SharePointService';
import { ExportService } from '../services/ExportService';
import { ExplorerView } from './ExplorerView';
import { ReportView } from './ReportView';
import { SettingsView } from './SettingsView';

export type AppView = 'explorer' | 'report' | 'settings';

const LS_SAMPLE_PATH   = 'sp-smart-path-length-samplePath';
const LS_CONCURRENCY   = 'sp-smart-path-length-concurrency';
const LS_INCLUDE_HIDDEN = 'sp-smart-path-length-includeHidden';

export interface IBrandColors {
  primary: string;
  darkAlt: string;
  dark: string;
  darker: string;
  light: string;
  lighter: string;
}

function buildTheme(b: IBrandColors): Theme {
  return {
    ...webLightTheme,
    colorBrandBackground:                    b.primary,
    colorBrandBackgroundHover:               b.darkAlt,
    colorBrandBackgroundPressed:             b.dark,
    colorBrandBackgroundSelected:            b.darkAlt,
    colorBrandBackgroundStatic:              b.primary,
    colorBrandBackground2:                   b.lighter,
    colorBrandBackground2Hover:              b.light,
    colorBrandBackground2Pressed:            b.light,
    colorBrandBackground3Static:             b.dark,
    colorBrandBackground4Static:             b.darker,
    colorCompoundBrandBackground:            b.primary,
    colorCompoundBrandBackgroundHover:       b.darkAlt,
    colorCompoundBrandBackgroundPressed:     b.dark,
    colorBrandForeground1:                   b.primary,
    colorBrandForeground2:                   b.darkAlt,
    colorBrandForeground2Hover:              b.dark,
    colorBrandForeground2Pressed:            b.darker,
    colorCompoundBrandForeground1:           b.primary,
    colorCompoundBrandForeground1Hover:      b.darkAlt,
    colorCompoundBrandForeground1Pressed:    b.dark,
    colorBrandForegroundLink:                b.primary,
    colorBrandForegroundLinkHover:           b.darkAlt,
    colorBrandForegroundLinkPressed:         b.dark,
    colorBrandForegroundLinkSelected:        b.primary,
    colorBrandStroke1:                       b.primary,
    colorBrandStroke2:                       b.light,
    colorBrandStroke2Hover:                  b.primary,
    colorBrandStroke2Pressed:                b.darkAlt,
    colorCompoundBrandStroke:                b.primary,
    colorCompoundBrandStrokeHover:           b.darkAlt,
    colorCompoundBrandStrokePressed:         b.dark,
  };
}

export interface AppProps {
  context: WebPartContext;
  sp: SharePointService;
  exportService: ExportService;
  warningLength: number;
  errorLength: number;
  defaultSamplePath: string;
  brandColors: IBrandColors;
  isEditMode: boolean;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('[SharePointSmartFilePath] Render error:', error, info.componentStack);
  }

  render(): React.ReactNode {
    const { error } = this.state;
    if (error) {
      return (
        <div style={{
          padding: '16px', fontFamily: 'Consolas, monospace', fontSize: '13px',
          background: '#fff3f3', border: '1px solid #c00', borderRadius: '4px', margin: '8px',
        }}>
          <strong style={{ color: '#c00', fontSize: '14px' }}>SharePoint Smart Path Length — Render Error</strong>
          <br /><br />
          <strong>Message:</strong> {error.message || String(error)}
          <br /><br />
          <strong>Stack:</strong>
          <pre style={{
            fontSize: '11px', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere',
            background: '#f5f5f5', padding: '8px', margin: '4px 0', borderRadius: '2px',
          }}>
            {error.stack ?? '(no stack available)'}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

let renderer: ReturnType<typeof createDOMRenderer>;
try {
  renderer = createDOMRenderer(document);
} catch (e: any) {
  console.error('[SharePointSmartFilePath] createDOMRenderer failed:', e);
  throw e;
}

export const App: React.FC<AppProps> = ({
  context, sp, exportService, warningLength, errorLength, defaultSamplePath, brandColors, isEditMode,
}) => {
  const theme = React.useMemo(() => buildTheme(brandColors), [brandColors]);

  const [view, setView] = React.useState<AppView>('explorer');
  const [prevView, setPrevView] = React.useState<AppView>('explorer');

  const defaultUrl = context.pageContext.web.absoluteUrl;
  const [siteUrl, setSiteUrl] = React.useState(() => defaultUrl);
  const [editUrl, setEditUrl] = React.useState(siteUrl);
  const [isEditing, setIsEditing] = React.useState(false);

  const [samplePath, setSamplePath] = React.useState(
    () => localStorage.getItem(LS_SAMPLE_PATH) ?? defaultSamplePath,
  );
  // useState's initializer only runs once, so a later edit to the web part's
  // property pane (a new defaultSamplePath prop) would otherwise never reach
  // this state. Sync it in whenever the property-pane value actually changes.
  const prevDefaultSamplePathRef = React.useRef(defaultSamplePath);
  React.useEffect(() => {
    if (defaultSamplePath !== prevDefaultSamplePathRef.current) {
      prevDefaultSamplePathRef.current = defaultSamplePath;
      setSamplePath(defaultSamplePath);
    }
  }, [defaultSamplePath]);
  const [scanConcurrency, setScanConcurrency] = React.useState(() => {
    // A corrupted/non-numeric stored value would otherwise become NaN here,
    // which flows all the way into `new TaskQueue(NaN)` — that queue's pump
    // loop condition (active < concurrency) is never true for NaN, so it
    // hangs forever with no error, silently freezing every future scan.
    const parsed = parseInt(localStorage.getItem(LS_CONCURRENCY) ?? '4', 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 4;
  });
  const [includeHidden, setIncludeHidden] = React.useState(
    () => localStorage.getItem(LS_INCLUDE_HIDDEN) === 'true',
  );

  React.useEffect(() => { localStorage.setItem(LS_SAMPLE_PATH, samplePath); }, [samplePath]);
  React.useEffect(() => { localStorage.setItem(LS_INCLUDE_HIDDEN, String(includeHidden)); }, [includeHidden]);
  React.useEffect(() => {
    localStorage.setItem(LS_CONCURRENCY, String(scanConcurrency));
    sp.scanConcurrency = scanConcurrency;
  }, [scanConcurrency]);

  const handleConnect = (): void => {
    if (editUrl.trim()) setSiteUrl(editUrl.trim());
    setIsEditing(false);
  };
  const handleStartEdit = (): void => { setEditUrl(siteUrl); setIsEditing(true); };
  const handleCancelEdit = (): void => { setEditUrl(siteUrl); setIsEditing(false); };
  const handleOpenSettings = (): void => {
    setPrevView(view === 'settings' ? prevView : view);
    setView('settings');
  };

  return (
    <ErrorBoundary>
    <RendererProvider renderer={renderer} targetDocument={document}>
    <FluentProvider theme={theme} style={{ minHeight: '400px', position: 'relative' }}>

      {view !== 'settings' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            paddingTop: tokens.spacingVerticalS,
            paddingBottom: tokens.spacingVerticalS,
            paddingLeft: tokens.spacingHorizontalM,
            paddingRight: tokens.spacingHorizontalS,
            background: brandColors.primary,
            gap: tokens.spacingHorizontalM,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS, flexShrink: 0 }}>
            <FolderProhibited24Regular style={{ color: 'white', fontSize: '20px' }} />
            <Text style={{ color: 'white', fontWeight: tokens.fontWeightSemibold, whiteSpace: 'nowrap' }}>
              SharePoint Smart Path Length
            </Text>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: tokens.spacingHorizontalS, minWidth: 0, overflow: 'hidden' }}>
            {isEditing ? (
              <>
                <Input
                  value={editUrl}
                  onChange={(_, d) => setEditUrl(d.value)}
                  placeholder="https://contoso.sharepoint.com/sites/mysite"
                  style={{ minWidth: '200px', maxWidth: '400px', flexGrow: 1 }}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleConnect(); }}
                />
                <Button appearance="secondary" onClick={handleConnect} disabled={!editUrl.trim()}>Connect</Button>
                <Button appearance="transparent" style={{ color: 'white', flexShrink: 0 }} onClick={handleCancelEdit}>Cancel</Button>
              </>
            ) : (
              <>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.75)', flexShrink: 0, display: 'inline-block' }} />
                <Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'white' }}>{siteUrl}</Text>
                <Button appearance="transparent" size="small" style={{ color: 'white', flexShrink: 0 }} onClick={handleStartEdit}>Change URL</Button>
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS, flexShrink: 0 }}>
            <Button
              appearance="transparent"
              icon={<DocumentTable24Regular style={{ color: 'white' }} />}
              style={{ color: 'white' }}
              onClick={() => setView(view === 'report' ? 'explorer' : 'report')}
            >
              {view === 'report' ? 'Explorer' : 'Report'}
            </Button>
            <Button
              appearance="transparent"
              icon={<Settings24Regular style={{ color: 'white' }} />}
              aria-label="Settings"
              title="Settings"
              onClick={handleOpenSettings}
            />
          </div>
        </div>
      )}

      {view === 'explorer' && (
        <ExplorerView
          key={siteUrl + String(includeHidden)}
          sp={sp}
          siteUrl={siteUrl}
          includeHidden={includeHidden}
          warningLength={warningLength}
          errorLength={errorLength}
          samplePath={samplePath}
          onSamplePathChange={setSamplePath}
          isEditMode={isEditMode}
        />
      )}
      {view === 'report' && (
        <ReportView
          key={siteUrl + String(includeHidden)}
          sp={sp}
          exportService={exportService}
          siteUrl={siteUrl}
          includeHidden={includeHidden}
          warningLength={warningLength}
          errorLength={errorLength}
          samplePath={samplePath}
          onBack={() => setView('explorer')}
        />
      )}
      {view === 'settings' && (
        <SettingsView
          samplePath={samplePath}
          onSamplePathChange={setSamplePath}
          scanConcurrency={scanConcurrency}
          onScanConcurrencyChange={setScanConcurrency}
          includeHidden={includeHidden}
          onIncludeHiddenChange={setIncludeHidden}
          warningLength={warningLength}
          errorLength={errorLength}
          onBack={() => setView(prevView)}
        />
      )}

    </FluentProvider>
    </RendererProvider>
    </ErrorBoundary>
  );
};
