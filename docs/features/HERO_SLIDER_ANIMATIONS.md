# Hero Slider - Content Reveal Animations

## Overview

The IGENTX Hero Slider features sophisticated content reveal animations that create a premium, polished user experience. Each element animates in with carefully timed delays for a choreographed entrance effect.

---

## Animation Timeline

When a slide becomes active, elements reveal in this sequence:

| Element | Animation Type | Delay | Duration | Effect |
|---------|---------------|-------|----------|--------|
| Badge | Fade-in-scale | 0.1s | 0.5s | Fades in + scales from 90% to 100% |
| Headline Part 1 | Slide-in-left | 0.2s | 0.6s | Slides from left with fade |
| Headline Part 2 | Slide-in-left | 0.3s | 0.6s | Slides from left with fade |
| Headline Part 3 | Slide-in-left | 0.4s | 0.6s | Slides from left with fade |
| Featured Image | Slide-in-right | 0.4s | 0.6s | Slides from right with fade |
| Subheadline | Fade-in | 0.5s | 0.4s | Simple opacity fade |
| Feature 1 | Reveal-up | 0.6s | 0.5s | Slides up 20px with fade |
| Feature 2 | Reveal-up | 0.7s | 0.5s | Slides up 20px with fade |
| Feature 3 | Reveal-up | 0.8s | 0.5s | Slides up 20px with fade |
| CTA Buttons | Fade-in-scale | 0.8s | 0.5s | Fades in + scales |
| Trust Signal 1 | Fade-in-scale | 1.0s | 0.5s | Fades in + scales |
| Trust Signal 2 | Fade-in-scale | 1.1s | 0.5s | Fades in + scales |
| Trust Signal 3 | Fade-in-scale | 1.2s | 0.5s | Fades in + scales |
| Trust Signal 4 | Fade-in-scale | 1.3s | 0.5s | Fades in + scales |

**Total animation sequence**: ~1.5 seconds from start to finish

---

## Animation Types

### 1. Slide-in-left

**Usage**: Headlines, text content from left column

**Effect**: 
- Starts 40px to the left
- Fades from 0 to 100% opacity
- Slides to final position

**Code**:
```css
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**Applied to**:
- Headline Part 1
- Headline Part 2 (gradient)
- Headline Part 3

---

### 2. Slide-in-right

**Usage**: Featured images, content from right column

**Effect**:
- Starts 40px to the right
- Fades from 0 to 100% opacity
- Slides to final position

**Code**:
```css
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**Applied to**:
- Featured image container

---

### 3. Fade-in-scale

**Usage**: Badges, buttons, trust signals

**Effect**:
- Starts at 90% scale
- Fades from 0 to 100% opacity
- Grows to 100% scale

**Code**:
```css
@keyframes fade-in-scale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

**Applied to**:
- Badge text
- CTA button container
- Trust signal cards

---

### 4. Reveal-up

**Usage**: Quick features list items

**Effect**:
- Starts 20px below final position
- Fades from 0 to 100% opacity
- Slides upward to final position

**Code**:
```css
@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Applied to**:
- Each quick feature item (staggered)

---

### 5. Fade-in

**Usage**: Subheadline, simple content

**Effect**:
- Simple opacity transition
- No movement or scale

**Code**:
```css
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

**Applied to**:
- Subheadline paragraph

---

## Implementation Details

### Conditional Animation Classes

Animations only trigger when a slide is **active**:

```typescript
className={`block mb-3 text-white/95 ${
  isActive ? 'animate-slide-in-left opacity-100' : 'opacity-0'
}`}
```

- **Active slide**: Animation class + `opacity-100`
- **Inactive slide**: No animation + `opacity-0`

### Dynamic Animation Delays

```typescript
style={{ animationDelay: isActive ? '0.2s' : '0s' }}
```

- **Active**: Uses specified delay
- **Inactive**: No delay (instant hide)

### Staggered Animations

For list items (quick features, trust signals):

```typescript
style={{ animationDelay: isActive ? `${0.6 + idx * 0.1}s` : '0s' }}
```

- **Item 0**: 0.6s delay
- **Item 1**: 0.7s delay
- **Item 2**: 0.8s delay
- Creates cascading effect

---

## Hover Effects

### Image Hover

```typescript
className="object-cover transition-transform duration-700 group-hover:scale-105"
```

**Effect**: 5% zoom on hover over 700ms

### Decorative Orbs

```typescript
className="... transition-opacity duration-700 group-hover:opacity-30"
```

**Effect**: Brightness increases from 20% to 30% opacity

### Button Hover

```typescript
className="... transform hover:scale-105"
```

**Effect**: 5% scale increase on hover

---

## Customization Guide

### Adjust Animation Speed

**Make animations faster**:
```typescript
// Change duration in globals.css
.animate-slide-in-left {
  animation: slide-in-left 0.4s ease-out forwards;  // was 0.6s
}
```

**Make animations slower**:
```typescript
.animate-slide-in-left {
  animation: slide-in-left 0.8s ease-out forwards;  // was 0.6s
}
```

### Adjust Animation Delays

**Faster sequence** (elements appear quicker):
```typescript
// In IGENTXHero.tsx
style={{ animationDelay: isActive ? '0.05s' : '0s' }}  // was 0.1s
style={{ animationDelay: isActive ? '0.1s' : '0s' }}   // was 0.2s
style={{ animationDelay: isActive ? '0.15s' : '0s' }}  // was 0.3s
```

**Slower sequence** (more dramatic):
```typescript
style={{ animationDelay: isActive ? '0.2s' : '0s' }}   // was 0.1s
style={{ animationDelay: isActive ? '0.4s' : '0s' }}   // was 0.2s
style={{ animationDelay: isActive ? '0.6s' : '0s' }}   // was 0.3s
```

### Change Stagger Timing

**Quick features** - Reduce gap between items:
```typescript
// Was: 0.1s gap
style={{ animationDelay: isActive ? `${0.6 + idx * 0.1}s` : '0s' }}

