// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AppErrorBoundary } from "./error-boundary";
import { AppErrorComponent } from "./error-component";

beforeEach(() => {
  document.documentElement.dataset.theme = "light";
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  delete document.documentElement.dataset.theme;
});

const Boom = ({ fail }: { fail: () => boolean }) => {
  if (fail()) throw new Error("provider blew up");
  return <p>app recovered</p>;
};

describe("AppErrorBoundary", () => {
  it("catches a throw outside the router and shows the shared error chrome", () => {
    render(
      <AppErrorBoundary>
        <Boom fail={() => true} />
      </AppErrorBoundary>,
    );

    expect(screen.getByRole("main")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Something went wrong" })).toBeTruthy();
    expect(screen.getByText("provider blew up")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Try again" })).toBeTruthy();
  });

  it("re-renders the tree when Try again is pressed and the cause is gone", () => {
    let fail = true;
    render(
      <AppErrorBoundary>
        <Boom fail={() => fail} />
      </AppErrorBoundary>,
    );

    fail = false;
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.getByText("app recovered")).toBeTruthy();
  });

  it("shows the same screen again when the failure persists, without looping", async () => {
    let attempts = 0;
    const Always = () => {
      attempts += 1;
      throw new Error("still broken");
    };

    render(
      <AppErrorBoundary>
        <Always />
      </AppErrorBoundary>,
    );

    const afterCatch = attempts;
    expect(afterCatch).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.getByText("still broken")).toBeTruthy();
    const afterRetry = attempts;
    expect(afterRetry).toBeGreaterThan(afterCatch);

    await new Promise((resolve) => setTimeout(resolve, 40));
    expect(attempts).toBe(afterRetry);
    expect(screen.getByRole("button", { name: "Try again" })).toBeTruthy();
  });
});

const mountFailingRoute = async (fail: () => boolean) => {
  let loads = 0;
  const rootRoute = createRootRoute();
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    loader: () => {
      loads += 1;
      if (fail()) throw new Error("loader failed");
      return { ok: true };
    },
    component: () => <p>route recovered</p>,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
    history: createMemoryHistory({ initialEntries: ["/"] }),
    defaultErrorComponent: AppErrorComponent,
  });
  await router.load();
  render(<RouterProvider router={router} />);
  return { loads: () => loads };
};

describe("AppErrorComponent", () => {
  it("re-invokes the route loader and recovers when the cause is gone", async () => {
    let fail = true;
    const route = await mountFailingRoute(() => fail);
    expect(await screen.findByText("loader failed")).toBeTruthy();
    const before = route.loads();

    fail = false;
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByText("route recovered")).toBeTruthy();
    expect(route.loads()).toBeGreaterThan(before);
  });

  it("stays on the error screen when the loader fails again", async () => {
    const route = await mountFailingRoute(() => true);
    expect(await screen.findByRole("button", { name: "Try again" })).toBeTruthy();
    const before = route.loads();

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    await waitFor(() => expect(route.loads()).toBeGreaterThan(before));
    expect(screen.getByText("loader failed")).toBeTruthy();
    const afterRetry = route.loads();

    await new Promise((resolve) => setTimeout(resolve, 40));
    expect(route.loads()).toBe(afterRetry);
  });
});
