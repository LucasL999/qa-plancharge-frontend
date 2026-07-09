// -----------------------------------------------------------------------------
// CARTE - INDICATEUR CHIFFRÉ (DASHBOARD)
// -----------------------------------------------------------------------------
// Ce composant affiche une carte cliquable présentant un indicateur : un titre
// avec icône, et une valeur chiffrée mise en avant (exprimée en Jours-Homme).
// Utilisée sur le tableau de bord pour résumer des données en un coup d'œil.
// -----------------------------------------------------------------------------
import { alpha, Box, Typography } from "@mui/material";

// -----------------------------------------------------------------------------
// COMPOSANT CARD1
// -----------------------------------------------------------------------------
export default function Card1({ titre, value, icon, onClick }) {
  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 370,
        height: 185,
        backgroundColor: alpha("#5DA1BC", 0.2),
        borderRadius: "10px",
        paddingTop: "15px",
        paddingLeft: "15px",
        margin: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
        },

      }}>
      {/* ------------------------------------------------------------------- */}
      {/* EN-TÊTE DE LA CARTE - Icône + titre */}
      {/* ------------------------------------------------------------------- */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#0178A5", }}>
        <div>
          {icon}
        </div>
        <Typography variant="h6" sx={{ color: "#0178A5", fontSize: "16px", display: "flex", alignItems: "center", gap: "8px", }}>
          {titre}
        </Typography>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* VALEUR DE L'INDICATEUR - Chiffre principal + unité (JH) */}
      {/* ------------------------------------------------------------------- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start", // ✅ alignement à droite
          alignItems: "baseline",
          whiteSpace: "nowrap",
          paddingRight: "20px",
        }}
      >
        <Typography
          component="span"
          sx={{
            fontSize: "80px",
            fontWeight: 500,
            color: "#0178A5",
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.5px",
            textAlign: "right",
            marginTop: "10px"
          }}
        >
          {value}
        </Typography>

        <Typography
          component="span"
          sx={{
            marginLeft: "8px",
            fontSize: "22px",
            fontWeight: 400,
            color: "#0178A5",
          }}
        >
          JH
        </Typography>
      </Box>
    </Box>
  );
}