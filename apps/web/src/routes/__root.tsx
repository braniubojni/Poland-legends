import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { OpThemeProvider } from "@/theme/OpThemeProvider";

export const Route = createRootRoute({
  component: () => (
    <OpThemeProvider>
      <AppShell>
        <Outlet />
      </AppShell>
    </OpThemeProvider>
  ),
});
