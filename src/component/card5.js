import { Box, Typography } from "@mui/material";

export default function Card5( {title, value, icon, unit, color} ) {
    return(
    <Box sx={{
        width: 240,
        height: 155,
        backgroundColor: "transparent",
        paddingTop: "20px",
        paddingLeft: "20px",
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        
    }}>
      <Typography variant="h6" sx={{ color: {color}, fontSize: "16px",  }}>
        {icon} {title}
      </Typography>
      <Box>
        <Typography variant="h4" sx={{ color: {color}, fontSize: "60px", paddingLeft: "20px", 
        }}>
            {value} 
            <span style={{ fontSize: "18px",  }}> {unit} </span>
        </Typography>
      </Box>
    </Box>
    );
}