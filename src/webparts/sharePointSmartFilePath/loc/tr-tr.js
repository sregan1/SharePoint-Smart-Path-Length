define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'SharePoint Smart Path Length yapılandırması',
    PropertyPane_Group_Thresholds: 'Yol uzunluğu eşikleri',
    PropertyPane_Group_SamplePath: 'OneDrive örnek yolu',
    PropertyPane_WarningLength_Label: 'Uyarı uzunluğu (karakter)',
    PropertyPane_ErrorLength_Label: 'Sınır aşımı uzunluğu (karakter)',
    PropertyPane_SamplePath_Label: 'Varsayılan örnek OneDrive yolu öneki',
    PropertyPane_Validation_PositiveInteger: 'Pozitif bir tam sayı girin.',
    PropertyPane_Validation_WarningLessThanError: 'Uyarı uzunluğu, sınır aşımı uzunluğundan küçük olmalıdır.',

    // ── Common ──
    Common_Back: 'Geri',
    Common_Cancel: 'İptal',
    Common_Close: 'Kapat',
    Common_Clear: 'Temizle',
    Common_Connect: 'Bağlan',
    Common_Export: 'Dışarı aktar',
    Common_LoadingLibraries: 'Kitaplıklar yükleniyor…',
    Common_SamplePathLabel: 'Örnek OneDrive yolu öneki',

    // ── Header ──
    App_ChangeUrl: 'URL’yi değiştir',
    App_Explorer: 'Gezgin',
    App_Report: 'Rapor',
    App_Settings: 'Ayarlar',

    // ── Path status ──
    Status_OK: 'Tamam',
    Status_Warning: 'Uyarı',
    Status_OverLimit: 'Sınır aşıldı',
    StatusDescription_Error: 'Bu yol yapılandırılan sınırda veya sınırın üzerinde — büyük olasılıkla OneDrive ile doğru şekilde eşitlenmeyecektir.',
    StatusDescription_Warning: 'Bu yol yapılandırılan sınıra yaklaşıyor — yakında kısaltmaya değer.',
    StatusDescription_Normal: 'Bu yol yapılandırılan sınırın rahatça altında — yapılacak bir şey yok.',

    // ── Scope / filters ──
    Scope_All: 'Tüm yollar',
    Scope_WarningAndOver: 'Uyarı düzeyindeki ve sınırı aşan yollar',
    Scope_OverOnly: 'Yalnızca sınırı aşan yollar',
    Filter_All: 'Tümü',
    Filter_WarningAndOver: 'Uyarı ve aşım',
    Filter_OverOnly: 'Yalnızca sınır aşımı',

    // ── Path table ──
    Table_Library: 'Kitaplık',
    Table_EstimatedPath: 'Tahmini OneDrive yolu',
    Table_Length: 'Uzunluk',
    Table_Status: 'Durum',
    Table_NoMatch: 'Geçerli filtreyle eşleşen öğe yok.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Kitaplık eşitleme klasörü adı',
    Explorer_ThresholdLegend: 'Uyarı: {warning}+ karakter, sınır aşımı: {error}+ (web bölümünün düzenleme özelliklerinde ayarlanır)',
    Explorer_RefreshTooltip: 'Önbelleğe alınmış sonuçları yoksayarak tüm kitaplıkları canlı olarak yeniden denetle',
    Explorer_Refresh: 'Yenile',
    Explorer_ActivityLog: 'Etkinlik günlüğü',
    Explorer_ActivityLogEmpty: 'Henüz günlüğe kaydedilen bir şey yok.',
    Explorer_TreeAriaLabel: 'Belge kitaplıkları',
    Explorer_NoLibraries: 'Bu sitede belge kitaplığı bulunamadı.',
    Explorer_SelectItemPrompt: 'Tahmini OneDrive yolunu ve karakter sayısını görmek için ağaçtan bir öğe seçin.',
    Explorer_CouldntList: '"{path}" listelenemedi: {error}',
    Explorer_CouldntLoad: '"{path}" yüklenemedi: {error}',
    Explorer_StatusWithChars: '{status} — {count} krk.',
    Explorer_ContainsBelowError: 'Bu klasörün altında bir yerde sınırı aşan bir öğe var.',
    Explorer_ContainsBelowWarning: 'Bu klasörün altında bir yerde uyarı düzeyinde bir öğe var.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Taranıyor',
    Legend_ScanningTooltip: 'Bu kitaplığın arka plan taraması henüz bitmedi — nokta göstergesi (simgenin kendisi değil) henüz kesin olmayabilir.',
    Legend_IssueBelow: 'Altında sorun var',
    Legend_IssueBelowTooltip: 'Bu klasörün kendi yolu sorunsuz olsa bile içinde bir yerde uyarı düzeyinde veya sınırı aşan bir öğe var — hangisi olduğunu bulmak için genişletin.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Bu kitaplık altındaki sorunlar için denetim sürüyor — nokta henüz kesin olmayabilir.',
    Tree_ContainsBelowError: 'Altında sınırı aşan bir öğe var',
    Tree_ContainsBelowWarning: 'Altında uyarı düzeyinde bir öğe var',
    Tree_ScanInfo: '{description} (Alt öğe denetimi: {source}, {age}.)',
    Tree_SourceCache: 'önbellekten',
    Tree_SourceLive: 'canlı tarama',
    Age_JustNow: 'az önce',
    Age_OneMinute: '1 dk. önce',
    Age_Minutes: '{count} dk. önce',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Örnek yol öneki',
    Breakdown_SyncFolder: 'Kitaplık eşitleme klasörü ("{name}")',
    Breakdown_Relative: 'Kitaplık içindeki göreli yol',
    Breakdown_Total: 'Toplam (ayırıcılar dahil)',
    Breakdown_Chars: '{count} krk.',

    // ── Throttling notices ──
    Throttle_Paused: 'SharePoint tarafından kısıtlandı — arka plan taraması {seconds} sn. duraklatıldı.',
    Throttle_Gentle: 'SharePoint tarafından kısıtlandıktan sonra arka plan taraması yavaş çalışıyor (eşzamanlılık {limit}/{target}).',
    Throttle_ReportWaiting: ' — SharePoint tarafından kısıtlandı, {seconds} sn. bekleniyor',
    Throttle_ReportGentle: ' — {events} kısıtlama yanıtından sonra yavaş çalışıyor (eşzamanlılık {limit}/{target})',

    // ── Report ──
    Report_Title: 'Rapor',
    Report_LibrariesToScan: 'Taranacak kitaplıklar',
    Report_SelectAll: 'Tümünü seç',
    Report_SelectNone: 'Hiçbirini seçme',
    Report_RunFullScan: 'Tam tarama çalıştır',
    Report_Cancelling: 'İptal ediliyor…',
    Report_Scanned: '{count} öğe tarandı…{note}',
    Report_ExportButton: 'Raporu dışarı aktar…',
    Report_Summary: '{total} öğe tarandı — {over} sınırı aşıyor, {warning} uyarı düzeyinde',
    Report_Empty: 'Rapor oluşturmak için yukarıdan kitaplıkları seçin ve tam tarama çalıştırın.',
    Report_ScanFailed: '"{library}" taraması başarısız oldu: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Raporu dışarı aktar',
    Export_Format: 'Biçim',
    Export_Scope: 'Kapsam',
    Export_Type: 'Tür',
    Export_Folder: 'Klasör',
    Export_File: 'Dosya',
    Export_ColLibrary: 'Kitaplık',
    Export_ColPath: 'Tahmini OneDrive Yolu',
    Export_ColLength: 'Uzunluk',
    Export_ColStatus: 'Durum',
    Export_SheetSummary: 'Özet',
    Export_SheetPaths: 'Yollar',
    Export_ReportTitle: 'SharePoint Smart Path Length Raporu',
    Export_Generated: 'Oluşturulma',
    Export_ItemsScanned: 'Taranan öğeler',
    Export_OverLimit: 'Sınır aşıldı',
    Export_WarningLevel: 'Uyarı düzeyi',
    Export_OK: 'Tamam',

    // ── Settings ──
    Settings_Title: 'Ayarlar',
    Settings_SamplePathTooltip: 'OneDrive eşitleme kök klasörünüz, örn. C:\\Users\\UsernamePath\\OneDrive - Company\\. Yalnızca bu tarayıcıya kaydedilir — diğer kullanıcılarla paylaşılmaz.',
    Settings_ConcurrencyLabel: 'Tam tarama sırasında eşzamanlı API istekleri (üst sınır)',
    Settings_ConcurrencyTooltip: 'Sabit bir hız değil, üst sınırdır. Taramalar bunun çok altında başlar ve SharePoint yetişebildiği sürece kademeli olarak artar. SharePoint taramayı kısıtlarsa tarama duraklar (Retry-After değerine uyar), eşzamanlılığını yarıya indirir ve ardından yalnızca kısıtlanan düzeyin hemen altına kadar yeniden artar — o düzeye hiçbir zaman geri dönmez. Taramalar hâlâ kısıtlamaya neden oluyorsa bu değeri düşürün.',
    Settings_IncludeHidden: 'Gizli ve sistem kitaplıklarını dahil et',
    Settings_ThresholdsNote: 'Uyarı ({warning} karakter) ve sınır aşımı ({error} karakter) eşikleri, bu sayfayı düzenleyen kişi tarafından web bölümünün özellik bölmesinden ("Web bölümünü düzenle" → SharePoint Smart Path Length ayarları) belirlenir, buradan değil.'
  };
});
