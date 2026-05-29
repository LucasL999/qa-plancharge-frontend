import { Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, ListItemText, Button, Box, Typography, Grid, MenuItem, Select, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { getStatuts, getPriorites, getQA } from '../services/chantierService';

export default function PopinFiltre({ open, onClose, onApply }) {

  const [statuts, setStatuts] = useState([]);
  const [selectedStatuts, setSelectedStatuts] = useState([]);

  const [priorites, setPriorites] = useState([]);
  const [selectedPriorites, setSelectedPriorites] = useState([]);

  const [qa, setQa] = useState([]);
  const [selectedQa, setSelectedQa] = useState([]);

  // Fetch statuts
  useEffect(() => {
    if (!open) return;

    const fetchStatuts = async () => {
      try {
        const res = await getStatuts();
        setStatuts(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatuts();
  }, [open]);

  // Fetch priorites
  useEffect(() => {
    if (!open) return;

    const fetchPriorites = async () => {
      try {
        const res = await getPriorites();
        setPriorites(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPriorites();
  }, [open]);

  // Fetch QA
  useEffect(() => {
    if (!open) return;

    const fetchQA = async () => {
      try {
        const res = await getQA();
        setQa(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQA();
  }, [open]);

  const handleClose = () => {
    setSelectedStatuts([]);
    setSelectedPriorites([]);
    setSelectedQa([]);
    onClose();
  };

  const handleApply = () => {
    onApply?.({
      statuts: selectedStatuts,
      priorites: selectedPriorites,
      qa: selectedQa
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedStatuts([]);
    setSelectedPriorites([]);
    setSelectedQa([]);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        Filtres
      </DialogTitle>

      <Divider sx={{ border: "1px solid #8d8d8d" }} />

      <DialogContent sx={{ mt: 3 }}>

        <Grid container spacing={2} sx={{ padding: "0 60px", paddingBottom: "40px" }}>

          {/* QA */}
          <Grid size={12}>
            <Field label="QA(s)">
              <Select
                fullWidth
                multiple
                value={selectedQa}
                onChange={(e) => setSelectedQa(e.target.value)}
                renderValue={(selected) =>
                  qa
                    .filter(q => selected.includes(String(q.id_user)))
                    .map(q => `${q.name} ${q.firstname}`)
                    .join(', ')
                }
                sx={{ borderRadius: "10px" }}
              >
                {qa.map((q) => (
                  <MenuItem key={q.id_user} value={String(q.id_user)}>
                    <Checkbox checked={selectedQa.includes(String(q.id_user))} />
                    <ListItemText primary={`${q.name} ${q.firstname}`} />
                  </MenuItem>
                ))}
              </Select>
            </Field>
          </Grid>  

          {/* Statuts */}
          <Grid size={6}>
            <Field label="Statuts">
              <Select
                fullWidth
                multiple
                value={selectedStatuts}
                onChange={(e) => setSelectedStatuts(e.target.value)}
                renderValue={(selected) =>
                  statuts
                    .filter(s => selected.includes(String(s.id_statut)))
                    .map(s => s.libelle)
                    .join(', ')
                }
                sx={{ borderRadius: "10px" }}
              >
                {statuts.map((s) => (
                  <MenuItem key={s.id_statut} value={String(s.id_statut)}>
                    <Checkbox checked={selectedStatuts.includes(String(s.id_statut))} />
                    <ListItemText primary={s.libelle} />
                  </MenuItem>
                ))}
              </Select>
            </Field>
          </Grid>

          {/* Priorités */}
          <Grid size={6}>
            <Field label="Priorités">
              <Select
                fullWidth
                multiple
                value={selectedPriorites}
                onChange={(e) => setSelectedPriorites(e.target.value)}
                renderValue={(selected) =>
                  priorites
                    .filter(p => selected.includes(String(p.id_priorite)))
                    .map(p => p.libelle)
                    .join(', ')
                }
                sx={{ borderRadius: "10px" }}
              >
                {priorites.map((p) => (
                  <MenuItem key={p.id_priorite} value={String(p.id_priorite)}>
                    <Checkbox checked={selectedPriorites.includes(String(p.id_priorite))} />
                    <ListItemText primary={p.libelle} />
                  </MenuItem>
                ))}
              </Select>
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
            backgroundColor: "#ccc",
            color: "black",
            borderRadius: "10px",
            width: "120px"
          }}
          onClick={handleReset}
        >
          Reset
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#d7df21",
            color: "black",
            borderRadius: "10px",
            width: "120px"
          }}
          onClick={handleApply}
        >
          Appliquer
        </Button>
      </DialogActions>
    </Dialog>
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
