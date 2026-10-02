define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Настройка SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Пороговые значения длины пути',
    PropertyPane_Group_SamplePath: 'Образец пути OneDrive',
    PropertyPane_WarningLength_Label: 'Длина для предупреждения (символов)',
    PropertyPane_ErrorLength_Label: 'Длина сверх ограничения (символов)',
    PropertyPane_SamplePath_Label: 'Префикс образца пути OneDrive по умолчанию',
    PropertyPane_Validation_PositiveInteger: 'Введите положительное целое число.',
    PropertyPane_Validation_WarningLessThanError: 'Длина для предупреждения должна быть меньше длины сверх ограничения.',

    // ── Common ──
    Common_Back: 'Назад',
    Common_Cancel: 'Отмена',
    Common_Close: 'Закрыть',
    Common_Clear: 'Очистить',
    Common_Connect: 'Подключить',
    Common_Export: 'Экспорт',
    Common_LoadingLibraries: 'Загрузка библиотек…',
    Common_SamplePathLabel: 'Префикс образца пути OneDrive',

    // ── Header ──
    App_ChangeUrl: 'Изменить URL-адрес',
    App_Explorer: 'Проводник',
    App_Report: 'Отчет',
    App_Settings: 'Параметры',

    // ── Path status ──
    Status_OK: 'ОК',
    Status_Warning: 'Предупреждение',
    Status_OverLimit: 'Превышен предел',
    StatusDescription_Error: 'Этот путь достиг или превысил настроенный предел — вероятно, он не будет правильно синхронизироваться с OneDrive.',
    StatusDescription_Warning: 'Этот путь приближается к настроенному пределу — его стоит вскоре сократить.',
    StatusDescription_Normal: 'Этот путь с запасом укладывается в настроенный предел — делать ничего не нужно.',

    // ── Scope / filters ──
    Scope_All: 'Все пути',
    Scope_WarningAndOver: 'Пути с предупреждением и сверх предела',
    Scope_OverOnly: 'Только пути сверх предела',
    Filter_All: 'Все',
    Filter_WarningAndOver: 'Предупреждение и сверх предела',
    Filter_OverOnly: 'Только сверх предела',

    // ── Path table ──
    Table_Library: 'Библиотека',
    Table_EstimatedPath: 'Предполагаемый путь OneDrive',
    Table_Length: 'Длина',
    Table_Status: 'Состояние',
    Table_NoMatch: 'Нет элементов, соответствующих текущему фильтру.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Имя папки синхронизации библиотеки',
    Explorer_ThresholdLegend: 'Предупреждение при {warning}+ символов, превышение предела при {error}+ (задается в свойствах изменения веб-части)',
    Explorer_RefreshTooltip: 'Повторно проверить все библиотеки в реальном времени, игнорируя кэшированные результаты',
    Explorer_Refresh: 'Обновить',
    Explorer_ActivityLog: 'Журнал действий',
    Explorer_ActivityLogEmpty: 'Пока ничего не записано.',
    Explorer_TreeAriaLabel: 'Библиотеки документов',
    Explorer_NoLibraries: 'На этом сайте не найдено библиотек документов.',
    Explorer_SelectItemPrompt: 'Выберите элемент в дереве, чтобы увидеть предполагаемый путь OneDrive и количество символов.',
    Explorer_CouldntList: 'Не удалось получить список "{path}": {error}',
    Explorer_CouldntLoad: 'Не удалось загрузить "{path}": {error}',
    Explorer_StatusWithChars: '{status} — {count} симв.',
    Explorer_ContainsBelowError: 'Содержит элемент сверх предела где-то ниже в этой папке.',
    Explorer_ContainsBelowWarning: 'Содержит элемент с предупреждением где-то ниже в этой папке.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Сканирование',
    Legend_ScanningTooltip: 'Фоновое сканирование этой библиотеки еще не завершено — индикатор-точка (не сам значок) может быть не окончательным.',
    Legend_IssueBelow: 'Проблема ниже',
    Legend_IssueBelowTooltip: 'Эта папка содержит где-то внутри элемент с предупреждением или сверх предела, даже если ее собственный путь в порядке — разверните ее, чтобы найти нужный элемент.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Проверка этой библиотеки на наличие проблем ниже еще идет — точка может быть не окончательной.',
    Tree_ContainsBelowError: 'Ниже есть элемент сверх предела',
    Tree_ContainsBelowWarning: 'Ниже есть элемент с предупреждением',
    Tree_ScanInfo: '{description} (Проверка элементов ниже: {source}, {age}.)',
    Tree_SourceCache: 'из кэша',
    Tree_SourceLive: 'сканирование в реальном времени',
    Age_JustNow: 'только что',
    Age_OneMinute: '1 мин назад',
    Age_Minutes: '{count} мин назад',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Префикс образца пути',
    Breakdown_SyncFolder: 'Папка синхронизации библиотеки ("{name}")',
    Breakdown_Relative: 'Относительный путь в библиотеке',
    Breakdown_Total: 'Всего (с разделителями)',
    Breakdown_Chars: '{count} симв.',

    // ── Throttling notices ──
    Throttle_Paused: 'SharePoint ограничивает запросы — фоновое сканирование приостановлено на {seconds} с.',
    Throttle_Gentle: 'Фоновое сканирование выполняется в щадящем режиме (параллелизм {limit} из {target}) после ограничения запросов со стороны SharePoint.',
    Throttle_ReportWaiting: ' — SharePoint ограничивает запросы, ожидание {seconds} с',
    Throttle_ReportGentle: ' — выполняется в щадящем режиме (параллелизм {limit} из {target}) после ответов об ограничении: {events}',

    // ── Report ──
    Report_Title: 'Отчет',
    Report_LibrariesToScan: 'Библиотеки для сканирования',
    Report_SelectAll: 'Выбрать все',
    Report_SelectNone: 'Снять выделение',
    Report_RunFullScan: 'Выполнить полное сканирование',
    Report_Cancelling: 'Отмена…',
    Report_Scanned: 'Просканировано элементов: {count}…{note}',
    Report_ExportButton: 'Экспорт отчета…',
    Report_Summary: 'Просканировано элементов: {total} — сверх предела: {over}, с предупреждением: {warning}',
    Report_Empty: 'Выберите библиотеки выше и выполните полное сканирование, чтобы создать отчет.',
    Report_ScanFailed: 'Не удалось выполнить сканирование "{library}": {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Экспорт отчета',
    Export_Format: 'Формат',
    Export_Scope: 'Область',
    Export_Type: 'Тип',
    Export_Folder: 'Папка',
    Export_File: 'Файл',
    Export_ColLibrary: 'Библиотека',
    Export_ColPath: 'Предполагаемый путь OneDrive',
    Export_ColLength: 'Длина',
    Export_ColStatus: 'Состояние',
    Export_SheetSummary: 'Сводка',
    Export_SheetPaths: 'Пути',
    Export_ReportTitle: 'Отчет SharePoint Smart Path Length',
    Export_Generated: 'Создано',
    Export_ItemsScanned: 'Просканировано элементов',
    Export_OverLimit: 'Превышен предел',
    Export_WarningLevel: 'Уровень предупреждения',
    Export_OK: 'ОК',

    // ── Settings ──
    Settings_Title: 'Параметры',
    Settings_SamplePathTooltip: 'Корневая папка синхронизации OneDrive, например C:\\Users\\UsernamePath\\OneDrive - Company\\. Сохраняется только в этом браузере и не доступна другим пользователям.',
    Settings_ConcurrencyLabel: 'Одновременные запросы API при полном сканировании (верхний предел)',
    Settings_ConcurrencyTooltip: 'Это верхний предел, а не фиксированная скорость. Сканирование начинается со значения намного ниже и наращивается, пока SharePoint справляется. Если SharePoint ограничивает запросы, сканирование приостанавливается (с учетом Retry-After), вдвое уменьшает параллелизм, а затем постепенно возвращается лишь до уровня чуть ниже того, на котором произошло ограничение, но не до него самого. Уменьшите это значение, если сканирование по-прежнему вызывает ограничение запросов.',
    Settings_IncludeHidden: 'Включать скрытые и системные библиотеки',
    Settings_ThresholdsNote: 'Пороговые значения для предупреждения ({warning} символов) и превышения предела ({error} символов) задает тот, кто изменяет эту страницу, — в области свойств веб-части («Изменить веб-часть» → параметры SharePoint Smart Path Length), а не здесь.'
  };
});
