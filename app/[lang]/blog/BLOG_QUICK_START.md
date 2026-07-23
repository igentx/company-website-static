# Blog System - Quick Start Guide

## New post checklist (2025 redesign)

When creating or updating a blog post in `content/en/blog/`:

1. **SEO block**: `structured_data_type: BlogPosting`, canonical `https://www.igentx.com/blog/{slug}`, OG image with alt text, `BreadcrumbList` in `structured_data_custom`
2. **blog_hero**: category, author, publish date, reading time, featured image alt
3. **blog_detail**: `key_takeaways`, `author_bio`, `author_role`, `show_toc: true`, `related_posts` (3 cards)
4. **faq block**: 3 to 5 questions for FAQPage schema
5. **igentx_cta_band**: primary CTA "Book a Free Consultation" → `/contact`
6. **Static route**: `app/[lang]/blog/{slug}/page.tsx` with matching `STORY_SLUG`

Landing page content lives in `content/en/blog-landing-page.json` using `blog_grid`, `igentx_trust_band`, and `igentx_cta_band`.

---

## 🎯 What You Get

A complete blog system with:
- **Landing page** with filterable grid of blog posts
- **Detail pages** for individual blog posts with rich, flexible content
- **9 Storyblok components** ready to use (5 generic content blocks + 4 layout components)
- **Full multilingual support**
- **SEO optimization** built-in

## 📁 Files Created

### Components
```
components/blocks/
├── BlogHeading.tsx          # Heading content block
├── BlogBody.tsx             # Rich text content block
├── BlogImage.tsx            # Image content block
├── BlogQuote.tsx            # Quote/testimonial block
├── BlogTextWithImage.tsx    # Side-by-side text + image block
├── BlogCard.tsx             # Preview card for listing page
├── BlogGrid.tsx             # Main grid layout for landing page
├── BlogHero.tsx             # Hero section for detail pages
└── BlogDetail.tsx           # Full content container for detail pages
```

### Routes
```
app/[lang]/
├── blog/
│   ├── page.tsx             # Landing page route
│   └── _template-blog/
│       └── page.tsx         # Detail page template
```

### Types
```
lib/types.ts                # Updated with blog types
```

### Registration
```
lib/blocks.tsx           # Components registered
```

### Documentation
```
docs/features/BLOG_SYSTEM.md       # Comprehensive guide
docs/BLOG_QUICK_START.md          # This file
```

## 🚀 Quick Setup (6 Steps)

### Step 1: Create Components in Storyblok

Go to Storyblok → Components and create these 9 components:

#### Generic Content Blocks (5 components)

**1. blog_heading**
- `level` (Select): h1, h2, h3, h4, h5, h6
- `text` (Text): Heading text ✓ Required
- `alignment` (Select): left, center, right

**2. blog_body**
- `content` (Richtext): Rich text content
- `alignment` (Select): left, center, right

**3. blog_image**
- `image` (Asset): Image ✓ Required
- `caption` (Text): Image caption
- `width` (Select): full, large, medium, small
- `alignment` (Select): left, center, right

**4. blog_quote**
- `text` (Text): Quote text ✓ Required
- `author` (Text): Author name
- `author_role` (Text): Author role
- `background_color` (Text): Background color class

**5. blog_text_with_image**
- `text` (Richtext): Text content
- `image` (Asset): Image ✓ Required
- `image_position` (Select): left, right
- `background_color` (Text): Background color

#### Layout Components (4 components)

**6. blog_card**
- `title` (Text): Title ✓ Required
- `excerpt` (Textarea): Excerpt ✓ Required
- `featured_image` (Asset): Image ✓ Required
- `author_name` (Text): Author name
- `publish_date` (Date): Publication date
- `category` (Text): Category
- `tags` (Text, multi): Tags
- `reading_time` (Text): Reading time
- `link` (Link): Link to blog post

**7. blog_grid**
- `title` (Text): Section title
- `description` (Textarea): Description
- `badge_text` (Text): Badge text
- `blogs` (Blocks): blog_card components
- `columns` (Number): Number of columns
- `show_filters` (Boolean): Show filters
- `filter_categories` (Text, multi): Categories
- `cta_text` (Text): CTA text
- `cta_link` (Link): CTA link

**8. blog_hero**
- `title` (Text): Title ✓ Required
- `excerpt` (Textarea): Excerpt
- `featured_image` (Asset): Image
- `category` (Text): Category
- `author_name` (Text): Author name
- `publish_date` (Date): Publication date
- `reading_time` (Text): Reading time
- `back_link` (Link): Back link

