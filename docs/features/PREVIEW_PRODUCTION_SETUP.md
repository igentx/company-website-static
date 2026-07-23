# Preview & Production Environment Setup

> **Historical note:** This guide describes the live Storyblok CMS preview workflow from the original `www.igentx.com` project. The static site (`www.igentx.com--static`) no longer uses Storyblok at runtime. Content is built from JSON in `content/`; use `npm run export:storyblok` only for one-time re-exports.

This guide explains how the application handles different rendering modes for preview and production environments, optimizing for both real-time editing and performance.

## Overview

The application uses two distinct rendering strategies:

1. **Preview Environment**: Dynamic rendering with no caching for Storyblok Visual Editor
2. **Production Environment**: Static Site Generation (SSG) with Incremental Static Regeneration (ISR)

## Environment Configuration

### Preview Environment

Set the following environment variable for preview deployments:

```env
NEXT_PUBLIC_ENVIRONMENT=preview
```

This enables:

- ✅ Dynamic rendering for all pages
- ✅ No caching (all requests fetch fresh data)
- ✅ Real-time updates in Storyblok Visual Editor
- ✅ Hot-reload on content changes
- ✅ Draft content visibility

### Production Environment

For production deployments, either omit `NEXT_PUBLIC_ENVIRONMENT` or set it to any value other than `preview`:

```env
# Option 1: Don't set NEXT_PUBLIC_ENVIRONMENT
# Option 2: Set explicitly
NEXT_PUBLIC_ENVIRONMENT=production
```

This enables:

- ✅ Static Site Generation (SSG)
- ✅ Incremental Static Regeneration (ISR) with 1-hour revalidation
- ✅ Webhook-based revalidation on publish
- ✅ Optimized performance with caching
- ✅ Published content only

## How It Works

### 1. Preview Detection

The `isPreview()` function in `lib/utils.ts` detects preview mode:

```typescript
export function isPreview() {
  // Check environment variable
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'preview') {
    return true
  }

  // Check if we're in Storyblok Visual Editor
  if (typeof window !== 'undefined' && window.location.search.includes('_storyblok')) {
    return true
  }

  return false
}
```

### 2. Data Fetching

In `lib/blocks.tsx`, all fetch functions check for preview mode and bypass caching:

```typescript
export async function fetchStory(slug: string, preview = false, language?: string) {
  // For preview mode, skip caching to always get fresh content
  if (preview || process.env.NEXT_PUBLIC_ENVIRONMENT === 'preview') {
    console.log(`Preview mode: Fetching fresh story: ${slug}`)
    return _fetchStoryFromAPI(slug, preview, language)
  }

  // Production: Use Next.js caching
  // ... caching logic
}
```

### 3. Build-Time Configuration

Since Next.js requires static exports for `dynamic` and `revalidate`, we use a build script to configure pages based on environment:

**Preview Mode Configuration:**

```typescript
export const dynamic = 'force-dynamic'
export const revalidate = 0
// generateStaticParams function is commented out
```

**Production Mode Configuration:**

```typescript
export const dynamic = 'auto'
export const revalidate = 3600
export async function generateStaticParams() {
  // Generate static params for all languages
}
```

**Build Scripts:**

```bash
# Preview build (dynamic rendering)
npm run build:preview

# Production build (SSG with ISR)
npm run build:production
```

### 4. Visual Editor Integration

The layout includes enhanced Visual Editor support for preview mode:

```javascript
// Enhanced hot-reload for preview mode
window.storyblok.on(['published', 'change', 'input'], function (payload) {
  if ('${process.env.NEXT_PUBLIC_ENVIRONMENT}' === 'preview') {
    // Force hard reload to bypass any caching
    window.location.reload(true)
  } else {
    window.location.reload()
  }
})
```

## Deployment Setup

### Preview Deployment (Vercel Example)

1. Create a preview deployment in Vercel
2. Set environment variables:
   ```
   NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_preview_token
   NEXT_PUBLIC_ENVIRONMENT=preview
   ```
3. Use the build command: `npm run build:preview`
4. Use this deployment URL in Storyblok's Visual Editor settings

### Production Deployment

1. Create a production deployment
2. Set environment variables:
   ```
   NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_public_token
   # Don't set NEXT_PUBLIC_ENVIRONMENT or set it to 'production'
   ```
3. Use the build command: `npm run build:production`
4. Configure webhooks in Storyblok (see below)

## Webhook Configuration for Production

To enable automatic revalidation on content publish:

### 1. In Storyblok

1. Go to Settings → Webhooks
2. Create a new webhook:
   - **URL**: `https://your-domain.com/api/revalidate`
   - **Triggers**: Story published, Story unpublished
   - **Secret**: (optional) Add a secret for security

### 2. In Your Application

The `/api/revalidate` endpoint handles cache invalidation:

```typescript
// Revalidates specific paths and cache tags
if (isGlobalBlock) {
  // Global blocks affect all pages
  await revalidateAllPaths()
  revalidateGlobalTags(storyName)
} else {
  // Regular pages
  await revalidatePath(`/${storySlug}`)
}
```

### 3. Security (Optional)

Add webhook secret validation:

```env
STORYBLOK_WEBHOOK_SECRET=your_secret_here
```

Uncomment the security check in `/api/revalidate/route.ts`:

```typescript
const webhookSecret = request.headers.get('webhook-secret')
if (webhookSecret !== process.env.STORYBLOK_WEBHOOK_SECRET) {
  return NextResponse.json({ message: 'Invalid webhook secret' }, { status: 401 })
}
```

## Testing

### Preview Mode Testing

1. Deploy with `NEXT_PUBLIC_ENVIRONMENT=preview`
2. Open Storyblok Visual Editor
3. Make changes and verify instant updates
4. Check console for "Preview mode" logs

### Production Mode Testing

1. Deploy without preview environment variable
2. Publish content in Storyblok
3. Verify webhook triggers revalidation
4. Check that pages are statically generated

### Manual Cache Testing

Use the revalidate API endpoint:

```bash
# Revalidate specific path
curl "https://your-domain.com/api/revalidate?path=/about"

# Revalidate global blocks
curl "https://your-domain.com/api/revalidate?global=header"

# Revalidate everything
curl "https://your-domain.com/api/revalidate?all=true"
```

## Performance Comparison

### Preview Mode

- **First Load**: ~200-500ms (dynamic fetch)
- **Subsequent Loads**: ~200-500ms (no caching)
- **Content Updates**: Instant

### Production Mode

- **First Load**: ~50-100ms (static)
- **Subsequent Loads**: ~50-100ms (static)
- **Content Updates**: After revalidation (webhook or ISR)

## Best Practices

1. **Use separate Storyblok access tokens** for preview and production
2. **Monitor webhook delivery** in Storyblok's webhook logs
3. **Set up error alerting** for failed revalidations
4. **Use preview deployments** for content editors
5. **Keep production deployments** for end users

## Troubleshooting

### Content not updating in preview mode

1. Check `NEXT_PUBLIC_ENVIRONMENT` is set to `preview`
2. Verify browser console shows "Preview mode" logs
3. Check Visual Editor connection in browser console

### Content not updating in production

1. Verify webhook is configured correctly
2. Check webhook logs in Storyblok
3. Test manual revalidation endpoint
4. Check server logs for revalidation errors

### Performance issues in preview

This is expected behavior. Preview mode prioritizes real-time updates over performance. Use production mode for performance testing.
