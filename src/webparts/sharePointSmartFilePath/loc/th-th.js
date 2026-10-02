define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'การกำหนดค่า SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'เกณฑ์ความยาวของพาธ',
    PropertyPane_Group_SamplePath: 'พาธตัวอย่างของ OneDrive',
    PropertyPane_WarningLength_Label: 'ความยาวที่เตือน (อักขระ)',
    PropertyPane_ErrorLength_Label: 'ความยาวที่เกินขีดจำกัด (อักขระ)',
    PropertyPane_SamplePath_Label: 'คำนำหน้าพาธตัวอย่างของ OneDrive เริ่มต้น',
    PropertyPane_Validation_PositiveInteger: 'ป้อนจำนวนเต็มบวก',
    PropertyPane_Validation_WarningLessThanError: 'ความยาวที่เตือนต้องน้อยกว่าความยาวที่เกินขีดจำกัด',

    // ── Common ──
    Common_Back: 'ย้อนกลับ',
    Common_Cancel: 'ยกเลิก',
    Common_Close: 'ปิด',
    Common_Clear: 'ล้าง',
    Common_Connect: 'เชื่อมต่อ',
    Common_Export: 'ส่งออก',
    Common_LoadingLibraries: 'กำลังโหลดไลบรารี…',
    Common_SamplePathLabel: 'คำนำหน้าพาธตัวอย่างของ OneDrive',

    // ── Header ──
    App_ChangeUrl: 'เปลี่ยน URL',
    App_Explorer: 'ตัวสำรวจ',
    App_Report: 'รายงาน',
    App_Settings: 'การตั้งค่า',

    // ── Path status ──
    Status_OK: 'ตกลง',
    Status_Warning: 'คำเตือน',
    Status_OverLimit: 'เกินขีดจำกัด',
    StatusDescription_Error: 'พาธนี้ถึงหรือเกินขีดจำกัดที่กำหนดค่าไว้ — อาจซิงค์กับ OneDrive ไม่ถูกต้อง',
    StatusDescription_Warning: 'พาธนี้ใกล้ถึงขีดจำกัดที่กำหนดค่าไว้ — ควรทำให้สั้นลงในเร็วๆ นี้',
    StatusDescription_Normal: 'พาธนี้อยู่ภายในขีดจำกัดที่กำหนดค่าไว้อย่างสบายๆ — ไม่ต้องดำเนินการใดๆ',

    // ── Scope / filters ──
    Scope_All: 'พาธทั้งหมด',
    Scope_WarningAndOver: 'พาธที่อยู่ในระดับคำเตือนและเกินขีดจำกัด',
    Scope_OverOnly: 'เฉพาะพาธที่เกินขีดจำกัด',
    Filter_All: 'ทั้งหมด',
    Filter_WarningAndOver: 'คำเตือนและเกินขีดจำกัด',
    Filter_OverOnly: 'เฉพาะที่เกินขีดจำกัด',

    // ── Path table ──
    Table_Library: 'ไลบรารี',
    Table_EstimatedPath: 'พาธ OneDrive โดยประมาณ',
    Table_Length: 'ความยาว',
    Table_Status: 'สถานะ',
    Table_NoMatch: 'ไม่มีรายการที่ตรงกับตัวกรองปัจจุบัน',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'ชื่อโฟลเดอร์ซิงค์ของไลบรารี',
    Explorer_ThresholdLegend: 'เตือนเมื่อมี {warning}+ อักขระ เกินขีดจำกัดเมื่อมี {error}+ (กำหนดในคุณสมบัติการแก้ไขของเว็บพาร์ต)',
    Explorer_RefreshTooltip: 'ตรวจสอบทุกไลบรารีอีกครั้งแบบสด โดยไม่สนใจผลลัพธ์ที่แคชไว้',
    Explorer_Refresh: 'รีเฟรช',
    Explorer_ActivityLog: 'บันทึกกิจกรรม',
    Explorer_ActivityLogEmpty: 'ยังไม่มีการบันทึกใดๆ',
    Explorer_TreeAriaLabel: 'ไลบรารีเอกสาร',
    Explorer_NoLibraries: 'ไม่พบไลบรารีเอกสารในไซต์นี้',
    Explorer_SelectItemPrompt: 'เลือกรายการในแผนผังเพื่อดูพาธ OneDrive โดยประมาณและจำนวนอักขระ',
    Explorer_CouldntList: 'ไม่สามารถแสดงรายการ "{path}": {error}',
    Explorer_CouldntLoad: 'ไม่สามารถโหลด "{path}": {error}',
    Explorer_StatusWithChars: '{status} — {count} อักขระ',
    Explorer_ContainsBelowError: 'มีรายการที่เกินขีดจำกัดอยู่ที่ใดที่หนึ่งใต้โฟลเดอร์นี้',
    Explorer_ContainsBelowWarning: 'มีรายการที่อยู่ในระดับคำเตือนอยู่ที่ใดที่หนึ่งใต้โฟลเดอร์นี้',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'กำลังสแกน',
    Legend_ScanningTooltip: 'การสแกนในพื้นหลังของไลบรารีนี้ยังไม่เสร็จสิ้น — ตัวบ่งชี้จุด (ไม่ใช่ไอคอนเอง) อาจยังไม่เป็นค่าสุดท้าย',
    Legend_IssueBelow: 'มีปัญหาด้านล่าง',
    Legend_IssueBelowTooltip: 'โฟลเดอร์นี้มีรายการที่อยู่ในระดับคำเตือนหรือเกินขีดจำกัดอยู่ภายใน แม้ว่าพาธของโฟลเดอร์เองจะไม่มีปัญหา — ขยายโฟลเดอร์เพื่อค้นหารายการนั้น',

    // ── Explorer: tree ──
    Tree_StillChecking: 'ยังคงตรวจสอบไลบรารีนี้เพื่อหาปัญหาด้านล่าง — จุดอาจยังไม่เป็นค่าสุดท้าย',
    Tree_ContainsBelowError: 'มีรายการที่เกินขีดจำกัดด้านล่าง',
    Tree_ContainsBelowWarning: 'มีรายการที่อยู่ในระดับคำเตือนด้านล่าง',
    Tree_ScanInfo: '{description} (การตรวจสอบรายการด้านล่าง: {source}, {age})',
    Tree_SourceCache: 'จากแคช',
    Tree_SourceLive: 'การสแกนแบบสด',
    Age_JustNow: 'เมื่อสักครู่',
    Age_OneMinute: '1 นาทีที่แล้ว',
    Age_Minutes: '{count} นาทีที่แล้ว',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'คำนำหน้าพาธตัวอย่าง',
    Breakdown_SyncFolder: 'โฟลเดอร์ซิงค์ของไลบรารี ("{name}")',
    Breakdown_Relative: 'พาธสัมพัทธ์ภายในไลบรารี',
    Breakdown_Total: 'รวม (รวมตัวคั่น)',
    Breakdown_Chars: '{count} อักขระ',

    // ── Throttling notices ──
    Throttle_Paused: 'SharePoint จำกัดอัตราการร้องขอ — การสแกนในพื้นหลังหยุดชั่วคราวเป็นเวลา {seconds} วินาที',
    Throttle_Gentle: 'การสแกนในพื้นหลังกำลังทำงานแบบผ่อนปรน (การทำงานพร้อมกัน {limit} จาก {target}) หลังจากถูก SharePoint จำกัดอัตราการร้องขอ',
    Throttle_ReportWaiting: ' — ถูก SharePoint จำกัดอัตราการร้องขอ กำลังรอ {seconds} วินาที',
    Throttle_ReportGentle: ' — กำลังทำงานแบบผ่อนปรน (การทำงานพร้อมกัน {limit} จาก {target}) หลังจากได้รับการตอบกลับการจำกัดอัตรา {events} รายการ',

    // ── Report ──
    Report_Title: 'รายงาน',
    Report_LibrariesToScan: 'ไลบรารีที่จะสแกน',
    Report_SelectAll: 'เลือกทั้งหมด',
    Report_SelectNone: 'ไม่เลือกเลย',
    Report_RunFullScan: 'เรียกใช้การสแกนทั้งหมด',
    Report_Cancelling: 'กำลังยกเลิก…',
    Report_Scanned: 'สแกนแล้ว {count} รายการ…{note}',
    Report_ExportButton: 'ส่งออกรายงาน…',
    Report_Summary: 'สแกนแล้ว {total} รายการ — เกินขีดจำกัด {over} รายการ ระดับคำเตือน {warning} รายการ',
    Report_Empty: 'เลือกไลบรารีด้านบนแล้วเรียกใช้การสแกนทั้งหมดเพื่อสร้างรายงาน',
    Report_ScanFailed: 'การสแกน "{library}" ล้มเหลว: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'ส่งออกรายงาน',
    Export_Format: 'รูปแบบ',
    Export_Scope: 'ขอบเขต',
    Export_Type: 'ประเภท',
    Export_Folder: 'โฟลเดอร์',
    Export_File: 'ไฟล์',
    Export_ColLibrary: 'ไลบรารี',
    Export_ColPath: 'พาธ OneDrive โดยประมาณ',
    Export_ColLength: 'ความยาว',
    Export_ColStatus: 'สถานะ',
    Export_SheetSummary: 'สรุป',
    Export_SheetPaths: 'พาธ',
    Export_ReportTitle: 'รายงาน SharePoint Smart Path Length',
    Export_Generated: 'สร้างเมื่อ',
    Export_ItemsScanned: 'รายการที่สแกน',
    Export_OverLimit: 'เกินขีดจำกัด',
    Export_WarningLevel: 'ระดับคำเตือน',
    Export_OK: 'ตกลง',

    // ── Settings ──
    Settings_Title: 'การตั้งค่า',
    Settings_SamplePathTooltip: 'รากการซิงค์ OneDrive ของคุณ เช่น C:\\Users\\UsernamePath\\OneDrive - Company\\ บันทึกไว้ในเบราว์เซอร์นี้เท่านั้น — ไม่แชร์กับผู้ใช้อื่น',
    Settings_ConcurrencyLabel: 'คำขอ API พร้อมกันระหว่างการสแกนทั้งหมด (ขีดจำกัดสูงสุด)',
    Settings_ConcurrencyTooltip: 'เป็นขีดจำกัดสูงสุด ไม่ใช่อัตราคงที่ การสแกนจะเริ่มต้นที่ค่าต่ำกว่านี้มากและเพิ่มขึ้นตราบเท่าที่ SharePoint ตอบสนองได้ทัน หาก SharePoint จำกัดอัตราการสแกน การสแกนจะหยุดชั่วคราว (โดยปฏิบัติตาม Retry-After) ลดการทำงานพร้อมกันลงครึ่งหนึ่ง จากนั้นค่อยๆ เพิ่มขึ้นอีกครั้งจนถึงระดับที่ต่ำกว่าระดับที่ถูกจำกัดเล็กน้อยเท่านั้น — ไม่กลับไปถึงระดับนั้น ลดค่านี้หากการสแกนยังคงทำให้ถูกจำกัดอัตรา',
    Settings_IncludeHidden: 'รวมไลบรารีที่ซ่อนและไลบรารีระบบ',
    Settings_ThresholdsNote: 'เกณฑ์คำเตือน ({warning} อักขระ) และเกณฑ์เกินขีดจำกัด ({error} อักขระ) กำหนดโดยผู้ที่แก้ไขหน้านี้ — จากบานหน้าต่างคุณสมบัติของเว็บพาร์ต ("แก้ไขเว็บพาร์ต" → การตั้งค่า SharePoint Smart Path Length) ไม่ใช่ที่นี่'
  };
});
