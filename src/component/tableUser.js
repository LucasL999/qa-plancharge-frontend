// -----------------------------------------------------------------------------
// TABLEAU DES UTILISATEURS
// -----------------------------------------------------------------------------
// Ce composant affiche la liste des utilisateurs, permet leur modification
// ou leur suppression via des fenêtres modales, puis rafraîchit les données
// après chaque opération.
// -----------------------------------------------------------------------------

import { alpha, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";
import PopinEditUser from "./popinEditUser";
import PopinDeleteUser from "./popinDeleteUser";

// -----------------------------------------------------------------------------
// COMPOSANT TABLEUSER
// -----------------------------------------------------------------------------
export default function TableUser() {

  // ---------------------------------------------------------------------------
  // STATE - Liste des utilisateurs
  // ---------------------------------------------------------------------------
  const [users, setUsers] = useState([]);

  // ---------------------------------------------------------------------------
  // RÉCUPÉRATION DE TOUS LES UTILISATEURS
  // ---------------------------------------------------------------------------
  const fetchAllUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res);
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------------------------------------------------------------------
  // EFFECT - Chargement initial des utilisateurs
  // ---------------------------------------------------------------------------
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // ---------------------------------------------------------------------------
  // STATE - Gestion de la fenêtre d'édition
  // ---------------------------------------------------------------------------
  const [openPopinEdit, setOpenPopinEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Ouverture de la fenêtre d'édition
  const openPopinEditUser = (user) => {
    setSelectedUser(user);
    setOpenPopinEdit(true);
  };

  // Fermeture de la fenêtre d'édition et actualisation des données
  const closePopinEditUser = () => {
    setOpenPopinEdit(false);
    setSelectedUser(null);
    fetchAllUsers();
  };

  // ---------------------------------------------------------------------------
  // STATE - Gestion de la fenêtre de suppression
  // ---------------------------------------------------------------------------
  const [openPopinDelete, setOpenPopinDelete] = useState(false);

  // Ouverture de la fenêtre de confirmation de suppression
  const openPopinDeleteUser = (user) => {
    setSelectedUser(user);
    setOpenPopinDelete(true);
  };

  // Fermeture de la fenêtre de suppression et actualisation des données
  const closePopinDeleteUser = () => {
    setOpenPopinDelete(false);
    setSelectedUser(null);
    fetchAllUsers();
  };

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
              UTILISATEUR
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px", color: "white" }}>
              Email
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px", color: "white" }}>
              Rôle
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px", color: "white" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        {/* ------------------------------------------------------------------- */}
        {/* CORPS DU TABLEAU - Affichage de chaque utilisateur */}
        {/* ------------------------------------------------------------------- */}
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{
                ":hover": {
                  backgroundColor: alpha("#5DA1BC", 0.2),
                  cursor: "pointer"
                }
              }}
            >
              <TableCell align="center" sx={{ color: "#0178A5", fontWeight: "bold" }}>
                {user.name} {user.firstname}
              </TableCell>

              <TableCell align="center" sx={{ color: "#009951", fontWeight: "bold" }}>
                {user.email}
              </TableCell>

              <TableCell align="center" sx={{ color: "#6B6B6B", fontWeight: "bold" }}>
                {user.libelle}
              </TableCell>

              {/* Actions disponibles sur un utilisateur */}
              <TableCell align="center" sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                <Box sx={{ display: "flex", gap: 3 }}>

                  <Tooltip title="Modifier">
                    <EditIcon
                      sx={{ color: "#003CFF" }}
                      onClick={() => openPopinEditUser(user)}
                    />
                  </Tooltip>

                  <Tooltip title="Supprimer">
                    <DeleteIcon
                      sx={{ color: "#ff0000" }}
                      onClick={() => openPopinDeleteUser(user)}
                    />
                  </Tooltip>

                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>

      {/* ------------------------------------------------------------------- */}
      {/* Fenêtres modales d'édition et de suppression */}
      {/* ------------------------------------------------------------------- */}
      <PopinEditUser
        open={openPopinEdit}
        onClose={closePopinEditUser}
        userData={selectedUser}
      />

      <PopinDeleteUser
        open={openPopinDelete}
        onClose={closePopinDeleteUser}
        userData={selectedUser}
      />
    </TableContainer>
  );
}
