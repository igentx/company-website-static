# Hero Slider - Quick Start Guide (Slider-Only Mode)

## 🚀 Get Started in 5 Minutes

> **Note**: The IGENTX Hero is now **slider-only**. You must add at least one `hero_slide` block. This guide will help you set it up quickly.

---

## Step 1: Create the `hero_slide` Component in Storyblok

1. Go to **Storyblok** → **Block Library**
2. Click **+ New Block**
3. Fill in:
   - **Name**: `hero_slide`
   - **Display Name**: `Hero Slide`
   - **Type**: ✅ **Nestable Block**

4. Add these fields in order:

| # | Field Name | Type | Settings |
|---|------------|------|----------|
| 1 | `badge_text` | Text | Optional badge above headline |
| 2 | `headline_part1` | Text | First line of headline |
| 3 | `headline_part2` | Text | Main headline (gradient) |
| 4 | `headline_part3` | Text | Subtitle/third line |
| 5 | `subheadline` | Textarea | Description paragraph |
| 6 | `featured_image` | Asset (Images) | Main slide image |
| 7 | `quick_features` | Text | Click "Allow Multiple" ✅ |
| 8 | `primary_cta_text` | Text | Primary button text |
| 9 | `primary_cta_link` | Link | Primary button URL |
| 10 | `secondary_cta_text` | Text | Secondary button text |
| 11 | `secondary_cta_link` | Link | Secondary button URL |
| 12 | `trust_signals` | Blocks | Restrict to: `trust_signal_item` |

5. Click **Save**

---

## Step 2: Update the `igentx_hero` Component

1. Go to **Storyblok** → **Block Library**
2. Find and edit `igentx_hero`
3. Add these 3 new fields at the bottom:

| # | Field Name | Type | Settings |
|---|------------|------|----------|
| 20 | `slides` | Blocks | Restrict to: `hero_slide` only |
| 21 | `enable_autoplay` | Boolean | Default: ✅ True |
| 22 | `autoplay_delay` | Number | Default: `5000` |

4. Click **Save**

---

## Step 3: Create Your First Slider

1. Go to your homepage content in Storyblok
2. Find the `igentx_hero` component
3. Click **Add Block** in the `slides` field
4. Select **Hero Slide**

### Fill in Slide 1:

```
Badge Text: 🚀 New Feature
Headline Part 1: AI-Driven Web &
Headline Part 2: Branding Solutions
Headline Part 3: for Fast-Growing Businesses in the UAE
Subheadline: Transform your digital presence with our cutting-edge AI technology

Featured Image: [Upload an image]

Quick Features:
  - Lightning-fast development
  - SEO-optimized by default
  - Mobile-first design

Primary CTA Text: Get Started
Primary CTA Link: /contact

Secondary CTA Text: View Portfolio
Secondary CTA Link: /case-studies

Trust Signals:
  - Add trust_signal_item: Value "500+", Label "Projects"
  - Add trust_signal_item: Value "98%", Label "Satisfaction"
```

5. Click **Add Block** again to create **Slide 2**

### Fill in Slide 2:

```
Badge Text: ⚡ Limited Offer
Headline Part 1: Premium Web Development
Headline Part 2: Starting at AED 4,999
Headline Part 3: Launch Your Business Online Today
Subheadline: Professional websites with modern design and powerful features

Featured Image: [Upload an image]

Quick Features:
  - Custom design & development
  - Responsive on all devices
  - Free hosting for 1 year

Primary CTA Text: Claim Offer
Primary CTA Link: /pricing

Secondary CTA Text: Learn More
Secondary CTA Link: /services

Trust Signals:
  - Add trust_signal_item: Value "24/7", Label "Support"
  - Add trust_signal_item: Value "100%", Label "Money Back"
```

6. Save and publish

---

## Step 4: Configure Slider Settings

In your `igentx_hero` component:

- **Enable Autoplay**: ✅ On (or toggle off if you prefer manual only)
- **Autoplay Delay**: `5000` (5 seconds between slides)

Adjust the delay based on content length:
- Short content: 3000-4000ms
- Medium content: 5000-6000ms
- Long content: 7000-8000ms

---

## Step 5: Test Your Slider

1. **Preview** your page in Storyblok
2. Check that:
   - ✅ Slides auto-advance every 5 seconds
   - ✅ Pagination dots appear at the bottom
   - ✅ Navigation arrows work (Previous/Next)
   - ✅ Slider pauses when you hover over it
   - ✅ Images load correctly
   - ✅ CTAs are clickable

---

## 🎨 Design Features

Your slider now includes:

- ✅ **Smooth fade & slide transitions** (700ms duration)
- ✅ **Content reveal animations**: Staggered entrance effects for all elements
  - Badge fades in and scales (0.1s)
  - Headlines slide in from left with sequential delays (0.2-0.4s)
  - Subheadline fades in smoothly (0.5s)
  - Features reveal upward one by one (0.6s+)
  - CTAs scale in together (0.8s)
  - Trust signals animate with staggered timing (1.0s+)
  - Featured image slides in from right (0.4s)
- ✅ **Two-column layout**: Content left, Image right
- ✅ **Responsive design**: Stacks on mobile
- ✅ **Gradient headlines**: Blue → Purple → Pink
- ✅ **Glassmorphism effects**: Backdrop blur on buttons
- ✅ **Image hover effects**: Zoom on hover (1.05x) with glowing orbs
- ✅ **Hover effects**: Pause slider, scale buttons, icon movements
- ✅ **Accessibility**: ARIA labels, keyboard support

