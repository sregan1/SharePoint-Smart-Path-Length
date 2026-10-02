define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Cấu hình SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Ngưỡng độ dài đường dẫn',
    PropertyPane_Group_SamplePath: 'Đường dẫn OneDrive mẫu',
    PropertyPane_WarningLength_Label: 'Độ dài cảnh báo (ký tự)',
    PropertyPane_ErrorLength_Label: 'Độ dài vượt giới hạn (ký tự)',
    PropertyPane_SamplePath_Label: 'Tiền tố đường dẫn OneDrive mẫu mặc định',
    PropertyPane_Validation_PositiveInteger: 'Nhập một số nguyên dương.',
    PropertyPane_Validation_WarningLessThanError: 'Độ dài cảnh báo phải nhỏ hơn độ dài vượt giới hạn.',

    // ── Common ──
    Common_Back: 'Quay lại',
    Common_Cancel: 'Hủy',
    Common_Close: 'Đóng',
    Common_Clear: 'Xóa',
    Common_Connect: 'Kết nối',
    Common_Export: 'Xuất',
    Common_LoadingLibraries: 'Đang tải thư viện…',
    Common_SamplePathLabel: 'Tiền tố đường dẫn OneDrive mẫu',

    // ── Header ──
    App_ChangeUrl: 'Thay đổi URL',
    App_Explorer: 'Trình khám phá',
    App_Report: 'Báo cáo',
    App_Settings: 'Cài đặt',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Cảnh báo',
    Status_OverLimit: 'Vượt giới hạn',
    StatusDescription_Error: 'Đường dẫn này đạt hoặc vượt giới hạn đã cấu hình — nhiều khả năng sẽ không đồng bộ chính xác với OneDrive.',
    StatusDescription_Warning: 'Đường dẫn này sắp đạt giới hạn đã cấu hình — nên rút ngắn sớm.',
    StatusDescription_Normal: 'Đường dẫn này nằm trong giới hạn đã cấu hình một cách thoải mái — không cần làm gì.',

    // ── Scope / filters ──
    Scope_All: 'Tất cả đường dẫn',
    Scope_WarningAndOver: 'Đường dẫn ở mức cảnh báo và vượt giới hạn',
    Scope_OverOnly: 'Chỉ đường dẫn vượt giới hạn',
    Filter_All: 'Tất cả',
    Filter_WarningAndOver: 'Cảnh báo và vượt',
    Filter_OverOnly: 'Chỉ vượt giới hạn',

    // ── Path table ──
    Table_Library: 'Thư viện',
    Table_EstimatedPath: 'Đường dẫn OneDrive ước tính',
    Table_Length: 'Độ dài',
    Table_Status: 'Trạng thái',
    Table_NoMatch: 'Không có mục nào khớp với bộ lọc hiện tại.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Tên thư mục đồng bộ của thư viện',
    Explorer_ThresholdLegend: 'Cảnh báo từ {warning}+ ký tự, vượt giới hạn từ {error}+ (đặt trong thuộc tính chỉnh sửa của web part)',
    Explorer_RefreshTooltip: 'Kiểm tra lại trực tiếp mọi thư viện, bỏ qua kết quả đã lưu trong bộ nhớ đệm',
    Explorer_Refresh: 'Làm mới',
    Explorer_ActivityLog: 'Nhật ký hoạt động',
    Explorer_ActivityLogEmpty: 'Chưa có gì được ghi lại.',
    Explorer_TreeAriaLabel: 'Thư viện tài liệu',
    Explorer_NoLibraries: 'Không tìm thấy thư viện tài liệu nào trên site này.',
    Explorer_SelectItemPrompt: 'Chọn một mục trong cây để xem đường dẫn OneDrive ước tính và số ký tự của mục đó.',
    Explorer_CouldntList: 'Không thể liệt kê "{path}": {error}',
    Explorer_CouldntLoad: 'Không thể tải "{path}": {error}',
    Explorer_StatusWithChars: '{status} — {count} ký tự',
    Explorer_ContainsBelowError: 'Có một mục vượt giới hạn ở đâu đó bên dưới thư mục này.',
    Explorer_ContainsBelowWarning: 'Có một mục ở mức cảnh báo ở đâu đó bên dưới thư mục này.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Đang quét',
    Legend_ScanningTooltip: 'Quá trình quét nền của thư viện này chưa hoàn tất — chỉ báo dấu chấm (không phải chính biểu tượng) có thể chưa phải là kết quả cuối cùng.',
    Legend_IssueBelow: 'Có sự cố bên dưới',
    Legend_IssueBelowTooltip: 'Thư mục này chứa một mục ở mức cảnh báo hoặc vượt giới hạn ở đâu đó bên trong, dù đường dẫn của chính nó vẫn ổn — hãy mở rộng để tìm ra mục đó.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Vẫn đang kiểm tra thư viện này để tìm sự cố bên dưới — dấu chấm có thể chưa phải là kết quả cuối cùng.',
    Tree_ContainsBelowError: 'Có một mục vượt giới hạn bên dưới',
    Tree_ContainsBelowWarning: 'Có một mục ở mức cảnh báo bên dưới',
    Tree_ScanInfo: '{description} (Kiểm tra mục bên dưới: {source}, {age}.)',
    Tree_SourceCache: 'từ bộ nhớ đệm',
    Tree_SourceLive: 'quét trực tiếp',
    Age_JustNow: 'vừa xong',
    Age_OneMinute: '1 phút trước',
    Age_Minutes: '{count} phút trước',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Tiền tố đường dẫn mẫu',
    Breakdown_SyncFolder: 'Thư mục đồng bộ của thư viện ("{name}")',
    Breakdown_Relative: 'Đường dẫn tương đối trong thư viện',
    Breakdown_Total: 'Tổng cộng (gồm dấu phân tách)',
    Breakdown_Chars: '{count} ký tự',

    // ── Throttling notices ──
    Throttle_Paused: 'SharePoint đã điều tiết yêu cầu — quá trình quét nền bị tạm dừng trong {seconds} giây.',
    Throttle_Gentle: 'Quá trình quét nền đang chạy ở chế độ nhẹ nhàng (đồng thời {limit}/{target}) sau khi bị SharePoint điều tiết.',
    Throttle_ReportWaiting: ' — bị SharePoint điều tiết, đang chờ {seconds} giây',
    Throttle_ReportGentle: ' — đang chạy ở chế độ nhẹ nhàng (đồng thời {limit}/{target}) sau {events} phản hồi điều tiết',

    // ── Report ──
    Report_Title: 'Báo cáo',
    Report_LibrariesToScan: 'Thư viện cần quét',
    Report_SelectAll: 'Chọn tất cả',
    Report_SelectNone: 'Bỏ chọn tất cả',
    Report_RunFullScan: 'Chạy quét toàn bộ',
    Report_Cancelling: 'Đang hủy…',
    Report_Scanned: 'Đã quét {count} mục…{note}',
    Report_ExportButton: 'Xuất báo cáo…',
    Report_Summary: 'Đã quét {total} mục — {over} vượt giới hạn, {warning} ở mức cảnh báo',
    Report_Empty: 'Chọn thư viện ở trên và chạy quét toàn bộ để tạo báo cáo.',
    Report_ScanFailed: 'Quét "{library}" không thành công: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Xuất báo cáo',
    Export_Format: 'Định dạng',
    Export_Scope: 'Phạm vi',
    Export_Type: 'Loại',
    Export_Folder: 'Thư mục',
    Export_File: 'Tệp',
    Export_ColLibrary: 'Thư viện',
    Export_ColPath: 'Đường dẫn OneDrive ước tính',
    Export_ColLength: 'Độ dài',
    Export_ColStatus: 'Trạng thái',
    Export_SheetSummary: 'Tóm tắt',
    Export_SheetPaths: 'Đường dẫn',
    Export_ReportTitle: 'Báo cáo SharePoint Smart Path Length',
    Export_Generated: 'Ngày tạo',
    Export_ItemsScanned: 'Số mục đã quét',
    Export_OverLimit: 'Vượt giới hạn',
    Export_WarningLevel: 'Mức cảnh báo',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Cài đặt',
    Settings_SamplePathTooltip: 'Thư mục gốc đồng bộ OneDrive của bạn, ví dụ: C:\\Users\\UsernamePath\\OneDrive - Company\\. Chỉ được lưu trong trình duyệt này — không chia sẻ với người dùng khác.',
    Settings_ConcurrencyLabel: 'Yêu cầu API đồng thời trong khi quét toàn bộ (giới hạn trên)',
    Settings_ConcurrencyTooltip: 'Đây là giới hạn trên, không phải tốc độ cố định. Quá trình quét bắt đầu thấp hơn nhiều và tăng dần khi SharePoint còn theo kịp. Nếu SharePoint điều tiết quá trình quét, quá trình này sẽ tạm dừng (tuân theo Retry-After), giảm một nửa mức đồng thời, rồi sau đó chỉ tăng dần trở lại đến ngay dưới mức đã bị điều tiết — không bao giờ quay lại đúng mức đó. Hãy giảm giá trị này nếu quá trình quét vẫn gây ra điều tiết.',
    Settings_IncludeHidden: 'Bao gồm thư viện ẩn và thư viện hệ thống',
    Settings_ThresholdsNote: 'Ngưỡng cảnh báo ({warning} ký tự) và vượt giới hạn ({error} ký tự) do người chỉnh sửa trang này đặt, từ ngăn thuộc tính của web part ("Chỉnh sửa web part" → cài đặt SharePoint Smart Path Length), không phải tại đây.'
  };
});
