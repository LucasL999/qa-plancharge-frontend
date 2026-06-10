// -----------------------------------------------------------------------------
// PAGE USER - UTILISATEURS
// -----------------------------------------------------------------------------
// Cette page gère la création et l’affichage des utilisateurs.
// Elle inclut :
// - ouverture d’une popin de création
// - rafraîchissement de la table après création
// -----------------------------------------------------------------------------

// UI Material UI
import { Box, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";

// React
import { useState } from "react";

// Composants internes
import Bandeau from "../component/bandeau";
import PopinNewUser from "../component/popinNewUser";
import TableUser from "../component/tableUser";

// Icônes MUI
import PersonAddIcon from "@mui/icons-material/PersonAdd";

// -----------------------------------------------------------------------------
// PAGE USER
// -----------------------------------------------------------------------------
export default function User() {

  // ---------------------------------------------------------------------------
  // STATE - UI
  // ---------------------------------------------------------------------------
  const [openPopin, setOpenPopin] = useState(false);
  const [reloadTable, setReloadTable] = useState(0);

  // ---------------------------------------------------------------------------
  // HANDLERS - POPIN CREATION USER
  // ---------------------------------------------------------------------------
  const openPopinNewUser = () => setOpenPopin(true);

  const closePopinNewUser = (shouldReload = false) => {
    setOpenPopin(false);

    // déclenche un refresh de la table si un utilisateur a été créé
    if (shouldReload) {
      setReloadTable(prev => prev + 1);
    }
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------------------
  return (
    <div>

      <Bandeau
        title="Utilisateurs"
        subtitle="Gestion des utilisateurs et de leurs rôles"
      />

      {/* ACTION BAR */}
      <Box sx={{ display: "flex", padding: "0 60px", paddingTop: "40px" }}>

        <Button
          variant="contained"
          onClick={openPopinNewUser}
          sx={{
            ml: { md: "auto" },
            whiteSpace: "nowrap",
            borderRadius: "100px",
            height: "60px",
            textTransform: "none",
            backgroundColor: alpha("#D4DA17", 0.8),
            color: "black",
            px: 3,
          }}
        >
          <PersonAddIcon sx={{ mr: 1 }} />
          Créer un utilisateur
        </Button>

        <PopinNewUser open={openPopin} onClose={closePopinNewUser} />

      </Box>

      {/* TABLE USERS */}
      <Box sx={{ paddingTop: "40px", margin: "0 60px" }}>
        <TableUser key={reloadTable} />
      </Box>

    </div>
  );
}