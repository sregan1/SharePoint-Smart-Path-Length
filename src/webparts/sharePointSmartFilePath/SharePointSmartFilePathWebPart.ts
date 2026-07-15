import { Version } from '@microsoft/sp-core-library';
import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { ThemeProvider, IReadonlyTheme } from '@microsoft/sp-component-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';

import { App, IBrandColors } from './components/App';
import { SharePointService } from './services/SharePointService';
import { ExportService } from './services/ExportService';
import { DEFAULT_WARNING_LENGTH, DEFAULT_ERROR_LENGTH, DEFAULT_SAMPLE_PATH } from './models/defaults';

export interface ISharePointSmartFilePathWebPartProps {
  warningLength: number;
  errorLength: number;
  defaultSamplePath: string;
}

// PropertyPaneFieldType numeric values (stable since SPFx 1.x). Hand-built
// below instead of importing PropertyPaneTextField as a value, to avoid
// forcing an eager AMD require() of @microsoft/sp-property-pane — see the
// gulpfile's BannerPlugin/patchManifest workaround for the underlying bug.
const TEXT_FIELD_TYPE = 3;

export default class SharePointSmartFilePathWebPart extends BaseClientSideWebPart<ISharePointSmartFilePathWebPartProps> {
  private _sp: SharePointService;
  private _exportService: ExportService;
  private _brandColors: IBrandColors = {
    primary:  '#0078d4',
    darkAlt:  '#106ebe',
    dark:     '#005a9e',
    darker:   '#004578',
    light:    '#c7e0f4',
    lighter:  '#deecf9',
  };

  protected onInit(): Promise<void> {
    try {
      this._sp = new SharePointService(this.context);
      this._exportService = new ExportService();
    } catch (err: any) {
      return Promise.reject(
        new Error(`[SharePointSmartFilePath] Service init failed: ${err?.message ?? String(err)}\n${err?.stack ?? ''}`)
      );
    }

    try {
      const themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
      const applyTheme = (theme: IReadonlyTheme | undefined): void => {
        const p = theme?.palette;
        if (p?.themePrimary) {
          this._brandColors = {
            primary:  p.themePrimary,
            darkAlt:  p.themeDarkAlt  ?? p.themePrimary,
            dark:     p.themeDark     ?? p.themePrimary,
            darker:   p.themeDarker   ?? p.themeDark ?? p.themePrimary,
            light:    p.themeLight    ?? '#c7e0f4',
            lighter:  p.themeLighter  ?? '#deecf9',
          };
        }
        this.render();
      };
      applyTheme(themeProvider.tryGetTheme());
      themeProvider.themeChangedEvent.add(this, (args) => applyTheme(args.theme));
    } catch { /* theme unavailable — keep default blue */ }

    return super.onInit();
  }

  public render(): void {
    try {
      const element = React.createElement(App, {
        context: this.context,
        sp: this._sp,
        exportService: this._exportService,
        warningLength: this.properties.warningLength ?? DEFAULT_WARNING_LENGTH,
        errorLength: this.properties.errorLength ?? DEFAULT_ERROR_LENGTH,
        defaultSamplePath: this.properties.defaultSamplePath ?? DEFAULT_SAMPLE_PATH,
        brandColors: this._brandColors,
      });
      ReactDom.render(element, this.domElement);
    } catch (err: any) {
      const msg = err?.message ?? String(err);
      const stack = err?.stack ?? '(no stack)';
      this.domElement.innerHTML =
        `<div style="padding:16px;font-family:Consolas,monospace;font-size:13px;` +
        `background:#fff3f3;border:1px solid #c00;border-radius:4px;margin:8px">` +
        `<strong style="color:#c00;font-size:14px">SharePoint Smart Path Length — Startup Error</strong><br><br>` +
        `<strong>Message:</strong> ${this._escHtml(msg)}<br><br>` +
        `<strong>Stack:</strong><pre style="font-size:11px;white-space:pre-wrap;` +
        `background:#f5f5f5;padding:8px;margin:4px 0;border-radius:2px">` +
        `${this._escHtml(stack)}</pre></div>`;
    }
  }

  private _escHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private _validateThresholds(warning: number, error: number): string {
    if (!Number.isFinite(warning) || warning <= 0) return 'Enter a positive whole number.';
    if (!Number.isFinite(error) || error <= 0) return 'Enter a positive whole number.';
    if (warning >= error) return 'The warning length must be less than the over-limit length.';
    return '';
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const warningLength = this.properties.warningLength ?? DEFAULT_WARNING_LENGTH;
    const errorLength = this.properties.errorLength ?? DEFAULT_ERROR_LENGTH;

    // onGetErrorMessage reads this.properties directly (not the warningLength/
    // errorLength locals above) so cross-field validation stays live: this
    // method only re-runs when the property pane is reopened, so a closure over
    // the locals would keep comparing against whatever the *other* field's value
    // was when the pane last opened, not what the user just typed into it.
    const warningField: any = {
      type: TEXT_FIELD_TYPE,
      targetProperty: 'warningLength',
      properties: {
        label: 'Warning length (characters)',
        value: String(warningLength),
        deferredValidationTime: 300,
        onGetErrorMessage: (value: string): string =>
          this._validateThresholds(parseInt(value, 10), this.properties.errorLength ?? DEFAULT_ERROR_LENGTH),
      },
    };
    const errorField: any = {
      type: TEXT_FIELD_TYPE,
      targetProperty: 'errorLength',
      properties: {
        label: 'Over-limit length (characters)',
        value: String(errorLength),
        deferredValidationTime: 300,
        onGetErrorMessage: (value: string): string =>
          this._validateThresholds(this.properties.warningLength ?? DEFAULT_WARNING_LENGTH, parseInt(value, 10)),
      },
    };
    const samplePathField: any = {
      type: TEXT_FIELD_TYPE,
      targetProperty: 'defaultSamplePath',
      properties: {
        label: 'Default sample OneDrive path prefix',
        value: this.properties.defaultSamplePath ?? DEFAULT_SAMPLE_PATH,
        deferredValidationTime: 300,
      },
    };

    return {
      pages: [{
        header: { description: 'SharePoint Smart Path Length configuration' },
        groups: [
          {
            groupName: 'Path length thresholds',
            groupFields: [warningField, errorField],
          },
          {
            groupName: 'OneDrive sample path',
            groupFields: [samplePathField],
          },
        ],
      }],
    };
  }
}
