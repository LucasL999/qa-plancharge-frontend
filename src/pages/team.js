// -----------------------------------------------------------------------------
// PAGE TEAM - PLAN DE CHARGE
// -----------------------------------------------------------------------------
// Cette page présente la capacité de charge des QA :
// - nombre de QA
// - CAF moyen
// - capacité mensuelle théorique
// - capacité disponible réelle
// - détail par QA dans un tableau
// -----------------------------------------------------------------------------

// UI Material UI
import { Box, Grid } from "@mui/material";

// Composants internes
import Bandeau from "../component/bandeau";
import Card3 from "../component/card3";
import Card4 from "../component/card4";
import TableTeam from "../component/tableTeam";

// Services métier
import { getAllTeam, getNbQA } from "../services/teamService";
import { getWorkingDaysUntilYearEnd } from "../algo/joursOuvresAn";

// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Icônes MUI
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

// -----------------------------------------------------------------------------
// PAGE TEAM
// -----------------------------------------------------------------------------
export default function Team() {

  // ---------------------------------------------------------------------------
  // NAVIGATION HANDLERS (redirection vers modules métiers)
  // ---------------------------------------------------------------------------
  const navigateJours = useNavigate();

  // ---------------------------------------------------------------------------
  // STATE - CAPACITÉ / DONNÉES MÉTIER
  // ---------------------------------------------------------------------------
  const [workingDays, setWorkingDays] = useState(null);
  const [QAs, setQAs] = useState([]);
  const [nbQA, setNbQA] = useState(0);
  const [displayTotalCapacity, setDisplayTotalCapacity] = useState(0);
  const [displayCapacitaireMensuel, setDisplayCapacitaireMensuel] = useState(0);
  const [displayCAF, setDisplayCAF] = useState(0);
  const [displayNbQA, setDisplayNbQA] = useState(0);
  const [displayWorkingDays, setDisplayWorkingDays] = useState(0);

  // hypothèse métier fixe (CAF moyen QA)
  const cafMoy = 18;

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
    const end = Number(cafMoy || 0);
    animateValue(displayCAF, end, setDisplayCAF);
  }, [cafMoy]);

  // ---------------------------------------------------------------------------
  // EFFECT - jours ouvrés annuels
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      const result = await getWorkingDaysUntilYearEnd(new Date());
      setWorkingDays(result);
    }
    load();
    const end = Number(workingDays || 0);
    animateValue(365, end, setDisplayWorkingDays);
  }, [workingDays]);

  // ---------------------------------------------------------------------------
  // EFFECT - récupération liste QA
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const fetchQAs = async () => {
      try {
        const data = await getAllTeam();
        setQAs(data);
      } catch (error) {
        console.error("Error fetching QAs:", error);
      }
    };

    fetchQAs();
  }, []);

  // ---------------------------------------------------------------------------
  // EFFECT - récupération nombre de QA
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const fetchNbQA = async () => {
      try {
        const nb = await getNbQA();
        setNbQA(nb[0].count);
      } catch (error) {
        console.error("Error fetching nb QA:", error);
      }
    };

    fetchNbQA();
    const end = Number(nbQA || 0);
    animateValue(displayNbQA, end, setDisplayNbQA);
  }, [nbQA]);

  // ---------------------------------------------------------------------------
  // DERIVED DATA - capacité par QA
  // ---------------------------------------------------------------------------
  const QAsWithCapacity =
    workingDays === null
      ? []
      : QAs.map(qa => ({
        ...qa,
        capacity: workingDays - (qa.nbannual ?? 0),
      }));

  // capacité totale
  const totalCapacity = QAsWithCapacity.reduce(
    (sum, qa) => sum + qa.capacity,
    0
  );

  useEffect(() => {
    const end = Number(totalCapacity || 0);
    animateValue(displayTotalCapacity, end, setDisplayTotalCapacity);
  }, [totalCapacity]);

  // capacité mensuelle théorique
  const capMensuel = nbQA * cafMoy;

  useEffect(() => {
    const end = Number(capMensuel || 0);
    animateValue(displayCapacitaireMensuel, end, setDisplayCapacitaireMensuel);
  }, [capMensuel]);

  // ---------------------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------------------
  return (
    <div>
      <Bandeau title="Plan de charge" subtitle="Gestion du capacitaire QA" />

      <Box sx={{ paddingTop: "40px" }}>
        <Grid container spacing={3.5} alignItems="center" justifyContent="center">

          <Grid item xs={12} md={4}>
            <Card4
              title="Capacité disponible"
              value={displayTotalCapacity}
              icon={<ThumbUpAltOutlinedIcon />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Card3
              title="Capacitaire mensuel"
              value={displayCapacitaireMensuel}
              icon={<InsertInvitationOutlinedIcon />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Card3
              title="CAF moyenne"
              value={displayCAF}
              icon={<TimelineOutlinedIcon />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Card3
              title="Nombre de QA"
              value={displayNbQA}
              icon={<PeopleOutlineOutlinedIcon />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Card3
              title="J-ouvrés annuels"
              value={displayWorkingDays}
              icon={<InsertInvitationOutlinedIcon />}
              onClick={() => navigateJours("/calendar")}
            />
          </Grid>

        </Grid>
      </Box>

      <Box sx={{ paddingTop: "40px", margin: "0 100px" }}>
        <TableTeam qas={QAsWithCapacity} />
      </Box>
    </div>
  );
}