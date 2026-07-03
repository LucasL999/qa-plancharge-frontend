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
import { alpha, Box, Divider, Grid, Button, TextField, Typography, IconButton, Fade } from "@mui/material";

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
import { getPrev, getCons, getNbChantierEncours, importChantier } from "../services/chantierService.js";
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
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

// -----------------------------------------------------------------------------
// STYLE PARTAGÉ - boutons "pill" avec effet de survol par calque
// -----------------------------------------------------------------------------
const pillButtonBaseSx = {
  position: "relative",
  isolation: "isolate",
  overflow: "hidden",
  whiteSpace: "nowrap",
  borderRadius: "100px",
  height: { xs: "48px", sm: "56px", md: "60px" },
  width: { xs: "100%", sm: "auto" },
  minWidth: { sm: "150px" },
  fontSize: { xs: 16, sm: 18, md: 20 },
  textTransform: "none",
  color: "black",
  px: { xs: 2, md: 3 },
  backgroundColor: "transparent",
};

const pillButtonLayers = (baseColor, hoverColor) => ({
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    backgroundColor: baseColor,
    zIndex: -2,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    transform: "translateX(-100%)",
    backgroundColor: hoverColor,
    transition: "transform 0.3s ease",
    zIndex: -1,
  },
  "&:hover::before": {
    transform: "translateX(0)",
  },
});

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
  const [nbChantierEncours, setNbChantierEncours] = useState(0);
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
  const [chantiersExistants, setChantiersExistants] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);

  const [chantiersImportes, setChantiersImportes] = useState([]);
  const [notifSuccessOpen, setNotifSuccessOpen] = useState(false);

  const NOTIF_DURATION = 6000; // durée d'affichage avant fermeture auto (ms)

  const closeNotif = () => setNotifOpen(false);
  const closeNotifSuccess = () => setNotifSuccessOpen(false);

  const importExcel = ImportExcel({
    onDataExtracted: async (titresChantiers) => {
      console.log("Titres reçus depuis Excel");

      const existants = [];
      const importes = [];

      try {
        for (const titre of titresChantiers) {
          try {
            await importChantier(titre);
            importes.push(titre);
          } catch (error) {
            console.log("ERROR FRONT :", error);

            if (
              error.status === 409 ||
              error.message?.includes("existe")
            ) {
              existants.push(titre);
            } else {
              console.error(
                `Erreur lors de l'ajout du chantier ${titre} :`,
                error
              );
            }
          }
        }

        setChantiersExistants(existants);
        setChantiersImportes(importes);

        if (importes.length > 0) {
          refreshAll();
        }
      }
      catch (error) {
        console.error("Erreur globale :", error);
      }


    },
  });

  useEffect(() => {
    if (chantiersExistants.length > 0) {
      setNotifOpen(true);

      const timer = setTimeout(() => {
        setNotifOpen(false);
      }, NOTIF_DURATION);

      return () => clearTimeout(timer);
    }
  }, [chantiersExistants]);

  useEffect(() => {
    if (chantiersImportes.length > 0) {
      setNotifSuccessOpen(true);

      const timer = setTimeout(() => {
        setNotifSuccessOpen(false);
      }, NOTIF_DURATION);

      return () => clearTimeout(timer);
    }
  }, [chantiersImportes]);

  // une fois le fade de sortie terminé, on vide vraiment le contenu
  const handleNotifExited = () => {
    setChantiersExistants([]);
  };

  const handleNotifSuccessExited = () => {
    setChantiersImportes([]);
  };

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

  const fetchNbChantierEncours = async () => {
    try {
      const res = await getNbChantierEncours();
      setNbChantierEncours(res[0].count);
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

  useEffect(() => {
    fetchNbChantierEncours();
  }, [prev]);

  // ---------------------------------------------------------------------------
  // REFRESH HELPERS
  // ---------------------------------------------------------------------------
  const refreshKpis = async () => {
    await Promise.all([fetchPrev(), fetchCons(), fetchNbChantierEncours()]);
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

      {chantiersExistants.length > 0 && (
        <Fade in={notifOpen} timeout={{ enter: 250, exit: 400 }} onExited={handleNotifExited}>
          <Box
            role="alert"
            sx={{
              position: "fixed",
              top: { xs: 12, md: 24 },
              right: { xs: 12, md: 24 },
              left: { xs: 12, md: "auto" },
              zIndex: 1400,
              width: { xs: "auto", sm: 380 },
              maxWidth: { xs: "calc(100% - 24px)", sm: 380 },
              backgroundColor: "#fff3cd",
              border: "1px solid #ffe69c",
              borderRadius: "10px",
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
              color: "#664d03",
              overflow: "hidden",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, p: 2 }}>
              <WarningAmberOutlinedIcon sx={{ color: "#997404", mt: "2px" }} />

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography fontWeight="bold" sx={{ fontSize: 15 }}>
                  Les chantiers suivants existent déjà
                </Typography>

                <Box
                  component="ul"
                  sx={{
                    mt: 0.5,
                    mb: 0,
                    pl: 2.5,
                  }}
                >
                  {chantiersExistants.map((chantier, index) => (
                    <li key={index}>
                      <Typography sx={{ fontSize: 14 }}>{chantier}</Typography>
                    </li>
                  ))}
                </Box>
              </Box>

              <IconButton
                size="small"
                onClick={closeNotif}
                aria-label="Fermer la notification"
                sx={{ color: "#664d03", mt: "-4px", mr: "-8px" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* barre de progression indiquant le temps avant fermeture automatique */}
            {notifOpen && (
              <Box
                key={chantiersExistants.length /* relance l'anim à chaque nouvelle notif */}
                sx={{
                  height: 3,
                  backgroundColor: "#997404",
                  animation: `chantierNotifProgress ${NOTIF_DURATION}ms linear forwards`,
                  "@keyframes chantierNotifProgress": {
                    from: { width: "100%" },
                    to: { width: "0%" },
                  },
                }}
              />
            )}
          </Box>
        </Fade>
      )}

      {chantiersImportes.length > 0 && (
        <Fade in={notifSuccessOpen} timeout={{ enter: 250, exit: 400 }} onExited={handleNotifSuccessExited}>
          <Box
            role="status"
            sx={{
              position: "fixed",
              top: {
                xs: chantiersExistants.length > 0 ? 132 : 12,
                md: chantiersExistants.length > 0 ? 148 : 24,
              },
              right: { xs: 12, md: 24 },
              left: { xs: 12, md: "auto" },
              zIndex: 1400,
              width: { xs: "auto", sm: 380 },
              maxWidth: { xs: "calc(100% - 24px)", sm: 380 },
              backgroundColor: "#d1e7dd",
              border: "1px solid #a3cfbb",
              borderRadius: "10px",
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
              color: "#0f5132",
              overflow: "hidden",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, p: 2 }}>
              <CheckCircleOutlineIcon sx={{ color: "#0f5132", mt: "2px" }} />

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography fontWeight="bold" sx={{ fontSize: 15 }}>
                  {chantiersImportes.length > 1
                    ? `${chantiersImportes.length} chantiers ont été ajoutés avec succès`
                    : "Le chantier a été ajouté avec succès"}
                </Typography>

                <Box
                  component="ul"
                  sx={{
                    mt: 0.5,
                    mb: 0,
                    pl: 2.5,
                  }}
                >
                  {chantiersImportes.map((chantier, index) => (
                    <li key={index}>
                      <Typography sx={{ fontSize: 14 }}>{chantier}</Typography>
                    </li>
                  ))}
                </Box>
              </Box>

              <IconButton
                size="small"
                onClick={closeNotifSuccess}
                aria-label="Fermer la notification"
                sx={{ color: "#0f5132", mt: "-4px", mr: "-8px" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* barre de progression indiquant le temps avant fermeture automatique */}
            {notifSuccessOpen && (
              <Box
                key={chantiersImportes.length /* relance l'anim à chaque nouvelle notif */}
                sx={{
                  height: 3,
                  backgroundColor: "#0f5132",
                  animation: `chantierNotifProgress ${NOTIF_DURATION}ms linear forwards`,
                  "@keyframes chantierNotifProgress": {
                    from: { width: "100%" },
                    to: { width: "0%" },
                  },
                }}
              />
            )}
          </Box>
        </Fade>
      )}

      {/* KPIs */}
      <Box sx={{ pt: { xs: 3, md: "26px" }, px: { xs: 2, sm: 3, md: "80px" } }}>
        <Grid container spacing={2} alignItems="stretch">

          <Grid item xs={12} sm={6} md={3}>
            <Card6
              title="Reste à faire (RAF)"
              value={displayRAF}
              icon={<ErrorOutlineIcon sx={{ color: "#009951", fontSize: 35, fontWeight: "bold" }} />}
              unit="JH"
              color="#009951"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card5
              title="Charge consommée"
              value={displayCons}
              icon={<CheckCircleOutlineIcon sx={{ color: "#C00F0C", fontSize: 35 }} />}
              unit="JH"
              color="#9d0e0bdd"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card5
              title="Charge globale"
              value={displayPrev}
              icon={<DataUsageIcon sx={{ color: "black", fontSize: 35 }} />}
              unit="JH"
              color="black"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card5
              title="Nombre de chantiers"
              value={nbChantierEncours}
              icon={<AutorenewOutlinedIcon sx={{ color: "black", fontSize: 35 }} />}
              unit="en cours"
              color="black"
            />
          </Grid>

        </Grid>
      </Box>

      {/* séparation */}
      <Box sx={{ pt: { xs: 4, md: "60px" }, display: "flex", justifyContent: "center", mb: { xs: 3, md: "30px" } }}>
        <Divider sx={{ width: { xs: "92%", md: "88%" } }} />
      </Box>

      {/* BARRE D'ACTIONS */}
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 6 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          gap: 2,
          flexWrap: { md: "wrap" },
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
            width: { xs: "100%", md: "600px" },
            minWidth: { xs: "100%", md: 300 },
            backgroundColor: "transparent",
            borderRadius: "100px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
            ml: { xs: 0, md: "50px" },
            "& fieldset": { border: "none" },
            "& .MuiOutlinedInput-root": {
              fontSize: { xs: 16, md: 18 },
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

        {/* rangée de boutons secondaires : passe en grille 2 colonnes sur mobile */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, auto)", md: "repeat(3, auto)" },
            gap: 2,
            width: { xs: "100%", md: "auto" },
          }}
        >
          {/* filtres */}
          <Button
            variant="contained"
            onClick={openPopinFiltres}
            sx={{
              ...pillButtonBaseSx,
              gridColumn: { xs: "span 1", sm: "auto" },
              ...pillButtonLayers("rgba(223, 223, 223, 1)", "#cccccc"),
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
              ...pillButtonBaseSx,
              gridColumn: { xs: "span 1", sm: "auto" },
              ...pillButtonLayers("rgba(1, 120, 165, 0.8)", "#0178A5"),
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
              ...pillButtonBaseSx,
              gridColumn: { xs: "span 2", sm: "auto" },
              ...pillButtonLayers("rgba(1, 120, 165, 0.8)", "#0178A5"),
            }}
          >
            <FileDownloadOutlinedIcon sx={{ mr: 1 }} />
            <Typography
              sx={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 400,
                fontSize: { xs: 16, sm: 18, md: 20 },
              }}
            >
              Référentiel
            </Typography>
            <input hidden type="file" accept=".xlsx,.xls" onChange={importExcel.handleFileChange} />
          </Button>
        </Box>

        {/* CTA création */}
        <Button
          variant="contained"
          onClick={openPopinNewChantier}
          sx={{
            ...pillButtonBaseSx,
            ml: { xs: 0, md: "auto" },
            mr: { xs: 0, md: "50px" },
            ...pillButtonLayers("rgba(212,218,23,0.8)", "#c2c91a"),
          }}
        >
          <AddOutlinedIcon sx={{ mr: 1 }} />
          Chantier
        </Button>

      </Box>

      {/* TABLE */}
      <Box sx={{ px: { xs: 1, sm: 3, md: "100px" }, pt: { xs: 3, md: "30px" }, pb: { xs: 4, md: 6 }, display: "flex", justifyContent: "center" }}>
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