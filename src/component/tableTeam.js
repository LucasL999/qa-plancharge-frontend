// -----------------------------------------------------------------------------
// TABLEAU DE L'ÉQUIPE QA
// -----------------------------------------------------------------------------
// Ce composant affiche la liste des membres de l'équipe QA avec leur capacité
// disponible ainsi que leur nombre de jours d'absence restants.
// -----------------------------------------------------------------------------

import { alpha, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

// -----------------------------------------------------------------------------
// COMPOSANT TABLETEAM
// -----------------------------------------------------------------------------
export default function TableTeam({ qas }) {

  // ---------------------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------------------
  return (

    <TableContainer sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table sx={{ minWidth: 650, borderRadius: 10 }} aria-label="simple table">

        {/* ------------------------------------------------------------------- */}
        {/* EN-TÊTE DU TABLEAU */}
        {/* ------------------------------------------------------------------- */}
        <TableHead>
          <TableRow sx={{ backgroundColor: "rgba(1, 120, 165, 0.8)" }}>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px", color: "white" }}>
              QA
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px", color: "white" }}>
              Capacité disponible
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px", color: "white" }}>
              Absences
            </TableCell>
          </TableRow>
        </TableHead>

        {/* ------------------------------------------------------------------- */}
        {/* CORPS DU TABLEAU - Affichage des membres de l'équipe QA */}
        {/* ------------------------------------------------------------------- */}
        <TableBody>
          {qas.map((qa) => (
            <TableRow
              key={qa.name}
              sx={{
                ":hover": {
                  backgroundColor: alpha("#5DA1BC", 0.2),
                  cursor: "pointer"
                }
              }}
            >
              <TableCell align="center" sx={{ color: "#0178A5", fontWeight: "bold" }}>
                {qa.name} {qa.firstname}
              </TableCell>

              <TableCell align="center" sx={{ color: "#009951", fontWeight: "bold" }}>
                {qa.capacity}
              </TableCell>

              <TableCell align="center" sx={{ color: "#6B6B6B", fontWeight: "bold" }}>
                {qa.nbrestant}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}
