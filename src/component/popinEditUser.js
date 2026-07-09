// -----------------------------------------------------------------------------
// FENÊTRE MODALE - MODIFICATION D'UN UTILISATEUR
// -----------------------------------------------------------------------------
// Cette fenêtre permet de modifier les informations d'un utilisateur existant.
// Elle récupère les données actuelles de l'utilisateur, valide les informations
// saisies puis met à jour l'utilisateur en base de données.
// -----------------------------------------------------------------------------
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TextField, Grid, MenuItem, Select, Divider } from '@mui/material';
import { getRoles, updateUser } from "../services/userService";
import React, { useEffect, useState } from 'react';

// -----------------------------------------------------------------------------
// COMPOSANT POPINEDITUSER
// -----------------------------------------------------------------------------
export default function PopinEditUser({ open, onClose, userData }) {

  // ---------------------------------------------------------------------------
  // STATE - Données du formulaire
  // ---------------------------------------------------------------------------
  const [roles, setRoles] = React.useState([]);
  const [selectedRole, setSelectedRole] = React.useState("");
  const [absences, setAbsences] = React.useState(0);
  const [nom, setNom] = React.useState("");
  const [prenom, setPrenom] = React.useState("");
  const [email, setEmail] = React.useState("");

  // ---------------------------------------------------------------------------
  // EFFECT - Initialise le formulaire avec les données de l'utilisateur à éditer
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setNom(userData?.name || "");
    setPrenom(userData?.firstname || "");
    setEmail(userData?.email || "");
    setSelectedRole(userData?.role || "")
    setAbsences(userData?.nbrestant || 0);
  }, [userData]);

  // ---------------------------------------------------------------------------
  // EFFECT - Récupère la liste des rôles disponibles
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getRoles();
        setRoles(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoles();
  }, []);

  // ---------------------------------------------------------------------------
  // VALIDATION ET MODIFICATION DE L'UTILISATEUR
  // ---------------------------------------------------------------------------
  const handleSubmit = async () => {
    try {
      // Vérifie que tous les champs obligatoires sont renseignés
      if (!nom || !prenom || !email || !selectedRole) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
      }
      // Vérifie que le nom et le prénom ne contiennent pas de caractères spéciaux
      if (/[!@#$%^&*(),.?":{}|<>]/.test(nom) || /[!@#$%^&*(),.?":{}|<>]/.test(prenom)) {
        alert("Les champs Nom et Prénom ne peuvent contenir de caractères spéciaux.");
        return;
      }
      // Vérifie que l'email respecte le domaine attendu
      if (!email.endsWith("@mnt.fr")) {
        alert("L'email n'est pas correct.");
        return;
      }


      const updatedUserData = { id_user: userData.id_user, nom: nom, prenom: prenom, id_role: selectedRole, absences: absences || null, email: email };
      const result = await updateUser(updatedUserData);
      console.log("Utilisateur modifié avec succès");

      // reset form 
      setNom("");
      setPrenom("");
      setEmail("");
      setSelectedRole("");
      setAbsences(0);

      onClose(true);

    } catch (error) {
      console.error("Erreur création user:", error);
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
        Modifier l'utilisateur
      </DialogTitle>
      <Divider sx={{
        width: "100%",
        borderBottomWidth: 1,
        margin: 0,
        border: "1px solid #8d8d8d",
      }} />

      <DialogContent sx={{ mt: 3 }}>

        {/* ------------------------------------------------------------------- */}
        {/* FORMULAIRE DE MODIFICATION */}
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
                onChange={(e) => setNom(e.target.value)}
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
                onChange={(e) => setPrenom(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& fieldset": {
                    borderRadius: "10px"
                  },
                  backgroundColor: "#fff"
                }}
              />
            </Field>
          </Grid>

          {/* Ligne 3 */}
          <Grid size={6}>
            <Field label={<strong>Rôle</strong>}>
              <Select fullWidth value={selectedRole} onChange={(e) => {
                setSelectedRole(e.target.value);
              }} sx={{ borderRadius: "10px" }}>
                {roles.map((role) => (
                  <MenuItem key={role.id_role} value={String(role.id_role)}>{role.libelle}</MenuItem>
                ))}
              </Select>
            </Field>
          </Grid>
          {/* Champ conditionnel - affiché uniquement pour le rôle concerné (id 1) */}
          {selectedRole === 1 && (
            <Grid size={6}>
              <Field label={<strong>Absences</strong>}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={absences}
                  onChange={(e) => setAbsences(e.target.value)}
                  sx={{
                    "& fieldset": {
                      borderRadius: "10px"
                    },
                    backgroundColor: "#fff"
                  }}
                />
              </Field>
            </Grid>
          )}

        </Grid>
      </DialogContent>

      {/* ------------------------------------------------------------------- */}
      {/* ACTIONS */}
      {/* Annulation ou validation de la modification */}
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
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#d7df21",
            color: "black",
            borderRadius: "10px",
            width: "120px"
          }}
        >
          Modifier
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