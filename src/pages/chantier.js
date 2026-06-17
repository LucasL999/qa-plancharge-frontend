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
import DataUsageIcon from '@mui/icons-material/DataUsage';
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
  const [displayRAF, setDisplayRAF] = useState(0);
  const [displayCons, setDisplayCons] = useState(0);
  const [displayPrev, setDisplayPrev] = useState(0);

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
  const animateValue = (start, end, setter, duration = 800) => {
    if (start === end) return;

    let startTime = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const t = Math.min(progress / duration, 1);
      const eased = easeOutCubic(t);

      const value = Math.floor(start + (end - start) * eased);
      setter(value);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setter(end);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    fetchPrev();
    const end = Number(prev || 0);
    animateValue(displayPrev, end, setDisplayPrev);
  }, [prev]);

  useEffect(() => {
    fetchCons();
    const end = Number(cons || 0);
    animateValue(displayCons, end, setDisplayCons);
  }, [cons]);

  // recalcul RAF dès que prev ou cons changent
  useEffect(() => {
    setRaf(prev - cons);
    const end = Number(raf || 0);
    animateValue(displayRAF, end, setDisplayRAF);
  }, [prev, cons, raf]);


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
      <Box sx={{ paddingTop: "26px", paddingLeft: "80px", height: "180px" }}>
        <Grid container spacing={2} alignItems="center">

          <Grid item xs={12} md={4}>
            <Card6
              title="Reste à faire (RAF)"
              value={displayRAF}
              icon={<ErrorOutlineIcon sx={{ color: "#009951", fontSize: 35, fontWeight: "bold" }} />}
              unit="JH"
              color="#009951"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Card5
              title="Charge consommée"
              value={displayCons}
              icon={<CheckCircleOutlineIcon sx={{ color: "#C00F0C", fontSize: 35 }} />}
              unit="JH"
              color="#9d0e0bdd"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Card5
              title="Charge globale"
              value={displayPrev}
              icon={<DataUsageIcon sx={{ color: "black", fontSize: 35 }} />}
              unit="JH"
              color="black"
            />
          </Grid>

        </Grid>
      </Box>

      {/* séparation */}
      <Box sx={{ paddingTop: "60px", display: "flex", justifyContent: "center", marginBottom: "30px" }}>
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
            position: "relative",
            isolation: "isolate",
            overflow: "hidden",
            minWidth: { xs: "100%", md: 300 },
            width: "600px",
            backgroundColor: "transparent",
            borderRadius: "100px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
            marginLeft: "50px",
            "& fieldset": { border: "none" },
            "& .MuiOutlinedInput-root": {
              fontSize: "18px",
              paddingLeft: "16px",
            },

            // fond de base
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(223, 223, 223, 1)",
              zIndex: -2,
            },

            // couche animée
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              transform: "translateX(-100%)",
              backgroundColor: "#cccccc",
              transition: "transform 0.3s ease",
              zIndex: -1,
            },

            "&:hover::before": {
              transform: "translateX(0)",
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
            position: "relative",
            isolation: "isolate",
            overflow: "hidden",
            borderRadius: "100px",
            height: "60px",
            width: "180px",
            fontSize: 20,
            textTransform: "none",
            backgroundColor: "#DFDFDF",
            color: "black",
            px: 3,
            backgroundColor: "transparent",

            // fond de base
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(223, 223, 223, 1)",
              zIndex: -2,
            },

            // couche animée
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              transform: "translateX(-100%)",
              backgroundColor: "#cccccc",
              transition: "transform 0.3s ease",
              zIndex: -1,
            },

            "&:hover::before": {
              transform: "translateX(0)",
            },
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
            position: "relative",
            isolation: "isolate",
            overflow: "hidden",
            borderRadius: "100px",
            height: "60px",
            width: "180px",
            fontSize: 20,
            textTransform: "none",
            color: "black",
            px: 3,
            backgroundColor: "transparent",


            // fond de base
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(1, 120, 165, 0.8)",
              zIndex: -2,
            },

            // couche animée
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              transform: "translateX(-100%)",
              backgroundColor: "#0178A5",
              transition: "transform 0.3s ease",
              zIndex: -1,
            },

            "&:hover::before": {
              transform: "translateX(0)",
            },
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
            position: "relative",
            isolation: "isolate",
            overflow: "hidden",
            borderRadius: "100px",
            height: "60px",
            width: "180px",
            textTransform: "none",
            color: "black",
            px: 3,
            backgroundColor: "transparent",

            // fond de base
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(1, 120, 165, 0.8)",
              zIndex: -2,
            },

            // couche animée
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              transform: "translateX(-100%)",
              backgroundColor: "#0178A5",
              transition: "transform 0.3s ease",
              zIndex: -1,
            },

            "&:hover::before": {
              transform: "translateX(0)",
            },
          }}
        >
          <FileDownloadOutlinedIcon sx={{ mr: 1 }} />
          <Typography
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 400,
              fontSize: 20,
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
            position: "relative",
            isolation: "isolate", // important
            overflow: "hidden",
            ml: { md: "auto" },
            whiteSpace: "nowrap",
            borderRadius: "100px",
            marginRight: "50px",
            height: "60px",
            width: "180px",
            fontSize: 20,
            textTransform: "none",
            color: "black",
            px: 3,
            backgroundColor: "transparent", // on désactive le bg MUI

            // fond de base
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(212,218,23,0.8)",
              zIndex: -2,
            },

            // couche animée
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              transform: "translateX(-100%)",
              backgroundColor: "#c2c91a",
              transition: "transform 0.3s ease",
              zIndex: -1,
            },

            "&:hover::before": {
              transform: "translateX(0)",
            },
          }}
        >
          <AddOutlinedIcon sx={{ mr: 1 }} />
          Chantier
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