---

## 📱 Mobile Optimization

The slider automatically:
- Stacks content vertically on small screens
- Reduces font sizes responsively
- Makes navigation buttons smaller on mobile
- Ensures touch-friendly pagination dots

---

## 🔄 Single Slide vs. Multiple Slides

### Single Slide Mode
Add **1** `hero_slide` block:
- Shows two-column layout with content + image
- No navigation buttons or pagination dots
- No auto-play (only one slide)
- Still uses smooth content reveal animations

### Multi-Slide Mode (Carousel)
Add **2 or more** `hero_slide` blocks:
- Activates full carousel functionality
- Shows navigation buttons (Previous/Next)
- Shows pagination dots
- Auto-play enabled (configurable)
- Smooth transitions between slides

---

## ⚙️ Advanced Customization

### Change Transition Speed

Edit `IGENTXHero.tsx`:

```typescript
// Line ~268
className={`absolute inset-0 w-full transition-all duration-700 ease-in-out ...`}
                                                      ^^^
// Change 700 to 500 for faster, 1000 for slower
```

### Customize Animation Delays

Edit animation delays in `IGENTXHero.tsx`:

```typescript
// Badge animation (Line ~285)
style={{ animationDelay: isActive ? '0.1s' : '0s' }}
                                      ^^^
// Adjust timing: 0.05s for faster, 0.2s for slower

// Headline animations (Lines ~299, 309, 319)
style={{ animationDelay: isActive ? '0.2s' : '0s' }}  // Part 1
style={{ animationDelay: isActive ? '0.3s' : '0s' }}  // Part 2
style={{ animationDelay: isActive ? '0.4s' : '0s' }}  // Part 3

// Quick features staggered (Line ~347)
style={{ animationDelay: isActive ? `${0.6 + idx * 0.1}s` : '0s' }}
                                              ^^^
// idx * 0.1 creates 0.1s gap between each item
// Change to idx * 0.05 for faster sequence
```

### Change Animation Types

Available animations in `globals.css`:
- `animate-slide-in-left` - Slides from left
- `animate-slide-in-right` - Slides from right
- `animate-fade-in-scale` - Fades in with scale
- `animate-reveal-up` - Slides up with fade
- `animate-fade-in` - Simple fade in

Example: Change headline to fade instead of slide:
```typescript
className={`block mb-3 text-white/95 ${
  isActive ? 'animate-fade-in opacity-100' : 'opacity-0'
}`}

### Disable Auto-play Globally

Set default in component:

```typescript
// Line ~23
const enableAutoplay = blok.enable_autoplay !== false
                                               ^^^^^
// Change to: blok.enable_autoplay === true (opt-in)
```

### Change Slide Direction

Edit `IGENTXHero.tsx`:

```typescript
// Line ~271-274
slideDirection === 'next'
  ? 'opacity-0 -translate-x-full z-0'
  : 'opacity-0 translate-x-full z-0'

// Swap these for right-to-left animation
```

---

## 🐛 Troubleshooting

### Problem: Slider not appearing

**Solution**: 
- Ensure you have **at least 2 slides** added
- Check that `hero_slide` component is created in Storyblok
- Verify `slides` field allows `hero_slide` blocks

### Problem: Auto-play not working

**Solution**:
- Check `enable_autoplay` is set to **true**
- Verify `autoplay_delay` is a positive number (e.g., 5000)
- Clear browser cache and refresh

### Problem: Images not loading

**Solution**:
- Ensure images are uploaded to Storyblok
- Check `featured_image` field has a valid asset
- Verify Next.js image domains in `next.config.ts`

### Problem: Navigation buttons not visible

**Solution**:
- Add at least 2 slides (buttons only show with multiple slides)
- Check z-index isn't conflicting with other elements
- Ensure slider container isn't too narrow

---

## 📊 Best Practices

1. **Optimal number of slides**: 3-5 slides
2. **Image dimensions**: Use 1:1 aspect ratio (e.g., 1200x1200px)
3. **Headline length**: Keep under 10 words per line
4. **Quick features**: Limit to 3-5 items per slide
5. **CTA clarity**: Use action verbs (Get, Start, Learn, Claim)
6. **Consistent timing**: Use same delay for all sliders on site

---

## 🎯 What's Next?

- **Add more slides**: Create seasonal promotions, feature highlights
- **A/B testing**: Try different headlines and CTAs
- **Analytics**: Track which slides get more clicks
- **Animations**: Customize transition effects
- **Themes**: Adjust colors for special events

---

## 📚 Related Documentation

- [Full Hero Slider Schema Guide](./HERO_SLIDER_SCHEMA.md)
- [JSON Schema for Import](./HERO_SLIDER_SCHEMA.json)
- [ServiceHero Component](../../components/blocks/services/ServiceHero.tsx)
- [Type Definitions](../../lib/types.ts)

---

## 🆘 Need Help?

If you encounter issues:
1. Check the [Troubleshooting](#-troubleshooting) section above
2. Review the [Full Schema Guide](./HERO_SLIDER_SCHEMA.md)
3. Inspect browser console for errors
4. Verify all fields are correctly configured in Storyblok

---

**Congratulations!** 🎉 You now have a professional, smooth hero slider with auto-play, pagination, and navigation buttons!

