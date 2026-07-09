// -----------------------------------------------------------------------------
// TABLEAU DES CHANTIERS
// -----------------------------------------------------------------------------
// Ce composant affiche la liste des chantiers avec leurs informations
// principales. Il permet la recherche, le filtrage, la pagination ainsi que
// la consultation, la modification et la suppression d'un chantier.
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// COMPOSANT TABLETEAM
// -----------------------------------------------------------------------------
export default function TableTeam({
  onChantierUpdated,
  onChantierModifie,
  onChantierSupprime,
  filtres,
  search,
  selectedId
}) {

  // ---------------------------------------------------------------------------
  // STATE - Liste des chantiers
  // ---------------------------------------------------------------------------
  const [chantiers, setChantiers] = useState([]);

  // ---------------------------------------------------------------------------
  // NORMALISATION DES CHAÎNES
  // Permet une recherche insensible aux accents et à la casse.
  // ---------------------------------------------------------------------------
  const normalize = (str) =>
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // ---------------------------------------------------------------------------
  // FILTRAGE DES CHANTIERS
  // Application des filtres (identifiant, recherche, statut, priorité et QA).
  // ---------------------------------------------------------------------------
  const filteredChantiers = chantiers.filter(chantier => {
    if (selectedId && chantier.id_chantier !== selectedId) return false;
    if (search && !normalize(chantier.titre).includes(normalize(search))) return false;
    if (filtres?.statuts?.length > 0 && !filtres.statuts.includes(String(chantier.id_statut))) return false;
    if (filtres?.priorites?.length > 0 && !filtres.priorites.includes(String(chantier.id_priorite))) return false;

    if (filtres?.qa?.length > 0) {
      const hasMatchingQa = chantier.qas?.some(q => filtres.qa.includes(String(q.id)));
      if (!hasMatchingQa) return false;
    }

    return true;
  });

  // ---------------------------------------------------------------------------
  // RÉCUPÉRATION DES CHANTIERS
  // ---------------------------------------------------------------------------
  const fetchChantier = async () => {
    try {
      const res = await getChantier();
      setChantiers(res);
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------------------------------------------------------------------
  // EFFECT - Chargement initial des chantiers
  // ---------------------------------------------------------------------------
  useEffect(() => {
    fetchChantier();
  }, []);

  // ---------------------------------------------------------------------------
  // STATE - Gestion des fenêtres modales
  // ---------------------------------------------------------------------------
  const [openPopinInfo, setOpenPopinInfo] = useState(false);
  const [openPopinEdit, setOpenPopinEdit] = useState(false);
  const [openPopinDelete, setOpenPopinDelete] = useState(false);

  // Chantier actuellement sélectionné
  const [selectedChantier, setSelectedChantier] = useState(null);

  // ---------------------------------------------------------------------------
  // STATE - Pagination
  // ---------------------------------------------------------------------------
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ---------------------------------------------------------------------------
  // FERMETURE DES FENÊTRES MODALES
  // ---------------------------------------------------------------------------
  const closePopinInfoChantier = () => setOpenPopinInfo(false);

  const closePopinDeleteChantier = async () => {
    setSelectedChantier(null);
    setOpenPopinDelete(false);
    await fetchChantier();
    onChantierUpdated?.();
  };

  const closePopinEditChantier = async () => {
    setOpenPopinEdit(false);
    setSelectedChantier(null);
    await fetchChantier();
    onChantierUpdated?.();
  };

  // ---------------------------------------------------------------------------
  // OUVERTURE DES FENÊTRES MODALES
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // COULEUR DU STATUT
  // ---------------------------------------------------------------------------
  function getColorByStatut(statut) {
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

  // ---------------------------------------------------------------------------
  // COULEUR DU RESTE À FAIRE (RAF)
  // ---------------------------------------------------------------------------
  function getColorByRAF(raf) {
    if (raf >= 0) return "#009951";
    if (raf < 0) return "#C00F0C";
    return "black";
  }

  // ---------------------------------------------------------------------------
  // GESTION DE LA PAGINATION
  // ---------------------------------------------------------------------------
  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <>
      <TableContainer sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table sx={{ minWidth: 650, borderRadius: 10 }}>

          {/* ----------------------------------------------------------------- */}
          {/* EN-TÊTE DU TABLEAU */}
          {/* ----------------------------------------------------------------- */}
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgba(1, 120, 165, 0.8)" }}>
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

          {/* ----------------------------------------------------------------- */}
          {/* CORPS DU TABLEAU - Affichage des chantiers filtrés */}
          {/* ----------------------------------------------------------------- */}
          <TableBody>
            {filteredChantiers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((chantier) => (
                <TableRow
                  key={chantier.id_chantier}
                  hover
                  sx={{
                    cursor: "pointer",
                    "&.MuiTableRow-hover:hover": {
                      backgroundColor: alpha("#5DA1BC", 0.2)
                    }
                  }}
                  onClick={() => openPopinInfoChantier(chantier)}
                >
                  <TableCell align="center" sx={{ fontSize: "16px", fontWeight: "bold" }}>
                    {chantier.titre}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "16px",
                      color: getColorByStatut(chantier.stat),
                      fontWeight: "bold"
                    }}
                  >
                    {chantier.stat}
                  </TableCell>

                  <TableCell align="center">{chantier.cp || "N/A"}</TableCell>
                  <TableCell align="center">{chantier.prio || "N/A"}</TableCell>
                  <TableCell align="center">{chantier.prev || 0}</TableCell>
                  <TableCell align="center">{chantier.cons ?? 0}</TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "18px",
                      color: getColorByRAF(chantier.prev - chantier.cons ?? 0),
                      fontWeight: "bold"
                    }}
                  >
                    {chantier.prev - chantier.cons ?? 0}
                  </TableCell>

                  {/* Action : modification */}
                  <TableCell
                    align="center"
                    sx={{ color: "#003CFF" }}
                    onClick={(event) => {
                      event.stopPropagation();
                      openPopinEditChantier(chantier);
                    }}
                  >
                    <EditIcon />
                  </TableCell>

                  {/* Action : suppression */}
                  <TableCell
                    align="center"
                    sx={{ color: "#ff0000" }}
                    onClick={(event) => {
                      event.stopPropagation();
                      openPopinDeleteChantier(chantier);
                    }}
                  >
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* ----------------------------------------------------------------- */}
        {/* PAGINATION */}
        {/* ----------------------------------------------------------------- */}
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

      {/* ----------------------------------------------------------------- */}
      {/* FENÊTRES MODALES */}
      {/* ----------------------------------------------------------------- */}
      <PopinInfoChantier
        open={openPopinInfo}
        onClose={closePopinInfoChantier}
        chantier={selectedChantier}
      />

      <PopinEditChantier
        open={openPopinEdit}
        onClose={closePopinEditChantier}
        chantier={selectedChantier}
        onUpdated={onChantierModifie}
      />

      <PopinDeleteChantier
        open={openPopinDelete}
        onClose={closePopinDeleteChantier}
        chantier={selectedChantier}
        onDeleted={onChantierSupprime}
      />
    </>
  );
}
