# Hero Slider Storyblok Schema (Slider-Only Mode)

## Overview

> **⚠️ Breaking Change**: The IGENTXHero component is now **slider-only** and requires at least one `hero_slide` block. The old single-hero mode has been removed.

The IGENTXHero component provides a powerful, consistent slider experience with smooth transitions, pagination dots, navigation buttons, and auto-play functionality.

## Features

- ✅ **ServiceHero-style layout** - Clean, professional design with category badge, single title, pricing boxes, and one CTA
- ✅ **Slider-only architecture** - Requires 1+ hero_slide blocks
- ✅ **Single slide support** - Works with just one slide (no navigation shown)
- ✅ **Auto-playing carousel** with configurable delay (2+ slides)
- ✅ **Smooth transitions** with fade and slide effects
- ✅ **Pagination dots** for easy slide navigation (2+ slides)
- ✅ **Navigation buttons** Previous/Next (2+ slides)
- ✅ **Pause on hover** for better UX
- ✅ **Responsive design** for all screen sizes
- ✅ **Two-column layout** (Content + Featured Image)
- ✅ **Quick features** with green checkmark icons
- ✅ **Pricing & Duration boxes** - Glassmorphism cards for pricing and timeline
- ✅ **Single prominent CTA button** per slide

### Layout Updates (ServiceHero-style):
- **Category Badge**: `badge_text` - Solid blue badge
- **Single Title**: Uses `headline_part1` only (4xl-6xl font size)
- **Summary**: `subheadline` - Larger text (xl)
- **Quick Features**: Bullet list with green checkmarks
- **Pricing Preview**: NEW! Starting price in glassmorphism box
- **Duration**: NEW! Timeline/duration in glassmorphism box
- **Single CTA**: White button with blue text
- **Removed**: Multi-part headlines, secondary CTA, trust signals

## Component Structure

```
igentx_hero (Main Component)
├── slides[] (Array of hero_slide components) [REQUIRED]
│   ├── hero_slide (Individual Slide - Matches ServiceHero exactly)
│   │   ├── category (Category badge) 🟢
│   │   ├── title (Main title) 🟢 [REQUIRED]
│   │   ├── summary (Supporting description) 🟢
│   │   ├── featured_image (Right column image) 🟢
│   │   ├── quick_features[] (Bullet list with checkmarks) 🟢
│   │   ├── pricing_preview (Starting price) 🟢
│   │   ├── duration (Timeline/duration) 🟢
│   │   ├── cta_text (CTA button label) 🟢
│   │   └── cta_link (CTA button URL) 🟢
├── enable_autoplay (Boolean)
└── autoplay_delay (Number)
```

**🟢 = ServiceHero Compatible Field** - These fields match ServiceHero exactly!

---

## Schema Setup Instructions

### Step 1: Create the `hero_slide` Component

1. Go to **Storyblok** → **Block Library**
2. Click **+ New Block**
3. Set the following:
   - **Name**: `hero_slide`
   - **Display Name**: `Hero Slide`
   - **Type**: `Nestable`

#### Fields for `hero_slide`:

> **✨ All fields match ServiceHero exactly!** You can copy content from ServiceHero and paste directly into Hero Slides.

| Field Name | Display Name | Type | ServiceHero Match | Description |
|------------|-------------|------|------------------|-------------|
| `category` | Category | Text | 🟢 Yes | Category label (e.g., "Web Development") |
| `title` | Title | Text | 🟢 Yes | Single main title (4xl-6xl font) |
| `summary` | Summary | Textarea | 🟢 Yes | Supporting description (xl font) |
| `featured_image` | Featured Image | Asset | 🟢 Yes | Main slide image (right column, 1200x1200px) |
| `quick_features` | Quick Features | Text (Multiple) | 🟢 Yes | 3-5 bullet points with green checkmarks |
| `pricing_preview` | Pricing Preview | Text | 🟢 Yes | Starting price (e.g., "AED 4,999") |
| `duration` | Duration / Timeline | Text | 🟢 Yes | Project timeline (e.g., "2-3 weeks") |
| `cta_text` | CTA Button Text | Text | 🟢 Yes | Button label (e.g., "Get a Quote") |
| `cta_link` | CTA Button Link | Link | 🟢 Yes | Button destination |

---

### Step 2: Update the `igentx_hero` Component

1. Go to **Storyblok** → **Block Library**
2. Find and edit the `igentx_hero` component
3. Add the following fields:

#### New Fields for `igentx_hero`:

| Field Name | Display Name | Type | Options/Settings |
|------------|-------------|------|------------------|
| `slides` | Slides | Blocks | **Allow only**: `hero_slide` <br> **Translatable**: No |
| `enable_autoplay` | Enable Autoplay | Boolean | Default: `true` |
| `autoplay_delay` | Autoplay Delay (ms) | Number | Default: `5000` (5 seconds) |

