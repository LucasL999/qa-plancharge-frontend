import { alpha, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function TableTeam() {
    const mockQAs = [
    { name: "Alice", firstname: "Alice", capacity: 20, absences: 2 },
    { name: "Bob", firstname: "Bob", capacity: 18, absences: 1 },
    { name: "Charlie", firstname: "Charlie", capacity: 22, absences: 0 },
    { name: "David", firstname: "David", capacity: 19, absences: 3 },
    { name: "Eve", firstname: "Eve", capacity: 21, absences: 1 },
    { name: "Frank", firstname: "Frank", capacity: 17, absences: 2 },
    { name: "Grace", firstname: "Grace", capacity: 23, absences: 0 },
  ];
  return (
    
<TableContainer>
      <Table sx={{ minWidth: 650, borderRadius: 10 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }} >Utilisateur</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }} >Capacité disponible</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }} >Absences restantes</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {mockQAs.map((qa) => (
            <TableRow key={qa.name} sx={{ ":hover": {backgroundColor: alpha("#5DA1BC", 0.2), cursor: "pointer"} }}>
              <TableCell align="center" sx={{ color: "#0178A5", fontWeight: "bold" }}>{qa.firstname} {qa.name}</TableCell>
              <TableCell align="center" sx={{color: "#009951", fontWeight: "bold"}}>{qa.capacity}</TableCell>
              <TableCell align="center" sx={{color: "#6B6B6B", fontWeight: "bold"}}>{qa.absences}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
