import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function Card3({title, value, icon}) {
    return(
        <Box sx={{
        width: 240,
        height: 155,
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
      <Typography variant="h6" sx={{ color: "black", fontSize: "16px",  }}>
        {icon} {title}
      </Typography>
      <Box>
        <Typography variant="h4" sx={{ color: "black", fontSize: "70px", 
        }}>
            {value} 
        </Typography>
      </Box>
    </Box>
    );
}