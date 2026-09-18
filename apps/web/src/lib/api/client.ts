import type { z } from "zod";

export class NotFoundError extends Error {}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function fetchJson<T>(path: string, schema: z.ZodType<T>): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (res.status === 404) throw new NotFoundError(`not found: ${path}`);
  if (!res.ok) throw new Error(`request failed: ${res.status} ${path}`);
  return schema.parse(await res.json());
}
