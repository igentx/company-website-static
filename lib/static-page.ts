import type { Metadata } from 'next'
import { getGlobalContent, getStoryContent, getSupportedLanguageCodes } from './content'
import {
  extractSEOFromStoryblok,
  generateMetadataFromSEO,
  generateStructuredData,
  mergeSEOData,
} from './seo-utils'
import { getSeoFallback } from './seo-keywords'
import { DEFAULT_LANGUAGE } from './languages'
import { SEOBlok } from './types'
import { getSiteBaseUrl } from './site-url'

export function generateStaticLangParams() {
  const languages = getSupportedLanguageCodes()
  const all = [DEFAULT_LANGUAGE, ...languages.filter((l) => l !== DEFAULT_LANGUAGE)]
  return all.map((lang) => ({ lang }))
}

export function buildCanonicalPath(lang: string, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (lang === DEFAULT_LANGUAGE) return normalized === '/' ? '/' : normalized
  return normalized === '/' ? `/${lang}` : `/${lang}${normalized}`
}

export function buildAbsoluteUrl(lang: string, path: string): string {
  const base = getSiteBaseUrl()
  const canonical = buildCanonicalPath(lang, path)
  if (canonical === '/') return `${base}/`
  return `${base}${canonical}`
}

interface PageMetadataOptions {
  storySlug: string
  canonicalPath: string
  lang: string
}

export function buildPageMetadata({
  storySlug,
  canonicalPath,
  lang,
}: PageMetadataOptions): Metadata {
  const isDefaultLanguage = lang === DEFAULT_LANGUAGE
  const canonicalUrl = buildCanonicalPath(lang, canonicalPath)
  const fallback = getSeoFallback(canonicalPath)

  try {
    const pageContent = getStoryContent(storySlug, lang)
    const headerContent = getGlobalContent('header', lang)
    const pageSEO = extractSEOFromStoryblok(pageContent)
    const globalSEO = extractSEOFromStoryblok(headerContent)

    let enhancedGlobalSEO = globalSEO.global
    if (!enhancedGlobalSEO && headerContent) {
      const headerBrand =
        (headerContent.logo_text as string) || (headerContent.brand_name as string)
      if (headerBrand) {
        enhancedGlobalSEO = {
          _uid: 'fallback-global-seo',
          component: 'seo',
          title: headerBrand,
          description: `Official website for ${headerBrand}`,
          og_title: headerBrand,
          og_description: `Official website for ${headerBrand}`,
          og_type: 'website',
          twitter_title: headerBrand,
          twitter_description: `Official website for ${headerBrand}`,
          twitter_card_type: 'summary_large_image',
          robots_index: true,
          robots_follow: true,
        } as SEOBlok
      }
    }

    const seoData = mergeSEOData({
      global: enhancedGlobalSEO,
      page: pageSEO.page,
      fallback: {
        title: fallback.title,
        description: fallback.description,
        siteName: 'IGENTX',
        url: canonicalUrl,
      },
    })

    const metadata = generateMetadataFromSEO(seoData, canonicalUrl, lang, 'IGENTX')
    const languages = getSupportedLanguageCodes()
    const languageAlternates: Record<string, string> = {
      'x-default': canonicalPath === '/' ? '/' : canonicalPath,
    }

    languages.forEach((languageCode) => {
      languageAlternates[languageCode] = buildCanonicalPath(languageCode, canonicalPath)
    })

    if (metadata.alternates) {
      metadata.alternates.languages = {
        ...metadata.alternates.languages,
        ...languageAlternates,
      }
    } else {
      metadata.alternates = {
        canonical: canonicalUrl,
        languages: languageAlternates,
      }
    }

    return metadata
  } catch (error) {
    console.error('Error generating SEO metadata:', error)
    return {
      title: fallback.title,
      description: fallback.description,
      keywords: fallback.keywords,
      alternates: { canonical: canonicalUrl },
    }
  }
}

export function buildPageStructuredData(
  storySlug: string,
  lang: string,
  canonicalPath: string
): Record<string, unknown> | null {
  try {
    const pageContent = getStoryContent(storySlug, lang)
    const headerContent = getGlobalContent('header', lang)
    const pageSEO = extractSEOFromStoryblok(pageContent)
    const globalSEO = extractSEOFromStoryblok(headerContent)
    const fallback = getSeoFallback(canonicalPath)

    const seoData = mergeSEOData({
      global: globalSEO.global,
      page: pageSEO.page,
      fallback: {
        title: fallback.title,
        description: fallback.description,
        siteName: 'IGENTX',
        url: buildAbsoluteUrl(lang, canonicalPath),
      },
    })

    return generateStructuredData(
      seoData,
      buildAbsoluteUrl(lang, canonicalPath),
      lang,
      'IGENTX'
    ) as Record<string, unknown>
  } catch {
    return null
  }
}

export function getPageContent(storySlug: string, lang = 'en') {
  return getStoryContent(storySlug, lang)
}
