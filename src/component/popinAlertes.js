import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import React from "react";
import {getAlertes} from "../services/chantierService.js"
import { useState, useEffect } from "react";

export default function PopinAlertes({ open, onClose }) {
  const [alertes, setAlertes] = useState([]);

  useEffect(() => {
    const fetchAlertes = async () => {
      try {
        const data = await getAlertes();
        setAlertes(data);
      } catch (error) {
        console.error('Error fetching alertes:', error);
      }
    };

    if (open) {
      fetchAlertes();
    }
  }, [open]);

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
  <TableContainer component={Paper}>
    <Table>
      <TableBody>
        {alertes.map((alerte) => (
          <TableRow key={alerte.id} sx={{ backgroundColor:'#fe9b9b'}}>
            <TableCell sx={{border: '1px solid black'}}>
                <WarningAmberIcon sx={{ verticalAlign: 'middle', marginRight: 2, fontWeight: 'bold', fontSize: 30, color: '#ff0000' }} />
                {alerte.message}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</DialogContent>

    </Dialog>
  );
}