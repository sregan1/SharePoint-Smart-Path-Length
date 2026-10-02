define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Configuração do SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Limites de comprimento do caminho',
    PropertyPane_Group_SamplePath: 'Caminho de exemplo do OneDrive',
    PropertyPane_WarningLength_Label: 'Comprimento de aviso (carateres)',
    PropertyPane_ErrorLength_Label: 'Comprimento acima do limite (carateres)',
    PropertyPane_SamplePath_Label: 'Prefixo predefinido do caminho de exemplo do OneDrive',
    PropertyPane_Validation_PositiveInteger: 'Introduza um número inteiro positivo.',
    PropertyPane_Validation_WarningLessThanError: 'O comprimento de aviso tem de ser inferior ao comprimento acima do limite.',

    // ── Common ──
    Common_Back: 'Voltar',
    Common_Cancel: 'Cancelar',
    Common_Close: 'Fechar',
    Common_Clear: 'Limpar',
    Common_Connect: 'Ligar',
    Common_Export: 'Exportar',
    Common_LoadingLibraries: 'A carregar bibliotecas…',
    Common_SamplePathLabel: 'Prefixo do caminho de exemplo do OneDrive',

    // ── Header ──
    App_ChangeUrl: 'Alterar URL',
    App_Explorer: 'Explorador',
    App_Report: 'Relatório',
    App_Settings: 'Definições',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Aviso',
    Status_OverLimit: 'Acima do limite',
    StatusDescription_Error: 'Este caminho atingiu ou excedeu o limite configurado — provavelmente não será sincronizado corretamente com o OneDrive.',
    StatusDescription_Warning: 'Este caminho está a aproximar-se do limite configurado — convém encurtá-lo em breve.',
    StatusDescription_Normal: 'Este caminho está confortavelmente dentro do limite configurado — não é necessário fazer nada.',

    // ── Scope / filters ──
    Scope_All: 'Todos os caminhos',
    Scope_WarningAndOver: 'Caminhos em nível de aviso e acima do limite',
    Scope_OverOnly: 'Apenas caminhos acima do limite',
    Filter_All: 'Todos',
    Filter_WarningAndOver: 'Aviso e acima do limite',
    Filter_OverOnly: 'Apenas acima do limite',

    // ── Path table ──
    Table_Library: 'Biblioteca',
    Table_EstimatedPath: 'Caminho estimado do OneDrive',
    Table_Length: 'Comprimento',
    Table_Status: 'Estado',
    Table_NoMatch: 'Nenhum item corresponde ao filtro atual.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Nome da pasta de sincronização da biblioteca',
    Explorer_ThresholdLegend: 'Aviso a partir de {warning}+ carateres, acima do limite a partir de {error}+ (definido nas propriedades de edição da web part)',
    Explorer_RefreshTooltip: 'Voltar a verificar todas as bibliotecas em direto, ignorando os resultados em cache',
    Explorer_Refresh: 'Atualizar',
    Explorer_ActivityLog: 'Registo de atividade',
    Explorer_ActivityLogEmpty: 'Ainda nada registado.',
    Explorer_TreeAriaLabel: 'Bibliotecas de documentos',
    Explorer_NoLibraries: 'Não foram encontradas bibliotecas de documentos neste site.',
    Explorer_SelectItemPrompt: 'Selecione um item na árvore para ver o caminho estimado do OneDrive e o número de carateres.',
    Explorer_CouldntList: 'Não foi possível listar "{path}": {error}',
    Explorer_CouldntLoad: 'Não foi possível carregar "{path}": {error}',
    Explorer_StatusWithChars: '{status} — {count} car.',
    Explorer_ContainsBelowError: 'Contém um item acima do limite algures abaixo desta pasta.',
    Explorer_ContainsBelowWarning: 'Contém um item em nível de aviso algures abaixo desta pasta.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'A verificar',
    Legend_ScanningTooltip: 'A verificação em segundo plano desta biblioteca ainda não terminou — o indicador de ponto (não o ícone em si) poderá não ser o final.',
    Legend_IssueBelow: 'Problema abaixo',
    Legend_IssueBelowTooltip: 'Esta pasta contém um item em nível de aviso ou acima do limite algures no seu interior, mesmo que o seu próprio caminho esteja correto — expanda-a para descobrir qual.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Ainda a verificar problemas abaixo nesta biblioteca — o ponto poderá não ser o final.',
    Tree_ContainsBelowError: 'Contém um item acima do limite abaixo',
    Tree_ContainsBelowWarning: 'Contém um item em nível de aviso abaixo',
    Tree_ScanInfo: '{description} (Verificação dos itens abaixo: {source}, {age}.)',
    Tree_SourceCache: 'da cache',
    Tree_SourceLive: 'verificação em direto',
    Age_JustNow: 'agora mesmo',
    Age_OneMinute: 'há 1 min',
    Age_Minutes: 'há {count} min',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Prefixo do caminho de exemplo',
    Breakdown_SyncFolder: 'Pasta de sincronização da biblioteca ("{name}")',
    Breakdown_Relative: 'Caminho relativo na biblioteca',
    Breakdown_Total: 'Total (incl. separadores)',
    Breakdown_Chars: '{count} car.',

    // ── Throttling notices ──
    Throttle_Paused: 'Limitado pelo SharePoint — a verificação em segundo plano está em pausa durante {seconds}s.',
    Throttle_Gentle: 'A verificação em segundo plano está a decorrer de forma moderada (simultaneidade {limit} de {target}) após ter sido limitada pelo SharePoint.',
    Throttle_ReportWaiting: ' — limitado pelo SharePoint, a aguardar {seconds}s',
    Throttle_ReportGentle: ' — a decorrer de forma moderada (simultaneidade {limit} de {target}) após {events} resposta(s) de limitação',

    // ── Report ──
    Report_Title: 'Relatório',
    Report_LibrariesToScan: 'Bibliotecas a verificar',
    Report_SelectAll: 'Selecionar tudo',
    Report_SelectNone: 'Não selecionar nenhuma',
    Report_RunFullScan: 'Executar verificação completa',
    Report_Cancelling: 'A cancelar…',
    Report_Scanned: '{count} itens verificados…{note}',
    Report_ExportButton: 'Exportar relatório…',
    Report_Summary: '{total} itens verificados — {over} acima do limite, {warning} em nível de aviso',
    Report_Empty: 'Escolha as bibliotecas acima e execute uma verificação completa para criar um relatório.',
    Report_ScanFailed: 'Falha na verificação de "{library}": {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Exportar relatório',
    Export_Format: 'Formato',
    Export_Scope: 'Âmbito',
    Export_Type: 'Tipo',
    Export_Folder: 'Pasta',
    Export_File: 'Ficheiro',
    Export_ColLibrary: 'Biblioteca',
    Export_ColPath: 'Caminho estimado do OneDrive',
    Export_ColLength: 'Comprimento',
    Export_ColStatus: 'Estado',
    Export_SheetSummary: 'Resumo',
    Export_SheetPaths: 'Caminhos',
    Export_ReportTitle: 'Relatório do SharePoint Smart Path Length',
    Export_Generated: 'Gerado em',
    Export_ItemsScanned: 'Itens verificados',
    Export_OverLimit: 'Acima do limite',
    Export_WarningLevel: 'Nível de aviso',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Definições',
    Settings_SamplePathTooltip: 'A raiz de sincronização do seu OneDrive, por exemplo, C:\\Users\\UsernamePath\\OneDrive - Company\\. Guardado apenas neste browser — não é partilhado com outros utilizadores.',
    Settings_ConcurrencyLabel: 'Pedidos de API em simultâneo durante uma verificação completa (limite máximo)',
    Settings_ConcurrencyTooltip: 'Um limite máximo, não um débito fixo. As verificações começam bastante abaixo deste valor e aumentam enquanto o SharePoint acompanhar. Se o SharePoint limitar a verificação, esta é colocada em pausa (respeitando Retry-After), reduz para metade a simultaneidade e, depois, volta a subir gradualmente apenas até pouco abaixo do nível que foi limitado — nunca até esse nível. Reduza este valor se as verificações continuarem a causar limitação.',
    Settings_IncludeHidden: 'Incluir bibliotecas ocultas e do sistema',
    Settings_ThresholdsNote: 'Os limites de aviso ({warning} carateres) e de excesso ({error} carateres) são definidos por quem edita esta página — no painel de propriedades da web part ("Editar web part" → definições do SharePoint Smart Path Length), não aqui.'
  };
});
