define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'SharePoint Smart Path Length configuration',
    PropertyPane_Group_Thresholds: 'Path length thresholds',
    PropertyPane_Group_SamplePath: 'OneDrive sample path',
    PropertyPane_WarningLength_Label: 'Warning length (characters)',
    PropertyPane_ErrorLength_Label: 'Over-limit length (characters)',
    PropertyPane_SamplePath_Label: 'Default sample OneDrive path prefix',
    PropertyPane_Validation_PositiveInteger: 'Enter a positive whole number.',
    PropertyPane_Validation_WarningLessThanError: 'The warning length must be less than the over-limit length.',

    // ── Common ──
    Common_Back: 'Back',
    Common_Cancel: 'Cancel',
    Common_Close: 'Close',
    Common_Clear: 'Clear',
    Common_Connect: 'Connect',
    Common_Export: 'Export',
    Common_LoadingLibraries: 'Loading libraries…',
    Common_SamplePathLabel: 'Sample OneDrive path prefix',

    // ── Header ──
    App_ChangeUrl: 'Change URL',
    App_Explorer: 'Explorer',
    App_Report: 'Report',
    App_Settings: 'Settings',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Warning',
    Status_OverLimit: 'Over limit',
    StatusDescription_Error: "This path is at or over the configured limit — it likely won't sync to OneDrive correctly.",
    StatusDescription_Warning: 'This path is approaching the configured limit — worth shortening soon.',
    StatusDescription_Normal: 'This path is comfortably within the configured limit — nothing to do here.',

    // ── Scope / filters ──
    Scope_All: 'All paths',
    Scope_WarningAndOver: 'Paths at warning level and over',
    Scope_OverOnly: 'Paths over the limit only',
    Filter_All: 'All',
    Filter_WarningAndOver: 'Warning & over',
    Filter_OverOnly: 'Over limit only',

    // ── Path table ──
    Table_Library: 'Library',
    Table_EstimatedPath: 'Estimated OneDrive path',
    Table_Length: 'Length',
    Table_Status: 'Status',
    Table_NoMatch: 'No items match the current filter.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Library sync folder name',
    Explorer_ThresholdLegend: "Warning at {warning}+ characters, over limit at {error}+ (set in the web part's edit properties)",
    Explorer_RefreshTooltip: 'Re-check every library live, ignoring cached results',
    Explorer_Refresh: 'Refresh',
    Explorer_ActivityLog: 'Activity log',
    Explorer_ActivityLogEmpty: 'Nothing logged yet.',
    Explorer_TreeAriaLabel: 'Document libraries',
    Explorer_NoLibraries: 'No document libraries found on this site.',
    Explorer_SelectItemPrompt: 'Select an item in the tree to see its estimated OneDrive path and character count.',
    Explorer_CouldntList: 'Couldn\'t list "{path}": {error}',
    Explorer_CouldntLoad: 'Couldn\'t load "{path}": {error}',
    Explorer_StatusWithChars: '{status} — {count} chars',
    Explorer_ContainsBelowError: 'Contains an item over the limit somewhere below this folder.',
    Explorer_ContainsBelowWarning: 'Contains an item at warning level somewhere below this folder.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Scanning',
    Legend_ScanningTooltip: "This library's background scan hasn't finished yet — the dot indicator (not the icon itself) may not be final.",
    Legend_IssueBelow: 'Issue below',
    Legend_IssueBelowTooltip: 'This folder contains a warning- or over-limit item somewhere inside it, even if its own path is fine — expand it to find which one.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Still checking this library for issues below — the dot may not be final yet.',
    Tree_ContainsBelowError: 'Contains an item over the limit below',
    Tree_ContainsBelowWarning: 'Contains an item at warning level below',
    Tree_ScanInfo: '{description} (Below-item check: {source}, {age}.)',
    Tree_SourceCache: 'from cache',
    Tree_SourceLive: 'live scan',
    Age_JustNow: 'just now',
    Age_OneMinute: '1 min ago',
    Age_Minutes: '{count} min ago',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Sample path prefix',
    Breakdown_SyncFolder: 'Library sync folder ("{name}")',
    Breakdown_Relative: 'Relative path within library',
    Breakdown_Total: 'Total (incl. separators)',
    Breakdown_Chars: '{count} chars',

    // ── Throttling notices ──
    Throttle_Paused: 'Throttled by SharePoint — background scanning is paused for {seconds}s.',
    Throttle_Gentle: 'Background scanning is running gently (concurrency {limit} of {target}) after being throttled by SharePoint.',
    Throttle_ReportWaiting: ' — throttled by SharePoint, waiting {seconds}s',
    Throttle_ReportGentle: ' — running gently (concurrency {limit} of {target}) after {events} throttling response(s)',

    // ── Report ──
    Report_Title: 'Report',
    Report_LibrariesToScan: 'Libraries to scan',
    Report_SelectAll: 'Select all',
    Report_SelectNone: 'Select none',
    Report_RunFullScan: 'Run full scan',
    Report_Cancelling: 'Cancelling…',
    Report_Scanned: 'Scanned {count} items…{note}',
    Report_ExportButton: 'Export report…',
    Report_Summary: '{total} items scanned — {over} over limit, {warning} at warning level',
    Report_Empty: 'Choose libraries above and run a full scan to build a report.',
    Report_ScanFailed: 'Scan of "{library}" failed: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Export report',
    Export_Format: 'Format',
    Export_Scope: 'Scope',
    Export_Type: 'Type',
    Export_Folder: 'Folder',
    Export_File: 'File',
    Export_ColLibrary: 'Library',
    Export_ColPath: 'Estimated OneDrive Path',
    Export_ColLength: 'Length',
    Export_ColStatus: 'Status',
    Export_SheetSummary: 'Summary',
    Export_SheetPaths: 'Paths',
    Export_ReportTitle: 'SharePoint Smart Path Length Report',
    Export_Generated: 'Generated',
    Export_ItemsScanned: 'Items scanned',
    Export_OverLimit: 'Over limit',
    Export_WarningLevel: 'Warning level',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Settings',
    Settings_SamplePathTooltip: "Your OneDrive sync root, e.g. C:\\Users\\UsernamePath\\OneDrive - Company\\. Saved to this browser only — it isn't shared with other users.",
    Settings_ConcurrencyLabel: 'Concurrent API requests during a full scan (upper limit)',
    Settings_ConcurrencyTooltip: 'An upper limit, not a fixed rate. Scans start well below this and ramp up while SharePoint is keeping up. If SharePoint throttles the scan, it pauses (honoring Retry-After), halves its concurrency, and afterwards creeps back up only to just below the level that was throttled — never back to it. Lower this if scans still cause throttling.',
    Settings_IncludeHidden: 'Include hidden and system libraries',
    Settings_ThresholdsNote: 'The warning ({warning} characters) and over-limit ({error} characters) thresholds are set by whoever edits this page — from the web part\'s property pane ("Edit web part" → SharePoint Smart Path Length settings), not here.'
  };
});
