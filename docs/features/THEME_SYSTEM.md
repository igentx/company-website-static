# Client-Specific Theme System

This documentation explains how to configure and customize the theme system for different clients. The theme is configured by **modifying the hardcoded values** in `lib/theme-config.ts` - no environment variables or runtime switching needed.

## Overview

The theme system provides:

- ✅ Primary, secondary, and tertiary color palettes
- ✅ Primary and secondary fonts with Arabic support
- ✅ Status colors (success, warning, error, info)
- ✅ **Direct configuration via code changes**
- ✅ **SEO-friendly server-side rendering**
- ✅ CSS custom properties integration
- ✅ TypeScript support
- ✅ React hooks for theme access

## Quick Start

### 1. Configure Theme for Client

Edit the values directly in `lib/theme-config.ts`:

```tsx
// lib/theme-config.ts
export const theme: Theme = {
  colors: {
    primary: {
      500: '#3b82f6', // Change this to your client's primary color
      // ... other shades
    },
    // ... other colors
  },
  fonts: {
    primary: {
      family: ['Inter', 'system-ui', 'sans-serif'], // Change to client's font
      // ... other font config
    },
    // ... other fonts
  },
}
```

### 2. Basic Usage in Components

```tsx
// Use theme colors in Tailwind classes
<div className="bg-primary text-white">
  <h1 className="font-primary text-2xl">Primary heading</h1>
  <p className="font-secondary text-secondary">Secondary text</p>
</div>

// Use different color shades
<button className="bg-primary-600 hover:bg-primary-700 text-white">
  Click me
</button>
```

### 3. Using the Theme Context (Optional)

```tsx
import { useTheme } from '@/contexts/ThemeContext'

export default function MyComponent() {
  const { theme } = useTheme()

  return (
    <div>
      <p>Primary color: {theme.colors.primary[500]}</p>
      <p>Primary font: {theme.fonts.primary.family[0]}</p>
    </div>
  )
}
```

### 4. Layout Setup

Add the ThemeProvider to your root layout:

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/contexts/ThemeContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

## Theme Configuration

The theme is configured in `lib/theme-config.ts`. This single file contains all the customizable values:

### Current Default Configuration

