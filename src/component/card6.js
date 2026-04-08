import { Box, Typography } from "@mui/material";

export default function Card6( {title, value, icon, unit, color} ) {
    return(
    <Box sx={{
        width: 240,
        height: 155,
        backgroundColor: "transparent",
        paddingTop: "15px",
        paddingLeft: "15px",
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        
    }}>
      <div style={{display: "flex", alignItems: "center", gap: "8px", color: {color}, }}>
        <div>
          {icon}
        </div>
        <Typography variant="h6" sx={{ color: {color}, fontSize: "16px", display: "flex", alignItems: "center", gap: "8px", }}>
          {title}
        </Typography>
      </div>
      <Box>
        <Typography variant="h4" sx={{ color: {color}, fontSize: "80px", paddingLeft: "20px", 
        }}>
            {value} 
            <span style={{ fontSize: "18px",  }}> {unit} </span>
        </Typography>
      </Box>
    </Box>
    );
}