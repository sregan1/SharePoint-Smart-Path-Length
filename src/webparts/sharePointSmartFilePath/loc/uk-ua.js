define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Настроювання SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Порогові значення довжини шляху',
    PropertyPane_Group_SamplePath: 'Приклад шляху OneDrive',
    PropertyPane_WarningLength_Label: 'Довжина для попередження (символів)',
    PropertyPane_ErrorLength_Label: 'Довжина для перевищення ліміту (символів)',
    PropertyPane_SamplePath_Label: 'Префікс прикладу шляху OneDrive за замовчуванням',
    PropertyPane_Validation_PositiveInteger: 'Введіть додатне ціле число.',
    PropertyPane_Validation_WarningLessThanError: 'Довжина для попередження має бути меншою за довжину для перевищення ліміту.',

    // ── Common ──
    Common_Back: 'Назад',
    Common_Cancel: 'Скасувати',
    Common_Close: 'Закрити',
    Common_Clear: 'Очистити',
    Common_Connect: 'Підключити',
    Common_Export: 'Експортувати',
    Common_LoadingLibraries: 'Завантаження бібліотек…',
    Common_SamplePathLabel: 'Префікс прикладу шляху OneDrive',

    // ── Header ──
    App_ChangeUrl: 'Змінити URL-адресу',
    App_Explorer: 'Провідник',
    App_Report: 'Звіт',
    App_Settings: 'Настройки',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Попередження',
    Status_OverLimit: 'Перевищено ліміт',
    StatusDescription_Error: 'Цей шлях досягає налаштованого ліміту або перевищує його — імовірно, він не синхронізуватиметься з OneDrive належним чином.',
    StatusDescription_Warning: 'Цей шлях наближається до налаштованого ліміту — його варто незабаром скоротити.',
    StatusDescription_Normal: 'Цей шлях значно менший за налаштований ліміт — нічого робити не потрібно.',

    // ── Scope / filters ──
    Scope_All: 'Усі шляхи',
    Scope_WarningAndOver: 'Шляхи з попередженням і ті, що перевищують ліміт',
    Scope_OverOnly: 'Лише шляхи, що перевищують ліміт',
    Filter_All: 'Усі',
    Filter_WarningAndOver: 'Попередження й перевищення',
    Filter_OverOnly: 'Лише перевищення ліміту',

    // ── Path table ──
    Table_Library: 'Бібліотека',
    Table_EstimatedPath: 'Орієнтовний шлях OneDrive',
    Table_Length: 'Довжина',
    Table_Status: 'Стан',
    Table_NoMatch: 'Немає елементів, що відповідають поточному фільтру.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Ім’я папки синхронізації бібліотеки',
    Explorer_ThresholdLegend: 'Попередження від {warning}+ символів, перевищення ліміту від {error}+ (налаштовується у властивостях редагування веб-частини)',
    Explorer_RefreshTooltip: 'Повторно перевірити всі бібліотеки в реальному часі, ігноруючи кешовані результати',
    Explorer_Refresh: 'Оновити',
    Explorer_ActivityLog: 'Журнал дій',
    Explorer_ActivityLogEmpty: 'Записів ще немає.',
    Explorer_TreeAriaLabel: 'Бібліотеки документів',
    Explorer_NoLibraries: 'На цьому сайті не знайдено бібліотек документів.',
    Explorer_SelectItemPrompt: 'Виберіть елемент у дереві, щоб побачити його орієнтовний шлях OneDrive та кількість символів.',
    Explorer_CouldntList: 'Не вдалося отримати список "{path}": {error}',
    Explorer_CouldntLoad: 'Не вдалося завантажити "{path}": {error}',
    Explorer_StatusWithChars: '{status} — {count} симв.',
    Explorer_ContainsBelowError: 'Десь нижче в цій папці є елемент, що перевищує ліміт.',
    Explorer_ContainsBelowWarning: 'Десь нижче в цій папці є елемент із рівнем попередження.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Сканування',
    Legend_ScanningTooltip: 'Фонове сканування цієї бібліотеки ще не завершено — індикатор-крапка (а не сама піктограма) може бути неостаточним.',
    Legend_IssueBelow: 'Проблема нижче',
    Legend_IssueBelowTooltip: 'Десь усередині цієї папки є елемент із попередженням або перевищенням ліміту, навіть якщо її власний шлях у нормі — розгорніть її, щоб знайти його.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Триває перевірка цієї бібліотеки на наявність проблем нижче — крапка може бути неостаточною.',
    Tree_ContainsBelowError: 'Нижче є елемент, що перевищує ліміт',
    Tree_ContainsBelowWarning: 'Нижче є елемент із рівнем попередження',
    Tree_ScanInfo: '{description} (Перевірка вкладених елементів: {source}, {age}.)',
    Tree_SourceCache: 'із кешу',
    Tree_SourceLive: 'сканування в реальному часі',
    Age_JustNow: 'щойно',
    Age_OneMinute: '1 хв тому',
    Age_Minutes: '{count} хв тому',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Префікс прикладу шляху',
    Breakdown_SyncFolder: 'Папка синхронізації бібліотеки ("{name}")',
    Breakdown_Relative: 'Відносний шлях у бібліотеці',
    Breakdown_Total: 'Усього (з роздільниками)',
    Breakdown_Chars: '{count} симв.',

    // ── Throttling notices ──
    Throttle_Paused: 'SharePoint обмежує швидкість запитів — фонове сканування призупинено на {seconds} с.',
    Throttle_Gentle: 'Фонове сканування виконується в щадному режимі (паралелізм {limit} із {target}) після обмеження швидкості запитів з боку SharePoint.',
    Throttle_ReportWaiting: ' — SharePoint обмежує швидкість запитів, очікування {seconds} с',
    Throttle_ReportGentle: ' — щадний режим (паралелізм {limit} із {target}) після відповідей про обмеження швидкості: {events}',

    // ── Report ──
    Report_Title: 'Звіт',
    Report_LibrariesToScan: 'Бібліотеки для сканування',
    Report_SelectAll: 'Вибрати все',
    Report_SelectNone: 'Скасувати вибір',
    Report_RunFullScan: 'Запустити повне сканування',
    Report_Cancelling: 'Скасування…',
    Report_Scanned: 'Проскановано елементів: {count}…{note}',
    Report_ExportButton: 'Експортувати звіт…',
    Report_Summary: 'Проскановано елементів: {total} — {over} перевищують ліміт, {warning} мають рівень попередження',
    Report_Empty: 'Виберіть бібліотеки вище та запустіть повне сканування, щоб створити звіт.',
    Report_ScanFailed: 'Не вдалося просканувати "{library}": {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Експорт звіту',
    Export_Format: 'Формат',
    Export_Scope: 'Область',
    Export_Type: 'Тип',
    Export_Folder: 'Папка',
    Export_File: 'Файл',
    Export_ColLibrary: 'Бібліотека',
    Export_ColPath: 'Орієнтовний шлях OneDrive',
    Export_ColLength: 'Довжина',
    Export_ColStatus: 'Стан',
    Export_SheetSummary: 'Підсумок',
    Export_SheetPaths: 'Шляхи',
    Export_ReportTitle: 'Звіт SharePoint Smart Path Length',
    Export_Generated: 'Створено',
    Export_ItemsScanned: 'Проскановано елементів',
    Export_OverLimit: 'Перевищено ліміт',
    Export_WarningLevel: 'Рівень попередження',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Настройки',
    Settings_SamplePathTooltip: 'Кореневий каталог синхронізації OneDrive, наприклад C:\\Users\\UsernamePath\\OneDrive - Company\\. Зберігається лише в цьому браузері й не передається іншим користувачам.',
    Settings_ConcurrencyLabel: 'Одночасні запити API під час повного сканування (верхня межа)',
    Settings_ConcurrencyTooltip: 'Це верхня межа, а не фіксована швидкість. Сканування починається значно нижче неї та поступово пришвидшується, поки SharePoint встигає. Якщо SharePoint обмежує швидкість сканування, воно призупиняється (з урахуванням Retry-After), зменшує паралелізм удвічі, а потім поступово збільшує його лише до рівня трохи нижче того, на якому було обмеження, — але ніколи до нього самого. Зменште це значення, якщо сканування все ще спричиняє обмеження.',
    Settings_IncludeHidden: 'Включати приховані та системні бібліотеки',
    Settings_ThresholdsNote: 'Порогові значення для попередження ({warning} символів) і перевищення ліміту ({error} символів) задає той, хто редагує цю сторінку, в області властивостей веб-частини ("Редагувати веб-частину" → настройки SharePoint Smart Path Length), а не тут.'
  };
});
