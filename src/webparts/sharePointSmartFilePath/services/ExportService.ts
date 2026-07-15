// exceljs is the largest dependency in the bundle and is only needed when the
// user actually exports to .xlsx — load it on demand as a separate webpack
// chunk. Only types are imported statically (erased at compile time).
import type * as ExcelJS from 'exceljs';
import { PathReportEntry, PathStatus } from '../models/models';

let excelModulePromise: Promise<typeof ExcelJS> | undefined;
function loadExcelJS(): Promise<typeof ExcelJS> {
  if (!excelModulePromise) {
    excelModulePromise = import(/* webpackChunkName: 'exceljs' */ 'exceljs')
      .then((m: any) => (m.default ?? m) as typeof ExcelJS);
  }
  return excelModulePromise;
}

const COLOR = {
  headerFill: 'FF0078D4',
  headerFont: 'FFFFFFFF',
  titleFont: 'FF0078D4',
  normalFill: 'FFDFF6DD',
  warningFill: 'FFFFF4CE',
  errorFill: 'FFFDE7E9',
  normalFont: 'FF107C10',
  warningFont: 'FF8A6D00',
  errorFont: 'FFA80000',
};

function statusFillArgb(status: PathStatus): string {
  switch (status) {
    case 'error': return COLOR.errorFill;
    case 'warning': return COLOR.warningFill;
    default: return COLOR.normalFill;
  }
}
function statusFontArgb(status: PathStatus): string {
  switch (status) {
    case 'error': return COLOR.errorFont;
    case 'warning': return COLOR.warningFont;
    default: return COLOR.normalFont;
  }
}
function statusLabel(status: PathStatus): string {
  switch (status) {
    case 'error': return 'Over limit';
    case 'warning': return 'Warning';
    default: return 'OK';
  }
}

function argbFill(hex: string): ExcelJS.Fill {
  return { type: 'pattern', pattern: 'solid', fgColor: { argb: hex } };
}

function timestamp(): string {
  return new Date().toISOString().replace(/[-:T]/g, '').substring(0, 15).replace('.', '');
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export class ExportService {
  // ── CSV ─────────────────────────────────────────────────────────────────

  private csvEscape(v: string | number): string {
    const s = String(v);
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  }

  exportCsv(entries: PathReportEntry[]): void {
    const rows: string[][] = [
      ['Type', 'Library', 'Estimated OneDrive Path', 'Length', 'Status'],
    ];
    for (const e of entries) {
      rows.push([
        e.isFolder ? 'Folder' : 'File',
        e.libraryTitle,
        e.oneDrivePath,
        String(e.oneDrivePathLength),
        statusLabel(e.status),
      ]);
    }
    const content = rows.map((r) => r.map((c) => this.csvEscape(c)).join(',')).join('\r\n');
    const blob = new Blob(['﻿' + content], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, `LongPathReport_${timestamp()}.csv`);
  }

  // ── Excel ───────────────────────────────────────────────────────────────

  async exportExcel(entries: PathReportEntry[]): Promise<void> {
    const Excel = await loadExcelJS();
    const wb = new Excel.Workbook();

    const summary = wb.addWorksheet('Summary');
    const title = summary.getCell('A1');
    title.value = 'SharePoint Smart Path Length Report';
    title.font = { bold: true, size: 16, color: { argb: COLOR.titleFont } };

    const data: [string, string | number][] = [
      ['Generated', new Date().toLocaleString()],
      ['Items scanned', entries.length],
      ['Over limit', entries.filter((e) => e.status === 'error').length],
      ['Warning level', entries.filter((e) => e.status === 'warning').length],
      ['OK', entries.filter((e) => e.status === 'normal').length],
    ];
    data.forEach(([label, value], i) => {
      const row = i + 3;
      summary.getCell(row, 1).value = label;
      summary.getCell(row, 1).font = { bold: true };
      summary.getCell(row, 2).value = value;
    });
    summary.getColumn(1).width = 20;
    summary.getColumn(2).width = 30;

    const ws = wb.addWorksheet('Paths');
    const headers = ['Type', 'Library', 'Estimated OneDrive Path', 'Length', 'Status'];
    const headerRow = ws.getRow(1);
    headers.forEach((h, i) => {
      const cell = headerRow.getCell(i + 1);
      cell.value = h;
      cell.fill = argbFill(COLOR.headerFill);
      cell.font = { bold: true, color: { argb: COLOR.headerFont } };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
    headerRow.commit();
    ws.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];

    entries.forEach((e, idx) => {
      const row = ws.getRow(idx + 2);
      row.getCell(1).value = e.isFolder ? 'Folder' : 'File';
      row.getCell(2).value = e.libraryTitle;
      row.getCell(3).value = e.oneDrivePath;
      row.getCell(4).value = e.oneDrivePathLength;
      row.getCell(4).alignment = { horizontal: 'center' };
      const statusCell = row.getCell(5);
      statusCell.value = statusLabel(e.status);
      statusCell.fill = argbFill(statusFillArgb(e.status));
      statusCell.font = { bold: true, color: { argb: statusFontArgb(e.status) } };
      statusCell.alignment = { horizontal: 'center' };
      row.commit();
    });

    ws.getColumn(1).width = 10;
    ws.getColumn(2).width = 22;
    ws.getColumn(3).width = 90;
    ws.getColumn(4).width = 10;
    ws.getColumn(5).width = 14;
    ws.autoFilter = { from: 'A1', to: 'E1' };

    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer as ArrayBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    downloadBlob(blob, `LongPathReport_${timestamp()}.xlsx`);
  }
}
