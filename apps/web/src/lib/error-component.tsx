import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";

const errorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
};

const AppErrorComponent = ({ error }: ErrorComponentProps) => (
  <Box
    component="main"
    sx={{
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1.5,
      px: 3,
      textAlign: "center",
      bgcolor: "background.default",
      color: "text.primary",
    }}
  >
    <Box sx={{ color: "primary.main" }} aria-hidden>
      <TriangleAlert size={40} strokeWidth={2} />
    </Box>
    <Typography variant="h3">Something went wrong</Typography>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ maxWidth: 448, overflowWrap: "anywhere" }}
    >
      {errorMessage(error)}
    </Typography>
  </Box>
);

export { AppErrorComponent };
