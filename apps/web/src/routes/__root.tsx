import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ChromeProvider } from "@/lib/chrome";
import { ProgressProvider } from "@/lib/progress";
import { OpThemeProvider } from "@/theme/OpThemeProvider";

export const Route = createRootRoute({
  component: () => (
    <ProgressProvider>
      <ChromeProvider>
        <OpThemeProvider>
          <AppShell>
            <Outlet />
          </AppShell>
        </OpThemeProvider>
      </ChromeProvider>
    </ProgressProvider>
  ),
});
