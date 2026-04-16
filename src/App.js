import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { redirectToKeycloak } from "./auth/keycloak";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Navbar from "./component/navbar";

import Callback from "./pages/callback";

import Dashboard from "./pages/dashboard";
import Chantier from "./pages/chantier";
import Calendar from "./pages/calendar";
import Team from "./pages/team";
import User from "./pages/user";
import Unauthorized from "./pages/unauthorized";

import { 
  Box,
  CssBaseline, 
} from "@mui/material";


const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI"allVariants, sans serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Roboto, sans-serif",
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

  if(!loaded || (!token && location.pathname !== "/callback")) return null; // ou un spinner de chargement

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

  function ProtectedLayout({ children }) {
  return (
    <>
      <Navbar onLogout={logout} />
      <Box>
        {children}
      </Box>
    </>
  );
  }

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />  
  <Router>
    <Box style={{ display: "flex" }}>

  <Box style={{ marginLeft: "230px", flexGrow: 1, paddingLeft: "20px" }}>
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/" element={<AuthGuard><ProtectedLayout><Dashboard /></ProtectedLayout></AuthGuard>} />
        <Route path="/chantier" element={<AuthGuard><ProtectedLayout><Chantier /></ProtectedLayout></AuthGuard>} />
        <Route path="/calendar" element={<AuthGuard><ProtectedLayout><Calendar /></ProtectedLayout></AuthGuard>} />
        <Route path="/team" element={<AuthGuard><ProtectedLayout><Team /></ProtectedLayout></AuthGuard>} />
        <Route path="/user" element={<AuthGuard><ProtectedLayout><User /></ProtectedLayout></AuthGuard>} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
  </Box>

</Box>
  </Router>
  </ThemeProvider>
);
}


