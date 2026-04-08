import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  alpha
} from "@mui/material";
import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import PopinInfoChantier from "./popinInfoChantier"; 
import PopinEditChantier from "./popinEditChantier";

export default function TableTeam() {
  const mockChantier = [
    { Chantier: "Chantier 1", Statut: "en cours", ChefDeProjet: "Bob", Priorite: 2, Prev: 5, RAF: 3, Consomme: 2, QA: "Alice", NatureDuProjet: "Interne", Financement: "Budget IT", Capacite: 80, Debut: "2024-01-01", Fin: "2024-02-15" },
    { Chantier: "Chantier 2", Statut: "à faire", ChefDeProjet: "Charlie", Priorite: 1, Prev: 4, RAF: 4, Consomme: 0, QA: "Bob", NatureDuProjet: "Client", Financement: "Facturable", Capacite: 60, Debut: "2024-02-01", Fin: "2024-03-30" },
    { Chantier: "Chantier 3", Statut: "en cours", ChefDeProjet: "David", Priorite: 3, Prev: 6, RAF: 4, Consomme: 2, QA: "Charlie", NatureDuProjet: "Interne", Financement: "Budget IT", Capacite: 80, Debut: "2024-01-01", Fin: "2024-02-15" },
    { Chantier: "Chantier 4", Statut: "clos", ChefDeProjet: "Eve", Priorite: 2, Prev: 6, RAF: -2, Consomme: 8, QA: "David", NatureDuProjet: "Client", Financement: "Facturable", Capacite: 60, Debut: "2024-02-01", Fin: "2024-03-30" },
    { Chantier: "Chantier 5", Statut: "en cours", ChefDeProjet: "Frank", Priorite: 1, Prev: 4, RAF: 3, Consomme: 1, QA: "Eve", NatureDuProjet: "Interne", Financement: "Budget IT", Capacite: 80, Debut: "2024-01-01", Fin: "2024-02-15" },
    { Chantier: "Chantier 6", Statut: "clos", ChefDeProjet: "Grace", Priorite: 2, Prev: 5, RAF: -1, Consomme: 6, QA: "Frank", NatureDuProjet: "Client", Financement: "Facturable", Capacite: 60, Debut: "2024-02-01", Fin: "2024-03-30" },
    { Chantier: "Chantier 7", Statut: "clos", ChefDeProjet: "Henry", Priorite: 1, Prev: 4, RAF: 0, Consomme: 4, QA: "Grace", NatureDuProjet: "Interne", Financement: "Budget IT", Capacite: 80, Debut: "2024-01-01", Fin: "2024-02-15" }
  ];

  const [openPopinInfo, setOpenPopinInfo] = useState(false); // pour la popin d'info chantier
  const [openPopinEdit, setOpenPopinEdit] = useState(false); // pour la popin d'édition chantier
  const [selectedChantier, setSelectedChantier] = useState(null);
  const [page, setPage] = useState(0); // pour la pagination
  const [rowsPerPage, setRowsPerPage] = useState(4); // pour la pagination

  const closePopinInfoChantier = () => setOpenPopinInfo(false);
  const closePopinEditChantier = () => setOpenPopinEdit(false);


  function openPopinInfoChantier(chantier) {
    setSelectedChantier(chantier);
    setOpenPopinInfo(true);
  }

  function openPopinEditChantier(chantier) {
    setSelectedChantier(chantier);
    setOpenPopinEdit(true);
  }

  function getColorByStatut(statut) { // fonction pour déterminer la couleur du statut
    switch (statut) {
      case "en cours":
        return "#009951";
      case "à faire":
        return "#0178A5";
      case "clos":
        return "#9D9D9D";
      default:
        return "transparent";
    }
  }

  function getColorByRAF(raf) { // fonction pour déterminer la couleur du RAF
    if (raf >= 0) return "#009951";
    if (raf < 0) return "#C00F0C";
    return "transparent";
  }

  function handleChangePage(event, newPage) { // pour la pagination
    setPage(newPage);
  }
  const handleChangeRowsPerPage = (event) => { // pour la pagination
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table sx={{ minWidth: 650, borderRadius: 10, }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px" }}>Chantier</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px" }}>Statut</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px" }}>Chef de projet</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px" }}>Priorité</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px" }}>Prévisionnel</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px" }}>Reste à faire</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px" }}>Consommé</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {mockChantier.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((chantier) => (
              <TableRow
                key={chantier.Chantier}
                hover
                sx={{ cursor: "pointer", "&.MuiTableRow-hover:hover": { backgroundColor: alpha("#5DA1BC", 0.2) } }}
                onClick={() => openPopinInfoChantier(chantier)}
              >
                <TableCell align="center" sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  {chantier.Chantier}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "16px", color: getColorByStatut(chantier.Statut), fontWeight: "bold" }}>
                  {chantier.Statut}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "16px" }}>{chantier.ChefDeProjet}</TableCell>
                <TableCell align="center" sx={{ fontSize: "16px" }}>{chantier.Priorite}</TableCell>
                <TableCell align="center" sx={{ fontSize: "16px" }}>{chantier.Prev}</TableCell>
                <TableCell align="center" sx={{ fontSize: "16px", color: getColorByRAF(chantier.RAF), fontWeight: "bold" }}>
                  {chantier.RAF}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "16px" }}>{chantier.Consomme}</TableCell>
                <TableCell align="center" sx={{ color: "#003CFF" }} onClick={(event) => { event.stopPropagation(); openPopinEditChantier(chantier); }}>
                  <EditOutlinedIcon/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={mockChantier.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[4]}
          labelRowsPerPage="Chantiers par page"
        />
      </TableContainer>

      {/* ✅ POPIN */}
      <PopinInfoChantier
        open={openPopinInfo}
        onClose={closePopinInfoChantier}
        chantier={selectedChantier}
      />
      <PopinEditChantier
        open={openPopinEdit}
        onClose={closePopinEditChantier}
        chantier={selectedChantier}
      />
    </>
  );
}
