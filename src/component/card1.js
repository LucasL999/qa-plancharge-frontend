import { alpha, Box, Typography } from "@mui/material";

export default function Card1({titre, value, icon, onClick}) {
    return(
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
      <div style={{display: "flex", alignItems: "center", gap: "8px", color: "#5DA1BC", }}>
              <div>
                {icon}
              </div>
              <Typography variant="h6" sx={{ color: "#5DA1BC", fontSize: "16px", display: "flex", alignItems: "center", gap: "8px", }}>
                {titre}
              </Typography>
            </div>
      <Box sx={{ paddingLeft: "30px", }}>
        <Typography variant="h4" sx={{ color: "#5DA1BC", fontSize: "80px", 
        }}>
            {value} 
            <span style={{ fontSize: "22px",  }}> JH</span>
        </Typography>
      </Box>
    </Box>
    );
}