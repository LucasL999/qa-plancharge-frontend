import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Chantier from "./pages/chantier";
import Calendar from "./pages/calendar";
import Team from "./pages/team";
import User from "./pages/user";




function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/chantier">Chantier</Link> |{" "}
        <Link to="/calendar">Calendar</Link> |{" "}
        <Link to="/team">Team</Link> |{" "}
        <Link to="/user">User</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chantier" element={<Chantier />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/team" element={<Team />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
