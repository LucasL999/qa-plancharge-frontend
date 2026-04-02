import { alpha, Box, Typography } from "@mui/material";

export default function Card2({titre, value, icon, unit}) {
    return(
        <Box sx={{
        width: 272,
        height: 180,
        backgroundColor: alpha("#6B6B6B", 0.05),
        borderRadius: "10px",
        paddingTop: "20px",
        paddingLeft: "20px",
        margin: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        
    }}>
      <Typography variant="h6" sx={{ color: "#6B6B6B", fontSize: "16px",  }}>
        {icon} {titre}
      </Typography>
      <Box sx={{ paddingLeft: "10px", }}>
        <Typography variant="h4" sx={{ color: "#6B6B6B", fontSize: "60px", 
        }}>
            {value} 
            <span style={{ fontSize: "18px",  }}> {unit} </span>
        </Typography>
      </Box>
    </Box>
    );
}