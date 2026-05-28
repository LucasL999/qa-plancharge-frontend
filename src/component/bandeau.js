import { useState } from "react";
import { Box, Divider, Typography, Badge } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useEffect } from "react";

import PopinAlertes from "./popinAlertes"; // ✅ import
import {getNbAlertes} from "../services/chantierService.js"

export default function Bandeau({ title, subtitle, refreshTrigger }) {

  const [open, setOpen] = useState(false);
  const [alertes, setAlertes] = useState(0); // État pour stocker le nombre d'alertes

  useEffect(() => {
    const fetchNbAlertes = async () => {
      try {
        const data = await getNbAlertes();
        setAlertes(data[0].count); // Met à jour l'état avec le nombre d'alertes
      } catch (error) {
        console.error('Error fetching Nb alertes:', error);
      }
    };

    fetchNbAlertes();
  }, [refreshTrigger]);

  return (
    <>
      {/* Bandeau */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          backgroundColor: "#0178A5",
          paddingTop: "40px",
          paddingBottom: "12px",
        }}
      >

        {/* Icône notif */}
        <Box sx={{ position: "absolute", top: "50%", left: "92%", transform: "translate(-50%, -50%)" }}>
        <Badge badgeContent={alertes} color="error" overlap="circular" 
          anchorOrigin={{vertical: "top", horizontal: "right"}}
          sx={{"& .MuiBadge-badge": {
            top: -9,
            right: -12,
            fontSize: '14px',
            height: '20px',
            minWidth: '20px',
          }}}>
        <NotificationsOutlinedIcon
          onClick={() => setOpen(true)}
          sx={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            fontSize: 55,
            color: "#D4DA17",
            cursor: "pointer",
          }}
        />
        </Badge>
        </Box>

        {/* Titre */}
        <Typography
          align="center"
          sx={{
            fontSize: "50px",
            fontWeight: "bold",
            color: "#F5F7F9",
          }}
        >
          {title}
        </Typography>

        {/* Sous-titre */}
        <Typography
          align="center"
          sx={{
            fontSize: "13px",
            fontWeight: "bold",
            marginTop: "15px",
            color: "#F5F7F9",
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Divider sx={{ width: "100%", border: "1px solid #8d8d8d" }} />

      {/* ✅ Popin séparée */}
      <PopinAlertes
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}