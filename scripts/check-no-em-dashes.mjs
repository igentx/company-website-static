#!/usr/bin/env node
/**
 * Fail if em dashes appear in public English content.
 * Run: node scripts/check-no-em-dashes.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const SCAN_ROOTS = [
  join(ROOT, "content", "en"),
  join(ROOT, "lib", "igentx-default-content.ts"),
  join(ROOT, "lib", "seo-keywords.ts"),
];

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if ([".ts", ".json", ".md"].includes(extname(full))) acc.push(full);
  }
  return acc;
}

const files = [];
for (const root of SCAN_ROOTS) {
  const st = statSync(root);
  if (st.isDirectory()) walk(root, files);
  else files.push(root);
}

const violations = [];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  if (!text.includes("—")) continue;
  const rel = file.replace(ROOT + "/", "");
  text.split("\n").forEach((line, i) => {
    if (line.includes("—")) violations.push(`${rel}:${i + 1}: ${line.trim()}`);
  });
}

if (violations.length > 0) {
  console.error("Em dashes found in public content:\n");
  violations.forEach((v) => console.error(v));
  process.exit(1);
}

console.log("No em dashes in public content.");
