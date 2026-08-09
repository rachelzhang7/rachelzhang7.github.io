#!/usr/bin/env node
/**
 * Post-build assertions on the static export.
 *
 * These exist because the failure modes they catch are *silent*: the build
 * goes green, the site deploys, and something is quietly broken in production.
 * Each check is here because it can fail without `next build` complaining.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const ROUTES = [
  "adtech",
  "experiments",
  "creative-ai",
  "future-ventures",
  "about",
];

const failures = [];
const fail = (msg) => failures.push(msg);

/** Every .html file in the export. */
function htmlFiles(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) htmlFiles(path, acc);
    else if (entry.endsWith(".html")) acc.push(path);
  }
  return acc;
}

if (!existsSync(OUT)) {
  console.error(`✗ ${OUT}/ does not exist — did the build run?`);
  process.exit(1);
}

// 1. Every route produced a document.
if (!existsSync(join(OUT, "index.html"))) fail("out/index.html is missing");
for (const route of ROUTES) {
  if (!existsSync(join(OUT, route, "index.html"))) {
    fail(`out/${route}/index.html is missing`);
  }
}

// 2. The 404 page. Next has regressed on this before with trailingSlash:true,
//    and the upstream issues were closed as stale rather than fixed — so this
//    stays asserted rather than trusted.
if (!existsSync(join(OUT, "404.html"))) {
  fail("out/404.html is missing — GitHub Pages needs this for unmatched paths");
}

// 3. SEO surface.
for (const file of ["sitemap.xml", "robots.txt"]) {
  if (!existsSync(join(OUT, file))) fail(`out/${file} is missing`);
}

const pages = htmlFiles(OUT);

for (const page of pages) {
  const html = readFileSync(page, "utf8");

  // 4. The worst silent failure: with output:'export' and no
  //    images.unoptimized, next/image emits /_next/image?url=… which has no
  //    handler in a static export. Every image 404s, and CI stays green.
  if (html.includes("/_next/image")) {
    fail(`${page} references /_next/image — that route does not exist in a static export`);
  }

  // 5. Placeholder links must never reach production.
  if (html.includes("REPLACE-ME")) {
    fail(`${page} contains a REPLACE-ME placeholder link (see CONTENT.md)`);
  }
}

// 6. Source guard. `bg-base` is not a utility — the page ground is `bg-canvas`
//    (see the naming constraint in globals.css). A dead utility class produces
//    no CSS at all, so the element silently falls back to transparent and the
//    bug is invisible in review. Catch it in source rather than in production.
function sourceFiles(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) sourceFiles(path, acc);
    else if (/\.(tsx?|css)$/.test(entry)) acc.push(path);
  }
  return acc;
}

for (const file of sourceFiles("src")) {
  const src = readFileSync(file, "utf8");
  // Match the utility, never the raw `--bg-base` custom property.
  if (/(?<!-)bg-base\b/.test(src)) {
    fail(`${file} uses \`bg-base\`, which is not a utility — use \`bg-canvas\``);
  }
}

if (failures.length) {
  console.error("\n✗ Static export verification failed:\n");
  for (const f of failures) console.error(`  · ${f}`);
  console.error("");
  process.exit(1);
}

console.log(`✓ Static export verified — ${pages.length} pages, all routes present.`);
