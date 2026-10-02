define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Configuração do SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Limites de comprimento do caminho',
    PropertyPane_Group_SamplePath: 'Caminho de exemplo do OneDrive',
    PropertyPane_WarningLength_Label: 'Comprimento de aviso (caracteres)',
    PropertyPane_ErrorLength_Label: 'Comprimento acima do limite (caracteres)',
    PropertyPane_SamplePath_Label: 'Prefixo padrão do caminho de exemplo do OneDrive',
    PropertyPane_Validation_PositiveInteger: 'Insira um número inteiro positivo.',
    PropertyPane_Validation_WarningLessThanError: 'O comprimento de aviso deve ser menor que o comprimento acima do limite.',

    // ── Common ──
    Common_Back: 'Voltar',
    Common_Cancel: 'Cancelar',
    Common_Close: 'Fechar',
    Common_Clear: 'Limpar',
    Common_Connect: 'Conectar',
    Common_Export: 'Exportar',
    Common_LoadingLibraries: 'Carregando bibliotecas…',
    Common_SamplePathLabel: 'Prefixo do caminho de exemplo do OneDrive',

    // ── Header ──
    App_ChangeUrl: 'Alterar URL',
    App_Explorer: 'Explorador',
    App_Report: 'Relatório',
    App_Settings: 'Configurações',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Aviso',
    Status_OverLimit: 'Acima do limite',
    StatusDescription_Error: 'Este caminho atingiu ou ultrapassou o limite configurado — provavelmente não será sincronizado corretamente com o OneDrive.',
    StatusDescription_Warning: 'Este caminho está se aproximando do limite configurado — vale a pena encurtá-lo em breve.',
    StatusDescription_Normal: 'Este caminho está confortavelmente dentro do limite configurado — nada a fazer aqui.',

    // ── Scope / filters ──
    Scope_All: 'Todos os caminhos',
    Scope_WarningAndOver: 'Caminhos em nível de aviso e acima do limite',
    Scope_OverOnly: 'Somente caminhos acima do limite',
    Filter_All: 'Todos',
    Filter_WarningAndOver: 'Aviso e acima do limite',
    Filter_OverOnly: 'Somente acima do limite',

    // ── Path table ──
    Table_Library: 'Biblioteca',
    Table_EstimatedPath: 'Caminho estimado do OneDrive',
    Table_Length: 'Comprimento',
    Table_Status: 'Status',
    Table_NoMatch: 'Nenhum item corresponde ao filtro atual.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Nome da pasta de sincronização da biblioteca',
    Explorer_ThresholdLegend: 'Aviso a partir de {warning}+ caracteres, acima do limite a partir de {error}+ (definido nas propriedades de edição da web part)',
    Explorer_RefreshTooltip: 'Verificar novamente todas as bibliotecas ao vivo, ignorando os resultados em cache',
    Explorer_Refresh: 'Atualizar',
    Explorer_ActivityLog: 'Log de atividades',
    Explorer_ActivityLogEmpty: 'Nada registrado ainda.',
    Explorer_TreeAriaLabel: 'Bibliotecas de documentos',
    Explorer_NoLibraries: 'Nenhuma biblioteca de documentos encontrada neste site.',
    Explorer_SelectItemPrompt: 'Selecione um item na árvore para ver o caminho estimado do OneDrive e a contagem de caracteres.',
    Explorer_CouldntList: 'Não foi possível listar "{path}": {error}',
    Explorer_CouldntLoad: 'Não foi possível carregar "{path}": {error}',
    Explorer_StatusWithChars: '{status} — {count} car.',
    Explorer_ContainsBelowError: 'Contém um item acima do limite em algum lugar abaixo desta pasta.',
    Explorer_ContainsBelowWarning: 'Contém um item em nível de aviso em algum lugar abaixo desta pasta.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Verificando',
    Legend_ScanningTooltip: 'A verificação em segundo plano desta biblioteca ainda não foi concluída — o indicador de ponto (não o ícone em si) pode não ser o final.',
    Legend_IssueBelow: 'Problema abaixo',
    Legend_IssueBelowTooltip: 'Esta pasta contém um item em nível de aviso ou acima do limite em algum lugar dentro dela, mesmo que o próprio caminho esteja correto — expanda-a para encontrar qual.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Ainda verificando problemas abaixo nesta biblioteca — o ponto pode não ser o final.',
    Tree_ContainsBelowError: 'Contém um item acima do limite abaixo',
    Tree_ContainsBelowWarning: 'Contém um item em nível de aviso abaixo',
    Tree_ScanInfo: '{description} (Verificação dos itens abaixo: {source}, {age}.)',
    Tree_SourceCache: 'do cache',
    Tree_SourceLive: 'verificação ao vivo',
    Age_JustNow: 'agora mesmo',
    Age_OneMinute: 'há 1 min',
    Age_Minutes: 'há {count} min',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Prefixo do caminho de exemplo',
    Breakdown_SyncFolder: 'Pasta de sincronização da biblioteca ("{name}")',
    Breakdown_Relative: 'Caminho relativo dentro da biblioteca',
    Breakdown_Total: 'Total (incl. separadores)',
    Breakdown_Chars: '{count} car.',

    // ── Throttling notices ──
    Throttle_Paused: 'Limitado pelo SharePoint — a verificação em segundo plano está pausada por {seconds}s.',
    Throttle_Gentle: 'A verificação em segundo plano está sendo executada de forma moderada (simultaneidade {limit} de {target}) após ser limitada pelo SharePoint.',
    Throttle_ReportWaiting: ' — limitado pelo SharePoint, aguardando {seconds}s',
    Throttle_ReportGentle: ' — executando de forma moderada (simultaneidade {limit} de {target}) após {events} resposta(s) de limitação',

    // ── Report ──
    Report_Title: 'Relatório',
    Report_LibrariesToScan: 'Bibliotecas a verificar',
    Report_SelectAll: 'Selecionar tudo',
    Report_SelectNone: 'Limpar seleção',
    Report_RunFullScan: 'Executar verificação completa',
    Report_Cancelling: 'Cancelando…',
    Report_Scanned: '{count} itens verificados…{note}',
    Report_ExportButton: 'Exportar relatório…',
    Report_Summary: '{total} itens verificados — {over} acima do limite, {warning} em nível de aviso',
    Report_Empty: 'Escolha as bibliotecas acima e execute uma verificação completa para criar um relatório.',
    Report_ScanFailed: 'Falha na verificação de "{library}": {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Exportar relatório',
    Export_Format: 'Formato',
    Export_Scope: 'Escopo',
    Export_Type: 'Tipo',
    Export_Folder: 'Pasta',
    Export_File: 'Arquivo',
    Export_ColLibrary: 'Biblioteca',
    Export_ColPath: 'Caminho estimado do OneDrive',
    Export_ColLength: 'Comprimento',
    Export_ColStatus: 'Status',
    Export_SheetSummary: 'Resumo',
    Export_SheetPaths: 'Caminhos',
    Export_ReportTitle: 'Relatório do SharePoint Smart Path Length',
    Export_Generated: 'Gerado em',
    Export_ItemsScanned: 'Itens verificados',
    Export_OverLimit: 'Acima do limite',
    Export_WarningLevel: 'Nível de aviso',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Configurações',
    Settings_SamplePathTooltip: 'Sua raiz de sincronização do OneDrive, por exemplo, C:\\Users\\UsernamePath\\OneDrive - Company\\. Salvo somente neste navegador — não é compartilhado com outros usuários.',
    Settings_ConcurrencyLabel: 'Solicitações de API simultâneas durante uma verificação completa (limite superior)',
    Settings_ConcurrencyTooltip: 'Um limite superior, não uma taxa fixa. As verificações começam bem abaixo dele e aumentam enquanto o SharePoint acompanha. Se o SharePoint limitar a verificação, ela é pausada (respeitando Retry-After), reduz pela metade a simultaneidade e depois volta a subir gradualmente apenas até um pouco abaixo do nível que foi limitado — nunca até ele. Reduza este valor se as verificações ainda causarem limitação.',
    Settings_IncludeHidden: 'Incluir bibliotecas ocultas e do sistema',
    Settings_ThresholdsNote: 'Os limites de aviso ({warning} caracteres) e de excesso ({error} caracteres) são definidos por quem edita esta página — no painel de propriedades da web part ("Editar web part" → configurações do SharePoint Smart Path Length), não aqui.'
  };
});
