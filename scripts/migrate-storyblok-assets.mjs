#!/usr/bin/env node
/**
 * Download Storyblok CDN assets referenced in content JSON files
 * and rewrite JSON to use local /assets/... paths.
 *
 * Usage: npm run migrate:assets
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const CONTENT_DIR = path.join(ROOT, 'content')
const ASSETS_DIR = path.join(ROOT, 'public', 'assets')

const URL_RE =
  /https:\/\/a\.storyblok\.com\/f\/\d+\/(\d+)x(\d+)\/([a-f0-9]+)\/([^"'\s\\]+)/g

const FILENAME_RENAMES = {
  '7.svg': 'ai-agent-feature.svg',
}

function walkJsonFiles(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walkJsonFiles(full))
    else if (entry.name.endsWith('.json')) out.push(full)
  }
  return out
}

function classify(filename) {
  if (/logo|igentx/i.test(filename)) return 'logos'
  if (/\.svg$/i.test(filename) || /icon/i.test(filename)) return 'icons'
  if (/blog|og|meta|banner/i.test(filename)) return 'blog'
  return 'images'
}

function localFilename(filename) {
  return FILENAME_RENAMES[filename] ?? filename
}

function localPath(filename) {
  const name = localFilename(filename)
  const folder = classify(name)
  return `/assets/${folder}/${name}`
}

function assetKey(hash, filename) {
  return `${hash}/${filename}`
}

function parseArea(width, height) {
  return Number(width) * Number(height)
}

function scanContentFiles(files) {
  /** @type {Map<string, { hash: string, filename: string, urls: Map<string, { width: number, height: number, area: number }> }>} */
  const assets = new Map()

  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8')
    for (const match of text.matchAll(URL_RE)) {
      const [fullUrl, width, height, hash, filename] = match
      const key = assetKey(hash, filename)
      const area = parseArea(width, height)

      if (!assets.has(key)) {
        assets.set(key, { hash, filename, urls: new Map() })
      }

      const entry = assets.get(key)
      const existing = entry.urls.get(fullUrl)
      if (!existing || area > existing.area) {
        entry.urls.set(fullUrl, { width: Number(width), height: Number(height), area })
      }
    }
  }

  return assets
}

function pickBestUrl(urlMap) {
  let bestUrl = ''
  let bestArea = -1

  for (const [url, meta] of urlMap) {
    if (meta.area > bestArea) {
      bestArea = meta.area
      bestUrl = url
    }
  }

  return bestUrl
}

async function download(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()))
}

async function main() {
  const files = walkJsonFiles(CONTENT_DIR)
  const assets = scanContentFiles(files)

  /** @type {Map<string, string>} */
  const urlToLocal = new Map()

  for (const [, asset] of assets) {
    const local = localPath(asset.filename)
    for (const url of asset.urls.keys()) {
      urlToLocal.set(url, local)
    }
  }

  console.log(`Found ${assets.size} unique assets (${urlToLocal.size} URL variants)\n`)

  let downloaded = 0
  let skipped = 0
  let failed = 0

  for (const [, asset] of assets) {
    const name = localFilename(asset.filename)
    const folder = classify(name)
    const dest = path.join(ASSETS_DIR, folder, name)
    const bestUrl = pickBestUrl(asset.urls)

    if (fs.existsSync(dest)) {
      console.log(`  skip ${folder}/${name}`)
      skipped++
      continue
    }

    try {
      console.log(`  ↓ ${folder}/${name}`)
      await download(bestUrl, dest)
      downloaded++
    } catch (err) {
      console.error(`  ✗ ${name}: ${err.message}`)
      failed++
    }
  }

  console.log('\nRewriting content JSON...\n')

  let updatedFiles = 0

  for (const file of files) {
    let text = fs.readFileSync(file, 'utf8')
    let changed = false

    for (const [url, local] of urlToLocal) {
      if (text.includes(url)) {
        text = text.split(url).join(local)
        changed = true
      }
    }

    if (changed) {
      fs.writeFileSync(file, text)
      console.log(`  ✓ ${path.relative(ROOT, file)}`)
      updatedFiles++
    }
  }

  console.log(
    `\nDone: ${downloaded} downloaded, ${skipped} skipped, ${failed} failed, ${updatedFiles} files updated`
  )

  if (failed > 0) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
