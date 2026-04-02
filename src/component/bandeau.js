import { alpha } from "@mui/material/styles";
import { Box, Divider, Typography } from "@mui/material";

export default function Bandeau({title, subtitle}) {
  return (
    <>
      {/* Bandeau bleu */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: alpha("#5DA1BC", 0.4),
          paddingTop: "40px",
          paddingBottom: "12px",
        }}
      >
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
    </>
  );
}