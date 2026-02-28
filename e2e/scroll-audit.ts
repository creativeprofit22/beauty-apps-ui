import { chromium, type Page } from "@playwright/test";
import path from "path";
import fs from "fs";

const BASE = "http://localhost:3006";
const DIR = path.resolve("test-results/screenshots/scroll-audit");
fs.mkdirSync(DIR, { recursive: true });

const PAGES = [
  { name: "tokens", path: "/" },
  { name: "typography", path: "/typography" },
  { name: "backgrounds", path: "/backgrounds" },
  { name: "components", path: "/components" },
  { name: "forms", path: "/forms" },
  { name: "admin", path: "/admin" },
  { name: "client-portal", path: "/client-portal" },
  { name: "engagement", path: "/engagement" },
  { name: "mobile", path: "/mobile" },
];

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-gpu", "--disable-software-rasterizer", "--no-sandbox"],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  for (const pg of PAGES) {
    await page.goto(`${BASE}${pg.path}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const mainEl = await page.$("main");
    if (!mainEl) continue;

    const scrollHeight = await mainEl.evaluate((el) => el.scrollHeight);
    const clientHeight = await mainEl.evaluate((el) => el.clientHeight);
    const totalScrolls = Math.ceil(scrollHeight / clientHeight);

    for (let i = 0; i < totalScrolls; i++) {
      await mainEl.evaluate((el, top) => { el.scrollTop = top; }, i * clientHeight);
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(DIR, `${pg.name}-${i}.png`) });
    }
    console.log(`${pg.name}: ${totalScrolls} screenshots`);
  }

  await browser.close();
  console.log(`\nAll saved to ${DIR}`);
}

main().catch(console.error);
