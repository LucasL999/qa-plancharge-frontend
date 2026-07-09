// -----------------------------------------------------------------------------
// BANDEAU - EN-TÊTE DE PAGE
// -----------------------------------------------------------------------------
// Ce composant affiche le bandeau supérieur de l'application : titre, sous-titre,
// icône de notifications (avec badge du nombre d'alertes) et email de
// l'utilisateur connecté. Il ouvre également la popin listant les alertes.
// -----------------------------------------------------------------------------
import { useState } from "react";
import { Box, Divider, Typography, Badge } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect } from "react";

import PopinAlertes from "./popinAlertes"; // ✅ import
import { getNbAlertes } from "../services/chantierService.js";
import { me } from "../services/userService.js";

// -----------------------------------------------------------------------------
// COMPOSANT BANDEAU
// -----------------------------------------------------------------------------
export default function Bandeau({ title, subtitle, refreshTrigger }) {

  // ---------------------------------------------------------------------------
  // STATE - Ouverture de la popin, nombre d'alertes, email de l'utilisateur
  // ---------------------------------------------------------------------------
  const [open, setOpen] = useState(false);
  const [alertes, setAlertes] = useState(0); // État pour stocker le nombre d'alertes
  const [email, setEmail] = useState("");

  // ---------------------------------------------------------------------------
  // EFFECT - Récupère les informations de l'utilisateur connecté (email)
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // EFFECT - Récupère le nombre d'alertes à afficher sur le badge
  // Se relance à chaque changement de refreshTrigger (transmis par le parent)
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <>
      {/* ------------------------------------------------------------------- */}
      {/* Bandeau */}
      {/* ------------------------------------------------------------------- */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          backgroundColor: "rgba(1, 120, 165, 0.8)",
          paddingTop: "40px",
          paddingBottom: "12px",
        }}
      >

        {/* Icône notif + compte utilisateur */}
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

            {/* Email masqué : n'affiche que la partie avant le "@" */}
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

      {/* ------------------------------------------------------------------- */}
      {/* POPIN DES ALERTES */}
      {/* ------------------------------------------------------------------- */}
      {/* ✅ Popin séparée */}
      <PopinAlertes
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}