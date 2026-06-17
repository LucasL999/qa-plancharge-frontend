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
import DataUsageIcon from '@mui/icons-material/DataUsage';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LightModeIcon from "@mui/icons-material/LightMode";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

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
  const [displayTotalCapacity, setDisplayTotalCapacity] = useState(0);

  // Jours ouvrés restants dans l’année
  const [workingDays, setWorkingDays] = useState(null);
  const [displayWorkingDays, setDisplayWorkingDays] = useState(0);

  // ---------------------------------------------------------------------------
  // STATE - KPI CHANTIER
  // ---------------------------------------------------------------------------
  const [prev, setPrev] = useState("");
  const [cons, setCons] = useState("");
  const [raf, setRaf] = useState("");
  const [delta, setDelta] = useState("");
  const [displayDelta, setDisplayDelta] = useState(0);
  const [displayRaf, setDisplayRaf] = useState(0);
  const [displayPrev, setDisplayPrev] = useState(0);
  const [displayCons, setDisplayCons] = useState(0);

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

  useEffect(() => {
    const end = Number(total || 0);
    animateValue(displayTotalCapacity, end, setDisplayTotalCapacity);
  }, [total]);

  useEffect(() => {
    const end = Number(workingDays || 0);
    animateValue(365, end, setDisplayWorkingDays);
  }, [workingDays]);

  useEffect(() => {
    fetchPrev();
    const end = Number(prev || 0);
    animateValue(displayPrev, end, setDisplayPrev);
  }, [prev]);

  useEffect(() => {
    fetchCons();
    const end = Number(cons || 0);
    animateValue(displayCons, end, setDisplayCons);
  }, [cons]);

  // RAF = charge prévue - consommé
  useEffect(() => {
    setRaf(prev - cons);
    const end = Number(raf || 0);
    animateValue(displayRaf, end, setDisplayRaf);
  }, [prev, cons, raf]);

  // Delta global = capacité - charge prévue
  useEffect(() => {
    setDelta(total - raf);
    const end = Number(delta || 0);
    animateValue(displayDelta, end, setDisplayDelta);
  }, [total, raf, delta]);


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
            <Delta value={displayDelta} onClick={() => navigateDelta("/chantier")} />
            <ArrowCircleRightOutlinedIcon
              className="arrow"
              sx={{
                position: "absolute",
                right: 30,
                top: "45%",
                transform: "translateY(-50%)",
                fontSize: 50,
                color: "#009951",
              }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>

                <Box
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
                  <Card1
                    titre="Capacité QA disponible"
                    value={displayTotalCapacity}
                    icon={<ThumbUpOffAltIcon sx={{ fontSize: 40 }} />}
                    onClick={() => navigateCapacite("/team")}
                  />
                  <ArrowCircleRightOutlinedIcon
                    className="arrow"
                    sx={{
                      position: "absolute",
                      right: 30,
                      top: "40%",
                      transform: "translateY(-50%)",
                      fontSize: 40,
                      color: "#0178A5",
                    }}
                  />
                </Box>

                <Box
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
                  <Card1
                    titre="Reste à faire QA (RAFQA)"
                    value={displayRaf}
                    icon={<ErrorOutlineIcon sx={{ fontSize: 40 }} />}
                    onClick={() => navigateRAF("/chantier")}
                  />
                  <ArrowCircleRightOutlinedIcon
                    className="arrow"
                    sx={{
                      position: "absolute",
                      right: 30,
                      top: "40%",
                      transform: "translateY(-50%)",
                      fontSize: 40,
                      color: "#0178A5",
                    }}
                  />
                </Box>

              </Grid>
            </Grid>
          </Grid>

        </Grid>

        {/* ----------------------------------------------------------------- */}
        {/* LIGNE 2 - KPIs secondaires */}
        {/* ----------------------------------------------------------------- */}
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="center">

            <Grid item xs={12} sm={4}
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
              <Card2
                titre="Charge globale"
                value={displayPrev}
                icon={<DataUsageIcon sx={{ fontSize: 40 }} />}
                unit="JH"
                onClick={() => navigateCharge("/chantier")}
              />
              <ArrowCircleRightOutlinedIcon
                className="arrow"
                sx={{
                  position: "absolute",
                  right: 30,
                  top: "45%",
                  transform: "translateY(-50%)",
                  fontSize: 30,
                  color: "#6B6B6B",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}
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
              <Card2
                titre="Charge consommée"
                value={displayCons}
                icon={<CheckCircleOutlineIcon sx={{ fontSize: 40 }} />}
                unit="JH"
                onClick={() => navigateConsomme("/chantier")}
              />
              <ArrowCircleRightOutlinedIcon
                className="arrow"
                sx={{
                  position: "absolute",
                  right: 30,
                  top: "45%",
                  transform: "translateY(-50%)",
                  fontSize: 30,
                  color: "#6B6B6B",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}
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
              <Card2
                titre="J-ouvrés annuels"
                value={displayWorkingDays}
                icon={<LightModeIcon sx={{ fontSize: 40 }} />}
                unit="Jours restants"
                onClick={() => navigateJours("/calendar")}
              />
              <ArrowCircleRightOutlinedIcon
                className="arrow"
                sx={{
                  position: "absolute",
                  right: 30,
                  top: "45%",
                  transform: "translateY(-50%)",
                  fontSize: 30,
                  color: "#6B6B6B",
                }}
              />
            </Grid>

          </Grid>
        </Grid>

      </Box>
    </div>
  );
}