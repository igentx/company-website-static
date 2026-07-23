# SEO Block Implementation Guide

This guide explains how to implement and use the SEO block system in your Next.js Storyblok application.

## Overview

The SEO block system provides comprehensive SEO management through Storyblok CMS with:

- **Global SEO settings** (via header content type)
- **Page-specific SEO overrides** (via page content type)
- **Automatic fallback system** for missing data
- **Structured data generation**
- **Multi-language support**

## Architecture

### 1. SEO Block Structure

The SEO block (`SEOBlok`) includes the following fields:

#### Basic SEO

- `title` - Page title
- `description` - Meta description
- `keywords` - Meta keywords (comma-separated)
- `canonical_url` - Canonical URL override

#### Open Graph / Social Media

- `og_title` - Open Graph title
- `og_description` - Open Graph description
- `og_image` - Open Graph image
- `og_type` - Content type (website, article, product, profile)

#### Twitter Card

- `twitter_title` - Twitter card title
- `twitter_description` - Twitter card description
- `twitter_image` - Twitter card image
- `twitter_card_type` - Card type (summary, summary_large_image, app, player)

#### Advanced SEO

- `robots_index` - Allow indexing
- `robots_follow` - Allow following links
- `robots_noarchive` - Prevent archiving
- `robots_nosnippet` - Prevent snippets

#### Structured Data

- `structured_data_type` - Predefined schema types
- `structured_data_custom` - Custom JSON-LD schema

#### Additional Meta Tags

- `author` - Content author
- `publisher` - Content publisher
- `article_published_time` - Publication date
- `article_modified_time` - Last modified date
- `article_author` - Article author
- `article_section` - Article section/category
- `article_tags` - Article tags (comma-separated)

#### Language & Localization

- `language` - Content language
- `alternate_languages` - Alternative language versions

### 2. Content Type Integration

#### Header Content Type

Add a `global_seo` field of type SEO block to your header content type:

```json
{
  "component": "header",
  "navigation": [...],
  "logo": {...},
  "global_seo": {
    "component": "seo",
    "title": "Default Site Title",
    "description": "Default site description",
    ...
  }
}
```

#### Page Content Type

Add an optional `seo` field of type SEO block to your page content type:

```json
{
  "component": "page",
  "title": "Page Title",
  "seo": {
    "component": "seo",
    "title": "Custom Page Title",
    "description": "Custom page description",
    ...
  },
  "body": [...]
}
```

## Storyblok Configuration

### 1. Create the SEO Block

In Storyblok's Component Library:

1. **Create new block** named `seo`
2. **Add fields** according to the schema:

#### Basic SEO Fields

- `title` (Text) - "SEO Title"
- `description` (Textarea) - "Meta Description"
- `keywords` (Text) - "Keywords (comma-separated)"
- `canonical_url` (Text) - "Canonical URL"

#### Open Graph Fields

- `og_title` (Text) - "Open Graph Title"
- `og_description` (Textarea) - "Open Graph Description"
- `og_image` (Asset) - "Open Graph Image"
- `og_type` (Single-Option) - "Open Graph Type"
  - Options: website, article, product, profile

#### Twitter Card Fields

- `twitter_title` (Text) - "Twitter Title"
- `twitter_description` (Textarea) - "Twitter Description"
- `twitter_image` (Asset) - "Twitter Image"
- `twitter_card_type` (Single-Option) - "Twitter Card Type"
  - Options: summary, summary_large_image, app, player

#### Advanced SEO Fields

- `robots_index` (Boolean) - "Allow Search Engine Indexing"
- `robots_follow` (Boolean) - "Allow Following Links"
- `robots_noarchive` (Boolean) - "Prevent Archiving"
- `robots_nosnippet` (Boolean) - "Prevent Snippets"

#### Structured Data Fields

- `structured_data_type` (Single-Option) - "Structured Data Type"
  - Options: WebSite, Organization, LocalBusiness, Article, Product, Event, FAQ, Custom
- `structured_data_custom` (Textarea) - "Custom JSON-LD Schema"

#### Additional Fields

- `author` (Text) - "Author"
- `publisher` (Text) - "Publisher"
- `article_published_time` (DateTime) - "Published Date"
- `article_modified_time` (DateTime) - "Modified Date"
- `article_author` (Text) - "Article Author"
- `article_section` (Text) - "Article Section"
- `article_tags` (Text) - "Article Tags (comma-separated)"

### 2. Update Content Types

#### Header Content Type

Add field:

- `global_seo` (Blocks) - "Global SEO Settings"
  - Restrict to: `seo` block only
  - Maximum: 1

#### Page Content Type

Add field:

- `seo` (Blocks) - "Page SEO Settings"
  - Restrict to: `seo` block only
  - Maximum: 1

## Usage Examples

### 1. Setting Global SEO (Header)

In your header story:

```json
{
  "global_seo": {
    "component": "seo",
    "title": "My Website",
    "description": "Welcome to my amazing website",
    "og_type": "website",
    "structured_data_type": "WebSite",
    "robots_index": true,
    "robots_follow": true
  }
}
```

