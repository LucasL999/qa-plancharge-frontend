// ==============================
// IMPORTS
// ==============================

import * as XLSX from "xlsx";


// ==============================
// COMPOSANT PRINCIPAL
// ==============================

export default function ImportExcel({ onDataExtracted }) {

    // ==============================
    // GESTION DU CHARGEMENT FICHIER
    // ==============================

    const handleFileChange = (e) => {

        // Récupération du fichier sélectionné
        const file = e.target.files[0];

        // Aucun fichier sélectionné
        if (!file) return;

        // Création du FileReader
        const reader = new FileReader();


        // ==============================
        // LECTURE DU FICHIER
        // ==============================

        reader.onload = (event) => {

            // Conversion du fichier en tableau binaire
            const data = new Uint8Array(event.target.result);

            // Lecture du workbook Excel
            const workbook = XLSX.read(data, {
                type: "array",
            });

            // Récupération de la première feuille
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Conversion de la feuille en JSON
            const json = XLSX.utils.sheet_to_json(sheet);


            // ==============================
            // EXTRACTION DES CHANTIERS
            // ==============================

            // Extraction de la colonne "TitreChantier"
            const chantiers = json
                .map((row) => row.TitreChantier)
                .filter(Boolean);


            // ==============================
            // ENVOI DES DONNÉES AU PARENT
            // ==============================

            onDataExtracted(chantiers);
        };


        // Lecture du fichier Excel
        reader.readAsArrayBuffer(file);
    };


    // ==============================
    // COMPOSANT LOGIQUE UNIQUEMENT
    // ==============================

    return {
        handleFileChange,
    };
}