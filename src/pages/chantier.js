import { Box } from "@mui/material";
import Bandeau from "../component/bandeau";
import Card5 from "../component/card5";
import { Grid } from "@mui/material";

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EqualizerIcon from '@mui/icons-material/Equalizer';

export default function Chantier() {

  return (
    <div>
    <Bandeau title="Chantiers" subtitle="Gestion des chantiers QA" />
    <Box sx={{ paddingTop: "50px", paddingLeft: "100px" }}>
      <Grid container spacing={2} alignItems="center" >
        <Grid item xs={12} md={4}>
          <Card5 title="RAF QA" value="654" icon={<ErrorOutlineIcon sx={{ color: "#009951", fontSize: 40, fontWeight: "bold" }} />} unit="JH" color="#009951" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card5 title="Consommé" value="202,5" icon={<CheckCircleOutlineIcon sx={{ color: "#C00F0C", fontSize: 40 }} />} unit="JH" color="#C00F0C" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card5 title="Charge globale" value="855,5" icon={<EqualizerIcon sx={{ color: "black", fontSize: 40 }} />} unit="JH" color="black" />
        </Grid>
      </Grid>
    </Box>
    </div>
  )
};


