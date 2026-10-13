import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { useRouter, type ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { errorMessage, errorMode, retryRoute } from "@/lib/error-helpers";
import { createOpTheme } from "@/theme/opowiesci";

type ScreenProps = {
  error: unknown;
  onRetry: () => void;
};

const ErrorScreen = ({ error, onRetry }: ScreenProps) => (
  <ThemeProvider theme={createOpTheme(errorMode(document.documentElement.dataset.theme))}>
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
      <Button variant="contained" onClick={onRetry}>
        Try again
      </Button>
    </Box>
  </ThemeProvider>
);

const AppErrorComponent = ({ error, reset }: ErrorComponentProps) => {
  const router = useRouter();
  const retry = () => {
    retryRoute(() => router.invalidate(), reset);
  };
  return <ErrorScreen error={error} onRetry={retry} />;
};

export { AppErrorComponent, ErrorScreen };
