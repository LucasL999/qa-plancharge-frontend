// PAGE USER - Utilisateurs

// Importations des bibliothèques et composants nécessaires
import { Box, Button } from "@mui/material";
import Bandeau from "../component/bandeau";
import { alpha } from "@mui/material/styles";
import { useState } from "react";

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PopinNewUser from "../component/popinNewUser";
import TableUser from "../component/tableUser";

// DEBUT PAGE
export default function User() {

  const [openPopin, setOpenPopin] = useState(false); // Ouverture de la popin newUser 
  const [reloadTable, setReloadTable] = useState(0); // Permet de reload la page après la création d'un nouvel utilisateur
  
  const openPopinNewUser = () => setOpenPopin(true);
  const closePopinNewUser = (shouldReload = false) => {
    setOpenPopin(false);
    if (shouldReload) {
      setReloadTable(prev => prev + 1);
    }
  };

  return (
    <div>
    <Bandeau title="Utilisateurs" subtitle="Gestion des utilisateurs et de leurs rôles" />
    <Box sx={{ display: "flex", padding: "0 60px", paddingTop: "40px" }}>
      {/* Bouton principal (CTA) */}
      <Button
        variant="contained"
        sx={{
        ml: { md: "auto" }, // pousse à droite sur desktop
        whiteSpace: "nowrap",
        borderRadius: "100px",
        height: "60px",
        textTransform: "none",
        backgroundColor: alpha("#D4DA17", 0.8),
        color: "black",
        px: 3,
        }}
        onClick={openPopinNewUser}
      >
        <PersonAddIcon sx={{ mr: 1 }} />
        Créer un utilisateur
      </Button>
      <PopinNewUser open={openPopin} onClose={closePopinNewUser} />
    </Box>
    <Box sx={{ paddingTop: "40px", paddingBottom: "40px", margin: "0 60px", }}>
      <TableUser key={reloadTable} />
    </Box>
    </div>
  )
};
// FIN PAGE
