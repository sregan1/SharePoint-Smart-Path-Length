define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'SharePoint Smart Path Length の構成',
    PropertyPane_Group_Thresholds: 'パスの長さのしきい値',
    PropertyPane_Group_SamplePath: 'OneDrive のサンプル パス',
    PropertyPane_WarningLength_Label: '警告の長さ (文字数)',
    PropertyPane_ErrorLength_Label: '制限超過の長さ (文字数)',
    PropertyPane_SamplePath_Label: '既定の OneDrive サンプル パスのプレフィックス',
    PropertyPane_Validation_PositiveInteger: '正の整数を入力してください。',
    PropertyPane_Validation_WarningLessThanError: '警告の長さは制限超過の長さより小さい値にする必要があります。',

    // ── Common ──
    Common_Back: '戻る',
    Common_Cancel: 'キャンセル',
    Common_Close: '閉じる',
    Common_Clear: 'クリア',
    Common_Connect: '接続',
    Common_Export: 'エクスポート',
    Common_LoadingLibraries: 'ライブラリを読み込み中…',
    Common_SamplePathLabel: 'OneDrive サンプル パスのプレフィックス',

    // ── Header ──
    App_ChangeUrl: 'URL の変更',
    App_Explorer: 'エクスプローラー',
    App_Report: 'レポート',
    App_Settings: '設定',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: '警告',
    Status_OverLimit: '制限超過',
    StatusDescription_Error: 'このパスは構成された制限に達しているか、超えています。OneDrive に正しく同期されない可能性があります。',
    StatusDescription_Warning: 'このパスは構成された制限に近づいています。近いうちに短くすることをお勧めします。',
    StatusDescription_Normal: 'このパスは構成された制限に十分収まっています。対応は必要ありません。',

    // ── Scope / filters ──
    Scope_All: 'すべてのパス',
    Scope_WarningAndOver: '警告レベル以上のパス',
    Scope_OverOnly: '制限超過のパスのみ',
    Filter_All: 'すべて',
    Filter_WarningAndOver: '警告と制限超過',
    Filter_OverOnly: '制限超過のみ',

    // ── Path table ──
    Table_Library: 'ライブラリ',
    Table_EstimatedPath: '推定 OneDrive パス',
    Table_Length: '長さ',
    Table_Status: '状態',
    Table_NoMatch: '現在のフィルターに一致する項目はありません。',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'ライブラリの同期フォルダー名',
    Explorer_ThresholdLegend: '{warning}+ 文字で警告、{error}+ 文字で制限超過 (Web パーツの編集プロパティで設定)',
    Explorer_RefreshTooltip: 'キャッシュされた結果を無視して、すべてのライブラリをリアルタイムで再確認します',
    Explorer_Refresh: '更新',
    Explorer_ActivityLog: 'アクティビティ ログ',
    Explorer_ActivityLogEmpty: '記録されたものはまだありません。',
    Explorer_TreeAriaLabel: 'ドキュメント ライブラリ',
    Explorer_NoLibraries: 'このサイトにドキュメント ライブラリが見つかりません。',
    Explorer_SelectItemPrompt: 'ツリーで項目を選択すると、推定 OneDrive パスと文字数が表示されます。',
    Explorer_CouldntList: '"{path}" を一覧表示できませんでした: {error}',
    Explorer_CouldntLoad: '"{path}" を読み込めませんでした: {error}',
    Explorer_StatusWithChars: '{status} — {count} 文字',
    Explorer_ContainsBelowError: 'このフォルダーの下位に制限を超えている項目があります。',
    Explorer_ContainsBelowWarning: 'このフォルダーの下位に警告レベルの項目があります。',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'スキャン中',
    Legend_ScanningTooltip: 'このライブラリのバックグラウンド スキャンはまだ完了していません。ドット インジケーター (アイコン自体ではありません) は最終結果ではない可能性があります。',
    Legend_IssueBelow: '下位に問題あり',
    Legend_IssueBelowTooltip: 'このフォルダー自体のパスに問題がなくても、内部に警告レベルまたは制限超過の項目があります。展開して該当の項目を確認してください。',

    // ── Explorer: tree ──
    Tree_StillChecking: 'このライブラリの下位の問題を確認中です。ドットは最終結果ではない可能性があります。',
    Tree_ContainsBelowError: '下位に制限超過の項目があります',
    Tree_ContainsBelowWarning: '下位に警告レベルの項目があります',
    Tree_ScanInfo: '{description} (下位項目のチェック: {source}、{age}。)',
    Tree_SourceCache: 'キャッシュから',
    Tree_SourceLive: 'ライブ スキャン',
    Age_JustNow: 'たった今',
    Age_OneMinute: '1 分前',
    Age_Minutes: '{count} 分前',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'サンプル パスのプレフィックス',
    Breakdown_SyncFolder: 'ライブラリの同期フォルダー ("{name}")',
    Breakdown_Relative: 'ライブラリ内の相対パス',
    Breakdown_Total: '合計 (区切り文字を含む)',
    Breakdown_Chars: '{count} 文字',

    // ── Throttling notices ──
    Throttle_Paused: 'SharePoint によって調整されました。バックグラウンド スキャンは {seconds} 秒間一時停止されます。',
    Throttle_Gentle: 'SharePoint によって調整されたため、バックグラウンド スキャンは低速で実行されています (同時実行数 {limit}/{target})。',
    Throttle_ReportWaiting: ' — SharePoint によって調整されました。{seconds} 秒待機中',
    Throttle_ReportGentle: ' — {events} 件の調整応答の後、低速で実行中 (同時実行数 {limit}/{target})',

    // ── Report ──
    Report_Title: 'レポート',
    Report_LibrariesToScan: 'スキャンするライブラリ',
    Report_SelectAll: 'すべて選択',
    Report_SelectNone: '選択解除',
    Report_RunFullScan: 'フル スキャンを実行',
    Report_Cancelling: 'キャンセルしています…',
    Report_Scanned: '{count} 個の項目をスキャンしました…{note}',
    Report_ExportButton: 'レポートのエクスポート…',
    Report_Summary: '{total} 個の項目をスキャンしました — 制限超過 {over} 個、警告レベル {warning} 個',
    Report_Empty: '上でライブラリを選択し、フル スキャンを実行してレポートを作成してください。',
    Report_ScanFailed: '"{library}" のスキャンに失敗しました: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'レポートのエクスポート',
    Export_Format: '形式',
    Export_Scope: '範囲',
    Export_Type: '種類',
    Export_Folder: 'フォルダー',
    Export_File: 'ファイル',
    Export_ColLibrary: 'ライブラリ',
    Export_ColPath: '推定 OneDrive パス',
    Export_ColLength: '長さ',
    Export_ColStatus: '状態',
    Export_SheetSummary: '概要',
    Export_SheetPaths: 'パス',
    Export_ReportTitle: 'SharePoint Smart Path Length レポート',
    Export_Generated: '生成日時',
    Export_ItemsScanned: 'スキャンした項目',
    Export_OverLimit: '制限超過',
    Export_WarningLevel: '警告レベル',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: '設定',
    Settings_SamplePathTooltip: 'OneDrive の同期ルート (例: C:\\Users\\UsernamePath\\OneDrive - Company\\)。このブラウザーにのみ保存され、他のユーザーとは共有されません。',
    Settings_ConcurrencyLabel: 'フル スキャン中の同時 API 要求数 (上限)',
    Settings_ConcurrencyTooltip: '固定値ではなく上限です。スキャンはこの値を大きく下回る数から開始し、SharePoint が処理できている間は徐々に増やします。SharePoint がスキャンを調整した場合は、一時停止し (Retry-After を考慮)、同時実行数を半分にし、その後は調整されたレベルのわずかに下まで段階的に戻しますが、そのレベルには戻しません。スキャンで引き続き調整が発生する場合は、この値を下げてください。',
    Settings_IncludeHidden: '非表示ライブラリとシステム ライブラリを含める',
    Settings_ThresholdsNote: '警告 ({warning} 文字) と制限超過 ({error} 文字) のしきい値は、このページを編集するユーザーが Web パーツのプロパティ ウィンドウ (「Web パーツの編集」→ SharePoint Smart Path Length の設定) で設定します。ここでは設定できません。'
  };
});