- **Primary**: Blue palette (#3b82f6)
- **Secondary**: Slate palette (#64748b)
- **Tertiary**: Purple palette (#d946ef)
- **Fonts**: Inter (primary), Roboto (secondary)
- **Use case**: Modern applications, SaaS products

// Change fonts to creative typefaces
fonts: {
primary: {
family: ['Poppins', 'system-ui', 'sans-serif'],
},
secondary: {
family: ['Nunito', 'Arial', 'sans-serif'],
},
}

````

## Color System

Each theme includes these color categories:

### Primary Colors

```tsx
// Available shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
<div className="bg-primary-500">Primary color</div>
<div className="bg-primary">Default primary (same as 500)</div>
````

### Secondary Colors

```tsx
<div className="bg-secondary-500">Secondary color</div>
<div className="text-secondary-700">Secondary text</div>
```

### Tertiary Colors

```tsx
<div className="bg-tertiary-500">Tertiary color</div>
<div className="border-tertiary-300">Tertiary border</div>
```

### Status Colors

```tsx
<div className="bg-success">Success message</div>
<div className="bg-warning">Warning message</div>
<div className="bg-error">Error message</div>
<div className="bg-info">Info message</div>
```

### Neutral Colors

```tsx
<div className="bg-neutral-100">Light background</div>
<div className="text-neutral-700">Dark text</div>
```

## Font System

### Primary Font (Headings)

```tsx
<h1 className="font-primary text-3xl font-bold">Main Heading</h1>
```

### Secondary Font (Body Text)

```tsx
<p className="font-secondary">Body text content</p>
```

### Monospace Font (Code)

```tsx
<code className="font-mono">console.log('Hello')</code>
```

### Arabic Font (RTL Support)

```tsx
<p className="font-arabic" dir="rtl">
  النص العربي
</p>
```

## Creating Custom Themes

### 1. Define Your Theme

Create a new theme in `lib/theme-config.ts`:

```tsx
export const customTheme: Theme = {
  name: 'custom',
  colors: {
    primary: {
      50: '#fef7ff',
      100: '#fdeeff',
      // ... add all shades 50-950
      500: '#a855f7', // Main color
      // ...
    },
    // ... define all color categories
  },
  fonts: {
    primary: {
      family: ['Your Font', 'system-ui', 'sans-serif'],
      weights: [400, 500, 600, 700],
      variable: '--font-primary',
    },
    // ... define all font categories
  },
}
```

### 2. Update Font Imports

Add new fonts to `app/globals.css`:

```css
/* Import your custom fonts */
@import url('https://fonts.googleapis.com/css2?family=Your+Custom+Font:wght@300;400;500;600;700&display=swap');
```

### 3. Generate Color Palette

Use tools like [uicolors.app](https://uicolors.app/create) to generate the full color palette from your client's brand color.

## Client Deployment Workflow

### For Different Client Types

#### 1. Tech Startup

- Keep current blue primary colors
- Use Inter/Roboto fonts
- Maintain modern, clean aesthetic

#### 2. Corporate Client

- Change primary to professional blue (#0ea5e9)
- Switch to Source Sans Pro/Open Sans fonts
- Adjust tertiary colors for conservative palette

#### 3. Creative Agency

- Change primary to vibrant color (#ec4899)
- Switch to Poppins/Nunito fonts
- Use bold, creative color combinations

### Deployment Process

1. **Configure Theme**: Edit `lib/theme-config.ts` with client values
2. **Update Fonts**: Add font imports to `globals.css` if needed
3. **Test Colors**: Verify contrast ratios and accessibility
4. **Build & Deploy**: Standard Next.js deployment process

## Advanced Usage

### Programmatic Theme Access

```tsx
import { getCurrentTheme, getThemeColor, getThemeFont } from '@/lib/theme-utils'

const theme = getCurrentTheme()
const primaryColor = getThemeColor('primary', 500)
const primaryFont = getThemeFont('primary')
```

### Theme-Aware Utility Classes

```tsx
import { themeClasses } from '@/lib/theme-utils'

// Use predefined theme-aware classes
;<button className={themeClasses.primary.bg}>Primary Button</button>
```

### Dynamic CSS Custom Properties

```tsx
import { generateThemeCSS } from '@/lib/theme-utils'

// Generate CSS for a specific theme
const css = generateThemeCSS(corporateTheme)
```

## Best Practices

### 1. Consistent Color Usage

- Use `primary` for main actions and branding
- Use `secondary` for supporting elements
- Use `tertiary` for accents and highlights
- Use status colors appropriately

### 2. Font Hierarchy

- Use `font-primary` for headings and important text
- Use `font-secondary` for body text and general content
- Use `font-mono` for code and technical content
- Use `font-arabic` for RTL languages

### 3. Theme Testing

Test your components with different theme configurations:

```tsx
// Test by temporarily changing values in lib/theme-config.ts
// 1. Change primary colors
// 2. Run: npm run dev
// 3. Verify all components look correct
// 4. Test accessibility with new colors
```

### 4. Accessibility

- Ensure sufficient color contrast ratios
- Test with high contrast mode
- Provide alternative text for color-coded information

## SEO Benefits

This theme system is optimized for SEO because:

1. **Server-Side Rendering**: Theme classes are applied on the server, ensuring consistent styling during first paint
2. **No JavaScript Dependencies**: Themes work without JavaScript, improving Core Web Vitals
3. **Static CSS**: All theme styles are pre-compiled in CSS, reducing runtime overhead
4. **Consistent HTML Structure**: No layout shifts from theme switching

## Migration Guide

### From Existing Tailwind Setup

1. Replace hardcoded colors with theme colors:

   ```tsx
   // Before
   <div className="bg-blue-500">

   // After
   <div className="bg-primary">
   ```

2. Replace font classes:

   ```tsx
   // Before
   <h1 className="font-sans">

   // After
   <h1 className="font-primary">
   ```

3. Add ThemeProvider to your app
4. Set environment variable for client theme
5. Update any custom CSS to use CSS custom properties

## Deployment Guide

### Environment Configuration

Set the theme in your deployment environment:

**Vercel:**

```
NEXT_PUBLIC_THEME=corporate
```

**Netlify:**

```
NEXT_PUBLIC_THEME=creative
```

**Docker/Server:**

```dockerfile
ENV NEXT_PUBLIC_THEME=default
```

### Version Control Strategy

For managing different client configurations:

```bash
# Option 1: Separate branches per client
git checkout -b client-corporate
# Edit theme-config.ts for corporate client
git commit -m "Configure theme for corporate client"

# Option 2: Use configuration files
# Create client-specific config files and import them
```

## Troubleshooting

### Theme Not Applying

1. Check if you saved changes in `lib/theme-config.ts`
2. Restart development server after theme changes
3. Clear browser cache and rebuild
4. Verify Tailwind includes new color classes

### Colors Not Showing

1. Check Tailwind build includes new color classes
2. Verify CSS custom properties are defined
3. Clear browser cache and rebuild
4. Check browser developer tools for CSS loading

### Fonts Not Loading

1. Check Google Fonts imports in globals.css
2. Verify font family names are correct
3. Test font loading in network tab
4. Ensure fonts are not blocked by CSP

## Support

For questions or issues with the theme system:

1. Check this documentation
2. Review theme configuration files
3. Test with different themes
4. Check browser console for errors
