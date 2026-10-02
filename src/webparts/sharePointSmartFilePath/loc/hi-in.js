define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'SharePoint Smart Path Length कॉन्फ़िगरेशन',
    PropertyPane_Group_Thresholds: 'पथ लंबाई सीमाएँ',
    PropertyPane_Group_SamplePath: 'OneDrive नमूना पथ',
    PropertyPane_WarningLength_Label: 'चेतावनी लंबाई (वर्ण)',
    PropertyPane_ErrorLength_Label: 'सीमा-पार लंबाई (वर्ण)',
    PropertyPane_SamplePath_Label: 'डिफ़ॉल्ट नमूना OneDrive पथ उपसर्ग',
    PropertyPane_Validation_PositiveInteger: 'एक धनात्मक पूर्ण संख्या दर्ज करें.',
    PropertyPane_Validation_WarningLessThanError: 'चेतावनी लंबाई सीमा-पार लंबाई से कम होनी चाहिए.',

    // ── Common ──
    Common_Back: 'वापस',
    Common_Cancel: 'रद्द करें',
    Common_Close: 'बंद करें',
    Common_Clear: 'साफ़ करें',
    Common_Connect: 'कनेक्ट करें',
    Common_Export: 'निर्यात करें',
    Common_LoadingLibraries: 'लाइब्रेरी लोड हो रही हैं…',
    Common_SamplePathLabel: 'नमूना OneDrive पथ उपसर्ग',

    // ── Header ──
    App_ChangeUrl: 'URL बदलें',
    App_Explorer: 'एक्सप्लोरर',
    App_Report: 'रिपोर्ट',
    App_Settings: 'सेटिंग',

    // ── Path status ──
    Status_OK: 'ठीक है',
    Status_Warning: 'चेतावनी',
    Status_OverLimit: 'सीमा से अधिक',
    StatusDescription_Error: "यह पथ कॉन्फ़िगर की गई सीमा पर या उससे अधिक है — यह संभवतः OneDrive में सही ढंग से सिंक नहीं होगा.",
    StatusDescription_Warning: 'यह पथ कॉन्फ़िगर की गई सीमा के करीब पहुँच रहा है — इसे जल्द छोटा करना उचित होगा.',
    StatusDescription_Normal: 'यह पथ कॉन्फ़िगर की गई सीमा के भीतर सुरक्षित है — यहाँ कुछ करने की आवश्यकता नहीं है.',

    // ── Scope / filters ──
    Scope_All: 'सभी पथ',
    Scope_WarningAndOver: 'चेतावनी स्तर और उससे अधिक वाले पथ',
    Scope_OverOnly: 'केवल सीमा से अधिक वाले पथ',
    Filter_All: 'सभी',
    Filter_WarningAndOver: 'चेतावनी और अधिक',
    Filter_OverOnly: 'केवल सीमा से अधिक',

    // ── Path table ──
    Table_Library: 'लाइब्रेरी',
    Table_EstimatedPath: 'अनुमानित OneDrive पथ',
    Table_Length: 'लंबाई',
    Table_Status: 'स्थिति',
    Table_NoMatch: 'कोई आइटम वर्तमान फ़िल्टर से मेल नहीं खाता.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'लाइब्रेरी सिंक फ़ोल्डर का नाम',
    Explorer_ThresholdLegend: "{warning}+ वर्णों पर चेतावनी, {error}+ पर सीमा से अधिक (वेब पार्ट के संपादन गुणों में सेट करें)",
    Explorer_RefreshTooltip: 'कैश किए गए परिणामों को अनदेखा करके हर लाइब्रेरी की लाइव दोबारा जाँच करें',
    Explorer_Refresh: 'रीफ़्रेश करें',
    Explorer_ActivityLog: 'गतिविधि लॉग',
    Explorer_ActivityLogEmpty: 'अभी तक कुछ भी लॉग नहीं किया गया.',
    Explorer_TreeAriaLabel: 'दस्तावेज़ लाइब्रेरी',
    Explorer_NoLibraries: 'इस साइट पर कोई दस्तावेज़ लाइब्रेरी नहीं मिली.',
    Explorer_SelectItemPrompt: 'अनुमानित OneDrive पथ और वर्ण संख्या देखने के लिए ट्री में कोई आइटम चुनें.',
    Explorer_CouldntList: '"{path}" की सूची नहीं बनाई जा सकी: {error}',
    Explorer_CouldntLoad: '"{path}" लोड नहीं किया जा सका: {error}',
    Explorer_StatusWithChars: '{status} — {count} वर्ण',
    Explorer_ContainsBelowError: 'इस फ़ोल्डर के नीचे कहीं सीमा से अधिक वाला आइटम मौजूद है.',
    Explorer_ContainsBelowWarning: 'इस फ़ोल्डर के नीचे कहीं चेतावनी स्तर वाला आइटम मौजूद है.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'स्कैन हो रहा है',
    Legend_ScanningTooltip: "इस लाइब्रेरी का पृष्ठभूमि स्कैन अभी पूरा नहीं हुआ है — बिंदु संकेतक (आइकन स्वयं नहीं) अंतिम न हो.",
    Legend_IssueBelow: 'नीचे समस्या',
    Legend_IssueBelowTooltip: 'इस फ़ोल्डर के भीतर कहीं चेतावनी या सीमा से अधिक वाला आइटम है, भले ही इसका अपना पथ ठीक हो — कौन सा है यह जानने के लिए इसे विस्तृत करें.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'इस लाइब्रेरी में नीचे की समस्याओं की जाँच अभी जारी है — बिंदु अभी अंतिम न हो.',
    Tree_ContainsBelowError: 'नीचे सीमा से अधिक वाला आइटम मौजूद है',
    Tree_ContainsBelowWarning: 'नीचे चेतावनी स्तर वाला आइटम मौजूद है',
    Tree_ScanInfo: '{description} (नीचे के आइटम की जाँच: {source}, {age}.)',
    Tree_SourceCache: 'कैश से',
    Tree_SourceLive: 'लाइव स्कैन',
    Age_JustNow: 'अभी',
    Age_OneMinute: '1 मिनट पहले',
    Age_Minutes: '{count} मिनट पहले',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'नमूना पथ उपसर्ग',
    Breakdown_SyncFolder: 'लाइब्रेरी सिंक फ़ोल्डर ("{name}")',
    Breakdown_Relative: 'लाइब्रेरी के भीतर सापेक्ष पथ',
    Breakdown_Total: 'कुल (विभाजकों सहित)',
    Breakdown_Chars: '{count} वर्ण',

    // ── Throttling notices ──
    Throttle_Paused: 'SharePoint द्वारा थ्रॉटल किया गया — पृष्ठभूमि स्कैनिंग {seconds} सेकंड के लिए रोकी गई है.',
    Throttle_Gentle: 'SharePoint द्वारा थ्रॉटल किए जाने के बाद पृष्ठभूमि स्कैनिंग धीमी गति से चल रही है (समवर्तिता {target} में से {limit}).',
    Throttle_ReportWaiting: ' — SharePoint द्वारा थ्रॉटल किया गया, {seconds} सेकंड प्रतीक्षा',
    Throttle_ReportGentle: ' — {events} थ्रॉटलिंग प्रतिक्रिया(एँ) के बाद धीमी गति से चल रहा है (समवर्तिता {target} में से {limit})',

    // ── Report ──
    Report_Title: 'रिपोर्ट',
    Report_LibrariesToScan: 'स्कैन करने के लिए लाइब्रेरी',
    Report_SelectAll: 'सभी चुनें',
    Report_SelectNone: 'कोई नहीं चुनें',
    Report_RunFullScan: 'पूर्ण स्कैन चलाएँ',
    Report_Cancelling: 'रद्द किया जा रहा है…',
    Report_Scanned: '{count} आइटम स्कैन किए गए…{note}',
    Report_ExportButton: 'रिपोर्ट निर्यात करें…',
    Report_Summary: '{total} आइटम स्कैन किए गए — {over} सीमा से अधिक, {warning} चेतावनी स्तर पर',
    Report_Empty: 'रिपोर्ट बनाने के लिए ऊपर लाइब्रेरी चुनें और पूर्ण स्कैन चलाएँ.',
    Report_ScanFailed: '"{library}" का स्कैन विफल रहा: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'रिपोर्ट निर्यात करें',
    Export_Format: 'प्रारूप',
    Export_Scope: 'दायरा',
    Export_Type: 'प्रकार',
    Export_Folder: 'फ़ोल्डर',
    Export_File: 'फ़ाइल',
    Export_ColLibrary: 'लाइब्रेरी',
    Export_ColPath: 'अनुमानित OneDrive पथ',
    Export_ColLength: 'लंबाई',
    Export_ColStatus: 'स्थिति',
    Export_SheetSummary: 'सारांश',
    Export_SheetPaths: 'पथ',
    Export_ReportTitle: 'SharePoint Smart Path Length रिपोर्ट',
    Export_Generated: 'बनाया गया',
    Export_ItemsScanned: 'स्कैन किए गए आइटम',
    Export_OverLimit: 'सीमा से अधिक',
    Export_WarningLevel: 'चेतावनी स्तर',
    Export_OK: 'ठीक है',

    // ── Settings ──
    Settings_Title: 'सेटिंग',
    Settings_SamplePathTooltip: "आपका OneDrive सिंक रूट, उदा. C:\\Users\\UsernamePath\\OneDrive - Company\\. केवल इस ब्राउज़र में सहेजा जाता है — अन्य उपयोगकर्ताओं के साथ साझा नहीं किया जाता.",
    Settings_ConcurrencyLabel: 'पूर्ण स्कैन के दौरान समवर्ती API अनुरोध (ऊपरी सीमा)',
    Settings_ConcurrencyTooltip: 'यह एक ऊपरी सीमा है, निश्चित दर नहीं. स्कैन इससे काफ़ी नीचे शुरू होते हैं और जब तक SharePoint साथ दे पाता है, गति बढ़ाते रहते हैं. यदि SharePoint स्कैन को थ्रॉटल करता है, तो वह रुक जाता है (Retry-After का पालन करते हुए), अपनी समवर्तिता आधी कर देता है, और बाद में केवल उस स्तर से ठीक नीचे तक ही धीरे-धीरे बढ़ता है जहाँ थ्रॉटलिंग हुई थी — उस स्तर तक कभी नहीं. यदि स्कैन अब भी थ्रॉटलिंग का कारण बनते हैं, तो इसे घटाएँ.',
    Settings_IncludeHidden: 'छिपी हुई और सिस्टम लाइब्रेरी शामिल करें',
    Settings_ThresholdsNote: 'चेतावनी ({warning} वर्ण) और सीमा-पार ({error} वर्ण) सीमाएँ इस पेज को संपादित करने वाले व्यक्ति द्वारा वेब पार्ट के गुण फलक से ("वेब पार्ट संपादित करें" → SharePoint Smart Path Length सेटिंग) सेट की जाती हैं, यहाँ से नहीं.'
  };
});
