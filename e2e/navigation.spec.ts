import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("site switcher is visible on portfolio home", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: /code/i }).first()).toBeVisible();
  });

  test("site switcher opens dropdown", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /code/i }).first().click();
    await expect(page.getByRole("link", { name: "film" })).toBeVisible();
  });

  test("site switcher navigates to photo gallery", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /code/i }).first().click();
    await page.getByRole("link", { name: "film" }).click();
    // Proxy may redirect localhost:3000/photo → photo.localhost:3000
    await expect(page).toHaveURL(/photo/);
  });

  test("photo nav has back link on album page", async ({ page }) => {
    await page.goto("/photo/japan23");
    // The back link text is "← back"
    const back = page.getByRole("link", { name: /← back/i });
    await expect(back).toBeVisible();
  });

  test("photo nav back link points to /photo", async ({ page }) => {
    await page.goto("/photo/japan23");
    const back = page.getByRole("link", { name: /← back/i });
    await expect(back).toHaveAttribute("href", "/photo");
  });

  test("back link navigates to photo gallery root", async ({ page }) => {
    await page.goto("/photo/japan23");
    await page.getByRole("link", { name: /← back/i }).click();
    // Proxy may rewrite to photo.localhost:3000/ — just check we're no longer on /japan23
    await expect(page).not.toHaveURL(/japan23/);
    await expect(page).toHaveURL(/photo/);
  });

  test("album card links navigate to the correct album", async ({ page }) => {
    await page.goto("/photo");
    await page.getByRole("link", { name: /japan/i }).first().click();
    // Proxy may rewrite localhost:3000/photo/japan23 → photo.localhost:3000/japan23
    await expect(page).toHaveURL(/japan23/);
  });

  test("no horizontal page overflow on homepage", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });

  test("no horizontal page overflow on photo gallery", async ({ page }) => {
    await page.goto("/photo");
    const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});

