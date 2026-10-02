define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'SharePoint Smart Path Length 구성',
    PropertyPane_Group_Thresholds: '경로 길이 임계값',
    PropertyPane_Group_SamplePath: 'OneDrive 샘플 경로',
    PropertyPane_WarningLength_Label: '경고 길이(문자)',
    PropertyPane_ErrorLength_Label: '제한 초과 길이(문자)',
    PropertyPane_SamplePath_Label: '기본 OneDrive 샘플 경로 접두사',
    PropertyPane_Validation_PositiveInteger: '양의 정수를 입력하세요.',
    PropertyPane_Validation_WarningLessThanError: '경고 길이는 제한 초과 길이보다 작아야 합니다.',

    // ── Common ──
    Common_Back: '뒤로',
    Common_Cancel: '취소',
    Common_Close: '닫기',
    Common_Clear: '지우기',
    Common_Connect: '연결',
    Common_Export: '내보내기',
    Common_LoadingLibraries: '라이브러리를 로드하는 중...',
    Common_SamplePathLabel: 'OneDrive 샘플 경로 접두사',

    // ── Header ──
    App_ChangeUrl: 'URL 변경',
    App_Explorer: '탐색기',
    App_Report: '보고서',
    App_Settings: '설정',

    // ── Path status ──
    Status_OK: '확인',
    Status_Warning: '경고',
    Status_OverLimit: '제한 초과',
    StatusDescription_Error: '이 경로는 구성된 제한에 도달했거나 초과했습니다. OneDrive에 올바르게 동기화되지 않을 수 있습니다.',
    StatusDescription_Warning: '이 경로는 구성된 제한에 가까워지고 있습니다. 곧 줄이는 것이 좋습니다.',
    StatusDescription_Normal: '이 경로는 구성된 제한 내에 충분히 들어 있습니다. 별도로 할 작업은 없습니다.',

    // ── Scope / filters ──
    Scope_All: '모든 경로',
    Scope_WarningAndOver: '경고 수준 이상의 경로',
    Scope_OverOnly: '제한을 초과한 경로만',
    Filter_All: '모두',
    Filter_WarningAndOver: '경고 및 초과',
    Filter_OverOnly: '제한 초과만',

    // ── Path table ──
    Table_Library: '라이브러리',
    Table_EstimatedPath: '예상 OneDrive 경로',
    Table_Length: '길이',
    Table_Status: '상태',
    Table_NoMatch: '현재 필터와 일치하는 항목이 없습니다.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: '라이브러리 동기화 폴더 이름',
    Explorer_ThresholdLegend: '{warning}+자에서 경고, {error}+자에서 제한 초과(웹 파트의 편집 속성에서 설정)',
    Explorer_RefreshTooltip: '캐시된 결과를 무시하고 모든 라이브러리를 실시간으로 다시 확인합니다',
    Explorer_Refresh: '새로 고침',
    Explorer_ActivityLog: '활동 로그',
    Explorer_ActivityLogEmpty: '아직 기록된 내용이 없습니다.',
    Explorer_TreeAriaLabel: '문서 라이브러리',
    Explorer_NoLibraries: '이 사이트에서 문서 라이브러리를 찾을 수 없습니다.',
    Explorer_SelectItemPrompt: '트리에서 항목을 선택하면 예상 OneDrive 경로와 문자 수가 표시됩니다.',
    Explorer_CouldntList: '"{path}"을(를) 나열할 수 없습니다. {error}',
    Explorer_CouldntLoad: '"{path}"을(를) 로드할 수 없습니다. {error}',
    Explorer_StatusWithChars: '{status} — {count}자',
    Explorer_ContainsBelowError: '이 폴더 아래 어딘가에 제한을 초과한 항목이 있습니다.',
    Explorer_ContainsBelowWarning: '이 폴더 아래 어딘가에 경고 수준의 항목이 있습니다.',

    // ── Explorer: icon legend ──
    Legend_Scanning: '검색 중',
    Legend_ScanningTooltip: '이 라이브러리의 백그라운드 검사가 아직 완료되지 않았습니다. 점 표시기(아이콘 자체가 아님)는 최종 상태가 아닐 수 있습니다.',
    Legend_IssueBelow: '하위 문제',
    Legend_IssueBelowTooltip: '이 폴더 자체의 경로는 문제가 없더라도 내부 어딘가에 경고 수준 또는 제한 초과 항목이 있습니다. 폴더를 펼쳐 해당 항목을 찾으세요.',

    // ── Explorer: tree ──
    Tree_StillChecking: '이 라이브러리의 하위 문제를 아직 확인하는 중입니다. 점 표시는 최종 상태가 아닐 수 있습니다.',
    Tree_ContainsBelowError: '아래에 제한을 초과한 항목이 있음',
    Tree_ContainsBelowWarning: '아래에 경고 수준의 항목이 있음',
    Tree_ScanInfo: '{description} (하위 항목 검사: {source}, {age}.)',
    Tree_SourceCache: '캐시에서',
    Tree_SourceLive: '실시간 검사',
    Age_JustNow: '방금',
    Age_OneMinute: '1분 전',
    Age_Minutes: '{count}분 전',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: '샘플 경로 접두사',
    Breakdown_SyncFolder: '라이브러리 동기화 폴더("{name}")',
    Breakdown_Relative: '라이브러리 내 상대 경로',
    Breakdown_Total: '합계(구분 기호 포함)',
    Breakdown_Chars: '{count}자',

    // ── Throttling notices ──
    Throttle_Paused: 'SharePoint에 의해 제한되었습니다. 백그라운드 검사가 {seconds}초 동안 일시 중지됩니다.',
    Throttle_Gentle: 'SharePoint에 의해 제한된 후 백그라운드 검사가 느린 속도로 실행되고 있습니다(동시성 {limit}/{target}).',
    Throttle_ReportWaiting: ' — SharePoint에 의해 제한됨, {seconds}초 대기 중',
    Throttle_ReportGentle: ' — 제한 응답 {events}건 후 느린 속도로 실행 중(동시성 {limit}/{target})',

    // ── Report ──
    Report_Title: '보고서',
    Report_LibrariesToScan: '검사할 라이브러리',
    Report_SelectAll: '모두 선택',
    Report_SelectNone: '선택 안 함',
    Report_RunFullScan: '전체 검사 실행',
    Report_Cancelling: '취소하는 중...',
    Report_Scanned: '항목 {count}개 검사함...{note}',
    Report_ExportButton: '보고서 내보내기...',
    Report_Summary: '항목 {total}개 검사함 — 제한 초과 {over}개, 경고 수준 {warning}개',
    Report_Empty: '위에서 라이브러리를 선택하고 전체 검사를 실행하여 보고서를 작성하세요.',
    Report_ScanFailed: '"{library}" 검사 실패: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: '보고서 내보내기',
    Export_Format: '형식',
    Export_Scope: '범위',
    Export_Type: '유형',
    Export_Folder: '폴더',
    Export_File: '파일',
    Export_ColLibrary: '라이브러리',
    Export_ColPath: '예상 OneDrive 경로',
    Export_ColLength: '길이',
    Export_ColStatus: '상태',
    Export_SheetSummary: '요약',
    Export_SheetPaths: '경로',
    Export_ReportTitle: 'SharePoint Smart Path Length 보고서',
    Export_Generated: '생성 시간',
    Export_ItemsScanned: '검사한 항목',
    Export_OverLimit: '제한 초과',
    Export_WarningLevel: '경고 수준',
    Export_OK: '확인',

    // ── Settings ──
    Settings_Title: '설정',
    Settings_SamplePathTooltip: 'OneDrive 동기화 루트입니다(예: C:\\Users\\UsernamePath\\OneDrive - Company\\). 이 브라우저에만 저장되며 다른 사용자와 공유되지 않습니다.',
    Settings_ConcurrencyLabel: '전체 검사 중 동시 API 요청 수(상한)',
    Settings_ConcurrencyTooltip: '고정 속도가 아닌 상한입니다. 검사는 이 값보다 훨씬 낮은 수준에서 시작하며 SharePoint가 감당하는 동안 점차 늘어납니다. SharePoint가 검사를 제한하면 검사가 일시 중지되고(Retry-After 준수) 동시성이 절반으로 줄어들며, 이후 제한이 발생했던 수준 바로 아래까지만 서서히 올라가고 그 수준까지는 올라가지 않습니다. 검사로 인해 계속 제한이 발생하면 이 값을 낮추세요.',
    Settings_IncludeHidden: '숨겨진 라이브러리 및 시스템 라이브러리 포함',
    Settings_ThresholdsNote: '경고({warning}자) 및 제한 초과({error}자) 임계값은 이 페이지를 편집하는 사용자가 웹 파트의 속성 창("웹 파트 편집" → SharePoint Smart Path Length 설정)에서 설정하며, 여기에서는 설정할 수 없습니다.'
  };
});
