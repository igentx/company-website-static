import { MetadataRoute } from 'next'
import { getManifest } from '@/lib/content'
import { DEFAULT_LANGUAGE } from '@/lib/languages'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.igentx.com'
  const manifest = getManifest()
  const languages = manifest.languages.length > 0 ? manifest.languages : ['en']

  const entries: MetadataRoute.Sitemap = []

  for (const route of manifest.routes) {
    const languageAlternates = Object.fromEntries(
      languages.map((l) => [
        l,
        l === DEFAULT_LANGUAGE ? `${baseUrl}${route.path}` : `${baseUrl}/${l}${route.path}`,
      ])
    )

    entries.push({
      url: `${baseUrl}${route.path}`,
      lastModified: route.lastModified ? new Date(route.lastModified) : new Date(),
      changeFrequency: route.changeFrequency as MetadataRoute.Sitemap[number]['changeFrequency'],
      priority: route.priority,
      alternates: { languages: languageAlternates },
    })
  }

  entries.sort((a, b) => (b.priority || 0) - (a.priority || 0))
  return entries
}
