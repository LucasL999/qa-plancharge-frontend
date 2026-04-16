import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import Bandeau from "../component/bandeau";
import Card3 from "../component/card3";
import Schedule from "../component/schedule";

import { useEffect, useState } from "react";
import { getWorkingDaysUntilYearEnd} from "../algo/joursOuvresAn";
import { getWorkingDaysUntilMonthEnd } from "../algo/joursOuvresMois";

export default function Calendar() {

  const [workingDaysYear, setWorkingDaysYear] = useState(null);
  const [workingDaysMonth, setWorkingDaysMonth] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  useEffect(() => {
    async function load(){
      const result = await getWorkingDaysUntilYearEnd(new Date());
      setWorkingDaysYear(result);
    }
    load();
  }, []);

  useEffect(() => {
    if(month === null && year === null) return;
    async function load(){
      const today = new Date();
      if(month === today.getMonth() && year === today.getFullYear()){
        const result = await getWorkingDaysUntilMonthEnd(today);
        setWorkingDaysMonth(result);
      }else{
        const date = new Date(year, month, 1);
        const result = await getWorkingDaysUntilMonthEnd(date);
        setWorkingDaysMonth(result);
      }
    }
    load();
  }, [month, year]);

  return (
    <div>
    <Bandeau title="Calendrier" subtitle="Planification des indisponibilités" />
    <Box sx={{ paddingTop: "20px", paddingLeft: "100px" }}>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" marginRight="50px">
        <Grid item xs={12} md={4}>
          <Card3 title="Mensuel" value={workingDaysMonth} icon="" unit="J-ouvrés"/>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card3 title="Annuel" value={workingDaysYear} icon="" unit="J-ouvrés"/>
        </Grid>
      </Grid>
    </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingRight: "50px",
        paddingLeft: "50px",
        paddingTop: "20px",
      }}
    >
      <Schedule width={600} onMonthYearChange={({month, year}) => {setMonth(month); setYear(year)}} />
    </Box>
    </div>
  )
};

