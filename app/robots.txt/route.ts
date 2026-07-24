import { getSiteBaseUrl } from '@/lib/site-url'

export const dynamic = 'force-static'

export function GET() {
  const baseUrl = getSiteBaseUrl()

  const body = `# https://www.igentx.com/robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# LLM / AI discovery: ${baseUrl}/llms.txt
# Blog feed: ${baseUrl}/feed.xml
Sitemap: ${baseUrl}/sitemap.xml
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
