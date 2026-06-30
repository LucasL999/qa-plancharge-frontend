import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Card6({ title, value, icon, unit, color }) {
  return (
    <Box sx={{
      width: 280,
      height: 155,
      backgroundColor: "transparent",
      paddingTop: "15px",
      paddingLeft: "15px",
      margin: "20px",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
      transition: "transform 0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
      },

    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: { color }, }}>
        <div>
          {icon}
        </div>
        <Typography variant="h6" sx={{ color: { color }, fontSize: "16px", display: "flex", alignItems: "center", gap: "8px", }}>
          {title}
        </Typography>
      </div>
      <Box>
        <Typography variant="h4" sx={{
          color: { color }, fontSize: "80px", paddingLeft: "12px",
        }}>
          {value}
          <span style={{ fontSize: "18px", }}> {unit} </span>
        </Typography>
      </Box>
    </Box>
  );
}