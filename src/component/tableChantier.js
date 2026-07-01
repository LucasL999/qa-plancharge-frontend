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
import { useState, useEffect } from "react";
import { getChantier } from "../services/chantierService.js"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import PopinInfoChantier from "./popinInfoChantier";
import PopinEditChantier from "./popinEditChantier";
import PopinDeleteChantier from "./popinDeleteChantier";

export default function TableTeam({ onChantierUpdated, filtres, search, selectedId }) {
  const [chantiers, setChantiers] = useState([]);

  const normalize = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filteredChantiers = chantiers.filter(chantier => {
    if (selectedId && chantier.id_chantier !== selectedId) { return false; }
    if (search && !normalize(chantier.titre).includes(normalize(search))) { return false; }
    if (filtres?.statuts?.length > 0 && !filtres.statuts.includes(String(chantier.id_statut))) { return false; }
    if (filtres?.priorites?.length > 0 && !filtres.priorites.includes(String(chantier.id_priorite))) { return false; }
    if (filtres?.qa?.length > 0) {
      const hasMatchingQa = chantier.qas?.some(q => filtres.qa.includes(String(q.id)));
      if (!hasMatchingQa) { return false; }
    }
    return true;
  });

  const fetchChantier = async () => {
    try {
      const res = await getChantier();
      setChantiers(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChantier();
  }, []);


  const [openPopinInfo, setOpenPopinInfo] = useState(false); // pour la popin d'info chantier
  const [openPopinEdit, setOpenPopinEdit] = useState(false); // pour la popin d'édition chantier
  const [openPopinDelete, setOpenPopinDelete] = useState(false);
  const [selectedChantier, setSelectedChantier] = useState(null);
  const [page, setPage] = useState(0); // pour la pagination
  const [rowsPerPage, setRowsPerPage] = useState(5); // pour la pagination

  const closePopinInfoChantier = () => setOpenPopinInfo(false);
  const closePopinDeleteChantier = async () => {
    setSelectedChantier(null);
    setOpenPopinDelete(false);
    await fetchChantier();
    onChantierUpdated?.();
  }
  const closePopinEditChantier = async () => {
    setOpenPopinEdit(false);
    setSelectedChantier(null);
    await fetchChantier();
    onChantierUpdated?.(); // Notifie le parent que le chantier a été mis à jour
  }

  function openPopinInfoChantier(chantier) {
    setSelectedChantier(chantier);
    setOpenPopinInfo(true);
  }

  function openPopinEditChantier(chantier) {
    setSelectedChantier(chantier);
    setOpenPopinEdit(true);
  }

  function openPopinDeleteChantier(chantier) {
    setSelectedChantier(chantier);
    setOpenPopinDelete(true);
  } 

  function getColorByStatut(statut) { // fonction pour déterminer la couleur du statut
    switch (statut) {
      case "En cours":
        return "#009951";
      case "A faire":
        return "#0178A5";
      case "Clos":
        return "#9D9D9D";
      default:
        return "black";
    }
  }

  function getColorByRAF(raf) { // fonction pour déterminer la couleur du RAF
    if (raf >= 0) return "#009951";
    if (raf < 0) return "#C00F0C";
    return "black";
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
            <TableRow sx={{backgroundColor: "rgba(1, 120, 165, 0.8)"}}>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>CHANTIER</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>Statut</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>Chef de projet</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>Priorité</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>Prévisionnel</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>Consommé</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>Reste à faire</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredChantiers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((chantier) => (
              <TableRow
                key={chantier.id_chantier}
                hover
                sx={{ cursor: "pointer", "&.MuiTableRow-hover:hover": { backgroundColor: alpha("#5DA1BC", 0.2) } }}
                onClick={() => openPopinInfoChantier(chantier)}
              >
                <TableCell align="center" sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  {chantier.titre}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "16px", color: getColorByStatut(chantier.stat), fontWeight: "bold" }}>
                  {chantier.stat}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "16px" }}>{chantier.cp || "N/A"}</TableCell>
                <TableCell align="center" sx={{ fontSize: "16px" }}>{chantier.prio || "N/A"}</TableCell>
                <TableCell align="center" sx={{ fontSize: "16px" }}>{chantier.prev || 0}</TableCell>
                <TableCell align="center" sx={{ fontSize: "16px" }}>{chantier.cons ?? 0}</TableCell>
                <TableCell align="center" sx={{ fontSize: "18px", color: getColorByRAF(chantier.prev - chantier.cons ?? 0), fontWeight: "bold" }}>
                  {chantier.prev - chantier.cons ?? 0}
                </TableCell>
                <TableCell align="center" sx={{ color: "#003CFF" }} onClick={(event) => { event.stopPropagation(); openPopinEditChantier(chantier); }}>
                  <EditIcon />
                </TableCell>
                <TableCell align="center" sx={{ color: "#ff0000" }} onClick={(event) => {event.stopPropagation(); openPopinDeleteChantier(chantier); }}>
                  <DeleteIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredChantiers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[6]}
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
      <PopinDeleteChantier
        open={openPopinDelete}
        onClose={closePopinDeleteChantier}
        chantier={selectedChantier}
      />
    </>
  );
}
