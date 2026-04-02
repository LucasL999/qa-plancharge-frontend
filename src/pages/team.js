import { Box, Grid, } from "@mui/material";
import Bandeau from "../component/bandeau";
import Card3 from "../component/card3";
import Card4 from "../component/card4";


export default function Team() {

  return (
    <div>
    <Bandeau title="Plan de charge" subtitle="Gestion du capacitaire QA" />
    <Box sx={{ paddingTop: "60px", }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card3 title="Nombre de QA" value="7" icon="X" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card3 title="CAF moyenne" value="18" icon="X" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card3 title="Capacitaire mensuel" value="126" icon="X" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card4 title="Capacité disponible" value="1414" icon="X" />
        </Grid>
      </Grid>
    </Box>
    </div>
  )
};


