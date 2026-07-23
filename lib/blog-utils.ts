import type {
  BlogDetailBlok,
  BlogHeadingBlok,
} from './types'

export interface BlogLink {
  linktype?: string
  url?: string
  cached_url?: string
}

export interface TocHeading {
  id: string
  level: string
  text: string
}

const GRID_COLUMN_CLASSES: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
}

export function resolveBlogHref(link?: BlogLink): string {
  const linkType = link?.linktype || 'url'
  if (linkType === 'story') {
    return `/${(link?.cached_url || link?.url || '').replace(/^\//, '')}`
  }
  const url = link?.url || link?.cached_url || '#'
  if (url.startsWith('http') || url.startsWith('#')) return url
  return url.startsWith('/') ? url : `/${url}`
}

export function isExternalBlogHref(href: string): boolean {
  return href.startsWith('http')
}

export function parseBlogTags(tags?: string | string[]): string[] {
  if (Array.isArray(tags)) return tags.filter(Boolean)
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  }
  return []
}

export function formatBlogDate(date?: string, style: 'long' | 'short' = 'long'): string {
  if (!date) return ''
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
  })
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function extractHeadings(
  blocks?: BlogDetailBlok['content_blocks']
): TocHeading[] {
  if (!blocks?.length) return []

  return blocks
    .filter((block): block is BlogHeadingBlok => block.component === 'blog_heading')
    .filter((block) => {
      const level = block.level || 'h2'
      return level === 'h2' || level === 'h3'
    })
    .map((block) => {
      const level = block.level || 'h2'
      const text = block.text || ''
      return {
        id: slugifyHeading(text),
        level,
        text,
      }
    })
    .filter((heading) => heading.text.length > 0)
}

function extractTextFromRichtext(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const obj = node as Record<string, unknown>

  if (obj.type === 'text' && typeof obj.text === 'string') {
    return obj.text
  }

  if (Array.isArray(obj.content)) {
    return obj.content.map(extractTextFromRichtext).join(' ')
  }

  return ''
}

function extractTextFromBlock(block: { component?: string; [key: string]: unknown }): string {
  switch (block.component) {
    case 'blog_body':
      if (typeof block.content === 'string') {
        return block.content.replace(/<[^>]+>/g, ' ')
      }
      return extractTextFromRichtext(block.content)
    case 'blog_heading':
      return typeof block.text === 'string' ? block.text : ''
    case 'blog_quote':
      return typeof block.text === 'string' ? block.text : ''
    case 'blog_text_with_image':
      if (typeof block.text === 'string') {
        return block.text.replace(/<[^>]+>/g, ' ')
      }
      return extractTextFromRichtext(block.text)
    default:
      return ''
  }
}

export function estimateReadingTime(
  blocks?: BlogDetailBlok['content_blocks']
): string {
  if (!blocks?.length) return ''

  const wordCount = blocks
    .map((block) => extractTextFromBlock(block as { component?: string; [key: string]: unknown }))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length

  if (wordCount === 0) return ''
  const minutes = Math.max(1, Math.ceil(wordCount / 200))
  return `${minutes} min read`
}

export function getBlogGridColumnClass(columns?: number | string): string {
  const n = typeof columns === 'string' ? parseInt(columns, 10) : columns || 3
  return GRID_COLUMN_CLASSES[n] || GRID_COLUMN_CLASSES[3]
}

export function normalizeBlogCategories(
  categories?: string | string[]
): string[] {
  return parseBlogTags(categories as string | string[] | undefined)
}

export function absoluteAssetUrl(path?: string): string | undefined {
  if (!path) return undefined
  if (path.startsWith('http')) return path
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.igentx.com'
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
