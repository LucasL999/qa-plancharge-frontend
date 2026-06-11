import { useState, useEffect } from "react";
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
  const [selectedEventDate, setSelectedEventDate] = useState(null);

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
    setSelectedEventDate(date);
    setOpenEditPopin(true);
  };

  const handleCloseNewEvent = async () => {
    setOpenPopin(false);
    setSelectedDate(null);
    await fetchEvents(); // ✅ recharge après ajout
  };

  const handleCloseEditEvent = async () => {
    setOpenEditPopin(false);
    setSelectedEventDate(null);
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

  const eventOther = (date) => {
    if (!Array.isArray(eventsOther)) return false;

    const shiftedDate = new Date(date);
    shiftedDate.setDate(shiftedDate.getDate() - 1);

    const key = formatDateKey(shiftedDate);

    // ✅ 1. récupérer les events du jour
    const matchedEvents = eventsOther.filter(event => {
      if (!event.date_debut || !event.date_fin) return false;

      const start = event.date_debut.split("T")[0];
      const end = event.date_fin.split("T")[0];

      return key >= start && key <= end;
    });

    // ✅ 2. récupérer les prénoms
    const firstnames = matchedEvents.map(e => e.firstname).join(", ");

    // ✅ 4. retourner boolean (comme avant)
    return matchedEvents.length > 0;
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
        date={selectedEventDate}
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
          const hasEventOther = eventOther(date);

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

          return (
            <div
              key={dayNumber}
              onClick={() => {
                if (hasEvent) {
                  openEditEvent(dayNumber + 1);
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

              {/* ✅ baguette ici */}
              {hasEventOther && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "4px",
                    left: "4px",
                    right: "4px",
                    height: "6px",
                    borderRadius: "2px",
                    backgroundColor: "#0178A5"
                  }}

                />
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