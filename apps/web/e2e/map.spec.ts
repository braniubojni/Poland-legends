import { expect, test } from "@playwright/test";

test("opens Kraków from the Poland map", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Kraków", exact: true }).click();
  await expect(page).toHaveURL(/\/krakow$/);
  await expect(page.getByRole("heading", { name: "Kraków" })).toBeVisible();
});

test("a locked city shows Coming next and stays on the home map", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Warsaw — Coming next" }).click();
  await expect(page.getByRole("status")).toHaveText("Warsaw — Coming next.");
  await expect(page).toHaveURL(/\/$/);
});
