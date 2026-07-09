// PAGE CALENDAR - Calendrier
// -----------------------------------------------------------------------------
// Cette page gère l'affichage du calendrier ainsi que le calcul des jours
// ouvrés (mensuels et annuels) en fonction de la sélection utilisateur.
// -----------------------------------------------------------------------------

// Importations des bibliothèques UI (Material UI)
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from '@mui/icons-material/DarkMode';


// Import des composants internes
import Bandeau from "../component/bandeau";
import Card3 from "../component/card3";
import Schedule from "../component/schedule";

// Hooks React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Fonctions de calcul des jours ouvrés
import { getWorkingDaysUntilYearEnd } from "../algo/joursOuvresAn";
import { getWorkingDaysUntilMonthEnd } from "../algo/joursOuvresMois";

// -----------------------------------------------------------------------------
// COMPOSANT PRINCIPAL : Calendar
// -----------------------------------------------------------------------------
export default function Calendar() {

  // ---------------------------------------------------------------------------
  // NAVIGATION HANDLERS (redirection vers modules métiers)
  // ---------------------------------------------------------------------------
  const navigateJours = useNavigate();

  // États liés aux jours ouvrés
  const [workingDaysYear, setWorkingDaysYear] = useState(null); // Jours ouvrés restants dans l'année
  const [workingDaysMonth, setWorkingDaysMonth] = useState(null); // Jours ouvrés restants dans le mois
  const [displayWorkingDaysYear, setDisplayWorkingDaysYear] = useState(0); // Valeur animée pour l'affichage annuel
  const [displayWorkingDaysMonth, setDisplayWorkingDaysMonth] = useState(0); // Valeur animée pour l'affichage mensuel

  // États liés à la sélection du calendrier
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  // Fonction d'animation pour les compteurs de KPI
  const animateValue = (start, end, setter, duration = 850) => {
    if (start === end) return;

    let startTime = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const t = Math.min(progress / duration, 1);
      const eased = easeOutCubic(t);

      const value = Math.floor(start + (end - start) * eased);
      setter(value);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setter(end);
      }
    };

    requestAnimationFrame(animate);
  };

  // -----------------------------------------------------------------------------
  // Chargement initial : calcul des jours ouvrés annuels au montage du composant
  // -----------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      const result = await getWorkingDaysUntilYearEnd(new Date());
      setWorkingDaysYear(result);
    }
    load();
    const end = Number(workingDaysYear || 0);
    animateValue(365, end, setDisplayWorkingDaysYear);
  }, [workingDaysYear]);

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
    const end = Number(workingDaysMonth || 0);
    animateValue(0, end, setDisplayWorkingDaysMonth);
  }, [month, year, workingDaysMonth]);

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
            <Card3 title="Mensuel" value={displayWorkingDaysMonth} icon={<DarkModeIcon />} unit="J-ouvrés" />
          </Grid>

          <Grid item xs={12} md={4}
            sx={{
              position: "relative",

              "& .arrow": {
                opacity: 0,
                transform: "translateX(-10px)",
                transition: "all 0.3s ease",
              },

              "&:hover .arrow": {
                opacity: 1,
                transform: "translateX(0)",
              },
            }}>
            <Card3 title="Annuel" value={displayWorkingDaysYear} icon={<LightModeIcon />} unit="J-ouvrés" onClick={() => navigateJours("/team")} />
            <ArrowCircleRightOutlinedIcon
              className="arrow"
              sx={{
                position: "absolute",
                right: 30,
                top: "40%",
                transform: "translateY(-50%)",
                fontSize: 30,
                color: "#0178A5",
              }}
            />
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