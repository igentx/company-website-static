import fs from 'fs'
import path from 'path'
import {
  defaultPageContent,
  defaultContactContent,
  defaultHeaderContent,
  defaultFooterContent,
  defaultAboutContent,
} from './igentx-default-content'

export interface ContentStory {
  slug: string
  name?: string
  published_at?: string
  content: Record<string, unknown>
}

export interface ManifestRoute {
  slug: string
  path: string
  priority: number
  changeFrequency: string
  lastModified?: string
}

export interface ContentManifest {
  languages: string[]
  defaultLanguage: string
  routes: ManifestRoute[]
  exportedAt?: string
}

const CONTENT_ROOT = path.join(process.cwd(), 'content')

const SLUG_FALLBACKS: Record<string, Record<string, unknown>> = {
  home: defaultPageContent as Record<string, unknown>,
  contact: defaultContactContent as Record<string, unknown>,
}

function fallbackForSlug(slug: string): Record<string, unknown> {
  if (SLUG_FALLBACKS[slug]) return SLUG_FALLBACKS[slug]
  if (slug.startsWith('global/')) {
    return slug.endsWith('header')
      ? (defaultHeaderContent as Record<string, unknown>)
      : (defaultFooterContent as Record<string, unknown>)
  }
  return defaultAboutContent as Record<string, unknown>
}

function readJsonFile<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) return null
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function getStoryContent(slug: string, lang = 'en'): Record<string, unknown> {
  const filePath = path.join(CONTENT_ROOT, lang, `${slug}.json`)
  const story = readJsonFile<ContentStory>(filePath)
  if (story?.content) return story.content
  return fallbackForSlug(slug)
}

export function getStory(slug: string, lang = 'en'): ContentStory | null {
  const filePath = path.join(CONTENT_ROOT, lang, `${slug}.json`)
  const story = readJsonFile<ContentStory>(filePath)
  if (story) return story
  return {
    slug,
    content: fallbackForSlug(slug),
  }
}

export function getGlobalContent(
  name: 'header' | 'footer',
  lang = 'en'
): Record<string, unknown> {
  return getStoryContent(`global/${name}`, lang)
}

export function getManifest(): ContentManifest {
  const manifest = readJsonFile<ContentManifest>(path.join(CONTENT_ROOT, 'manifest.json'))
  return (
    manifest ?? {
      languages: ['en'],
      defaultLanguage: 'en',
      routes: [],
    }
  )
}

export function getSupportedLanguageCodes(): string[] {
  return getManifest().languages
}

export function saveStoryContent(
  slug: string,
  content: Record<string, unknown>,
  lang = 'en'
): void {
  const filePath = path.join(CONTENT_ROOT, lang, `${slug}.json`)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  const existing = readJsonFile<ContentStory>(filePath)
  const payload: ContentStory = {
    slug,
    name: existing?.name ?? slug,
    published_at: existing?.published_at ?? new Date().toISOString(),
    content,
  }
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2))
}

export function appendManifestRoute(route: ManifestRoute): void {
  const manifestPath = path.join(CONTENT_ROOT, 'manifest.json')
  const manifest = getManifest()
  const exists = manifest.routes.some((r) => r.path === route.path)
  if (!exists) {
    manifest.routes.push(route)
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  }
}
