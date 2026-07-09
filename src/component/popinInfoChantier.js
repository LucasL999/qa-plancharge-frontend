// -----------------------------------------------------------------------------
// FENÊTRE MODALE - INFORMATIONS D'UN CHANTIER
// -----------------------------------------------------------------------------
// Cette fenêtre affiche en lecture seule les informations détaillées d'un
// chantier (infos générales, pilotage, suivi budgétaire et planning).
// -----------------------------------------------------------------------------
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TableContainer, Table, TableCell, Grid, MenuItem, Select, Divider, TableBody, TableRow } from '@mui/material';

// -----------------------------------------------------------------------------
// COMPOSANT POPININFOCHANTIER
// -----------------------------------------------------------------------------
export default function PopinInfoChantier({ open, onClose, chantier }) {

    // ---------------------------------------------------------------------------
    // FORMATAGE - Date au format YYYY-MM-DD
    // ---------------------------------------------------------------------------
    const formatDate = (date) => date ? date.split("T")[0] : "";

    // ---------------------------------------------------------------------------
    // FORMATAGE - Liste des QA(s) affectés au chantier
    // ---------------------------------------------------------------------------
    const afficheQA = (tableauQA) => {
        if (!Array.isArray(tableauQA) || tableauQA.length === 0) {
            return "N/A";
        }

        return tableauQA.map(qa => `${qa.firstname}`).join(", ");
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
                Informations du chantier
            </DialogTitle>
            <Divider sx={{
                width: "100%",
                borderBottomWidth: 1,
                margin: 0,
                border: "1px solid #8d8d8d",
            }} />

            <DialogContent sx={{ mt: 3 }}>

                <Grid container spacing={2} sx={{ padding: "0 60px", paddingBottom: "40px" }}>

                    {/* ------------------------------------------------------------------- */}
                    {/* SECTION - INFOS GÉNÉRALES */}
                    {/* Chantier, statut, QA(s) et priorité */}
                    {/* ------------------------------------------------------------------- */}
                    <Grid size={6}>
                        <Box sx={{ paddingRight: "30px" }}>
                            <Typography align="center" justifyContent="center" sx={{ fontSize: "20px", fontWeight: "bold", mb: 2 }}>
                                Infos générales
                            </Typography>
                            <TableContainer>
                                <Table
                                    sx={{
                                        "& .MuiTableCell-root": {
                                            borderBottom: "none",
                                            paddingY: "5px",
                                        }
                                    }}
                                >
                                    <TableBody>
                                        <TableRow sx={{backgroundColor: "#d9e4e966"}}>
                                            <TableCell sx={{ fontWeight: "bold", borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>Chantier :</TableCell>
                                            <TableCell sx={{ color: "#5DA1BC", borderTopRightRadius: 10, borderBottomRightRadius: 10 }} align="right">{chantier?.titre}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold" }}>Statut :</TableCell>
                                            <TableCell sx={{ color: "#5DA1BC" }} align="right">{chantier?.stat || "N/A"}</TableCell>
                                        </TableRow>
                                        <TableRow sx={{backgroundColor: "#d9e4e966"}}>
                                            <TableCell sx={{ fontWeight: "bold", borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>QA :</TableCell>
                                            <TableCell sx={{ color: "#5DA1BC", borderTopRightRadius: 10, borderBottomRightRadius: 10 }} align="right">{afficheQA(chantier?.qas)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold" }}>Priorité :</TableCell>
                                            <TableCell sx={{ color: "#5DA1BC" }} align="right">{chantier?.prio || "N/A"}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>

                    {/* ------------------------------------------------------------------- */}
                    {/* SECTION - PILOTAGE */}
                    {/* Chef de projet, nature du projet, financement et capacité */}
                    {/* ------------------------------------------------------------------- */}
                    <Grid size={6} >
                        <Box sx={{ paddingLeft: "30px" }}>
                            <Typography align="center" justifyContent="center" sx={{ fontSize: "20px", fontWeight: "bold", mb: 2 }}>
                                Pilotage
                            </Typography>
                            <TableContainer>
                                <Table
                                    sx={{
                                        "& .MuiTableCell-root": {
                                            borderBottom: "none",
                                            paddingY: "5px",
                                        }
                                    }}
                                >
                                    <TableBody>
                                        <TableRow sx={{backgroundColor: "#d9e4e966"}}>
                                            <TableCell sx={{ fontWeight: "bold", borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>Chef de projet :</TableCell>
                                            <TableCell sx={{ color: "#5DA1BC", borderTopRightRadius: 10, borderBottomRightRadius: 10 }} align="right">{chantier?.cp || "N/A"}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold" }}>Nature du projet :</TableCell>
                                            <TableCell sx={{ color: "#5DA1BC" }} align="right">{chantier?.nature || "N/A"}</TableCell>
                                        </TableRow>
                                        <TableRow sx={{backgroundColor: "#d9e4e966"}}>
                                            <TableCell sx={{ fontWeight: "bold", borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>Financement :</TableCell>
                                            <TableCell sx={{ color: "#5DA1BC", borderTopRightRadius: 10, borderBottomRightRadius: 10 }} align="right">{chantier?.finance || "N/A"}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold" }}>Capacité (%) :</TableCell>
                                            <TableCell sx={{ color: "#5DA1BC" }} align="right">{chantier?.capacite || "N/A"}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>

                    {/* ------------------------------------------------------------------- */}
                    {/* SECTION - SUIVI BUDGÉTAIRE */}
                    {/* Prévisionnel, consommé et reste à faire (calculé) */}
                    {/* ------------------------------------------------------------------- */}
                    <Grid size={6}>
                        <Box sx={{ paddingTop: "30px", paddingRight: "30px" }}>
                            <Typography align="center" justifyContent="center" sx={{ fontSize: "20px", fontWeight: "bold", mb: 2 }}>
                                Suivi budgétaire
                            </Typography>
                            <TableContainer>
                                <Table
                                    sx={{
                                        "& .MuiTableCell-root": {
                                            borderBottom: "none",
                                            paddingY: "5px",
                                        }
                                    }}
                                >
                                    <TableBody>
                                        <TableRow sx={{backgroundColor: "#d9e4e966"}}>
                                            <TableCell sx={{ fontWeight: "bold", borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>Prévisionnel :</TableCell>
                                            <TableCell sx={{ color: "#5DA1BC", borderTopRightRadius: 10, borderBottomRightRadius: 10 }} align="right">{chantier?.prev || 0}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold" }}>Consommé :</TableCell>
                                            <TableCell sx={{ color: "#5DA1BC" }} align="right">{chantier?.cons || 0}</TableCell>
                                        </TableRow>
                                        <TableRow sx={{backgroundColor: "#d9e4e966"}}>
                                            <TableCell sx={{ fontWeight: "bold", borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>Reste à faire :</TableCell>
                                            <TableCell sx={{ color: "#5DA1BC", borderTopRightRadius: 10, borderBottomRightRadius: 10 }} align="right">{chantier?.prev - chantier?.cons || 0}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>

                    {/* ------------------------------------------------------------------- */}
                    {/* SECTION - PLANNING */}
                    {/* Dates de début et de fin du chantier */}
                    {/* ------------------------------------------------------------------- */}
                    <Grid size={6}>
                        <Box sx={{ paddingTop: "30px", paddingLeft: "30px" }}>
                            <Typography align="center" justifyContent="center" sx={{ fontSize: "20px", fontWeight: "bold", mb: 2 }}>
                                Planning
                            </Typography>
                            <TableContainer>
                                <Table
                                    sx={{
                                        "& .MuiTableCell-root": {
                                            borderBottom: "none",
                                            paddingY: "5px",
                                        }
                                    }}
                                >
                                    <TableBody>
                                        <TableRow sx={{backgroundColor: "#d9e4e966"}}>
                                            <TableCell sx={{ fontWeight: "bold", borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>Date de début :</TableCell>
                                            <TableCell sx={{ color: "#5DA1BC", borderTopRightRadius: 10, borderBottomRightRadius: 10 }} align="right">{formatDate(chantier?.date_debut) || "N/A"}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold" }}>Date de fin :</TableCell>
                                            <TableCell sx={{ color: "#5DA1BC" }} align="right">{formatDate(chantier?.date_fin) || "N/A"}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Grid>

            </DialogContent>

            {/* ------------------------------------------------------------------- */}
            {/* ACTIONS */}
            {/* Fermeture de la fenêtre */}
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
                    Fermer
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