> **Note**: Keep all existing fields (badge_text, headline_part1, etc.) for backward compatibility when no slides are added.

---

## JSON Schema for Import

### `hero_slide` Component Schema

```json
{
  "name": "hero_slide",
  "display_name": "Hero Slide",
  "schema": {
    "category": {
      "type": "text",
      "pos": 0,
      "display_name": "Category",
      "description": "Category or service label (e.g., 'Web Development')",
      "translatable": true,
      "required": false,
      "max_length": 50
    },
    "title": {
      "type": "text",
      "pos": 1,
      "display_name": "Title",
      "description": "Main slide title",
      "translatable": true,
      "required": true,
      "max_length": 120
    },
    "summary": {
      "type": "textarea",
      "pos": 2,
      "display_name": "Summary",
      "description": "Supporting description text",
      "translatable": true,
      "required": false,
      "max_length": 500
    },
    "featured_image": {
      "type": "asset",
      "pos": 3,
      "display_name": "Featured Image",
      "filetypes": ["images"],
      "description": "Main slide image (1200x1200px recommended)"
    },
    "quick_features": {
      "type": "text",
      "pos": 4,
      "display_name": "Quick Features",
      "description": "Add 3-5 feature bullet points (one per line or as array)",
      "translatable": true,
      "required": false,
      "allow_multiple": true
    },
    "pricing_preview": {
      "type": "text",
      "pos": 5,
      "display_name": "Pricing Preview",
      "description": "Starting price (e.g., 'AED 4,999')",
      "translatable": true,
      "required": false,
      "max_length": 50
    },
    "duration": {
      "type": "text",
      "pos": 6,
      "display_name": "Duration / Timeline",
      "description": "Project timeline (e.g., '2-3 weeks')",
      "translatable": true,
      "required": false,
      "max_length": 50
    },
    "cta_text": {
      "type": "text",
      "pos": 7,
      "display_name": "CTA Button Text",
      "description": "Button label (e.g., 'Get a Quote')",
      "translatable": true,
      "required": false,
      "max_length": 30
    },
    "cta_link": {
      "type": "multilink",
      "pos": 8,
      "display_name": "CTA Button Link",
      "description": "Button destination"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "real_name": "hero_slide"
}
```

### Updated `igentx_hero` Component (Add These Fields)

```json
{
  "slides": {
    "type": "bloks",
    "pos": 20,
    "display_name": "Slides",
    "description": "Add multiple slides for the hero carousel",
    "restrict_components": true,
    "component_whitelist": ["hero_slide"],
    "translatable": false
  },
  "enable_autoplay": {
    "type": "boolean",
    "pos": 21,
    "display_name": "Enable Autoplay",
    "description": "Automatically advance slides",
    "default_value": true
  },
  "autoplay_delay": {
    "type": "number",
    "pos": 22,
    "display_name": "Autoplay Delay (ms)",
    "description": "Time between slide transitions in milliseconds",
    "default_value": 5000
  }
}
```

---

## Usage Examples

### Example 1: Single Slide (No Carousel)

Add **1** `hero_slide` block to the `slides` field:

- Shows two-column layout with content + featured image
- No navigation buttons or pagination dots (only one slide)
- No auto-play functionality
- Content reveal animations still work

**Use Case**: Static hero for simple landing pages, service pages, or when you only need one message.

### Example 2: Multi-Slide Carousel

Add **2 or more** `hero_slide` blocks to the `slides` field:

**Slide 1:**
```
Badge: "🚀 New Feature"
Headline Part 1: "AI-Driven Web &"
Headline Part 2: "Branding Solutions"
Headline Part 3: "for Fast-Growing Businesses in the UAE"
Subheadline: "Transform your digital presence with our cutting-edge AI technology"
Featured Image: [Upload image]
Quick Features:
  - "Lightning-fast development"
  - "SEO-optimized by default"
  - "Mobile-first design"
Primary CTA: "Get Started" → /contact
Secondary CTA: "View Portfolio" → /case-studies
Trust Signals:
  - Value: "500+" Label: "Projects Delivered"
  - Value: "98%" Label: "Client Satisfaction"
```

**Slide 2:**
```
Badge: "⚡ Limited Offer"
Headline Part 1: "Premium Web Development"
Headline Part 2: "Starting at AED 4,999"
Headline Part 3: "Launch Your Business Online Today"
Subheadline: "Professional websites with modern design and powerful features"
Featured Image: [Upload image]
Quick Features:
  - "Custom design & development"
  - "Responsive on all devices"
  - "Free hosting for 1 year"
Primary CTA: "Claim Offer" → /pricing
Secondary CTA: "Learn More" → /services
Trust Signals:
  - Value: "24/7" Label: "Support"
  - Value: "100%" Label: "Money Back Guarantee"
```

