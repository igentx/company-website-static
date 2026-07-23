# Hero Slider ↔ ServiceHero Field Alignment

**Status**: ✅ Complete  
**Date**: October 27, 2025

## Overview

The `hero_slide` component has been updated to use the **exact same fields as ServiceHero** for maximum consistency and content reusability. This allows you to duplicate ServiceHero content and convert it directly to Hero Slides without any field mapping.

---

## Field Mapping

### ✅ New ServiceHero-Compatible Fields

| Field Name | Type | Display Name | Description |
|------------|------|-------------|-------------|
| `category` | Text | Category | Category or service label (e.g., "Web Development") |
| `title` | Text | Title | Main slide title (large, single heading) |
| `summary` | Textarea | Summary | Supporting description text (xl font) |
| `featured_image` | Asset | Featured Image | Main slide image (1200x1200px recommended) |
| `quick_features` | Text (Multiple) | Quick Features | 3-5 bullet points with green checkmarks |
| `pricing_preview` | Text | Pricing Preview | Starting price (e.g., "AED 4,999") |
| `duration` | Text | Duration / Timeline | Project timeline (e.g., "2-3 weeks") |
| `cta_text` | Text | CTA Button Text | Button label (e.g., "Get a Quote") |
| `cta_link` | Link | CTA Button Link | Button destination URL |

### ❌ Deprecated Fields (Backward Compatible)

The following fields are **still supported** for backward compatibility but are deprecated:

| Old Field Name | New Field Name | Status |
|----------------|----------------|--------|
| `badge_text` | `category` | Deprecated - use `category` |
| `headline_part1` | `title` | Deprecated - use `title` |
| `headline_part2` | _(removed)_ | Not used |
| `headline_part3` | _(removed)_ | Not used |
| `subheadline` | `summary` | Deprecated - use `summary` |
| `primary_cta_text` | `cta_text` | Deprecated - use `cta_text` |
| `primary_cta_link` | `cta_link` | Deprecated - use `cta_link` |
| `secondary_cta_text` | _(removed)_ | Not used |
| `secondary_cta_link` | _(removed)_ | Not used |
| `trust_signals` | _(removed)_ | Use `pricing_preview` and `duration` instead |
| `background_image` | _(removed)_ | Not used |
| `background_video` | _(removed)_ | Not used |

---

## Benefits

### 🎯 Content Reusability
- **Copy & Paste**: Duplicate ServiceHero content → Convert to Hero Slide → Done!
- **No Field Mapping**: Fields are identical, no need to remember different names
- **Consistent Design**: Both components render identically

### 🛠️ Developer Experience
- **Single Source of Truth**: ServiceHero fields define the structure
- **Type Safety**: TypeScript types ensure field compatibility
- **Backward Compatible**: Existing hero_slide content still works with fallbacks

### 📝 Content Editor Experience
- **Familiar Interface**: Same fields in both components
- **Quick Setup**: Create multiple slides by duplicating ServiceHero content
- **Less Confusion**: No need to learn different field names

---

## Implementation Details

### TypeScript Types (`lib/types.ts`)

```typescript
export interface HeroSlideBlok extends SbBlokData {
  component: 'hero_slide'
  // Primary fields (matching ServiceHero)
  category?: string
  title: string
  summary?: string
  featured_image?: { filename: string; alt: string }
  quick_features?: string | string[]
  pricing_preview?: string
  duration?: string
  cta_text?: string
  cta_link?: { url: string; linktype: string }
  
  // Deprecated fields (kept for backward compatibility)
  badge_text?: string // Use 'category' instead
  headline_part1?: string // Use 'title' instead
  subheadline?: string // Use 'summary' instead
  primary_cta_text?: string // Use 'cta_text' instead
  primary_cta_link?: { url: string; linktype: string }
  // ... other deprecated fields
}
```

### Component Logic (`IGENTXHero.tsx`)

The component now uses fallback logic to support both new and old field names:

```typescript
// Use ServiceHero field names with backward compatibility fallbacks
const category = slide.category || slide.badge_text
const title = slide.title || slide.headline_part1 || ''
const summary = slide.summary || slide.subheadline
const ctaText = slide.cta_text || slide.primary_cta_text
const ctaLink = slide.cta_link || slide.primary_cta_link

// Normalize quick_features to array (like ServiceHero)
const quickFeatures: string[] = Array.isArray(slide.quick_features)
  ? slide.quick_features
  : typeof slide.quick_features === 'string'
    ? slide.quick_features.split('\n').map((feature) => feature.trim()).filter(Boolean)
    : []
```

---

## Migration Guide

### For Existing Hero Slides

**Good News**: You don't need to migrate immediately! The component supports backward compatibility with fallbacks.

**Optional Migration Path**:

1. **In Storyblok**, update your `hero_slide` component schema to add new fields
2. **For each hero_slide**:
   - Copy content from old fields to new fields:
     - `badge_text` → `category`
     - `headline_part1` → `title`
     - `subheadline` → `summary`
     - `primary_cta_text` → `cta_text`
     - `primary_cta_link` → `cta_link`
   - Delete old field values (optional)
3. **Test** the slides render correctly

### Converting ServiceHero to Hero Slide

