import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function Card4({title, value, icon}) {
    return(
        <Box sx={{
        width: 240,
        height: 155,
        backgroundColor: alpha("#CFF7D3", 0.4),
        borderRadius: "10px",
        paddingTop: "20px",
        paddingLeft: "20px",
        margin: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        
    }}>
      <Typography variant="h6" sx={{ color: "#009951", fontSize: "16px",  }}>
        {icon} {title}
      </Typography>
      <Box>
        <Typography variant="h4" sx={{ color: "#009951", fontSize: "70px", 
        }}>
            {value} 
        </Typography>
      </Box>
    </Box>
    );
}