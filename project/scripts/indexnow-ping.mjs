/**
 * Submit dist sitemap URLs to IndexNow (run manually after deploy).
 *
 * Usage (from project/):
 *   npm run build
 *   node scripts/indexnow-ping.mjs
 *
 * Optional env:
 *   INDEXNOW_KEY — 32-char hex key (default: read from public/<key>.txt)
 *   DIST_DIR — output directory (default: ./dist)
 *
 * Does not call the API during CI/build; operator runs when ready.
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_ORIGIN = 'https://www.vincentiantopology.com';
const HOST = 'www.vincentiantopology.com';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.resolve(projectRoot, process.env.DIST_DIR ?? 'dist');
const publicDir = path.join(projectRoot, 'public');

const LOC_RE = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;

function extractLocs(xml) {
  const urls = [];
  for (const match of xml.matchAll(LOC_RE)) {
    urls.push(match[1].trim());
  }
  return urls;
}

async function readText(filePath) {
  return readFile(filePath, 'utf8');
}

async function resolveIndexNowKey() {
  if (process.env.INDEXNOW_KEY) {
    return process.env.INDEXNOW_KEY.trim();
  }
  const entries = await readdir(publicDir, { withFileTypes: true });
  const keyFiles = entries
    .filter((e) => e.isFile() && /^[0-9a-f]{32}\.txt$/i.test(e.name))
    .map((e) => e.name);
  if (keyFiles.length !== 1) {
    throw new Error(
      `Expected exactly one public/<32-hex>.txt key file, found ${keyFiles.length}. Set INDEXNOW_KEY.`,
    );
  }
  const keyPath = path.join(publicDir, keyFiles[0]);
  const key = (await readText(keyPath)).trim();
  if (!/^[0-9a-f]{32}$/i.test(key)) {
    throw new Error(`Invalid IndexNow key in ${keyPath}`);
  }
  return key;
}

async function urlsFromSitemapFile(filePath, seenSitemaps) {
  const xml = await readText(filePath);
  const locs = extractLocs(xml);
  const pageUrls = [];

  for (const loc of locs) {
    if (/\.xml(\?.*)?$/i.test(loc)) {
      if (seenSitemaps.has(loc)) continue;
      seenSitemaps.add(loc);
      let childPath;
      try {
        const parsed = new URL(loc);
        if (parsed.origin !== SITE_ORIGIN) continue;
        childPath = path.join(distDir, parsed.pathname.replace(/^\//, ''));
      } catch {
        continue;
      }
      const nested = await urlsFromSitemapFile(childPath, seenSitemaps);
      pageUrls.push(...nested);
    } else {
      pageUrls.push(loc);
    }
  }

  return pageUrls;
}

async function collectPageUrls() {
  const seenSitemaps = new Set();
  const indexPath = path.join(distDir, 'sitemap-index.xml');
  const flatPath = path.join(distDir, 'sitemap.xml');

  try {
    await readFile(indexPath);
    return urlsFromSitemapFile(indexPath, seenSitemaps);
  } catch {
    return urlsFromSitemapFile(flatPath, seenSitemaps);
  }
}

async function main() {
  const key = await resolveIndexNowKey();
  const keyLocation = `${SITE_ORIGIN}/${key}.txt`;
  const urlList = [...new Set(await collectPageUrls())].sort();

  if (urlList.length === 0) {
    throw new Error(`No URLs found under ${distDir}. Run npm run build first.`);
  }

  const body = {
    host: HOST,
    key,
    keyLocation,
    urlList,
  };

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`IndexNow POST failed (${res.status}): ${text || res.statusText}`);
  }

  console.log(`IndexNow: submitted ${urlList.length} URL(s). Status ${res.status}.`);
  if (text) console.log(text);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
