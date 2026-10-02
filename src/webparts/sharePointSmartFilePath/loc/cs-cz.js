define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Konfigurace SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Prahové hodnoty délky cesty',
    PropertyPane_Group_SamplePath: 'Ukázková cesta OneDrive',
    PropertyPane_WarningLength_Label: 'Délka pro upozornění (znaky)',
    PropertyPane_ErrorLength_Label: 'Délka překračující limit (znaky)',
    PropertyPane_SamplePath_Label: 'Výchozí předpona ukázkové cesty OneDrive',
    PropertyPane_Validation_PositiveInteger: 'Zadejte kladné celé číslo.',
    PropertyPane_Validation_WarningLessThanError: 'Délka pro upozornění musí být menší než délka překračující limit.',

    // ── Common ──
    Common_Back: 'Zpět',
    Common_Cancel: 'Zrušit',
    Common_Close: 'Zavřít',
    Common_Clear: 'Vymazat',
    Common_Connect: 'Připojit',
    Common_Export: 'Exportovat',
    Common_LoadingLibraries: 'Načítají se knihovny…',
    Common_SamplePathLabel: 'Předpona ukázkové cesty OneDrive',

    // ── Header ──
    App_ChangeUrl: 'Změnit adresu URL',
    App_Explorer: 'Průzkumník',
    App_Report: 'Sestava',
    App_Settings: 'Nastavení',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Upozornění',
    Status_OverLimit: 'Nad limitem',
    StatusDescription_Error: "Tato cesta dosahuje nakonfigurovaného limitu nebo ho překračuje – pravděpodobně se nebude správně synchronizovat s OneDrive.",
    StatusDescription_Warning: 'Tato cesta se blíží nakonfigurovanému limitu – brzy by stálo za to ji zkrátit.',
    StatusDescription_Normal: 'Tato cesta je bezpečně v rámci nakonfigurovaného limitu – není nutné nic dělat.',

    // ── Scope / filters ──
    Scope_All: 'Všechny cesty',
    Scope_WarningAndOver: 'Cesty na úrovni upozornění a nad limitem',
    Scope_OverOnly: 'Pouze cesty nad limitem',
    Filter_All: 'Vše',
    Filter_WarningAndOver: 'Upozornění a nad limitem',
    Filter_OverOnly: 'Pouze nad limitem',

    // ── Path table ──
    Table_Library: 'Knihovna',
    Table_EstimatedPath: 'Odhadovaná cesta OneDrive',
    Table_Length: 'Délka',
    Table_Status: 'Stav',
    Table_NoMatch: 'Aktuálnímu filtru neodpovídají žádné položky.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Název synchronizované složky knihovny',
    Explorer_ThresholdLegend: "Upozornění od {warning}+ znaků, nad limitem od {error}+ (nastavuje se ve vlastnostech úprav webové části)",
    Explorer_RefreshTooltip: 'Znovu zkontrolovat všechny knihovny živě a ignorovat výsledky z mezipaměti',
    Explorer_Refresh: 'Aktualizovat',
    Explorer_ActivityLog: 'Protokol aktivit',
    Explorer_ActivityLogEmpty: 'Zatím nic nebylo zaznamenáno.',
    Explorer_TreeAriaLabel: 'Knihovny dokumentů',
    Explorer_NoLibraries: 'Na tomto webu nebyly nalezeny žádné knihovny dokumentů.',
    Explorer_SelectItemPrompt: 'Vyberte položku ve stromu a zobrazí se její odhadovaná cesta OneDrive a počet znaků.',
    Explorer_CouldntList: 'Nepodařilo se zobrazit seznam „{path}“: {error}',
    Explorer_CouldntLoad: 'Nepodařilo se načíst „{path}“: {error}',
    Explorer_StatusWithChars: '{status} – {count} zn.',
    Explorer_ContainsBelowError: 'Někde pod touto složkou je položka nad limitem.',
    Explorer_ContainsBelowWarning: 'Někde pod touto složkou je položka na úrovni upozornění.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Skenování',
    Legend_ScanningTooltip: "Skenování této knihovny na pozadí ještě neskončilo – indikátor v podobě tečky (nikoli samotná ikona) ještě nemusí být konečný.",
    Legend_IssueBelow: 'Problém níže',
    Legend_IssueBelowTooltip: 'Tato složka obsahuje někde uvnitř položku na úrovni upozornění nebo nad limitem, i když je její vlastní cesta v pořádku – rozbalením zjistíte, která to je.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Tato knihovna se stále kontroluje kvůli problémům níže – tečka ještě nemusí být konečná.',
    Tree_ContainsBelowError: 'Níže je položka nad limitem',
    Tree_ContainsBelowWarning: 'Níže je položka na úrovni upozornění',
    Tree_ScanInfo: '{description} (Kontrola podřízených položek: {source}, {age}.)',
    Tree_SourceCache: 'z mezipaměti',
    Tree_SourceLive: 'živé skenování',
    Age_JustNow: 'právě teď',
    Age_OneMinute: 'před 1 min',
    Age_Minutes: 'před {count} min',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Předpona ukázkové cesty',
    Breakdown_SyncFolder: 'Synchronizovaná složka knihovny („{name}“)',
    Breakdown_Relative: 'Relativní cesta v knihovně',
    Breakdown_Total: 'Celkem (včetně oddělovačů)',
    Breakdown_Chars: '{count} zn.',

    // ── Throttling notices ──
    Throttle_Paused: 'SharePoint omezil rychlost – skenování na pozadí je pozastaveno na {seconds} s.',
    Throttle_Gentle: 'Skenování na pozadí běží šetrně (souběžnost {limit} z {target}) poté, co SharePoint omezil rychlost.',
    Throttle_ReportWaiting: ' – SharePoint omezil rychlost, čeká se {seconds} s',
    Throttle_ReportGentle: ' – běží šetrně (souběžnost {limit} z {target}) po {events} odpovědích o omezení rychlosti',

    // ── Report ──
    Report_Title: 'Sestava',
    Report_LibrariesToScan: 'Knihovny ke skenování',
    Report_SelectAll: 'Vybrat vše',
    Report_SelectNone: 'Zrušit výběr',
    Report_RunFullScan: 'Spustit úplné skenování',
    Report_Cancelling: 'Ruší se…',
    Report_Scanned: 'Naskenováno položek: {count}…{note}',
    Report_ExportButton: 'Exportovat sestavu…',
    Report_Summary: 'Naskenováno položek: {total} – nad limitem: {over}, na úrovni upozornění: {warning}',
    Report_Empty: 'Vyberte výše knihovny a spuštěním úplného skenování vytvořte sestavu.',
    Report_ScanFailed: 'Skenování knihovny „{library}“ se nezdařilo: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Exportovat sestavu',
    Export_Format: 'Formát',
    Export_Scope: 'Rozsah',
    Export_Type: 'Typ',
    Export_Folder: 'Složka',
    Export_File: 'Soubor',
    Export_ColLibrary: 'Knihovna',
    Export_ColPath: 'Odhadovaná cesta OneDrive',
    Export_ColLength: 'Délka',
    Export_ColStatus: 'Stav',
    Export_SheetSummary: 'Souhrn',
    Export_SheetPaths: 'Cesty',
    Export_ReportTitle: 'Sestava SharePoint Smart Path Length',
    Export_Generated: 'Vygenerováno',
    Export_ItemsScanned: 'Naskenované položky',
    Export_OverLimit: 'Nad limitem',
    Export_WarningLevel: 'Úroveň upozornění',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Nastavení',
    Settings_SamplePathTooltip: "Kořenová složka synchronizace OneDrive, např. C:\\Users\\UsernamePath\\OneDrive - Company\\. Ukládá se pouze v tomto prohlížeči – nesdílí se s ostatními uživateli.",
    Settings_ConcurrencyLabel: 'Souběžné požadavky rozhraní API při úplném skenování (horní limit)',
    Settings_ConcurrencyTooltip: 'Horní limit, nikoli pevná rychlost. Skenování začíná výrazně pod ním a zvyšuje se, dokud SharePoint stíhá. Pokud SharePoint skenování omezí, pozastaví se (s dodržením Retry-After), sníží souběžnost na polovinu a poté se opět zvyšuje jen těsně pod úroveň, při které k omezení došlo – nikdy ne až na ni. Pokud skenování stále způsobuje omezování, tuto hodnotu snižte.',
    Settings_IncludeHidden: 'Zahrnout skryté a systémové knihovny',
    Settings_ThresholdsNote: 'Prahové hodnoty upozornění ({warning} znaků) a překročení limitu ({error} znaků) nastavuje ten, kdo tuto stránku upravuje – v podokně vlastností webové části („Upravit webovou část“ → nastavení SharePoint Smart Path Length), nikoli zde.'
  };
});
