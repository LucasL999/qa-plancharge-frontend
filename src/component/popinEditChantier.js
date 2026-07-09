// -----------------------------------------------------------------------------
// FENÊTRE MODALE - MODIFICATION D'UN CHANTIER
// -----------------------------------------------------------------------------
// Cette fenêtre permet de modifier un chantier existant. Elle récupère les
// informations actuelles du chantier, valide les informations saisies puis
// met à jour le chantier en base de données.
// -----------------------------------------------------------------------------
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TextField, Grid, MenuItem, Select, Divider, Checkbox, ListItemText } from '@mui/material';
import { useState, useEffect } from 'react';
import { getStatuts, getPriorites, getQA, updateChantier } from "../services/chantierService.js";

// -----------------------------------------------------------------------------
// COMPOSANT POPINEDITCHANTIER
// -----------------------------------------------------------------------------
export default function PopinEditChantier({ open, onClose, chantier, onUpdated }) {

    // ---------------------------------------------------------------------------
    // STATE - Données du formulaire (infos générales, pilotage, budget, planning)
    // ---------------------------------------------------------------------------
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

    // ---------------------------------------------------------------------------
    // STATE - Listes récupérées depuis l'API (référentiels)
    // ---------------------------------------------------------------------------
    const [priorites, setPriorites] = useState([]);
    const [selectedPriorite, setSelectedPriorite] = useState("");
    const [statuts, setStatuts] = useState([]);
    const [selectedStatut, setSelectedStatut] = useState("");
    const [Qas, setQas] = useState([]);
    const [selectedQas, setSelectedQas] = useState([]);


    // ---------------------------------------------------------------------------
    // FORMATAGE - Date au format YYYY-MM-DD
    // ---------------------------------------------------------------------------
    const formatDate = (date) => date ? date.split("T")[0] : "";

    // ---------------------------------------------------------------------------
    // EFFECT - Récupère la liste des statuts disponibles
    // ---------------------------------------------------------------------------
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

    // ---------------------------------------------------------------------------
    // EFFECT - Récupère la liste des QA (utilisateurs) disponibles
    // ---------------------------------------------------------------------------
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

    // ---------------------------------------------------------------------------
    // EFFECT - Récupère la liste des priorités disponibles
    // ---------------------------------------------------------------------------
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

    // ---------------------------------------------------------------------------
    // EFFECT - Initialise le formulaire avec les données du chantier à éditer
    // ---------------------------------------------------------------------------
    useEffect(() => {
        if (chantier) {
            setChefDeProjet(chantier.cp);
            setFinancement(chantier.finance);
            setNatureDuProjet(chantier.nature);
            setCapacite(chantier.capacite);
            setPrev(chantier.prev || 0);
            setCons(chantier.cons || 0);
            setRaf(chantier.prev - chantier.cons || 0);
            setDebut(formatDate(chantier.date_debut));
            setFin(formatDate(chantier.date_fin));
            setTitre(chantier.titre);
            setSelectedStatut(chantier.id_statut);
            setSelectedPriorite(chantier.id_priorite);
            setSelectedQas((chantier.qas || []).map(q => String(q.id)));
        }
    }, [chantier]);

    // ---------------------------------------------------------------------------
    // VALIDATION ET MODIFICATION DU CHANTIER
    // ---------------------------------------------------------------------------
    const handleSubmit = async () => {
        try {
            // Vérifie que "Prévisionnel" et "Consommé" sont bien numériques
            if (cons || prev) {
                if (!/^\d+$/.test(cons) || !/^\d+$/.test(prev)) {
                    alert("Les champs 'Prévisionnel' et 'Consommé' doivent contenir uniquement des chiffres.");
                    return;
                }
            }
            // Vérifie que "Capacité" est bien numérique
            if (capacite) {
                if (!/^\d+$/.test(capacite)) {
                    alert("Le champ 'Capacité' doit contenir uniquement des chiffres.");
                    return;
                }
            }
            // Vérifie que la date de fin n'est pas inférieure à la date de début
            if (debut && fin) {
                if (fin < debut) {
                    alert("La date de fin ne doit pas être inférieure à la date de début.");
                    return;
                }
            }

            // Construction de l'objet envoyé à l'API
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
            console.log("Chantier updated avec succès");

            // notifie le parent (affichage d'une notification "chantier modifié")
            onUpdated?.(titre);

            handleClose();
            onClose();
        } catch (error) {
            alert("Erreur lors de la modification du chantier.");
            console.error(error);
        }
    }

    // ---------------------------------------------------------------------------
    // FERMETURE ET RÉINITIALISATION DE LA POPIN
    // ---------------------------------------------------------------------------
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

    // ---------------------------------------------------------------------------
    // RENDER
    // ---------------------------------------------------------------------------
    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                Modifier le chantier
            </DialogTitle>
            <Divider sx={{
                width: "100%",
                borderBottomWidth: 1,
                margin: 0,
                border: "1px solid #8d8d8d",
            }} />

            <DialogContent sx={{ mt: 3 }}>

                {/* ------------------------------------------------------------------- */}
                {/* SECTION - INFOS GÉNÉRALES */}
                {/* Chantier (non modifiable), priorité, QA(s) et statut */}
                {/* ------------------------------------------------------------------- */}
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
                                    setSelectedPriorite(e.target.value);
                                }} sx={{ borderRadius: "10px" }}>
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
                                    setSelectedQas(e.target.value.map(val => String(val)))
                                }}
                                renderValue={(selected) => Qas.filter(q => selected.includes(String(q.id_user))).map(q => `${q.name} ${q.firstname}`).join(", ")}
                                sx={{ borderRadius: "10px" }}>
                                {Qas.map((q) => (
                                    <MenuItem key={q.id_user} value={String(q.id_user)}>
                                        <Checkbox checked={selectedQas.includes(String(q.id_user))} />
                                        <ListItemText primary={`${q.name} ${q.firstname}`} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </Field>
                    </Grid>
                    <Grid size={4}>
                        <Field label="Statut">
                            <Select fullWidth value={selectedStatut}
                                onChange={(e) => {
                                    setSelectedStatut(e.target.value);
                                }} sx={{ borderRadius: "10px" }}>
                                {statuts.map((statu) => (
                                    <MenuItem key={statu.id_statut} value={String(statu.id_statut)}>{statu.libelle}</MenuItem>
                                ))}
                            </Select>
                        </Field>
                    </Grid>
                </Grid>

                {/* ------------------------------------------------------------------- */}
                {/* SECTION - PILOTAGE */}
                {/* Chef de projet, financement, nature du projet, capacité */}
                {/* ------------------------------------------------------------------- */}
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

                {/* ------------------------------------------------------------------- */}
                {/* SECTION - SUIVI BUDGÉTAIRE */}
                {/* Prévisionnel, consommé et calcul automatique du reste à faire */}
                {/* ------------------------------------------------------------------- */}
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
                                onChange={(e) => {
                                    // Met à jour le prévisionnel et recalcule le reste à faire
                                    const newPrev = Number(e.target.value);
                                    setPrev(newPrev);
                                    setRaf(newPrev - cons);
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
                                value={cons}
                                onChange={(e) => {
                                    // Met à jour le consommé et recalcule le reste à faire
                                    const newCons = Number(e.target.value);
                                    setCons(newCons);
                                    setRaf(prev - newCons);
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
                            {/* Champ calculé automatiquement, non modifiable */}
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

                {/* ------------------------------------------------------------------- */}
                {/* SECTION - PLANNING */}
                {/* Dates de début et de fin du chantier */}
                {/* ------------------------------------------------------------------- */}
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

/* ----------------------------------------------------------------------------- */
/* SOUS-COMPOSANTS */
/* ----------------------------------------------------------------------------- */

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