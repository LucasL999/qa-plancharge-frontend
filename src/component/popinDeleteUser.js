// -----------------------------------------------------------------------------
// FENÊTRE MODALE - SUPPRESSION D'UN UTILISATEUR
// -----------------------------------------------------------------------------
// Cette fenêtre affiche un récapitulatif des informations de l'utilisateur
// (lecture seule) et demande confirmation avant de le supprimer en base de données.
// -----------------------------------------------------------------------------
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TextField, Grid, MenuItem, Select, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { deleteUser } from "../services/userService";

// -----------------------------------------------------------------------------
// COMPOSANT POPINDELETEUSER
// -----------------------------------------------------------------------------
export default function PopinDeleteUser({ open, onClose, userData }) {

  // ---------------------------------------------------------------------------
  // STATE - Informations de l'utilisateur à supprimer
  // ---------------------------------------------------------------------------
  const [idUser, setIdUser] = React.useState("");
  const [nom, setNom] = React.useState("");
  const [prenom, setPrenom] = React.useState("");
  const [email, setEmail] = React.useState("");


  // ---------------------------------------------------------------------------
  // EFFECT - Initialise le formulaire avec les données de l'utilisateur à supprimer
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setIdUser(userData?.id_user || "");
    setNom(userData?.name || "");
    setPrenom(userData?.firstname || "");
    setEmail(userData?.email || "");
  }, [userData]);


  // ---------------------------------------------------------------------------
  // SUPPRESSION DE L'UTILISATEUR
  // ---------------------------------------------------------------------------
  const handleDelete = async () => {
    try {

      const result = await deleteUser(idUser);
      console.log("Utilisateur supprimé avec succès");
      // reset
      setIdUser("");
      onClose(true);

    } catch (error) {
      console.error("Erreur suppression user:", error);
    }
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
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
        Supprimer l'utilisateur ?
      </DialogTitle>
      <Divider sx={{
        width: "100%",
        borderBottomWidth: 1,
        margin: 0,
        border: "1px solid #8d8d8d",
      }} />

      <DialogContent sx={{ mt: 3 }}>

        {/* ------------------------------------------------------------------- */}
        {/* RÉCAPITULATIF - Informations de l'utilisateur (lecture seule) */}
        {/* ------------------------------------------------------------------- */}
        <Grid container spacing={2} sx={{ padding: "0 60px", paddingBottom: "40px" }}>

          {/* Ligne 1 */}
          <Grid size={6}>
            <Field label={<strong>Nom</strong>}>
              <TextField
                fullWidth
                variant="outlined"
                value={nom}
                required
                sx={{
                  "& fieldset": {
                    borderRadius: "10px"
                  },
                  backgroundColor: "#fff"
                }}
              />
            </Field>
          </Grid>
          <Grid size={6}>
            <Field label={<strong>Prénom</strong>}>
              <TextField
                fullWidth
                variant="outlined"
                value={prenom}
                required
                sx={{
                  "& fieldset": {
                    borderRadius: "10px"
                  },
                  backgroundColor: "#fff"
                }}
              />
            </Field>
          </Grid>

          {/* Ligne 2 */}
          <Grid size={12}>
            <Field label={<strong>Email</strong>}>
              <TextField
                fullWidth
                variant="outlined"
                value={email}
                required
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
      {/* Annulation ou confirmation de la suppression */}
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
          onClick={handleDelete}
          sx={{
            backgroundColor: "#fa5e5e",
            color: "black",
            borderRadius: "10px",
            width: "120px"
          }}
        >
          Supprimer
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