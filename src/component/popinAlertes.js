import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function PopinAlertes({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      
      {/* Header */}
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "30px",
          position: "relative",
        }}
      >
        Alertes

        {/* Bouton fermer */}
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

      {/* Contenu */}
      <DialogContent>
        <Typography>Alerte 1</Typography>
      </DialogContent>
    </Dialog>
  );
}