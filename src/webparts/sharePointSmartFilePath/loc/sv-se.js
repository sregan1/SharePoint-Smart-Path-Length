define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Konfiguration av SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Tröskelvärden för sökvägslängd',
    PropertyPane_Group_SamplePath: 'OneDrive-exempelsökväg',
    PropertyPane_WarningLength_Label: 'Varningslängd (tecken)',
    PropertyPane_ErrorLength_Label: 'Längd över gränsen (tecken)',
    PropertyPane_SamplePath_Label: 'Standardprefix för OneDrive-exempelsökväg',
    PropertyPane_Validation_PositiveInteger: 'Ange ett positivt heltal.',
    PropertyPane_Validation_WarningLessThanError: 'Varningslängden måste vara mindre än längden över gränsen.',

    // ── Common ──
    Common_Back: 'Tillbaka',
    Common_Cancel: 'Avbryt',
    Common_Close: 'Stäng',
    Common_Clear: 'Rensa',
    Common_Connect: 'Anslut',
    Common_Export: 'Exportera',
    Common_LoadingLibraries: 'Läser in bibliotek…',
    Common_SamplePathLabel: 'Prefix för OneDrive-exempelsökväg',

    // ── Header ──
    App_ChangeUrl: 'Ändra URL',
    App_Explorer: 'Utforskaren',
    App_Report: 'Rapport',
    App_Settings: 'Inställningar',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Varning',
    Status_OverLimit: 'Över gränsen',
    StatusDescription_Error: 'Den här sökvägen har nått eller överskridit den konfigurerade gränsen – den synkroniseras troligen inte korrekt med OneDrive.',
    StatusDescription_Warning: 'Den här sökvägen närmar sig den konfigurerade gränsen – det är värt att korta ned den snart.',
    StatusDescription_Normal: 'Den här sökvägen ligger bekvämt inom den konfigurerade gränsen – inget att göra här.',

    // ── Scope / filters ──
    Scope_All: 'Alla sökvägar',
    Scope_WarningAndOver: 'Sökvägar på varningsnivå och över gränsen',
    Scope_OverOnly: 'Endast sökvägar över gränsen',
    Filter_All: 'Alla',
    Filter_WarningAndOver: 'Varning och över gränsen',
    Filter_OverOnly: 'Endast över gränsen',

    // ── Path table ──
    Table_Library: 'Bibliotek',
    Table_EstimatedPath: 'Beräknad OneDrive-sökväg',
    Table_Length: 'Längd',
    Table_Status: 'Status',
    Table_NoMatch: 'Inga objekt matchar det aktuella filtret.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Namn på bibliotekets synkroniseringsmapp',
    Explorer_ThresholdLegend: "Varning vid {warning}+ tecken, över gränsen vid {error}+ (anges i webbdelens redigeringsegenskaper)",
    Explorer_RefreshTooltip: 'Kontrollera alla bibliotek igen live och ignorera cachelagrade resultat',
    Explorer_Refresh: 'Uppdatera',
    Explorer_ActivityLog: 'Aktivitetslogg',
    Explorer_ActivityLogEmpty: 'Inget har loggats ännu.',
    Explorer_TreeAriaLabel: 'Dokumentbibliotek',
    Explorer_NoLibraries: 'Inga dokumentbibliotek hittades på den här webbplatsen.',
    Explorer_SelectItemPrompt: 'Markera ett objekt i trädet för att se dess beräknade OneDrive-sökväg och antal tecken.',
    Explorer_CouldntList: 'Det gick inte att visa "{path}": {error}',
    Explorer_CouldntLoad: 'Det gick inte att läsa in "{path}": {error}',
    Explorer_StatusWithChars: '{status} – {count} tecken',
    Explorer_ContainsBelowError: 'Innehåller ett objekt över gränsen någonstans under den här mappen.',
    Explorer_ContainsBelowWarning: 'Innehåller ett objekt på varningsnivå någonstans under den här mappen.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Skannar',
    Legend_ScanningTooltip: 'Bakgrundsskanningen av det här biblioteket är inte klar än – punktindikatorn (inte själva ikonen) kanske inte är slutgiltig.',
    Legend_IssueBelow: 'Problem nedanför',
    Legend_IssueBelowTooltip: 'Den här mappen innehåller ett objekt på varningsnivå eller över gränsen någonstans inuti, även om mappens egen sökväg är i ordning – expandera den för att hitta vilket.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Kontrollerar fortfarande det här biblioteket efter problem nedanför – punkten kanske inte är slutgiltig än.',
    Tree_ContainsBelowError: 'Innehåller ett objekt över gränsen nedanför',
    Tree_ContainsBelowWarning: 'Innehåller ett objekt på varningsnivå nedanför',
    Tree_ScanInfo: '{description} (Kontroll av underliggande objekt: {source}, {age}.)',
    Tree_SourceCache: 'från cache',
    Tree_SourceLive: 'live-skanning',
    Age_JustNow: 'nyss',
    Age_OneMinute: 'för 1 min sedan',
    Age_Minutes: 'för {count} min sedan',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Prefix för exempelsökväg',
    Breakdown_SyncFolder: 'Bibliotekets synkroniseringsmapp ("{name}")',
    Breakdown_Relative: 'Relativ sökväg i biblioteket',
    Breakdown_Total: 'Totalt (inkl. avgränsare)',
    Breakdown_Chars: '{count} tecken',

    // ── Throttling notices ──
    Throttle_Paused: 'Begränsad av SharePoint – bakgrundsskanningen är pausad i {seconds} s.',
    Throttle_Gentle: 'Bakgrundsskanningen körs försiktigt (samtidighet {limit} av {target}) efter att ha begränsats av SharePoint.',
    Throttle_ReportWaiting: ' – begränsad av SharePoint, väntar {seconds} s',
    Throttle_ReportGentle: ' – körs försiktigt (samtidighet {limit} av {target}) efter {events} begränsningssvar',

    // ── Report ──
    Report_Title: 'Rapport',
    Report_LibrariesToScan: 'Bibliotek att skanna',
    Report_SelectAll: 'Markera alla',
    Report_SelectNone: 'Avmarkera alla',
    Report_RunFullScan: 'Kör fullständig skanning',
    Report_Cancelling: 'Avbryter…',
    Report_Scanned: '{count} objekt skannade…{note}',
    Report_ExportButton: 'Exportera rapport…',
    Report_Summary: '{total} objekt skannade – {over} över gränsen, {warning} på varningsnivå',
    Report_Empty: 'Välj bibliotek ovan och kör en fullständig skanning för att skapa en rapport.',
    Report_ScanFailed: 'Skanningen av "{library}" misslyckades: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Exportera rapport',
    Export_Format: 'Format',
    Export_Scope: 'Omfång',
    Export_Type: 'Typ',
    Export_Folder: 'Mapp',
    Export_File: 'Fil',
    Export_ColLibrary: 'Bibliotek',
    Export_ColPath: 'Beräknad OneDrive-sökväg',
    Export_ColLength: 'Längd',
    Export_ColStatus: 'Status',
    Export_SheetSummary: 'Sammanfattning',
    Export_SheetPaths: 'Sökvägar',
    Export_ReportTitle: 'Rapport från SharePoint Smart Path Length',
    Export_Generated: 'Skapad',
    Export_ItemsScanned: 'Skannade objekt',
    Export_OverLimit: 'Över gränsen',
    Export_WarningLevel: 'Varningsnivå',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Inställningar',
    Settings_SamplePathTooltip: 'Din OneDrive-synkroniseringsrot, t.ex. C:\\Users\\UsernamePath\\OneDrive - Company\\. Sparas endast i den här webbläsaren – delas inte med andra användare.',
    Settings_ConcurrencyLabel: 'Samtidiga API-begäranden under en fullständig skanning (övre gräns)',
    Settings_ConcurrencyTooltip: 'En övre gräns, inte en fast takt. Skanningar startar långt under den och ökar så länge SharePoint hänger med. Om SharePoint begränsar skanningen pausas den (med hänsyn till Retry-After), halverar sin samtidighet och ökar därefter gradvis endast till strax under den nivå som begränsades – aldrig tillbaka till den. Sänk det här värdet om skanningar fortfarande orsakar begränsning.',
    Settings_IncludeHidden: 'Ta med dolda bibliotek och systembibliotek',
    Settings_ThresholdsNote: 'Tröskelvärdena för varning ({warning} tecken) och över gränsen ({error} tecken) anges av den som redigerar den här sidan – från webbdelens egenskapsfönster ("Redigera webbdel" → inställningar för SharePoint Smart Path Length), inte här.'
  };
});
