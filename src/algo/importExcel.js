// ImportExcel.js
import * as XLSX from "xlsx";

export default function ImportExcel({ onDataExtracted }) {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const json = XLSX.utils.sheet_to_json(sheet);

      // ✅ exemple : colonne "TitreChantier"
      const chantiers = json
        .map(row => row.TitreChantier)
        .filter(Boolean);

      // 🔥 on remonte les données au parent
      onDataExtracted(chantiers);
    };

    reader.readAsArrayBuffer(file);
  };

  // ⛔ composant "logique" → pas d’affichage
  return { handleFileChange };
}