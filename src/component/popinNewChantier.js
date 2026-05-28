import { Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, ListItemText, Button, Box, Typography, TextField, Grid, MenuItem, Select, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { getStatuts, getPriorites, getQA, updateChantier, addChantier } from '../services/chantierService';


export default function PopinNewChantier({ open, onClose, onCreated }) {

    const [statuts, setStatuts] = useState([]);
    const [selectedStatut, setSelectedStatut] = useState("");

    const [priorites, setPriorites] = useState([]);
    const [selectedPriorite, setSelectedPriorite] = useState("");

    const [qa, setQa] = useState([]);
    const [selectedQa, setSelectedQa] = useState([]);

    //const [chantier, setChantier] = useState([]);
    const [selectedChantier, setSelectedChantier] = useState("");

    const [selectedCP, setSelectedCP] = useState("");
    const [selectedFin, setSelectedFin] = useState("");
    const [selectedNature, setSelectedNature] = useState("");
    const [selectedCap, setSelectedCap] = useState("");
    const [selectedPrev, setSelectedPrev] = useState("");
    const [selectedCons, setSelectedCons] = useState("");
    const [raf, setRaf] = useState("");
    const [selectedDateDebut, setSelectedDateDebut] = useState("");
    const [selectedDateFin, setSelectedDateFin] = useState("");

    useEffect(() => {
        const fetchStatut = async () => {
            try {
                const res = await getStatuts();
                setStatuts(res);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStatut();
    }, []);


    useEffect(() => {
        const fetchPriorite = async () => {
            try {
                const res = await getPriorites();
                setPriorites(res);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPriorite();
    }, []);

    
    useEffect(() => {
        const fetchQA = async () => {
            try {
                const res = await getQA();
                setQa(res);
            } catch (error) {
                console.error(error);
            }
        };
        fetchQA();
    }, []);

    const handleSubmit = async () => {
        try{
            if(!selectedChantier){
                alert("Veuillez choisir le chantier.");
                return;
            }
            if(selectedCons || selectedPrev){
                if(!/^\d+$/.test(selectedCons) || !/^\d+$/.test(selectedPrev)){
                    alert("Les champs 'Prévisionnel' et 'Consommé' doivent contenir uniquement des chiffres.");
                    return;
                }
            }
            if(selectedCap){
                if(!/^\d+$/.test(selectedCap)){
                    alert("Le champ 'Capacité' doit contenir uniquement des chiffres.");
                    return;
                }
            }
            if(selectedDateDebut && selectedDateFin){
                if(selectedDateFin < selectedDateDebut){
                    alert("La date de fin ne doit pas être inférieure à la date de début.");
                    return;
                }
            }

            const chantierData = {
                chantier: selectedChantier,
                priorite: selectedPriorite ? parseInt(selectedPriorite) : null,
                statut: selectedStatut ? parseInt(selectedStatut) : null,
                qa: selectedQa.map(id => parseInt(id)),
                cp: selectedCP || null,
                financement: selectedFin || null,
                nature: selectedNature || null,
                capacite: selectedCap ? parseInt(selectedCap) : null,
                prev: selectedPrev ? parseInt(selectedPrev) : null,
                cons: selectedCons ? parseInt(selectedCons) : null,
                debut: selectedDateDebut || null,
                fin: selectedDateFin || null,
            }
            const result = await addChantier(chantierData);
            console.log("Chantier créé avec succès");

            //reset
            setSelectedChantier("");
            setSelectedPriorite("");
            setSelectedStatut("");
            setSelectedQa([]);
            setSelectedCP("");
            setSelectedFin("");
            setSelectedNature("");
            setSelectedCap("");
            setSelectedPrev("");
            setSelectedCons("");
            setSelectedDateDebut("");
            setSelectedDateFin("");

            handleClose();
            onCreated?.(); // Notifie le parent que le chantier a été créé
            onClose(true);
            
        } catch (error){
            alert("Erreur lors de la création du chantier.");
            console.error(error);
        }
    }

    const handleClose = () => {
      setSelectedStatut("");
      setSelectedPriorite("");
      setSelectedQa([]);
      
      onClose();
    };


return (
    <Dialog
      open={open}
      onClose={handleClose}
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
            {/*
            <Grid size={10}>
                <Field label="Chantier">
                    <Select fullWidth defaultValue="" sx={{borderRadius: "10px"}}>
                        <MenuItem value="">Chantier</MenuItem>
                    </Select>
                </Field>
            </Grid>
            */}
            {/* en attendant l'importation des chantiers par excel */}
            <Grid size={10}>
                <Field label="Chantier">
                    <TextField
                        fullWidth
                        variant="outlined"
                        onChange={(e) => {setSelectedChantier(e.target.value)}}
                        sx={{
                            "& fieldset": {
                            borderRadius: "10px"
                            },
                            backgroundColor: "#fff"  
                        }}    
                    />
                </Field>
            </Grid>
            <Grid size={2}>
                <Field label="Priorité">
                    <Select fullWidth value={selectedPriorite} onChange={(e) => {
                        setSelectedPriorite(e.target.value);}} sx={{borderRadius: "10px"}}>
                        {priorites.map((p) => (
                            <MenuItem key={p.id_priorite} value={String(p.id_priorite)}>{p.libelle}</MenuItem>
                        ))}
                    </Select>
                </Field>
            </Grid>

            {/* Ligne 2 */}
            <Grid size={6}>
                <Field label="QA(s)">
                    <Select fullWidth multiple value={selectedQa} onChange={(e) => {
                        setSelectedQa(e.target.value)}} 
                        renderValue={(selected) => qa.filter(q => selected.includes(String(q.id_user))).map(q => `${q.name} ${q.firstname}`).join(", ")} 
                        sx={{borderRadius: "10px"}}>
                        {qa.map((q) => (
                            <MenuItem key={q.id_user} value={String(q.id_user)}>
                                <Checkbox checked={selectedQa.includes(String(q.id_user))}/>
                                <ListItemText primary={`${q.name} ${q.firstname}`}/>
                            </MenuItem>
                        ))}
                    </Select>
                </Field>
            </Grid>
            <Grid size={4}>
                <Field label="Statut">
                    <Select fullWidth value={selectedStatut} onChange={(e) => {
                        setSelectedStatut(e.target.value);}} sx={{borderRadius: "10px"}}>
                        {statuts.map((s) => (
                            <MenuItem key={s.id_statut} value={String(s.id_statut)}>{s.libelle}</MenuItem>
                        ))}
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
                        onChange={(e) => {setSelectedCP(e.target.value)}}
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
                        onChange={(e) => {setSelectedFin(e.target.value)}}
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
                        onChange={(e) => {setSelectedNature(e.target.value)}}
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
                        onChange={(e) => {setSelectedCap(e.target.value)}}
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
                        onChange={(e) => {
                            const newPrev = Number(e.target.value);
                            setSelectedPrev(newPrev); 
                            setRaf(newPrev-selectedCons);
                        }}
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
                        onChange={(e) => {
                            const newCons = Number(e.target.value);
                            setSelectedCons(newCons); 
                            setRaf(selectedPrev-newCons);
                        }}
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
                        value={raf}
                        disabled
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
                        onChange={(e) => {setSelectedDateDebut(e.target.value)}}
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
                        onChange={(e) => {setSelectedDateFin(e.target.value)}}
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
          onClick={handleClose}
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