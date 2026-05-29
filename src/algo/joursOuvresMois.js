// ==============================
// CALCUL DES JOURS OUVRÉS
// JUSQU'À LA FIN DU MOIS
// ==============================

export async function getWorkingDaysUntilMonthEnd(date) {

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

    // Année courante
    let year = date.getFullYear();

    // Mois courant
    let month = date.getMonth() + 1;

    // Date de fin de calcul
    let endDate = 0;


    // ==============================
    // CALCUL DE LA FIN DU MOIS
    // ==============================

    // Cas particulier : décembre
    if (month === 12) {

        // Passage à janvier de l'année suivante
        month = 0;
        year = date.getFullYear() + 1;

        // Dernier jour de décembre
        endDate = new Date(year, month, 0);

    } else {

        // Dernier jour du mois courant
        endDate = new Date(year, month, 0);
    }


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

    // Conversion JSON
    const holidaysJson = await res.json();

    // Création d'un Set contenant les jours fériés
    const holidays = new Set(
        Object.keys(holidaysJson)
    );


    // ==============================
    // CALCUL DES JOURS OUVRÉS
    // ==============================

    // Date de départ
    const current = new Date(date);

    // Compteur de jours ouvrés
    let count = 0;

    // Parcours des jours jusqu'à la fin du mois
    while (current <= endDate) {

        // Formatage de la date
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