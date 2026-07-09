// -----------------------------------------------------------------------------
// CARTE - INDICATEUR CHIFFRÉ AVEC COULEUR DYNAMIQUE, GRAND FORMAT (DASHBOARD)
// -----------------------------------------------------------------------------
// Ce composant affiche une carte présentant un indicateur : un titre avec
// icône, et une valeur chiffrée accompagnée de son unité, mise en avant en
// grand format. La couleur du texte et de l'icône est personnalisable via la
// prop `color`. Fond transparent, utilisée sur le tableau de bord.
// -----------------------------------------------------------------------------
import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// -----------------------------------------------------------------------------
// COMPOSANT CARD6
// -----------------------------------------------------------------------------
export default function Card6({ title, value, icon, unit, color }) {
  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <Box sx={{
      width: 280,
      height: 155,
      backgroundColor: "transparent",
      paddingTop: "15px",
      paddingLeft: "15px",
      margin: "20px",
      display: "flex",
      flexDirection: "column",
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
      {/* VALEUR DE L'INDICATEUR - Chiffre (grand format) + unité (couleur dynamique) */}
      {/* ------------------------------------------------------------------- */}
      <Box>
        <Typography variant="h4" sx={{
          color: { color }, fontSize: "80px", paddingLeft: "12px",
        }}>
          {value}
          <span style={{ fontSize: "18px", }}> {unit} </span>
        </Typography>
      </Box>
    </Box>
  );
}