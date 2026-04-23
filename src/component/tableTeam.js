import { alpha, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllTeam } from "../services/teamService";
import { getWorkingDaysUntilYearEnd } from "../algo/joursOuvresAn";

export default function TableTeam() {
    const [QAs, setQAs] = useState([]);
    useEffect(() => {
        const fetchQAs = async () => {
            try {
                const data = await getAllTeam();
                setQAs(data);
            } catch (error) {
                console.error('Error fetching QAs:', error);
            }
        };

        fetchQAs();
    }, []);


    const [workingDays, setWorkingDays] = useState(null);
    useEffect(() => {
      async function load(){
        const result = await getWorkingDaysUntilYearEnd(new Date());
        setWorkingDays(result);
      }
      load();
    }, []);
        
  return (
    
<TableContainer sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table sx={{ minWidth: 650, borderRadius: 10 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }} >QAs</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }} >Capacité disponible</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }} >Absences restantes</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {QAs.map((qa) => (
            <TableRow key={qa.name} sx={{ ":hover": {backgroundColor: alpha("#5DA1BC", 0.2), cursor: "pointer"} }}>
              <TableCell align="center" sx={{ color: "#0178A5", fontWeight: "bold" }}>{qa.firstname} {qa.name}</TableCell>
              <TableCell align="center" sx={{color: "#009951", fontWeight: "bold"}}>{workingDays-qa.nbused}</TableCell>
              <TableCell align="center" sx={{color: "#6B6B6B", fontWeight: "bold"}}>{qa.nbused}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
