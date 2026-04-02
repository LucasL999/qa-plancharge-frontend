import { Box, Card, Typography, Grid, Paper } from "@mui/material";


import Bandeau from "../component/bandeau";
import Delta from "../component/delta";
import Card1 from "../component/card1";
import Card2 from "../component/card2";

export default function Dashboard() {

  return (
    <div>
    <Bandeau title="Dashboard" subtitle="KPI et alertes" />
    <Box sx={{ paddingTop: "70px", }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">

        {/* LIGNE 1 */}
        <Grid item xs={12} md={4}>
          <Delta />
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card1 titre="Capacité QA disponible" value="1414" icon="X" />
              <Card1 titre="Reste à faire QA (RAFQA)" value="654" icon="X" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* LIGNE 2 */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card2 titre="Capacité Dev disponible" value="1414" icon="X" unit="JH" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card2 titre="Capacité Dev disponible" value="1414" icon="X" unit="JH" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card2 titre="Capacité Dev disponible" value="1414" icon="X" unit="JH" />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </div>
  )
};
