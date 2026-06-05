import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function Card4({title, value, icon}) {
    return(
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
      <div style={{display: "flex", alignItems: "center", gap: "8px", color: "#009951", }}>
        <div>
          {icon}
        </div>
        <Typography variant="h6" sx={{ color: "#009951", fontSize: "16px", display: "flex", alignItems: "center", gap: "8px", }}>
          {title}
        </Typography>
      </div>
      <Box sx={{ paddingLeft: "5px" }}>
        <Typography variant="h4" sx={{ color: "#009951", fontSize: "70px", 
        }}>
            {value} 
        </Typography>
      </Box>
    </Box>
    );
}