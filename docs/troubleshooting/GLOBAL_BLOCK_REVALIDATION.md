# 🔄 Global Block Revalidation Fix

> Complete solution for immediate global block updates in Storyblok

## 🎯 Problem Solved

**Issue**: When making changes to global blocks (header, footer) in Storyblok, changes were only reflected when publishing any page, not immediately when the global blocks were updated.

**Root Cause**: The original revalidation logic only handled **page stories** but didn't handle **global blocks** like `header` and `footer`. Global blocks affect all pages and need special revalidation logic.

## ✅ Solution Implemented

### 1. Enhanced Revalidation Logic

Updated `/app/api/revalidate/route.ts` to detect and handle global blocks:

```typescript
// Detect global blocks
const isGlobalBlock =
  story.parent_id === 0 && storyName && ['header', 'footer'].includes(storyName.toLowerCase())

if (isGlobalBlock) {
  // Revalidate all language paths since global blocks affect all pages
  const languages = ['en', 'ar']

  // Revalidate root paths
  await revalidatePath('/')
  await revalidatePath('/about')

  // Revalidate language-specific paths
  for (const lang of languages) {
    if (lang !== 'en') {
      await revalidatePath(`/${lang}`)
      await revalidatePath(`/${lang}/about`)
    }
  }

  // Revalidate global content tags
  revalidateTag(`global-${storyName}`)
  revalidateTag('global-content')
}
```

### 2. Proper Caching with Tags

Updated `/lib/blocks.tsx` to use Next.js `unstable_cache` with proper cache tags:

```typescript
export async function fetchGlobalContent(storyName: string, preview = false, language?: string) {
  const cachedFetch = unstable_cache(
    async () => _fetchGlobalContentFromAPI(storyName, preview, language),
    [`global-${storyName}`, language || 'default', preview ? 'draft' : 'published'],
    {
      tags: [
        `global-${storyName}`,
        'global-content',
        `global-${storyName}-${language || 'default'}`,
      ],
      revalidate: 3600, // Cache for 1 hour by default
    }
  )

  return await cachedFetch()
}
```

### 3. Manual Testing Endpoints

Added manual revalidation endpoints for testing:

| Endpoint                            | Purpose                    |
| ----------------------------------- | -------------------------- |
| `GET /api/revalidate?global=header` | Revalidate header globally |
| `GET /api/revalidate?global=footer` | Revalidate footer globally |
| `GET /api/revalidate?path=/about`   | Revalidate specific page   |

## 🔄 How It Works Now

### Automatic Revalidation (Webhook)

| Step | Process                                                                                                                                                                           | Result                   |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| 1    | **Storyblok sends webhook** when global block is updated                                                                                                                          | Webhook payload received |
| 2    | **Revalidation endpoint detects** global block by checking:<br/>• `story.parent_id === 0` (root level)<br/>• `story.name` is 'header' or 'footer'                                 | Global block identified  |
| 3    | **Revalidates all affected paths**:<br/>• Root paths: `/`, `/about`<br/>• Language paths: `/ar`, `/ar/about`<br/>• Cache tags: `global-header`, `global-footer`, `global-content` | All pages updated        |

### Manual Revalidation (Testing)

For testing or immediate updates:

```bash
# Revalidate header globally
curl "http://localhost:3000/api/revalidate?global=header"

# Revalidate footer globally
curl "http://localhost:3000/api/revalidate?global=footer"

# Revalidate specific path
curl "http://localhost:3000/api/revalidate?path=/about"
```

## ✅ Expected Behavior Now

| Feature                          | Status  | Description                                                |
| -------------------------------- | ------- | ---------------------------------------------------------- |
| ✅ **Global block changes**      | Working | Header/footer changes reflect immediately across all pages |
| ✅ **Page changes**              | Working | Continue to work as before                                 |
| ✅ **Language-specific content** | Working | Properly revalidated for all languages                     |
| ✅ **Cache invalidation**        | Working | Correctly works with Next.js cache system                  |

## 🧪 Testing Steps

### 1. Test Global Block Updates

1. **Make a change** to header or footer in Storyblok
2. **Publish the change**
3. **Check any page** - changes should appear immediately
4. **Test both languages** (English and Arabic) to ensure both are updated

### 2. Test Manual Revalidation

```bash
# Test header revalidation
curl "http://localhost:3000/api/revalidate?global=header"
# Expected: {"revalidated": true, "paths": ["/", "/about", "/ar", "/ar/about"]}

# Test footer revalidation
curl "http://localhost:3000/api/revalidate?global=footer"
# Expected: {"revalidated": true, "paths": ["/", "/about", "/ar", "/ar/about"]}
```

## 🔧 Webhook Configuration

Ensure your Storyblok webhook is configured to call:

```
https://yourdomain.com/api/revalidate
```

### Webhook Settings

| Setting      | Value                                           |
| ------------ | ----------------------------------------------- |
| **URL**      | `https://yourdomain.com/api/revalidate`         |
| **Secret**   | Your webhook secret from environment variables  |
| **Triggers** | Published events, Unpublished events (optional) |

## 🛠️ Troubleshooting

### Global Blocks Still Not Updating?

| Step | Action                                        | Expected Result                                 |
| ---- | --------------------------------------------- | ----------------------------------------------- |
| 1    | **Check webhook logs** in Storyblok dashboard | Should show successful delivery                 |
| 2    | **Test manual revalidation**                  | `GET /api/revalidate?global=header` should work |
| 3    | **Check console logs**                        | Should show revalidation messages               |
| 4    | **Verify cache tags**                         | Tags should be properly invalidated             |

### Common Issues & Solutions

| Issue                     | Solution                              |
| ------------------------- | ------------------------------------- |
| Webhook not firing        | Check Storyblok webhook configuration |
| Manual revalidation fails | Verify API route is accessible        |
| Cache not clearing        | Check cache tags implementation       |
| Language-specific issues  | Verify language detection logic       |

## 🚀 Future Improvements

### Planned Enhancements

- **Dynamic language detection** instead of hardcoded `['en', 'ar']`
- **Webhook secret verification** for enhanced security
- **More granular cache tags** for better performance
- **Background revalidation** for non-critical updates

### Implementation Priority

1. **High**: Dynamic language detection
2. **Medium**: Webhook secret verification
3. **Low**: Background revalidation
4. **Low**: Granular cache tags

---

## 🎯 Summary

This implementation provides:

- ✅ **Immediate global block updates** across all pages
- ✅ **Multi-language support** with proper revalidation
- ✅ **Manual testing capabilities** for debugging
- ✅ **Robust error handling** and logging
- ✅ **Future-proof architecture** for enhancements

**Result**: Global blocks now update immediately when changed in Storyblok! 🎉
