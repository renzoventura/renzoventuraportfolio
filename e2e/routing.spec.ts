import { test, expect } from "@playwright/test";

test.describe("Routing", () => {
  test("homepage loads with hero content", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/renzo ventura/i);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("/about loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText(/senior software engineer/i).first()).toBeVisible();
  });

  test("/projects/stride loads with project details", async ({ page }) => {
    await page.goto("/projects/stride");
    await expect(page.getByRole("heading", { name: /stride/i })).toBeVisible();
  });

  test("photo gallery loads at /photo", async ({ page }) => {
    await page.goto("/photo");
    await expect(page).toHaveTitle(/renzo ventura/i);
    // Album cards should be visible
    await expect(page.getByText("Japan").first()).toBeVisible();
  });

  test("/photo/japan23 album loads", async ({ page }) => {
    await page.goto("/photo/japan23");
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("/photo/eu22 album loads", async ({ page }) => {
    await page.goto("/photo/eu22");
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("/photo/eu25 album loads", async ({ page }) => {
    await page.goto("/photo/eu25");
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("/photo/daylesford album loads", async ({ page }) => {
    await page.goto("/photo/daylesford");
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("non-existent route returns 404", async ({ page }) => {
    const response = await page.goto("/this-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
