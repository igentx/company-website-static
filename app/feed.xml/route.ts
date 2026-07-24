import { buildBlogRssFeed } from '@/lib/rss'

export const dynamic = 'force-static'

export function GET() {
  const body = buildBlogRssFeed()

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
