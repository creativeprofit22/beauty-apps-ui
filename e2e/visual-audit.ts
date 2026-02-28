/**
 * Visual audit script — run directly with bun:
 *   bun e2e/visual-audit.ts
 *
 * Requires dev server already running on localhost:3006
 */
import { chromium, type Page } from "@playwright/test";
import path from "path";
import fs from "fs";

const BASE_URL = "http://localhost:3006";
const SCREENSHOT_DIR = path.resolve("test-results/screenshots");
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const PAGES = [
  { name: "design-tokens", path: "/", title: "Design Tokens" },
  { name: "typography", path: "/typography", title: "Typography" },
  { name: "backgrounds", path: "/backgrounds", title: "Backgrounds" },
  { name: "components", path: "/components", title: "Components" },
  { name: "forms", path: "/forms", title: "Forms" },
  { name: "admin", path: "/admin", title: "Admin" },
  { name: "client-portal", path: "/client-portal", title: "Client Portal" },
  { name: "engagement", path: "/engagement", title: "Engagement" },
  { name: "mobile", path: "/mobile", title: "Mobile" },
];

interface Finding {
  page: string;
  severity: "ERROR" | "WARN" | "INFO";
  issue: string;
  detail: string;
}

const findings: Finding[] = [];

function find(page: string, severity: Finding["severity"], issue: string, detail: string) {
  findings.push({ page, severity, issue, detail });
}

// ─── Helpers ──────────────────────────────────────────────

async function setTheme(page: Page, theme: "light" | "dark") {
  await page.evaluate((t) => {
    if (t === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", t);
  }, theme);
  await page.waitForTimeout(400);
}

// ─── Checks ───────────────────────────────────────────────

async function checkFonts(page: Page, pageName: string) {
  // Heading font check
  const headingResults = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    return headings.slice(0, 8).map((el) => ({
      tag: el.tagName,
      text: el.textContent?.trim().slice(0, 60) || "",
      font: getComputedStyle(el).fontFamily,
    }));
  });

  for (const h of headingResults) {
    if (!h.font.toLowerCase().includes("dm serif display")) {
      find(pageName, "WARN", "Wrong heading font", `<${h.tag}> "${h.text}" → ${h.font}`);
    }
  }

  // Body font check
  const bodyResults = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll("p, span.font-body, label"));
    return els.slice(0, 8).map((el) => ({
      text: el.textContent?.trim().slice(0, 60) || "",
      font: getComputedStyle(el).fontFamily,
    }));
  });

  for (const b of bodyResults) {
    const f = b.font.toLowerCase();
    if (b.text && !f.includes("dm sans") && !f.includes("fira code") && !f.includes("dm serif")) {
      find(pageName, "WARN", "Unexpected body font", `"${b.text}" → ${b.font}`);
    }
  }
}

async function checkStaleLabels(page: Page, pageName: string) {
  const staleTerms = [
    "Space Grotesk", "Inter", "IBM Plex", "Oswald",
    "Bebas Neue", "Plus Jakarta", "Quicksand", "Cormorant",
  ];

  const bodyText = await page.evaluate(() => document.body.innerText);

  for (const term of staleTerms) {
    const regex = new RegExp(`\\b${term}\\b`, "i");
    if (regex.test(bodyText)) {
      const lines = bodyText.split("\n");
      const ctx = lines.filter((l) => regex.test(l)).slice(0, 3).join(" | ");
      find(pageName, "WARN", `Stale label: "${term}"`, ctx);
    }
  }
}

async function checkScroll(page: Page, pageName: string) {
  const result = await page.evaluate(() => {
    const main = document.querySelector("main");
    if (!main) return { error: "No <main> element" };
    return {
      scrollHeight: main.scrollHeight,
      clientHeight: main.clientHeight,
    };
  });

  if ("error" in result) {
    find(pageName, "ERROR", "No <main> element", "Cannot test scroll");
    return;
  }

  if (result.scrollHeight <= result.clientHeight) {
    find(pageName, "INFO", "No scroll needed", `${result.scrollHeight} ≤ ${result.clientHeight}`);
    return;
  }

  // Mouse wheel scroll test
  await page.mouse.move(720, 450);
  const before = await page.evaluate(() => document.querySelector("main")!.scrollTop);
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(600);
  const after = await page.evaluate(() => document.querySelector("main")!.scrollTop);

  if (after <= before) {
    find(pageName, "ERROR", "Scroll broken", `scrollTop stuck at ${before}`);
  } else {
    find(pageName, "INFO", "Scroll works", `${before} → ${after}`);
  }

  // Reset
  await page.evaluate(() => { document.querySelector("main")!.scrollTop = 0; });
  await page.waitForTimeout(200);
}

