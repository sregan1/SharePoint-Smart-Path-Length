define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'תצורה של SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'ספי אורך נתיב',
    PropertyPane_Group_SamplePath: 'נתיב OneDrive לדוגמה',
    PropertyPane_WarningLength_Label: 'אורך אזהרה (תווים)',
    PropertyPane_ErrorLength_Label: 'אורך חריגה מהמגבלה (תווים)',
    PropertyPane_SamplePath_Label: 'קידומת ברירת מחדל של נתיב OneDrive לדוגמה',
    PropertyPane_Validation_PositiveInteger: 'הזן מספר שלם חיובי.',
    PropertyPane_Validation_WarningLessThanError: 'אורך האזהרה חייב להיות קטן מאורך החריגה מהמגבלה.',

    // ── Common ──
    Common_Back: 'חזרה',
    Common_Cancel: 'ביטול',
    Common_Close: 'סגירה',
    Common_Clear: 'נקה',
    Common_Connect: 'התחבר',
    Common_Export: 'ייצוא',
    Common_LoadingLibraries: 'טוען ספריות…',
    Common_SamplePathLabel: 'קידומת נתיב OneDrive לדוגמה',

    // ── Header ──
    App_ChangeUrl: 'שנה כתובת URL',
    App_Explorer: 'סייר',
    App_Report: 'דוח',
    App_Settings: 'הגדרות',

    // ── Path status ──
    Status_OK: 'תקין',
    Status_Warning: 'אזהרה',
    Status_OverLimit: 'חורג מהמגבלה',
    StatusDescription_Error: 'נתיב זה הגיע למגבלה שהוגדרה או חרג ממנה — סביר שהוא לא יסונכרן ל-OneDrive כראוי.',
    StatusDescription_Warning: 'נתיב זה מתקרב למגבלה שהוגדרה — כדאי לקצר אותו בקרוב.',
    StatusDescription_Normal: 'נתיב זה נמצא בבטחה בתוך המגבלה שהוגדרה — אין צורך בפעולה.',

    // ── Scope / filters ──
    Scope_All: 'כל הנתיבים',
    Scope_WarningAndOver: 'נתיבים ברמת אזהרה ומעלה',
    Scope_OverOnly: 'נתיבים החורגים מהמגבלה בלבד',
    Filter_All: 'הכול',
    Filter_WarningAndOver: 'אזהרה וחריגה',
    Filter_OverOnly: 'חריגה מהמגבלה בלבד',

    // ── Path table ──
    Table_Library: 'ספרייה',
    Table_EstimatedPath: 'נתיב OneDrive משוער',
    Table_Length: 'אורך',
    Table_Status: 'מצב',
    Table_NoMatch: 'אין פריטים התואמים למסנן הנוכחי.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'שם תיקיית הסנכרון של הספרייה',
    Explorer_ThresholdLegend: "אזהרה החל מ-{warning}+ תווים, חריגה מהמגבלה החל מ-{error}+ (מוגדר במאפייני העריכה של Web Part)",
    Explorer_RefreshTooltip: 'בדוק מחדש כל ספרייה בזמן אמת, תוך התעלמות מתוצאות מהמטמון',
    Explorer_Refresh: 'רענן',
    Explorer_ActivityLog: 'יומן פעילות',
    Explorer_ActivityLogEmpty: 'עדיין לא נרשם דבר.',
    Explorer_TreeAriaLabel: 'ספריות מסמכים',
    Explorer_NoLibraries: 'לא נמצאו ספריות מסמכים באתר זה.',
    Explorer_SelectItemPrompt: 'בחר פריט בעץ כדי לראות את נתיב OneDrive המשוער שלו ואת מספר התווים.',
    Explorer_CouldntList: 'לא ניתן היה להציג את "{path}": {error}',
    Explorer_CouldntLoad: 'לא ניתן היה לטעון את "{path}": {error}',
    Explorer_StatusWithChars: '{status} — {count} תווים',
    Explorer_ContainsBelowError: 'מכילה פריט החורג מהמגבלה אי שם מתחת לתיקייה זו.',
    Explorer_ContainsBelowWarning: 'מכילה פריט ברמת אזהרה אי שם מתחת לתיקייה זו.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'סורק',
    Legend_ScanningTooltip: "הסריקה ברקע של ספרייה זו טרם הסתיימה — ייתכן שסימון הנקודה (ולא הסמל עצמו) אינו סופי.",
    Legend_IssueBelow: 'בעיה בהמשך',
    Legend_IssueBelowTooltip: 'תיקייה זו מכילה אי שם בתוכה פריט ברמת אזהרה או החורג מהמגבלה, גם אם הנתיב שלה עצמה תקין — הרחב אותה כדי למצוא איזה פריט.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'עדיין בודק בעיות מתחת לספרייה זו — ייתכן שהנקודה אינה סופית.',
    Tree_ContainsBelowError: 'מכילה בהמשך פריט החורג מהמגבלה',
    Tree_ContainsBelowWarning: 'מכילה בהמשך פריט ברמת אזהרה',
    Tree_ScanInfo: '{description} (בדיקת פריטים בהמשך: {source}, {age}.)',
    Tree_SourceCache: 'מהמטמון',
    Tree_SourceLive: 'סריקה חיה',
    Age_JustNow: 'הרגע',
    Age_OneMinute: 'לפני דקה',
    Age_Minutes: 'לפני {count} דק\'',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'קידומת נתיב לדוגמה',
    Breakdown_SyncFolder: 'תיקיית סנכרון של הספרייה ("{name}")',
    Breakdown_Relative: 'נתיב יחסי בתוך הספרייה',
    Breakdown_Total: 'סה"כ (כולל מפרידים)',
    Breakdown_Chars: '{count} תווים',

    // ── Throttling notices ──
    Throttle_Paused: 'SharePoint הגבילה את הקצב — הסריקה ברקע מושהית למשך {seconds} שניות.',
    Throttle_Gentle: 'הסריקה ברקע פועלת בעדינות (מקביליות {limit} מתוך {target}) לאחר הגבלת קצב על ידי SharePoint.',
    Throttle_ReportWaiting: ' — SharePoint הגבילה את הקצב, ממתין {seconds} שניות',
    Throttle_ReportGentle: ' — פועל בעדינות (מקביליות {limit} מתוך {target}) לאחר {events} תגובות הגבלת קצב',

    // ── Report ──
    Report_Title: 'דוח',
    Report_LibrariesToScan: 'ספריות לסריקה',
    Report_SelectAll: 'בחר הכול',
    Report_SelectNone: 'אל תבחר דבר',
    Report_RunFullScan: 'הפעל סריקה מלאה',
    Report_Cancelling: 'מבטל…',
    Report_Scanned: 'נסרקו {count} פריטים…{note}',
    Report_ExportButton: 'ייצוא דוח…',
    Report_Summary: 'נסרקו {total} פריטים — {over} חורגים מהמגבלה, {warning} ברמת אזהרה',
    Report_Empty: 'בחר ספריות למעלה והפעל סריקה מלאה כדי ליצור דוח.',
    Report_ScanFailed: 'הסריקה של "{library}" נכשלה: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'ייצוא דוח',
    Export_Format: 'פורמט',
    Export_Scope: 'היקף',
    Export_Type: 'סוג',
    Export_Folder: 'תיקייה',
    Export_File: 'קובץ',
    Export_ColLibrary: 'ספרייה',
    Export_ColPath: 'נתיב OneDrive משוער',
    Export_ColLength: 'אורך',
    Export_ColStatus: 'מצב',
    Export_SheetSummary: 'סיכום',
    Export_SheetPaths: 'נתיבים',
    Export_ReportTitle: 'דוח SharePoint Smart Path Length',
    Export_Generated: 'נוצר',
    Export_ItemsScanned: 'פריטים שנסרקו',
    Export_OverLimit: 'חורג מהמגבלה',
    Export_WarningLevel: 'רמת אזהרה',
    Export_OK: 'תקין',

    // ── Settings ──
    Settings_Title: 'הגדרות',
    Settings_SamplePathTooltip: "שורש הסנכרון של OneDrive שלך, לדוגמה C:\\Users\\UsernamePath\\OneDrive - Company\\. נשמר בדפדפן זה בלבד — אינו משותף עם משתמשים אחרים.",
    Settings_ConcurrencyLabel: 'בקשות API בו-זמניות במהלך סריקה מלאה (מגבלה עליונה)',
    Settings_ConcurrencyTooltip: 'מגבלה עליונה, לא קצב קבוע. הסריקות מתחילות הרבה מתחת לערך זה ומתגברות כל עוד SharePoint עומדת בקצב. אם SharePoint מגבילה את קצב הסריקה, היא מושהית (בהתאם ל-Retry-After), מחצה את המקביליות שלה, ולאחר מכן עולה בהדרגה רק עד מעט מתחת לרמה שהוגבלה — אף פעם לא עד אליה. הקטן ערך זה אם סריקות עדיין גורמות להגבלת קצב.',
    Settings_IncludeHidden: 'כלול ספריות מוסתרות וספריות מערכת',
    Settings_ThresholdsNote: 'ספי האזהרה ({warning} תווים) והחריגה מהמגבלה ({error} תווים) מוגדרים על ידי מי שעורך דף זה — מחלונית המאפיינים של ה-Web Part ("עריכת Web Part" ← הגדרות SharePoint Smart Path Length), ולא כאן.'
  };
});
