// PAGE DASHBOARD - ACCUEIL

// Importations des bibliothèques et composants nécessaires
import { Box, Grid, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import EqualizerIcon from '@mui/icons-material/Equalizer';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LightModeIcon from '@mui/icons-material/LightMode';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import { getWorkingDaysUntilYearEnd} from "../algo/joursOuvresAn";
import {getTotCap} from "../services/dashboardService.js";

import Bandeau from "../component/bandeau";
import Delta from "../component/delta";
import Card1 from "../component/card1";
import Card2 from "../component/card2";


// DEBUT PAGE
export default function Dashboard() {

  const navigateDelta = useNavigate(); // redirection de la kpi delta vers la page chantier
  const navigateCapacite = useNavigate(); // redirection de la kpi capacité vers la page team
  const navigateRAF = useNavigate(); // redirection de la kpi RAF vers la page chantier
  const navigateCharge = useNavigate(); // redirection de la kpi charge globale vers la page chantier
  const navigateConsomme = useNavigate(); // redirection de la kpi consommé vers la page chantier
  const navigateJours = useNavigate(); // redirection de la kpi jours ouvrés vers la page calendar
  const [totalCapacity, setTotalCapacity] = useState([]);


  // State pour les jours ouvrés restants dans l'année
  const [workingDays, setWorkingDays] = useState(null);
  useEffect(() => {
    async function load(){
      const result = await getWorkingDaysUntilYearEnd(new Date());
      setWorkingDays(result);
    }
    load();
  }, []);

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

    const Capacity = workingDays === null ? [] : totalCapacity.map(qa => ({...qa, capacity: workingDays - (qa.nbused ?? 0),}));
    const total = Capacity.reduce((sum, qa) => sum+qa.capacity, 0);

  //BODY DE LA PAGE
  return (
    <div>
    <Bandeau title="Dashboard" subtitle="KPI et alertes" />
    <Box sx={{ paddingTop: "70px", }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">

        {/* LIGNE 1 */}
        {/* Delta */}
        <Grid item xs={12} md={4}>
          <Delta value="760*" onClick={() => navigateDelta("/chantier")} />
        </Grid>
        <Grid item xs={12} md={8}>
          {/* Capacité et RAF */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card1 titre="Capacité QA disponible" value={total} icon={<ThumbUpOffAltIcon sx={{fontSize: 50}} />} onClick={() => navigateCapacite("/team")} />
              <Card1 titre="Reste à faire QA (RAFQA)" value="653*" icon={<ErrorOutlineIcon sx={{fontSize: 50}} />} onClick={() => navigateRAF("/chantier")} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* LIGNE 2 */}
      {/* Charge globale, consommé et jours ouvrés */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card2 titre="Charge globale" value="855,5*" icon={<EqualizerIcon sx={{fontSize: 40}} />} unit="JH" onClick={() => navigateCharge("/chantier")} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card2 titre="Consommé" value="202,5*" icon={<CheckCircleOutlineIcon sx={{fontSize: 40}} />} unit="JH" onClick={() => navigateConsomme("/chantier")} />
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
// FIN PAGE