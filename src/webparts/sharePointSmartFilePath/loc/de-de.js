define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Konfiguration von SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Schwellenwerte für die Pfadlänge',
    PropertyPane_Group_SamplePath: 'OneDrive-Beispielpfad',
    PropertyPane_WarningLength_Label: 'Warnlänge (Zeichen)',
    PropertyPane_ErrorLength_Label: 'Länge für Grenzwertüberschreitung (Zeichen)',
    PropertyPane_SamplePath_Label: 'Standardpräfix für den OneDrive-Beispielpfad',
    PropertyPane_Validation_PositiveInteger: 'Geben Sie eine positive ganze Zahl ein.',
    PropertyPane_Validation_WarningLessThanError: 'Die Warnlänge muss kleiner sein als die Länge für die Grenzwertüberschreitung.',

    // ── Common ──
    Common_Back: 'Zurück',
    Common_Cancel: 'Abbrechen',
    Common_Close: 'Schließen',
    Common_Clear: 'Löschen',
    Common_Connect: 'Verbinden',
    Common_Export: 'Exportieren',
    Common_LoadingLibraries: 'Bibliotheken werden geladen…',
    Common_SamplePathLabel: 'Präfix des OneDrive-Beispielpfads',

    // ── Header ──
    App_ChangeUrl: 'URL ändern',
    App_Explorer: 'Explorer',
    App_Report: 'Bericht',
    App_Settings: 'Einstellungen',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Warnung',
    Status_OverLimit: 'Über dem Grenzwert',
    StatusDescription_Error: "Dieser Pfad erreicht oder überschreitet den konfigurierten Grenzwert – er wird wahrscheinlich nicht korrekt mit OneDrive synchronisiert.",
    StatusDescription_Warning: 'Dieser Pfad nähert sich dem konfigurierten Grenzwert – er sollte bald gekürzt werden.',
    StatusDescription_Normal: 'Dieser Pfad liegt deutlich unter dem konfigurierten Grenzwert – hier ist nichts zu tun.',

    // ── Scope / filters ──
    Scope_All: 'Alle Pfade',
    Scope_WarningAndOver: 'Pfade ab Warnstufe und darüber',
    Scope_OverOnly: 'Nur Pfade über dem Grenzwert',
    Filter_All: 'Alle',
    Filter_WarningAndOver: 'Warnung und darüber',
    Filter_OverOnly: 'Nur über dem Grenzwert',

    // ── Path table ──
    Table_Library: 'Bibliothek',
    Table_EstimatedPath: 'Geschätzter OneDrive-Pfad',
    Table_Length: 'Länge',
    Table_Status: 'Status',
    Table_NoMatch: 'Keine Elemente entsprechen dem aktuellen Filter.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Name des Synchronisierungsordners der Bibliothek',
    Explorer_ThresholdLegend: "Warnung ab {warning}+ Zeichen, Grenzwertüberschreitung ab {error}+ (festgelegt in den Bearbeitungseigenschaften des Webparts)",
    Explorer_RefreshTooltip: 'Alle Bibliotheken live erneut überprüfen und zwischengespeicherte Ergebnisse ignorieren',
    Explorer_Refresh: 'Aktualisieren',
    Explorer_ActivityLog: 'Aktivitätsprotokoll',
    Explorer_ActivityLogEmpty: 'Noch nichts protokolliert.',
    Explorer_TreeAriaLabel: 'Dokumentbibliotheken',
    Explorer_NoLibraries: 'Auf dieser Website wurden keine Dokumentbibliotheken gefunden.',
    Explorer_SelectItemPrompt: 'Wählen Sie ein Element in der Struktur aus, um den geschätzten OneDrive-Pfad und die Zeichenanzahl anzuzeigen.',
    Explorer_CouldntList: '„{path}“ konnte nicht aufgelistet werden: {error}',
    Explorer_CouldntLoad: '„{path}“ konnte nicht geladen werden: {error}',
    Explorer_StatusWithChars: '{status} – {count} Zeichen',
    Explorer_ContainsBelowError: 'Enthält irgendwo unterhalb dieses Ordners ein Element über dem Grenzwert.',
    Explorer_ContainsBelowWarning: 'Enthält irgendwo unterhalb dieses Ordners ein Element auf Warnstufe.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Wird gescannt',
    Legend_ScanningTooltip: "Der Hintergrundscan dieser Bibliothek ist noch nicht abgeschlossen – die Punktanzeige (nicht das Symbol selbst) ist möglicherweise noch nicht endgültig.",
    Legend_IssueBelow: 'Problem darunter',
    Legend_IssueBelowTooltip: 'Dieser Ordner enthält irgendwo darin ein Element auf Warnstufe oder über dem Grenzwert, auch wenn sein eigener Pfad in Ordnung ist – erweitern Sie ihn, um das betreffende Element zu finden.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Diese Bibliothek wird noch auf Probleme darunter überprüft – der Punkt ist möglicherweise noch nicht endgültig.',
    Tree_ContainsBelowError: 'Enthält darunter ein Element über dem Grenzwert',
    Tree_ContainsBelowWarning: 'Enthält darunter ein Element auf Warnstufe',
    Tree_ScanInfo: '{description} (Überprüfung untergeordneter Elemente: {source}, {age}.)',
    Tree_SourceCache: 'aus dem Cache',
    Tree_SourceLive: 'Live-Scan',
    Age_JustNow: 'gerade eben',
    Age_OneMinute: 'vor 1 Min.',
    Age_Minutes: 'vor {count} Min.',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Präfix des Beispielpfads',
    Breakdown_SyncFolder: 'Synchronisierungsordner der Bibliothek („{name}“)',
    Breakdown_Relative: 'Relativer Pfad innerhalb der Bibliothek',
    Breakdown_Total: 'Gesamt (einschl. Trennzeichen)',
    Breakdown_Chars: '{count} Zeichen',

    // ── Throttling notices ──
    Throttle_Paused: 'Von SharePoint gedrosselt – das Hintergrundscannen wird für {seconds} s angehalten.',
    Throttle_Gentle: 'Das Hintergrundscannen läuft schonend (Parallelität {limit} von {target}), nachdem es von SharePoint gedrosselt wurde.',
    Throttle_ReportWaiting: ' – von SharePoint gedrosselt, Wartezeit {seconds} s',
    Throttle_ReportGentle: ' – läuft schonend (Parallelität {limit} von {target}) nach {events} Drosselungsantwort(en)',

    // ── Report ──
    Report_Title: 'Bericht',
    Report_LibrariesToScan: 'Zu scannende Bibliotheken',
    Report_SelectAll: 'Alle auswählen',
    Report_SelectNone: 'Auswahl aufheben',
    Report_RunFullScan: 'Vollständigen Scan ausführen',
    Report_Cancelling: 'Wird abgebrochen…',
    Report_Scanned: '{count} Elemente gescannt…{note}',
    Report_ExportButton: 'Bericht exportieren…',
    Report_Summary: '{total} Elemente gescannt – {over} über dem Grenzwert, {warning} auf Warnstufe',
    Report_Empty: 'Wählen Sie oben Bibliotheken aus, und führen Sie einen vollständigen Scan aus, um einen Bericht zu erstellen.',
    Report_ScanFailed: 'Scan von „{library}“ fehlgeschlagen: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Bericht exportieren',
    Export_Format: 'Format',
    Export_Scope: 'Bereich',
    Export_Type: 'Typ',
    Export_Folder: 'Ordner',
    Export_File: 'Datei',
    Export_ColLibrary: 'Bibliothek',
    Export_ColPath: 'Geschätzter OneDrive-Pfad',
    Export_ColLength: 'Länge',
    Export_ColStatus: 'Status',
    Export_SheetSummary: 'Zusammenfassung',
    Export_SheetPaths: 'Pfade',
    Export_ReportTitle: 'SharePoint Smart Path Length – Bericht',
    Export_Generated: 'Erstellt',
    Export_ItemsScanned: 'Gescannte Elemente',
    Export_OverLimit: 'Über dem Grenzwert',
    Export_WarningLevel: 'Warnstufe',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Einstellungen',
    Settings_SamplePathTooltip: "Ihr OneDrive-Synchronisierungsstamm, z. B. C:\\Users\\UsernamePath\\OneDrive - Company\\. Wird nur in diesem Browser gespeichert – er wird nicht für andere Benutzer freigegeben.",
    Settings_ConcurrencyLabel: 'Gleichzeitige API-Anforderungen bei einem vollständigen Scan (Obergrenze)',
    Settings_ConcurrencyTooltip: 'Eine Obergrenze, keine feste Rate. Scans beginnen deutlich darunter und steigern sich, solange SharePoint mithalten kann. Wenn SharePoint den Scan drosselt, wird er angehalten (unter Beachtung von Retry-After), halbiert seine Parallelität und steigert sich danach nur bis knapp unter die Stufe, bei der gedrosselt wurde – nie wieder bis zu dieser Stufe. Verringern Sie diesen Wert, wenn Scans weiterhin Drosselung verursachen.',
    Settings_IncludeHidden: 'Ausgeblendete Bibliotheken und Systembibliotheken einbeziehen',
    Settings_ThresholdsNote: 'Die Schwellenwerte für Warnung ({warning} Zeichen) und Grenzwertüberschreitung ({error} Zeichen) werden von der Person festgelegt, die diese Seite bearbeitet – im Eigenschaftenbereich des Webparts („Webpart bearbeiten“ → Einstellungen für SharePoint Smart Path Length), nicht hier.'
  };
});
