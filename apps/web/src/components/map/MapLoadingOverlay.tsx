import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

type Props = {
  label: string;
};

const MapLoadingOverlay = ({ label }: Props) => (
  <Box
    role="status"
    sx={{
      position: "absolute",
      inset: 0,
      zIndex: 5,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
      bgcolor: "var(--op-map)",
    }}
  >
    <CircularProgress color="primary" size={28} />
    <Typography component="span" sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>
      {label}
    </Typography>
  </Box>
);

export default MapLoadingOverlay;
