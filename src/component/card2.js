import { alpha, Box, Typography } from "@mui/material";

export default function Card2({titre, value, icon, unit, onClick}) {
    return(
        <Box 
          onClick={onClick}
          sx={{
        width: 272,
        height: 180,
        backgroundColor: alpha("#6B6B6B", 0.05),
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
      <div style={{display: "flex", alignItems: "center", gap: "8px", color: "#6B6B6B", }}>
        <div>
          {icon}
        </div>
        <Typography variant="h6" sx={{ color: "#6B6B6B", fontSize: "16px", display: "flex", alignItems: "center", gap: "8px", }}>
          {titre}
        </Typography>
      </div>
      <Box sx={{ paddingLeft: "0px", paddingBottom: "5px", display: "flex", alignItems: "baseline", gap: 1, whiteSpace: "nowrap", }}>
        <Typography variant="h4" sx={{ color: "#6B6B6B", fontSize: "60px", 
        }}>
          {value} 
        </Typography>
        <Typography sx={{ fontSize: "18px", color: "#6B6B6B", }}>
          {unit}
        </Typography>
      </Box>
    </Box>
    );
}