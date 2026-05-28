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
import {getChantier} from "../services/chantierService.js"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import PopinInfoChantier from "./popinInfoChantier"; 
import PopinEditChantier from "./popinEditChantier";

export default function TableTeam({ onChantierUpdated, filtres, search }) {
  const [chantiers, setChantiers] = useState([]);

  const filteredChantiers = chantiers.filter(chantier => {
    if(search && !chantier.titre.toLowerCase().includes(search.toLowerCase())) {return false;}
    if(filtres?.statuts?.length > 0 && !filtres.statuts.includes(String(chantier.id_statut))) {return false;}
    if(filtres?.priorites?.length > 0 && !filtres.priorites.includes(String(chantier.id_priorite))) {return false;}
    if(filtres?.qa?.length > 0) {
      const hasMatchingQa = chantier.qas?.some(q => filtres.qa.includes(String(q.id)));
      if(!hasMatchingQa) {return false;}
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
  const [selectedChantier, setSelectedChantier] = useState(null);
  const [page, setPage] = useState(0); // pour la pagination
  const [rowsPerPage, setRowsPerPage] = useState(6); // pour la pagination

  const closePopinInfoChantier = () => setOpenPopinInfo(false);
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
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px" }}>Chantier</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px" }}>Statut</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px" }}>Chef de projet</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px" }}>Priorité</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px" }}>Prévisionnel</TableCell> 
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px" }}>Consommé</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px" }}>Reste à faire</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredChantiers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((chantier) => (
              <TableRow
                key={chantier.titre}
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
                <TableCell align="center" sx={{ fontSize: "18px", color: getColorByRAF(chantier.prev-chantier.cons ?? 0), fontWeight: "bold" }}>
                  {chantier.prev-chantier.cons ?? 0}
                </TableCell>
                <TableCell align="center" sx={{ color: "#003CFF" }} onClick={(event) => { event.stopPropagation(); openPopinEditChantier(chantier); }}>
                  <EditOutlinedIcon/>
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
    </>
  );
}
