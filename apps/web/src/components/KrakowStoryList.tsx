import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppLink } from "@/components/AppLink";
import { Check } from "lucide-react";
import type { Locale, StorySummary } from "@/data/types";
import { t } from "@/lib/copy";

type Props = {
  stories: StorySummary[];
  completed: string[];
  locale: Locale;
};

const KrakowStoryList = ({ stories, completed, locale }: Props) => (
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
                  {locale === "pl" ? "Otwórz" : "Open"}
                </Typography>
              )}
            </Box>
          </AppLink>
        </Box>
      );
    })}
  </Box>
);

export default KrakowStoryList;
