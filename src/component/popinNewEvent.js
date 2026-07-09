// -----------------------------------------------------------------------------
// FENÊTRE MODALE - CRÉATION D'UNE ABSENCE
// -----------------------------------------------------------------------------
// Cette fenêtre permet de créer une nouvelle absence. Elle récupère les jours choisis
// et disponibles, valide les informations saisies puis enregistre la nouvelle
// absence en base de données.
// -----------------------------------------------------------------------------
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TextField, Grid, MenuItem, Select, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { addEvent } from "../services/calendarService";
import { jwtDecode } from "jwt-decode";

// -----------------------------------------------------------------------------
// COMPOSANT POPINNEWEVENT
// -----------------------------------------------------------------------------
export default function PopinNewEvent({ open, onClose, date }) {

  // ---------------------------------------------------------------------------
  // STATE - Dates de l'absence
  // ---------------------------------------------------------------------------
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ---------------------------------------------------------------------------
  // EFFECT - Change les format de date pour l'affichage
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (date) {
      setStartDate(date.toISOString().split('T')[0]);
      setEndDate(date.toISOString().split('T')[0]);
    }
  }, [date]);

  // ---------------------------------------------------------------------------
  // VALIDATION ET CRÉATION DE L'ABSENCE
  // ---------------------------------------------------------------------------
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("Utilisateur non authentifié");
        return;
      }

      // Vérifie que la date de fin n'est pas inférieure à la date de début
      if (endDate < startDate) {
        alert("La date de fin ne doit pas être inférieure à la date de début.");
        return;
      }
      const decoded = jwtDecode(token);
      const emailFromToken = decoded.email;
      const eventData = { email: emailFromToken, date_debut: startDate, date_fin: endDate };
      const result = await addEvent(eventData);
      console.log("Event créé avec succès");

      // reset form 
      onClose(true);

    } catch (error) {
      alert("Erreur lors de la création de l'event.");
      console.error(error);
    }
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------------------
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
      {/* ------------------------------------------------------------------- */}
      {/* EN-TÊTE DE LA FENÊTRE */}
      {/* ------------------------------------------------------------------- */}
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
        Nouvelle absence
      </DialogTitle>
      <Divider sx={{
        width: "100%",
        borderBottomWidth: 1,
        margin: 0,
        border: "1px solid #8d8d8d",
      }} />

      <DialogContent sx={{ mt: 3 }}>

        {/* ------------------------------------------------------------------- */}
        {/* FORMULAIRE DE CRÉATION */}
        {/* ------------------------------------------------------------------- */}
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

      {/* ------------------------------------------------------------------- */}
      {/* ACTIONS */}
      {/* Annulation ou validation de la création */}
      {/* ------------------------------------------------------------------- */}
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
          onClick={handleSubmit}
        >
          Créer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* ----------------------------------------------------------------------------- */
/* SOUS-COMPOSANTS */
/* ----------------------------------------------------------------------------- */

// -----------------------------------------------------------------------------
// TITRE DE SECTION
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// CHAMP DE FORMULAIRE
// Affiche un libellé au-dessus d'un composant de saisie.
// -----------------------------------------------------------------------------
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