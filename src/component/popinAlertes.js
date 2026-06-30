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
    Tabs,
    Tab,
} from "@mui/material";

// Material UI Icons
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

// React Router
import { useNavigate } from "react-router-dom";

// Service permettant de récupérer les alertes
import { getAlertes, getHistorique } from "../services/chantierService.js";


// ==============================
// COMPOSANT PRINCIPAL
// ==============================

export default function PopinAlertes({ open, onClose }) {

    // ==============================
    // STATES
    // ==============================

    // Hook de navigation React Router
    const navigateChantier = useNavigate();

    const [tab, setTab] = useState(0);
    const [alertesActives, setAlertesActives] = useState([]);
    const [historique, setHistorique] = useState([]);


    // ==============================
    // CHARGEMENT DES ALERTES
    // ==============================

    useEffect(() => {

        // Fonction appelée pour récupérer les alertes
        const fetchAlertes = async () => {
            try {

                // Appel API
                const active = await getAlertes();
                const histo = await getHistorique();

                // Stockage des alertes dans le state
                setAlertesActives(active);
                setHistorique(histo);

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

    const dataToDisplay = tab === 0 ? alertesActives : historique;

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

            <Tabs
                value={tab}
                onChange={(e, value) => setTab(value)}
                centered
            >
                <Tab label="Alertes" />
                <Tab label="Historique" />
            </Tabs>


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
                        boxShadow:
                            dataToDisplay.length === 0
                                ? "5px 5px 5px rgba(0,0,0,0.1)"
                                : undefined,
                    }}
                >
                    <Table>
                        <TableBody>

                            {/* ==============================
                    CAS : AUCUNE DONNÉE
                ============================== */}

                            {dataToDisplay.length === 0 ? (

                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{ padding: 4 }}
                                    >
                                        {tab === 0
                                            ? "Aucune alerte active"
                                            : "Aucun historique"}
                                    </TableCell>
                                </TableRow>

                            ) : (

                                /* ==============================
                                    LISTE DES ALERTES
                                ============================== */

                                dataToDisplay.map((alerte) => (

                                    <TableRow
                                        key={alerte.id_alerte}
                                    >
                                        <TableCell
                                            onClick={() => {
                                                navigateChantier(
                                                    `/chantier?id=${alerte.id_chantier}`
                                                );
                                                onClose();
                                            }}
                                            sx={{
                                                cursor: "pointer",
                                                backgroundColor:
                                                    tab === 0
                                                        ? "#fe9b9b"
                                                        : "#f5f5f5",

                                                fontSize: "16px",
                                                display: "flex",
                                                alignItems: "center",

                                                "&:hover .arrow-icon": {
                                                    transform: "translateX(5px)",
                                                },
                                            }}
                                        >

                                            {/* Icône d'alerte */}
                                            <WarningAmberIcon
                                                sx={{
                                                    marginRight: 4,
                                                    fontSize: 35,
                                                    color:
                                                        tab === 0
                                                            ? "#ff0000"
                                                            : "#808080",
                                                }}
                                            />

                                            {/* Message + date de création dans l'historique */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <span>
                                                    {alerte.message}
                                                </span>

                                                {tab === 1 && (
                                                    <span
                                                        style={{
                                                            fontSize: "12px",
                                                            color: "#666",
                                                            marginTop: "4px",
                                                        }}
                                                    >
                                                        Créée le{" "}
                                                        {new Date(alerte.datecreation)
                                                            .toLocaleDateString("fr-FR", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            })}
                                                    </span>
                                                )}
                                                {tab === 0 && (
                                                    <span
                                                        style={{
                                                            fontSize: "12px",
                                                            color: "#666",
                                                            marginTop: "4px",
                                                        }}
                                                    >
                                                        Créée le{" "}
                                                        {new Date(alerte.datecreation)
                                                            .toLocaleDateString("fr-FR", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            })}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Icône de redirection */}
                                            <ArrowCircleRightOutlinedIcon
                                                className="arrow-icon"
                                                sx={{
                                                    marginLeft: "auto",
                                                    fontSize: 25,
                                                    color: "#393b3b",
                                                    transition:
                                                        "transform 0.2s ease",
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