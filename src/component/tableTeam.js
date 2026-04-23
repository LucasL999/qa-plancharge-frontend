import { alpha, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export default function TableTeam({qas}) {
        
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
          {qas.map((qa) => (
            <TableRow key={qa.name} sx={{ ":hover": {backgroundColor: alpha("#5DA1BC", 0.2), cursor: "pointer"} }}>
              <TableCell align="center" sx={{ color: "#0178A5", fontWeight: "bold" }}>{qa.name} {qa.firstname}</TableCell>
              <TableCell align="center" sx={{color: "#009951", fontWeight: "bold"}}>{qa.capacity}</TableCell>
              <TableCell align="center" sx={{color: "#6B6B6B", fontWeight: "bold"}}>{qa.nbused}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
