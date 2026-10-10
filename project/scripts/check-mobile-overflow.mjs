/**
 * Headless layout check: no horizontal overflow at 390px on article pages.
 * Usage: npm run build && node scripts/check-mobile-overflow.mjs
 * Requires: npx playwright install chromium (first run).
 */
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4173;
const VIEWPORT = { width: 390, height: 844 };
const PATHS = ['/intro/0-1/'];

function waitForServer(url, timeoutMs = 60_000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) return resolve();
      } catch {
        /* retry */
      }
      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Server did not respond at ${url}`));
        return;
      }
      setTimeout(tick, 250);
    };
    tick();
  });
}

const preview = spawn('npx', ['astro', 'preview', '--port', String(PORT), '--host', '127.0.0.1'], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env, NODE_ENV: 'production' },
});

let failed = false;

try {
  await waitForServer(`http://127.0.0.1:${PORT}/`);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: VIEWPORT });

  for (const pathname of PATHS) {
    await page.goto(`http://127.0.0.1:${PORT}${pathname}`, { waitUntil: 'networkidle' });

    const metrics = await page.evaluate(() => {
      const h1 = document.querySelector('.page-header__title');
      const doc = document.documentElement;
      const body = document.body;
      return {
        scrollWidth: Math.max(doc.scrollWidth, body.scrollWidth),
        clientWidth: doc.clientWidth,
        h1ScrollWidth: h1?.scrollWidth ?? 0,
        h1ClientWidth: h1?.clientWidth ?? 0,
        h1LineHeight: h1 ? getComputedStyle(h1).lineHeight : null,
        h1WhiteSpace: h1 ? getComputedStyle(h1).whiteSpace : null,
        h1WordBreak: h1 ? getComputedStyle(h1).wordBreak : null,
      };
    });

    if (metrics.scrollWidth > metrics.clientWidth + 1) {
      console.error(`FAIL ${pathname}: horizontal overflow scrollWidth=${metrics.scrollWidth} clientWidth=${metrics.clientWidth}`);
      failed = true;
    }

    if (metrics.h1ScrollWidth > metrics.clientWidth + 1) {
      console.error(
        `FAIL ${pathname}: H1 wider than viewport h1ScrollWidth=${metrics.h1ScrollWidth} viewport=${metrics.clientWidth}`,
      );
      failed = true;
    }

    const h1Lines = metrics.h1LineHeight
      ? Math.round((await page.locator('.page-header__title').boundingBox())?.height / parseFloat(metrics.h1LineHeight))
      : 0;

    // Long CJK fixture: title must be allowed to wrap (multi-line or fit within width).
    await page.evaluate(() => {
      const h1 = document.querySelector('.page-header__title');
      if (h1) {
        h1.textContent = '有些句子，不是讓你哭，是讓你「換地圖」';
      }
    });

    const longTitle = await page.evaluate(() => {
      const h1 = document.querySelector('.page-header__title');
      const doc = document.documentElement;
      const rect = h1?.getBoundingClientRect();
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        h1Width: rect?.width ?? 0,
        h1Height: rect?.height ?? 0,
      };
    });

    if (longTitle.scrollWidth > longTitle.clientWidth + 1) {
      console.error(
        `FAIL ${pathname}: overflow with long CJK title scrollWidth=${longTitle.scrollWidth} clientWidth=${longTitle.clientWidth}`,
      );
      failed = true;
    }

    if (longTitle.h1Width > longTitle.clientWidth + 1) {
      console.error(`FAIL ${pathname}: long CJK H1 width ${longTitle.h1Width} > viewport ${longTitle.clientWidth}`);
      failed = true;
    }

    if (longTitle.h1Height < 40) {
      console.error(`FAIL ${pathname}: long CJK title appears single-line (height=${longTitle.h1Height})`);
      failed = true;
    }

    console.log(`OK ${pathname}`, { metrics, longTitle, h1Lines });
  }

  await browser.close();
} finally {
  preview.kill('SIGKILL');
  await new Promise((r) => setTimeout(r, 300));
}

if (failed) {
  process.exit(1);
}
