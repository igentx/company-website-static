#!/usr/bin/env node
/**
 * One-time Storyblok export → content/en/*.json + manifest.json
 * Usage: STORYBLOK_ACCESS_TOKEN=... node scripts/export-storyblok.mjs
 * Or: source ../www.igentx.com/.env && npm run export:storyblok
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const CONTENT_DIR = path.join(ROOT, 'content', 'en')

const TOKEN =
  process.env.STORYBLOK_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN

const STORY_SLUGS = [
  'home',
  'contact',
  'services-landing-page',
  'services/web-development-uae',
  'services/ecommerce-website-development-uae',
  'services/graphic-design-uae',
  'services/seo-service-uae',
  'products/ai-customer-service-agent',
  'case-studies-landing-page',
  'case-studies/web-development-uae-startup-moduluxe-group',
  'case-studies/web-development-startup-dr-door',
  'blog-landing-page',
  'blog/importance-of-website-uae',
  'blog/ai-in-web-development-uae',
  'blog/how-to-choose-best-web-development-agency-uae',
  'blog/web-development-uae',
  'blog/ai-customer-service-agent-uae',
  'global/header',
  'global/footer',
]

const ROUTE_MAP = {
  home: { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  contact: { path: '/contact', priority: 0.9, changeFrequency: 'monthly' },
  'services-landing-page': { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
  'services/web-development-uae': { path: '/services/web-development-uae', priority: 0.85, changeFrequency: 'monthly' },
  'services/ecommerce-website-development-uae': { path: '/services/ecommerce-website-development-uae', priority: 0.85, changeFrequency: 'monthly' },
  'services/graphic-design-uae': { path: '/services/graphic-design-uae', priority: 0.85, changeFrequency: 'monthly' },
  'services/seo-service-uae': { path: '/services/seo-service-uae', priority: 0.85, changeFrequency: 'monthly' },
  'products/ai-customer-service-agent': { path: '/products/ai-customer-service-agent', priority: 0.9, changeFrequency: 'monthly' },
  'case-studies-landing-page': { path: '/case-studies', priority: 0.9, changeFrequency: 'weekly' },
  'case-studies/web-development-uae-startup-moduluxe-group': { path: '/case-studies/moduluxe-group', priority: 0.8, changeFrequency: 'monthly' },
  'case-studies/web-development-startup-dr-door': { path: '/case-studies/dr-door', priority: 0.8, changeFrequency: 'monthly' },
  'blog-landing-page': { path: '/blog', priority: 0.9, changeFrequency: 'daily' },
  'blog/importance-of-website-uae': { path: '/blog/importance-of-website-uae', priority: 0.7, changeFrequency: 'weekly' },
  'blog/ai-in-web-development-uae': { path: '/blog/ai-in-web-development-uae', priority: 0.7, changeFrequency: 'weekly' },
  'blog/how-to-choose-best-web-development-agency-uae': { path: '/blog/how-to-choose-best-web-development-agency-uae', priority: 0.7, changeFrequency: 'weekly' },
  'blog/web-development-uae': { path: '/blog/web-development-uae', priority: 0.7, changeFrequency: 'weekly' },
  'blog/ai-customer-service-agent-uae': { path: '/blog/ai-customer-service-agent-uae', priority: 0.7, changeFrequency: 'weekly' },
}

async function fetchStory(slug) {
  const url = `https://api.storyblok.com/v2/cdn/stories/${slug}?version=published&token=${TOKEN}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch ${slug}: ${res.status} ${res.statusText}`)
  }
  const data = await res.json()
  return data.story
}

function slugToFilePath(slug) {
  return path.join(CONTENT_DIR, `${slug}.json`)
}

function writeStory(slug, story) {
  const filePath = slugToFilePath(slug)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  const payload = {
    slug,
    name: story.name,
    published_at: story.published_at,
    content: story.content,
  }
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2))
  console.log(`  ✓ ${slug}`)
  return payload
}

async function main() {
  if (!TOKEN) {
    console.error('Missing STORYBLOK_ACCESS_TOKEN or NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN')
    process.exit(1)
  }

  console.log('Exporting Storyblok stories to content/en/...\n')
  const routes = []
  const languages = ['en']

  for (const slug of STORY_SLUGS) {
    try {
      const story = await fetchStory(slug)
      writeStory(slug, story)
      const meta = ROUTE_MAP[slug]
      if (meta) {
        routes.push({
          slug,
          ...meta,
          lastModified: story.published_at || new Date().toISOString(),
        })
      }
    } catch (err) {
      console.error(`  ✗ ${slug}: ${err.message}`)
    }
  }

  const manifest = {
    languages,
    defaultLanguage: 'en',
    routes,
    exportedAt: new Date().toISOString(),
  }

  fs.writeFileSync(path.join(ROOT, 'content', 'manifest.json'), JSON.stringify(manifest, null, 2))
  console.log(`\n✅ Manifest written with ${routes.length} routes`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
