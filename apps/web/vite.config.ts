import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

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
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      // 90% is the logic layer. Routes, games, and other JSX are the Playwright flows.
      include: [
        "src/lib/**/*.ts",
        "src/components/**/*helpers.ts",
        "src/components/map/attribution.ts",
        "src/components/map/border-helpers.ts",
        "src/components/map/loading-helpers.ts",
        "src/components/map/localeBag.ts",
        "src/routes/**/-helpers.ts",
        "src/theme/**/*.ts",
      ],
      exclude: [
        ...coverageConfigDefaults.exclude,
        // Generated from content/ (009/018) and the TanStack router plugin.
        "src/routeTree.gen.ts",
        "src/data/**",
        "**/*.gen.ts",
        // MapLibre mount: map constructor, controls, pins, resize. Playwright renders this in Chromium.
        "src/components/map/poland-helpers.ts",
        "src/components/map/krakow-helpers.ts",
        "src/components/map/PolandLibre.tsx",
        "src/components/map/KrakowLibre.tsx",
      ],
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
  },
});
