define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'Διαμόρφωση του SharePoint Smart Path Length',
    PropertyPane_Group_Thresholds: 'Όρια μήκους διαδρομής',
    PropertyPane_Group_SamplePath: 'Δείγμα διαδρομής OneDrive',
    PropertyPane_WarningLength_Label: 'Μήκος προειδοποίησης (χαρακτήρες)',
    PropertyPane_ErrorLength_Label: 'Μήκος υπέρβασης ορίου (χαρακτήρες)',
    PropertyPane_SamplePath_Label: 'Προεπιλεγμένο πρόθεμα δείγματος διαδρομής OneDrive',
    PropertyPane_Validation_PositiveInteger: 'Εισαγάγετε έναν θετικό ακέραιο αριθμό.',
    PropertyPane_Validation_WarningLessThanError: 'Το μήκος προειδοποίησης πρέπει να είναι μικρότερο από το μήκος υπέρβασης ορίου.',

    // ── Common ──
    Common_Back: 'Πίσω',
    Common_Cancel: 'Άκυρο',
    Common_Close: 'Κλείσιμο',
    Common_Clear: 'Απαλοιφή',
    Common_Connect: 'Σύνδεση',
    Common_Export: 'Εξαγωγή',
    Common_LoadingLibraries: 'Φόρτωση βιβλιοθηκών…',
    Common_SamplePathLabel: 'Πρόθεμα δείγματος διαδρομής OneDrive',

    // ── Header ──
    App_ChangeUrl: 'Αλλαγή URL',
    App_Explorer: 'Εξερεύνηση',
    App_Report: 'Αναφορά',
    App_Settings: 'Ρυθμίσεις',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Προειδοποίηση',
    Status_OverLimit: 'Πάνω από το όριο',
    StatusDescription_Error: "Αυτή η διαδρομή φτάνει ή υπερβαίνει το διαμορφωμένο όριο — είναι πιθανό να μην συγχρονιστεί σωστά με το OneDrive.",
    StatusDescription_Warning: 'Αυτή η διαδρομή πλησιάζει το διαμορφωμένο όριο — αξίζει να συντομευτεί σύντομα.',
    StatusDescription_Normal: 'Αυτή η διαδρομή βρίσκεται άνετα εντός του διαμορφωμένου ορίου — δεν χρειάζεται καμία ενέργεια.',

    // ── Scope / filters ──
    Scope_All: 'Όλες οι διαδρομές',
    Scope_WarningAndOver: 'Διαδρομές σε επίπεδο προειδοποίησης και πάνω',
    Scope_OverOnly: 'Μόνο διαδρομές πάνω από το όριο',
    Filter_All: 'Όλα',
    Filter_WarningAndOver: 'Προειδοποίηση και πάνω',
    Filter_OverOnly: 'Μόνο πάνω από το όριο',

    // ── Path table ──
    Table_Library: 'Βιβλιοθήκη',
    Table_EstimatedPath: 'Εκτιμώμενη διαδρομή OneDrive',
    Table_Length: 'Μήκος',
    Table_Status: 'Κατάσταση',
    Table_NoMatch: 'Δεν υπάρχουν στοιχεία που να ταιριάζουν με το τρέχον φίλτρο.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Όνομα φακέλου συγχρονισμού βιβλιοθήκης',
    Explorer_ThresholdLegend: "Προειδοποίηση στους {warning}+ χαρακτήρες, υπέρβαση ορίου στους {error}+ (ορίζεται στις ιδιότητες επεξεργασίας του τμήματος web)",
    Explorer_RefreshTooltip: 'Επανέλεγχος κάθε βιβλιοθήκης σε πραγματικό χρόνο, με παράβλεψη των αποτελεσμάτων από την προσωρινή μνήμη',
    Explorer_Refresh: 'Ανανέωση',
    Explorer_ActivityLog: 'Αρχείο καταγραφής δραστηριότητας',
    Explorer_ActivityLogEmpty: 'Δεν έχει καταγραφεί τίποτα ακόμη.',
    Explorer_TreeAriaLabel: 'Βιβλιοθήκες εγγράφων',
    Explorer_NoLibraries: 'Δεν βρέθηκαν βιβλιοθήκες εγγράφων σε αυτόν τον ιστότοπο.',
    Explorer_SelectItemPrompt: 'Επιλέξτε ένα στοιχείο στο δέντρο για να δείτε την εκτιμώμενη διαδρομή OneDrive και τον αριθμό χαρακτήρων του.',
    Explorer_CouldntList: 'Δεν ήταν δυνατή η εμφάνιση της λίστας για το "{path}": {error}',
    Explorer_CouldntLoad: 'Δεν ήταν δυνατή η φόρτωση του "{path}": {error}',
    Explorer_StatusWithChars: '{status} — {count} χαρ.',
    Explorer_ContainsBelowError: 'Περιέχει κάποιο στοιχείο πάνω από το όριο κάπου κάτω από αυτόν τον φάκελο.',
    Explorer_ContainsBelowWarning: 'Περιέχει κάποιο στοιχείο σε επίπεδο προειδοποίησης κάπου κάτω από αυτόν τον φάκελο.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Σάρωση',
    Legend_ScanningTooltip: "Η σάρωση στο παρασκήνιο αυτής της βιβλιοθήκης δεν έχει ολοκληρωθεί ακόμη — ο δείκτης με τελεία (όχι το ίδιο το εικονίδιο) μπορεί να μην είναι οριστικός.",
    Legend_IssueBelow: 'Πρόβλημα παρακάτω',
    Legend_IssueBelowTooltip: 'Αυτός ο φάκελος περιέχει κάπου μέσα του ένα στοιχείο σε επίπεδο προειδοποίησης ή πάνω από το όριο, ακόμη και αν η δική του διαδρομή είναι εντάξει — αναπτύξτε τον για να βρείτε ποιο είναι.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Η βιβλιοθήκη εξακολουθεί να ελέγχεται για προβλήματα παρακάτω — η τελεία μπορεί να μην είναι ακόμη οριστική.',
    Tree_ContainsBelowError: 'Περιέχει παρακάτω ένα στοιχείο πάνω από το όριο',
    Tree_ContainsBelowWarning: 'Περιέχει παρακάτω ένα στοιχείο σε επίπεδο προειδοποίησης',
    Tree_ScanInfo: '{description} (Έλεγχος στοιχείων παρακάτω: {source}, {age}.)',
    Tree_SourceCache: 'από την προσωρινή μνήμη',
    Tree_SourceLive: 'σάρωση σε πραγματικό χρόνο',
    Age_JustNow: 'μόλις τώρα',
    Age_OneMinute: 'πριν από 1 λεπτό',
    Age_Minutes: 'πριν από {count} λεπτά',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Πρόθεμα δείγματος διαδρομής',
    Breakdown_SyncFolder: 'Φάκελος συγχρονισμού βιβλιοθήκης ("{name}")',
    Breakdown_Relative: 'Σχετική διαδρομή εντός της βιβλιοθήκης',
    Breakdown_Total: 'Σύνολο (συμπ. διαχωριστικών)',
    Breakdown_Chars: '{count} χαρ.',

    // ── Throttling notices ──
    Throttle_Paused: 'Περιορισμός από το SharePoint — η σάρωση στο παρασκήνιο έχει τεθεί σε παύση για {seconds} δευτ.',
    Throttle_Gentle: 'Η σάρωση στο παρασκήνιο εκτελείται με μειωμένο ρυθμό (ταυτόχρονες λειτουργίες {limit} από {target}) μετά τον περιορισμό από το SharePoint.',
    Throttle_ReportWaiting: ' — περιορισμός από το SharePoint, αναμονή {seconds} δευτ.',
    Throttle_ReportGentle: ' — εκτελείται με μειωμένο ρυθμό (ταυτόχρονες λειτουργίες {limit} από {target}) μετά από {events} απαντήσεις περιορισμού',

    // ── Report ──
    Report_Title: 'Αναφορά',
    Report_LibrariesToScan: 'Βιβλιοθήκες προς σάρωση',
    Report_SelectAll: 'Επιλογή όλων',
    Report_SelectNone: 'Καμία επιλογή',
    Report_RunFullScan: 'Εκτέλεση πλήρους σάρωσης',
    Report_Cancelling: 'Ακύρωση…',
    Report_Scanned: 'Σαρώθηκαν {count} στοιχεία…{note}',
    Report_ExportButton: 'Εξαγωγή αναφοράς…',
    Report_Summary: 'Σαρώθηκαν {total} στοιχεία — {over} πάνω από το όριο, {warning} σε επίπεδο προειδοποίησης',
    Report_Empty: 'Επιλέξτε βιβλιοθήκες παραπάνω και εκτελέστε πλήρη σάρωση για να δημιουργήσετε μια αναφορά.',
    Report_ScanFailed: 'Η σάρωση της βιβλιοθήκης "{library}" απέτυχε: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Εξαγωγή αναφοράς',
    Export_Format: 'Μορφή',
    Export_Scope: 'Εύρος',
    Export_Type: 'Τύπος',
    Export_Folder: 'Φάκελος',
    Export_File: 'Αρχείο',
    Export_ColLibrary: 'Βιβλιοθήκη',
    Export_ColPath: 'Εκτιμώμενη διαδρομή OneDrive',
    Export_ColLength: 'Μήκος',
    Export_ColStatus: 'Κατάσταση',
    Export_SheetSummary: 'Σύνοψη',
    Export_SheetPaths: 'Διαδρομές',
    Export_ReportTitle: 'Αναφορά SharePoint Smart Path Length',
    Export_Generated: 'Δημιουργήθηκε',
    Export_ItemsScanned: 'Στοιχεία που σαρώθηκαν',
    Export_OverLimit: 'Πάνω από το όριο',
    Export_WarningLevel: 'Επίπεδο προειδοποίησης',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Ρυθμίσεις',
    Settings_SamplePathTooltip: "Ο ριζικός φάκελος συγχρονισμού του OneDrive, π.χ. C:\\Users\\UsernamePath\\OneDrive - Company\\. Αποθηκεύεται μόνο σε αυτό το πρόγραμμα περιήγησης — δεν κοινοποιείται σε άλλους χρήστες.",
    Settings_ConcurrencyLabel: 'Ταυτόχρονα αιτήματα API κατά την πλήρη σάρωση (ανώτατο όριο)',
    Settings_ConcurrencyTooltip: 'Ένα ανώτατο όριο, όχι σταθερός ρυθμός. Οι σαρώσεις ξεκινούν αρκετά χαμηλότερα και αυξάνουν τον ρυθμό όσο το SharePoint ανταποκρίνεται. Αν το SharePoint περιορίσει τη σάρωση, αυτή τίθεται σε παύση (σεβόμενη το Retry-After), μειώνει στο μισό τις ταυτόχρονες λειτουργίες της και στη συνέχεια αυξάνει τον ρυθμό μόνο λίγο κάτω από το επίπεδο που περιορίστηκε — ποτέ μέχρι αυτό. Μειώστε την τιμή αν οι σαρώσεις εξακολουθούν να προκαλούν περιορισμό.',
    Settings_IncludeHidden: 'Συμπερίληψη κρυφών βιβλιοθηκών και βιβλιοθηκών συστήματος',
    Settings_ThresholdsNote: 'Τα όρια προειδοποίησης ({warning} χαρακτήρες) και υπέρβασης ορίου ({error} χαρακτήρες) ορίζονται από όποιον επεξεργάζεται αυτή τη σελίδα — από το παράθυρο ιδιοτήτων του τμήματος web ("Επεξεργασία τμήματος web" → ρυθμίσεις του SharePoint Smart Path Length), όχι από εδώ.'
  };
});
