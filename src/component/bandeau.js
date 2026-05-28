import { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import PopinAlertes from "./popinAlertes"; // ✅ import

export default function Bandeau({ title, subtitle }) {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bandeau */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          backgroundColor: "#0178A5",
          paddingTop: "40px",
          paddingBottom: "12px",
        }}
      >

        {/* Icône notif */}
        <NotificationsOutlinedIcon
          onClick={() => setOpen(true)}
          sx={{
            position: "absolute",
            top: "50%",
            left: "92%",
            transform: "translate(-50%, -50%)",
            fontSize: 55,
            color: "#D4DA17",
            cursor: "pointer",
          }}
        />

        {/* Titre */}
        <Typography
          align="center"
          sx={{
            fontSize: "50px",
            fontWeight: "bold",
            color: "#F5F7F9",
          }}
        >
          {title}
        </Typography>

        {/* Sous-titre */}
        <Typography
          align="center"
          sx={{
            fontSize: "13px",
            fontWeight: "bold",
            marginTop: "15px",
            color: "#F5F7F9",
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Divider sx={{ width: "100%", border: "1px solid #8d8d8d" }} />

      {/* ✅ Popin séparée */}
      <PopinAlertes
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}