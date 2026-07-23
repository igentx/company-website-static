# Storyblok Language Integration Summary

> **Historical note:** This guide documents Storyblok Visual Editor language integration from the original CMS-powered site. The static site uses URL-path language detection only (`/ar/`, etc.) via `contexts/LanguageContext.tsx` and `content/en/` JSON files.

This document summarizes the complete Storyblok-integrated multi-language implementation.

## 🎯 Key Features Implemented

### ✅ **Storyblok Native Integration**

- Languages fetched directly from Storyblok space configuration
- Language detection via `_storyblok_lang` parameter (Visual Editor)
- No manual URL parameter management needed
- Seamless integration with Storyblok's Visual Editor

### ✅ **Static Generation for All Languages**

- Automatic generation of routes for all configured languages
- Pre-rendering: `/[lang]/` routes for each language
- SEO optimization with proper hreflang tags
- Build-time language detection from Storyblok API

### ✅ **RTL/LTR Support**

- Automatic direction detection based on language
- Arabic font integration (Noto Sans Arabic)
- CSS utilities for RTL layouts
- Dynamic HTML direction setting

### ✅ **Smart Language Switcher**

- Hidden in Visual Editor (Storyblok handles switching)
- Available on public site for language indication
- RTL-aware positioning and styling

## 🏗️ Architecture Overview

### Core Components

1. **Language Detection (`lib/language-utils.ts`)**
   - Server-side: Detects `_storyblok_lang` from headers
   - Client-side: Reads from URL parameters
   - Fallback to default language

2. **Language Configuration (`lib/languages.ts`)**
   - `getSupportedLanguages()`: Fetches from Storyblok API
   - `LANGUAGE_METADATA`: Static metadata for each language
   - RTL/LTR detection utilities

3. **Storyblok Integration (`lib/blocks.tsx`)**
   - `fetchAvailableLanguages()`: Gets languages from space
   - Updated fetch functions with language parameters
   - Fallback language support

4. **Language Context (`contexts/LanguageContext.tsx`)**
   - Manages current language state
   - Listens for Storyblok Visual Editor changes
   - Provides RTL/LTR information

### Route Structure

```
app/
├── layout.tsx                 # Root layout with language detection
├── page.tsx                   # Default language homepage
├── about/page.tsx            # Default language about page
├── [lang]/
│   ├── layout.tsx            # Language-specific layout
│   ├── page.tsx              # Language-specific homepage
│   └── about/page.tsx        # Language-specific about page
└── api/
    └── languages/route.ts    # API endpoint for languages
```

### Generated Routes (Example)

- `/` - Default language (English)
- `/en/` - English version
- `/ar/` - Arabic version
- `/es/` - Spanish version (if configured)
- `/fr/` - French version (if configured)

## 🔧 Configuration Steps

### 1. Storyblok Space Setup

```
Settings > Internationalization
- Add desired languages (en, ar, es, etc.)
- Configure field-level translations
- Enable individual publishing (optional)
```

### 2. Add Language Metadata

```typescript
// lib/languages.ts
export const LANGUAGE_METADATA = {
  en: { name: 'English', flag: '🇺🇸', direction: 'ltr' },
  ar: { name: 'العربية', flag: '🇸🇦', direction: 'rtl' },
  es: { name: 'Español', flag: '🇪🇸', direction: 'ltr' },
}
```

### 3. Build and Deploy

```bash
npm run build  # Generates all language routes
npm run start  # Serves pre-rendered pages
```

## 🔄 How It Works

### Build Time

1. `fetchAvailableLanguages()` calls Storyblok API
2. `generateStaticParams()` creates routes for each language
3. Pages pre-rendered with language-specific content
4. SEO metadata generated with hreflang tags

### Runtime (Visual Editor)

1. Storyblok adds `_storyblok_lang` parameter
2. Language context detects and updates current language
3. Content fetched with appropriate language parameter
4. UI direction (RTL/LTR) applied automatically

### Runtime (Public Site)

1. User visits language-specific route (e.g., `/ar/`)
2. Pre-rendered content served immediately
3. Language context initialized with route language
4. RTL/LTR styles applied based on language

## 🎨 Styling Features

### RTL Support

```css
/* Automatic font switching */
html[dir="rtl"] body {
  font-family: 'Noto Sans Arabic', Arial, sans-serif;
}

/* Direction-aware utilities */
.space-x-reverse
.flex-row-reverse
```

### Tailwind Classes

```tsx
className={`flex ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
```

## 📊 SEO Optimization

### Metadata Per Language

```typescript
// Automatic hreflang generation
alternates: {
  languages: {
    'x-default': '/',
    en: '/en',
    ar: '/ar',
  },
}
```

### Language-Specific Titles

```typescript
title: `Page Title - ${lang.toUpperCase()}`
```

## 🚀 Benefits

1. **Zero Configuration**: Languages auto-detected from Storyblok
2. **Performance**: All routes pre-rendered at build time
3. **SEO Optimized**: Proper hreflang and language tags
4. **Developer Experience**: No manual route management
5. **Content Management**: Full integration with Storyblok Visual Editor
6. **Accessibility**: Proper RTL/LTR support
7. **Scalability**: Easy to add new languages via Storyblok

## 🔍 Testing

### Development

```bash
npm run dev
# Visit:
# http://localhost:3001/en/
# http://localhost:3001/ar/
```

### Visual Editor

```
# Storyblok will automatically add:
# ?_storyblok_lang=ar&_storyblok=...
```

### Production Build

```bash
npm run build
npm run start
# All language routes pre-rendered and available
```

This implementation provides a production-ready, Storyblok-native multi-language solution that scales automatically with your content management needs.
