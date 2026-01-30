import { useEffect } from "react";
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
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token && location.pathname !== "/callback") {
      redirectToKeycloak();
    }
  }, [token, location.pathname]);

  return children;
}



export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/chantier">Chantier</Link> |{" "}
        <Link to="/calendar">Calendar</Link> |{" "}
        <Link to="/team">Team</Link> |{" "}
        <Link to="/user">User</Link>
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

