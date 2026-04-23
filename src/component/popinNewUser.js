import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TextField, Grid, MenuItem, Select, Divider } from '@mui/material';
import {getRoles, addUser} from "../services/userService";
import React, { useEffect } from 'react';

export default function PopinNewUser({ open, onClose }) {
    const [roles, setRoles] = React.useState([]);
    const [selectedRole, setSelectedRole] = React.useState("");
    const [absences, setAbsences] = React.useState(0);
    const [nom, setNom] = React.useState("");
    const [prenom, setPrenom] = React.useState("");
    const [email, setEmail] = React.useState("");

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

    const handleSubmit = async () => {
        try {
            if (!nom || !prenom || !email || !selectedRole) {
                alert("Veuillez remplir tous les champs obligatoires.");
                return;
            } 
            if (/[!@#$%^&*(),.?":{}|<>]/.test(nom) || /[!@#$%^&*(),.?":{}|<>]/.test(prenom)) {
                alert("Les champs Nom et Prénom ne peuvent contenir de caractères spéciaux.");
                return;
            }
            if(!email.endsWith("@mnt.fr")) {
                alert("L'email n'est pas correct.");
                return;
            }


            const userData = {nom: nom, prenom: prenom, id_role: selectedRole, absences: absences || null, email: email};
            const result = await addUser(userData);
            console.log("Utilisateur créé avec succès");

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

return (
    <Dialog
      open={open}
      onClose={onClose}
      disablePortal
      PaperProps={{
        sx:{
            position: "absolute",
            top: 0,
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
        Nouvel utilisateur
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
            <Grid size={6}>
                <Field label={<strong>Nom</strong>}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={nom}
                        required
                        onChange = {(e) => setNom(e.target.value)}
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
                        onChange = {(e) => setPrenom(e.target.value)}
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
                        onChange = {(e) => setEmail(e.target.value)}
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
                        setSelectedRole(e.target.value);}} sx={{borderRadius: "10px"}}>
                        {roles.map((role) => (
                            <MenuItem key={role.id_role} value={String(role.id_role)}>{role.libelle}</MenuItem>
                        ))}
                    </Select>
                </Field>
            </Grid>
            <Grid size={6}>
                <Field label={<strong>Absences</strong>}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={absences}
                        onChange = {(e) => setAbsences(e.target.value)}
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
          onClick = {handleSubmit}
          sx={{
            backgroundColor: "#d7df21",
            color: "black",
            borderRadius: "10px",
            width: "120px"
          }}
        >
          Créer
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