import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TextField, Grid, MenuItem, Select, Divider, Checkbox, ListItemText } from '@mui/material';
import { useState, useEffect } from 'react';
import {getStatuts, getPriorites, getQA, updateChantier} from "../services/chantierService.js";

export default function PopinEditChantier({ open, onClose, chantier }) {
    
    const [chefDeProjet, setChefDeProjet] = useState("");
    const [financement, setFinancement] = useState("");
    const [natureDuProjet, setNatureDuProjet] = useState("");
    const [capacite, setCapacite] = useState("");
    const [prev, setPrev] = useState("");
    const [cons, setCons] = useState("");
    const [raf, setRaf] = useState("");
    const [debut, setDebut] = useState("");
    const [fin, setFin] = useState("");
    const [titre, setTitre] = useState("");

    const [priorites, setPriorites] = useState([]);
    const [selectedPriorite, setSelectedPriorite] = useState("");
    const [statuts, setStatuts] = useState([]);
    const [selectedStatut, setSelectedStatut] = useState("");
    const [Qas, setQas] = useState([]);
    const [selectedQas, setSelectedQas] = useState([]);
    

    const formatDate = (date) => date ? date.split("T")[0] : "";

    useEffect(() => {
        const fetchStatuts = async () => {
            try {
                const res = await getStatuts();
                    setStatuts(res);
                } catch (error) {
                    console.error(error);
                }
        };
        fetchStatuts();
    }, []);

    useEffect(() => {
        const fetchQas = async () => {
            try {
                const res = await getQA();
                    setQas(res);
                } catch (error) {
                    console.error(error);
                }
        };
        fetchQas();
    }, []);

    useEffect(() => {
        const fetchPriorites = async () => {
            try {
                const res = await getPriorites();
                    setPriorites(res);
                } catch (error) {
                    console.error(error);
                }
        };
        fetchPriorites();
    }, []);

    useEffect(() => {
        if (chantier) {
            setChefDeProjet(chantier.cp);
            setFinancement(chantier.finance);
            setNatureDuProjet(chantier.nature);
            setCapacite(chantier.capacite);
            setPrev(chantier.prev);
            setCons(chantier.cons);
            setRaf(chantier.prev-chantier.cons || "N/A");
            setDebut(formatDate(chantier.date_debut));
            setFin(formatDate(chantier.date_fin));
            setTitre(chantier.titre);
            setSelectedStatut(chantier.id_statut);
            setSelectedPriorite(chantier.id_priorite);
            setSelectedQas(chantier.qas.map(q => String(q.id)));
        }
    }, [chantier]);

    const handleSubmit = async () => {
        try{
            if(cons || prev){
                if(!/^\d+$/.test(cons) || !/^\d+$/.test(prev)){
                    alert("Les champs 'Prévisionnel' et 'Consommé' doivent contenir uniquement des chiffres.");
                    return;
                }
            }
            if(capacite){
                if(!/^\d+$/.test(capacite)){
                    alert("Le champ 'Capacité' doit contenir uniquement des chiffres.");
                    return;
                }
            }
            if(debut && fin){
                    if(fin < debut){
                        alert("La date de fin ne doit pas être inférieure à la date de début.");
                        return;
                    }
                }
    
                const chantierData = {
                    id: chantier.id_chantier,
                    priorite: selectedPriorite ? parseInt(selectedPriorite) : null,
                    statut: selectedStatut ? parseInt(selectedStatut) : null,
                    qa: selectedQas.map(id => parseInt(id)),
                    cp: chefDeProjet || null,
                    financement: financement || null,
                    nature: natureDuProjet || null,
                    capacite: capacite ? parseInt(capacite) : null,
                    prev: prev ? parseInt(prev) : null,
                    cons: cons ? parseInt(cons) : null,
                    debut: debut || null,
                    fin: fin || null,
                }
                const result = await updateChantier(chantierData);
                console.log("Chantier créé avec succès");
                
    
                handleClose();
                onClose();
                
            } catch (error){
                alert("Erreur lors de la modification du chantier.");
                console.error(error);
            }
        }
    
        const handleClose = () => {
            setSelectedPriorite("");
            setSelectedStatut("");
            setSelectedQas([]);
            setChefDeProjet("");
            setFinancement("");
            setNatureDuProjet("");
            setCapacite("");
            setPrev("");
            setCons("");
            setDebut("");
            setFin("");
          
            onClose();
        }; 

return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        Modifier le chantier
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
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={titre}
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
            <Grid size={2}>
                <Field label="Priorité">
                <Select fullWidth value={selectedPriorite} 
                        onChange={(e) => {
                            setSelectedPriorite(e.target.value);}} sx={{borderRadius: "10px"}}>
                                {priorites.map((prio) => (
                                    <MenuItem key={prio.id_priorite} value={String(prio.id_priorite)}>{prio.libelle}</MenuItem>
                                ))}
                    </Select>
                </Field>
            </Grid>

            {/* Ligne 2 */}
            <Grid size={6}>
                <Field label="QA(s)">
                    <Select fullWidth multiple value={selectedQas} 
                        onChange={(e) => {
                            setSelectedQas(e.target.value.map(val => String(val)))}} 
                        renderValue={(selected) => Qas.filter(q => selected.includes(String(q.id_user))).map(q => `${q.name} ${q.firstname}`).join(", ")} 
                        sx={{borderRadius: "10px"}}>
                        {Qas.map((q) => (
                            <MenuItem key={q.id_user} value={String(q.id_user)}>
                                <Checkbox checked={selectedQas.includes(String(q.id_user))}/>
                                <ListItemText primary={`${q.name} ${q.firstname}`}/>
                            </MenuItem>
                        ))}
                    </Select>
                </Field>
            </Grid>
            <Grid size={4}>
                <Field label="Statut">
                    <Select fullWidth value={selectedStatut} 
                        onChange={(e) => {
                            setSelectedStatut(e.target.value);}} sx={{borderRadius: "10px"}}>
                                {statuts.map((statu) => (
                                    <MenuItem key={statu.id_statut} value={String(statu.id_statut)}>{statu.libelle}</MenuItem>
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
                        value={chefDeProjet}
                        onChange={(e) => setChefDeProjet(e.target.value)}
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
                        value={financement}
                        onChange={(e) => setFinancement(e.target.value)}
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
                        value={natureDuProjet}
                        onChange={(e) => setNatureDuProjet(e.target.value)}
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
                        value={capacite}
                        onChange={(e) => setCapacite(e.target.value)}
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
                        value={prev}
                        onChange={(e) => setPrev(e.target.value)}
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
                        value={cons}
                        onChange={(e) => setCons(e.target.value)}
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
                        value={debut}
                        onChange={(e) => setDebut(e.target.value)}
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
                        value={fin}
                        onChange={(e) => setFin(e.target.value)}
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
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* ---------- SOUS-COMPONENTS ---------- */

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