---

## Slider Configuration

### Autoplay Settings

- **Enable Autoplay**: Toggle on/off in Storyblok
- **Autoplay Delay**: Set duration in milliseconds (default: 5000ms = 5 seconds)

### User Interactions

1. **Hover to Pause**: Slider pauses when user hovers over it
2. **Navigation Buttons**: Click left/right arrows to manually change slides
3. **Pagination Dots**: Click any dot to jump to a specific slide
4. **Keyboard Navigation**: Users can use arrow keys (if implemented)

---

## Design & Styling

### Layout

- **Two-column grid** on large screens (lg+)
- **Stacked layout** on mobile/tablet
- **Full-width responsive** container

### Animations

- **Slide transitions**: 700ms ease-in-out with directional awareness
- **Content reveal animations**: 
  - Badge: Fade-in-scale (0.1s delay)
  - Headline Part 1: Slide-in-left (0.2s delay)
  - Headline Part 2: Slide-in-left (0.3s delay)
  - Headline Part 3: Slide-in-left (0.4s delay)
  - Subheadline: Fade-in (0.5s delay)
  - Quick features: Reveal-up with staggered delays (0.6s+)
  - CTA buttons: Fade-in-scale (0.8s delay)
  - Trust signals: Fade-in-scale with staggered delays (1.0s+)
  - Featured image: Slide-in-right (0.4s delay)
- **Image hover effects**: 
  - Scale on hover (1.05x zoom)
  - Decorative orbs brighten on hover
  - Blurred gradient orbs with 700ms transitions
- **Button hover effects**: Scale, shadow, and icon animations

### Colors & Gradients

- **Background**: Gradient from slate-900 → blue-900 → indigo-900
- **Headline Part 2**: Gradient from blue-400 → purple-400 → pink-400
- **CTA Primary**: Gradient from blue-500 → blue-600 → purple-600
- **CTA Secondary**: White/10 with backdrop blur

---

## Accessibility

- ✅ ARIA labels on navigation buttons
- ✅ `aria-current` on active pagination dot
- ✅ Keyboard focus indicators
- ✅ Semantic HTML structure
- ✅ Alt text support for images

---

## Performance Optimization

- ✅ **Lazy loading** for non-active slides
- ✅ **Priority loading** for first slide image
- ✅ **Optimized image sizes** with Next.js Image
- ✅ **Cleanup** of intervals on unmount
- ✅ **Passive scroll listeners**

---

## Troubleshooting

### Issue: Slider not working

**Solution**: Ensure you have added at least 2 `hero_slide` blocks to the `slides` field.

### Issue: Auto-play not stopping on hover

**Solution**: Check that JavaScript is enabled and the component is in client mode (`'use client'`).

### Issue: Images not loading

**Solution**: Verify that `featured_image` fields have valid Storyblok asset URLs.

### Issue: Pagination dots overlapping content

**Solution**: Adjust the `bottom-8` class in the pagination dots container or reduce slide content height.

---

## Related Components

- **ServiceHero**: Similar two-column layout for service pages
- **TrustSignalItem**: Nested component for displaying stats
- **NavigationButtons**: Reusable for other carousels

---

## Migration from Single Hero (Breaking Change)

> ⚠️ **This is a breaking change**. The old single-hero mode has been completely removed.

If you're upgrading from the previous version with root-level hero fields:

1. **Required**: Create at least one `hero_slide` block with your content
2. **Remove**: All old root-level fields from your Storyblok schema
3. **Update**: Copy your existing content into `hero_slide` blocks
4. **Test**: Verify all pages using `igentx_hero` display correctly

See the full [Migration Guide in IGENTX_STORYBLOK_SCHEMAS.md](../IGENTX_STORYBLOK_SCHEMAS.md#migration-guide-single-hero--slider) for detailed step-by-step instructions.

---

## Best Practices

1. **Limit slides**: Use 3-5 slides maximum for best UX
2. **Consistent image sizes**: Use same aspect ratio for all featured images
3. **Concise content**: Keep headlines short and impactful
4. **Clear CTAs**: Use action-oriented button text
5. **Test on mobile**: Ensure readability on small screens

---

## Next Steps

1. Create the `hero_slide` component in Storyblok
2. Update `igentx_hero` component with new fields
3. Add 2-3 slides to your homepage
4. Test the slider functionality
5. Adjust autoplay delay as needed

For more information, refer to:
- [ServiceHero Component](../components/blocks/services/ServiceHero.tsx)
- [IGENTXHero Component](../components/blocks/IGENTXHero.tsx)
- [Type Definitions](../lib/types.ts)

