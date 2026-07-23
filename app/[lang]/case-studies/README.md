# Case Studies Folder

This folder contains the case studies landing page and individual case study pages.

## Structure

```
case-studies/
├── page.tsx                          # Landing page (/case-studies)
├── _template-case-study/             # Template for new case studies (starts with _)
│   └── page.tsx
├── example-project/                  # Individual case study
│   └── page.tsx
└── another-project/                  # Individual case study
    └── page.tsx
```

## Creating a New Case Study Page

### Step 1: Create in Storyblok
1. Go to Storyblok
2. Create a story in the "case-studies" folder
3. Name it with a URL-friendly slug (e.g., "ecommerce-redesign")
4. Add CaseStudyHero and CaseStudyDetail components
5. Publish the story

### Step 2: Create the Page Route
1. Copy the `_template-case-study` folder
2. Rename it to match your Storyblok slug (e.g., `ecommerce-redesign`)
3. Open the `page.tsx` file inside
4. Update the `CASE_STUDY_SLUG` constant to match your slug:
   ```typescript
   const CASE_STUDY_SLUG = 'ecommerce-redesign'
   ```
5. Update the fallback metadata if desired

### Step 3: Build & Deploy
1. Run `npm run build` to generate the static page
2. The page will be available at `/en/case-studies/ecommerce-redesign`
3. Deploy your site

## Example: Creating "E-commerce Redesign" Case Study

**In Storyblok:**
- Location: case-studies/ecommerce-redesign
- Content type: Page
- Components: CaseStudyHero + CaseStudyDetail

**In Your Project:**
```bash
# Copy the template
cp -r app/[lang]/case-studies/_template-case-study app/[lang]/case-studies/ecommerce-redesign

# Edit the file
# Change: const CASE_STUDY_SLUG = 'example-project'
# To:     const CASE_STUDY_SLUG = 'ecommerce-redesign'
```

## Why This Approach?

### ✅ Advantages
- **Perfect SEO**: Each page is static HTML, pre-rendered at build time
- **Fast Loading**: No server rendering, instant page loads
- **Simple**: Copy a folder, change one line of code
- **Type-safe**: Full TypeScript support
- **Explicit**: Clear file structure, easy to understand

### 🎯 When to Use
- You have 3-20 case studies
- You want maximum SEO performance
- You prefer explicit routes over dynamic routes
- Your case studies don't change frequently

### 📦 Alternative: Dynamic Route
If you have many case studies (20+) and they change frequently, consider creating a dynamic route instead:

Create `app/[lang]/case-studies/[slug]/page.tsx`:
```typescript
// This would handle all case studies dynamically
// But still generate static pages at build time
// See Next.js docs for generateStaticParams
```

## Folder Naming Convention

- Folders starting with `_` are ignored by Next.js (like `_template-case-study`)
- Use lowercase with hyphens for case study folders (like `ecommerce-redesign`)
- Folder name should match the Storyblok story slug exactly

## Static Generation

When you run `npm run build`:
1. Next.js finds all folders with `page.tsx` files
2. For each page, it calls `generateStaticParams` to get all languages
3. For each language, it fetches the story from Storyblok
4. It renders the page to static HTML
5. The result is pure HTML files that load instantly

## Testing

**Development Mode:**
```bash
npm run dev
# Visit: http://localhost:3000/en/case-studies/your-slug
```

**Production Build:**
```bash
npm run build
npm start
# All case study pages are pre-rendered
```

## Troubleshooting

### Page shows 404
- Check the folder name matches the Storyblok slug
- Verify the `CASE_STUDY_SLUG` constant is correct
- Ensure the story is published in Storyblok
- Run `npm run build` to generate static pages

### Story not found
- Verify the story exists at `case-studies/your-slug` in Storyblok
- Check the story is published (not draft)
- Verify your Storyblok access token is configured

### Build fails
- Check all case study `page.tsx` files have correct slugs
- Verify all Storyblok stories are published
- Check the build logs for specific errors

## Quick Reference

**Create new case study:**
1. Create story in Storyblok: `case-studies/my-project`
2. Copy template folder: `cp -r _template-case-study my-project`
3. Edit `my-project/page.tsx`: Change `CASE_STUDY_SLUG = 'my-project'`
4. Build: `npm run build`
5. Done! Visit `/en/case-studies/my-project`

**Update existing case study:**
1. Edit content in Storyblok
2. Publish changes
3. Rebuild site: `npm run build`
4. Deploy

---

**Template provided for your convenience. Happy case study building! 🚀**
