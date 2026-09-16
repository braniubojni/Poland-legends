import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@/data/types";

const SAVE_VERSION = 1;

type ProgressState = {
  version: number;
  locale: Locale;
  completed: string[];
  setLocale: (locale: Locale) => void;
  markDone: (storyId: string) => void;
  isDone: (storyId: string) => boolean;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      version: SAVE_VERSION,
      locale: "en",
      completed: [],
      setLocale: (locale) => set({ locale }),
      markDone: (storyId) =>
        set((s) =>
          s.completed.includes(storyId) ? s : { completed: [...s.completed, storyId] },
        ),
      isDone: (storyId) => get().completed.includes(storyId),
    }),
    {
      name: "opowiesci-v1",
      version: SAVE_VERSION,
      partialize: (s) => ({
        version: s.version,
        locale: s.locale,
        completed: s.completed,
      }),
    },
  ),
);
