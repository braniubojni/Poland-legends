import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@/data/types";
import { applyTheme, resolveTheme, type Theme } from "@/lib/theme";

const SAVE_VERSION = 1;

type ProgressState = {
  version: number;
  locale: Locale;
  theme: Theme | null;
  completed: string[];
  setLocale: (locale: Locale) => void;
  setTheme: (theme: Theme) => void;
  markDone: (storyId: string) => void;
  isDone: (storyId: string) => boolean;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      version: SAVE_VERSION,
      locale: "en",
      theme: null,
      completed: [],
      setLocale: (locale) => set({ locale }),
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
      markDone: (storyId) =>
        set((s) => (s.completed.includes(storyId) ? s : { completed: [...s.completed, storyId] })),
      isDone: (storyId) => get().completed.includes(storyId),
    }),
    {
      name: "opowiesci-v1",
      version: SAVE_VERSION,
      partialize: (s) => ({
        version: s.version,
        locale: s.locale,
        theme: s.theme,
        completed: s.completed,
      }),
    },
  ),
);

if (typeof window !== "undefined") {
  applyTheme(resolveTheme(useProgress.getState().theme));
  useProgress.persist.onFinishHydration((s) => {
    applyTheme(resolveTheme(s.theme));
  });
}
