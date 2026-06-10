 // -----------------------------------------------------------------------------
 // PAGE CHANTIER
 // -----------------------------------------------------------------------------
 // Cette page gère :
 // - l’affichage des KPIs chantier (RAF, consommé, charge globale)
 // - la recherche et les filtres
 // - l’import/export Excel
 // - la création de chantier
 // - l’affichage du tableau principal
 // -----------------------------------------------------------------------------

// Import UI Material UI
import { alpha, Box, Divider, Grid, Button, TextField, Typography } from "@mui/material";

// React hooks
import { useState, useEffect } from "react";

// Routing
import { useLocation } from "react-router-dom";

// Composants UI internes
import Bandeau from "../component/bandeau";
import Card5 from "../component/card5";
import Card6 from "../component/card6";
import TableChantier from "../component/tableChantier";
import PopinNewChantier from "../component/popinNewChantier";
import PopinFiltre from "../component/popinFiltre";

// Import métier / services
import ImportExcel from "../algo/importExcel";
import { getPrev, getCons } from "../services/chantierService.js";
import { exportExcel } from "../services/exportExcelService.js";

// Icônes MUI
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

// -----------------------------------------------------------------------------
// COMPOSANT PRINCIPAL
// -----------------------------------------------------------------------------
export default function Chantier() {

  // ---------------------------------------------------------------------------
  // STATE - UI / REFRESH CONTROL
  // ---------------------------------------------------------------------------
  const [refreshTableKey, setRefreshTableKey] = useState(0);
  const [refreshAlertes, setRefreshAlertes] = useState(0);

  const [openPopin, setOpenPopin] = useState(false);
  const [openPopinFiltre, setOpenPopinFiltre] = useState(false);

  const [search, setSearch] = useState("");

  // ---------------------------------------------------------------------------
  // STATE - FILTRES TABLE
  // ---------------------------------------------------------------------------
  const [filtres, setFiltres] = useState({
    statuts: [],
    priorites: [],
    qa: []
  });

  // ---------------------------------------------------------------------------
  // ROUTING - récupération id chantier depuis query params
  // ---------------------------------------------------------------------------
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const chantierId = params.get("id");

  // ---------------------------------------------------------------------------
  // STATE - KPIs chantier
  // ---------------------------------------------------------------------------
  const [prev, setPrev] = useState("");
  const [cons, setCons] = useState("");
  const [raf, setRaf] = useState("");

  // ---------------------------------------------------------------------------
  // POPIN HANDLERS
  // ---------------------------------------------------------------------------
  const openPopinNewChantier = () => setOpenPopin(true);
  const closePopinNewChantier = () => setOpenPopin(false);

  const openPopinFiltres = () => setOpenPopinFiltre(true);
  const closePopinFiltres = () => setOpenPopinFiltre(false);

  const handleApplyFiltres = (newFiltres) => {
    setFiltres(newFiltres);
  };

  // ---------------------------------------------------------------------------
  // IMPORT EXCEL - référentiel chantier
  // ---------------------------------------------------------------------------
  const importExcel = ImportExcel({
    onDataExtracted: (titresChantiers) => {
      console.log("Titres reçus depuis Excel");
    }
  });

  // ---------------------------------------------------------------------------
  // API CALLS - KPIs
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // EFFECTS - chargement initial KPIs
  // ---------------------------------------------------------------------------
  useEffect(() => {
    fetchPrev();
  }, []);

  useEffect(() => {
    fetchCons();
  }, []);

  // recalcul RAF dès que prev ou cons changent
  useEffect(() => {
    setRaf(prev - cons);
  }, [prev, cons]);

  // ---------------------------------------------------------------------------
  // REFRESH HELPERS
  // ---------------------------------------------------------------------------
  const refreshKpis = async () => {
    await Promise.all([fetchPrev(), fetchCons()]);
  };

  const refreshAll = async () => {
    await refreshKpis();
    setRefreshTableKey(prev => prev + 1);
    setRefreshAlertes(prev => prev + 1);
  };

  // ---------------------------------------------------------------------------
  // EXPORT EXCEL
  // ---------------------------------------------------------------------------
  const handleExportExcel = async () => {
    try {
      const blob = await exportExcel();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "chantiers.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors de l'export Excel", error);
    }
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------------------
  return (
    <>
      <Bandeau
        title="Chantiers"
        subtitle="Gestion des chantiers QA"
        refreshTrigger={refreshAlertes}
      />

      {/* KPIs */}
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

      {/* séparation */}
      <Box sx={{ paddingTop: "50px", display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <Divider sx={{ width: "88%" }} />
      </Box>

      {/* BARRE D'ACTIONS */}
      <Box
        sx={{
          px: { xs: 2, md: 6 },
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >

        {/* recherche */}
        <TextField
          placeholder="Rechercher un chantier"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            flexGrow: 1,
            minWidth: { xs: "100%", md: 300 },
            width: "600px",
            backgroundColor: "#DFDFDF",
            borderRadius: "100px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
            marginLeft: "50px",
            "& fieldset": { border: "none" },
            "& .MuiOutlinedInput-root": {
              fontSize: "18px",
              paddingLeft: "16px",
            },
          }}
          InputProps={{
            startAdornment: <SearchOutlinedIcon sx={{ mr: 1, color: "black" }} />
          }}
        />

        {/* filtres */}
        <Button
          variant="contained"
          onClick={openPopinFiltres}
          sx={{
            whiteSpace: "nowrap",
            borderRadius: "100px",
            height: "60px",
            width: "180px",
            textTransform: "none",
            backgroundColor: "#DFDFDF",
            color: "black",
            px: 3,
          }}
        >
          <FilterAltOutlinedIcon sx={{ mr: 1 }} />
          Filtres
        </Button>

        {/* export excel */}
        <Button
          variant="contained"          
          onClick={(e) => {
            e.preventDefault(); // ✅ bloque comportement navigateur
            e.stopPropagation(); // ✅ sécurité supplémentaire
            handleExportExcel();
          }}

          sx={{
            whiteSpace: "nowrap",
            borderRadius: "100px",
            height: "60px",
            width: "180px",
            textTransform: "none",
            backgroundColor: alpha("#0178A5", 0.7),
            color: "black",
            px: 3,
          }}
        >
          <FileUploadOutlinedIcon sx={{ mr: 1 }} />
          Excel
        </Button>

        {/* import référentiel */}
        <Button
          variant="contained"
          component="label"
          sx={{
            whiteSpace: "nowrap",
            borderRadius: "100px",
            height: "60px",
            width: "180px",
            textTransform: "none",
            backgroundColor: alpha("#0178A5", 0.7),
            color: "black",
            px: 3,
          }}
        >
          <FileDownloadOutlinedIcon sx={{ mr: 1 }} />
          <Typography
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 400,
              fontSize: "0.875rem",
            }}
          >
            Référentiel
          </Typography>
          <input hidden type="file" accept=".xlsx,.xls" onChange={importExcel.handleFileChange} />
        </Button>

        {/* CTA création */}
        <Button
          variant="contained"
          onClick={openPopinNewChantier}
          sx={{
            ml: { md: "auto" },
            whiteSpace: "nowrap",
            borderRadius: "100px",
            marginRight: "50px",
            height: "60px",
            width: "180px",
            textTransform: "none",
            backgroundColor: alpha("#D4DA17", 0.8),
            color: "black",
            px: 3,
          }}
        >
          <AddOutlinedIcon sx={{ mr: 1 }} />
          Créer un chantier
        </Button>

      </Box>

      {/* TABLE */}
      <Box sx={{ paddingLeft: "100px", paddingRight: "100px", paddingTop: "30px", display: "flex", justifyContent: "center" }}>
        <TableChantier
          key={refreshTableKey}
          onChantierUpdated={refreshAll}
          filtres={filtres}
          search={search}
          selectedId={chantierId}
        />
      </Box>

      {/* POPINS */}
      <PopinNewChantier open={openPopin} onClose={closePopinNewChantier} onCreated={refreshAll} />
      <PopinFiltre open={openPopinFiltre} onClose={closePopinFiltres} onApply={handleApplyFiltres} />
    </>
  );
}