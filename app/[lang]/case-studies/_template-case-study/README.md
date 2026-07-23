# Case Study Page Template

This template provides a starting point for creating new case study detail pages with centralized slug management.

## Quick Start

1. **Copy this folder** and rename it to match your case study URL slug
   ```bash
   cp -r _template-case-study your-case-study-slug
   ```

2. **Update the STORY_SLUG constant** in `page.tsx`:
   ```typescript
   // Change from:
   const STORY_SLUG = 'case-studies/YOUR_CASE_STUDY_SLUG_HERE'
   
   // To match your Storyblok story path:
   const STORY_SLUG = 'case-studies/your-case-study-slug'
   ```

3. **Create the corresponding Storyblok story** at the same path:
   - Go to Storyblok CMS
   - Navigate to or create: `case-studies/your-case-study-slug`
   - Add a `case_study_detail` component to the page
   - Fill in the content

4. **That's it!** The slug is now centralized in one place:
   - Content fetching
   - SEO metadata generation
   - Canonical URLs
   - Language alternates

## Slug Management Benefits

By defining `STORY_SLUG` as a constant:

✅ **Single source of truth** - Update the slug in ONE place  
✅ **Prevents mismatches** - Content fetch and SEO use the same slug  
✅ **Easy refactoring** - Change the slug without hunting through the file  
✅ **Clear intent** - Immediately see which Storyblok story this page uses  

## Example

For a case study about "Moduluxe Group":

1. Folder name: `web-development-uae-startup-moduluxe-group/`
2. STORY_SLUG: `'case-studies/web-development-uae-startup-moduluxe-group'`
3. Storyblok path: `case-studies/web-development-uae-startup-moduluxe-group`
4. URL (default lang): `/case-studies/web-development-uae-startup-moduluxe-group`
5. URL (Arabic): `/ar/case-studies/web-development-uae-startup-moduluxe-group`

## File Structure

```
your-case-study-slug/
├── page.tsx          # Main page component with STORY_SLUG constant
└── README.md         # This file (optional, can be deleted)
```

## SEO Notes

- The `STORY_SLUG` is used for canonical URLs
- Page-level SEO from Storyblok SEO blok takes precedence
- Global SEO from header is used as fallback
- Multi-language hreflang tags are auto-generated
- Default language gets clean URLs (no /en prefix)

## Need Help?

See the main case study documentation:
- `docs/features/CASE_STUDY_SYSTEM.md` - System overview
- `docs/CASE_STUDY_SCHEMAS.md` - Storyblok schema definitions
- `docs/CASE_STUDY_QUICK_START.md` - Quick reference guide
