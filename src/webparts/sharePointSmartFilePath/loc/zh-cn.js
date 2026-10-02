define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'SharePoint Smart Path Length 配置',
    PropertyPane_Group_Thresholds: '路径长度阈值',
    PropertyPane_Group_SamplePath: 'OneDrive 示例路径',
    PropertyPane_WarningLength_Label: '警告长度(字符)',
    PropertyPane_ErrorLength_Label: '超限长度(字符)',
    PropertyPane_SamplePath_Label: '默认 OneDrive 示例路径前缀',
    PropertyPane_Validation_PositiveInteger: '请输入正整数。',
    PropertyPane_Validation_WarningLessThanError: '警告长度必须小于超限长度。',

    // ── Common ──
    Common_Back: '返回',
    Common_Cancel: '取消',
    Common_Close: '关闭',
    Common_Clear: '清除',
    Common_Connect: '连接',
    Common_Export: '导出',
    Common_LoadingLibraries: '正在加载库…',
    Common_SamplePathLabel: 'OneDrive 示例路径前缀',

    // ── Header ──
    App_ChangeUrl: '更改 URL',
    App_Explorer: '资源管理器',
    App_Report: '报告',
    App_Settings: '设置',

    // ── Path status ──
    Status_OK: '正常',
    Status_Warning: '警告',
    Status_OverLimit: '超出限制',
    StatusDescription_Error: '此路径已达到或超出配置的限制 — 可能无法正确同步到 OneDrive。',
    StatusDescription_Warning: '此路径接近配置的限制 — 建议尽快缩短。',
    StatusDescription_Normal: '此路径远在配置的限制之内 — 无需任何操作。',

    // ── Scope / filters ──
    Scope_All: '所有路径',
    Scope_WarningAndOver: '警告级别及超出限制的路径',
    Scope_OverOnly: '仅超出限制的路径',
    Filter_All: '全部',
    Filter_WarningAndOver: '警告及超限',
    Filter_OverOnly: '仅超出限制',

    // ── Path table ──
    Table_Library: '库',
    Table_EstimatedPath: '预估的 OneDrive 路径',
    Table_Length: '长度',
    Table_Status: '状态',
    Table_NoMatch: '没有与当前筛选器匹配的项目。',

    // ── Explorer ──
    Explorer_SyncFolderLabel: '库同步文件夹名称',
    Explorer_ThresholdLegend: '{warning}+ 个字符时警告,{error}+ 个字符时超出限制(在 Web 部件的编辑属性中设置)',
    Explorer_RefreshTooltip: '实时重新检查每个库,忽略缓存的结果',
    Explorer_Refresh: '刷新',
    Explorer_ActivityLog: '活动日志',
    Explorer_ActivityLogEmpty: '尚无记录。',
    Explorer_TreeAriaLabel: '文档库',
    Explorer_NoLibraries: '在此网站上找不到文档库。',
    Explorer_SelectItemPrompt: '在树中选择一个项目,以查看其预估的 OneDrive 路径和字符数。',
    Explorer_CouldntList: '无法列出“{path}”:{error}',
    Explorer_CouldntLoad: '无法加载“{path}”:{error}',
    Explorer_StatusWithChars: '{status} — {count} 个字符',
    Explorer_ContainsBelowError: '此文件夹下方的某处包含超出限制的项目。',
    Explorer_ContainsBelowWarning: '此文件夹下方的某处包含警告级别的项目。',

    // ── Explorer: icon legend ──
    Legend_Scanning: '正在扫描',
    Legend_ScanningTooltip: '此库的后台扫描尚未完成 — 圆点指示器(而非图标本身)可能不是最终结果。',
    Legend_IssueBelow: '下方有问题',
    Legend_IssueBelowTooltip: '即使此文件夹自身的路径没有问题,其内部某处仍包含警告级别或超出限制的项目 — 展开该文件夹即可找到具体项目。',

    // ── Explorer: tree ──
    Tree_StillChecking: '仍在检查此库下方是否存在问题 — 圆点可能还不是最终结果。',
    Tree_ContainsBelowError: '下方包含超出限制的项目',
    Tree_ContainsBelowWarning: '下方包含警告级别的项目',
    Tree_ScanInfo: '{description}(下级项目检查:{source},{age}。)',
    Tree_SourceCache: '来自缓存',
    Tree_SourceLive: '实时扫描',
    Age_JustNow: '刚刚',
    Age_OneMinute: '1 分钟前',
    Age_Minutes: '{count} 分钟前',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: '示例路径前缀',
    Breakdown_SyncFolder: '库同步文件夹(“{name}”)',
    Breakdown_Relative: '库内的相对路径',
    Breakdown_Total: '总计(含分隔符)',
    Breakdown_Chars: '{count} 个字符',

    // ── Throttling notices ──
    Throttle_Paused: 'SharePoint 已进行限制 — 后台扫描已暂停 {seconds} 秒。',
    Throttle_Gentle: '在受到 SharePoint 限制后,后台扫描正在以低速运行(并发数 {limit}/{target})。',
    Throttle_ReportWaiting: ' — 受到 SharePoint 限制,正在等待 {seconds} 秒',
    Throttle_ReportGentle: ' — 收到 {events} 次限制响应后以低速运行(并发数 {limit}/{target})',

    // ── Report ──
    Report_Title: '报告',
    Report_LibrariesToScan: '要扫描的库',
    Report_SelectAll: '全选',
    Report_SelectNone: '全部不选',
    Report_RunFullScan: '运行完整扫描',
    Report_Cancelling: '正在取消…',
    Report_Scanned: '已扫描 {count} 个项目…{note}',
    Report_ExportButton: '导出报告…',
    Report_Summary: '已扫描 {total} 个项目 — {over} 个超出限制,{warning} 个为警告级别',
    Report_Empty: '请在上方选择库并运行完整扫描以生成报告。',
    Report_ScanFailed: '扫描“{library}”失败:{error}',

    // ── Export dialog and files ──
    Export_DialogTitle: '导出报告',
    Export_Format: '格式',
    Export_Scope: '范围',
    Export_Type: '类型',
    Export_Folder: '文件夹',
    Export_File: '文件',
    Export_ColLibrary: '库',
    Export_ColPath: '预估的 OneDrive 路径',
    Export_ColLength: '长度',
    Export_ColStatus: '状态',
    Export_SheetSummary: '摘要',
    Export_SheetPaths: '路径',
    Export_ReportTitle: 'SharePoint Smart Path Length 报告',
    Export_Generated: '生成时间',
    Export_ItemsScanned: '已扫描的项目',
    Export_OverLimit: '超出限制',
    Export_WarningLevel: '警告级别',
    Export_OK: '正常',

    // ── Settings ──
    Settings_Title: '设置',
    Settings_SamplePathTooltip: '你的 OneDrive 同步根目录,例如 C:\\Users\\UsernamePath\\OneDrive - Company\\。仅保存在此浏览器中 — 不会与其他用户共享。',
    Settings_ConcurrencyLabel: '完整扫描期间的并发 API 请求数(上限)',
    Settings_ConcurrencyTooltip: '这是上限,而不是固定速率。扫描会从远低于该值的水平开始,并在 SharePoint 能够跟上时逐步提高。如果 SharePoint 对扫描进行限制,扫描会暂停(遵循 Retry-After),将并发数减半,之后仅会逐步回升到略低于被限制水平的程度 — 绝不会回到该水平。如果扫描仍然导致限制,请调低此值。',
    Settings_IncludeHidden: '包括隐藏库和系统库',
    Settings_ThresholdsNote: '警告({warning} 个字符)和超出限制({error} 个字符)的阈值由编辑此页面的人员在 Web 部件的属性窗格(“编辑 Web 部件”→ SharePoint Smart Path Length 设置)中设置,而不是在此处设置。'
  };
});
