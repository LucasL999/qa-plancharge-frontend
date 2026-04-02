import { Box, Typography } from "@mui/material";
import Bandeau from "../component/bandeau";

export default function User() {

  return (
    <div>
    <Bandeau title="Utilisateurs" subtitle="Gestion des utilisateurs et de leurs rôles" />
    <Box>
      <Typography>Test</Typography>
    </Box>
    </div>
  )
};

