// PAGE CHANTIER 

// Importations des bibliothèques et composants nécessaires
import { alpha, Box, Divider } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

import Bandeau from "../component/bandeau";
import Card5 from "../component/card5";
import Card6 from "../component/card6";
import TableChantier from "../component/tableChantier";
import PopinNewChantier from "../component/popinNewChantier";
import PopinFiltre from "../component/popinFiltre";
import ImportExcel from "../algo/importExcel";
import { Grid, Button, TextField } from "@mui/material";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EqualizerIcon from "@mui/icons-material/Equalizer";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import {getPrev, getCons} from "../services/chantierService.js"

//DEBUT PAGE
export default function Chantier() {

  const [refreshTableKey, setRefreshTableKey] = useState(0); // clé pour forcer le rafraîchissement de la table

  const [openPopin, setOpenPopin] = useState(false); 

  const openPopinNewChantier = () => setOpenPopin(true);
  const closePopinNewChantier = () => setOpenPopin(false);

  const [openPopinFiltre, setOpenPopinFiltre] = useState(false); 

  const openPopinFiltres = () => setOpenPopinFiltre(true);
  const closePopinFiltres = () => setOpenPopinFiltre(false);

  const [search, setSearch] = useState("");

  const [filtres, setFiltres] = useState({
    statuts: [],
    priorites: [],
    qa: []
  });

  //gère la récupération des filtres
  const handleApplyFiltres = (newFiltres) => {
    setFiltres(newFiltres);
  }

  // gère l'import du référentiel projet
  const importExcel = ImportExcel({onDataExtracted: (titresChantiers) => 
    {console.log("Titres reçus depuis Excel");

    }})

  const [prev, setPrev] = useState("");
  const [cons, setCons] = useState("");
  const [raf, setRaf] = useState("");  

  const fetchPrev = async () => {
        try {
          const res = await getPrev();
          setPrev(res[0].sum);
        } catch (error) {
          console.error(error);
        }
    };

    const fetchCons = async () => {
        try {
          const res = await getCons();
          setCons(res[0].sum);
        } catch (error) {
          console.error(error);
        }
    };
  
      useEffect(() => {
        fetchPrev();
      }, []);

      useEffect(() => {
        fetchCons();
      }, []);

      useEffect(() => {
        setRaf(prev-cons);
      }, [prev, cons]);

      const refreshKpis = async () => {
      await Promise.all([
        fetchPrev(),
        fetchCons()
      ]);
    };

    const refreshAll = async () => {
      await refreshKpis();
      setRefreshTableKey(prevKey => prevKey + 1); // Incrémente la clé pour forcer le rafraîchissement de la table
    };



  return (
    <>
      <Bandeau title="Chantiers" subtitle="Gestion des chantiers QA" />

      <Box sx={{ paddingTop: "26px", paddingLeft: "100px", height: "180px" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Card6
              title="RAF QA"
              value={raf}
              icon={<ErrorOutlineIcon sx={{ color: "#009951", fontSize: 35, fontWeight: "bold" }} />}
              unit="JH"
              color="#009951"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Card5
              title="Consommé"
              value={cons}
              icon={<CheckCircleOutlineIcon sx={{ color: "#C00F0C", fontSize: 35 }} />}
              unit="JH"
              color="#9d0e0bdd"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Card5
              title="Charge globale"
              value={prev}
              icon={<EqualizerIcon sx={{ color: "black", fontSize: 35 }} />}
              unit="JH"
              color="black"
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ paddingTop: "50px", display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <Divider sx={{ width: "90%" }} />
      </Box>

      <Box
        sx={{
          px: { xs: 2, md: 6 }, // padding responsive
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap", // ✅ clé du responsive
        }}
      >
      {/* Champ de recherche */}
      <TextField
        placeholder="Rechercher un chantier"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          flexGrow: 1, // prend l’espace disponible
          minWidth: { xs: "100%", md: 300 },
          backgroundColor: "#DFDFDF",
          borderRadius: "100px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
          "& fieldset": { border: "none" },
          "& .MuiOutlinedInput-root": {
          fontSize: "18px",
          paddingLeft: "12px",
          },
        }}
        InputProps={{
          startAdornment: (
            <SearchOutlinedIcon sx={{ mr: 1, color: "black" }} />
          ),
        }}
      />

      {/* Bouton filtres */}
      <Button
        variant="contained"
        onClick={openPopinFiltres}
        sx={{
          whiteSpace: "nowrap",
          borderRadius: "100px",
          textTransform: "none",
          height: "60px",
          backgroundColor: "#DFDFDF",
          color: "black",
          px: 3,
        }}
      >
        <FilterAltOutlinedIcon sx={{ mr: 1 }} />
        Filtres
      </Button>

      {/* Bouton export Excel */}
      <Button
        variant="contained"
        sx={{
          whiteSpace: "nowrap",
          borderRadius: "100px",
          height: "60px",
          textTransform: "none",
          backgroundColor: alpha("#0178A5", 0.7),
          color: "black",
          px: 3,
        }}
      >
        <FileUploadOutlinedIcon sx={{ mr: 1 }} />
      EXCEL
    </Button>

    {/* Bouton référentiel */}
    <Button
      variant="contained"
      component="label"
      sx={{
      whiteSpace: "nowrap",
      borderRadius: "100px",
      height: "60px",
      textTransform: "none",
      backgroundColor: alpha("#0178A5", 0.7),
      color: "black",
      px: 3,
      }}
    >
      <FileDownloadOutlinedIcon sx={{ mr: 1 }} />
      Référentiel
      <input hidden type="file" accept=".xlsx,.xls" onChange={importExcel.handleFileChange}/>

    </Button>

    {/* Bouton principal (CTA) */}
    <Button
      variant="contained"
      sx={{
      ml: { md: "auto" }, // pousse à droite sur desktop
      whiteSpace: "nowrap",
      borderRadius: "100px",
      height: "60px",
      textTransform: "none",
      backgroundColor: alpha("#D4DA17", 0.8),
      color: "black",
      px: 3,
      }}
      onClick={openPopinNewChantier}
    >
      <AddOutlinedIcon sx={{ mr: 1 }} />
      Créer un chantier
    </Button>
  </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <Divider sx={{ width: "90%", marginBottom: "15px" }} />
      </Box>

      <Box sx={{ paddingLeft: "100px", paddingRight: "100px", paddingTop: "30px", display: "flex", justifyContent: "center" }}>
        <TableChantier key={refreshTableKey} onChantierUpdated={refreshKpis} filtres={filtres} search={search} />
      </Box>

      {/* POPIN NOUVEAU CHANTIER */}
      <PopinNewChantier open={openPopin} onClose={closePopinNewChantier} onCreated={refreshAll} />
      <PopinFiltre open={openPopinFiltre} onClose={closePopinFiltres} onApply={handleApplyFiltres} />
    </>
  );
}
// FIN PAGE