define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Configuration de SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Seuils de longueur de chemin',
    PropertyPane_Group_SamplePath: 'Exemple de chemin OneDrive',
    PropertyPane_WarningLength_Label: 'Longueur d\'avertissement (caractères)',
    PropertyPane_ErrorLength_Label: 'Longueur de dépassement (caractères)',
    PropertyPane_SamplePath_Label: 'Préfixe par défaut de l\'exemple de chemin OneDrive',
    PropertyPane_Validation_PositiveInteger: 'Entrez un nombre entier positif.',
    PropertyPane_Validation_WarningLessThanError: 'La longueur d\'avertissement doit être inférieure à la longueur de dépassement.',

    // ── Common ──
    Common_Back: 'Retour',
    Common_Cancel: 'Annuler',
    Common_Close: 'Fermer',
    Common_Clear: 'Effacer',
    Common_Connect: 'Se connecter',
    Common_Export: 'Exporter',
    Common_LoadingLibraries: 'Chargement des bibliothèques…',
    Common_SamplePathLabel: 'Préfixe de l\'exemple de chemin OneDrive',

    // ── Header ──
    App_ChangeUrl: 'Modifier l\'URL',
    App_Explorer: 'Explorateur',
    App_Report: 'Rapport',
    App_Settings: 'Paramètres',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Avertissement',
    Status_OverLimit: 'Limite dépassée',
    StatusDescription_Error: 'Ce chemin atteint ou dépasse la limite configurée : il ne sera probablement pas synchronisé correctement avec OneDrive.',
    StatusDescription_Warning: 'Ce chemin approche de la limite configurée : mieux vaut le raccourcir bientôt.',
    StatusDescription_Normal: 'Ce chemin reste largement dans la limite configurée : rien à faire ici.',

    // ── Scope / filters ──
    Scope_All: 'Tous les chemins',
    Scope_WarningAndOver: 'Chemins au niveau d\'avertissement et au-delà',
    Scope_OverOnly: 'Chemins dépassant la limite uniquement',
    Filter_All: 'Tous',
    Filter_WarningAndOver: 'Avertissement et dépassement',
    Filter_OverOnly: 'Limite dépassée uniquement',

    // ── Path table ──
    Table_Library: 'Bibliothèque',
    Table_EstimatedPath: 'Chemin OneDrive estimé',
    Table_Length: 'Longueur',
    Table_Status: 'État',
    Table_NoMatch: 'Aucun élément ne correspond au filtre actuel.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Nom du dossier de synchronisation de la bibliothèque',
    Explorer_ThresholdLegend: 'Avertissement à partir de {warning}+ caractères, limite dépassée à partir de {error}+ (défini dans les propriétés de modification du composant WebPart)',
    Explorer_RefreshTooltip: 'Revérifier toutes les bibliothèques en direct, sans tenir compte des résultats mis en cache',
    Explorer_Refresh: 'Actualiser',
    Explorer_ActivityLog: 'Journal d\'activité',
    Explorer_ActivityLogEmpty: 'Rien n\'a encore été consigné.',
    Explorer_TreeAriaLabel: 'Bibliothèques de documents',
    Explorer_NoLibraries: 'Aucune bibliothèque de documents trouvée sur ce site.',
    Explorer_SelectItemPrompt: 'Sélectionnez un élément dans l\'arborescence pour voir son chemin OneDrive estimé et son nombre de caractères.',
    Explorer_CouldntList: 'Impossible de lister « {path} » : {error}',
    Explorer_CouldntLoad: 'Impossible de charger « {path} » : {error}',
    Explorer_StatusWithChars: '{status} — {count} car.',
    Explorer_ContainsBelowError: 'Contient un élément dépassant la limite quelque part sous ce dossier.',
    Explorer_ContainsBelowWarning: 'Contient un élément au niveau d\'avertissement quelque part sous ce dossier.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Analyse en cours',
    Legend_ScanningTooltip: 'L\'analyse en arrière-plan de cette bibliothèque n\'est pas terminée : l\'indicateur en forme de point (et non l\'icône elle-même) peut ne pas être définitif.',
    Legend_IssueBelow: 'Problème en dessous',
    Legend_IssueBelowTooltip: 'Ce dossier contient quelque part un élément en avertissement ou dépassant la limite, même si son propre chemin est correct : développez-le pour trouver lequel.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Vérification des problèmes en dessous de cette bibliothèque en cours : le point peut ne pas être définitif.',
    Tree_ContainsBelowError: 'Contient en dessous un élément dépassant la limite',
    Tree_ContainsBelowWarning: 'Contient en dessous un élément au niveau d\'avertissement',
    Tree_ScanInfo: '{description} (Vérification des éléments en dessous : {source}, {age}.)',
    Tree_SourceCache: 'depuis le cache',
    Tree_SourceLive: 'analyse en direct',
    Age_JustNow: 'à l\'instant',
    Age_OneMinute: 'il y a 1 min',
    Age_Minutes: 'il y a {count} min',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Préfixe de l\'exemple de chemin',
    Breakdown_SyncFolder: 'Dossier de synchronisation de la bibliothèque (« {name} »)',
    Breakdown_Relative: 'Chemin relatif dans la bibliothèque',
    Breakdown_Total: 'Total (séparateurs inclus)',
    Breakdown_Chars: '{count} car.',

    // ── Throttling notices ──
    Throttle_Paused: 'Limitation par SharePoint : l\'analyse en arrière-plan est suspendue pendant {seconds} s.',
    Throttle_Gentle: 'L\'analyse en arrière-plan s\'exécute en douceur (simultanéité {limit} sur {target}) après une limitation par SharePoint.',
    Throttle_ReportWaiting: ' — limitation par SharePoint, attente de {seconds} s',
    Throttle_ReportGentle: ' — exécution en douceur (simultanéité {limit} sur {target}) après {events} réponse(s) de limitation',

    // ── Report ──
    Report_Title: 'Rapport',
    Report_LibrariesToScan: 'Bibliothèques à analyser',
    Report_SelectAll: 'Tout sélectionner',
    Report_SelectNone: 'Ne rien sélectionner',
    Report_RunFullScan: 'Lancer l\'analyse complète',
    Report_Cancelling: 'Annulation…',
    Report_Scanned: '{count} éléments analysés…{note}',
    Report_ExportButton: 'Exporter le rapport…',
    Report_Summary: '{total} éléments analysés — {over} au-dessus de la limite, {warning} au niveau d\'avertissement',
    Report_Empty: 'Choisissez des bibliothèques ci-dessus et lancez une analyse complète pour générer un rapport.',
    Report_ScanFailed: 'L\'analyse de « {library} » a échoué : {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Exporter le rapport',
    Export_Format: 'Format',
    Export_Scope: 'Étendue',
    Export_Type: 'Type',
    Export_Folder: 'Dossier',
    Export_File: 'Fichier',
    Export_ColLibrary: 'Bibliothèque',
    Export_ColPath: 'Chemin OneDrive estimé',
    Export_ColLength: 'Longueur',
    Export_ColStatus: 'État',
    Export_SheetSummary: 'Résumé',
    Export_SheetPaths: 'Chemins',
    Export_ReportTitle: 'Rapport SharePoint Smart Path Length',
    Export_Generated: 'Généré le',
    Export_ItemsScanned: 'Éléments analysés',
    Export_OverLimit: 'Limite dépassée',
    Export_WarningLevel: 'Niveau d\'avertissement',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Paramètres',
    Settings_SamplePathTooltip: 'Votre racine de synchronisation OneDrive, par ex. C:\\Users\\UsernamePath\\OneDrive - Company\\. Enregistré dans ce navigateur uniquement : il n\'est pas partagé avec les autres utilisateurs.',
    Settings_ConcurrencyLabel: 'Requêtes d\'API simultanées pendant une analyse complète (limite supérieure)',
    Settings_ConcurrencyTooltip: 'Une limite supérieure, pas un débit fixe. Les analyses démarrent bien en dessous et montent en charge tant que SharePoint suit. Si SharePoint limite l\'analyse, elle se met en pause (en respectant Retry-After), divise sa simultanéité par deux, puis ne remonte ensuite que jusqu\'à un niveau juste inférieur à celui qui a été limité, sans jamais l\'atteindre. Réduisez cette valeur si les analyses provoquent encore une limitation.',
    Settings_IncludeHidden: 'Inclure les bibliothèques masquées et système',
    Settings_ThresholdsNote: 'Les seuils d\'avertissement ({warning} caractères) et de dépassement de limite ({error} caractères) sont définis par la personne qui modifie cette page, dans le volet de propriétés du composant WebPart (« Modifier le composant WebPart » → paramètres SharePoint Smart Path Length), et non ici.'
  };
});
