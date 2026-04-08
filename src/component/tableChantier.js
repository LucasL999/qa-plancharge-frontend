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
    { Chantier: "Chantier 1", Statut: "en cours", ChefDeProjet: "Bob", Priorite: 2, Prev: 5, RAF: 3, Consomme: 2 },
    { Chantier: "Chantier 2", Statut: "en cours", ChefDeProjet: "Charlie", Priorite: 1, Prev: 4, RAF: 2, Consomme: 1 },
    { Chantier: "Chantier 3", Statut: "en cours", ChefDeProjet: "David", Priorite: 3, Prev: 6, RAF: 4, Consomme: 0 },
    { Chantier: "Chantier 4", Statut: "en cours", ChefDeProjet: "Eve", Priorite: 2, Prev: 5, RAF: 3, Consomme: 3 },
    { Chantier: "Chantier 5", Statut: "en cours", ChefDeProjet: "Frank", Priorite: 1, Prev: 4, RAF: 2, Consomme: 1 },
    { Chantier: "Chantier 6", Statut: "en cours", ChefDeProjet: "Grace", Priorite: 2, Prev: 5, RAF: 3, Consomme: 2 },
    { Chantier: "Chantier 7", Statut: "en cours", ChefDeProjet: "Henry", Priorite: 1, Prev: 4, RAF: 2, Consomme: 0 }
  ];

  const [openPopinInfo, setOpenPopinInfo] = useState(false);
  const [openPopinEdit, setOpenPopinEdit] = useState(false);

  const openPopinInfoChantier = () => setOpenPopinInfo(true);
  const closePopinInfoChantier = () => setOpenPopinInfo(false);
  const openPopinEditChantier = () => setOpenPopinEdit(true);
  const closePopinEditChantier = () => setOpenPopinEdit(false);

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650, borderRadius: 10 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }}>Chantier</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }}>Statut</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }}>Chef de projet</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }}>Priorité</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }}>Prévisionnel</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }}>Reste à faire</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }}>Consommé</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {mockChantier.map((chantier) => (
              <TableRow
                key={chantier.Chantier}
                hover
                sx={{ cursor: "pointer", "&.MuiTableRow-hover:hover": {backgroundColor: alpha("#5DA1BC", 0.2)} }}
                onClick={openPopinInfoChantier}
              >
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  {chantier.Chantier}
                </TableCell>
                <TableCell align="center">{chantier.Statut}</TableCell>
                <TableCell align="center">{chantier.ChefDeProjet}</TableCell>
                <TableCell align="center">{chantier.Priorite}</TableCell>
                <TableCell align="center">{chantier.Prev}</TableCell>
                <TableCell align="center">{chantier.RAF}</TableCell>
                <TableCell align="center">{chantier.Consomme}</TableCell>
                <TableCell align="center" sx={{ color: "#003CFF" }} onClick={(event) => { event.stopPropagation(); openPopinEditChantier(); }}>
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
      />
      <PopinEditChantier
        open={openPopinEdit}
        onClose={closePopinEditChantier}
      />
    </>
  );
}
