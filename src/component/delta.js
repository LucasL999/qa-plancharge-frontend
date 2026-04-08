import { alpha, Box, Typography } from "@mui/material";
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Delta({onClick}){
  return (
    <Box 
      onClick={onClick}
      sx={{
        width: 470,
        height: 400,
        backgroundColor: alpha("#CFF7D3", 0.5),
        borderRadius: "10px",
        padding: "15px",
        margin: "15px",
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
      <div style={{display: "flex", alignItems: "center", gap: "12px", color: "#009951", }}>
              <ChangeHistoryIcon sx={{fontSize: 70}} />
              <Typography variant="h6" sx={{ color: "#009951", fontSize: "50px", display: "flex", alignItems: "center", gap: "8px", }}>
                Delta
              </Typography>
            </div>
      <Box sx={{ paddingLeft: "5px", }}>
      <Typography variant="h4" sx={{ color: alpha("#009951", 0.7), fontWeight: "bold", fontSize: "150px", 
       }}>
        760
      </Typography>
      <Typography variant="body1" sx={{ color: "#009951", gap: "8px", display: "flex", alignItems: "center", fontSize: "18px", }}>
        <InfoOutlinedIcon sx={{fontSize: 20 }} />
        Différence entre capacité disponible et RAF
      </Typography>
      </Box> 
    </Box>
  );
} 