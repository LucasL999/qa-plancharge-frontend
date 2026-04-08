import { useState } from "react";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

export default function Schedule() {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth()); // 0-11
  const [year, setYear] = useState(today.getFullYear());

  const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  // Premier jour du mois
  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7; // Lundi = 0

  // Nombre de jours dans le mois
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

  return (
    <div style={styles.calendar}>
      {/* HEADER */}
      <div style={styles.header}>
        <button onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <ArrowBackIosOutlinedIcon />
        </button>

        <div> 
            <select
                value={month}
                style={{ width: "300px", fontSize: "20px", textAlign: "center", borderRadius: "10px", padding: "5px", marginRight: "10px" }}
                onChange={(e) => setMonth(Number(e.target.value))}>
                {months.map((m, index) => (
                    <option key={m} value={index}>
                        {m}
                    </option>
                ))}
            </select>

            <select
            value={year}
            style={{ width: "300px", fontSize: "20px", textAlign: "center", borderRadius: "10px", padding: "5px", marginLeft: "10px" }}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {Array.from({ length: 20 }, (_, i) => (
              <option key={i} value={today.getFullYear() - 10 + i}>
                {today.getFullYear() - 10 + i}
              </option>
            ))}
          </select>
        </div>

        <button onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>

      {/* DAYS */}
      <div style={styles.grid}>
        {daysOfWeek.map((day) => (
          <div key={day} style={styles.dayName}>
            {day}
          </div>
        ))}

        {/* Vide avant le 1er jour */}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={i} />
        ))}

        {/* Jours du mois */}
        {Array.from({ length: daysInMonth }, (_, i) => {
            const dayNumber = i + 1;
            const dayOfWeek = new Date(year, month, dayNumber).getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            return (
                <div
                    key={i}
                    style={{...styles.dayCell, backgroundColor: isWeekend ? "#d0d7de" : "#f5f5f5"
                    }}
                >
                    {dayNumber}
                </div>
            );
        })}
      </div>
    </div>
  );
}

/* -------- STYLES -------- */

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