### 2. Page-Specific SEO Override

In a page story:

```json
{
  "seo": {
    "component": "seo",
    "title": "About Us | My Website",
    "description": "Learn more about our company and mission",
    "og_type": "website",
    "structured_data_type": "Organization",
    "article_section": "About"
  }
}
```

### 3. Article with Rich SEO

For blog posts or articles:

```json
{
  "seo": {
    "component": "seo",
    "title": "How to Build Amazing Websites",
    "description": "A comprehensive guide to building modern websites",
    "og_type": "article",
    "structured_data_type": "Article",
    "article_published_time": "2024-01-15T10:00:00Z",
    "article_author": "John Doe",
    "article_section": "Web Development",
    "article_tags": "web development, tutorial, guide"
  }
}
```

### 4. Custom Structured Data

For complex schema requirements:

```json
{
  "seo": {
    "component": "seo",
    "structured_data_type": "Custom",
    "structured_data_custom": "{\"@context\":\"https://schema.org\",\"@type\":\"Recipe\",\"name\":\"Chocolate Chip Cookies\",\"author\":{\"@type\":\"Person\",\"name\":\"Jane Smith\"}}"
  }
}
```

## Priority & Fallback System

The SEO system follows this priority order:

1. **Page-specific SEO** (highest priority)
2. **Global SEO** (from header)
3. **Fallback defaults** (code-defined)

### Example Priority Flow

For a page title:

1. Check `page.seo.title`
2. If empty, check `global.seo.title`
3. If empty, use fallback: `"NextJS Storyblok Template"`

For Open Graph title:

1. Check `page.seo.og_title`
2. If empty, check `page.seo.title`
3. If empty, check `global.seo.og_title`
4. If empty, check `global.seo.title`
5. If empty, use fallback title

## Best Practices

### 1. Global SEO Setup

- Set up global SEO in your header for site-wide defaults
- Include your brand name, default description, and logo
- Configure default structured data (WebSite or Organization)

### 2. Page-Specific SEO

- Override only the fields that need customization
- Use descriptive, unique titles for each page
- Write compelling meta descriptions (150-160 characters)
- Use relevant keywords naturally

### 3. Open Graph & Twitter Cards

- Always include og_image for better social sharing
- Use high-quality images (1200x630px recommended)
- Write social-specific descriptions if needed

### 4. Structured Data

- Use appropriate schema types for your content
- Article schema for blog posts and news
- Product schema for e-commerce
- LocalBusiness for physical locations
- Custom JSON-LD for complex requirements

### 5. Multi-language Considerations

- Set up SEO blocks for each language variant
- Use language-specific keywords and descriptions
- Configure proper hreflang relationships

## Technical Implementation

### Files Modified/Created

- `lib/types.ts` - SEO block type definitions
- `lib/seo-utils.ts` - SEO processing utilities
- `components/blocks/SEO.tsx` - SEO block component
- `app/[lang]/page.tsx` - Homepage metadata generation
- `app/[lang]/about/page.tsx` - About page metadata generation
- `app/[lang]/layout.tsx` - Structured data generation
- `components/blocks/HeaderNavigation.tsx` - Global SEO integration
- `components/blocks/Page.tsx` - Page SEO integration

### Key Functions

- `mergeSEOData()` - Merges global and page SEO with fallbacks
- `generateMetadataFromSEO()` - Converts SEO data to Next.js Metadata
- `generateStructuredData()` - Creates JSON-LD structured data
- `extractSEOFromStoryblok()` - Extracts SEO blocks from Storyblok content

## Testing & Validation

### 1. SEO Testing Tools

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)

### 2. Manual Testing

1. Check page source for correct meta tags
2. Verify Open Graph tags are present
3. Test social sharing on platforms
4. Validate structured data syntax
5. Test canonical URLs and hreflang

### 3. Monitoring

- Set up Google Search Console
- Monitor Core Web Vitals
- Track social sharing performance
- Regular SEO audits

## Troubleshooting

### Common Issues

1. **SEO data not appearing**
   - Check Storyblok content structure
   - Verify component registration
   - Check console for errors

2. **Structured data errors**
   - Validate JSON-LD syntax
   - Check required properties for schema type
   - Use Google's structured data validator

3. **Social sharing not working**
   - Verify image URLs are absolute
   - Check image dimensions and format
   - Clear social platform caches

### Debug Mode

Enable detailed logging by setting `NODE_ENV=development` to see SEO processing logs.

## Migration Guide

If you have existing SEO implementations:

1. **Backup current metadata**
2. **Create SEO blocks in Storyblok**
3. **Add SEO fields to content types**
4. **Migrate existing SEO data**
5. **Test thoroughly**
6. **Update content gradually**

This SEO block system provides a scalable, maintainable approach to SEO management in your Next.js Storyblok application while maintaining flexibility for future enhancements.