**9. blog_detail**
- `author_name` (Text): Author name
- `author_avatar` (Asset): Avatar
- `category` (Text): Category
- `publish_date` (Date): Publication date
- `updated_date` (Date): Updated date
- `reading_time` (Text): Reading time
- `tags` (Text, multi): Tags
- `content_blocks` (Blocks): Generic content blocks
- `related_posts` (Blocks): Related blog_card components
- `cta_section_title` (Text): CTA title
- `cta_section_text` (Textarea): CTA text
- `cta_button_text` (Text): CTA button text
- `cta_button_link` (Link): CTA button link

📋 **Detailed schemas**: See `/docs/features/BLOG_SYSTEM.md`

### Step 2: Create Blog Landing Page

1. In Storyblok, create new story: **"blog-landing-page"**
2. Content type: **Page**
3. Add to body: **blog_grid** component
4. Configure:
   - Title: "Our Blog"
   - Description: "Latest articles and insights on web development..."
   - Badge: "Latest Posts"
5. Add 3-6 **blog_card** components inside the grid
6. **Publish**

### Step 3: Create Blog Folder

1. In Storyblok, create folder: **"blog"**
2. This will hold all individual blog posts

### Step 4: Create First Blog Post

1. Inside "blog" folder, create new story: **"getting-started-with-nextjs"**
2. Content type: **Page**
3. The slug will be `blog/getting-started-with-nextjs`
4. Add to body:
   - **blog_hero** (at the top)
   - **blog_detail** (below hero)
5. Inside **blog_detail** → content_blocks, add generic blocks:
   - `blog_heading` for section titles
   - `blog_body` for paragraphs
   - `blog_image` for screenshots/illustrations
   - `blog_quote` for key insights
   - `blog_text_with_image` for side-by-side layouts
6. Configure metadata:
   - Author name
   - Publishing date
   - Category
   - Tags (3-5 tags)
   - Reading time (e.g., "5 min read")
7. **Publish**

### Step 4.5: Create the Page Route (Static HTML)

Now create the actual page file for perfect SEO:

```bash
# Copy the template folder
cp -r app/[lang]/blog/_template-blog app/[lang]/blog/getting-started-with-nextjs

# Edit the new page.tsx file
# Change: const STORY_SLUG = 'blog/YOUR_BLOG_POST_SLUG_HERE'
# To:     const STORY_SLUG = 'blog/getting-started-with-nextjs'
```

Or manually:
1. Copy folder: `app/[lang]/blog/_template-blog`
2. Rename to: `app/[lang]/blog/getting-started-with-nextjs`
3. Open `page.tsx` inside
4. Change line: `const STORY_SLUG = 'blog/getting-started-with-nextjs'`

**Why This Step?** This creates a static HTML page (not dynamic) for optimal SEO performance. Search engines can crawl and index the page instantly.

### Step 5: Link Card to Detail Page

1. Go back to the landing page (blog-landing-page story)
2. Edit one **blog_card** in the grid
3. In the **link** field:
   - Type: **Story** (not URL)
   - Select: **blog/getting-started-with-nextjs**
4. **Publish** the landing page

**Why Story type?** Using Story type links ensures:
- Correct URL generation with language prefixes
- Automatic link updates if you rename the story
- Proper internal linking for SEO

## ✅ Testing

**In Development Mode:**
```bash
npm run dev
```
Visit:
- Landing page: `http://localhost:3000/en/blog`
- Detail page: `http://localhost:3000/en/blog/getting-started-with-nextjs`

**For Production (Static HTML):**
```bash
# Generate all static pages
npm run build

# Test the production build
npm start
```

All blog pages will be pre-rendered as static HTML files.

## 🎨 Component Overview

### BlogGrid (Landing Page)
```
┌─────────────────────────────────────┐
│         Badge: "Latest Posts"       │
│   Title: "Our Blog"                │
│   Description: "Latest articles..." │
│                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │ Card │  │ Card │  │ Card │     │
│  │  1   │  │  2   │  │  3   │     │
│  └──────┘  └──────┘  └──────┘     │
│                                     │
│      [Subscribe Button]            │
└─────────────────────────────────────┘
```

### BlogCard (Preview Card)
```
┌─────────────────────────┐
│  ┌──────────────────┐   │
│  │  Featured Image  │   │ ← Category badge
│  └──────────────────┘   │
│  Post Title             │
│  Excerpt text...        │
│  [Tag1] [Tag2] [Tag3]   │
│  Author  • Date • Time  │
│  Read Article →         │
└─────────────────────────┘
```

### BlogHero (Detail Page Hero)
```
┌───────────────────────────────────────┐
│ ← Back to Blog                        │
│ [Category Badge]                      │
│                                       │
│ Large Post Title                      │
│ Excerpt/Summary text...               │
│ Author • Date • 5 min read            │
│                                       │
│ ┌─────────────────────────────────┐  │
│ │    Featured Image               │  │
│ └─────────────────────────────────┘  │
└───────────────────────────────────────┘
```