// Faster: 0.05s gap
style={{ animationDelay: isActive ? `${0.6 + idx * 0.05}s` : '0s' }}

// Slower: 0.15s gap
style={{ animationDelay: isActive ? `${0.6 + idx * 0.15}s` : '0s' }}
```

### Mix and Match Animations

**Example**: Change image to fade instead of slide:
```typescript
// Original
className={`relative ${
  isActive ? 'animate-slide-in-right opacity-100' : 'opacity-0'
}`}

// Changed to fade-in-scale
className={`relative ${
  isActive ? 'animate-fade-in-scale opacity-100' : 'opacity-0'
}`}
```

---

## Performance Considerations

### GPU Acceleration

All animations use GPU-accelerated properties:
- ✅ `opacity`
- ✅ `transform` (translate, scale)
- ❌ Avoid `width`, `height`, `top`, `left`

### Animation Cleanup

Animations are CSS-based and automatically clean up when:
- Slide becomes inactive
- Component unmounts
- Slide changes

No JavaScript intervals or timeouts for animations = Better performance!

### Reducing Motion

For users with motion sensitivity, add this to `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-slide-in-left,
  .animate-slide-in-right,
  .animate-fade-in-scale,
  .animate-reveal-up,
  .animate-fade-in {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## Best Practices

### 1. Don't Over-Animate

✅ **Good**: Staggered animations with purpose
```typescript
// Headlines flow naturally
Badge (0.1s) → H1 Part1 (0.2s) → H1 Part2 (0.3s) → H1 Part3 (0.4s)
```

❌ **Bad**: Everything animates at once or too many effects
```typescript
// Overwhelming
Badge (0s) + H1 (0s) + Image (0s) + Buttons (0s) = Visual chaos
```

### 2. Keep Total Duration Under 2 Seconds

Users should see full slide content within 2 seconds. Current implementation: ~1.5s total.

### 3. Match Animation Direction to Content Flow

- Left column content: Slide from left
- Right column content: Slide from right
- Call-to-action elements: Scale for emphasis

### 4. Use Consistent Easing

All animations use `ease-out` for natural deceleration.

---

## Troubleshooting

### Issue: Animations not playing

**Check**:
1. Is slide marked as `isActive`?
2. Are animation classes applied correctly?
3. Is `opacity-0` class present when inactive?

### Issue: Animations playing on page load for all slides

**Solution**: Ensure only active slide has animations:
```typescript
className={`${isActive ? 'animate-slide-in-left' : ''}`}
```

### Issue: Stagger effect not working

**Check**: Animation delay calculation:
```typescript
// Make sure idx is the array index
{items.map((item, idx) => (
  <div style={{ animationDelay: `${0.6 + idx * 0.1}s` }}>
))}
```

### Issue: Animations feel sluggish

**Solution**: Reduce durations in `globals.css`:
```css
.animate-slide-in-left {
  animation: slide-in-left 0.4s ease-out forwards;  /* was 0.6s */
}
```

---

## Animation Showcase

### Example 1: Quick & Snappy

```typescript
// Fast, modern feel
Badge: 0.05s delay, 0.3s duration
Headlines: 0.1s, 0.15s, 0.2s delays
Features: 0.3s start, 0.05s stagger
```

### Example 2: Elegant & Smooth (Default)

```typescript
// Current implementation
Badge: 0.1s delay, 0.5s duration
Headlines: 0.2s, 0.3s, 0.4s delays
Features: 0.6s start, 0.1s stagger
```

### Example 3: Dramatic & Impactful

```typescript
// Slow, luxurious feel
Badge: 0.2s delay, 0.7s duration
Headlines: 0.4s, 0.6s, 0.8s delays
Features: 1.0s start, 0.2s stagger
```

---

## Related Files

- **Animations**: `/app/globals.css` (Lines 158-215)
- **Component**: `/components/blocks/IGENTXHero.tsx`
- **Schema**: `/docs/features/HERO_SLIDER_SCHEMA.md`
- **Quick Start**: `/docs/features/HERO_SLIDER_QUICKSTART.md`

---

## Summary

The hero slider animations create a professional, engaging experience through:

1. **Staggered timing** - Elements reveal in logical order
2. **Directional awareness** - Content flows from expected directions
3. **Performance** - GPU-accelerated transforms
4. **Flexibility** - Easy to customize timing and effects
5. **Accessibility** - Respects user motion preferences

Total implementation: **5 animation types**, **~15 animated elements per slide**, **1.5s total sequence**.

