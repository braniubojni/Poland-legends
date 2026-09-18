import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [tanstackRouter({ target: "react", autoCodeSplitting: true }), react()],
  resolve: {
    tsconfigPaths: true,
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  optimizeDeps: {
    exclude: ["maplibre-gl"],
  },
  server: {
    host: true,
  },
  preview: {
    port: 4173,
  },
  build: {
    sourcemap: false,
  },
  test: {
    include: ["src/**/*.test.ts"],
  },
});
