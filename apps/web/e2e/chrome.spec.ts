import { expect, test } from "@playwright/test";

test("locale survives navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Polski" }).click();
  await expect(page.getByRole("heading", { name: "Opowieści, które wciąż stoją." })).toBeVisible();
  await page.getByRole("button", { name: "Kraków", exact: true }).click();
  await expect(page.getByText("Otwórz pinezkę.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Polska" })).toBeVisible();
});

test("dark theme persists and is not MUI purple", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Dark mode" }).click();
  await expect(page.getByRole("button", { name: "Light mode" })).toBeVisible();

  const primary = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--op-primary").trim(),
  );
  expect(primary.toLowerCase()).toBe("#c4454a");
  expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("dark");

  await page.reload();
  await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe("dark");
  const saved = await page.evaluate(() => localStorage.getItem("opowiesci-v1"));
  expect(saved).toContain("dark");
});
