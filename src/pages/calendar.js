import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import Bandeau from "../component/bandeau";
import Card5 from "../component/card5";

export default function Calendar() {

  return (
    <div>
    <Bandeau title="Calendrier" subtitle="Planification des indisponibilités" />
    <Box sx={{ paddingTop: "20px", paddingLeft: "100px" }}>
      <Grid container spacing={2} alignItems="center" >
        <Grid item xs={12} md={4}>
          <Card5 title="Mensuel" value="21" icon="" unit="J-ouvrés" color="#5DA1BC" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card5 title="Annuel" value="200" icon="" unit="J-ouvrés" color="#5DA1BC" />
        </Grid>
      </Grid>
    </Box>
    </div>
  )
};

