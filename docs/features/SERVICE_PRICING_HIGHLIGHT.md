# Service Pricing Tier Highlight Feature

## Overview
The pricing tier highlight feature allows you to mark specific pricing options as "Most Popular", "Recommended", or with a custom badge. Highlighted tiers stand out visually to guide users toward the best option for them.

## Visual Design

### Highlighted Tier
```
        ┌─────────────────────┐
        │ ⭐ Most Popular    │  ← Badge with gradient
        ├─────────────────────┤
        │                     │
        │   PROFESSIONAL      │  ← Larger, elevated card
        │                     │
        │   AED 5,000         │  ← Blue border
        │   /month            │  ← Scale: 105%
        │                     │  ← Shadow: 2xl
        │   ✓ Feature 1       │
        │   ✓ Feature 2       │
        │                     │
        └─────────────────────┘
```

### Normal Tier
```
        ┌─────────────────────┐
        │                     │  ← No badge
        │   BASIC             │  ← Normal size
        │                     │
        │   AED 2,500         │  ← Gray border
        │   /month            │  ← Scale: 100%
        │                     │
        │   ✓ Feature 1       │
        │   ✓ Feature 2       │
        │                     │
        └─────────────────────┘
```

## TypeScript Types

```typescript
export interface ServicePricingTier {
  name: string
  price: string
  currency?: string
  duration?: string
  description?: string
  features?: string | string[]
  is_popular?: boolean          // Mark as "Most Popular"
  is_recommended?: boolean      // Mark as "Recommended"
  highlight_badge?: string      // Custom badge text
}
```

## Storyblok Schema

Add these fields to your `pricing_tiers` nested schema:

```json
{
  "is_popular": {
    "type": "boolean",
    "display_name": "Mark as Most Popular",
    "description": "Highlight this tier with a 'Most Popular' badge",
    "default_value": false
  },
  "is_recommended": {
    "type": "boolean",
    "display_name": "Mark as Recommended",
    "description": "Highlight this tier with a 'Recommended' badge",
    "default_value": false
  },
  "highlight_badge": {
    "type": "text",
    "display_name": "Custom Badge Text",
    "description": "Custom badge text (overrides Most Popular/Recommended)",
    "max_length": 30
  }
}
```

## Priority Order

The badge text is determined in this order:

1. **Custom Badge** (`highlight_badge`) - Highest priority
2. **Most Popular** (`is_popular`) - If `highlight_badge` is empty
3. **Recommended** (`is_recommended`) - If both above are false

**Example:**
```typescript
// Shows "Best Value"
{ is_popular: true, highlight_badge: "Best Value" }

// Shows "Most Popular"
{ is_popular: true, highlight_badge: "" }

// Shows "Recommended"
{ is_popular: false, is_recommended: true }

// No badge
{ is_popular: false, is_recommended: false }
```

## Visual Effects

### Highlighted Tier Gets:
1. **Badge** - Gradient background (blue to purple)
2. **Star Icon** - Next to badge text
3. **Larger Size** - 5% scale increase (`scale-105`)
4. **Blue Border** - `border-blue-600` instead of gray
5. **Enhanced Shadow** - `shadow-2xl` for elevation
6. **Higher Z-Index** - `z-10` to appear above others

### Normal Tier Gets:
1. **No Badge** - Clean, minimal design
2. **Gray Border** - `border-gray-200`
3. **Normal Size** - `scale-100`
4. **Hover Effects** - Blue border and shadow on hover

## Usage Examples

### Example 1: Most Popular (Common)
```json
{
  "name": "Professional",
  "price": "AED 5,000",
  "currency": "AED",
  "duration": "/month",
  "description": "Perfect for growing businesses",
  "features": "Feature 1\nFeature 2\nFeature 3",
  "is_popular": true
}
```

**Result:** Shows "Most Popular" badge with blue gradient

### Example 2: Recommended
```json
{
  "name": "Enterprise",
  "price": "AED 10,000",
  "currency": "AED",
  "duration": "/month",
  "is_recommended": true
}
```

**Result:** Shows "Recommended" badge

### Example 3: Custom Badge
```json
{
  "name": "Starter",
  "price": "AED 2,500",
  "currency": "AED",
  "duration": "/month",
  "highlight_badge": "Best Value"
}
```

**Result:** Shows "Best Value" badge

### Example 4: Limited Time Offer
```json
{
  "name": "Premium",
  "price": "AED 7,500",
  "currency": "AED",
  "duration": "/month",
  "highlight_badge": "50% OFF 🔥"
}
```

**Result:** Shows "50% OFF 🔥" badge

## Best Practices

### 1. **Highlight Only One Tier**
- Mark only ONE tier as popular/recommended per service
- Multiple highlights reduce their effectiveness
- Exception: Different badge types (e.g., "Popular" and "New")

### 2. **Choose the Right Badge**
- **"Most Popular"** - For the tier most customers choose
- **"Recommended"** - For the tier you want to promote
- **Custom** - For special offers or unique value props

### 3. **Badge Text Guidelines**
- Keep it short: 1-3 words maximum
- Use action words: "Best Value", "Top Choice"
- Add urgency: "Limited Offer", "New"
- Use emojis sparingly: "Hot Deal 🔥"

