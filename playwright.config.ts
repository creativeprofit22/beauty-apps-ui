import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-results/playwright",
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: "http://localhost:3006",
    screenshot: "off",
    video: "off",
    trace: "off",
  },
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        viewport: { width: 1440, height: 900 },
        launchOptions: {
          args: ["--disable-gpu", "--disable-software-rasterizer", "--no-sandbox"],
        },
      },
    },
  ],
  webServer: {
    command: "SKIN=spa PORT=3006 bun run dev",
    port: 3006,
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
