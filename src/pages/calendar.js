// PAGE CALENDAR - Calendrier
// -----------------------------------------------------------------------------
// Cette page gère l'affichage du calendrier ainsi que le calcul des jours
// ouvrés (mensuels et annuels) en fonction de la sélection utilisateur.
// -----------------------------------------------------------------------------

// Importations des bibliothèques UI (Material UI)
import { Box } from "@mui/material";
import { Grid } from "@mui/material";

// Import des composants internes
import Bandeau from "../component/bandeau";
import Card3 from "../component/card3";
import Schedule from "../component/schedule";

// Hooks React
import { useEffect, useState } from "react";

// Fonctions de calcul des jours ouvrés
import { getWorkingDaysUntilYearEnd } from "../algo/joursOuvresAn";
import { getWorkingDaysUntilMonthEnd } from "../algo/joursOuvresMois";

// -----------------------------------------------------------------------------
// COMPOSANT PRINCIPAL : Calendar
// -----------------------------------------------------------------------------
export default function Calendar() {

  // États liés aux jours ouvrés
  const [workingDaysYear, setWorkingDaysYear] = useState(null); // Jours ouvrés restants dans l'année
  const [workingDaysMonth, setWorkingDaysMonth] = useState(null); // Jours ouvrés restants dans le mois

  // États liés à la sélection du calendrier
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  // -----------------------------------------------------------------------------
  // Chargement initial : calcul des jours ouvrés annuels au montage du composant
  // -----------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      const result = await getWorkingDaysUntilYearEnd(new Date());
      setWorkingDaysYear(result);
    }
    load();
  }, []);

  // -----------------------------------------------------------------------------
  // Mise à jour des jours ouvrés mensuels lors d'un changement de mois ou d'année
  // -----------------------------------------------------------------------------
  useEffect(() => {
    if (month === null && year === null) return;

    async function load() {
      const today = new Date();

      // Cas particulier : mois/année actuels
      if (month === today.getMonth() && year === today.getFullYear()) {
        const result = await getWorkingDaysUntilMonthEnd(today);
        setWorkingDaysMonth(result);
      } else {
        // Cas général : mois sélectionné dans le calendrier
        const date = new Date(year, month, 1);
        const result = await getWorkingDaysUntilMonthEnd(date);
        setWorkingDaysMonth(result);
      }
    }

    load();
  }, [month, year]);

  // -----------------------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------------------
  return (
    <div>
      {/* Bandeau de titre de la page */}
      <Bandeau title="Calendrier" subtitle="Planification des indisponibilités" />

      {/* Section des KPIs (jours ouvrés mensuels et annuels) */}
      <Box sx={{ paddingTop: "20px", paddingLeft: "100px" }}>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-end" marginRight="30px">

          <Grid item xs={12} md={4}>
            <Card3 title="Mensuel" value={workingDaysMonth} icon="" unit="J-ouvrés"/>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card3 title="Annuel" value={workingDaysYear} icon="" unit="J-ouvrés"/>
          </Grid>

        </Grid>
      </Box>

      {/* Section calendrier / planning */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingRight: "50px",
          paddingLeft: "50px",
          paddingTop: "20px",
        }}
      >
        <Schedule
          width={600}
          onMonthYearChange={({ month, year }) => {
            setMonth(month);
            setYear(year);
          }}
        />
      </Box>
    </div>
  );
};

// FIN PAGE