### 4. **Strategic Placement**
- Usually highlight the middle-tier option
- Anchor pricing: Show basic, then highlight professional
- Guide users to your target conversion tier

## CSS Classes Used

```css
/* Highlighted Card */
.border-blue-600      /* Blue border */
.shadow-2xl           /* Extra large shadow */
.scale-105            /* 5% larger */
.z-10                 /* Above other cards */

/* Badge */
.bg-gradient-to-r     /* Gradient background */
.from-blue-600        /* Start color */
.to-purple-600        /* End color */
.rounded-full         /* Pill shape */
.shadow-lg            /* Badge shadow */

/* Badge Icon */
.w-4 h-4              /* Star icon size */
.mr-1.5               /* Spacing */
```

## Customization Options

### Change Badge Colors
Modify the gradient in `ServiceDetail.tsx`:

```tsx
// Current: Blue to Purple
className="bg-gradient-to-r from-blue-600 to-purple-600"

// Alternative: Green to Teal (eco-friendly)
className="bg-gradient-to-r from-green-600 to-teal-600"

// Alternative: Orange to Red (urgent/hot)
className="bg-gradient-to-r from-orange-600 to-red-600"

// Alternative: Gold to Yellow (premium)
className="bg-gradient-to-r from-yellow-600 to-amber-600"
```

### Change Badge Icon
Replace the star icon with another:

```tsx
// Current: Star
<path d="M9.049 2.927c.3-.921..." />

// Crown (premium)
<path d="M5 3v4M3 5v2M21 5v2M19 3v4M13 11l-4-4-4 4v8h16v-8l-4-4-4 4z" />

// Trophy (winner)
<path d="M5 3v4M3 5v2M6 17h12M8 21h8M13 3h2a2 2 0 012 2v2l-1 4h-6l-1-4V5a2 2 0 012-2z" />

// Fire (hot deal)
<path d="M12 2C8.134 2 5 5.134 5 9c0 1.662.577 3.186 1.54 4.39.96 1.203 2.226 2.121 3.46 2.61v-2.5c-1.5-1-2-2.5-2-4.5 0-2.21 1.79-4 4-4s4 1.79 4 4c0 2-0.5 3.5-2 4.5V16c1.234-.489 2.5-1.407 3.46-2.61C18.423 12.186 19 10.662 19 9c0-3.866-3.134-7-7-7z" />
```

### Adjust Card Scaling
Change how much the highlighted card grows:

```tsx
// Current: 5% larger
className="scale-105"

// Subtle: 3% larger
className="scale-103"

// Prominent: 10% larger
className="scale-110"

// Same size
className="scale-100" // Remove scaling
```

## A/B Testing Suggestions

Test different approaches to find what converts best:

1. **Badge Text**
   - A: "Most Popular"
   - B: "Best Value"
   - C: "Top Choice"

2. **Badge Position**
   - A: Top center (current)
   - B: Top right corner
   - C: Inside card at top

3. **Visual Intensity**
   - A: Subtle (scale-103, light border)
   - B: Medium (scale-105, blue border) ← Current
   - C: Bold (scale-110, animated gradient)

4. **Number of Highlights**
   - A: One tier highlighted
   - B: Two tiers with different badges
   - C: No highlights (control)

## Analytics

Track these metrics to measure effectiveness:

- **Click-through rate** on highlighted vs. non-highlighted tiers
- **Conversion rate** for each tier
- **Time to decision** (how long before selecting)
- **Abandonment rate** by tier

## Migration Guide

If you have existing pricing tiers without highlights:

### Step 1: Add Fields to Storyblok
Add the three new fields to your pricing tier schema

### Step 2: Update Existing Content
1. Open each service in Storyblok
2. Edit the pricing tier you want to highlight
3. Check "Mark as Most Popular" or add custom badge
4. Save and publish

### Step 3: Test
- Verify the badge appears correctly
- Check on mobile and desktop
- Ensure only one tier is highlighted per service

## Troubleshooting

### Badge Not Showing
**Check:**
1. ✅ Field is set to `true` in Storyblok
2. ✅ Component has been published (not just saved)
3. ✅ Browser cache cleared
4. ✅ `pricing_tiers` array exists and has items

### Multiple Tiers Highlighted
**Solution:**
- Only set one tier as popular/recommended
- Use custom badges for secondary highlights

### Badge Text Too Long
**Solution:**
- Keep badges under 20 characters
- Use abbreviations: "Most Popular" → "Popular"
- Remove unnecessary words

### Card Not Scaling Properly
**Solution:**
- Check for conflicting CSS
- Ensure parent has space for scaled cards
- Add `overflow-visible` to parent if needed

## Future Enhancements

Potential improvements:

1. **Animation** - Subtle pulse or glow effect
2. **Countdown Timer** - For limited-time offers
3. **Savings Calculator** - Show how much they save
4. **Comparison Mode** - Side-by-side feature comparison
5. **User Reviews** - Show rating next to popular tiers
6. **Dynamic Pricing** - A/B test different prices

---

**Version**: 1.0.0
**Last Updated**: October 26, 2025
**Component**: `ServiceDetail.tsx`