1. **In Storyblok**, find any ServiceHero component
2. **Duplicate** the ServiceHero block
3. **Change component type** from `service_hero` to `hero_slide`
4. **Add to IGENTXHero** `slides` array
5. **Done!** No field mapping needed

---

## Storyblok Schema

### Complete Schema (Import to Storyblok)

Use the schema from `/docs/features/HERO_SLIDER_SCHEMA.json`:

```json
{
  "hero_slide_component": {
    "name": "hero_slide",
    "display_name": "Hero Slide",
    "description": "Individual slide matching ServiceHero fields exactly",
    "schema": {
      "category": { "type": "text", "pos": 0, ... },
      "title": { "type": "text", "pos": 1, "required": true, ... },
      "summary": { "type": "textarea", "pos": 2, ... },
      "featured_image": { "type": "asset", "pos": 3, ... },
      "quick_features": { "type": "text", "pos": 4, "allow_multiple": true, ... },
      "pricing_preview": { "type": "text", "pos": 5, ... },
      "duration": { "type": "text", "pos": 6, ... },
      "cta_text": { "type": "text", "pos": 7, ... },
      "cta_link": { "type": "multilink", "pos": 8, ... }
    },
    "is_nestable": true
  }
}
```

---

## Design Consistency

Both `ServiceHero` and `hero_slide` now render with **identical design**:

### Layout Structure
```
┌─────────────────────────────────────────────────────┐
│                    [Category Badge]                  │
│                                                      │
│  ┌─────────────────────┐  ┌──────────────────────┐ │
│  │  Content Column     │  │  Image Column        │ │
│  │                     │  │                      │ │
│  │  - Category Badge   │  │  [Featured Image]    │ │
│  │  - Title (4xl-6xl) │  │   1200x1200px       │ │
│  │  - Summary (xl)    │  │   Square aspect     │ │
│  │  - Quick Features  │  │   + Decorative      │ │
│  │    ✓ Feature 1     │  │     blobs           │ │
│  │    ✓ Feature 2     │  │                      │ │
│  │  - Pricing Boxes   │  │                      │ │
│  │    [Price] [Time]  │  │                      │ │
│  │  - CTA Button      │  │                      │ │
│  │    [Get a Quote →] │  │                      │ │
│  └─────────────────────┘  └──────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### Visual Elements
- **Category Badge**: Solid blue pill (`bg-blue-600`)
- **Title**: 4xl-6xl font, bold, white
- **Summary**: xl font, gray-200
- **Quick Features**: Green checkmark icons (`text-green-400`)
- **Pricing Boxes**: Glassmorphism (`bg-white/10 backdrop-blur-sm`)
- **CTA Button**: White bg, blue text, rounded-xl, hover effects
- **Featured Image**: Square aspect, rounded-2xl, decorative gradient blobs

---

## Files Modified

### Core Files
1. ✅ **`lib/types.ts`**
   - Updated `HeroSlideBlok` interface with ServiceHero fields
   - Added backward compatibility fields with deprecation comments

2. ✅ **`components/blocks/IGENTXHero.tsx`**
   - Added fallback logic for new/old field names
   - Implemented `quick_features` normalization (like ServiceHero)
   - Updated JSX to use new field variables

### Documentation Files
3. ✅ **`docs/IGENTX_STORYBLOK_SCHEMAS.md`**
   - Updated `hero_slide` schema with ServiceHero fields
   - Added field mapping table
   - Documented backward compatibility

4. ✅ **`docs/features/HERO_SLIDER_SCHEMA.json`**
   - Updated JSON schema with ServiceHero field names
   - Removed deprecated fields
   - Ready for Storyblok import

5. ✅ **`docs/features/HERO_SLIDER_SCHEMA.md`**
   - Updated component structure diagram
   - Updated fields table with ServiceHero compatibility column
   - Added green checkmark indicators (🟢)

6. ✅ **`docs/features/HERO_SLIDER_SERVICEHERO_ALIGNMENT.md`** (this file)
   - Complete documentation of field alignment
   - Migration guide
   - Benefits and implementation details

---

## Testing Checklist

- [x] TypeScript types compile without errors
- [x] No linter errors
- [x] Backward compatibility with old field names
- [x] Forward compatibility with ServiceHero fields
- [x] `quick_features` normalization (string or array)
- [x] Design matches ServiceHero exactly
- [x] Animations work with new fields
- [x] Slider navigation and auto-play functional

---

## Next Steps

### For Content Editors:
1. **Update Storyblok** schema with new `hero_slide` fields
2. **Test creating** a new slide using ServiceHero fields
3. **Optionally migrate** existing slides to new field names

### For Developers:
1. **Monitor** for any issues with backward compatibility
2. **Update** any custom code that references old field names
3. **Consider deprecation timeline** for old fields (recommend 6-12 months)

---

## Support

If you encounter any issues:
1. Check TypeScript types in `lib/types.ts`
2. Review fallback logic in `IGENTXHero.tsx`
3. Verify Storyblok schema matches documentation
4. Ensure field names are spelled correctly (case-sensitive!)

---

**🎉 Result**: Hero Slider and ServiceHero are now fully aligned with identical fields and design!

