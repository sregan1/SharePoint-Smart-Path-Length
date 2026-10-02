define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Konfigurasi SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Ambang batas panjang jalur',
    PropertyPane_Group_SamplePath: 'Contoh jalur OneDrive',
    PropertyPane_WarningLength_Label: 'Panjang peringatan (karakter)',
    PropertyPane_ErrorLength_Label: 'Panjang melebihi batas (karakter)',
    PropertyPane_SamplePath_Label: 'Awalan contoh jalur OneDrive default',
    PropertyPane_Validation_PositiveInteger: 'Masukkan bilangan bulat positif.',
    PropertyPane_Validation_WarningLessThanError: 'Panjang peringatan harus lebih kecil daripada panjang melebihi batas.',

    // ── Common ──
    Common_Back: 'Kembali',
    Common_Cancel: 'Batal',
    Common_Close: 'Tutup',
    Common_Clear: 'Hapus',
    Common_Connect: 'Sambungkan',
    Common_Export: 'Ekspor',
    Common_LoadingLibraries: 'Memuat pustaka…',
    Common_SamplePathLabel: 'Awalan contoh jalur OneDrive',

    // ── Header ──
    App_ChangeUrl: 'Ubah URL',
    App_Explorer: 'Penjelajah',
    App_Report: 'Laporan',
    App_Settings: 'Pengaturan',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Peringatan',
    Status_OverLimit: 'Melebihi batas',
    StatusDescription_Error: "Jalur ini mencapai atau melebihi batas yang dikonfigurasi — kemungkinan tidak akan disinkronkan ke OneDrive dengan benar.",
    StatusDescription_Warning: 'Jalur ini mendekati batas yang dikonfigurasi — sebaiknya segera dipersingkat.',
    StatusDescription_Normal: 'Jalur ini masih jauh di bawah batas yang dikonfigurasi — tidak perlu tindakan.',

    // ── Scope / filters ──
    Scope_All: 'Semua jalur',
    Scope_WarningAndOver: 'Jalur pada tingkat peringatan dan yang melebihi batas',
    Scope_OverOnly: 'Hanya jalur yang melebihi batas',
    Filter_All: 'Semua',
    Filter_WarningAndOver: 'Peringatan & melebihi batas',
    Filter_OverOnly: 'Hanya yang melebihi batas',

    // ── Path table ──
    Table_Library: 'Pustaka',
    Table_EstimatedPath: 'Perkiraan jalur OneDrive',
    Table_Length: 'Panjang',
    Table_Status: 'Status',
    Table_NoMatch: 'Tidak ada item yang cocok dengan filter saat ini.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Nama folder sinkronisasi pustaka',
    Explorer_ThresholdLegend: "Peringatan pada {warning}+ karakter, melebihi batas pada {error}+ (diatur di properti edit web part)",
    Explorer_RefreshTooltip: 'Periksa ulang setiap pustaka secara langsung, tanpa menggunakan hasil yang di-cache',
    Explorer_Refresh: 'Segarkan',
    Explorer_ActivityLog: 'Log aktivitas',
    Explorer_ActivityLogEmpty: 'Belum ada yang dicatat.',
    Explorer_TreeAriaLabel: 'Pustaka dokumen',
    Explorer_NoLibraries: 'Tidak ada pustaka dokumen yang ditemukan di situs ini.',
    Explorer_SelectItemPrompt: 'Pilih item di pohon untuk melihat perkiraan jalur OneDrive dan jumlah karakternya.',
    Explorer_CouldntList: 'Tidak dapat mencantumkan "{path}": {error}',
    Explorer_CouldntLoad: 'Tidak dapat memuat "{path}": {error}',
    Explorer_StatusWithChars: '{status} — {count} karakter',
    Explorer_ContainsBelowError: 'Berisi item yang melebihi batas di suatu tempat di bawah folder ini.',
    Explorer_ContainsBelowWarning: 'Berisi item pada tingkat peringatan di suatu tempat di bawah folder ini.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Memindai',
    Legend_ScanningTooltip: "Pemindaian latar belakang pustaka ini belum selesai — indikator titik (bukan ikonnya sendiri) mungkin belum final.",
    Legend_IssueBelow: 'Masalah di bawah',
    Legend_IssueBelowTooltip: 'Folder ini berisi item peringatan atau yang melebihi batas di suatu tempat di dalamnya, meskipun jalurnya sendiri baik-baik saja — luaskan untuk menemukan item yang dimaksud.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Masih memeriksa masalah di bawah pustaka ini — titik mungkin belum final.',
    Tree_ContainsBelowError: 'Berisi item yang melebihi batas di bawahnya',
    Tree_ContainsBelowWarning: 'Berisi item pada tingkat peringatan di bawahnya',
    Tree_ScanInfo: '{description} (Pemeriksaan item di bawah: {source}, {age}.)',
    Tree_SourceCache: 'dari cache',
    Tree_SourceLive: 'pemindaian langsung',
    Age_JustNow: 'baru saja',
    Age_OneMinute: '1 mnt lalu',
    Age_Minutes: '{count} mnt lalu',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Awalan contoh jalur',
    Breakdown_SyncFolder: 'Folder sinkronisasi pustaka ("{name}")',
    Breakdown_Relative: 'Jalur relatif dalam pustaka',
    Breakdown_Total: 'Total (termasuk pemisah)',
    Breakdown_Chars: '{count} karakter',

    // ── Throttling notices ──
    Throttle_Paused: 'Dibatasi oleh SharePoint — pemindaian latar belakang dijeda selama {seconds} dtk.',
    Throttle_Gentle: 'Pemindaian latar belakang berjalan pelan-pelan (konkurensi {limit} dari {target}) setelah dibatasi oleh SharePoint.',
    Throttle_ReportWaiting: ' — dibatasi oleh SharePoint, menunggu {seconds} dtk',
    Throttle_ReportGentle: ' — berjalan pelan-pelan (konkurensi {limit} dari {target}) setelah {events} respons pembatasan',

    // ── Report ──
    Report_Title: 'Laporan',
    Report_LibrariesToScan: 'Pustaka yang akan dipindai',
    Report_SelectAll: 'Pilih semua',
    Report_SelectNone: 'Batalkan semua pilihan',
    Report_RunFullScan: 'Jalankan pemindaian penuh',
    Report_Cancelling: 'Membatalkan…',
    Report_Scanned: '{count} item dipindai…{note}',
    Report_ExportButton: 'Ekspor laporan…',
    Report_Summary: '{total} item dipindai — {over} melebihi batas, {warning} pada tingkat peringatan',
    Report_Empty: 'Pilih pustaka di atas dan jalankan pemindaian penuh untuk membuat laporan.',
    Report_ScanFailed: 'Pemindaian "{library}" gagal: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Ekspor laporan',
    Export_Format: 'Format',
    Export_Scope: 'Cakupan',
    Export_Type: 'Jenis',
    Export_Folder: 'Folder',
    Export_File: 'File',
    Export_ColLibrary: 'Pustaka',
    Export_ColPath: 'Perkiraan Jalur OneDrive',
    Export_ColLength: 'Panjang',
    Export_ColStatus: 'Status',
    Export_SheetSummary: 'Ringkasan',
    Export_SheetPaths: 'Jalur',
    Export_ReportTitle: 'Laporan SharePoint Smart Path Length',
    Export_Generated: 'Dibuat',
    Export_ItemsScanned: 'Item dipindai',
    Export_OverLimit: 'Melebihi batas',
    Export_WarningLevel: 'Tingkat peringatan',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Pengaturan',
    Settings_SamplePathTooltip: "Root sinkronisasi OneDrive Anda, mis. C:\\Users\\UsernamePath\\OneDrive - Company\\. Hanya disimpan di browser ini — tidak dibagikan kepada pengguna lain.",
    Settings_ConcurrencyLabel: 'Permintaan API bersamaan selama pemindaian penuh (batas atas)',
    Settings_ConcurrencyTooltip: 'Batas atas, bukan kecepatan tetap. Pemindaian dimulai jauh di bawah angka ini dan meningkat selama SharePoint mampu mengimbangi. Jika SharePoint membatasi pemindaian, pemindaian dijeda (sesuai Retry-After), konkurensinya dikurangi setengah, lalu setelahnya naik perlahan hanya sampai tepat di bawah tingkat yang dibatasi — tidak pernah sampai ke tingkat itu. Turunkan angka ini jika pemindaian masih menyebabkan pembatasan.',
    Settings_IncludeHidden: 'Sertakan pustaka tersembunyi dan sistem',
    Settings_ThresholdsNote: 'Ambang batas peringatan ({warning} karakter) dan melebihi batas ({error} karakter) ditetapkan oleh siapa pun yang mengedit halaman ini — dari panel properti web part ("Edit web part" → pengaturan SharePoint Smart Path Length), bukan di sini.'
  };
});
