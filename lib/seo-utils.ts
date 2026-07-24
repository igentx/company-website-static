import type { Metadata } from 'next'
import { absoluteAssetUrl } from './blog-utils'
import { SEOBlok } from './types'

/** Site-wide fallback when a page SEO block has no og_image filename. */
export const DEFAULT_OG_IMAGE = '/assets/og/default-og.webp'
export const DEFAULT_OG_WIDTH = 1200
export const DEFAULT_OG_HEIGHT = 630

const SITE_LOGO_PATH = '/assets/logos/igentx-logo-01.svg'

function resolveOgImagePath(filename?: string): string {
  return filename?.trim() ? filename : DEFAULT_OG_IMAGE
}

function buildOgImageMetadata(
  image: SEOBlok['og_image'] | undefined,
  fallbackAlt: string
) {
  const path = resolveOgImagePath(image?.filename)
  const url = absoluteAssetUrl(path) ?? path
  const alt = image?.alt?.trim() || fallbackAlt
  return [
    {
      url,
      alt,
      width: DEFAULT_OG_WIDTH,
      height: DEFAULT_OG_HEIGHT,
    },
  ]
}

/**
 * SEO utility functions for processing Storyblok SEO data
 */

export interface SEOData {
  global?: SEOBlok
  page?: SEOBlok
  fallback?: {
    title: string
    description: string
    siteName: string
    url: string
  }
}

/**
 * Merges global and page-specific SEO data with fallbacks
 */
export function mergeSEOData(
  data: SEOData
): Required<Pick<SEOBlok, 'title' | 'description'>> & Partial<SEOBlok> {
  const { global, page, fallback } = data

  return {
    // Basic SEO - page overrides global, with fallbacks
    title: page?.title || global?.title || fallback?.title || '',
    description: page?.description || global?.description || fallback?.description || '',
    keywords: page?.keywords || global?.keywords,
    canonical_url: page?.canonical_url || global?.canonical_url,

    // Open Graph
    og_title: page?.og_title || page?.title || global?.og_title || global?.title || fallback?.title,
    og_description:
      page?.og_description ||
      page?.description ||
      global?.og_description ||
      global?.description ||
      fallback?.description,
    og_image: page?.og_image || global?.og_image,
    og_type: page?.og_type || global?.og_type || 'website',

    // Twitter Card
    twitter_title:
      page?.twitter_title ||
      page?.og_title ||
      page?.title ||
      global?.twitter_title ||
      global?.og_title ||
      global?.title ||
      fallback?.title,
    twitter_description:
      page?.twitter_description ||
      page?.og_description ||
      page?.description ||
      global?.twitter_description ||
      global?.og_description ||
      global?.description ||
      fallback?.description,
    twitter_image:
      page?.twitter_image || page?.og_image || global?.twitter_image || global?.og_image,
    twitter_card_type:
      page?.twitter_card_type || global?.twitter_card_type || 'summary_large_image',

    // Robots
    robots_index:
      page?.robots_index !== undefined
        ? page.robots_index
        : global?.robots_index !== undefined
          ? global.robots_index
          : true,
    robots_follow:
      page?.robots_follow !== undefined
        ? page.robots_follow
        : global?.robots_follow !== undefined
          ? global.robots_follow
          : true,
    robots_noarchive:
      page?.robots_noarchive !== undefined
        ? page.robots_noarchive
        : global?.robots_noarchive !== undefined
          ? global.robots_noarchive
          : false,
    robots_nosnippet:
      page?.robots_nosnippet !== undefined
        ? page.robots_nosnippet
        : global?.robots_nosnippet !== undefined
          ? global.robots_nosnippet
          : false,

    // Structured data
    structured_data_type: page?.structured_data_type || global?.structured_data_type,
    structured_data_custom: page?.structured_data_custom || global?.structured_data_custom,

    // Additional meta
    author: page?.author || global?.author,
    publisher: page?.publisher || global?.publisher,
    article_published_time: page?.article_published_time,
    article_modified_time: page?.article_modified_time,
    article_author: page?.article_author,
    article_section: page?.article_section,
    article_tags: page?.article_tags,

    // Language
    language: page?.language || global?.language,
    alternate_languages: page?.alternate_languages || global?.alternate_languages,
  }
}

/**
 * Converts merged SEO data to Next.js Metadata format
 */
