import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import Bandeau from "../component/bandeau";
import Card3 from "../component/card3";
import Schedule from "../component/schedule";

import { useEffect, useState } from "react";
import { getWorkingDaysUntilYearEnd} from "../algo/joursOuvresAn";

export default function Calendar() {

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
    <Bandeau title="Calendrier" subtitle="Planification des indisponibilités" />
    <Box sx={{ paddingTop: "20px", paddingLeft: "100px" }}>
      <Grid container spacing={2} alignItems="center"  >
        <Grid item xs={12} md={4}>
          <Card3 title="Mensuel" value="21" icon="" unit="J-ouvrés"/>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card3 title="Annuel" value={workingDays} icon="" unit="J-ouvrés"/>
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
      <Schedule width={600} />
    </Box>
    </div>
  )
};

