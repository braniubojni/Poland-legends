import { resolveTheme, type Theme } from "@/lib/theme";

const FALLBACK_MESSAGE = "An unexpected error occurred.";

export const errorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
};

export const errorMode = (datasetTheme: string | undefined): Theme => {
  if (datasetTheme === "light" || datasetTheme === "dark") return datasetTheme;
  return resolveTheme(null);
};

export const retryRoute = (invalidate: () => Promise<void>, reset: () => void) => {
  void Promise.resolve().then(invalidate).then(reset, reset);
};
