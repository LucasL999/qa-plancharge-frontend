import { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import PopinNewEvent from "./popinNewEvent";
import PopinEditEvent from "./popinEditEvent";
import { getEvents, getEventsOther } from "../services/calendarService.js";

export default function Schedule({ onMonthYearChange }) {

  const today = new Date();
  const [events, setEvents] = useState([]);
  const [eventsOther, setEventsOther] = useState([]);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const [openPopin, setOpenPopin] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [openEditPopin, setOpenEditPopin] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  /* ================= FETCH EVENTS ================= */
  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEventsOther = async () => {
    try {
      const res = await getEventsOther();
      setEventsOther(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchEventsOther();
  }, []);

  /* ================= POPINS ================= */
  const openPopinNewEvent = (day) => {
    const date = new Date(year, month, day);
    setSelectedDate(date);
    setOpenPopin(true);
  };

  const openEditEvent = (day) => {
    const date = new Date(year, month, day);

    // ✅ on retrouve le véritable événement (avec son id_event et ses vraies
    // dates de début/fin) au lieu de ne garder que le jour cliqué, pour que la
    // suppression/modification fonctionne quel que soit le jour cliqué dans la plage
    const shiftedDate = new Date(date);
    shiftedDate.setDate(shiftedDate.getDate() - 1);
    const key = formatDateKey(shiftedDate);

    const matchedEvent = (Array.isArray(events) ? events : []).find(event => {
      if (!event.date_debut || !event.date_fin) return false;
      const start = event.date_debut.split("T")[0];
      const end = event.date_fin.split("T")[0];
      return key >= start && key <= end;
    });

    setSelectedEvent(matchedEvent || null);
    setOpenEditPopin(true);
  };

  const handleCloseNewEvent = async () => {
    setOpenPopin(false);
    setSelectedDate(null);
    await fetchEvents(); // ✅ recharge après ajout
  };

  const handleCloseEditEvent = async () => {
    setOpenEditPopin(false);
    setSelectedEvent(null);
    await fetchEvents(); // ✅ recharge après modification / suppression
  };

  /* ================= CALENDRIER ================= */
  const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  /* ================= JOURS FÉRIÉS ================= */
  const [ferie, setFerie] = useState({});

  useEffect(() => {
    fetch(`https://calendrier.api.gouv.fr/jours-feries/metropole/${year}.json`)
      .then(res => res.json())
      .then(data => setFerie(data))
      .catch(() => setFerie({}));
  }, [year]);

  const formatDateKey = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const isFerie = (date) => ferie[formatDateKey(date)];

  const hasEventOnDate = (date) => {
    if (!Array.isArray(events)) return false;

    const shiftedDate = new Date(date);
    shiftedDate.setDate(shiftedDate.getDate() - 1);

    const key = formatDateKey(shiftedDate);

    return events.some(event => {
      if (!event.date_debut || !event.date_fin) return false;
      const start = event.date_debut.split("T")[0];
      const end = event.date_fin.split("T")[0];
      return key >= start && key <= end;
    });
  };

  // ✅ retourne la liste des événements (autres utilisateurs) présents ce jour-là,
  // avec leur prénom/nom, pour pouvoir les afficher sur la baguette
  const getOtherEventsOnDate = (date) => {
    if (!Array.isArray(eventsOther)) return [];

    const shiftedDate = new Date(date);
    shiftedDate.setDate(shiftedDate.getDate() - 1);

    const key = formatDateKey(shiftedDate);

    return eventsOther.filter(event => {
      if (!event.date_debut || !event.date_fin) return false;

      const start = event.date_debut.split("T")[0];
      const end = event.date_fin.split("T")[0];

      return key >= start && key <= end;
    });
  };

  useEffect(() => {
    onMonthYearChange?.({ month, year });
  }, [month, year]);

  /* ================= RENDER ================= */
  return (
    <div style={{...styles.calendar, boxShadow: "0px 0px 4px rgba(0,0,0,0.25)"}}>

      <PopinNewEvent
        open={openPopin}
        onClose={handleCloseNewEvent}
        date={selectedDate}
      />

      <PopinEditEvent
        open={openEditPopin}
        onClose={handleCloseEditEvent}
        event={selectedEvent}
      />

      {/* HEADER */}
      <div style={{...styles.header}}>
        <button onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <ArrowBackIosOutlinedIcon />
        </button>

        <div>
          <select
            value={month}
            style={{ width: "300px", fontSize: "20px", textAlign: "center", borderRadius: "10px", padding: "5px", marginRight: "10px" }}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {months.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>

          <select
            value={year}
            style={{ width: "300px", fontSize: "20px", textAlign: "center", borderRadius: "10px", padding: "5px", marginLeft: "10px" }}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {[year - 1, year, year + 1].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <button onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>

      {/* DAYS */}
      <div style={styles.grid}>
        {daysOfWeek.map(day => (
          <div key={day} style={styles.dayName}>{day}</div>
        ))}

        {Array.from({ length: startDay }).map((_, i) => <div key={i} />)}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const dayNumber = i + 1;
          const date = new Date(year, month, dayNumber);
          const isWeekend = [0, 6].includes(date.getDay());
          const ferieName = isFerie(date);
          const hasEvent = hasEventOnDate(date);
          const otherEvents = getOtherEventsOnDate(date);
          const hasEventOther = otherEvents.length > 0;

          let background = "#f5f5f5";
          let color = "black";

          if (isWeekend) background = "#d0d7de";
          if (ferieName) {
            background = "#3b3b3b";
            color = "white";
          }
          if (hasEvent) {
            background = "#c62828";
            color = "white";
          }

          // couleurs de segments légèrement alternées pour bien distinguer chaque tranche
          const segmentShades = ["#0178A5", "#3596bd", "#015f82"];

          return (
            <div
              key={dayNumber}
              onClick={() => {
                if (hasEvent) {
                  openEditEvent(dayNumber);
                } else if (!isWeekend) {
                  if (!ferieName) {
                    openPopinNewEvent(dayNumber + 1);
                  }
                }
              }}
              style={{
                ...styles.dayCell,
                background,
                color,
                position: "relative", // ✅ IMPORTANT pour position absolute
                border:
                  dayNumber === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear()
                    ? "2px solid #D4DA17"
                    : "none"
              }}
            >
              {/* numéro du jour */}
              {dayNumber}

              {/* ✅ une seule baguette, divisée en segments égaux (1 par personne absente) */}
              {hasEventOther && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "4px",
                    left: "4px",
                    right: "4px",
                    display: "flex",
                    height: "7px",
                    borderRadius: "2px",
                    overflow: "hidden",
                    gap: "1px",
                  }}
                >
                  {otherEvents.map((ev, idx) => (
                    <Tooltip
                      key={idx}
                      title={`${ev.firstname} ${ev.name}`}
                      arrow
                      placement="top"
                    >
                      <div
                        style={{
                          flex: 1,
                          height: "100%",
                          backgroundColor: segmentShades[idx % segmentShades.length],
                          cursor: "default",
                        }}
                      />
                    </Tooltip>
                  ))}
                </div>
              )}
            </div>
          );

        })}
      </div>
    </div>
  );
}

/* -------- STYLES (INCHANGÉS) -------- */
const styles = {
  calendar: {
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    fontFamily: "Arial"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    textAlign: "center"
  },
  dayName: {
    fontWeight: "bold",
    marginBottom: "5px"
  },
  dayCell: {
    padding: "40px",
    margin: "2px",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#f5f5f5"
  }
};
