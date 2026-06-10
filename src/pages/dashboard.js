// -----------------------------------------------------------------------------
// PAGE DASHBOARD - ACCUEIL
// -----------------------------------------------------------------------------
// Cette page agrège les KPI principaux du système (charge, consommation,
// capacité, RAF, delta, jours ouvrés) et gère la navigation vers les modules
// détaillés (chantier, team, calendar).
// -----------------------------------------------------------------------------

// UI Material UI
import { Box, Grid } from "@mui/material";

// Routing
import { useNavigate } from "react-router-dom";

// React
import { useEffect, useState } from "react";

// Icônes MUI
import EqualizerIcon from "@mui/icons-material/Equalizer";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LightModeIcon from "@mui/icons-material/LightMode";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

// Services / algorithmes métier
import { getWorkingDaysUntilYearEnd } from "../algo/joursOuvresAn";
import { getTotCap } from "../services/dashboardService.js";
import { getPrev, getCons } from "../services/chantierService.js";

// Composants UI internes
import Bandeau from "../component/bandeau";
import Delta from "../component/delta";
import Card1 from "../component/card1";
import Card2 from "../component/card2";

// -----------------------------------------------------------------------------
// PAGE DASHBOARD
// -----------------------------------------------------------------------------
export default function Dashboard() {

  // ---------------------------------------------------------------------------
  // NAVIGATION HANDLERS (redirection vers modules métiers)
  // ---------------------------------------------------------------------------
  const navigateDelta = useNavigate();
  const navigateCapacite = useNavigate();
  const navigateRAF = useNavigate();
  const navigateCharge = useNavigate();
  const navigateConsomme = useNavigate();
  const navigateJours = useNavigate();

  // ---------------------------------------------------------------------------
  // STATE - CAPACITÉ
  // ---------------------------------------------------------------------------
  const [totalCapacity, setTotalCapacity] = useState([]);

  // Jours ouvrés restants dans l’année
  const [workingDays, setWorkingDays] = useState(null);

  // ---------------------------------------------------------------------------
  // STATE - KPI CHANTIER
  // ---------------------------------------------------------------------------
  const [prev, setPrev] = useState("");
  const [cons, setCons] = useState("");
  const [raf, setRaf] = useState("");
  const [delta, setDelta] = useState("");

  // ---------------------------------------------------------------------------
  // EFFECT - chargement jours ouvrés annuels
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      const result = await getWorkingDaysUntilYearEnd(new Date());
      setWorkingDays(result);
    }
    load();
  }, []);

  // ---------------------------------------------------------------------------
  // EFFECT - chargement capacité totale QA
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const fetchCap = async () => {
      try {
        const result = await getTotCap();
        setTotalCapacity(result);
      } catch (error) {
        console.error("Error fetching Capacité totale:", error);
      }
    };

    fetchCap();
  }, []);

  // ---------------------------------------------------------------------------
  // DERIVED STATE - capacité disponible
  // ---------------------------------------------------------------------------
  const Capacity =
    workingDays === null
      ? []
      : totalCapacity.map(qa => ({
          ...qa,
          capacity: workingDays - (qa.nbrestant ?? 0),
        }));

  const total = Capacity.reduce((sum, qa) => sum + qa.capacity, 0);

  // ---------------------------------------------------------------------------
  // EFFECT - KPI chantier (prev / cons)
  // ---------------------------------------------------------------------------
  const fetchPrev = async () => {
    try {
      const res = await getPrev();
      setPrev(res[0].sum);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCons = async () => {
    try {
      const res = await getCons();
      setCons(res[0].sum);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPrev();
  }, []);

  useEffect(() => {
    fetchCons();
  }, []);

  // RAF = charge prévue - consommé
  useEffect(() => {
    setRaf(prev - cons);
  }, [prev, cons]);

  // Delta global = capacité - charge prévue
  useEffect(() => {
    setDelta(total - raf);
  }, [total, raf]);

  // ---------------------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------------------
  return (
    <div>
      <Bandeau title="Dashboard" subtitle="KPI et alertes" />

      <Box sx={{ paddingTop: "70px" }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">

          {/* ----------------------------------------------------------------- */}
          {/* LIGNE 1 - Delta + Capacité + RAF */}
          {/* ----------------------------------------------------------------- */}
          <Grid item xs={12} md={4}>
            <Delta value={delta} onClick={() => navigateDelta("/chantier")} />
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>

                <Card1
                  titre="Capacité QA disponible"
                  value={total}
                  icon={<ThumbUpOffAltIcon sx={{ fontSize: 50 }} />}
                  onClick={() => navigateCapacite("/team")}
                />

                <Card1
                  titre="Reste à faire QA (RAFQA)"
                  value={raf}
                  icon={<ErrorOutlineIcon sx={{ fontSize: 50 }} />}
                  onClick={() => navigateRAF("/chantier")}
                />

              </Grid>
            </Grid>
          </Grid>

        </Grid>

        {/* ----------------------------------------------------------------- */}
        {/* LIGNE 2 - KPIs principaux */}
        {/* ----------------------------------------------------------------- */}
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="center">

            <Grid item xs={12} sm={4}>
              <Card2
                titre="Charge globale"
                value={prev}
                icon={<EqualizerIcon sx={{ fontSize: 40 }} />}
                unit="JH"
                onClick={() => navigateCharge("/chantier")}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card2
                titre="Consommé"
                value={cons}
                icon={<CheckCircleOutlineIcon sx={{ fontSize: 40 }} />}
                unit="JH"
                onClick={() => navigateConsomme("/chantier")}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card2
                titre="J-ouvrés annuels"
                value={workingDays}
                icon={<LightModeIcon sx={{ fontSize: 40 }} />}
                unit="Jours restants"
                onClick={() => navigateJours("/calendar")}
              />
            </Grid>

          </Grid>
        </Grid>

      </Box>
    </div>
  );
}