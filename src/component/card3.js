import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function Card3({title, value, icon, unit, onClick}) {
    return(
        <Box
          onClick={onClick} 
          sx={{
        width: 240,
        height: 155,
        backgroundColor: alpha("#6B6B6B", 0.05),
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
        cursor: "pointer"
    }}>
      <div style={{display: "flex", alignItems: "center", gap: "8px", color: "#0178A5", }}>
        <div>
          {icon}
        </div>
        <Typography variant="h6" sx={{ color: "#0178A5", fontSize: "16px", display: "flex", alignItems: "center", gap: "8px", }}>
          {title}
        </Typography>
      </div>
      <Box sx={{ paddingLeft: "5px", display: "flex", alignItems: "baseline", gap: 1, whiteSpace: "nowrap", }}>
        <Typography variant="h4" sx={{ color: "#0178A5", fontSize: "70px", 
        }}>
            {value}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#0178A5", fontSize: "18px", marginTop: "-10px" }}>
            {unit}
        </Typography>
      </Box>
    </Box>
    );
}