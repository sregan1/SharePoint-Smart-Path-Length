define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Konfiguracja SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Progi długości ścieżki',
    PropertyPane_Group_SamplePath: 'Przykładowa ścieżka usługi OneDrive',
    PropertyPane_WarningLength_Label: 'Długość ostrzeżenia (znaki)',
    PropertyPane_ErrorLength_Label: 'Długość po przekroczeniu limitu (znaki)',
    PropertyPane_SamplePath_Label: 'Domyślny prefiks przykładowej ścieżki usługi OneDrive',
    PropertyPane_Validation_PositiveInteger: 'Wprowadź dodatnią liczbę całkowitą.',
    PropertyPane_Validation_WarningLessThanError: 'Długość ostrzeżenia musi być mniejsza niż długość po przekroczeniu limitu.',

    // ── Common ──
    Common_Back: 'Wstecz',
    Common_Cancel: 'Anuluj',
    Common_Close: 'Zamknij',
    Common_Clear: 'Wyczyść',
    Common_Connect: 'Połącz',
    Common_Export: 'Eksportuj',
    Common_LoadingLibraries: 'Ładowanie bibliotek…',
    Common_SamplePathLabel: 'Prefiks przykładowej ścieżki usługi OneDrive',

    // ── Header ──
    App_ChangeUrl: 'Zmień adres URL',
    App_Explorer: 'Eksplorator',
    App_Report: 'Raport',
    App_Settings: 'Ustawienia',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Ostrzeżenie',
    Status_OverLimit: 'Przekroczono limit',
    StatusDescription_Error: 'Ta ścieżka osiągnęła skonfigurowany limit lub go przekroczyła — prawdopodobnie nie zostanie prawidłowo zsynchronizowana z usługą OneDrive.',
    StatusDescription_Warning: 'Ta ścieżka zbliża się do skonfigurowanego limitu — warto ją wkrótce skrócić.',
    StatusDescription_Normal: 'Ta ścieżka mieści się z dużym zapasem w skonfigurowanym limicie — nie trzeba nic robić.',

    // ── Scope / filters ──
    Scope_All: 'Wszystkie ścieżki',
    Scope_WarningAndOver: 'Ścieżki na poziomie ostrzeżenia i powyżej limitu',
    Scope_OverOnly: 'Tylko ścieżki powyżej limitu',
    Filter_All: 'Wszystkie',
    Filter_WarningAndOver: 'Ostrzeżenie i powyżej',
    Filter_OverOnly: 'Tylko powyżej limitu',

    // ── Path table ──
    Table_Library: 'Biblioteka',
    Table_EstimatedPath: 'Szacowana ścieżka usługi OneDrive',
    Table_Length: 'Długość',
    Table_Status: 'Stan',
    Table_NoMatch: 'Żadne elementy nie pasują do bieżącego filtru.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Nazwa folderu synchronizacji biblioteki',
    Explorer_ThresholdLegend: 'Ostrzeżenie przy {warning}+ znakach, przekroczenie limitu przy {error}+ (ustawiane we właściwościach edycji składnika web part)',
    Explorer_RefreshTooltip: 'Sprawdź ponownie każdą bibliotekę na żywo, ignorując wyniki z pamięci podręcznej',
    Explorer_Refresh: 'Odśwież',
    Explorer_ActivityLog: 'Dziennik aktywności',
    Explorer_ActivityLogEmpty: 'Nic jeszcze nie zarejestrowano.',
    Explorer_TreeAriaLabel: 'Biblioteki dokumentów',
    Explorer_NoLibraries: 'Nie znaleziono bibliotek dokumentów w tej witrynie.',
    Explorer_SelectItemPrompt: 'Wybierz element w drzewie, aby zobaczyć jego szacowaną ścieżkę usługi OneDrive i liczbę znaków.',
    Explorer_CouldntList: 'Nie można wyświetlić listy „{path}”: {error}',
    Explorer_CouldntLoad: 'Nie można załadować „{path}”: {error}',
    Explorer_StatusWithChars: '{status} — {count} zn.',
    Explorer_ContainsBelowError: 'Zawiera element powyżej limitu gdzieś poniżej tego folderu.',
    Explorer_ContainsBelowWarning: 'Zawiera element na poziomie ostrzeżenia gdzieś poniżej tego folderu.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Skanowanie',
    Legend_ScanningTooltip: 'Skanowanie tej biblioteki w tle jeszcze się nie zakończyło — wskaźnik w postaci kropki (nie sama ikona) może nie być ostateczny.',
    Legend_IssueBelow: 'Problem poniżej',
    Legend_IssueBelowTooltip: 'Ten folder zawiera gdzieś w środku element na poziomie ostrzeżenia lub powyżej limitu, nawet jeśli jego własna ścieżka jest prawidłowa — rozwiń go, aby znaleźć ten element.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Trwa sprawdzanie tej biblioteki pod kątem problemów poniżej — kropka może nie być jeszcze ostateczna.',
    Tree_ContainsBelowError: 'Zawiera poniżej element powyżej limitu',
    Tree_ContainsBelowWarning: 'Zawiera poniżej element na poziomie ostrzeżenia',
    Tree_ScanInfo: '{description} (Sprawdzanie elementów podrzędnych: {source}, {age}.)',
    Tree_SourceCache: 'z pamięci podręcznej',
    Tree_SourceLive: 'skanowanie na żywo',
    Age_JustNow: 'przed chwilą',
    Age_OneMinute: '1 min temu',
    Age_Minutes: '{count} min temu',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Prefiks przykładowej ścieżki',
    Breakdown_SyncFolder: 'Folder synchronizacji biblioteki („{name}”)',
    Breakdown_Relative: 'Ścieżka względna w bibliotece',
    Breakdown_Total: 'Razem (ze znakami rozdzielającymi)',
    Breakdown_Chars: '{count} zn.',

    // ── Throttling notices ──
    Throttle_Paused: 'Ograniczono przez usługę SharePoint — skanowanie w tle jest wstrzymane na {seconds} s.',
    Throttle_Gentle: 'Skanowanie w tle działa w trybie oszczędnym (współbieżność {limit} z {target}) po ograniczeniu przez usługę SharePoint.',
    Throttle_ReportWaiting: ' — ograniczono przez usługę SharePoint, oczekiwanie {seconds} s',
    Throttle_ReportGentle: ' — działanie w trybie oszczędnym (współbieżność {limit} z {target}) po odpowiedziach ograniczających: {events}',

    // ── Report ──
    Report_Title: 'Raport',
    Report_LibrariesToScan: 'Biblioteki do przeskanowania',
    Report_SelectAll: 'Zaznacz wszystko',
    Report_SelectNone: 'Nie zaznaczaj niczego',
    Report_RunFullScan: 'Uruchom pełne skanowanie',
    Report_Cancelling: 'Anulowanie…',
    Report_Scanned: 'Przeskanowano elementów: {count}…{note}',
    Report_ExportButton: 'Eksportuj raport…',
    Report_Summary: 'Przeskanowano elementów: {total} — powyżej limitu: {over}, na poziomie ostrzeżenia: {warning}',
    Report_Empty: 'Wybierz biblioteki powyżej i uruchom pełne skanowanie, aby utworzyć raport.',
    Report_ScanFailed: 'Skanowanie „{library}” nie powiodło się: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Eksportuj raport',
    Export_Format: 'Format',
    Export_Scope: 'Zakres',
    Export_Type: 'Typ',
    Export_Folder: 'Folder',
    Export_File: 'Plik',
    Export_ColLibrary: 'Biblioteka',
    Export_ColPath: 'Szacowana ścieżka usługi OneDrive',
    Export_ColLength: 'Długość',
    Export_ColStatus: 'Stan',
    Export_SheetSummary: 'Podsumowanie',
    Export_SheetPaths: 'Ścieżki',
    Export_ReportTitle: 'Raport SharePoint Smart Path Length',
    Export_Generated: 'Wygenerowano',
    Export_ItemsScanned: 'Przeskanowane elementy',
    Export_OverLimit: 'Przekroczono limit',
    Export_WarningLevel: 'Poziom ostrzeżenia',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Ustawienia',
    Settings_SamplePathTooltip: 'Katalog główny synchronizacji usługi OneDrive, np. C:\\Users\\UsernamePath\\OneDrive - Company\\. Zapisywany tylko w tej przeglądarce — nie jest udostępniany innym użytkownikom.',
    Settings_ConcurrencyLabel: 'Współbieżne żądania interfejsu API podczas pełnego skanowania (górny limit)',
    Settings_ConcurrencyTooltip: 'Górny limit, a nie stała szybkość. Skanowanie zaczyna się znacznie poniżej tej wartości i przyspiesza, dopóki usługa SharePoint nadąża. Jeśli usługa SharePoint ograniczy skanowanie, zostaje ono wstrzymane (z uwzględnieniem nagłówka Retry-After), współbieżność spada o połowę, a następnie stopniowo rośnie tylko do poziomu tuż poniżej tego, który spowodował ograniczenie — nigdy do niego samego. Zmniejsz tę wartość, jeśli skanowanie nadal powoduje ograniczanie.',
    Settings_IncludeHidden: 'Uwzględnij biblioteki ukryte i systemowe',
    Settings_ThresholdsNote: 'Progi ostrzeżenia ({warning} znaków) i przekroczenia limitu ({error} znaków) ustawia osoba edytująca tę stronę — w okienku właściwości składnika web part („Edytuj składnik web part” → ustawienia SharePoint Smart Path Length), a nie tutaj.'
  };
});
