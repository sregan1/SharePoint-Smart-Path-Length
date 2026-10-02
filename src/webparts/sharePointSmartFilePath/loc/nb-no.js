define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Konfigurasjon av SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Terskler for banelengde',
    PropertyPane_Group_SamplePath: 'OneDrive-eksempelbane',
    PropertyPane_WarningLength_Label: 'Advarselslengde (tegn)',
    PropertyPane_ErrorLength_Label: 'Lengde over grensen (tegn)',
    PropertyPane_SamplePath_Label: 'Standard prefiks for OneDrive-eksempelbane',
    PropertyPane_Validation_PositiveInteger: 'Angi et positivt heltall.',
    PropertyPane_Validation_WarningLessThanError: 'Advarselslengden må være mindre enn lengden over grensen.',

    // ── Common ──
    Common_Back: 'Tilbake',
    Common_Cancel: 'Avbryt',
    Common_Close: 'Lukk',
    Common_Clear: 'Tøm',
    Common_Connect: 'Koble til',
    Common_Export: 'Eksporter',
    Common_LoadingLibraries: 'Laster inn biblioteker …',
    Common_SamplePathLabel: 'Prefiks for OneDrive-eksempelbane',

    // ── Header ──
    App_ChangeUrl: 'Endre URL-adresse',
    App_Explorer: 'Utforsker',
    App_Report: 'Rapport',
    App_Settings: 'Innstillinger',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Advarsel',
    Status_OverLimit: 'Over grensen',
    StatusDescription_Error: 'Denne banen er på eller over den konfigurerte grensen – den synkroniseres sannsynligvis ikke riktig til OneDrive.',
    StatusDescription_Warning: 'Denne banen nærmer seg den konfigurerte grensen – det er lurt å forkorte den snart.',
    StatusDescription_Normal: 'Denne banen er godt innenfor den konfigurerte grensen – ingen handling er nødvendig.',

    // ── Scope / filters ──
    Scope_All: 'Alle baner',
    Scope_WarningAndOver: 'Baner på advarselsnivå og over grensen',
    Scope_OverOnly: 'Bare baner over grensen',
    Filter_All: 'Alle',
    Filter_WarningAndOver: 'Advarsel og over',
    Filter_OverOnly: 'Bare over grensen',

    // ── Path table ──
    Table_Library: 'Bibliotek',
    Table_EstimatedPath: 'Beregnet OneDrive-bane',
    Table_Length: 'Lengde',
    Table_Status: 'Status',
    Table_NoMatch: 'Ingen elementer samsvarer med gjeldende filter.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Navn på synkroniseringsmappe for bibliotek',
    Explorer_ThresholdLegend: 'Advarsel ved {warning}+ tegn, over grensen ved {error}+ (angis i redigeringsegenskapene for webdelen)',
    Explorer_RefreshTooltip: 'Kontroller alle biblioteker på nytt i sanntid, og ignorer hurtigbufrede resultater',
    Explorer_Refresh: 'Oppdater',
    Explorer_ActivityLog: 'Aktivitetslogg',
    Explorer_ActivityLogEmpty: 'Ingenting er logget ennå.',
    Explorer_TreeAriaLabel: 'Dokumentbiblioteker',
    Explorer_NoLibraries: 'Fant ingen dokumentbiblioteker på dette nettstedet.',
    Explorer_SelectItemPrompt: 'Velg et element i treet for å se den beregnede OneDrive-banen og antall tegn.',
    Explorer_CouldntList: 'Kunne ikke vise «{path}»: {error}',
    Explorer_CouldntLoad: 'Kunne ikke laste inn «{path}»: {error}',
    Explorer_StatusWithChars: '{status} – {count} tegn',
    Explorer_ContainsBelowError: 'Inneholder et element over grensen et sted under denne mappen.',
    Explorer_ContainsBelowWarning: 'Inneholder et element på advarselsnivå et sted under denne mappen.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Skanner',
    Legend_ScanningTooltip: 'Bakgrunnsskanningen av dette biblioteket er ikke ferdig ennå – punktindikatoren (ikke selve ikonet) er kanskje ikke endelig.',
    Legend_IssueBelow: 'Problem under',
    Legend_IssueBelowTooltip: 'Denne mappen inneholder et element på advarselsnivå eller over grensen et sted inni seg, selv om selve banen er i orden – utvid den for å finne hvilket.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Kontrollerer fortsatt dette biblioteket for problemer under – punktet er kanskje ikke endelig ennå.',
    Tree_ContainsBelowError: 'Inneholder et element over grensen under',
    Tree_ContainsBelowWarning: 'Inneholder et element på advarselsnivå under',
    Tree_ScanInfo: '{description} (Kontroll av underelementer: {source}, {age}.)',
    Tree_SourceCache: 'fra hurtigbuffer',
    Tree_SourceLive: 'sanntidsskanning',
    Age_JustNow: 'akkurat nå',
    Age_OneMinute: '1 min siden',
    Age_Minutes: '{count} min siden',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Prefiks for eksempelbane',
    Breakdown_SyncFolder: 'Synkroniseringsmappe for bibliotek («{name}»)',
    Breakdown_Relative: 'Relativ bane i biblioteket',
    Breakdown_Total: 'Totalt (inkl. skilletegn)',
    Breakdown_Chars: '{count} tegn',

    // ── Throttling notices ──
    Throttle_Paused: 'Strupet av SharePoint – bakgrunnsskanningen er satt på pause i {seconds} s.',
    Throttle_Gentle: 'Bakgrunnsskanningen kjører forsiktig (samtidighet {limit} av {target}) etter å ha blitt strupet av SharePoint.',
    Throttle_ReportWaiting: ' – strupet av SharePoint, venter {seconds} s',
    Throttle_ReportGentle: ' – kjører forsiktig (samtidighet {limit} av {target}) etter {events} strupingssvar',

    // ── Report ──
    Report_Title: 'Rapport',
    Report_LibrariesToScan: 'Biblioteker som skal skannes',
    Report_SelectAll: 'Merk alle',
    Report_SelectNone: 'Fjern alle merker',
    Report_RunFullScan: 'Kjør full skanning',
    Report_Cancelling: 'Avbryter …',
    Report_Scanned: 'Skannet {count} elementer …{note}',
    Report_ExportButton: 'Eksporter rapport …',
    Report_Summary: '{total} elementer skannet – {over} over grensen, {warning} på advarselsnivå',
    Report_Empty: 'Velg biblioteker ovenfor og kjør en full skanning for å lage en rapport.',
    Report_ScanFailed: 'Skanning av «{library}» mislyktes: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Eksporter rapport',
    Export_Format: 'Format',
    Export_Scope: 'Omfang',
    Export_Type: 'Type',
    Export_Folder: 'Mappe',
    Export_File: 'Fil',
    Export_ColLibrary: 'Bibliotek',
    Export_ColPath: 'Beregnet OneDrive-bane',
    Export_ColLength: 'Lengde',
    Export_ColStatus: 'Status',
    Export_SheetSummary: 'Sammendrag',
    Export_SheetPaths: 'Baner',
    Export_ReportTitle: 'Rapport fra SharePoint Smart Path Length',
    Export_Generated: 'Opprettet',
    Export_ItemsScanned: 'Elementer skannet',
    Export_OverLimit: 'Over grensen',
    Export_WarningLevel: 'Advarselsnivå',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Innstillinger',
    Settings_SamplePathTooltip: 'Synkroniseringsroten for OneDrive, f.eks. C:\\Users\\UsernamePath\\OneDrive - Company\\. Lagres bare i denne nettleseren – den deles ikke med andre brukere.',
    Settings_ConcurrencyLabel: 'Samtidige API-forespørsler under en full skanning (øvre grense)',
    Settings_ConcurrencyTooltip: 'En øvre grense, ikke en fast hastighet. Skanninger starter godt under denne verdien og øker så lenge SharePoint henger med. Hvis SharePoint struper skanningen, settes den på pause (med respekt for Retry-After), halverer samtidigheten og øker deretter gradvis igjen, men bare til rett under nivået som ble strupet – aldri helt opp til det. Senk denne verdien hvis skanninger fortsatt fører til struping.',
    Settings_IncludeHidden: 'Ta med skjulte biblioteker og systembiblioteker',
    Settings_ThresholdsNote: 'Terskelene for advarsel ({warning} tegn) og over grensen ({error} tegn) angis av den som redigerer denne siden – fra egenskapsruten for webdelen («Rediger webdel» → innstillinger for SharePoint Smart Path Length), ikke her.'
  };
});
