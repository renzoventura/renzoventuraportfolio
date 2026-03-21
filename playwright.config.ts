import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 2,
  timeout: 45_000,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      // Desktop runs all E2E tests
      name: "desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      // Mobile only runs mobile-specific specs to avoid doubling server load
      name: "mobile",
      use: { ...devices["iPhone 14"], browserName: "chromium" },
      testMatch: "**/mobile.spec.ts",
    },
  ],
  webServer: {
    command: "npm run build && npm start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
