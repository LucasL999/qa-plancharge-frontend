import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TextField, Grid, MenuItem, Select, Divider } from '@mui/material';

export default function PopinNewChantier({ open, onClose }) {
    
return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          backgroundColor: "#cfe6ef",
          textAlign: "center",
          fontSize: "32px",
          fontWeight: 500,
          paddingTop: "31px",
          paddingBottom: "31px",
        }}
      >
        Nouveau chantier
      </DialogTitle>
      <Divider sx={{
          width: "100%",
          borderBottomWidth: 1,
          margin: 0,
          border: "1px solid #8d8d8d",
        }} />

      <DialogContent sx={{ mt: 3 }}>
        
        {/* INFOS GÉNÉRALES */}
        <Typography align="center" justifyContent="center" sx={{ fontSize: "20px", fontWeight: "bold", mb: 2 }}>
            Infos générales
        </Typography>

        <Grid container spacing={2} sx={{ padding: "0 60px", paddingBottom: "40px" }}>

            {/* Ligne 1 */}
            <Grid size={10}>
                <Field label="Chantier">
                    <Select fullWidth defaultValue="" sx={{borderRadius: "10px"}}>
                        <MenuItem value="">Chantier</MenuItem>
                    </Select>
                </Field>
            </Grid>
            <Grid size={2}>
                <Field label="Priorité">
                <Select fullWidth defaultValue="" sx={{borderRadius: "10px"}}>
                    <MenuItem value="">Priorité</MenuItem>
                </Select>
                </Field>
            </Grid>

            {/* Ligne 2 */}
            <Grid size={6}>
                <Field label="QA(s)">
                    <Select fullWidth defaultValue="" sx={{borderRadius: "10px"}}>
                        <MenuItem value="">QA</MenuItem>
                    </Select>
                </Field>
            </Grid>
            <Grid size={4}>
                <Field label="Statut">
                    <Select fullWidth defaultValue="" sx={{borderRadius: "10px"}}>
                        <MenuItem value="">Statut</MenuItem>
                    </Select>
                </Field>
            </Grid>
        </Grid>

        {/* PILOTAGE */}
        <Typography align="center" justifyContent="center" sx={{ fontSize: "20px", fontWeight: "bold", mb: 2 }}>
            Pilotage
        </Typography>

        <Grid container spacing={2} sx={{ padding: "0 60px", paddingBottom: "40px" }}>

            {/* Ligne 1 */}
            <Grid size={6}>
                <Field label="Chef de projet">
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
            <Grid size={6}>
                <Field label="Financement">
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

            {/* Ligne 2 */}
            <Grid size={9}>
                <Field label="Nature du projet">
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
            <Grid size={3}>
                <Field label="Capacité (%)">
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

        {/* SUIVI BUDGÉTAIRE */}
        <Typography align="center" justifyContent="center" sx={{ fontSize: "20px", fontWeight: "bold", mb: 2 }}>
            Suivi budgétaire
        </Typography>

        <Grid container spacing={2} sx={{ padding: "0 60px", paddingBottom: "40px" }}>

            {/* Ligne 1 */}
            <Grid size={4}>
                <Field label="Prévisionnel">                   
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
            <Grid size={4}>
                <Field label="Consommé">
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
            <Grid size={4}>
                <Field label="Reste à faire">
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

        {/* PLANNING */}
        <Typography align="center" justifyContent="center" sx={{ fontSize: "20px", fontWeight: "bold", mb: 2, }}>
            Planning
        </Typography>

        <Grid container spacing={2} sx={{ padding: "0 60px", paddingBottom: "40px" }}>

            {/* Ligne 1 */}
            <Grid size={5}>
                <Field label="Date de début">
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="date"
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
                <Field label="Date de fin">
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="date"
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