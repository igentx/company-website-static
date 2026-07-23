# Page Structured Data Update Pattern

> **Static site:** Use `buildPageStructuredData()` and `buildPageMetadata()` from `lib/static-page.ts`. See `app/[lang]/page.tsx` for the current pattern.

This document shows the required updates to add page-specific structured data support to all pages.

## Pages Updated ✅

- `app/[lang]/page.tsx` (Homepage)
- `app/[lang]/blog/ai-driven-web-development/page.tsx`
- `app/[lang]/case-studies/web-development-startup-dr-door/page.tsx`
- `app/[lang]/services/web-development-uae/page.tsx`

## Pages Still Needing Updates ⚠️

- `app/[lang]/services/ecommerce-website-development-uae/page.tsx`
- `app/[lang]/services/_template-service/page.tsx`
- `app/[lang]/services/page.tsx`
- `app/[lang]/contact/page.tsx`
- `app/[lang]/blog/page.tsx`
- `app/[lang]/blog/_template-blog/page.tsx`
- `app/[lang]/case-studies/page.tsx`
- `app/[lang]/case-studies/web-development-uae-startup-moduluxe-group/page.tsx`
- `app/[lang]/case-studies/_template-case-study/page.tsx`
- `app/[lang]/about/page.tsx`

---

## Required Changes

### 1. Update Imports

**FROM:**
```typescript
import { mergeSEOData, generateMetadataFromSEO, extractSEOFromStoryblok } from '@/lib/seo-utils'
```

**TO:**
```typescript
import { mergeSEOData, generateMetadataFromSEO, extractSEOFromStoryblok, generateStructuredData } from '@/lib/seo-utils'
```

### 2. Add Structured Data Generation in Component

**Add this code BEFORE the return statement:**

```typescript
export default async function YourPageComponent({ params }: Props) {
  const { lang } = await params
  const preview = isPreview()
  const isDefaultLanguage = lang === DEFAULT_LANGUAGE  // ADD THIS LINE

  // ... existing code ...
  const story = await fetchStory(STORY_SLUG, preview, lang)
  const content = story?.content || defaultContent

  // ADD THIS SECTION ⬇️
  // Generate structured data for this page
  let structuredData = null
  try {
    const headerContent = await fetchGlobalContent('header', preview, lang)
    const pageSEO = extractSEOFromStoryblok(story?.content)
    const globalSEO = extractSEOFromStoryblok(headerContent)

    const seoData = mergeSEOData({
      global: globalSEO.global,
      page: pageSEO.page,
      fallback: {
        title: 'Your Page Title',
        description: 'Your page description',
        siteName: 'NextJS Storyblok Template',
        url: isDefaultLanguage ? `/${STORY_SLUG}` : `/${lang}/${STORY_SLUG}`,
      },
    })

    structuredData = generateStructuredData(
      seoData,
      isDefaultLanguage ? `https://example.com/${STORY_SLUG}` : `https://example.com/${lang}/${STORY_SLUG}`,
      lang,
      'NextJS Storyblok Template'
    )
  } catch (error) {
    console.error('Error generating structured data:', error)
  }
  // END OF ADDED SECTION ⬆️

  return (
    <div className="min-h-screen">
      <BlockRenderer blok={content} />

      {/* ADD THIS SECTION ⬇️ */}
      {/* Page-specific Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
      {/* END OF ADDED SECTION ⬆️ */}

      {/* ... rest of JSX ... */}
    </div>
  )
}
```

---

## Example: Complete Updated Page

```typescript
import { BlockRenderer } from '@/lib/blocks'
import {
  buildPageMetadata,
  buildPageStructuredData,
  generateStaticLangParams,
  getPageContent,
} from '@/lib/static-page'
import type { Metadata } from 'next'

const STORY_SLUG = 'about'
const CANONICAL_PATH = '/about'

export const dynamic = 'force-static'

interface Props {
  params: Promise<{ lang: string }>
}

export default async function LanguageAboutPage({ params }: Props) {
  const { lang } = await params
  const content = getPageContent(STORY_SLUG, lang)
  const structuredData = buildPageStructuredData(STORY_SLUG, lang, CANONICAL_PATH)

  return (
    <div className="min-h-screen">
      <BlockRenderer blok={content} />
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </div>
  )
}

export const generateStaticParams = generateStaticLangParams

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return buildPageMetadata({ storySlug: STORY_SLUG, canonicalPath: CANONICAL_PATH, lang })
}
```

---

## How It Works

### 1. **Page-Level Structured Data**
- Each page now generates its own structured data based on its SEO block
- Uses `structured_data_type` field from the page's SEO configuration
- Falls back to global SEO if page SEO is not configured

### 2. **Schema Type Selection**
In Storyblok, you can now set different schema types per page:
- Homepage → `WebSite`
- Blog posts → `Article`
- Service pages → `Service` or `Product`
- Case studies → `Article`
- About → `Organization`

### 3. **Priority Order**
1. Page-specific `structured_data_type` (highest priority)
2. Global header `structured_data_type`
3. Fallback to `WebSite` schema

---

## Testing

After updating all pages, test with:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Markup Validator**: https://validator.schema.org/
3. Check page source for `<script type="application/ld+json">` tags

---

## Benefits

✅ Each page can have its own structured data type  
✅ Blog posts can use Article schema with author/published date  
✅ Service pages can use Product/Service schema  
✅ Better SEO through appropriate schema markup  
✅ Flexible: override global settings per page

