// ==============================
// CALCUL DES JOURS OUVRÉS
// ==============================

export async function getWorkingDaysUntilYearEnd(date) {

    // ==============================
    // VALIDATION DES PARAMÈTRES
    // ==============================

    // Vérification de la présence de la date
    if (!date) {
        throw new Error("date requise");
    }


    // ==============================
    // FONCTIONS UTILITAIRES
    // ==============================

    // Vérifie si une date correspond à un week-end
    const isWeekend = (d) => {

        const day = d.getDay();

        return day === 0 || day === 6;
    };

    // Formate une date au format YYYY-MM-DD
    const formatDate = (d) =>
        d.toISOString().split("T")[0];


    // ==============================
    // INITIALISATION DES DATES
    // ==============================

    // Année de référence
    const year = date.getFullYear();

    // Dernier jour de l'année
    const endDate = new Date(year, 11, 31);


    // ==============================
    // RÉCUPÉRATION DES JOURS FÉRIÉS
    // ==============================

    // Appel API calendrier français
    const res = await fetch(
        `https://calendrier.api.gouv.fr/jours-feries/metropole/${year}.json`
    );

    // Vérification de la réponse API
    if (!res.ok) {
        throw new Error("Erreur API jours fériés");
    }

    // Conversion de la réponse JSON
    const holidaysJson = await res.json();

    // Création d'un Set contenant les dates fériées
    const holidays = new Set(
        Object.keys(holidaysJson)
    );


    // ==============================
    // CALCUL DES JOURS OUVRÉS
    // ==============================

    // Date courante de parcours
    const current = new Date(date);

    // Compteur de jours ouvrés
    let count = 0;

    // Boucle jusqu'à la fin de l'année
    while (current <= endDate) {

        // Formatage de la date courante
        const formatted = formatDate(current);

        // Vérification week-end
        const weekend = isWeekend(current);

        // Vérification jour férié
        const holiday = holidays.has(formatted);

        // Comptabilisation des jours ouvrés
        if (!weekend && !holiday) {
            count++;
        }

        // Passage au jour suivant
        current.setDate(
            current.getDate() + 1
        );
    }


    // ==============================
    // RETOUR DU RÉSULTAT
    // ==============================

    return count;
}