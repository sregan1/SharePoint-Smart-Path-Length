define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Konfiguration af SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Grænseværdier for stilængde',
    PropertyPane_Group_SamplePath: 'Eksempelsti til OneDrive',
    PropertyPane_WarningLength_Label: 'Længde for advarsel (tegn)',
    PropertyPane_ErrorLength_Label: 'Længde over grænsen (tegn)',
    PropertyPane_SamplePath_Label: 'Standardpræfiks for eksempelsti til OneDrive',
    PropertyPane_Validation_PositiveInteger: 'Angiv et positivt heltal.',
    PropertyPane_Validation_WarningLessThanError: 'Længden for advarsel skal være mindre end længden over grænsen.',

    // ── Common ──
    Common_Back: 'Tilbage',
    Common_Cancel: 'Annuller',
    Common_Close: 'Luk',
    Common_Clear: 'Ryd',
    Common_Connect: 'Opret forbindelse',
    Common_Export: 'Eksporter',
    Common_LoadingLibraries: 'Indlæser biblioteker…',
    Common_SamplePathLabel: 'Præfiks for eksempelsti til OneDrive',

    // ── Header ──
    App_ChangeUrl: 'Skift URL-adresse',
    App_Explorer: 'Stifinder',
    App_Report: 'Rapport',
    App_Settings: 'Indstillinger',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Advarsel',
    Status_OverLimit: 'Over grænsen',
    StatusDescription_Error: "Denne sti har nået eller overskredet den konfigurerede grænse – den bliver sandsynligvis ikke synkroniseret korrekt til OneDrive.",
    StatusDescription_Warning: 'Denne sti nærmer sig den konfigurerede grænse – den bør snart forkortes.',
    StatusDescription_Normal: 'Denne sti ligger fint inden for den konfigurerede grænse – der er intet at gøre her.',

    // ── Scope / filters ──
    Scope_All: 'Alle stier',
    Scope_WarningAndOver: 'Stier på advarselsniveau og derover',
    Scope_OverOnly: 'Kun stier over grænsen',
    Filter_All: 'Alle',
    Filter_WarningAndOver: 'Advarsel og derover',
    Filter_OverOnly: 'Kun over grænsen',

    // ── Path table ──
    Table_Library: 'Bibliotek',
    Table_EstimatedPath: 'Anslået OneDrive-sti',
    Table_Length: 'Længde',
    Table_Status: 'Status',
    Table_NoMatch: 'Ingen elementer matcher det aktuelle filter.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Navn på bibliotekets synkroniseringsmappe',
    Explorer_ThresholdLegend: "Advarsel ved {warning}+ tegn, over grænsen ved {error}+ (angives i webdelens redigeringsegenskaber)",
    Explorer_RefreshTooltip: 'Kontroller alle biblioteker igen live, og ignorer cachelagrede resultater',
    Explorer_Refresh: 'Opdater',
    Explorer_ActivityLog: 'Aktivitetslog',
    Explorer_ActivityLogEmpty: 'Der er endnu ikke logført noget.',
    Explorer_TreeAriaLabel: 'Dokumentbiblioteker',
    Explorer_NoLibraries: 'Der blev ikke fundet nogen dokumentbiblioteker på dette websted.',
    Explorer_SelectItemPrompt: 'Vælg et element i træet for at se dets anslåede OneDrive-sti og antal tegn.',
    Explorer_CouldntList: 'Kunne ikke vise "{path}": {error}',
    Explorer_CouldntLoad: 'Kunne ikke indlæse "{path}": {error}',
    Explorer_StatusWithChars: '{status} – {count} tegn',
    Explorer_ContainsBelowError: 'Indeholder et element over grænsen et sted under denne mappe.',
    Explorer_ContainsBelowWarning: 'Indeholder et element på advarselsniveau et sted under denne mappe.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Scanner',
    Legend_ScanningTooltip: "Dette biblioteks baggrundsscanning er ikke færdig endnu – prikindikatoren (ikke selve ikonet) er muligvis ikke endelig.",
    Legend_IssueBelow: 'Problem nedenfor',
    Legend_IssueBelowTooltip: 'Denne mappe indeholder et element på advarselsniveau eller over grænsen et sted indeni, selvom mappens egen sti er i orden – udvid den for at finde ud af hvilket.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Dette bibliotek kontrolleres stadig for problemer nedenfor – prikken er muligvis ikke endelig endnu.',
    Tree_ContainsBelowError: 'Indeholder et element over grænsen nedenfor',
    Tree_ContainsBelowWarning: 'Indeholder et element på advarselsniveau nedenfor',
    Tree_ScanInfo: '{description} (Kontrol af underliggende elementer: {source}, {age}.)',
    Tree_SourceCache: 'fra cache',
    Tree_SourceLive: 'live scanning',
    Age_JustNow: 'lige nu',
    Age_OneMinute: 'for 1 min. siden',
    Age_Minutes: 'for {count} min. siden',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Præfiks for eksempelsti',
    Breakdown_SyncFolder: 'Bibliotekets synkroniseringsmappe ("{name}")',
    Breakdown_Relative: 'Relativ sti i biblioteket',
    Breakdown_Total: 'I alt (inkl. skilletegn)',
    Breakdown_Chars: '{count} tegn',

    // ── Throttling notices ──
    Throttle_Paused: 'Begrænset af SharePoint – baggrundsscanning er sat på pause i {seconds} s.',
    Throttle_Gentle: 'Baggrundsscanning kører skånsomt (samtidighed {limit} af {target}), efter at SharePoint har begrænset den.',
    Throttle_ReportWaiting: ' – begrænset af SharePoint, venter {seconds} s',
    Throttle_ReportGentle: ' – kører skånsomt (samtidighed {limit} af {target}) efter {events} svar om begrænsning',

    // ── Report ──
    Report_Title: 'Rapport',
    Report_LibrariesToScan: 'Biblioteker, der skal scannes',
    Report_SelectAll: 'Markér alle',
    Report_SelectNone: 'Fravælg alle',
    Report_RunFullScan: 'Kør fuld scanning',
    Report_Cancelling: 'Annullerer…',
    Report_Scanned: 'Scannede {count} elementer…{note}',
    Report_ExportButton: 'Eksporter rapport…',
    Report_Summary: '{total} elementer scannet – {over} over grænsen, {warning} på advarselsniveau',
    Report_Empty: 'Vælg biblioteker ovenfor, og kør en fuld scanning for at oprette en rapport.',
    Report_ScanFailed: 'Scanning af "{library}" mislykkedes: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Eksporter rapport',
    Export_Format: 'Format',
    Export_Scope: 'Omfang',
    Export_Type: 'Type',
    Export_Folder: 'Mappe',
    Export_File: 'Fil',
    Export_ColLibrary: 'Bibliotek',
    Export_ColPath: 'Anslået OneDrive-sti',
    Export_ColLength: 'Længde',
    Export_ColStatus: 'Status',
    Export_SheetSummary: 'Oversigt',
    Export_SheetPaths: 'Stier',
    Export_ReportTitle: 'Rapport fra SharePoint Smart Path Length',
    Export_Generated: 'Oprettet',
    Export_ItemsScanned: 'Scannede elementer',
    Export_OverLimit: 'Over grænsen',
    Export_WarningLevel: 'Advarselsniveau',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Indstillinger',
    Settings_SamplePathTooltip: "Din OneDrive-synkroniseringsrod, f.eks. C:\\Users\\UsernamePath\\OneDrive - Company\\. Gemmes kun i denne browser – deles ikke med andre brugere.",
    Settings_ConcurrencyLabel: 'Samtidige API-anmodninger under en fuld scanning (øvre grænse)',
    Settings_ConcurrencyTooltip: 'En øvre grænse, ikke en fast hastighed. Scanninger starter et godt stykke under den og øger tempoet, så længe SharePoint følger med. Hvis SharePoint begrænser scanningen, sættes den på pause (med respekt for Retry-After), halverer sin samtidighed og øger den bagefter kun til lige under det niveau, der blev begrænset – aldrig helt tilbage til det. Sænk denne værdi, hvis scanninger stadig medfører begrænsning.',
    Settings_IncludeHidden: 'Medtag skjulte biblioteker og systembiblioteker',
    Settings_ThresholdsNote: 'Grænseværdierne for advarsel ({warning} tegn) og over grænsen ({error} tegn) angives af den, der redigerer denne side – i webdelens egenskabsrude ("Rediger webdel" → indstillinger for SharePoint Smart Path Length), ikke her.'
  };
});
