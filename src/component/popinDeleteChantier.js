// -----------------------------------------------------------------------------
// FENÊTRE MODALE - SUPPRESSION D'UN CHANTIER
// -----------------------------------------------------------------------------
// Cette fenêtre demande confirmation à l'utilisateur avant de supprimer
// définitivement un chantier en base de données.
// -----------------------------------------------------------------------------
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Divider,
    Box,
} from "@mui/material";

import { deleteChantier } from "../services/chantierService";

// -----------------------------------------------------------------------------
// COMPOSANT POPINDELETECHANTIER
// -----------------------------------------------------------------------------
export default function PopinDeleteChantier({
    open,
    onClose,
    chantier,
    onDelete,
    onDeleted,
}) {

    // ---------------------------------------------------------------------------
    // SUPPRESSION DU CHANTIER
    // ---------------------------------------------------------------------------
    const handleDelete = async () => {
    try {

      const result = await deleteChantier(chantier?.id_chantier);
      console.log("Chantier supprimé avec succès");

      // notifie le parent (affichage d'une notification "chantier supprimé")
      onDeleted?.(chantier?.titre);

      // reset
      onClose(true);

    } catch (error) {
      console.error("Erreur suppression chantier:", error);
    }
  };

    // ---------------------------------------------------------------------------
    // RENDER
    // ---------------------------------------------------------------------------
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    position: "absolute",
                    top: 17,
                    left: "31%",
                },
            }}
            maxWidth="sm"
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
                Supprimer le chantier
            </DialogTitle>

            <Divider
                sx={{
                    width: "100%",
                    borderBottomWidth: 1,
                    border: "1px solid #8d8d8d",
                }}
            />

            {/* ------------------------------------------------------------------- */}
            {/* CONTENU */}
            {/* Message de confirmation et rappel du chantier concerné */}
            {/* ------------------------------------------------------------------- */}

            <DialogContent sx={{ py: 4 }}>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        alignItems: "center",
                    }}
                >

                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        Êtes-vous sûr de vouloir supprimer ce
                        chantier ?
                    </Typography>

                    <Box
                        sx={{
                            backgroundColor: "#f5f5f5",
                            borderRadius: "10px",
                            padding: 2,
                            width: "100%",
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: "center",
                                fontSize: "18px",
                            }}
                        >
                            {chantier?.titre}
                        </Typography>
                    </Box>

                    <Typography
                        variant="body2"
                        sx={{
                            color: "#C00F0C",
                            textAlign: "center",
                        }}
                    >
                        Cette action est irréversible.
                    </Typography>

                </Box>

            </DialogContent>

            {/* ------------------------------------------------------------------- */}
            {/* ACTIONS */}
            {/* Annulation ou confirmation de la suppression */}
            {/* ------------------------------------------------------------------- */}

            <DialogActions
                sx={{
                    gap: 2,
                    px: 3,
                    pb: 3,
                    justifyContent: "center",
                }}
            >

                <Button
                    variant="contained"
                    onClick={onClose}
                    sx={{
                        backgroundColor: "#63a7c1",
                        color: "black",
                        borderRadius: "10px",
                        width: "120px",
                    }}
                >
                    Annuler
                </Button>

                <Button
                    variant="contained"
                    onClick={handleDelete}
                    sx={{
                        backgroundColor: "#ff0000",
                        color: "white",
                        borderRadius: "10px",
                        width: "120px",

                        "&:hover": {
                            backgroundColor: "#C00F0C",
                        },
                    }}
                >
                    Supprimer
                </Button>

            </DialogActions>

        </Dialog>
    );
}