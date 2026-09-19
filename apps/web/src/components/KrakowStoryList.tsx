import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { AppLink } from "@/components/AppLink";
import { Check } from "lucide-react";
import type { Locale, StorySummary } from "@/data/types";
import { useChrome } from "@/lib/chrome";
import { t } from "@/lib/copy";

const SKELETON_ROWS = 6;

type Props = {
  stories: StorySummary[];
  completed: string[];
  locale: Locale;
  showSkeleton: boolean;
};

const KrakowStoryList = ({ stories, completed, locale, showSkeleton }: Props) => {
  const c = useChrome();
  if (showSkeleton) {
    return (
      <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
        {Array.from({ length: SKELETON_ROWS }, (_, i) => (
          <Box component="li" key={i} sx={{ borderTop: 1, borderColor: "divider", px: 2, py: 1.5 }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="35%" height={20} />
          </Box>
        ))}
      </Box>
    );
  }
  return (
    <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
      {stories.map((story) => {
        const done = completed.includes(story.id);
        return (
          <Box component="li" key={story.id} sx={{ borderTop: 1, borderColor: "divider" }}>
            <AppLink
              to="/krakow/$storyId"
              params={{ storyId: story.id }}
              style={{ display: "block" }}
            >
              <Box
                sx={{
                  display: "flex",
                  minHeight: 56,
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1.5,
                  px: 2,
                  py: 1.5,
                  "&:hover": { bgcolor: "background.default" },
                }}
              >
                <span>
                  <Typography component="span" sx={{ display: "block", fontWeight: 500 }}>
                    {t(story.title, locale)}
                  </Typography>
                  <Typography component="span" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                    {t(story.place, locale)}
                  </Typography>
                </span>
                {done ? (
                  <Box sx={{ color: "success.main", display: "flex" }}>
                    <Check size={16} />
                  </Box>
                ) : (
                  <Typography component="span" color="primary" sx={{ fontSize: "0.875rem" }}>
                    {c("nav.open")}
                  </Typography>
                )}
              </Box>
            </AppLink>
          </Box>
        );
      })}
    </Box>
  );
};

export default KrakowStoryList;
