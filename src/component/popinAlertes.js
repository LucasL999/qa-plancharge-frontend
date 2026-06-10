// ==============================
// IMPORTS
// ==============================

// React
import React, { useState, useEffect } from "react";

// Material UI Components
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from "@mui/material";

// Material UI Icons
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

// React Router
import { useNavigate } from "react-router-dom";

// Service permettant de récupérer les alertes
import { getAlertes } from "../services/chantierService.js";


// ==============================
// COMPOSANT PRINCIPAL
// ==============================

export default function PopinAlertes({ open, onClose }) {

    // ==============================
    // STATES
    // ==============================

    // Liste des alertes récupérées depuis l'API
    const [alertes, setAlertes] = useState([]);

    // Hook de navigation React Router
    const navigateChantier = useNavigate();


    // ==============================
    // CHARGEMENT DES ALERTES
    // ==============================

    useEffect(() => {

        // Fonction appelée pour récupérer les alertes
        const fetchAlertes = async () => {
            try {

                // Appel API
                const data = await getAlertes();

                // Stockage des alertes dans le state
                setAlertes(data);

            } catch (error) {

                // Gestion des erreurs
                console.error(
                    "Erreur lors de la récupération des alertes :",
                    error
                );
            }
        };


        // On charge les alertes uniquement
        // lorsque la popin est ouverte
        if (open) {
            fetchAlertes();
        }

    }, [open]);


    // ==============================
    // RENDER
    // ==============================

    return (

        <Dialog
            open={open}
            onClose={onClose}
            disablePortal
            PaperProps={{
                sx: {
                    position: "absolute",
                    top: 19,
                    left: "31%",
                }
            }}
            maxWidth="md"
            fullWidth
        >

            {/* ==============================
                HEADER DE LA POPIN
            ============================== */}

            <DialogTitle
                sx={{
                    textAlign: "center",
                    fontSize: "32px",
                    position: "relative",
                    backgroundColor: "#0178A5",
                    paddingTop: "31px",
                    paddingBottom: "31px",
                    color: "#fff",
                }}
            >
                Alertes

                {/* Bouton de fermeture */}
                <IconButton
                    aria-label="fermer"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>

            </DialogTitle>


            {/* ==============================
                CONTENU DE LA POPIN
            ============================== */}

            <DialogContent
                sx={{
                    marginTop: 3,
                    marginBottom: 3,
                }}
            >

                <TableContainer
                    component={Paper}
                    sx={{
                        // Ajout d'une ombre uniquement
                        // lorsqu'il n'y a aucune alerte
                        boxShadow:
                            alertes.length === 0
                                ? "5px 5px 5px rgba(0,0,0,0.1)"
                                : undefined,
                    }}
                >

                    <Table>

                        <TableBody>

                            {/* ==============================
                                CAS : AUCUNE ALERTE
                            ============================== */}

                            {alertes.length === 0 ? (

                                <TableRow>

                                    <TableCell
                                        colSpan={1}
                                        align="center"
                                        sx={{ padding: 4 }}
                                    >
                                        Aucune alerte
                                    </TableCell>

                                </TableRow>

                            ) : (

                                /* ==============================
                                   CAS : LISTE DES ALERTES
                                ============================== */

                                alertes.map((alerte) => (

                                    <TableRow
                                        key={alerte.id}
                                        sx={{
                                            marginBottom: 1,
                                        }}
                                    >

                                        <TableCell
                                            // Au clic sur une alerte :
                                            // 1. Redirection vers le chantier
                                            // 2. Fermeture de la popin
                                            onClick={() => {
                                                navigateChantier(
                                                    `/chantier?id=${alerte.id_chantier}`
                                                );
                                                onClose();
                                            }}

                                            sx={{
                                                cursor: "pointer",
                                                backgroundColor: "#fe9b9b",
                                                fontSize: "16px",
                                                display: "flex",
                                                alignItems: "center",

                                                "&:hover .arrow-icon": {
                                                    transform: "translateX(5px) ",
                                                },
                                            }}
                                        >

                                            {/* Icône d'alerte */}
                                            <WarningAmberIcon
                                                sx={{
                                                    verticalAlign: "middle",
                                                    marginRight: 4,
                                                    fontWeight: "bold",
                                                    fontSize: 35,
                                                    color: "#ff0000",
                                                }}
                                            />

                                            {/* Message de l'alerte */}
                                            {alerte.message}

                                            {/* Icône de redirection */}
                                            <ArrowCircleRightOutlinedIcon
                                                className="arrow-icon"
                                                sx={{
                                                    verticalAlign: "middle",
                                                    marginLeft: "auto",
                                                    fontSize: 25,
                                                    color: "#393b3b",
                                                    transition: "transform 0.2s ease",
                                                }}
                                            />

                                        </TableCell>

                                    </TableRow>

                                ))
                            )}

                        </TableBody>

                    </Table>

                </TableContainer>

            </DialogContent>

        </Dialog>
    );
}