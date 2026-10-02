define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Configuratie van SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Drempelwaarden voor padlengte',
    PropertyPane_Group_SamplePath: 'Voorbeeldpad voor OneDrive',
    PropertyPane_WarningLength_Label: 'Waarschuwingslengte (tekens)',
    PropertyPane_ErrorLength_Label: 'Lengte boven limiet (tekens)',
    PropertyPane_SamplePath_Label: 'Standaardvoorvoegsel voor OneDrive-voorbeeldpad',
    PropertyPane_Validation_PositiveInteger: 'Geef een positief geheel getal op.',
    PropertyPane_Validation_WarningLessThanError: 'De waarschuwingslengte moet kleiner zijn dan de lengte boven de limiet.',

    // ── Common ──
    Common_Back: 'Terug',
    Common_Cancel: 'Annuleren',
    Common_Close: 'Sluiten',
    Common_Clear: 'Wissen',
    Common_Connect: 'Verbinden',
    Common_Export: 'Exporteren',
    Common_LoadingLibraries: 'Bibliotheken laden…',
    Common_SamplePathLabel: 'Voorvoegsel voor OneDrive-voorbeeldpad',

    // ── Header ──
    App_ChangeUrl: 'URL wijzigen',
    App_Explorer: 'Verkenner',
    App_Report: 'Rapport',
    App_Settings: 'Instellingen',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Waarschuwing',
    Status_OverLimit: 'Boven limiet',
    StatusDescription_Error: 'Dit pad heeft de geconfigureerde limiet bereikt of overschreden. Het wordt waarschijnlijk niet correct gesynchroniseerd met OneDrive.',
    StatusDescription_Warning: 'Dit pad nadert de geconfigureerde limiet. Het is verstandig het binnenkort in te korten.',
    StatusDescription_Normal: 'Dit pad blijft ruim binnen de geconfigureerde limiet. Er is geen actie nodig.',

    // ── Scope / filters ──
    Scope_All: 'Alle paden',
    Scope_WarningAndOver: 'Paden op waarschuwingsniveau en boven de limiet',
    Scope_OverOnly: 'Alleen paden boven de limiet',
    Filter_All: 'Alle',
    Filter_WarningAndOver: 'Waarschuwing en hoger',
    Filter_OverOnly: 'Alleen boven limiet',

    // ── Path table ──
    Table_Library: 'Bibliotheek',
    Table_EstimatedPath: 'Geschat OneDrive-pad',
    Table_Length: 'Lengte',
    Table_Status: 'Status',
    Table_NoMatch: 'Er zijn geen items die overeenkomen met het huidige filter.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Naam van synchronisatiemap van bibliotheek',
    Explorer_ThresholdLegend: 'Waarschuwing bij {warning}+ tekens, boven limiet bij {error}+ (in te stellen in de bewerkingseigenschappen van de webonderdeel)',
    Explorer_RefreshTooltip: 'Alle bibliotheken opnieuw controleren in realtime, zonder rekening te houden met resultaten in de cache',
    Explorer_Refresh: 'Vernieuwen',
    Explorer_ActivityLog: 'Activiteitenlogboek',
    Explorer_ActivityLogEmpty: 'Er is nog niets vastgelegd.',
    Explorer_TreeAriaLabel: 'Documentbibliotheken',
    Explorer_NoLibraries: 'Er zijn geen documentbibliotheken gevonden op deze site.',
    Explorer_SelectItemPrompt: 'Selecteer een item in de structuur om het geschatte OneDrive-pad en het aantal tekens te zien.',
    Explorer_CouldntList: 'Kan "{path}" niet weergeven: {error}',
    Explorer_CouldntLoad: 'Kan "{path}" niet laden: {error}',
    Explorer_StatusWithChars: '{status} — {count} tekens',
    Explorer_ContainsBelowError: 'Bevat ergens onder deze map een item boven de limiet.',
    Explorer_ContainsBelowWarning: 'Bevat ergens onder deze map een item op waarschuwingsniveau.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Bezig met scannen',
    Legend_ScanningTooltip: 'De achtergrondscan van deze bibliotheek is nog niet voltooid. De puntindicator (niet het pictogram zelf) is mogelijk nog niet definitief.',
    Legend_IssueBelow: 'Probleem eronder',
    Legend_IssueBelowTooltip: 'Deze map bevat ergens binnenin een item op waarschuwingsniveau of boven de limiet, ook als het pad van de map zelf in orde is. Vouw de map uit om te zien welk item het is.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Deze bibliotheek wordt nog gecontroleerd op problemen eronder. De punt is mogelijk nog niet definitief.',
    Tree_ContainsBelowError: 'Bevat eronder een item boven de limiet',
    Tree_ContainsBelowWarning: 'Bevat eronder een item op waarschuwingsniveau',
    Tree_ScanInfo: '{description} (Controle van onderliggende items: {source}, {age}.)',
    Tree_SourceCache: 'uit cache',
    Tree_SourceLive: 'livescan',
    Age_JustNow: 'zojuist',
    Age_OneMinute: '1 min geleden',
    Age_Minutes: '{count} min geleden',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Voorvoegsel voor voorbeeldpad',
    Breakdown_SyncFolder: 'Synchronisatiemap van bibliotheek ("{name}")',
    Breakdown_Relative: 'Relatief pad binnen bibliotheek',
    Breakdown_Total: 'Totaal (incl. scheidingstekens)',
    Breakdown_Chars: '{count} tekens',

    // ── Throttling notices ──
    Throttle_Paused: 'Beperkt door SharePoint. Het scannen op de achtergrond is {seconds} s onderbroken.',
    Throttle_Gentle: 'Het scannen op de achtergrond wordt voorzichtig uitgevoerd (gelijktijdigheid {limit} van {target}) nadat SharePoint het heeft beperkt.',
    Throttle_ReportWaiting: ' — beperkt door SharePoint, {seconds} s wachten',
    Throttle_ReportGentle: ' — voorzichtig uitgevoerd (gelijktijdigheid {limit} van {target}) na {events} beperkingsreactie(s)',

    // ── Report ──
    Report_Title: 'Rapport',
    Report_LibrariesToScan: 'Te scannen bibliotheken',
    Report_SelectAll: 'Alles selecteren',
    Report_SelectNone: 'Niets selecteren',
    Report_RunFullScan: 'Volledige scan uitvoeren',
    Report_Cancelling: 'Annuleren…',
    Report_Scanned: '{count} items gescand…{note}',
    Report_ExportButton: 'Rapport exporteren…',
    Report_Summary: '{total} items gescand — {over} boven limiet, {warning} op waarschuwingsniveau',
    Report_Empty: 'Kies hierboven bibliotheken en voer een volledige scan uit om een rapport te maken.',
    Report_ScanFailed: 'Scan van "{library}" mislukt: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Rapport exporteren',
    Export_Format: 'Indeling',
    Export_Scope: 'Bereik',
    Export_Type: 'Type',
    Export_Folder: 'Map',
    Export_File: 'Bestand',
    Export_ColLibrary: 'Bibliotheek',
    Export_ColPath: 'Geschat OneDrive-pad',
    Export_ColLength: 'Lengte',
    Export_ColStatus: 'Status',
    Export_SheetSummary: 'Overzicht',
    Export_SheetPaths: 'Paden',
    Export_ReportTitle: 'SharePoint Smart Path Length-rapport',
    Export_Generated: 'Gegenereerd',
    Export_ItemsScanned: 'Gescande items',
    Export_OverLimit: 'Boven limiet',
    Export_WarningLevel: 'Waarschuwingsniveau',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Instellingen',
    Settings_SamplePathTooltip: 'Uw OneDrive-synchronisatiemap, bijvoorbeeld C:\\Users\\UsernamePath\\OneDrive - Company\\. Wordt alleen in deze browser opgeslagen en niet gedeeld met andere gebruikers.',
    Settings_ConcurrencyLabel: 'Gelijktijdige API-aanvragen tijdens een volledige scan (bovengrens)',
    Settings_ConcurrencyTooltip: 'Een bovengrens, geen vaste snelheid. Scans beginnen ruim onder deze waarde en voeren de snelheid op zolang SharePoint het bijhoudt. Als SharePoint de scan beperkt, wordt deze onderbroken (met inachtneming van Retry-After), wordt de gelijktijdigheid gehalveerd en loopt deze daarna alleen op tot net onder het niveau waarop werd beperkt, nooit weer tot dat niveau zelf. Verlaag deze waarde als scans nog steeds beperking veroorzaken.',
    Settings_IncludeHidden: 'Verborgen bibliotheken en systeembibliotheken opnemen',
    Settings_ThresholdsNote: 'De drempelwaarden voor waarschuwing ({warning} tekens) en boven de limiet ({error} tekens) worden ingesteld door de persoon die deze pagina bewerkt, via het eigenschappenvenster van het webonderdeel ("Webonderdeel bewerken" → instellingen van SharePoint Smart Path Length), niet hier.'
  };
});
