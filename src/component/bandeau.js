import { useState } from "react";
import { Box, Divider, Typography, Badge } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect } from "react";

import PopinAlertes from "./popinAlertes"; // ✅ import
import { getNbAlertes } from "../services/chantierService.js";
import { me } from "../services/userService.js";

export default function Bandeau({ title, subtitle, refreshTrigger }) {

  const [open, setOpen] = useState(false);
  const [alertes, setAlertes] = useState(0); // État pour stocker le nombre d'alertes
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await me();
        setEmail(data.email);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  });

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
          backgroundColor: "rgba(1, 120, 165, 0.8)",
          paddingTop: "40px",
          paddingBottom: "12px",
        }}
      >

        {/* Icône notif */}
        <Box sx={{ position: "absolute", top: "50%", right: 24, transform: "translateY(-50%)", display: "flex", alignItems: "flex-start", gap: 3, }}>
          <Badge badgeContent={alertes} color="error" overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{
              "& .MuiBadge-badge": {
                fontSize: '14px',
                height: '18px',
                minWidth: '18px',
              }
            }}>
            <NotificationsOutlinedIcon
              onClick={() => setOpen(true)}
              sx={{
                fontSize: 50,
                color: "#D4DA17",
                cursor: "pointer",
              }}
            />
          </Badge>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <AccountCircleIcon
              sx={{
                fontSize: 45,
                color: "#D4DA17",
              }}
            />

            <Typography variant="body2" sx={{ mt: 0.5, }}>
              {email?.replace(/@.*/, "@...")}
            </Typography>
          </Box>
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