### BlogDetail (Content Container)
```
┌─────────────────────────────────────┐
│ Author Info                         │
│ Date • Category • Reading Time      │
│                                     │
│ Dynamic Content Blocks:             │
│ ├─ Heading                          │
│ ├─ Body (Richtext)                  │
│ ├─ Image with Caption               │
│ ├─ Quote                            │
│ └─ Text with Image                  │
│                                     │
│ Tags: #tag1 #tag2                   │
│                                     │
│ [CTA Section with Button]           │
│                                     │
│ Related Articles                    │
│ [Card] [Card] [Card]               │
└─────────────────────────────────────┘
```

## 📝 Content Guidelines

### Blog Post Structure

**Great blog post flow:**
1. `blog_heading` (h2): "Introduction"
2. `blog_body`: Opening paragraph
3. `blog_image`: Illustration or screenshot
4. `blog_heading` (h2): "Main Topic"
5. `blog_body`: Main content with details
6. `blog_quote`: Key insight or quote
7. `blog_text_with_image`: Case study or comparison
8. `blog_heading` (h2): "Conclusion"
9. `blog_body`: Wrap-up and call-to-action

### Best Practices

**Titles:**
- Keep between 40-70 characters for SEO
- Make them compelling and clear
- Use numbers when possible: "5 Tips for..."

**Excerpts:**
- Keep under 150 characters
- Should summarize the post
- Include main keywords

**Images:**
- Minimum 1200x600px
- Optimize before uploading
- Always add alt text

**Tags:**
- Use 3-5 relevant tags
- Be consistent with naming
- Use lowercase with hyphens

**Reading Time:**
- Calculate as: ~200 words per minute
- Format: "5 min read"

**Author:**
- Always include for credibility
- Add avatar when possible
- Include role if relevant

## 🌍 Multilingual

The system supports all your configured languages automatically:

1. Translate the blog landing page story
2. Translate each blog post story
3. Component content is auto-translated

URLs will be:
- English: `/en/blog/post-name`
- Arabic: `/ar/blog/post-name`
- Other: `/[lang]/blog/post-name`

## 🔍 SEO

Add SEO component to blog posts:
1. Add **seo** component to page body
2. Configure:
   - Meta title (unique for each post)
   - Meta description (under 160 characters)
   - OG image (featured image)
   - OG title & description
3. System auto-generates hreflang tags for multilingual support

## 🎨 Styling

All components use Tailwind CSS. To customize:

**Colors:**
```tsx
bg-blue-600 → bg-purple-600
text-gray-900 → text-slate-900
```

**Spacing:**
```tsx
py-12 → py-8  (vertical padding)
gap-8 → gap-4  (grid gap)
```

## 📚 Full Documentation

- **Complete guide**: `/docs/features/BLOG_SYSTEM.md`
- **Component examples**: See component files in `/components/blocks/`

## 🐛 Troubleshooting

**Blog cards not linking?**
- Use "Story" type in link field (not URL)
- Verify link points to correct story
- Publish blog post before linking

**Content blocks not showing?**
- Check blocks are in content_blocks array
- Verify component names in Storyblok match types
- Ensure blocks are registered in storyblok.ts

**Images not displaying?**
- Verify image uploaded to Storyblok
- Check image URL is accessible
- Ensure alt text is provided

**404 on blog landing page?**
- Create "blog-landing-page" story
- Publish the story
- Clear cache if needed

**404 on blog detail page?**
- Blog must be inside "blog" folder
- Use URL-friendly slug
- Publish blog post
- Create page folder and update STORY_SLUG

## 🚀 Next Steps

1. Create 3-5 blog posts
2. Set up category filtering
3. Add newsletter signup CTA
4. Configure analytics tracking
5. Promote blog posts on homepage

## 💡 Tips

- **Start simple**: Create 2-3 posts first, then expand
- **Batch creation**: Create content in bulk for efficiency
- **Regular updates**: Add new posts monthly for SEO boost
- **Repurpose content**: Turn webinars/podcasts into blog posts
- **Internal linking**: Link related posts together

## 📞 Need Help?

Check these files:
- Component code: `/components/blocks/Blog*.tsx`
- Type definitions: `/lib/types.ts`
- Routes: `/app/[lang]/blog/`
- Complete guide: `/docs/features/BLOG_SYSTEM.md`

---

**Ready to start blogging! 🎉**

For detailed setup instructions and advanced features, see `/docs/features/BLOG_SYSTEM.md`
