import { Box, Grid, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import EqualizerIcon from '@mui/icons-material/Equalizer';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LightModeIcon from '@mui/icons-material/LightMode';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import { getWorkingDaysUntilYearEnd} from "../algo/joursOuvresAn";

import Bandeau from "../component/bandeau";
import Delta from "../component/delta";
import Card1 from "../component/card1";
import Card2 from "../component/card2";

export default function Dashboard() {

  const navigateDelta = useNavigate();
  const navigateCapacite = useNavigate();
  const navigateRAF = useNavigate();
  const navigateCharge = useNavigate();
  const navigateConsomme = useNavigate();
  const navigateJours = useNavigate();

  const [workingDays, setWorkingDays] = useState(null);
  
    useEffect(() => {
      async function load(){
        const result = await getWorkingDaysUntilYearEnd(new Date());
        setWorkingDays(result);
      }
      load();
    }, []);

  return (
    <div>
    <Bandeau title="Dashboard" subtitle="KPI et alertes" />
    <Box sx={{ paddingTop: "70px", }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">

        {/* LIGNE 1 */}
        <Grid item xs={12} md={4}>
          <Delta onClick={() => navigateDelta("/chantier")} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card1 titre="Capacité QA disponible" value="1414" icon={<ThumbUpOffAltIcon sx={{fontSize: 50}} />} onClick={() => navigateCapacite("/team")} />
              <Card1 titre="Reste à faire QA (RAFQA)" value="653" icon={<ErrorOutlineIcon sx={{fontSize: 50}} />} onClick={() => navigateRAF("/chantier")} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* LIGNE 2 */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card2 titre="Charge globale" value="855,5" icon={<EqualizerIcon sx={{fontSize: 40}} />} unit="JH" onClick={() => navigateCharge("/chantier")} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card2 titre="Consommé" value="202,5" icon={<CheckCircleOutlineIcon sx={{fontSize: 40}} />} unit="JH" onClick={() => navigateConsomme("/chantier")} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card2 titre="J-ouvrés annuels" value={workingDays} icon={<LightModeIcon sx={{fontSize: 40}} />} unit="Jours restants" onClick={() => navigateJours("/calendar")} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </div>
  )
};
