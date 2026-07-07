import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TextField, Grid, MenuItem, Select, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { deleteEvent, updateEvent } from "../services/calendarService"

// ✅ décale une date "YYYY-MM-DD" (ou ISO) de `deltaDays` jours, en UTC pur
// pour ne jamais dépendre du fuseau horaire du navigateur
const shiftDateString = (dateStr, deltaDays) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("T")[0].split("-").map(Number);
  const shifted = new Date(Date.UTC(y, m - 1, d + deltaDays));
  return shifted.toISOString().split("T")[0];
};

export default function PopinEditEvent({ open, onClose, event }) {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (event) {
      const displayStart = event.date_debut ? shiftDateString(event.date_debut, 1) : "";
      const displayEnd = event.date_fin ? shiftDateString(event.date_fin, 1) : "";
      setStartDate(displayStart);
      setEndDate(displayEnd);
    }
  }, [event]);

  const handleDelete = async () => {
    try {
      if (!event?.id_event) {
        console.error("id_event manquant, suppression impossible");
        return;
      }

      const result = await deleteEvent(event.id_event);
      console.log("Event supprimé avec succès");
      // reset
      setStartDate("");
      setEndDate("");
      onClose(true);

    } catch (error) {
      console.error("Erreur suppression event:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!event?.id_event) {
        console.error("id_event manquant, modification impossible");
        return;
      }
      if (endDate < startDate) {
        alert("La date de fin ne doit pas être inférieure à la date de début.");
        return;
      }

      const result = await updateEvent(event.id_event, startDate, endDate);
      console.log("Event modifié avec succès");

      onClose(true);

    } catch (error) {
      console.error("Erreur modification event:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disablePortal
      PaperProps={{
        sx: {
          position: "absolute",
          top: 17,
          left: "31%",
        }
      }}
      maxWidth="md"
      fullWidth
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          backgroundColor: "#0178A5",
          textAlign: "center",
          fontSize: "32px",
          fontWeight: 500,
          paddingTop: "31px",
          paddingBottom: "31px",
          color: "white",
        }}
      >
        Modifier l'absence
      </DialogTitle>
      <Divider sx={{
        width: "100%",
        borderBottomWidth: 1,
        margin: 0,
        border: "1px solid #8d8d8d",
      }} />

      <DialogContent sx={{ mt: 3 }}>

        {/* PLANNING */}
        <Grid container spacing={2} sx={{ padding: "0 60px", paddingBottom: "40px" }}>

          {/* Ligne 1 */}
          <Grid size={5}>
            <Field label={<strong>Date de début</strong>}>
              <TextField
                fullWidth
                variant="outlined"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                sx={{
                  "& fieldset": {
                    borderRadius: "10px"
                  },
                  backgroundColor: "#fff"
                }}
              />
            </Field>
          </Grid>
          <Grid size={5}>
            <Field label={<strong>Date de fin</strong>}>
              <TextField
                fullWidth
                variant="outlined"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                sx={{
                  "& fieldset": {
                    borderRadius: "10px"
                  },
                  backgroundColor: "#fff"
                }}
              />
            </Field>
          </Grid>
        </Grid>
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions sx={{ gap: "10px", px: 3, pb: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#63a7c1",
            color: "black",
            borderRadius: "10px",
            width: "120px"
          }}
          onClick={onClose}
        >
          Annuler
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#d7df21",
            color: "black",
            borderRadius: "10px",
            width: "120px"
          }}
          onClick={handleUpdate}
        >
          Modifier
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff0000",
            color: "white",
            borderRadius: "10px",
            width: "120px",

            "&:hover": {
              backgroundColor: "#C00F0C",
            },
          }}
          onClick={handleDelete}
        >
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* ---------- SOUS-COMPONENTS ---------- */

function SectionTitle({ title }) {
  return (
    <Typography
      sx={{
        mt: 4,
        mb: 2,
        fontWeight: 600,
        textAlign: "center"
      }}
    >
      {title}
    </Typography>
  );
}

function Field({ label, children }) {
  return (
    <Box>
      <Typography sx={{ fontSize: "13px", mb: 0.5 }}>
        {label} :
      </Typography>
      {children}
    </Box>
  );

}