# Creating New Pages Guide

> **Static site:** New pages load content from `content/en/` via `getPageContent()` in `lib/static-page.ts`. Use `npm run generate:pages` to scaffold `page.tsx` files, or copy from `app/[lang]/page.tsx`.

This guide explains the complete process of creating new pages in the IGENTX website with multilingual support and clean URLs.

## Overview

The website uses a clean URL structure where:
- Default language (English): `/page-name` (no language prefix)
- Other languages: `/ar/page-name`, `/es/page-name`, etc.

This is achieved through Next.js rewrites and the `[lang]` dynamic route structure.

## Step-by-Step Process

### 1. Create the Page in Storyblok CMS

1. Log into your Storyblok account
2. Navigate to the Content section
3. Click "Create New" and select "Story"
4. Set the slug to your desired page name (e.g., `web-development-uae`)
5. Choose the appropriate content type (usually `page`)
6. Configure the content using Storyblok components
7. **Important**: Create versions for each language:
   - Click on the language dropdown
   - Add translations for each supported language (en, ar, etc.)
8. Publish the story

### 2. Create the App Route Structure

Create a new folder and page file under `app/[lang]/`:

```bash
app/[lang]/your-page-name/page.tsx
```

**Example**: `app/[lang]/web-development-uae/page.tsx`

### 3. Implement the Page Component

Copy the structure from an existing page (e.g., `about/page.tsx`) and modify it:

```tsx
import { BlockRenderer } from '@/lib/blocks'
import {
  buildPageMetadata,
  buildPageStructuredData,
  generateStaticLangParams,
  getPageContent,
} from '@/lib/static-page'
import type { Metadata } from 'next'

const STORY_SLUG = 'your-page-name'
const CANONICAL_PATH = '/your-page-name'

export const dynamic = 'force-static'

interface Props {
  params: Promise<{ lang: string }>
}

export default async function YourPageName({ params }: Props) {
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

**Key Points**:
- Add a JSON file under `content/en/` matching `STORY_SLUG`
- Register the page in `scripts/generate-static-pages.mjs` or run `npm run generate:pages`
- Update `CANONICAL_PATH` to match your page URL

### 4. Add Rewrite Rule in next.config.ts

**This is critical!** For clean URLs to work with the default language, you must add a rewrite rule:

Open `next.config.ts` and add your new page to the `rewrites()` function:

```typescript
async rewrites() {
  return [
    // Rewrite clean URLs to default language pages internally
    {
      source: '/',
      destination: '/en',
    },
    {
      source: '/about',
      destination: '/en/about',
    },
    {
      source: '/your-page-name',  // <-- Add this
      destination: '/en/your-page-name',
    },
    // Add more routes as needed
  ]
},
```

**Why this is needed**: Without this rewrite, accessing `/your-page-name` won't map to `/en/your-page-name`, and Next.js won't know which page to render.

### 5. Restart Development Server

After modifying `next.config.ts`, you **must** restart the dev server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

Changes to `next.config.ts` are not hot-reloaded.

### 6. Test the Page

Test all URL variations:

1. **Default language (clean URL)**: `https://localhost:3000/your-page-name`
   - Should load English content
   
2. **Explicit language URLs**: 
   - `https://localhost:3000/ar/your-page-name` (Arabic)
   - `https://localhost:3000/es/your-page-name` (Spanish)
   
3. **Test language switching**: Use the language switcher to verify all versions load correctly

4. **Test SEO**: View page source to verify:
   - Correct meta tags
   - Canonical URL
   - hreflang tags for all languages

## Common Issues and Solutions

### Issue: Clean URL shows home page content instead of the new page

**Cause**: Missing rewrite rule in `next.config.ts`

**Solution**: Add the rewrite rule as shown in Step 4 and restart the dev server

### Issue: 404 Not Found

**Possible causes**:
1. Storyblok story slug doesn't match the slug in `fetchStory()`
2. Story not published in Storyblok
3. Language version not created in Storyblok

**Solution**: Verify the slug matches exactly, ensure the story is published, and check language versions exist

### Issue: Content not updating

**Cause**: Storyblok cache

**Solution**: 
- Use the preview mode with `?_storyblok=<your-token>`
- Or trigger revalidation: `POST https://localhost:3000/api/revalidate`

### Issue: SEO metadata not showing

**Cause**: SEO component not configured in Storyblok

**Solution**: Add the SEO component to your page in Storyblok and configure the fields

## URL Structure Reference

| Language | URL Pattern | Actual Route | Rewrite? |
|----------|-------------|--------------|----------|
| English (default) | `/page-name` | `/en/page-name` | Yes (via next.config.ts) |
| Arabic | `/ar/page-name` | `/ar/page-name` | No (direct match) |
| Spanish | `/es/page-name` | `/es/page-name` | No (direct match) |

## Checklist

Use this checklist when creating a new page:

- [ ] Created story in Storyblok with correct slug
- [ ] Added translations for all supported languages
- [ ] Published the story in Storyblok
- [ ] Created folder structure: `app/[lang]/page-name/page.tsx`
- [ ] Copied and customized page component code
- [ ] Updated `fetchStory()` with correct slug
- [ ] Updated canonical URLs in metadata
- [ ] Updated fallback metadata
- [ ] Added rewrite rule in `next.config.ts`
- [ ] Restarted development server
- [ ] Tested clean URL (`/page-name`)
- [ ] Tested language-specific URLs (`/ar/page-name`, etc.)
- [ ] Tested language switching
- [ ] Verified SEO meta tags in page source
- [ ] Verified hreflang tags are present

## Additional Resources

- [Multilingual Setup](./MULTILANGUAGE_SETUP.md)
- [SEO Implementation](./SEO_IMPLEMENTATION.md)
- [Page-Level SEO Guide](./PAGE_LEVEL_SEO_GUIDE.md)
- [Storyblok Language Integration](./STORYBLOK_LANGUAGE_INTEGRATION.md)
