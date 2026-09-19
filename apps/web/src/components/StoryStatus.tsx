import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppLink } from "@/components/AppLink";
import { useChrome } from "@/lib/chrome";

const StoryStatus = ({ kind }: { kind: "not-found" | "error" }) => {
  const c = useChrome();
  if (kind === "not-found") {
    return (
      <Box component="main">
        <Typography>{c("status.notFound")}</Typography>
        <AppLink
          to="/krakow"
          style={{ marginTop: 16, display: "inline-flex", color: "var(--op-primary)" }}
        >
          Kraków
        </AppLink>
      </Box>
    );
  }
  return (
    <Box component="main">
      <Typography>{c("status.error")}</Typography>
    </Box>
  );
};

export { StoryStatus };
