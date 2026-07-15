'use strict';
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

// Chrome path — fall back to Edge if Chrome not present
const CHROME = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const OUT = path.join(__dirname, 'screenshots');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// ── Design tokens (match the real web part's Fluent UI theme) ──────────────────
const COLOR = {
  primary: '#0078D4',
  primaryDark: '#106EBE',
  success: '#107C10',
  warning: '#CA5010',
  danger: '#D13438',
  border: '#EDEBE9',
  border2: '#E1DFDD',
  bg: '#FAF9F8',
  surface: '#FFFFFF',
  textPrimary: '#323130',
  textSecondary: '#605E5C',
  selectedBg: '#EFF6FC',
};
const FONT = "'Segoe UI', Arial, sans-serif";
const MONO = "'Cascadia Code', Consolas, 'Courier New', monospace";

// ── Dummy data ──────────────────────────────────────────────────────────────────
const SITE_URL = 'https://contoso.sharepoint.com/sites/RegulatoryAffairs';
const SAMPLE_PREFIX = 'C:\\Users\\Jordan.Lee\\OneDrive - Contoso Clinical Research Ltd\\';
const SYNC_FOLDER = 'Regulatory Affairs - Submissions';

// Explorer tree — lengths below are computed the same way the app computes
// them (prefix + '\' + syncFolder + '\' + relativeSegments.join('\')), so the
// numbers shown in the screenshot are internally consistent, not arbitrary.
const TREE = [
  {
    name: 'Regulatory Affairs - Submissions', type: 'folder', status: 'ok', length: 93,
    hasChildren: true, expanded: true,
    children: [
      {
        name: '2024 Filings', type: 'folder', status: 'ok', length: 106,
        hasChildren: true, expanded: true,
        children: [
          { name: 'Cover Letter.docx', type: 'file', status: 'ok', length: 124, hasChildren: false },
          {
            name: 'Annual Report Package', type: 'folder', status: 'ok', length: 128,
            hasChildren: true, expanded: true,
            children: [
              {
                name: 'Draft Versions For Internal Review Only', type: 'folder', status: 'ok', length: 168,
                hasChildren: true, expanded: true,
                children: [
                  {
                    name: 'Final Signed Copy With All Appendices And Supporting Documentation.docx',
                    type: 'file', status: 'warn', length: 240, hasChildren: false, selected: true,
                  },
                  {
                    name: 'Signature Pages', type: 'folder', status: 'ok', length: 184,
                    hasChildren: true, expanded: false, belowIssue: 'error',
                    children: [
                      {
                        name: 'CEO and CFO Countersigned Certification Page - Do Not Distribute Externally.pdf',
                        type: 'file', status: 'error', length: 264, hasChildren: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { name: 'Site Assets', type: 'folder', status: 'ok', length: 105, hasChildren: true, expanded: false, children: [] },
    ],
  },
  {
    name: 'Regulatory Affairs - Documents', type: 'folder', status: 'ok', length: 90,
    hasChildren: true, expanded: false, belowIssue: 'warn', children: [],
  },
  { name: 'Regulatory Affairs - Policies', type: 'folder', status: 'ok', length: 88, hasChildren: true, expanded: false, children: [] },
];

const SELECTED_BREAKDOWN = {
  fullPath:
    SAMPLE_PREFIX.replace(/\\+$/, '') + '\\' + SYNC_FOLDER +
    '\\2024 Filings\\Annual Report Package\\Draft Versions For Internal Review Only' +
    '\\Final Signed Copy With All Appendices And Supporting Documentation.docx',
  prefixLen: 60,
  folderLen: SYNC_FOLDER.length,
  relativeLen: 146,
  total: 240,
};

// Report view results (already sorted by length, descending — the table's default)
const REPORT_ROWS = [
  { type: 'file', library: 'Submissions', path: SAMPLE_PREFIX.replace(/\\+$/, '') + '\\' + SYNC_FOLDER + '\\2024 Filings\\Annual Report Package\\Draft Versions For Internal Review Only\\Signature Pages\\CEO and CFO Countersigned Certification Page - Do Not Distribute Externally.pdf', length: 264, status: 'error' },
  { type: 'file', library: 'Submissions', path: SAMPLE_PREFIX.replace(/\\+$/, '') + '\\' + SYNC_FOLDER + '\\2024 Filings\\Board Meeting Minutes - Confidential Draft Pending Legal Review And Executive Sign-Off.docx', length: 251, status: 'error' },
  { type: 'file', library: 'Submissions', path: SAMPLE_PREFIX.replace(/\\+$/, '') + '\\' + SYNC_FOLDER + '\\2024 Filings\\Annual Report Package\\Draft Versions For Internal Review Only\\Final Signed Copy With All Appendices And Supporting Documentation.docx', length: 240, status: 'warn' },
  { type: 'file', library: 'Documents', path: SAMPLE_PREFIX.replace(/\\+$/, '') + '\\Regulatory Affairs - Documents\\Vendor Qualification\\Vendor Qualification Questionnaire Responses - Batch 3 Of 4 - Pending Follow Up.xlsx', length: 233, status: 'warn' },
  { type: 'folder', library: 'Submissions', path: SAMPLE_PREFIX.replace(/\\+$/, '') + '\\' + SYNC_FOLDER + '\\2024 Filings\\Annual Report Package\\Draft Versions For Internal Review Only', length: 168, status: 'ok' },
  { type: 'file', library: 'Policies', path: SAMPLE_PREFIX.replace(/\\+$/, '') + '\\Regulatory Affairs - Policies\\Data Retention and Records Management Policy v4.pdf', length: 142, status: 'ok' },
  { type: 'file', library: 'Submissions', path: SAMPLE_PREFIX.replace(/\\+$/, '') + '\\' + SYNC_FOLDER + '\\2024 Filings\\Cover Letter.docx', length: 124, status: 'ok' },
  { type: 'file', library: 'Submissions', path: SAMPLE_PREFIX.replace(/\\+$/, '') + '\\' + SYNC_FOLDER + '\\Project Charter.docx', length: 114, status: 'ok' },
];
const SCANNED_TOTAL = 412;
const OVER_COUNT = 37;
const WARNING_COUNT = 64;

// ── Shared fragments ─────────────────────────────────────────────────────────────
function statusMeta(status) {
  if (status === 'error') return { color: COLOR.danger, glyph: '✕', label: 'Over limit' };
  if (status === 'warn') return { color: COLOR.warning, glyph: '!', label: 'Warning' };
  return { color: COLOR.success, glyph: '✓', label: 'OK' };
}
function statusIcon(status, size) {
  const { color, glyph } = statusMeta(status);
  const s = size || 15;
  return `<span style="display:inline-flex;align-items:center;justify-content:center;width:${s}px;height:${s}px;border-radius:50%;background:${color};color:#fff;font-size:${Math.round(s * 0.6)}px;font-weight:700;line-height:1;flex-shrink:0;">${glyph}</span>`;
}
function statusBadge(status) {
  const { color, label } = statusMeta(status);
  return `<span style="display:inline-flex;align-items:center;padding:2px 10px;border-radius:11px;background:${color};color:#fff;font-size:12px;font-weight:600;">${label}</span>`;
}
function folderIcon(size) {
  const s = size || 16;
  return `<svg width="${s}" height="${s}" viewBox="0 0 20 20" style="flex-shrink:0"><path d="M2 5.2C2 4.1 2.9 3.2 4 3.2h4.4c.4 0 .8.16 1.1.44l1.1 1.06H16c1.1 0 2 .9 2 2v8.1c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V5.2Z" fill="#605E5C"/></svg>`;
}
function fileIcon(size) {
  const s = size || 16;
  return `<svg width="${s}" height="${s}" viewBox="0 0 20 20" style="flex-shrink:0"><path d="M5 2.6c0-.66.54-1.2 1.2-1.2h4.9c.32 0 .62.13.85.35l2.9 2.9c.23.23.35.53.35.85V17.4c0 .66-.54 1.2-1.2 1.2H6.2c-.66 0-1.2-.54-1.2-1.2V2.6Z" fill="#A19F9D"/><path d="M11.5 1.7v2.9c0 .5.4.9.9.9h2.9" fill="none" stroke="#FAF9F8" stroke-width="0"/></svg>`;
}
function chevron(expanded) {
  return `<span style="display:inline-flex;width:16px;height:16px;align-items:center;justify-content:center;color:#605E5C;font-size:11px;flex-shrink:0;">${expanded ? '▾' : '▸'}</span>`;
}

function banner(activeView) {
  const reportLabel = activeView === 'report' ? 'Explorer' : 'Report';
  return `
  <div style="display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:16px;padding:10px 12px 10px 16px;background:${COLOR.primary};color:#fff;">
    <div style="display:flex;align-items:center;gap:8px;">
      <svg width="20" height="20" viewBox="0 0 24 24" style="flex-shrink:0"><path fill="#fff" d="M3.5 6.25V8h4.63c.2 0 .39-.08.53-.22l1.53-1.53-1.53-1.53a.75.75 0 0 0-.53-.22H5.25c-.97 0-1.75.78-1.75 1.75Zm-1.5 0C2 4.45 3.46 3 5.25 3h2.88c.6 0 1.17.24 1.59.66l1.84 1.84h7.19c1.8 0 3.25 1.46 3.25 3.25v4.06a6.52 6.52 0 0 0-1.5-1.08V8.75c0-.97-.78-1.75-1.75-1.75h-7.19L9.72 8.84c-.42.42-1 .66-1.6.66H3.5v8.25c0 .97.78 1.75 1.75 1.75h6.06c.18.53.42 1.04.71 1.5H5.25A3.25 3.25 0 0 1 2 17.75V6.25ZM23 17.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Zm-9.5 0c0 .83.26 1.6.7 2.25l5.55-5.56a4 4 0 0 0-6.25 3.3Zm4 4a4 4 0 0 0 3.3-6.25l-5.55 5.56c.64.44 1.42.69 2.25.69Z"/></svg>
      <span style="font-weight:600;font-size:14px;white-space:nowrap;">SharePoint Smart Path Length</span>
    </div>
    <div style="display:flex;align-items:center;justify-content:center;gap:8px;">
      <span style="width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.75);flex-shrink:0;"></span>
      <span style="font-size:13px;">${SITE_URL}</span>
      <span style="font-size:12px;text-decoration:underline;opacity:.9;margin-left:4px;">Change URL</span>
    </div>
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600;cursor:pointer;">
        <svg width="16" height="16" viewBox="0 0 20 20"><path fill="#fff" d="M2 4.5C2 3.67 2.67 3 3.5 3h13c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-13A1.5 1.5 0 0 1 2 15.5v-11ZM4 6v9h12V6H4Zm2 2h3v2H6V8Zm4 0h4v1.2h-4V8ZM6 11h3v2H6v-2Zm4 0h4v1.2h-4V11Z"/></svg>
        ${reportLabel}
      </span>
      <svg width="18" height="18" viewBox="0 0 20 20" style="cursor:pointer"><path fill="#fff" d="M8.4 2.3c.1-.5.5-.8 1-.8h1.2c.5 0 .9.3 1 .8l.2 1.1c.5.2 1 .4 1.4.7l1.1-.4c.5-.2 1 0 1.3.4l.6 1c.3.5.2 1-.2 1.3l-.9.7c.05.3.08.5.08.8s-.03.5-.08.8l.9.7c.4.3.5.9.2 1.3l-.6 1c-.3.4-.8.6-1.3.4l-1.1-.4c-.4.3-.9.5-1.4.7l-.2 1.1c-.1.5-.5.8-1 .8h-1.2c-.5 0-.9-.3-1-.8l-.2-1.1c-.5-.2-1-.4-1.4-.7l-1.1.4c-.5.2-1 0-1.3-.4l-.6-1c-.3-.5-.2-1 .2-1.3l.9-.7C6.03 10.5 6 10.3 6 10s.03-.5.08-.8l-.9-.7c-.4-.3-.5-.9-.2-1.3l.6-1c.3-.4.8-.6 1.3-.4l1.1.4c.4-.3.9-.5 1.4-.7l.2-1.1ZM10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/></svg>
    </div>
  </div>`;
}

// ── Page: Explorer ───────────────────────────────────────────────────────────────
function treeRowsHtml(nodes, depth) {
  return nodes.map((n) => {
    const canExpand = !!n.hasChildren;
    const dot = !n.expanded && n.belowIssue
      ? `<span title="Contains an item ${n.belowIssue === 'error' ? 'over the limit' : 'at warning level'} below" style="width:6px;height:6px;border-radius:50%;background:${n.belowIssue === 'error' ? COLOR.danger : COLOR.warning};margin-left:2px;flex-shrink:0;"></span>`
      : '';
    const rowBg = n.selected ? COLOR.selectedBg : 'transparent';
    const row = `
      <div style="display:flex;align-items:center;gap:6px;padding:5px 8px;padding-left:${depth * 18 + 8}px;background:${rowBg};border-radius:4px;cursor:pointer;">
        ${canExpand ? chevron(n.expanded) : `<span style="width:16px;flex-shrink:0;"></span>`}
        ${n.type === 'folder' ? folderIcon() : fileIcon()}
        <span style="font-size:13px;color:${COLOR.textPrimary};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;">${n.name}</span>
        ${statusIcon(n.status, 14)}
        ${dot}
      </div>`;
    const children = n.expanded && n.children && n.children.length
      ? treeRowsHtml(n.children, depth + 1)
      : '';
    return row + children;
  }).join('');
}

function explorerPage() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: ${FONT}; background: ${COLOR.bg}; }
    .app { display: flex; flex-direction: column; height: 860px; background: ${COLOR.surface}; }
    .toolbar { display: flex; gap: 28px; align-items: flex-end; padding: 14px 16px; border-bottom: 1px solid ${COLOR.border}; }
    .field { display: flex; flex-direction: column; gap: 4px; min-width: 260px; }
    label { font-size: 12px; color: ${COLOR.textSecondary}; font-weight: 600; }
    input { font-family: ${MONO}; font-size: 12.5px; padding: 6px 8px; border: 1px solid #C8C6C4; border-radius: 4px; color: ${COLOR.textPrimary}; }
    .legend { display: flex; align-items: center; gap: 8px; color: ${COLOR.textSecondary}; font-size: 12px; align-self: center; }
    .cols { display: grid; grid-template-columns: 380px 1fr; flex: 1; min-height: 0; }
    .tree { overflow-y: auto; border-right: 1px solid ${COLOR.border}; padding: 10px 6px; }
    .detail { padding: 24px; }
    .pathbox { font-family: ${MONO}; font-size: 13px; background: #F3F2F1; border-radius: 6px; padding: 14px; margin-top: 10px; overflow-wrap: anywhere; line-height: 1.5; }
    table.breakdown { border-collapse: collapse; margin-top: 18px; font-size: 13.5px; }
    table.breakdown td { padding: 5px 0; }
    table.breakdown td:first-child { color: ${COLOR.textSecondary}; padding-right: 20px; }
  </style></head><body>
  <div class="app">
    ${banner('explorer')}
    <div class="toolbar">
      <div class="field">
        <label>SAMPLE ONEDRIVE PATH PREFIX</label>
        <input readonly value="${SAMPLE_PREFIX}" style="width:420px" />
      </div>
      <div class="field">
        <label>LIBRARY SYNC FOLDER NAME (SUBMISSIONS)</label>
        <input readonly value="${SYNC_FOLDER}" style="width:260px" />
      </div>
      <div class="legend">
        <svg width="15" height="15" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="none" stroke="${COLOR.textSecondary}" stroke-width="1.4"/><rect x="9.2" y="5.5" width="1.6" height="6" rx="0.8" fill="${COLOR.textSecondary}"/><rect x="9.2" y="13" width="1.6" height="1.6" rx="0.8" fill="${COLOR.textSecondary}"/></svg>
        Warning at 225+ characters, over limit at 260+ (set in the web part's edit properties)
      </div>
    </div>
    <div class="cols">
      <div class="tree">${treeRowsHtml(TREE, 0)}</div>
      <div class="detail">
        <div style="display:flex;align-items:center;gap:10px;">
          ${fileIcon(20)}
          <span style="font-size:17px;font-weight:600;color:${COLOR.textPrimary};">Final Signed Copy With All Appendices And Supporting Documentation.docx</span>
        </div>
        <div style="margin-top:8px;">${statusBadge('warn')} <span style="font-size:13px;color:${COLOR.textSecondary};margin-left:6px;">240 chars</span></div>
        <div class="pathbox">${SELECTED_BREAKDOWN.fullPath}</div>
        <table class="breakdown">
          <tr><td>Sample path prefix</td><td>${SELECTED_BREAKDOWN.prefixLen} chars</td></tr>
          <tr><td>Library sync folder ("${SYNC_FOLDER}")</td><td>${SELECTED_BREAKDOWN.folderLen} chars</td></tr>
          <tr><td>Relative path within library</td><td>${SELECTED_BREAKDOWN.relativeLen} chars</td></tr>
          <tr><td style="font-weight:700;color:${COLOR.textPrimary}">Total (incl. separators)</td><td style="font-weight:700;color:${COLOR.textPrimary}">${SELECTED_BREAKDOWN.total} chars</td></tr>
        </table>
      </div>
    </div>
  </div>
  </body></html>`;
}

// ── Page: Report (with results) ──────────────────────────────────────────────────
function reportRowHtml(r) {
  return `
    <tr>
      <td style="padding:8px 10px;">${r.type === 'folder' ? folderIcon() : fileIcon()}</td>
      <td style="padding:8px 10px;font-size:13px;color:${COLOR.textPrimary};">${r.library}</td>
      <td style="padding:8px 10px;font-family:${MONO};font-size:12px;color:${COLOR.textPrimary};max-width:560px;overflow-wrap:anywhere;">${r.path}</td>
      <td style="padding:8px 10px;font-size:13px;color:${COLOR.textPrimary};font-variant-numeric:tabular-nums;">${r.length}</td>
      <td style="padding:8px 10px;">${statusBadge(r.status)}</td>
    </tr>`;
}

function reportPage(showExportDialog) {
  const rows = REPORT_ROWS.map(reportRowHtml).join('');
  const dialog = !showExportDialog ? '' : `
    <div style="position:absolute;inset:0;background:rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;">
      <div style="background:${COLOR.surface};border-radius:8px;width:420px;padding:24px;box-shadow:0 8px 28px rgba(0,0,0,.25);">
        <div style="font-size:17px;font-weight:600;color:${COLOR.textPrimary};margin-bottom:18px;">Export report</div>
        <div style="margin-bottom:16px;">
          <div style="font-size:12px;font-weight:600;color:${COLOR.textSecondary};margin-bottom:8px;">FORMAT</div>
          ${radio('CSV', true)}${radio('Excel (.xlsx)', false)}
        </div>
        <div style="margin-bottom:22px;">
          <div style="font-size:12px;font-weight:600;color:${COLOR.textSecondary};margin-bottom:8px;">SCOPE</div>
          ${radio('All paths', false)}${radio('Paths at warning level and over', true)}${radio('Paths over the limit only', false)}
        </div>
        <div style="display:flex;justify-content:flex-end;gap:10px;">
          <button style="${btnStyle('secondary')}">Cancel</button>
          <button style="${btnStyle('primary')}">Export</button>
        </div>
      </div>
    </div>`;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: ${FONT}; background: ${COLOR.bg}; }
    .app { position: relative; display: flex; flex-direction: column; height: 860px; background: ${COLOR.surface}; }
    .head { display: flex; align-items: center; gap: 14px; padding: 12px 16px; }
    .back { display: flex; align-items: center; gap: 6px; font-size: 13px; color: ${COLOR.primary}; font-weight: 600; }
    .toolbar { display: flex; justify-content: space-between; gap: 40px; padding: 14px 16px; border-bottom: 1px solid ${COLOR.border}; align-items: flex-start; }
    .liblist label { display: block; font-size: 13px; color: ${COLOR.textPrimary}; margin: 4px 0; }
    .body { flex: 1; overflow-y: auto; padding: 16px; }
    table.results { width: 100%; border-collapse: collapse; }
    table.results th { text-align: left; padding: 8px 10px; border-bottom: 2px solid ${COLOR.border}; font-size: 12px; color: ${COLOR.textSecondary}; text-transform: uppercase; letter-spacing: .02em; }
    table.results tr:not(:last-child) td { border-bottom: 1px solid ${COLOR.border}; }
  </style></head><body>
  <div class="app">
    ${banner('report')}
    <div class="head">
      <span class="back">&larr; Explorer</span>
      <span style="font-size:15px;font-weight:600;color:${COLOR.textPrimary};">Report</span>
    </div>
    <div class="toolbar">
      <div class="liblist">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
          <span style="font-size:12px;font-weight:600;color:${COLOR.textSecondary};">LIBRARIES TO SCAN</span>
          <span style="font-size:12px;color:${COLOR.primary};font-weight:600;">Select all</span>
          <span style="font-size:12px;color:${COLOR.primary};font-weight:600;">Select none</span>
        </div>
        ${checkbox('Submissions', true)}${checkbox('Documents', true)}${checkbox('Policies', true)}
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <button style="${btnStyle('primary')}">Export report&hellip;</button>
      </div>
    </div>
    <div class="body">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <span style="font-size:13.5px;color:${COLOR.textPrimary};">${SCANNED_TOTAL} items scanned &mdash; ${OVER_COUNT} over limit, ${WARNING_COUNT} at warning level</span>
        <div style="display:flex;gap:18px;font-size:13px;color:${COLOR.textPrimary};">
          ${radioInline('All', true)}${radioInline('Warning &amp; over', false)}${radioInline('Over limit only', false)}
        </div>
      </div>
      <table class="results">
        <thead><tr><th style="width:32px;"></th><th>Library</th><th>Estimated OneDrive Path</th><th>Length</th><th>Status</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    ${dialog}
  </div>
  </body></html>`;
}

function radio(label, checked) {
  return `<div style="display:flex;align-items:center;gap:8px;margin:6px 0;">
    <span style="width:14px;height:14px;border-radius:50%;border:1.5px solid ${checked ? COLOR.primary : '#8A8886'};display:flex;align-items:center;justify-content:center;">
      ${checked ? `<span style="width:7px;height:7px;border-radius:50%;background:${COLOR.primary};"></span>` : ''}
    </span>
    <span style="font-size:13.5px;color:${COLOR.textPrimary};">${label}</span>
  </div>`;
}
function radioInline(label, checked) {
  return `<span style="display:flex;align-items:center;gap:6px;">
    <span style="width:13px;height:13px;border-radius:50%;border:1.5px solid ${checked ? COLOR.primary : '#8A8886'};display:flex;align-items:center;justify-content:center;">
      ${checked ? `<span style="width:6px;height:6px;border-radius:50%;background:${COLOR.primary};"></span>` : ''}
    </span>${label}</span>`;
}
function checkbox(label, checked) {
  return `<div style="display:flex;align-items:center;gap:8px;margin:5px 0;">
    <span style="width:15px;height:15px;border-radius:3px;background:${checked ? COLOR.primary : '#fff'};border:1.5px solid ${checked ? COLOR.primary : '#8A8886'};display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;">${checked ? '✓' : ''}</span>
    <span style="font-size:13.5px;color:${COLOR.textPrimary};">${label}</span>
  </div>`;
}
function btnStyle(kind) {
  if (kind === 'primary') return `background:${COLOR.primary};color:#fff;border:none;border-radius:4px;padding:7px 16px;font-size:13.5px;font-weight:600;font-family:${FONT};cursor:pointer;`;
  return `background:#fff;color:${COLOR.textPrimary};border:1px solid #8A8886;border-radius:4px;padding:7px 16px;font-size:13.5px;font-weight:600;font-family:${FONT};cursor:pointer;`;
}

// ── Page: Settings ────────────────────────────────────────────────────────────────
function settingsPage() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: ${FONT}; background: ${COLOR.surface}; }
    .wrap { max-width: 640px; padding: 36px 40px; }
    .head { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }
    .field { margin-bottom: 24px; }
    .labelrow { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
    label { font-size: 13.5px; font-weight: 600; color: ${COLOR.textPrimary}; }
    input.text { font-family: ${MONO}; font-size: 13px; padding: 7px 10px; border: 1px solid #C8C6C4; border-radius: 4px; width: 420px; }
    .spin { display: flex; align-items: center; border: 1px solid #C8C6C4; border-radius: 4px; width: 100px; }
    .spin input { border: none; text-align: center; width: 40px; font-size: 13.5px; padding: 6px 0; }
    .spin button { border: none; background: #F3F2F1; width: 26px; height: 30px; font-size: 13px; cursor: pointer; }
    .note { font-size: 12.5px; color: ${COLOR.textSecondary}; line-height: 1.6; margin-top: 8px; }
  </style></head><body>
  <div class="wrap">
    <div class="head">
      <span style="color:${COLOR.primary};font-size:13px;font-weight:600;">&larr; Back</span>
      <span style="font-size:20px;font-weight:600;color:${COLOR.textPrimary};">Settings</span>
    </div>
    <div class="field">
      <div class="labelrow">
        <label for="sp">Sample OneDrive path prefix</label>
        <svg width="14" height="14" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="none" stroke="${COLOR.textSecondary}" stroke-width="1.4"/><rect x="9.2" y="8.5" width="1.6" height="5" rx="0.8" fill="${COLOR.textSecondary}"/><rect x="9.2" y="5.6" width="1.6" height="1.6" rx="0.8" fill="${COLOR.textSecondary}"/></svg>
      </div>
      <input class="text" id="sp" readonly value="${SAMPLE_PREFIX}" />
    </div>
    <div class="field">
      <div class="labelrow">
        <label>Concurrent API requests during a full scan</label>
        <svg width="14" height="14" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="none" stroke="${COLOR.textSecondary}" stroke-width="1.4"/><rect x="9.2" y="8.5" width="1.6" height="5" rx="0.8" fill="${COLOR.textSecondary}"/><rect x="9.2" y="5.6" width="1.6" height="1.6" rx="0.8" fill="${COLOR.textSecondary}"/></svg>
      </div>
      <div class="spin"><button>&minus;</button><input readonly value="4" /><button>+</button></div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
      <span style="width:15px;height:15px;border-radius:3px;border:1.5px solid #8A8886;display:inline-block;"></span>
      <span style="font-size:13.5px;color:${COLOR.textPrimary};">Include hidden and system libraries</span>
    </div>
    <p class="note">The warning (225 characters) and over-limit (260 characters) thresholds are set by whoever edits this page &mdash; from the web part's property pane ("Edit web part" &rarr; SharePoint Smart Path Length settings), not here.</p>
  </div>
  </body></html>`;
}

// ── Screenshot runner ─────────────────────────────────────────────────────────────
async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const shots = [
    ['explorer.png', () => explorerPage(), { width: 1440, height: 860 }],
    ['report.png', () => reportPage(false), { width: 1440, height: 860 }],
    ['report-export-dialog.png', () => reportPage(true), { width: 1440, height: 860 }],
    ['settings.png', () => settingsPage(), { width: 760, height: 560 }],
  ];

  for (const [filename, htmlFn, vp] of shots) {
    const pg = await browser.newPage();
    await pg.setViewport(vp);
    await pg.setContent(htmlFn(), { waitUntil: 'load' });
    await pg.screenshot({ path: path.join(OUT, filename) });
    await pg.close();
    console.log('✓', filename);
  }

  await browser.close();
  console.log('\nAll screenshots saved to docs/screenshots/');
}

main().catch((e) => { console.error(e); process.exit(1); });