export function generateMetadataFromSEO(
  seoData: ReturnType<typeof mergeSEOData>,
  currentUrl: string,
  lang: string,
  siteName?: string
): Metadata {
  const robots = {
    index: seoData.robots_index ?? true,
    follow: seoData.robots_follow ?? true,
    noarchive: seoData.robots_noarchive ?? false,
    nosnippet: seoData.robots_nosnippet ?? false,
    googleBot: {
      index: seoData.robots_index ?? true,
      follow: seoData.robots_follow ?? true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  }

  const ogAlt =
    seoData.og_image?.alt?.trim() ||
    seoData.og_title ||
    seoData.title ||
    'IGENTX - AI-Driven Web and Digital Products'

  const metadata: Metadata = {
    title: { absolute: seoData.title },
    description: seoData.description,
    keywords: seoData.keywords?.split(',').map((k) => k.trim()),
    authors: seoData.author ? [{ name: seoData.author }] : undefined,

    // Canonical URL
    alternates: {
      canonical: seoData.canonical_url || currentUrl,
      languages: seoData.alternate_languages?.reduce(
        (acc, alt) => {
          acc[alt.language] = alt.url
          return acc
        },
        {} as Record<string, string>
      ),
    },

    // Open Graph
    openGraph: {
      title: seoData.og_title,
      description: seoData.og_description,
      url: currentUrl,
      siteName: siteName,
      locale: lang,
      type: (seoData.og_type as 'website' | 'article' | 'profile') || 'website',
      images: buildOgImageMetadata(seoData.og_image, ogAlt),
      // Article-specific Open Graph
      ...(seoData.og_type === 'article' && {
        publishedTime: seoData.article_published_time,
        modifiedTime: seoData.article_modified_time,
        authors: seoData.article_author ? [seoData.article_author] : undefined,
        section: seoData.article_section,
        tags: seoData.article_tags?.split(',').map((t) => t.trim()),
      }),
    },

    // Twitter Card
    twitter: {
      card:
        (seoData.twitter_card_type as 'summary' | 'summary_large_image' | 'app' | 'player') ||
        'summary_large_image',
      title: seoData.twitter_title,
      description: seoData.twitter_description,
      images: buildOgImageMetadata(
        seoData.twitter_image ?? seoData.og_image,
        seoData.twitter_image?.alt?.trim() || ogAlt
      ),
    },

    // Robots
    robots,

    // Publisher
    publisher: seoData.publisher,
  }

  return metadata
}

/**
 * Generates structured data JSON-LD from SEO data
 */
export function generateStructuredData(
  seoData: ReturnType<typeof mergeSEOData>,
  currentUrl: string,
  lang: string,
  siteName: string
): Record<string, unknown> | null {
  // If custom structured data is provided, try to parse it
  if (seoData.structured_data_custom) {
    try {
      const customData = seoData.structured_data_custom.trim()
      // Skip if it's empty or just whitespace
      if (customData.length === 0) {
        console.warn('Custom structured data is empty, using default type')
      } else {
        const parsed = JSON.parse(customData)
        if (parsed && typeof parsed === 'object') {
          return parsed
        }
      }
    } catch (error) {
      console.warn('Invalid custom structured data JSON:', error, 'Falling back to default structured data type')
    }
  }

  // Generate structured data based on type
  switch (seoData.structured_data_type) {
    case 'WebSite':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        description: seoData.description,
        url: currentUrl,
        inLanguage: lang,
      }

    case 'Organization': {
      const logoUrl = absoluteAssetUrl(SITE_LOGO_PATH)
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteName,
        description: seoData.description,
        url: currentUrl,
        logo: logoUrl
          ? {
              '@type': 'ImageObject',
              url: logoUrl,
            }
          : undefined,
      }
    }

    case 'Article':
    case 'BlogPosting': {
      const imageUrl =
        absoluteAssetUrl(resolveOgImagePath(seoData.og_image?.filename))
      const logoUrl = absoluteAssetUrl(SITE_LOGO_PATH)
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: seoData.title,
        description: seoData.description,
        url: currentUrl,
        datePublished: seoData.article_published_time,
        dateModified: seoData.article_modified_time || seoData.article_published_time,
        author: seoData.article_author
          ? {
            '@type': 'Person',
            name: seoData.article_author,
          }
          : undefined,
        publisher: seoData.publisher
          ? {
            '@type': 'Organization',
            name: seoData.publisher,
            logo: logoUrl
              ? {
                '@type': 'ImageObject',
                url: logoUrl,
              }
              : undefined,
          }
          : undefined,
        image: imageUrl,
        articleSection: seoData.article_section,
        keywords: seoData.article_tags || seoData.keywords,
        inLanguage: lang,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': currentUrl,
        },
      }
    }

    case 'LocalBusiness':
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: siteName,
        description: seoData.description,
        url: currentUrl,
        image: seoData.og_image?.filename,
      }

    case 'Product':
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: seoData.title,
        description: seoData.description,
        url: currentUrl,
        image: seoData.og_image?.filename,
      }

    case 'Event':
      return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: seoData.title,
        description: seoData.description,
        url: currentUrl,
        image: seoData.og_image?.filename,
        startDate: seoData.article_published_time,
      }

    case 'FAQ':
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        name: seoData.title,
        description: seoData.description,
        url: currentUrl,
      }

    default:
      return null
  }
}

