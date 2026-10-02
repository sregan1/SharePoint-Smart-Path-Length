define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'SharePoint Smart Path Length konfigurációja',
    PropertyPane_Group_Thresholds: 'Útvonalhossz-küszöbértékek',
    PropertyPane_Group_SamplePath: 'OneDrive-mintaútvonal',
    PropertyPane_WarningLength_Label: 'Figyelmeztetési hossz (karakter)',
    PropertyPane_ErrorLength_Label: 'Korlátot meghaladó hossz (karakter)',
    PropertyPane_SamplePath_Label: 'Alapértelmezett OneDrive-mintaútvonal előtagja',
    PropertyPane_Validation_PositiveInteger: 'Adjon meg egy pozitív egész számot.',
    PropertyPane_Validation_WarningLessThanError: 'A figyelmeztetési hossznak kisebbnek kell lennie a korlátot meghaladó hossznál.',

    // ── Common ──
    Common_Back: 'Vissza',
    Common_Cancel: 'Mégse',
    Common_Close: 'Bezárás',
    Common_Clear: 'Törlés',
    Common_Connect: 'Csatlakozás',
    Common_Export: 'Exportálás',
    Common_LoadingLibraries: 'Tárak betöltése…',
    Common_SamplePathLabel: 'OneDrive-mintaútvonal előtagja',

    // ── Header ──
    App_ChangeUrl: 'URL módosítása',
    App_Explorer: 'Intéző',
    App_Report: 'Jelentés',
    App_Settings: 'Beállítások',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Figyelmeztetés',
    Status_OverLimit: 'Korlát felett',
    StatusDescription_Error: "Ez az útvonal eléri vagy meghaladja a beállított korlátot – valószínűleg nem szinkronizálódik megfelelően a OneDrive-val.",
    StatusDescription_Warning: 'Ez az útvonal közeledik a beállított korláthoz – érdemes hamarosan rövidíteni.',
    StatusDescription_Normal: 'Ez az útvonal bőven a beállított korláton belül van – nincs teendő.',

    // ── Scope / filters ──
    Scope_All: 'Minden útvonal',
    Scope_WarningAndOver: 'Figyelmeztetési szintű és korlát feletti útvonalak',
    Scope_OverOnly: 'Csak a korlát feletti útvonalak',
    Filter_All: 'Mind',
    Filter_WarningAndOver: 'Figyelmeztetés és korlát felett',
    Filter_OverOnly: 'Csak korlát felett',

    // ── Path table ──
    Table_Library: 'Tár',
    Table_EstimatedPath: 'Becsült OneDrive-útvonal',
    Table_Length: 'Hossz',
    Table_Status: 'Állapot',
    Table_NoMatch: 'Nincs a jelenlegi szűrőnek megfelelő elem.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'A tár szinkronizálási mappájának neve',
    Explorer_ThresholdLegend: "Figyelmeztetés {warning}+ karakternél, korlát felett {error}+ karakternél (a webrész szerkesztési tulajdonságai között állítható be)",
    Explorer_RefreshTooltip: 'Minden tár újraellenőrzése élőben, a gyorsítótárazott eredmények figyelmen kívül hagyásával',
    Explorer_Refresh: 'Frissítés',
    Explorer_ActivityLog: 'Tevékenységnapló',
    Explorer_ActivityLogEmpty: 'Még nincs naplózott esemény.',
    Explorer_TreeAriaLabel: 'Dokumentumtárak',
    Explorer_NoLibraries: 'Ezen a webhelyen nem található dokumentumtár.',
    Explorer_SelectItemPrompt: 'Jelöljön ki egy elemet a fában a becsült OneDrive-útvonal és a karakterszám megtekintéséhez.',
    Explorer_CouldntList: 'A(z) „{path}” listázása nem sikerült: {error}',
    Explorer_CouldntLoad: 'A(z) „{path}” betöltése nem sikerült: {error}',
    Explorer_StatusWithChars: '{status} – {count} karakter',
    Explorer_ContainsBelowError: 'A mappa alatt valahol korlát feletti elemet tartalmaz.',
    Explorer_ContainsBelowWarning: 'A mappa alatt valahol figyelmeztetési szintű elemet tartalmaz.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Vizsgálat folyamatban',
    Legend_ScanningTooltip: "Ennek a tárnak a háttérvizsgálata még nem fejeződött be – a pontjelző (nem maga az ikon) még nem biztos, hogy végleges.",
    Legend_IssueBelow: 'Probléma alatta',
    Legend_IssueBelowTooltip: 'Ez a mappa valahol a belsejében figyelmeztetési szintű vagy korlát feletti elemet tartalmaz, még ha a saját útvonala rendben is van – bontsa ki, hogy megtalálja, melyiket.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'A tár alatti problémák ellenőrzése még folyamatban van – a pont még nem biztos, hogy végleges.',
    Tree_ContainsBelowError: 'Alatta korlát feletti elemet tartalmaz',
    Tree_ContainsBelowWarning: 'Alatta figyelmeztetési szintű elemet tartalmaz',
    Tree_ScanInfo: '{description} (Alatta lévő elemek ellenőrzése: {source}, {age}.)',
    Tree_SourceCache: 'gyorsítótárból',
    Tree_SourceLive: 'élő vizsgálat',
    Age_JustNow: 'épp most',
    Age_OneMinute: '1 perce',
    Age_Minutes: '{count} perce',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Mintaútvonal előtagja',
    Breakdown_SyncFolder: 'A tár szinkronizálási mappája („{name}”)',
    Breakdown_Relative: 'Relatív útvonal a táron belül',
    Breakdown_Total: 'Összesen (elválasztókkal együtt)',
    Breakdown_Chars: '{count} karakter',

    // ── Throttling notices ──
    Throttle_Paused: 'A SharePoint szabályozta a forgalmat – a háttérvizsgálat {seconds} mp-re szünetel.',
    Throttle_Gentle: 'A háttérvizsgálat kímélő módban fut (párhuzamosság: {limit} / {target}) a SharePoint általi szabályozás után.',
    Throttle_ReportWaiting: ' – a SharePoint szabályozta a forgalmat, várakozás {seconds} mp-ig',
    Throttle_ReportGentle: ' – kímélő módban fut (párhuzamosság: {limit} / {target}) {events} szabályozási válasz után',

    // ── Report ──
    Report_Title: 'Jelentés',
    Report_LibrariesToScan: 'Vizsgálandó tárak',
    Report_SelectAll: 'Összes kijelölése',
    Report_SelectNone: 'Kijelölés megszüntetése',
    Report_RunFullScan: 'Teljes vizsgálat futtatása',
    Report_Cancelling: 'Megszakítás…',
    Report_Scanned: '{count} elem megvizsgálva…{note}',
    Report_ExportButton: 'Jelentés exportálása…',
    Report_Summary: '{total} elem megvizsgálva – {over} korlát felett, {warning} figyelmeztetési szinten',
    Report_Empty: 'Jelöljön ki tárakat fent, és futtasson teljes vizsgálatot a jelentés elkészítéséhez.',
    Report_ScanFailed: 'A(z) „{library}” vizsgálata sikertelen: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Jelentés exportálása',
    Export_Format: 'Formátum',
    Export_Scope: 'Hatókör',
    Export_Type: 'Típus',
    Export_Folder: 'Mappa',
    Export_File: 'Fájl',
    Export_ColLibrary: 'Tár',
    Export_ColPath: 'Becsült OneDrive-útvonal',
    Export_ColLength: 'Hossz',
    Export_ColStatus: 'Állapot',
    Export_SheetSummary: 'Összegzés',
    Export_SheetPaths: 'Útvonalak',
    Export_ReportTitle: 'SharePoint Smart Path Length jelentés',
    Export_Generated: 'Létrehozva',
    Export_ItemsScanned: 'Megvizsgált elemek',
    Export_OverLimit: 'Korlát felett',
    Export_WarningLevel: 'Figyelmeztetési szint',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Beállítások',
    Settings_SamplePathTooltip: "A OneDrive szinkronizálási gyökere, pl. C:\\Users\\UsernamePath\\OneDrive - Company\\. Csak ebben a böngészőben van mentve – nem lesz megosztva más felhasználókkal.",
    Settings_ConcurrencyLabel: 'Egyidejű API-kérések teljes vizsgálat közben (felső korlát)',
    Settings_ConcurrencyTooltip: 'Felső korlát, nem fix sebesség. A vizsgálatok jóval ez alatt indulnak, és addig gyorsulnak, amíg a SharePoint bírja. Ha a SharePoint szabályozza a vizsgálat forgalmát, az szünetel (a Retry-After figyelembevételével), felezi a párhuzamosságát, majd utána csak a szabályozott szint alá közvetlenül kúszik vissza – azt soha nem éri el. Csökkentse ezt az értéket, ha a vizsgálatok még mindig szabályozást okoznak.',
    Settings_IncludeHidden: 'Rejtett és rendszertárak belefoglalása',
    Settings_ThresholdsNote: 'A figyelmeztetési ({warning} karakter) és a korlát feletti ({error} karakter) küszöbértékeket az oldal szerkesztője állítja be a webrész tulajdonságpaneljén („Webrész szerkesztése” → SharePoint Smart Path Length beállításai), nem itt.'
  };
});
