import { alpha, Box, Typography } from "@mui/material";
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { useState, useEffect } from "react";

export default function Delta({ value, onClick }) {

  const isReady = value !== undefined && value !== null;

  const color = isReady ? value >= 0 ? "#009951" : "#FF0000" : "transparent";
  const backgroundColor = isReady ? value >= 0 ? alpha("#CFF7D3", 0.5) : alpha("#FF0000", 0.1) : "transparent";
  const [text, setText] = useState("");

  useEffect(() => {
    if (value >= 0) {
      setText("La capacité QA couvre le RAF avec une marge de " + value);
    } else {
      setText("La capacité QA ne couvre plus le RAF");
    }
  }, [value]);
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 470,
        height: 400,
        backgroundColor: backgroundColor,
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
      <div style={{ display: "flex", alignItems: "center", gap: "12px", color: color, }}>
        <ChangeHistoryIcon sx={{ fontSize: 70 }} />
        <Typography variant="h6" sx={{ color: color, fontSize: "50px", display: "flex", alignItems: "center", gap: "8px", }}>
          Delta
        </Typography>
      </div>
      <Box sx={{ paddingLeft: "5px", }}>
        <Typography variant="h4" sx={{
          color: alpha(color, 0.7), fontWeight: "bold", fontSize: "150px",
        }}>
          {value}
        </Typography>
        <Typography variant="body1" sx={{ color: color, gap: "8px", display: "flex", alignItems: "center", fontSize: "14px", }}>
          <InfoOutlinedIcon sx={{ fontSize: 18 }} />
          Différence entre la capacité QA disponible et le RAF.
        </Typography>
        <Typography variant="body1" sx={{ color: color, gap: "8px", display: "flex", alignItems: "center", fontSize: "14px", }}>
          <InfoOutlinedIcon sx={{ fontSize: 18 }} />
          {text}
        </Typography>
      </Box>
    </Box>
  );
} 