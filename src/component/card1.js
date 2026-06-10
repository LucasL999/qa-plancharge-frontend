import { alpha, Box, Typography } from "@mui/material";

export default function Card1({ titre, value, icon, onClick }) {
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
      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#0178A5", }}>
        <div>
          {icon}
        </div>
        <Typography variant="h6" sx={{ color: "#0178A5", fontSize: "16px", display: "flex", alignItems: "center", gap: "8px", }}>
          {titre}
        </Typography>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // ✅ alignement à droite
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