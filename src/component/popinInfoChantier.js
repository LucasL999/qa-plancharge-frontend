import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TableContainer, Table, TableCell, Grid, MenuItem, Select, Divider, TableBody, TableRow } from '@mui/material';


export default function PopinInfoChantier({ open, onClose, chantier }) {

    return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          backgroundColor: "#cfe6ef",
          textAlign: "center",
          fontSize: "32px",
          fontWeight: 500,
          paddingTop: "31px",
          paddingBottom: "31px",
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

            {/* INFOS GÉNÉRALES */}
            <Grid size={6}>
                <Box sx={{paddingRight: "30px"}}>
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
                                <TableRow>
                                    <TableCell sx={{fontWeight:"bold"}}>Chantier :</TableCell>
                                    <TableCell sx={{color:"#5DA1BC"}} align="right">{chantier?.Chantier}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight:"bold"}}>Statut :</TableCell>
                                    <TableCell sx={{color:"#5DA1BC"}} align="right">{chantier?.Statut}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight:"bold"}}>QA :</TableCell>
                                    <TableCell sx={{color:"#5DA1BC"}} align="right">{chantier?.QA}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight:"bold"}}>Priorité :</TableCell>
                                    <TableCell sx={{color:"#5DA1BC"}} align="right">{chantier?.Priorite}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Grid>

            {/* PILOTAGE */}
            <Grid size={6} >
                <Box sx={{paddingLeft: "30px"}}>
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
                                <TableRow>
                                    <TableCell sx={{fontWeight:"bold"}}>Chef de projet :</TableCell>
                                    <TableCell sx={{color:"#5DA1BC"}} align="right">{chantier?.ChefDeProjet}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight:"bold"}}>Nature du projet :</TableCell>
                                    <TableCell sx={{color:"#5DA1BC"}} align="right">{chantier?.NatureDuProjet}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight:"bold"}}>Financement :</TableCell>
                                    <TableCell sx={{color:"#5DA1BC"}} align="right">{chantier?.Financement}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight:"bold"}}>Capacité (%) :</TableCell>
                                    <TableCell sx={{color:"#5DA1BC"}} align="right">{chantier?.Capacite}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Grid>

            {/* SUVI BUDGÉTAIRE */}
            <Grid size={6}>
                <Box sx={{paddingTop: "30px", paddingRight: "30px"}}>
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
                                <TableRow>
                                    <TableCell sx={{fontWeight:"bold"}}>Prévisionnel :</TableCell>
                                    <TableCell sx={{color:"#5DA1BC"}} align="right">{chantier?.Prev}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight:"bold"}}>Consommé :</TableCell>
                                    <TableCell sx={{color:"#5DA1BC"}} align="right">{chantier?.Consomme}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight:"bold"}}>Reste à faire :</TableCell>
                                    <TableCell sx={{color:"#5DA1BC"}} align="right">{chantier?.RAF}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Grid>

            {/* PLANNING */}
            <Grid size={6}>
                <Box sx={{paddingTop: "30px", paddingLeft: "30px"}}>
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
                                <TableRow>
                                    <TableCell sx={{fontWeight:"bold"}}>Date de début :</TableCell>
                                    <TableCell sx={{color:"#5DA1BC"}} align="right">{chantier?.Debut}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight:"bold"}}>Date de fin :</TableCell>
                                    <TableCell sx={{color:"#5DA1BC"}} align="right">{chantier?.Fin}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
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
          onClick={onClose}
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* ---------- SOUS-COMPONENTS ---------- */

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