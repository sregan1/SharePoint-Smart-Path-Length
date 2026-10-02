define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'تكوين SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'حدود طول المسار',
    PropertyPane_Group_SamplePath: 'نموذج مسار OneDrive',
    PropertyPane_WarningLength_Label: 'طول التحذير (أحرف)',
    PropertyPane_ErrorLength_Label: 'الطول المتجاوز للحد (أحرف)',
    PropertyPane_SamplePath_Label: 'بادئة مسار OneDrive النموذجي الافتراضية',
    PropertyPane_Validation_PositiveInteger: 'أدخل عددًا صحيحًا موجبًا.',
    PropertyPane_Validation_WarningLessThanError: 'يجب أن يكون طول التحذير أقل من الطول المتجاوز للحد.',

    // ── Common ──
    Common_Back: 'رجوع',
    Common_Cancel: 'إلغاء الأمر',
    Common_Close: 'إغلاق',
    Common_Clear: 'مسح',
    Common_Connect: 'اتصال',
    Common_Export: 'تصدير',
    Common_LoadingLibraries: 'جارٍ تحميل المكتبات…',
    Common_SamplePathLabel: 'بادئة مسار OneDrive النموذجي',

    // ── Header ──
    App_ChangeUrl: 'تغيير عنوان URL',
    App_Explorer: 'مستكشف',
    App_Report: 'تقرير',
    App_Settings: 'الإعدادات',

    // ── Path status ──
    Status_OK: 'موافق',
    Status_Warning: 'تحذير',
    Status_OverLimit: 'تجاوز الحد',
    StatusDescription_Error: "هذا المسار يساوي الحد المكوّن أو يتجاوزه — ومن المحتمل ألا تتم مزامنته مع OneDrive بشكل صحيح.",
    StatusDescription_Warning: 'هذا المسار يقترب من الحد المكوّن — يُفضل تقصيره قريبًا.',
    StatusDescription_Normal: 'هذا المسار ضمن الحد المكوّن بشكل مريح — لا حاجة لاتخاذ أي إجراء.',

    // ── Scope / filters ──
    Scope_All: 'كل المسارات',
    Scope_WarningAndOver: 'المسارات عند مستوى التحذير وما فوقه',
    Scope_OverOnly: 'المسارات المتجاوزة للحد فقط',
    Filter_All: 'الكل',
    Filter_WarningAndOver: 'التحذير وما فوقه',
    Filter_OverOnly: 'المتجاوزة للحد فقط',

    // ── Path table ──
    Table_Library: 'المكتبة',
    Table_EstimatedPath: 'مسار OneDrive المقدّر',
    Table_Length: 'الطول',
    Table_Status: 'الحالة',
    Table_NoMatch: 'لا توجد عناصر تطابق عامل التصفية الحالي.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'اسم مجلد مزامنة المكتبة',
    Explorer_ThresholdLegend: "تحذير عند {warning}+ حرف، وتجاوز الحد عند {error}+ (يُعيَّن في خصائص تحرير جزء الويب)",
    Explorer_RefreshTooltip: 'إعادة فحص كل مكتبة مباشرةً مع تجاهل النتائج المخزنة مؤقتًا',
    Explorer_Refresh: 'تحديث',
    Explorer_ActivityLog: 'سجل النشاط',
    Explorer_ActivityLogEmpty: 'لم يتم تسجيل أي شيء بعد.',
    Explorer_TreeAriaLabel: 'مكتبات المستندات',
    Explorer_NoLibraries: 'لم يتم العثور على مكتبات مستندات في هذا الموقع.',
    Explorer_SelectItemPrompt: 'حدد عنصرًا في الشجرة لعرض مسار OneDrive المقدّر وعدد الأحرف الخاص به.',
    Explorer_CouldntList: 'تعذر سرد "{path}": {error}',
    Explorer_CouldntLoad: 'تعذر تحميل "{path}": {error}',
    Explorer_StatusWithChars: '{status} — {count} حرف',
    Explorer_ContainsBelowError: 'يحتوي على عنصر متجاوز للحد في مكان ما أسفل هذا المجلد.',
    Explorer_ContainsBelowWarning: 'يحتوي على عنصر عند مستوى التحذير في مكان ما أسفل هذا المجلد.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'جارٍ الفحص',
    Legend_ScanningTooltip: "لم ينتهِ الفحص الخلفي لهذه المكتبة بعد — قد لا يكون مؤشر النقطة (وليس الأيقونة نفسها) نهائيًا.",
    Legend_IssueBelow: 'مشكلة بالأسفل',
    Legend_IssueBelowTooltip: 'يحتوي هذا المجلد على عنصر عند مستوى التحذير أو متجاوز للحد في مكان ما بداخله، حتى لو كان مساره سليمًا — قم بتوسيعه لمعرفة العنصر المعني.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'لا يزال فحص هذه المكتبة جاريًا بحثًا عن مشكلات بالأسفل — قد لا تكون النقطة نهائية بعد.',
    Tree_ContainsBelowError: 'يحتوي على عنصر متجاوز للحد بالأسفل',
    Tree_ContainsBelowWarning: 'يحتوي على عنصر عند مستوى التحذير بالأسفل',
    Tree_ScanInfo: '{description} (فحص العناصر السفلية: {source}، {age}.)',
    Tree_SourceCache: 'من ذاكرة التخزين المؤقت',
    Tree_SourceLive: 'فحص مباشر',
    Age_JustNow: 'الآن',
    Age_OneMinute: 'منذ دقيقة',
    Age_Minutes: 'منذ {count} دقيقة',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'بادئة المسار النموذجي',
    Breakdown_SyncFolder: 'مجلد مزامنة المكتبة ("{name}")',
    Breakdown_Relative: 'المسار النسبي داخل المكتبة',
    Breakdown_Total: 'الإجمالي (يشمل الفواصل)',
    Breakdown_Chars: '{count} حرف',

    // ── Throttling notices ──
    Throttle_Paused: 'تم تقييد الأداء بواسطة SharePoint — تم إيقاف الفحص الخلفي مؤقتًا لمدة {seconds} ثانية.',
    Throttle_Gentle: 'يعمل الفحص الخلفي بوتيرة مخففة (التزامن {limit} من {target}) بعد تقييد الأداء بواسطة SharePoint.',
    Throttle_ReportWaiting: ' — تم تقييد الأداء بواسطة SharePoint، الانتظار {seconds} ثانية',
    Throttle_ReportGentle: ' — يعمل بوتيرة مخففة (التزامن {limit} من {target}) بعد {events} من استجابات تقييد الأداء',

    // ── Report ──
    Report_Title: 'تقرير',
    Report_LibrariesToScan: 'المكتبات المراد فحصها',
    Report_SelectAll: 'تحديد الكل',
    Report_SelectNone: 'إلغاء تحديد الكل',
    Report_RunFullScan: 'تشغيل فحص كامل',
    Report_Cancelling: 'جارٍ الإلغاء…',
    Report_Scanned: 'تم فحص {count} عنصر…{note}',
    Report_ExportButton: 'تصدير التقرير…',
    Report_Summary: 'تم فحص {total} عنصر — {over} متجاوز للحد، {warning} عند مستوى التحذير',
    Report_Empty: 'اختر المكتبات أعلاه وقم بتشغيل فحص كامل لإنشاء تقرير.',
    Report_ScanFailed: 'فشل فحص "{library}": {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'تصدير التقرير',
    Export_Format: 'التنسيق',
    Export_Scope: 'النطاق',
    Export_Type: 'النوع',
    Export_Folder: 'المجلد',
    Export_File: 'الملف',
    Export_ColLibrary: 'المكتبة',
    Export_ColPath: 'مسار OneDrive المقدّر',
    Export_ColLength: 'الطول',
    Export_ColStatus: 'الحالة',
    Export_SheetSummary: 'ملخص',
    Export_SheetPaths: 'المسارات',
    Export_ReportTitle: 'تقرير SharePoint Smart Path Length',
    Export_Generated: 'تاريخ الإنشاء',
    Export_ItemsScanned: 'العناصر التي تم فحصها',
    Export_OverLimit: 'تجاوز الحد',
    Export_WarningLevel: 'مستوى التحذير',
    Export_OK: 'موافق',

    // ── Settings ──
    Settings_Title: 'الإعدادات',
    Settings_SamplePathTooltip: "جذر مزامنة OneDrive لديك، مثل C:\\Users\\UsernamePath\\OneDrive - Company\\. يُحفظ في هذا المستعرض فقط — ولا تتم مشاركته مع المستخدمين الآخرين.",
    Settings_ConcurrencyLabel: 'طلبات API المتزامنة أثناء الفحص الكامل (الحد الأعلى)',
    Settings_ConcurrencyTooltip: 'حد أعلى وليس معدلًا ثابتًا. يبدأ الفحص عند مستوى أقل بكثير ثم يرتفع تدريجيًا طالما أن SharePoint يواكبه. إذا قام SharePoint بتقييد أداء الفحص، فإنه يتوقف مؤقتًا (مع احترام Retry-After)، ويخفض التزامن إلى النصف، ثم يرتفع تدريجيًا بعد ذلك إلى ما دون المستوى الذي تم تقييده فقط — ولا يعود إليه أبدًا. قلل هذه القيمة إذا استمرت عمليات الفحص في التسبب في تقييد الأداء.',
    Settings_IncludeHidden: 'تضمين المكتبات المخفية ومكتبات النظام',
    Settings_ThresholdsNote: 'يتم تعيين حدود التحذير ({warning} حرف) وتجاوز الحد ({error} حرف) بواسطة من يحرر هذه الصفحة — من جزء خصائص جزء الويب ("تحرير جزء الويب" ← إعدادات SharePoint Smart Path Length)، وليس من هنا.'
  };
});
