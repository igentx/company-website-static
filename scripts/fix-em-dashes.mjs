#!/usr/bin/env node
/**
 * Replace em dashes in public marketing copy.
 * Run: node scripts/fix-em-dashes.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const PLACEHOLDER = "\uE000EMPTY\uE001";

const TARGETS = [
  "content/en",
  "lib/igentx-default-content.ts",
  "lib/seo-keywords.ts",
];

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = full.slice(ROOT.length + 1);
    if (rel.startsWith("node_modules") || rel.startsWith(".git")) continue;
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if ([".ts", ".json", ".md"].includes(extname(full))) acc.push(full);
  }
  return acc;
}

function fixEmDashes(text) {
  let out = text
    .replace(/"—"/g, `"${PLACEHOLDER}"`)
    .replace(/'—'/g, `'${PLACEHOLDER}'`);

  out = out.replace(/"([^"\n]*?) — ([^"\n]*?)"/g, (match, before, after) => {
    if (before.length <= 100 && after.length <= 120) {
      return `"${before} | ${after}"`;
    }
    return `"${before}, ${after}"`;
  });

  out = out.replace(/'([^'\n]*?) — ([^'\n]*?)'/g, (match, before, after) => {
    if (before.length <= 100 && after.length <= 120) {
      return `'${before} | ${after}'`;
    }
    return `'${before}, ${after}'`;
  });

  out = out.replace(/ — /g, ", ");
  out = out.replace(/—/g, ", ");
  out = out.replace(/, ,/g, ",");
  out = out.replace(/,\s+,/g, ", ");
  out = out.replaceAll(PLACEHOLDER, "—");

  return out;
}

const files = [];
for (const target of TARGETS) {
  const full = join(ROOT, target);
  const st = statSync(full);
  if (st.isDirectory()) walk(full, files);
  else files.push(full);
}

let changed = 0;
for (const file of files) {
  const original = readFileSync(file, "utf8");
  if (!original.includes("—")) continue;
  const updated = fixEmDashes(original);
  if (updated !== original) {
    writeFileSync(file, updated);
    changed++;
    console.log("fixed:", file.replace(ROOT + "/", ""));
  }
}

console.log(`Done. ${changed} file(s) updated.`);