async function checkThemeToggle(page: Page, pageName: string) {
  await setTheme(page, "light");
  const lightVal = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--surface-base").trim()
  );

  await setTheme(page, "dark");
  const darkVal = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--surface-base").trim()
  );

  if (lightVal === darkVal) {
    find(pageName, "ERROR", "Theme not switching", `--surface-base same: ${lightVal}`);
  } else {
    find(pageName, "INFO", "Theme tokens switch", `Light: ${lightVal} → Dark: ${darkVal}`);
  }
}

async function checkPalette(page: Page, pageName: string) {
  const bg = await page.evaluate(() => {
    const main = document.querySelector("main");
    return main ? getComputedStyle(main).backgroundColor : "none";
  });
  find(pageName, "INFO", "Main bg color", bg);
}

// ─── Main Audit ───────────────────────────────────────────

async function main() {
  console.log("Launching browser (GPU disabled for WSL2)...\n");
  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-gpu", "--disable-software-rasterizer", "--no-sandbox"],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  for (const pg of PAGES) {
    const page = await context.newPage();
    console.log(`━━━ ${pg.title} (${pg.path}) ━━━`);

    await page.goto(`${BASE_URL}${pg.path}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500); // hydration + fonts

    // ── Light mode ──
    await setTheme(page, "light");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${pg.name}-light.png`) });
    console.log(`  ✓ Light screenshot`);

    // ── Dark mode ──
    await setTheme(page, "dark");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${pg.name}-dark.png`) });
    console.log(`  ✓ Dark screenshot`);

    // ── Checks (in light mode) ──
    await setTheme(page, "light");
    await checkFonts(page, pg.name);
    await checkStaleLabels(page, pg.name);
    await checkScroll(page, pg.name);
    await checkThemeToggle(page, pg.name);
    await checkPalette(page, pg.name);
    console.log(`  ✓ Checks done`);

    await page.close();
  }

  // ── Mobile viewport pass ──
  console.log(`\n━━━ Mobile Viewport Pass (390×844) ━━━`);
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
  });

  for (const pg of PAGES) {
    await mobilePage.goto(`${BASE_URL}${pg.path}`, { waitUntil: "domcontentloaded" });
    await mobilePage.waitForTimeout(1500);

    // Light
    await setTheme(mobilePage, "light");
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, `${pg.name}-mobile-light.png`) });

    // Dark
    await setTheme(mobilePage, "dark");
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, `${pg.name}-mobile-dark.png`) });

    // Check mobile theme toggle button exists
    const floatingBtn = await mobilePage.$('button[class*="fixed"]');
    if (!floatingBtn) {
      // Try alternate selector
      const anyFixed = await mobilePage.evaluate(() => {
        const btns = Array.from(document.querySelectorAll("button"));
        return btns.some((b) => {
          const style = getComputedStyle(b);
          return style.position === "fixed";
        });
      });
      if (!anyFixed) {
        find(pg.name, "WARN", "No mobile floating theme toggle", "Expected fixed-position button");
      }
    }

    console.log(`  ✓ ${pg.name} mobile`);
  }

  await mobilePage.close();
  await browser.close();

  // ─── Report ─────────────────────────────────────────────
  console.log("\n\n╔═══════════════════════════════════════════════╗");
  console.log("║       VISUAL AUDIT FINDINGS REPORT            ║");
  console.log("╚═══════════════════════════════════════════════╝\n");

  const errors = findings.filter((f) => f.severity === "ERROR");
  const warns = findings.filter((f) => f.severity === "WARN");
  const infos = findings.filter((f) => f.severity === "INFO");

  if (errors.length > 0) {
    console.log(`\x1b[31m▸ ERRORS (${errors.length})\x1b[0m`);
    for (const f of errors) console.log(`  [${f.page}] ${f.issue}: ${f.detail}`);
    console.log();
  }

  if (warns.length > 0) {
    console.log(`\x1b[33m▸ WARNINGS (${warns.length})\x1b[0m`);
    for (const f of warns) console.log(`  [${f.page}] ${f.issue}: ${f.detail}`);
    console.log();
  }

  if (infos.length > 0) {
    console.log(`\x1b[36m▸ INFO (${infos.length})\x1b[0m`);
    for (const f of infos) console.log(`  [${f.page}] ${f.issue}: ${f.detail}`);
    console.log();
  }

  const screenshotCount = fs.readdirSync(SCREENSHOT_DIR).filter((f) => f.endsWith(".png")).length;
  console.log(`Screenshots saved: ${screenshotCount} → ${SCREENSHOT_DIR}`);
  console.log(`\nErrors: ${errors.length} | Warnings: ${warns.length} | Info: ${infos.length}`);

  if (errors.length > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
