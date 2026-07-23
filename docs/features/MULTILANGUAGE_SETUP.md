# Multi-Language Setup Guide

> **Static site note:** Runtime language switching uses URL paths and `content/` JSON files. Storyblok field-level translation and Visual Editor language switching described below are historical; see `contexts/LanguageContext.tsx` and `lib/languages.ts` for the current implementation.

This guide explains how to set up and use the multi-language feature in your Next.js Storyblok project.

## Overview

The project implements Storyblok's **field-level translation** approach with **automatic language detection**, which allows you to:

- Fetch available languages directly from Storyblok space configuration
- Automatic pre-rendering of all language versions
- Support both LTR and RTL languages (including Arabic)
- Language switching through Storyblok's Visual Editor
- No URL parameters needed - handled by Storyblok internally

## Storyblok Configuration

### 1. Enable Internationalization in Storyblok

1. Log into your Storyblok space
2. Go to **Settings** > **Internationalization**
3. Add your desired languages (e.g., English, Arabic)
4. Configure language codes (e.g., `en`, `ar`)

### 2. Configure Translatable Fields

1. Go to **Block Library** in your Storyblok space
2. Select a component (e.g., Hero, Features)
3. For each field you want to translate:
   - Click on the field
   - Check the **"Translatable"** option
   - Save the field

**Note:** Blocks fields are not translatable by design.

### 3. Enable Individual Translation Publishing (Optional)

In **Settings** > **Internationalization**:

- Check **"Enable Individual Translation Publishing"** to publish language versions independently
- Leave unchecked to publish all language versions simultaneously

## Supported Languages

The project **automatically detects and supports** all languages configured in your Storyblok space.

Language metadata is stored in `lib/languages.ts` and includes:

- **English (en)** - Default language, LTR
- **Arabic (ar)** - RTL language with Arabic font support
- **Spanish (es)** - LTR language
- **French (fr)** - LTR language
- **German (de)** - LTR language

### Adding More Languages

To add more languages:

1. **Add the language in Storyblok space** (Settings > Internationalization)
2. **Add language metadata** in `lib/languages.ts`:

```typescript
export const LANGUAGE_METADATA: Record<string, Omit<Language, 'code'>> = {
  // Add your new language metadata here
  it: {
    name: 'Italiano',
    flag: '🇮🇹',
    direction: 'ltr',
  },
}
```

The project will automatically:

- Fetch the language from Storyblok
- Generate static pages for all languages
- Apply the correct metadata and RTL/LTR direction

## Features

### Language Detection

- **Storyblok Visual Editor**: Language detected automatically from `_storyblok_lang` parameter
- **Static Generation**: All language versions pre-rendered at build time
- **Route Structure**: `/[lang]/` for language-specific pages
- **SEO Optimized**: Proper hreflang and alternate language tags

### Language Switcher

- **Visual Editor**: Language switching handled by Storyblok's interface
- **Public Site**: User-controlled language switcher in header
- **Functionality**: Updates content based on user selection
- **Persistence**: Language preference saved in localStorage and cookies
- **RTL Support**: Automatically adjusts positioning for RTL languages

### RTL Support

The project includes comprehensive RTL support:

- **Automatic direction detection** based on selected language
- **CSS and Tailwind utilities** for RTL layouts
- **Arabic font integration** (Noto Sans Arabic)
- **Responsive RTL navigation**

### Route Structure

Languages are managed through dedicated routes:

- Default: `https://yoursite.com/` (default language)
- English: `https://yoursite.com/en/`
- Arabic: `https://yoursite.com/ar/`
- Spanish: `https://yoursite.com/es/`

### Fallback Language

- **Primary**: Selected language content
- **Fallback**: English content for untranslated fields
- **Default**: English if no language is specified

## Usage in Components

### Accessing Current Language

```typescript
import { useLanguage } from '@/contexts/LanguageContext'

function MyComponent() {
  const { currentLanguage, isRTL, changeLanguage } = useLanguage()

  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>
      Current language: {currentLanguage}
      <button onClick={() => changeLanguage('ar')}>
        Switch to Arabic
      </button>
    </div>
  )
}
```

### Server-side Language Detection

```typescript
import { getCurrentLanguage } from '@/lib/language-utils'

export default async function MyPage() {
  const currentLanguage = await getCurrentLanguage()
  const story = await fetchStory('my-story', false, currentLanguage)

  return <BlockRenderer blok={story?.content} />
}
```

## Content Management in Storyblok

### Creating Multilingual Content

1. **Create/Edit a story** in Storyblok
2. **Select language** from the dropdown in the Visual Editor
3. **Toggle translatable fields**:
   - Click the globe icon next to each field
   - Enter translations for each language
4. **Publish** the story

### Using the Visual Editor

- **Language dropdown**: Located next to the History menu
- **Globe icons**: Indicate translatable fields
- **AI Translation**: Available for supported field types
- **Default language toggle**: Show/hide default language values

## CSS Classes for RTL

### Tailwind Utilities

```css
/* Automatic space direction */
.space-x-reverse

/* Manual direction control */
.rtl
.ltr

/* RTL-aware flex direction */
.flex-row-reverse
```

### Custom Styles

```css
/* Automatic font switching for RTL */
html[dir='rtl'] body {
  font-family: 'Noto Sans Arabic', 'Arabic UI Text', Arial, sans-serif;
}

/* Direction-based positioning */
html[dir='rtl'] .dropdown-right {
  right: auto;
  left: 0;
}
```

## Development Tips

### Testing Languages

1. **Start the development server**: `npm run dev`
2. **Visit different language URLs**:
   - `http://localhost:3000/` (English)
   - `http://localhost:3000/?lang=ar` (Arabic)
3. **Use the language switcher** in the header
4. **Check RTL layout** with Arabic content

### Debugging

- **Console logs**: Check browser console for language context updates
- **Storyblok API**: Monitor network tab for language parameters
- **Local storage**: Check `preferred-language` key

### Common Issues

1. **Missing translations**: Check field-level translation setup in Storyblok
2. **RTL layout issues**: Verify CSS direction and Tailwind classes
3. **Language not changing**: Clear browser cache and local storage

## API Reference

### Language Context

```typescript
interface LanguageContextType {
  currentLanguage: string // Current language code
  languages: Language[] // Available languages
  changeLanguage: (code: string) => void // Change language function
  isRTL: boolean // RTL detection
}
```

### Storyblok Functions

```typescript
// Fetch story with language
fetchStory(slug: string, preview?: boolean, language?: string)

// Fetch multiple stories with language
fetchStories(contentType?: string, preview?: boolean, language?: string)

// Fetch global content with language
fetchGlobalContent(storyName: string, preview?: boolean, language?: string)
```

## Next Steps

1. **Configure your Storyblok space** with the desired languages
2. **Set up translatable fields** in your components
3. **Create multilingual content** in Storyblok
4. **Test the language switcher** and RTL support
5. **Customize styling** for your specific design needs

For more information, refer to:

- [Storyblok Internationalization Documentation](https://www.storyblok.com/docs/concepts/internationalization)
- [Next.js Internationalization](https://nextjs.org/docs/advanced-features/i18n)
