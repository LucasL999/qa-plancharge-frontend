import { alpha, Box, Typography } from "@mui/material";

export default function Card1({titre, value, icon}) {
    return(
        <Box sx={{
        width: 370,
        height: 185,
        backgroundColor: alpha("#5DA1BC", 0.2),
        borderRadius: "10px",
        paddingTop: "20px",
        paddingLeft: "20px",
        margin: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        
    }}>
      <Typography variant="h6" sx={{ color: "#5DA1BC", fontSize: "16px",  }}>
        {icon} {titre}
      </Typography>
      <Box sx={{ paddingLeft: "10px", }}>
        <Typography variant="h4" sx={{ color: "#5DA1BC", fontSize: "80px", 
        }}>
            {value} 
            <span style={{ fontSize: "22px",  }}> JH</span>
        </Typography>
      </Box>
    </Box>
    );
}