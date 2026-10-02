define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'SharePoint Smart Path Length 設定',
    PropertyPane_Group_Thresholds: '路徑長度臨界值',
    PropertyPane_Group_SamplePath: 'OneDrive 範例路徑',
    PropertyPane_WarningLength_Label: '警告長度 (字元)',
    PropertyPane_ErrorLength_Label: '超出限制長度 (字元)',
    PropertyPane_SamplePath_Label: '預設 OneDrive 範例路徑前置詞',
    PropertyPane_Validation_PositiveInteger: '請輸入正整數。',
    PropertyPane_Validation_WarningLessThanError: '警告長度必須小於超出限制長度。',

    // ── Common ──
    Common_Back: '上一步',
    Common_Cancel: '取消',
    Common_Close: '關閉',
    Common_Clear: '清除',
    Common_Connect: '連線',
    Common_Export: '匯出',
    Common_LoadingLibraries: '正在載入文件庫…',
    Common_SamplePathLabel: 'OneDrive 範例路徑前置詞',

    // ── Header ──
    App_ChangeUrl: '變更 URL',
    App_Explorer: '檔案總管',
    App_Report: '報表',
    App_Settings: '設定',

    // ── Path status ──
    Status_OK: '正常',
    Status_Warning: '警告',
    Status_OverLimit: '超出限制',
    StatusDescription_Error: '此路徑已達到或超出所設定的限制 — 可能無法正確同步至 OneDrive。',
    StatusDescription_Warning: '此路徑接近所設定的限制 — 建議儘快縮短。',
    StatusDescription_Normal: '此路徑遠低於所設定的限制 — 不需要採取任何動作。',

    // ── Scope / filters ──
    Scope_All: '所有路徑',
    Scope_WarningAndOver: '警告層級及超出限制的路徑',
    Scope_OverOnly: '僅超出限制的路徑',
    Filter_All: '全部',
    Filter_WarningAndOver: '警告及超出',
    Filter_OverOnly: '僅超出限制',

    // ── Path table ──
    Table_Library: '文件庫',
    Table_EstimatedPath: '預估的 OneDrive 路徑',
    Table_Length: '長度',
    Table_Status: '狀態',
    Table_NoMatch: '沒有符合目前篩選條件的項目。',

    // ── Explorer ──
    Explorer_SyncFolderLabel: '文件庫同步資料夾名稱',
    Explorer_ThresholdLegend: '{warning}+ 個字元時警告,{error}+ 個字元時超出限制 (於 Web 組件的編輯內容中設定)',
    Explorer_RefreshTooltip: '即時重新檢查每個文件庫,並忽略快取的結果',
    Explorer_Refresh: '重新整理',
    Explorer_ActivityLog: '活動記錄',
    Explorer_ActivityLogEmpty: '尚未記錄任何項目。',
    Explorer_TreeAriaLabel: '文件庫',
    Explorer_NoLibraries: '在此網站上找不到文件庫。',
    Explorer_SelectItemPrompt: '在樹狀目錄中選取項目,即可查看其預估的 OneDrive 路徑和字元數。',
    Explorer_CouldntList: '無法列出「{path}」:{error}',
    Explorer_CouldntLoad: '無法載入「{path}」:{error}',
    Explorer_StatusWithChars: '{status} — {count} 個字元',
    Explorer_ContainsBelowError: '此資料夾下方的某處包含超出限制的項目。',
    Explorer_ContainsBelowWarning: '此資料夾下方的某處包含警告層級的項目。',

    // ── Explorer: icon legend ──
    Legend_Scanning: '正在掃描',
    Legend_ScanningTooltip: '此文件庫的背景掃描尚未完成 — 圓點指標 (而非圖示本身) 可能不是最終結果。',
    Legend_IssueBelow: '下方有問題',
    Legend_IssueBelowTooltip: '即使此資料夾本身的路徑沒有問題,其內部某處仍包含警告層級或超出限制的項目 — 展開資料夾即可找出是哪一個。',

    // ── Explorer: tree ──
    Tree_StillChecking: '仍在檢查此文件庫下方是否有問題 — 圓點可能還不是最終結果。',
    Tree_ContainsBelowError: '下方包含超出限制的項目',
    Tree_ContainsBelowWarning: '下方包含警告層級的項目',
    Tree_ScanInfo: '{description} (下層項目檢查:{source},{age}。)',
    Tree_SourceCache: '來自快取',
    Tree_SourceLive: '即時掃描',
    Age_JustNow: '剛剛',
    Age_OneMinute: '1 分鐘前',
    Age_Minutes: '{count} 分鐘前',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: '範例路徑前置詞',
    Breakdown_SyncFolder: '文件庫同步資料夾 (「{name}」)',
    Breakdown_Relative: '文件庫內的相對路徑',
    Breakdown_Total: '總計 (包含分隔符號)',
    Breakdown_Chars: '{count} 個字元',

    // ── Throttling notices ──
    Throttle_Paused: 'SharePoint 已進行節流 — 背景掃描已暫停 {seconds} 秒。',
    Throttle_Gentle: '在受到 SharePoint 節流後,背景掃描正以低速執行 (並行數 {limit}/{target})。',
    Throttle_ReportWaiting: ' — 受到 SharePoint 節流,正在等候 {seconds} 秒',
    Throttle_ReportGentle: ' — 收到 {events} 次節流回應後以低速執行 (並行數 {limit}/{target})',

    // ── Report ──
    Report_Title: '報表',
    Report_LibrariesToScan: '要掃描的文件庫',
    Report_SelectAll: '全選',
    Report_SelectNone: '全部不選',
    Report_RunFullScan: '執行完整掃描',
    Report_Cancelling: '正在取消…',
    Report_Scanned: '已掃描 {count} 個項目…{note}',
    Report_ExportButton: '匯出報表…',
    Report_Summary: '已掃描 {total} 個項目 — {over} 個超出限制,{warning} 個為警告層級',
    Report_Empty: '請在上方選擇文件庫並執行完整掃描,以建立報表。',
    Report_ScanFailed: '掃描「{library}」失敗:{error}',

    // ── Export dialog and files ──
    Export_DialogTitle: '匯出報表',
    Export_Format: '格式',
    Export_Scope: '範圍',
    Export_Type: '類型',
    Export_Folder: '資料夾',
    Export_File: '檔案',
    Export_ColLibrary: '文件庫',
    Export_ColPath: '預估的 OneDrive 路徑',
    Export_ColLength: '長度',
    Export_ColStatus: '狀態',
    Export_SheetSummary: '摘要',
    Export_SheetPaths: '路徑',
    Export_ReportTitle: 'SharePoint Smart Path Length 報表',
    Export_Generated: '產生時間',
    Export_ItemsScanned: '已掃描的項目',
    Export_OverLimit: '超出限制',
    Export_WarningLevel: '警告層級',
    Export_OK: '正常',

    // ── Settings ──
    Settings_Title: '設定',
    Settings_SamplePathTooltip: '您的 OneDrive 同步根目錄,例如 C:\\Users\\UsernamePath\\OneDrive - Company\\。僅儲存在此瀏覽器中 — 不會與其他使用者共用。',
    Settings_ConcurrencyLabel: '完整掃描期間的並行 API 要求數 (上限)',
    Settings_ConcurrencyTooltip: '這是上限,而非固定速率。掃描會從遠低於此值的程度開始,並在 SharePoint 跟得上時逐步提高。如果 SharePoint 對掃描進行節流,掃描會暫停 (遵循 Retry-After)、將並行數減半,之後僅會逐步回升到略低於遭節流程度的水準 — 絕不會回到該程度。如果掃描仍然造成節流,請調低此值。',
    Settings_IncludeHidden: '包含隱藏及系統文件庫',
    Settings_ThresholdsNote: '警告 ({warning} 個字元) 和超出限制 ({error} 個字元) 的臨界值,是由編輯此頁面的人員在 Web 組件的屬性窗格 (「編輯 Web 組件」→ SharePoint Smart Path Length 設定) 中設定,而非在此處設定。'
  };
});
