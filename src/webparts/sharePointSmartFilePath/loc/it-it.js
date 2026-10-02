define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Configurazione di SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Soglie di lunghezza del percorso',
    PropertyPane_Group_SamplePath: 'Percorso di esempio di OneDrive',
    PropertyPane_WarningLength_Label: 'Lunghezza di avviso (caratteri)',
    PropertyPane_ErrorLength_Label: 'Lunghezza oltre il limite (caratteri)',
    PropertyPane_SamplePath_Label: 'Prefisso predefinito del percorso di esempio di OneDrive',
    PropertyPane_Validation_PositiveInteger: 'Immettere un numero intero positivo.',
    PropertyPane_Validation_WarningLessThanError: 'La lunghezza di avviso deve essere minore della lunghezza oltre il limite.',

    // ── Common ──
    Common_Back: 'Indietro',
    Common_Cancel: 'Annulla',
    Common_Close: 'Chiudi',
    Common_Clear: 'Cancella',
    Common_Connect: 'Connetti',
    Common_Export: 'Esporta',
    Common_LoadingLibraries: 'Caricamento delle raccolte in corso…',
    Common_SamplePathLabel: 'Prefisso del percorso di esempio di OneDrive',

    // ── Header ──
    App_ChangeUrl: 'Cambia URL',
    App_Explorer: 'Esplora',
    App_Report: 'Report',
    App_Settings: 'Impostazioni',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Avviso',
    Status_OverLimit: 'Oltre il limite',
    StatusDescription_Error: 'Questo percorso ha raggiunto o superato il limite configurato: probabilmente non verrà sincronizzato correttamente con OneDrive.',
    StatusDescription_Warning: 'Questo percorso si sta avvicinando al limite configurato: conviene accorciarlo presto.',
    StatusDescription_Normal: 'Questo percorso rientra ampiamente nel limite configurato: non è necessaria alcuna azione.',

    // ── Scope / filters ──
    Scope_All: 'Tutti i percorsi',
    Scope_WarningAndOver: 'Percorsi a livello di avviso e oltre il limite',
    Scope_OverOnly: 'Solo percorsi oltre il limite',
    Filter_All: 'Tutti',
    Filter_WarningAndOver: 'Avviso e oltre il limite',
    Filter_OverOnly: 'Solo oltre il limite',

    // ── Path table ──
    Table_Library: 'Raccolta',
    Table_EstimatedPath: 'Percorso OneDrive stimato',
    Table_Length: 'Lunghezza',
    Table_Status: 'Stato',
    Table_NoMatch: 'Nessun elemento corrisponde al filtro corrente.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Nome della cartella di sincronizzazione della raccolta',
    Explorer_ThresholdLegend: 'Avviso a {warning}+ caratteri, oltre il limite a {error}+ (impostato nelle proprietà di modifica della web part)',
    Explorer_RefreshTooltip: 'Ricontrolla ogni raccolta in tempo reale, ignorando i risultati memorizzati nella cache',
    Explorer_Refresh: 'Aggiorna',
    Explorer_ActivityLog: 'Registro attività',
    Explorer_ActivityLogEmpty: 'Nessuna voce registrata.',
    Explorer_TreeAriaLabel: 'Raccolte documenti',
    Explorer_NoLibraries: 'Nessuna raccolta documenti trovata in questo sito.',
    Explorer_SelectItemPrompt: 'Selezionare un elemento nella struttura ad albero per visualizzare il percorso OneDrive stimato e il numero di caratteri.',
    Explorer_CouldntList: 'Impossibile elencare "{path}": {error}',
    Explorer_CouldntLoad: 'Impossibile caricare "{path}": {error}',
    Explorer_StatusWithChars: '{status} — {count} car.',
    Explorer_ContainsBelowError: 'Contiene un elemento oltre il limite in un punto sotto questa cartella.',
    Explorer_ContainsBelowWarning: 'Contiene un elemento a livello di avviso in un punto sotto questa cartella.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Analisi in corso',
    Legend_ScanningTooltip: 'L\'analisi in background di questa raccolta non è ancora terminata: l\'indicatore a punto (non l\'icona stessa) potrebbe non essere definitivo.',
    Legend_IssueBelow: 'Problema sottostante',
    Legend_IssueBelowTooltip: 'Questa cartella contiene un elemento a livello di avviso o oltre il limite al suo interno, anche se il suo percorso è corretto: espanderla per individuarlo.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Verifica dei problemi sottostanti in questa raccolta ancora in corso: il punto potrebbe non essere ancora definitivo.',
    Tree_ContainsBelowError: 'Contiene sotto un elemento oltre il limite',
    Tree_ContainsBelowWarning: 'Contiene sotto un elemento a livello di avviso',
    Tree_ScanInfo: '{description} (Verifica degli elementi sottostanti: {source}, {age}.)',
    Tree_SourceCache: 'dalla cache',
    Tree_SourceLive: 'analisi in tempo reale',
    Age_JustNow: 'adesso',
    Age_OneMinute: '1 min fa',
    Age_Minutes: '{count} min fa',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Prefisso del percorso di esempio',
    Breakdown_SyncFolder: 'Cartella di sincronizzazione della raccolta ("{name}")',
    Breakdown_Relative: 'Percorso relativo nella raccolta',
    Breakdown_Total: 'Totale (inclusi i separatori)',
    Breakdown_Chars: '{count} car.',

    // ── Throttling notices ──
    Throttle_Paused: 'Limitazione da parte di SharePoint: l\'analisi in background è sospesa per {seconds} s.',
    Throttle_Gentle: 'L\'analisi in background è in esecuzione a ritmo ridotto (concorrenza {limit} di {target}) dopo la limitazione da parte di SharePoint.',
    Throttle_ReportWaiting: ' — limitazione da parte di SharePoint, attesa di {seconds} s',
    Throttle_ReportGentle: ' — esecuzione a ritmo ridotto (concorrenza {limit} di {target}) dopo {events} risposte di limitazione',

    // ── Report ──
    Report_Title: 'Report',
    Report_LibrariesToScan: 'Raccolte da analizzare',
    Report_SelectAll: 'Seleziona tutto',
    Report_SelectNone: 'Deseleziona tutto',
    Report_RunFullScan: 'Esegui analisi completa',
    Report_Cancelling: 'Annullamento in corso…',
    Report_Scanned: '{count} elementi analizzati…{note}',
    Report_ExportButton: 'Esporta report…',
    Report_Summary: '{total} elementi analizzati: {over} oltre il limite, {warning} a livello di avviso',
    Report_Empty: 'Scegliere le raccolte sopra ed eseguire un\'analisi completa per creare un report.',
    Report_ScanFailed: 'Analisi di "{library}" non riuscita: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Esporta report',
    Export_Format: 'Formato',
    Export_Scope: 'Ambito',
    Export_Type: 'Tipo',
    Export_Folder: 'Cartella',
    Export_File: 'File',
    Export_ColLibrary: 'Raccolta',
    Export_ColPath: 'Percorso OneDrive stimato',
    Export_ColLength: 'Lunghezza',
    Export_ColStatus: 'Stato',
    Export_SheetSummary: 'Riepilogo',
    Export_SheetPaths: 'Percorsi',
    Export_ReportTitle: 'Report di SharePoint Smart Path Length',
    Export_Generated: 'Generato il',
    Export_ItemsScanned: 'Elementi analizzati',
    Export_OverLimit: 'Oltre il limite',
    Export_WarningLevel: 'Livello di avviso',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Impostazioni',
    Settings_SamplePathTooltip: 'La radice di sincronizzazione di OneDrive, ad esempio C:\\Users\\UsernamePath\\OneDrive - Company\\. Salvata solo in questo browser: non viene condivisa con altri utenti.',
    Settings_ConcurrencyLabel: 'Richieste API simultanee durante un\'analisi completa (limite massimo)',
    Settings_ConcurrencyTooltip: 'Un limite massimo, non una frequenza fissa. Le analisi partono molto al di sotto di questo valore e aumentano finché SharePoint riesce a tenere il passo. Se SharePoint limita l\'analisi, questa viene sospesa (rispettando Retry-After), dimezza la concorrenza e in seguito risale solo fino a poco sotto il livello che ha causato la limitazione, senza mai raggiungerlo. Ridurre questo valore se le analisi causano ancora limitazioni.',
    Settings_IncludeHidden: 'Includi raccolte nascoste e di sistema',
    Settings_ThresholdsNote: 'Le soglie di avviso ({warning} caratteri) e di superamento del limite ({error} caratteri) sono impostate da chi modifica questa pagina, dal riquadro delle proprietà della web part ("Modifica web part" → impostazioni di SharePoint Smart Path Length), non qui.'
  };
});
