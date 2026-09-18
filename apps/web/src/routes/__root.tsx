import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ProgressProvider } from "@/lib/progress";
import { OpThemeProvider } from "@/theme/OpThemeProvider";

export const Route = createRootRoute({
  component: () => (
    <ProgressProvider>
      <OpThemeProvider>
        <AppShell>
          <Outlet />
        </AppShell>
      </OpThemeProvider>
    </ProgressProvider>
  ),
});
