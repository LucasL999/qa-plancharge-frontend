import { alpha, Box, Typography } from "@mui/material";

export default function Delta(){
  return (
    <Box sx={{
        width: 470,
        height: 400,
        backgroundColor: alpha("#CFF7D3", 0.5),
        borderRadius: "10px",
        padding: "20px",
        margin: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    }}>
      <Typography variant="h6" sx={{ color: "#009951", fontSize: "30px",  }}>
        X Delta
      </Typography>
      <Box sx={{ paddingLeft: "20px", }}>
      <Typography variant="h4" sx={{ color: alpha("#009951", 0.7), fontWeight: "bold", fontSize: "150px", 
       }}>
        760
      </Typography>
      <Typography variant="body1" sx={{ color: "#009951",}}>
        Différence entre capacité disponible et RAF
      </Typography>
      </Box> 
    </Box>
  );
} 