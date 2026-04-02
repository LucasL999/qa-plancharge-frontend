import { Box } from "@mui/material";
import Bandeau from "../component/bandeau";
import Card5 from "../component/card5";
import { Grid } from "@mui/material";

export default function Chantier() {

  return (
    <div>
    <Bandeau title="Chantiers" subtitle="Gestion des chantiers QA" />
    <Box sx={{ paddingTop: "50px", paddingLeft: "100px" }}>
      <Grid container spacing={2} alignItems="center" >
        <Grid item xs={12} md={4}>
          <Card5 title="RAF QA" value="654" icon="X" unit="JH" color="#009951" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card5 title="Consommé" value="202,5" icon="X" unit="JH" color="#C00F0C" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card5 title="Charge globale" value="855,5" icon="X" unit="JH" color="black" />
        </Grid>
      </Grid>
    </Box>
    </div>
  )
};


