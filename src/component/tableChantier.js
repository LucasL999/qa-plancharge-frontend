import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

  const [openPopinInfo, setOpenPopinInfo] = useState(false);
  const [openPopinEdit, setOpenPopinEdit] = useState(false);
  const [selectedChantier, setSelectedChantier] = useState(null);

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

  function getColorByStatut(statut) {
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

  function getColorByRAF(raf) {
    if (raf >= 0) return "#009951";
    if (raf < 0) return "#C00F0C";
    return "transparent";
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650, borderRadius: 10 }}>
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
            {mockChantier.map((chantier) => (
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
