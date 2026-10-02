define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Configuración de SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Umbrales de longitud de ruta',
    PropertyPane_Group_SamplePath: 'Ruta de ejemplo de OneDrive',
    PropertyPane_WarningLength_Label: 'Longitud de advertencia (caracteres)',
    PropertyPane_ErrorLength_Label: 'Longitud por encima del límite (caracteres)',
    PropertyPane_SamplePath_Label: 'Prefijo predeterminado de la ruta de ejemplo de OneDrive',
    PropertyPane_Validation_PositiveInteger: 'Escriba un número entero positivo.',
    PropertyPane_Validation_WarningLessThanError: 'La longitud de advertencia debe ser menor que la longitud por encima del límite.',

    // ── Common ──
    Common_Back: 'Atrás',
    Common_Cancel: 'Cancelar',
    Common_Close: 'Cerrar',
    Common_Clear: 'Borrar',
    Common_Connect: 'Conectar',
    Common_Export: 'Exportar',
    Common_LoadingLibraries: 'Cargando bibliotecas…',
    Common_SamplePathLabel: 'Prefijo de la ruta de ejemplo de OneDrive',

    // ── Header ──
    App_ChangeUrl: 'Cambiar URL',
    App_Explorer: 'Explorador',
    App_Report: 'Informe',
    App_Settings: 'Configuración',

    // ── Path status ──
    Status_OK: 'Correcto',
    Status_Warning: 'Advertencia',
    Status_OverLimit: 'Por encima del límite',
    StatusDescription_Error: "Esta ruta alcanza o supera el límite configurado; es probable que no se sincronice correctamente con OneDrive.",
    StatusDescription_Warning: 'Esta ruta se acerca al límite configurado; conviene acortarla pronto.',
    StatusDescription_Normal: 'Esta ruta está cómodamente dentro del límite configurado; no es necesario hacer nada.',

    // ── Scope / filters ──
    Scope_All: 'Todas las rutas',
    Scope_WarningAndOver: 'Rutas en nivel de advertencia y superiores',
    Scope_OverOnly: 'Solo rutas por encima del límite',
    Filter_All: 'Todas',
    Filter_WarningAndOver: 'Advertencia y superiores',
    Filter_OverOnly: 'Solo por encima del límite',

    // ── Path table ──
    Table_Library: 'Biblioteca',
    Table_EstimatedPath: 'Ruta de OneDrive estimada',
    Table_Length: 'Longitud',
    Table_Status: 'Estado',
    Table_NoMatch: 'Ningún elemento coincide con el filtro actual.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Nombre de la carpeta de sincronización de la biblioteca',
    Explorer_ThresholdLegend: "Advertencia a partir de {warning}+ caracteres, por encima del límite a partir de {error}+ (se establece en las propiedades de edición de la parte web)",
    Explorer_RefreshTooltip: 'Volver a comprobar todas las bibliotecas en vivo, omitiendo los resultados almacenados en caché',
    Explorer_Refresh: 'Actualizar',
    Explorer_ActivityLog: 'Registro de actividad',
    Explorer_ActivityLogEmpty: 'Todavía no se ha registrado nada.',
    Explorer_TreeAriaLabel: 'Bibliotecas de documentos',
    Explorer_NoLibraries: 'No se encontraron bibliotecas de documentos en este sitio.',
    Explorer_SelectItemPrompt: 'Seleccione un elemento del árbol para ver su ruta de OneDrive estimada y su número de caracteres.',
    Explorer_CouldntList: 'No se pudo enumerar "{path}": {error}',
    Explorer_CouldntLoad: 'No se pudo cargar "{path}": {error}',
    Explorer_StatusWithChars: '{status}: {count} car.',
    Explorer_ContainsBelowError: 'Contiene un elemento por encima del límite en algún lugar de esta carpeta.',
    Explorer_ContainsBelowWarning: 'Contiene un elemento en nivel de advertencia en algún lugar de esta carpeta.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Examinando',
    Legend_ScanningTooltip: "El examen en segundo plano de esta biblioteca aún no ha terminado; es posible que el indicador de punto (no el icono en sí) todavía no sea definitivo.",
    Legend_IssueBelow: 'Problema debajo',
    Legend_IssueBelowTooltip: 'Esta carpeta contiene en su interior un elemento en nivel de advertencia o por encima del límite, aunque su propia ruta sea correcta; expándala para encontrar cuál.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Todavía se están buscando problemas debajo de esta biblioteca; es posible que el punto aún no sea definitivo.',
    Tree_ContainsBelowError: 'Contiene debajo un elemento por encima del límite',
    Tree_ContainsBelowWarning: 'Contiene debajo un elemento en nivel de advertencia',
    Tree_ScanInfo: '{description} (Comprobación de elementos inferiores: {source}, {age}.)',
    Tree_SourceCache: 'de la caché',
    Tree_SourceLive: 'examen en vivo',
    Age_JustNow: 'ahora mismo',
    Age_OneMinute: 'hace 1 min',
    Age_Minutes: 'hace {count} min',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Prefijo de la ruta de ejemplo',
    Breakdown_SyncFolder: 'Carpeta de sincronización de la biblioteca ("{name}")',
    Breakdown_Relative: 'Ruta relativa dentro de la biblioteca',
    Breakdown_Total: 'Total (incl. separadores)',
    Breakdown_Chars: '{count} car.',

    // ── Throttling notices ──
    Throttle_Paused: 'SharePoint ha limitado la velocidad: el examen en segundo plano está en pausa durante {seconds} s.',
    Throttle_Gentle: 'El examen en segundo plano se está ejecutando de forma moderada (simultaneidad {limit} de {target}) después de que SharePoint limitara la velocidad.',
    Throttle_ReportWaiting: ': SharePoint ha limitado la velocidad, esperando {seconds} s',
    Throttle_ReportGentle: ': se ejecuta de forma moderada (simultaneidad {limit} de {target}) tras {events} respuesta(s) de limitación',

    // ── Report ──
    Report_Title: 'Informe',
    Report_LibrariesToScan: 'Bibliotecas que examinar',
    Report_SelectAll: 'Seleccionar todo',
    Report_SelectNone: 'No seleccionar nada',
    Report_RunFullScan: 'Ejecutar examen completo',
    Report_Cancelling: 'Cancelando…',
    Report_Scanned: '{count} elementos examinados…{note}',
    Report_ExportButton: 'Exportar informe…',
    Report_Summary: '{total} elementos examinados: {over} por encima del límite, {warning} en nivel de advertencia',
    Report_Empty: 'Elija bibliotecas arriba y ejecute un examen completo para generar un informe.',
    Report_ScanFailed: 'Error al examinar "{library}": {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Exportar informe',
    Export_Format: 'Formato',
    Export_Scope: 'Ámbito',
    Export_Type: 'Tipo',
    Export_Folder: 'Carpeta',
    Export_File: 'Archivo',
    Export_ColLibrary: 'Biblioteca',
    Export_ColPath: 'Ruta de OneDrive estimada',
    Export_ColLength: 'Longitud',
    Export_ColStatus: 'Estado',
    Export_SheetSummary: 'Resumen',
    Export_SheetPaths: 'Rutas',
    Export_ReportTitle: 'Informe de SharePoint Smart Path Length',
    Export_Generated: 'Generado',
    Export_ItemsScanned: 'Elementos examinados',
    Export_OverLimit: 'Por encima del límite',
    Export_WarningLevel: 'Nivel de advertencia',
    Export_OK: 'Correcto',

    // ── Settings ──
    Settings_Title: 'Configuración',
    Settings_SamplePathTooltip: "La raíz de sincronización de OneDrive, por ejemplo, C:\\Users\\UsernamePath\\OneDrive - Company\\. Se guarda solo en este explorador; no se comparte con otros usuarios.",
    Settings_ConcurrencyLabel: 'Solicitudes de API simultáneas durante un examen completo (límite superior)',
    Settings_ConcurrencyTooltip: 'Es un límite superior, no una velocidad fija. Los exámenes comienzan muy por debajo de este valor y aceleran mientras SharePoint pueda seguir el ritmo. Si SharePoint limita la velocidad del examen, este se pone en pausa (respetando Retry-After), reduce a la mitad su simultaneidad y después aumenta de nuevo solo hasta un poco por debajo del nivel en el que se limitó, nunca hasta ese nivel. Reduzca este valor si los exámenes siguen provocando limitación.',
    Settings_IncludeHidden: 'Incluir bibliotecas ocultas y del sistema',
    Settings_ThresholdsNote: 'Los umbrales de advertencia ({warning} caracteres) y de superación del límite ({error} caracteres) los establece quien edita esta página, desde el panel de propiedades de la parte web ("Editar parte web" → configuración de SharePoint Smart Path Length), no aquí.'
  };
});
