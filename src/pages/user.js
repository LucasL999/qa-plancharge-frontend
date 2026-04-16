import { Box, Button } from "@mui/material";
import Bandeau from "../component/bandeau";
import { alpha } from "@mui/material/styles";
import { useState } from "react";

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PopinNewUser from "../component/popinNewUser";


export default function User() {

  const [openPopin, setOpenPopin] = useState(false);
  
  const openPopinNewUser = () => setOpenPopin(true);
  const closePopinNewUser = () => setOpenPopin(false);
  

  return (
    <div>
    <Bandeau title="Utilisateurs" subtitle="Gestion des utilisateurs et de leurs rôles" />
    <Box>
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
    </div>
  )
};

