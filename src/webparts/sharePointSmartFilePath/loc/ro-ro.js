define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Configurare SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Praguri pentru lungimea căii',
    PropertyPane_Group_SamplePath: 'Cale de exemplu OneDrive',
    PropertyPane_WarningLength_Label: 'Lungime de avertizare (caractere)',
    PropertyPane_ErrorLength_Label: 'Lungime peste limită (caractere)',
    PropertyPane_SamplePath_Label: 'Prefix implicit al căii de exemplu OneDrive',
    PropertyPane_Validation_PositiveInteger: 'Introduceți un număr întreg pozitiv.',
    PropertyPane_Validation_WarningLessThanError: 'Lungimea de avertizare trebuie să fie mai mică decât lungimea peste limită.',

    // ── Common ──
    Common_Back: 'Înapoi',
    Common_Cancel: 'Anulare',
    Common_Close: 'Închidere',
    Common_Clear: 'Golire',
    Common_Connect: 'Conectare',
    Common_Export: 'Export',
    Common_LoadingLibraries: 'Se încarcă bibliotecile…',
    Common_SamplePathLabel: 'Prefix cale de exemplu OneDrive',

    // ── Header ──
    App_ChangeUrl: 'Modificare URL',
    App_Explorer: 'Explorator',
    App_Report: 'Raport',
    App_Settings: 'Setări',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Avertisment',
    Status_OverLimit: 'Peste limită',
    StatusDescription_Error: 'Această cale a atins sau a depășit limita configurată — probabil nu se va sincroniza corect cu OneDrive.',
    StatusDescription_Warning: 'Această cale se apropie de limita configurată — merită scurtată în curând.',
    StatusDescription_Normal: 'Această cale se încadrează confortabil în limita configurată — nu este nimic de făcut.',

    // ── Scope / filters ──
    Scope_All: 'Toate căile',
    Scope_WarningAndOver: 'Căi la nivel de avertizare și peste limită',
    Scope_OverOnly: 'Doar căile peste limită',
    Filter_All: 'Toate',
    Filter_WarningAndOver: 'Avertizare și peste limită',
    Filter_OverOnly: 'Doar peste limită',

    // ── Path table ──
    Table_Library: 'Bibliotecă',
    Table_EstimatedPath: 'Cale OneDrive estimată',
    Table_Length: 'Lungime',
    Table_Status: 'Stare',
    Table_NoMatch: 'Niciun element nu corespunde filtrului curent.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Numele folderului de sincronizare al bibliotecii',
    Explorer_ThresholdLegend: 'Avertizare la {warning}+ caractere, peste limită la {error}+ (setat în proprietățile de editare ale web part-ului)',
    Explorer_RefreshTooltip: 'Reverifică în direct fiecare bibliotecă, ignorând rezultatele din cache',
    Explorer_Refresh: 'Reîmprospătare',
    Explorer_ActivityLog: 'Jurnal de activitate',
    Explorer_ActivityLogEmpty: 'Încă nu s-a înregistrat nimic.',
    Explorer_TreeAriaLabel: 'Biblioteci de documente',
    Explorer_NoLibraries: 'Nu s-a găsit nicio bibliotecă de documente pe acest site.',
    Explorer_SelectItemPrompt: 'Selectați un element din arbore pentru a vedea calea OneDrive estimată și numărul de caractere.',
    Explorer_CouldntList: 'Nu s-a putut lista „{path}”: {error}',
    Explorer_CouldntLoad: 'Nu s-a putut încărca „{path}”: {error}',
    Explorer_StatusWithChars: '{status} — {count} car.',
    Explorer_ContainsBelowError: 'Conține un element peste limită undeva sub acest folder.',
    Explorer_ContainsBelowWarning: 'Conține un element la nivel de avertizare undeva sub acest folder.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Se scanează',
    Legend_ScanningTooltip: 'Scanarea în fundal a acestei biblioteci nu s-a terminat încă — indicatorul punct (nu pictograma în sine) poate să nu fie final.',
    Legend_IssueBelow: 'Problemă dedesubt',
    Legend_IssueBelowTooltip: 'Acest folder conține undeva în interior un element la nivel de avertizare sau peste limită, chiar dacă propria cale este în regulă — extindeți-l pentru a găsi care este.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Se verifică încă problemele de sub această bibliotecă — punctul poate să nu fie final.',
    Tree_ContainsBelowError: 'Conține dedesubt un element peste limită',
    Tree_ContainsBelowWarning: 'Conține dedesubt un element la nivel de avertizare',
    Tree_ScanInfo: '{description} (Verificarea elementelor de dedesubt: {source}, {age}.)',
    Tree_SourceCache: 'din cache',
    Tree_SourceLive: 'scanare în direct',
    Age_JustNow: 'chiar acum',
    Age_OneMinute: 'acum 1 min',
    Age_Minutes: 'acum {count} min',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Prefix cale de exemplu',
    Breakdown_SyncFolder: 'Folder de sincronizare al bibliotecii („{name}”)',
    Breakdown_Relative: 'Cale relativă în bibliotecă',
    Breakdown_Total: 'Total (incl. separatori)',
    Breakdown_Chars: '{count} car.',

    // ── Throttling notices ──
    Throttle_Paused: 'Limitat de SharePoint — scanarea în fundal este întreruptă timp de {seconds}s.',
    Throttle_Gentle: 'Scanarea în fundal rulează moderat (concurență {limit} din {target}) după ce a fost limitată de SharePoint.',
    Throttle_ReportWaiting: ' — limitat de SharePoint, se așteaptă {seconds}s',
    Throttle_ReportGentle: ' — rulează moderat (concurență {limit} din {target}) după {events} răspuns(uri) de limitare',

    // ── Report ──
    Report_Title: 'Raport',
    Report_LibrariesToScan: 'Biblioteci de scanat',
    Report_SelectAll: 'Selectare totală',
    Report_SelectNone: 'Nicio selecție',
    Report_RunFullScan: 'Rulare scanare completă',
    Report_Cancelling: 'Se anulează…',
    Report_Scanned: '{count} elemente scanate…{note}',
    Report_ExportButton: 'Exportă raportul…',
    Report_Summary: '{total} elemente scanate — {over} peste limită, {warning} la nivel de avertizare',
    Report_Empty: 'Alegeți bibliotecile de mai sus și rulați o scanare completă pentru a crea un raport.',
    Report_ScanFailed: 'Scanarea „{library}” a eșuat: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Exportă raportul',
    Export_Format: 'Format',
    Export_Scope: 'Domeniu',
    Export_Type: 'Tip',
    Export_Folder: 'Folder',
    Export_File: 'Fișier',
    Export_ColLibrary: 'Bibliotecă',
    Export_ColPath: 'Cale OneDrive estimată',
    Export_ColLength: 'Lungime',
    Export_ColStatus: 'Stare',
    Export_SheetSummary: 'Rezumat',
    Export_SheetPaths: 'Căi',
    Export_ReportTitle: 'Raport SharePoint Smart Path Length',
    Export_Generated: 'Generat',
    Export_ItemsScanned: 'Elemente scanate',
    Export_OverLimit: 'Peste limită',
    Export_WarningLevel: 'Nivel de avertizare',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Setări',
    Settings_SamplePathTooltip: 'Rădăcina de sincronizare OneDrive, de exemplu C:\\Users\\UsernamePath\\OneDrive - Company\\. Salvată doar în acest browser — nu este partajată cu alți utilizatori.',
    Settings_ConcurrencyLabel: 'Solicitări API simultane în timpul unei scanări complete (limită superioară)',
    Settings_ConcurrencyTooltip: 'O limită superioară, nu o rată fixă. Scanările pornesc mult sub această valoare și cresc cât timp SharePoint ține pasul. Dacă SharePoint limitează scanarea, aceasta se întrerupe (respectând Retry-After), își înjumătățește concurența și apoi crește treptat doar până puțin sub nivelul care a fost limitat — niciodată până la el. Reduceți această valoare dacă scanările continuă să provoace limitare.',
    Settings_IncludeHidden: 'Include bibliotecile ascunse și de sistem',
    Settings_ThresholdsNote: 'Pragurile de avertizare ({warning} caractere) și de depășire ({error} caractere) sunt setate de cine editează această pagină — din panoul de proprietăți al web part-ului („Editare web part” → setările SharePoint Smart Path Length), nu de aici.'
  };
});
