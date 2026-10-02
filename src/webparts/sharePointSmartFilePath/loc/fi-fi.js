define([], function () {
  return {
    // ── Property pane ──
    PropertyPane_HeaderDescription: 'SharePoint Smart Path Length -määritykset',
    PropertyPane_Group_Thresholds: 'Polun pituuden kynnysarvot',
    PropertyPane_Group_SamplePath: 'OneDrive-esimerkkipolku',
    PropertyPane_WarningLength_Label: 'Varoituspituus (merkkiä)',
    PropertyPane_ErrorLength_Label: 'Ylityspituus (merkkiä)',
    PropertyPane_SamplePath_Label: 'Oletusesimerkkipolun OneDrive-etuliite',
    PropertyPane_Validation_PositiveInteger: 'Anna positiivinen kokonaisluku.',
    PropertyPane_Validation_WarningLessThanError: 'Varoituspituuden on oltava pienempi kuin ylityspituus.',

    // ── Common ──
    Common_Back: 'Takaisin',
    Common_Cancel: 'Peruuta',
    Common_Close: 'Sulje',
    Common_Clear: 'Tyhjennä',
    Common_Connect: 'Yhdistä',
    Common_Export: 'Vie',
    Common_LoadingLibraries: 'Ladataan kirjastoja…',
    Common_SamplePathLabel: 'OneDrive-esimerkkipolun etuliite',

    // ── Header ──
    App_ChangeUrl: 'Vaihda URL-osoite',
    App_Explorer: 'Resurssienhallinta',
    App_Report: 'Raportti',
    App_Settings: 'Asetukset',

    // ── Path status ──
    Status_OK: 'OK',
    Status_Warning: 'Varoitus',
    Status_OverLimit: 'Raja ylitetty',
    StatusDescription_Error: "Tämä polku on määritetyn rajan tasolla tai sen yli – se ei todennäköisesti synkronoidu OneDriveen oikein.",
    StatusDescription_Warning: 'Tämä polku lähestyy määritettyä rajaa – se kannattaa lyhentää pian.',
    StatusDescription_Normal: 'Tämä polku on selvästi määritetyn rajan sisällä – mitään ei tarvitse tehdä.',

    // ── Scope / filters ──
    Scope_All: 'Kaikki polut',
    Scope_WarningAndOver: 'Varoitustason ja rajan ylittävät polut',
    Scope_OverOnly: 'Vain rajan ylittävät polut',
    Filter_All: 'Kaikki',
    Filter_WarningAndOver: 'Varoitus ja ylitys',
    Filter_OverOnly: 'Vain rajan ylitys',

    // ── Path table ──
    Table_Library: 'Kirjasto',
    Table_EstimatedPath: 'Arvioitu OneDrive-polku',
    Table_Length: 'Pituus',
    Table_Status: 'Tila',
    Table_NoMatch: 'Mikään kohde ei vastaa nykyistä suodatinta.',

    // ── Explorer ──
    Explorer_SyncFolderLabel: 'Kirjaston synkronointikansion nimi',
    Explorer_ThresholdLegend: "Varoitus, kun merkkejä on {warning}+, raja ylitetty, kun merkkejä on {error}+ (määritetään verkko-osan muokkausominaisuuksissa)",
    Explorer_RefreshTooltip: 'Tarkista kaikki kirjastot uudelleen livenä välimuistin tuloksia huomioimatta',
    Explorer_Refresh: 'Päivitä',
    Explorer_ActivityLog: 'Toimintaloki',
    Explorer_ActivityLogEmpty: 'Ei vielä kirjattuja tapahtumia.',
    Explorer_TreeAriaLabel: 'Asiakirjakirjastot',
    Explorer_NoLibraries: 'Tältä sivustolta ei löytynyt asiakirjakirjastoja.',
    Explorer_SelectItemPrompt: 'Valitse kohde puusta nähdäksesi sen arvioidun OneDrive-polun ja merkkimäärän.',
    Explorer_CouldntList: 'Kohteen "{path}" luettelointi ei onnistunut: {error}',
    Explorer_CouldntLoad: 'Kohteen "{path}" lataaminen ei onnistunut: {error}',
    Explorer_StatusWithChars: '{status} – {count} merkkiä',
    Explorer_ContainsBelowError: 'Sisältää rajan ylittävän kohteen jossain tämän kansion alla.',
    Explorer_ContainsBelowWarning: 'Sisältää varoitustason kohteen jossain tämän kansion alla.',

    // ── Explorer: icon legend ──
    Legend_Scanning: 'Skannataan',
    Legend_ScanningTooltip: "Tämän kirjaston taustaskannaus ei ole vielä valmis – pistemerkki (ei itse kuvake) ei välttämättä ole lopullinen.",
    Legend_IssueBelow: 'Ongelma alla',
    Legend_IssueBelowTooltip: 'Tämä kansio sisältää jossain sisällään varoitustason tai rajan ylittävän kohteen, vaikka sen oma polku olisi kunnossa – laajenna se löytääksesi kohteen.',

    // ── Explorer: tree ──
    Tree_StillChecking: 'Tarkistetaan vielä tämän kirjaston alapuolisia ongelmia – piste ei välttämättä ole vielä lopullinen.',
    Tree_ContainsBelowError: 'Sisältää rajan ylittävän kohteen alapuolella',
    Tree_ContainsBelowWarning: 'Sisältää varoitustason kohteen alapuolella',
    Tree_ScanInfo: '{description} (Alapuolisten kohteiden tarkistus: {source}, {age}.)',
    Tree_SourceCache: 'välimuistista',
    Tree_SourceLive: 'live-skannaus',
    Age_JustNow: 'juuri nyt',
    Age_OneMinute: '1 min sitten',
    Age_Minutes: '{count} min sitten',

    // ── Explorer: path breakdown ──
    Breakdown_Prefix: 'Esimerkkipolun etuliite',
    Breakdown_SyncFolder: 'Kirjaston synkronointikansio ("{name}")',
    Breakdown_Relative: 'Suhteellinen polku kirjastossa',
    Breakdown_Total: 'Yhteensä (erottimet mukaan lukien)',
    Breakdown_Chars: '{count} merkkiä',

    // ── Throttling notices ──
    Throttle_Paused: 'SharePoint rajoitti käyttöä – taustaskannaus on keskeytetty {seconds} s ajaksi.',
    Throttle_Gentle: 'Taustaskannaus toimii hellävaraisesti (rinnakkaisuus {limit} / {target}) SharePointin rajoitettua käyttöä.',
    Throttle_ReportWaiting: ' – SharePoint rajoitti käyttöä, odotetaan {seconds} s',
    Throttle_ReportGentle: ' – toimii hellävaraisesti (rinnakkaisuus {limit} / {target}) {events} rajoitusvastauksen jälkeen',

    // ── Report ──
    Report_Title: 'Raportti',
    Report_LibrariesToScan: 'Skannattavat kirjastot',
    Report_SelectAll: 'Valitse kaikki',
    Report_SelectNone: 'Poista valinnat',
    Report_RunFullScan: 'Suorita täysi skannaus',
    Report_Cancelling: 'Peruutetaan…',
    Report_Scanned: 'Skannattu {count} kohdetta…{note}',
    Report_ExportButton: 'Vie raportti…',
    Report_Summary: '{total} kohdetta skannattu – {over} ylittää rajan, {warning} varoitustasolla',
    Report_Empty: 'Valitse kirjastot yltä ja suorita täysi skannaus luodaksesi raportin.',
    Report_ScanFailed: 'Kirjaston "{library}" skannaus epäonnistui: {error}',

    // ── Export dialog and files ──
    Export_DialogTitle: 'Vie raportti',
    Export_Format: 'Muoto',
    Export_Scope: 'Laajuus',
    Export_Type: 'Tyyppi',
    Export_Folder: 'Kansio',
    Export_File: 'Tiedosto',
    Export_ColLibrary: 'Kirjasto',
    Export_ColPath: 'Arvioitu OneDrive-polku',
    Export_ColLength: 'Pituus',
    Export_ColStatus: 'Tila',
    Export_SheetSummary: 'Yhteenveto',
    Export_SheetPaths: 'Polut',
    Export_ReportTitle: 'SharePoint Smart Path Length -raportti',
    Export_Generated: 'Luotu',
    Export_ItemsScanned: 'Skannatut kohteet',
    Export_OverLimit: 'Raja ylitetty',
    Export_WarningLevel: 'Varoitustaso',
    Export_OK: 'OK',

    // ── Settings ──
    Settings_Title: 'Asetukset',
    Settings_SamplePathTooltip: "OneDrive-synkronoinnin juurikansio, esim. C:\\Users\\UsernamePath\\OneDrive - Company\\. Tallennetaan vain tähän selaimeen – ei jaeta muille käyttäjille.",
    Settings_ConcurrencyLabel: 'Samanaikaiset API-pyynnöt täyden skannauksen aikana (yläraja)',
    Settings_ConcurrencyTooltip: 'Yläraja, ei kiinteä nopeus. Skannaus alkaa selvästi tätä alempana ja nopeutuu, kun SharePoint pysyy mukana. Jos SharePoint rajoittaa skannausta, se keskeytyy (Retry-After huomioiden), puolittaa rinnakkaisuutensa ja nousee myöhemmin takaisin vain hieman rajoitetun tason alapuolelle – ei koskaan sille tasolle. Pienennä tätä, jos skannaukset aiheuttavat edelleen rajoituksia.',
    Settings_IncludeHidden: 'Sisällytä piilotetut ja järjestelmäkirjastot',
    Settings_ThresholdsNote: 'Varoituksen ({warning} merkkiä) ja rajan ylityksen ({error} merkkiä) kynnysarvot määrittää tämän sivun muokkaaja verkko-osan ominaisuusruudusta ("Muokkaa verkko-osaa" → SharePoint Smart Path Length -asetukset), ei täällä.'
  };
});
