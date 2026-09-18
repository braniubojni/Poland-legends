import { createContext, use, useCallback, useMemo, useState, type ReactNode } from "react";
import type { Locale } from "../../data/types";
import { applyTheme, type Theme } from "../theme";
import { appendDone, loadSnapshot, saveSnapshot, type Snapshot } from "./helpers";

type ProgressActions = {
  setLocale: (locale: Locale) => void;
  setTheme: (theme: Theme) => void;
  markDone: (storyId: string) => void;
};

const LocaleContext = createContext<Locale | null>(null);
const ThemeContext = createContext<Theme | null | undefined>(undefined);
const CompletedContext = createContext<string[] | null>(null);
const ActionsContext = createContext<ProgressActions | null>(null);

const write = (next: Snapshot) => {
  saveSnapshot(next);
  return next;
};

const required = <T,>(value: T | null, hook: string): T => {
  if (value === null) throw new Error(`${hook} must be used within ProgressProvider`);
  return value;
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [snapshot, setSnapshot] = useState(loadSnapshot);

  const setLocale = useCallback((locale: Locale) => {
    setSnapshot((s) => write({ ...s, locale }));
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    applyTheme(theme);
    setSnapshot((s) => write({ ...s, theme }));
  }, []);

  const markDone = useCallback((storyId: string) => {
    setSnapshot((s) => {
      const completed = appendDone(s.completed, storyId);
      if (completed === s.completed) return s;
      return write({ ...s, completed });
    });
  }, []);

  const actions = useMemo(
    () => ({ setLocale, setTheme, markDone }),
    [setLocale, setTheme, markDone],
  );

  return (
    <ActionsContext value={actions}>
      <LocaleContext value={snapshot.locale}>
        <ThemeContext value={snapshot.theme}>
          <CompletedContext value={snapshot.completed}>{children}</CompletedContext>
        </ThemeContext>
      </LocaleContext>
    </ActionsContext>
  );
};

export const useLocale = () => required(use(LocaleContext), "useLocale");

export const useStoredTheme = () => {
  const value = use(ThemeContext);
  if (value === undefined) {
    throw new Error("useStoredTheme must be used within ProgressProvider");
  }
  return value;
};

export const useCompleted = () => required(use(CompletedContext), "useCompleted");

export const useProgressActions = () => required(use(ActionsContext), "useProgressActions");
