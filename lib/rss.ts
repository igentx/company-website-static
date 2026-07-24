import { getManifest, getStoryContent } from './content'
import { extractSEOFromStoryblok } from './seo-utils'
import { getSiteBaseUrl } from './site-url'

const SITE_URL = getSiteBaseUrl()
const MAX_ITEMS = 50

export interface RssItem {
  title: string
  description: string
  link: string
  pubDate: Date
  guid: string
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function parseArticleDate(value?: string): Date | null {
  if (!value) return null
  const normalized = value.includes('T') ? value : value.replace(' ', 'T')
  const parsed = new Date(normalized)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

function extractBlogHero(content: Record<string, unknown>) {
  const body = content.body
  if (!Array.isArray(body)) return null
  const hero = body.find(
    (block) =>
      block &&
      typeof block === 'object' &&
      (block as Record<string, unknown>).component === 'blog_hero'
  ) as Record<string, unknown> | undefined
  return hero ?? null
}

export function getBlogRssItems(): RssItem[] {
  const manifest = getManifest()
  const blogRoutes = manifest.routes.filter(
    (route) => route.path.startsWith('/blog/') && route.path !== '/blog'
  )

  const items: RssItem[] = []

  for (const route of blogRoutes) {
    const content = getStoryContent(route.slug, 'en')
    const seo = extractSEOFromStoryblok(content).page
    const hero = extractBlogHero(content)

    const title =
      (typeof seo?.title === 'string' && seo.title) ||
      (typeof hero?.title === 'string' && hero.title) ||
      route.slug

    const description =
      (typeof seo?.description === 'string' && seo.description) ||
      (typeof hero?.excerpt === 'string' && hero.excerpt) ||
      ''

    const link = seo?.canonical_url || `${SITE_URL}${route.path}`
    const pubDate =
      parseArticleDate(seo?.article_published_time) ||
      parseArticleDate(typeof hero?.publish_date === 'string' ? hero.publish_date : undefined) ||
      (route.lastModified ? new Date(route.lastModified) : new Date())

    items.push({
      title,
      description,
      link,
      pubDate,
      guid: link,
    })
  }

  return items
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
    .slice(0, MAX_ITEMS)
}

export function buildBlogRssFeed(): string {
  const items = getBlogRssItems()
  const lastBuildDate =
    items.length > 0 ? items[0].pubDate.toUTCString() : new Date().toUTCString()

  const channelTitle = 'IGENTX Blog'
  const channelDescription =
    'Practical articles on web development, AI, SEO and digital growth from the IGENTX team.'
  const channelLink = `${SITE_URL}/blog`

  const itemXml = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
      <pubDate>${item.pubDate.toUTCString()}</pubDate>
    </item>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <description>${escapeXml(channelDescription)}</description>
    <link>${escapeXml(channelLink)}</link>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${itemXml}
  </channel>
</rss>
`
}
