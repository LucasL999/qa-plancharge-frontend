import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink, useLocation } from "react-router-dom";
import { redirectToKeycloak } from "./auth/keycloak";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { alpha } from "@mui/material";

import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ConstructionIcon from '@mui/icons-material/Construction';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

import Callback from "./pages/callback";

import Dashboard from "./pages/dashboard";
import Chantier from "./pages/chantier";
import Calendar from "./pages/calendar";
import Team from "./pages/team";
import User from "./pages/user";

import { 
  Button, 
  Divider,
  Box,
  CssBaseline, 
} from "@mui/material";

import logo from "./img/logo.png";

const theme = createTheme({
  typography: {
    fontFamily: " Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Arial, sans-serif",
        },
      },
    },
  },
});


function AuthGuard({ children }) {
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("access_token");
    setToken(t);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded && !token && location.pathname !== "/callback") {
      redirectToKeycloak();
    }
  }, [loaded, token, location.pathname]);

  if(!loaded) return null; // ou un spinner de chargement

  return children;
}

export default function App() {

  function logout() {
    console.log("Déconnexion");
    localStorage.removeItem("access_token");
    localStorage.removeItem("pkce_verifier");
    localStorage.removeItem("roles");

    window.location.href =
      `${process.env.REACT_APP_KEYCLOAK_LOGOUT_ENDPOINT}?redirect_uri=${encodeURIComponent(process.env.REACT_APP_APP_URL)}`;
  }

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />  
  <Router>
    <Box style={{ display: "flex" }}>

      {/* SIDEBAR */}
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
        <img src={logo} alt="logo mnt" style={{display: "block", margin: "0 auto", width: "40%", height: "auto", alignItems: "center"}}/>
        <Divider sx={{marginBottom: "20px",  border: "1px solid #8d8d8d",}}/>
        <Box
          style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          fontSize: "25px",
          fontWeight: "bold",
          }}
        >
          {[
            { label: "Dashboard", path: "/", icon: <HomeFilledIcon /> },
            { label: "Plan de charge", path: "/team", icon: <GroupsIcon /> },
            { label: "Chantiers", path: "/chantier", icon: <ConstructionIcon /> },
            { label: "Calendrier", path: "/calendar", icon: <CalendarMonthIcon /> },
            { label: "Utilisateurs", path: "/user", icon: <PersonIcon /> },
          ].map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: "12px", width: "calc(100% + 40px)", marginLeft: "-20px",
              paddingTop: "5px", paddingBottom: "5px", paddingLeft: "20px", textDecoration: "none", color: "black",
              backgroundColor: isActive ? alpha("#5D5D5D", 0.3) : "transparent",
            })}
          >
            {({ isActive }) => (
            <>
            {/*  Icône uniquement quand actif */}
            {isActive && item.icon}
              <span>{item.label}</span>
            </>
          )}
          </NavLink>
          ))}
        </Box>


        {/* BOUTON DÉCONNEXION MUI */}
        <Button
          variant="text"
          onClick={logout}
          sx={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            color: "black",
          }}
        >
          <LogoutIcon sx={{ marginRight: "8px" }} />
          Déconnexion
        </Button>
      </nav>

      {/* CONTENU PRINCIPAL */}
      <Box style={{ marginLeft: "230px", flexGrow: 1, paddingLeft: "20px" }}>
        <AuthGuard>
          <Routes>
            <Route path="/callback" element={<Callback />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/chantier" element={<Chantier />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/team" element={<Team />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </AuthGuard>
      </Box>

    </Box>
  </Router>
  </ThemeProvider>
);
}


