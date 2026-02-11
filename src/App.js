import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import { redirectToKeycloak } from "./auth/keycloak";

import Callback from "./pages/callback";

import Dashboard from "./pages/dashboard";
import Chantier from "./pages/chantier";
import Calendar from "./pages/calendar";
import Team from "./pages/team";
import User from "./pages/user";


function AuthGuard({ children }) {
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("access_token");
      if (stored !== token) setToken(stored);
      }, 100);

    return () => clearInterval(interval);
  }, [token]);
    
  return children;
}



export default function App() {

  function logout(){
    console.log("Déconnexion");
    localStorage.removeItem("access_token");
    localStorage.removeItem("pkce_verifier");
    window.location.href = `${process.env.REACT_APP_KEYCLOAK_LOGOUT_ENDPOINT}?redirect_uri=${encodeURIComponent(process.env.REACT_APP_KEYCLOAK_REDIRECT_URI)}`;
  }

  return (
    <Router>
      <nav>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/chantier">Chantier</Link> |{" "}
        <Link to="/calendar">Calendar</Link> |{" "}
        <Link to="/team">Team</Link> |{" "}
        <Link to="/user">User</Link>
        <button type="button" onClick={logout}>Se déconnecter</button>
      </nav>

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
    </Router>
  );
}

