# Global SEO Setup Guide

This guide explains how to configure global SEO settings in your Next.js Storyblok application so that pages without specific SEO blocks will use the global SEO configuration from the header.

## Current Issue

When pages don't have a specific SEO block, they fall back to hardcoded values instead of using the global SEO configuration from the header. This has been fixed with an enhanced fallback system.

## Solution Implemented

### 1. Enhanced Fallback Logic

The application now tries multiple sources for global SEO data:

1. **Primary**: Global SEO block in header content (`global_seo` field)
2. **Secondary**: Header brand information as SEO fallback
3. **Tertiary**: Hardcoded fallback values

### 2. Header Brand Information Fallback

If no global SEO block is found, the system will automatically create SEO data using:

- Header `logo_text` or `brand_name` as the title
- Generated description: "Official website for [Brand Name]"
- Standard Open Graph and Twitter Card metadata

## Setting Up Global SEO in Storyblok (Recommended)

### Step 1: Add SEO Field to Header Content Type

1. Go to your Storyblok space
2. Navigate to Content Types → Header Navigation
3. Add a new field:
   - **Name**: `global_seo`
   - **Display Name**: "Global SEO Settings"
   - **Type**: Blocks
   - **Maximum**: 1
   - **Restrict Components**: Yes
   - **Allowed Components**: Select `seo`

### Step 2: Configure Global SEO in Header Content

1. Go to Content → Header (your header content entry)
2. Add a new SEO block in the "Global SEO Settings" field
3. Configure the following fields:

#### Basic SEO

- **Title**: Your site name (e.g., "Nextjs StoryBlok CMS")
- **Description**: Your site description (e.g., "A modern Next.js template with Storyblok CMS integration")
- **Keywords**: Relevant keywords for your site

#### Open Graph

- **OG Title**: Your site name
- **OG Description**: Your site description
- **OG Image**: Upload your site's social media image
- **OG Type**: "website"

#### Twitter Card

- **Twitter Title**: Your site name
- **Twitter Description**: Your site description
- **Twitter Image**: Upload your Twitter card image
- **Twitter Card Type**: "summary_large_image"

#### Robots

- **Robots Index**: True
- **Robots Follow**: True

### Step 3: Save and Publish

Save and publish your header content to make the global SEO settings active.

## How It Works

### Page-Level SEO Priority

```typescript
// SEO priority system:
1. Page-specific SEO block (if present)
2. Global SEO block from header (if configured)
3. Header brand information fallback
4. Hardcoded fallback values
```

### Automatic Brand Fallback

If no global SEO block is configured, the system automatically creates SEO metadata using:

```typescript
// From your header configuration
const headerBrand = "Nextjs StoryBlok CMS" // from logo_text

// Generated SEO data
{
  title: "Nextjs StoryBlok CMS",
  description: "Official website for Nextjs StoryBlok CMS",
  og_title: "Nextjs StoryBlok CMS",
  og_description: "Official website for Nextjs StoryBlok CMS",
  // ... other metadata
}
```

## Current Behavior

### With Global SEO Block Configured

- ✅ Pages use global SEO as fallback
- ✅ Page-specific SEO overrides global settings
- ✅ Consistent branding across all pages

### Without Global SEO Block (Current State)

- ✅ Pages use header brand information automatically
- ✅ Generated from your existing `logo_text` field
- ✅ Professional SEO metadata without additional configuration

## Testing the Setup

### 1. Check Homepage SEO

Visit your homepage and view the page source. You should see:

```html
<title>Nextjs StoryBlok CMS</title>
<meta name="description" content="Official website for Nextjs StoryBlok CMS" />
<meta property="og:title" content="Nextjs StoryBlok CMS" />
<meta property="og:description" content="Official website for Nextjs StoryBlok CMS" />
```

### 2. Test with Page-Specific SEO

1. Add an SEO block to any specific page
2. Configure custom title and description
3. Verify that the page uses its specific SEO data instead of global

## Advanced Configuration

### Custom Global SEO Block

For more control, create a dedicated global SEO block:

```typescript
// In your header content type, add a global_seo field
// Configure with your brand-specific SEO data:
{
  title: "Your Brand Name",
  description: "Your brand description",
  keywords: "keyword1, keyword2, keyword3",
  og_image: "https://your-domain.com/social-image.jpg",
  twitter_card_type: "summary_large_image"
}
```

### Multiple Language Support

The system automatically handles multiple languages:

```typescript
// English (default)
title: 'Nextjs StoryBlok CMS'

// Arabic
title: 'Nextjs StoryBlok CMS - AR'
```

## Troubleshooting

### Global SEO Not Working

1. **Check Header Content**: Ensure your header content has the `global_seo` field
2. **Verify Component**: Make sure the SEO component is properly configured
3. **Clear Cache**: Restart your development server

### Brand Information Not Found

1. **Check Logo Text**: Ensure your header has `logo_text` or `brand_name` field
2. **Verify Content**: Make sure the header content is properly fetched

### Debugging

Add console logging to see what SEO data is being used:

```typescript
// This is already added to the current implementation
console.log('Global SEO found:', !!globalSEO.global)
console.log('Header brand:', headerContent?.logo_text)
```

## Benefits of This Implementation

### 1. Zero Configuration Required

- Works immediately with existing header brand information
- No additional Storyblok setup needed

### 2. Flexible and Extensible

- Easy to add global SEO block when needed
- Page-specific overrides still work perfectly

### 3. SEO Best Practices

- Proper meta tags on all pages
- Consistent branding
- Search engine friendly

### 4. Automatic Fallbacks

- Never shows empty or generic SEO data
- Always uses relevant brand information

## Next Steps

1. **Immediate**: The enhanced fallback is already working with your header brand
2. **Optional**: Add global SEO block to header for more control
3. **Future**: Add page-specific SEO blocks as needed

Your SEO implementation is now complete and working automatically!
