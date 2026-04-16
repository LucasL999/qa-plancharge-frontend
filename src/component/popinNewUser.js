import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TextField, Grid, MenuItem, Select, Divider } from '@mui/material';
import {getRoles} from "../services/userService";
import React, { useEffect } from 'react';

export default function PopinNewUser({ open, onClose }) {
    const [roles, setRoles] = React.useState([]);
    const [selectedRole, setSelectedRole] = React.useState("");

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
                        value=""
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
                        value=""
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
                        value=""
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