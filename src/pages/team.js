// PAGE TEAM - PLAN DE CHARGE

// Importations des bibliothèques et composants nécessaires
import { Box, Grid } from "@mui/material";
import Bandeau from "../component/bandeau";
import Card3 from "../component/card3";
import Card4 from "../component/card4";
import TableTeam from "../component/tableTeam";

import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';

// DEBUT PAGE
export default function Team() {

  //BODY DE LA PAGE
  return (
    <div>
    <Bandeau title="Plan de charge" subtitle="Gestion du capacitaire QA" />
    <Box sx={{ paddingTop: "60px", }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card3 title="Nombre de QA" value="7" icon={<PeopleOutlineOutlinedIcon />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card3 title="CAF moyenne" value="18" icon={<TimelineOutlinedIcon />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card3 title="Capacitaire mensuel" value="126" icon={<InsertInvitationOutlinedIcon />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card4 title="Capacité disponible" value="1414" icon={<ThumbUpAltOutlinedIcon />} />
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ paddingTop: "40px", paddingBottom: "40px", margin: "0 60px", }}>
      <TableTeam />
    </Box>
    </div>
  )
};
// FIN PAGE

