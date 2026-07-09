// -----------------------------------------------------------------------------
// CARTE - INDICATEUR CHIFFRÉ AVEC COULEUR DYNAMIQUE (DASHBOARD)
// -----------------------------------------------------------------------------
// Ce composant affiche une carte présentant un indicateur : un titre avec
// icône, et une valeur chiffrée accompagnée de son unité. La couleur du texte
// et de l'icône est personnalisable via la prop `color`. Fond transparent,
// utilisée sur le tableau de bord.
// -----------------------------------------------------------------------------
import { Box, Typography } from "@mui/material";

// -----------------------------------------------------------------------------
// COMPOSANT CARD5
// -----------------------------------------------------------------------------
export default function Card5({ title, value, icon, unit, color }) {
  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <Box sx={{
      width: 225,
      height: 155,
      backgroundColor: "transparent",
      paddingTop: "15px",
      paddingLeft: "15px",
      margin: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
      transition: "transform 0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
      },
    }}>
      {/* ------------------------------------------------------------------- */}
      {/* EN-TÊTE DE LA CARTE - Icône + titre (couleur dynamique) */}
      {/* ------------------------------------------------------------------- */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: { color }, }}>
        <div>
          {icon}
        </div>
        <Typography variant="h6" sx={{ color: { color }, fontSize: "16px", display: "flex", alignItems: "center", gap: "8px", }}>
          {title}
        </Typography>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* VALEUR DE L'INDICATEUR - Chiffre + unité (couleur dynamique) */}
      {/* ------------------------------------------------------------------- */}
      <Box>
        <Typography variant="h4" sx={{
          color: { color }, fontSize: "55px", paddingLeft: "12px", paddingTop: "5px"
        }}>
          {value}
          <span style={{ fontSize: "18px", }}> {unit} </span>
        </Typography>
      </Box>
    </Box>
  );
}