/**
 * Extracts SEO data from Storyblok content
 */
export function extractSEOFromStoryblok(content: unknown): { global?: SEOBlok; page?: SEOBlok } {
  const result: { global?: SEOBlok; page?: SEOBlok } = {}

  // Type guard for content object
  if (!content || typeof content !== 'object') {
    return result
  }

  const contentObj = content as Record<string, unknown>

  // Extract page-level SEO
  if (contentObj.seo && typeof contentObj.seo === 'object' && contentObj.seo !== null) {
    const seoObj = contentObj.seo as Record<string, unknown>
    if (seoObj.component === 'seo') {
      result.page = seoObj as SEOBlok
    }
  }

  // Check for SEO in the body array (common Storyblok pattern)
  if (contentObj.body && Array.isArray(contentObj.body)) {
    const seoBlock = contentObj.body.find((block: unknown) => {
      if (block && typeof block === 'object' && block !== null) {
        const blockObj = block as Record<string, unknown>
        return blockObj.component === 'seo'
      }
      return false
    })
    if (seoBlock) {
      result.page = seoBlock as SEOBlok
    }
  }

  // Extract global SEO from header if available
  if (
    contentObj.global_seo &&
    typeof contentObj.global_seo === 'object' &&
    contentObj.global_seo !== null
  ) {
    const seoObj = contentObj.global_seo as Record<string, unknown>
    if (seoObj.component === 'seo') {
      result.global = seoObj as SEOBlok
    }
  }

  // Check for SEO in the global array (header content structure)
  if (contentObj.global && Array.isArray(contentObj.global)) {
    const seoBlock = contentObj.global.find((block: unknown) => {
      if (block && typeof block === 'object' && block !== null) {
        const blockObj = block as Record<string, unknown>
        return blockObj.component === 'seo'
      }
      return false
    })
    if (seoBlock) {
      result.global = seoBlock as SEOBlok
    }
  }

  // Check if content is a story object with nested content structure
  if (contentObj.story && typeof contentObj.story === 'object' && contentObj.story !== null) {
    const storyObj = contentObj.story as Record<string, unknown>
    if (storyObj.content && typeof storyObj.content === 'object' && storyObj.content !== null) {
      const storyContentObj = storyObj.content as Record<string, unknown>
      if (storyContentObj.global && Array.isArray(storyContentObj.global)) {
        const seoBlock = storyContentObj.global.find((block: unknown) => {
          if (block && typeof block === 'object' && block !== null) {
            const blockObj = block as Record<string, unknown>
            return blockObj.component === 'seo'
          }
          return false
        })
        if (seoBlock) {
          result.global = seoBlock as SEOBlok
        }
      }
    }
  }

  // Check direct story content global array
  if (contentObj.content && typeof contentObj.content === 'object' && contentObj.content !== null) {
    const nestedContentObj = contentObj.content as Record<string, unknown>
    if (nestedContentObj.global && Array.isArray(nestedContentObj.global)) {
      const seoBlock = nestedContentObj.global.find((block: unknown) => {
        if (block && typeof block === 'object' && block !== null) {
          const blockObj = block as Record<string, unknown>
          return blockObj.component === 'seo'
        }
        return false
      })
      if (seoBlock) {
        result.global = seoBlock as SEOBlok
      }
    }
  }

  return result
}
