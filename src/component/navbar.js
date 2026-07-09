// -----------------------------------------------------------------------------
// BARRE DE NAVIGATION
// -----------------------------------------------------------------------------
// Ce composant affiche le menu latéral de l'application. Il permet de naviguer
// entre les différents modules et de se déconnecter.
// -----------------------------------------------------------------------------

import { NavLink } from "react-router-dom";
import { Box, Button, Divider } from "@mui/material";

import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ConstructionIcon from "@mui/icons-material/Construction";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import logo from "../img/logo.png";

// -----------------------------------------------------------------------------
// COMPOSANT NAVBAR
// -----------------------------------------------------------------------------
export default function Navbar({ onLogout }) {

  // ---------------------------------------------------------------------------
  // CONFIGURATION DES ÉLÉMENTS DU MENU
  // Chaque entrée contient son libellé, sa route et son icône.
  // ---------------------------------------------------------------------------
  const navItems = [
    { label: "Dashboard", path: "/", icon: <HomeFilledIcon /> },
    { label: "Chantiers", path: "/chantier", icon: <ConstructionIcon /> },
    { label: "Plan de charge", path: "/team", icon: <GroupsIcon /> },
    { label: "Calendrier", path: "/calendar", icon: <CalendarMonthIcon /> },
    { label: "Utilisateurs", path: "/user", icon: <PersonIcon /> },
  ];

  // ---------------------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------------------
  return (
    <nav
      className="sidebar"
      style={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "20px",
        backgroundColor: "#f4f4f4",
        display: "flex",
        flexDirection: "column",
        borderRight: "2px solid #8d8d8d",
      }}
    >

      {/* ------------------------------------------------------------------- */}
      {/* LOGO DE L'APPLICATION */}
      {/* ------------------------------------------------------------------- */}
      <img
        src={logo}
        alt="logo"
        style={{
          display: "block",
          margin: "0 auto",
          marginBottom: "18px",
          width: "40%",
          height: "auto",
        }}
      />

      <Divider sx={{ marginBottom: "20px", border: "1px solid #8d8d8d" }} />

      {/* ------------------------------------------------------------------- */}
      {/* MENU DE NAVIGATION */}
      {/* Mise en évidence de la page actuellement active */}
      {/* ------------------------------------------------------------------- */}
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          fontSize: "25px",
          fontWeight: "bold",
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "12px",
              width: "calc(100% + 40px)",
              marginLeft: "-20px",
              borderLeft: isActive ? "5px solid #0178A5" : "none",
              paddingTop: "5px",
              paddingBottom: "5px",
              paddingLeft: "20px",
              textDecoration: "none",
              color: isActive ? "#0178A5" : "#333333",
              backgroundColor: isActive ? "#dceff7" : "transparent",
            })}
          >
            {({ isActive }) => (
              <>
                {isActive && item.icon}
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </Box>

      {/* ------------------------------------------------------------------- */}
      {/* BOUTON DE DÉCONNEXION */}
      {/* ------------------------------------------------------------------- */}
      <Button
        variant="text"
        onClick={onLogout}
        sx={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          fontWeight: "bold",
          fontSize: "16px",
          fontFamily: "Roboto, sans-serif",
          cursor: "pointer",
          color: "red",
        }}
      >
        <LogoutIcon sx={{ marginRight: "8px" }} />
        Déconnexion
      </Button>

    </nav>
  );
}