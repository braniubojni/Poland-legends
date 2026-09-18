import type { z } from "zod";

export class NotFoundError extends Error {}

export const usesStaticContent = () =>
  Boolean(import.meta.env.PROD) || import.meta.env.VITE_API_URL === "";

const API_BASE = import.meta.env.PROD
  ? ""
  : (import.meta.env.VITE_API_URL ?? "http://localhost:8080");

export const fetchJson = async <T>(path: string, schema: z.ZodType<T>): Promise<T> => {
  const res = await fetch(`${API_BASE}${path}`);
  if (res.status === 404) throw new NotFoundError(`not found: ${path}`);
  if (!res.ok) throw new Error(`request failed: ${res.status} ${path}`);
  return schema.parse(await res.json());
};
