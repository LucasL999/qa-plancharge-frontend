// -----------------------------------------------------------------------------
// CARTE - INDICATEUR CHIFFRÉ POSITIF (DASHBOARD)
// -----------------------------------------------------------------------------
// Ce composant affiche une carte présentant un indicateur : un titre avec
// icône, et une valeur chiffrée. Version non cliquable, en vert, utilisée
// sur le tableau de bord pour mettre en avant un indicateur positif.
// -----------------------------------------------------------------------------
import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

// -----------------------------------------------------------------------------
// COMPOSANT CARD4
// -----------------------------------------------------------------------------
export default function Card4({ title, value, icon }) {
  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <Box sx={{
      width: 240,
      height: 155,
      backgroundColor: alpha("#CFF7D3", 0.4),
      borderRadius: "10px",
      paddingTop: "15px",
      paddingLeft: "15px",
      margin: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
      },

    }}>
      {/* ------------------------------------------------------------------- */}
      {/* EN-TÊTE DE LA CARTE - Icône + titre */}
      {/* ------------------------------------------------------------------- */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#009951", }}>
        <div>
          {icon}
        </div>
        <Typography variant="h6" sx={{ color: "#009951", fontSize: "16px", display: "flex", alignItems: "center", gap: "8px", }}>
          {title}
        </Typography>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* VALEUR DE L'INDICATEUR */}
      {/* ------------------------------------------------------------------- */}
      <Box sx={{ paddingLeft: "5px" }}>
        <Typography variant="h4" sx={{
          color: "#009951", fontSize: "70px",
        }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}