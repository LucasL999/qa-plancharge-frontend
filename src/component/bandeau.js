import { useState } from "react";
import { alpha } from "@mui/material/styles";
import { Box, Divider, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function Bandeau({title, subtitle}) {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bandeau bleu */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          backgroundColor: alpha("#5DA1BC", 0.4),
          paddingTop: "40px",
          paddingBottom: "12px",
        }}
      >
     
      <NotificationsOutlinedIcon
        onClick={() => setOpen(true)}
        sx={{
          position: "absolute",
          top: "50%",
          left: "92%",
          transform: "translate(-50%, -50%)",
          fontSize: 55,
          color: "#5D5D5D",
          cursor: "pointer",
          }}
        />

        <Typography
          variant="h1"
          align="center"
          sx={{
            fontSize: "50px",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{
            fontSize: "13px",
            fontWeight: "bold",
            marginTop: "15px",
            marginBottom: 0,
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      {/* Divider à la limite du bleu */}
      <Divider
        sx={{
          width: "100%",
          borderBottomWidth: 1,
          margin: 0,
          border: "1px solid #8d8d8d",
        }}
      />


      {/* Pop-in pour les notifications */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
>
      {/* ✅ Titre + croix */}
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "30px",
          position: "relative",
        }}
      >
        Alertes

        {/* ✅ Croix en haut à droite */}
        <IconButton
          aria-label="fermer"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography>
          Alerte 1
        </Typography>
      </DialogContent>
    </Dialog>
    </>
  );
}