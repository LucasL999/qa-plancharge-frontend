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
  // STATE - CAPACITÉ / DONNÉES MÉTIER
  // ---------------------------------------------------------------------------
  const [workingDays, setWorkingDays] = useState(null);
  const [QAs, setQAs] = useState([]);
  const [nbQA, setNbQA] = useState(0);

  // hypothèse métier fixe (CAF moyen QA)
  const cafMoy = 18;

  // ---------------------------------------------------------------------------
  // EFFECT - jours ouvrés annuels
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      const result = await getWorkingDaysUntilYearEnd(new Date());
      setWorkingDays(result);
    }
    load();
  }, []);

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
  }, []);

  // ---------------------------------------------------------------------------
  // DERIVED DATA - capacité par QA
  // ---------------------------------------------------------------------------
  const QAsWithCapacity =
    workingDays === null
      ? []
      : QAs.map(qa => ({
          ...qa,
          capacity: workingDays - (qa.nbused ?? 0),
        }));

  // capacité totale
  const totalCapacity = QAsWithCapacity.reduce(
    (sum, qa) => sum + qa.capacity,
    0
  );

  // capacité mensuelle théorique
  const capMensuel = nbQA * cafMoy;

  // ---------------------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------------------
  return (
    <div>
      <Bandeau title="Plan de charge" subtitle="Gestion du capacitaire QA" />

      <Box sx={{ paddingTop: "60px" }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">

          <Grid item xs={12} md={4}>
            <Card3
              title="Nombre de QA"
              value={nbQA}
              icon={<PeopleOutlineOutlinedIcon />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Card3
              title="CAF moyen"
              value={cafMoy}
              icon={<TimelineOutlinedIcon />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Card3
              title="Capacitaire mensuel"
              value={capMensuel}
              icon={<InsertInvitationOutlinedIcon />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Card4
              title="Capacité disponible"
              value={totalCapacity}
              icon={<ThumbUpAltOutlinedIcon />}
            />
          </Grid>

        </Grid>
      </Box>

      <Box sx={{ paddingTop: "40px", paddingBottom: "40px", margin: "0 60px" }}>
        <TableTeam qas={QAsWithCapacity} />
      </Box>
    </div>
  );
}