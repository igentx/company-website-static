# Blog System Documentation

## Blog hub redesign (2025)

The blog landing page and article template were upgraded for SEO, EEAT and conversion UX.

### Landing page block stack (`content/en/blog-landing-page.json`)

1. `seo` with `ItemList` JSON-LD (Custom structured data)
2. `service_hero` with outcome-first intro and primary CTA
3. `blog_grid` with featured post, topic links, category filters, and article grid
4. `igentx_trust_band` with conservative metrics
5. `igentx_cta_band` with "Book a Free Consultation"

### Article page block stack (`content/en/blog/*.json`)

1. `seo` with `BlogPosting` type and `BreadcrumbList` in `structured_data_custom`
2. `blog_hero` with breadcrumb trail and two-column layout
3. `blog_detail` with TOC sidebar, key takeaways, share bar, author bio, related posts
4. `faq` with FAQPage JSON-LD (via `FAQ.tsx`)
5. `igentx_cta_band`

### New utilities and components

- `lib/blog-utils.ts`: link resolution, tags, dates, TOC headings, reading time
- `components/ui/CircuitHeroBackground.tsx`: shared hero background
- `components/blocks/blog/BlogGridClient.tsx`: client-side category filters
- `components/blocks/blog/BlogTableOfContents.tsx`: sticky TOC with scroll spy
- `components/blocks/blog/BlogShareBar.tsx`: LinkedIn, X, copy link
- `components/blocks/blog/BlogAuthorBio.tsx`: EEAT author box
- `components/blocks/blog/BlogKeyTakeaways.tsx`: optional takeaways block

### SEO structured data

- Landing: `structured_data_type: Custom` with `ItemList`
- Posts: `structured_data_type: BlogPosting` (or `Article`, aliased to BlogPosting)
- FAQs: rendered by `FAQ.tsx` with `FAQPage` schema
- Breadcrumbs: `BreadcrumbList` in `structured_data_custom` per post

---

## Overview

The Blog system provides a comprehensive solution for displaying blog posts and articles with flexible content composition. It includes components for listing blog posts in a grid layout on the landing page and detailed pages for individual blog posts with generic content blocks that can be freely composed.

## Key Features

### Landing Page
- Responsive grid layout for displaying blog cards
- Optional category filter tabs
- Customizable header with badge, title, and description
- Call-to-action section
- Empty state handling
- Multilingual support

### Blog Cards (Listing)
- Featured image with category badge
- Author name and publish date
- Excerpt with line clamping
- Tag display
- Reading time indicator
- Hover animations
- Link to detail page

### Blog Detail Pages
- Attractive hero section with metadata
- Author information with avatar option
- Flexible content composition using generic blocks:
  - **Heading**: Configurable heading levels (H1-H6) with text alignment
  - **Body**: Rich text content with alignment options
  - **Image**: Single image with caption and sizing options
  - **Quote**: Pull quotes or testimonials with author attribution
  - **Text with Image**: Half-side text, half-side image layout
- Related posts section
- Call-to-action section
- Tags display
- Author metadata (publish date, reading time, category)

## Components

### Main Layout Components

#### 1. BlogCard
Preview card for displaying blog posts on listing pages.

**Features:**
- Featured image with category badge overlay
- Author name and publish date
- Excerpt with line clamping
- Tags (up to 3 tags)
- Reading time display
- Hover animations and transitions
- Link to detail page

**Component Name in Storyblok:** `blog_card`

#### 2. BlogGrid
Landing page grid component for displaying multiple blog cards.

**Features:**
- Customizable title, description, and badge
- Optional filter tabs by category
- Responsive grid layout (1-3 columns configurable)
- Call-to-action button
- Empty state message
- Nested blog card components

**Component Name in Storyblok:** `blog_grid`

#### 3. BlogHero
Hero section for blog detail pages.

**Features:**
- Large featured image with decorative elements
- Category badge and breadcrumb navigation
- Blog metadata (author, publish date, reading time)
- Animated background pattern
- Author avatar or initials
- Back to blog link

**Component Name in Storyblok:** `blog_hero`

#### 4. BlogDetail
Main content container for blog detail pages.

**Features:**
- Author information with avatar
- Publishing metadata (date, reading time, category)
- Dynamic content blocks rendering
- Tags display
- Related posts section
- Call-to-action section
- Updated date notification

**Component Name in Storyblok:** `blog_detail`

### Generic Content Blocks

These blocks can be freely composed inside the BlogDetail component to build flexible blog posts:

#### BlogHeading
Display configurable heading levels.

**Fields:**
- `level`: Heading level (h1-h6)
- `text`: Heading text
- `alignment`: Text alignment (left, center, right)

**Component Name in Storyblok:** `blog_heading`

#### BlogBody
Rich text content with alignment options.

**Fields:**
- `content`: Richtext field
- `alignment`: Text alignment (left, center, right)

**Component Name in Storyblok:** `blog_body`

#### BlogImage
Single image with caption and sizing options.

**Fields:**
- `image`: Asset/Image
- `caption`: Image caption (optional)
- `width`: Image width (full, large, medium, small)
- `alignment`: Image alignment (left, center, right)

**Component Name in Storyblok:** `blog_image`

#### BlogQuote
Pull quotes or testimonials with author attribution.

**Fields:**
- `text`: Quote text
- `author`: Author name (optional)
- `author_role`: Author role/title (optional)
- `background_color`: Background color class

**Component Name in Storyblok:** `blog_quote`

#### BlogTextWithImage
Half-side text, half-side image layout.

**Fields:**
- `text`: Richtext content
- `image`: Asset/Image
- `image_position`: Image position (left or right)
- `background_color`: Background color

**Component Name in Storyblok:** `blog_text_with_image`

## Page Structure

### Blog Landing Page
**Route:** `/[lang]/blog`
**File:** `app/[lang]/blog/page.tsx`

This page should contain:
1. A `page` component as the root
2. Inside body: A single `blog_grid` component
3. Inside blog_grid: Multiple `blog_card` components

### Blog Detail Page
**Route:** `/[lang]/blog/[slug]`
**File:** `app/[lang]/blog/_template-blog/page.tsx` (template to copy)

This page should contain:
1. A `page` component as the root
2. Inside body:
   - `blog_hero` component (at the top)
   - `blog_detail` component (below hero)
3. Inside blog_detail → content_blocks: Multiple generic content blocks

## Storyblok Setup

### Step 1: Create Components in Storyblok

Go to Storyblok → Components and create these 9 components:

#### 1. Generic Content Blocks

**blog_heading** component:
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| level | Select | Heading level (h1, h2, h3, h4, h5, h6) | No |
| text | Text | Heading text | Yes |
| alignment | Select | Text alignment (left, center, right) | No |

**blog_body** component:
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| content | Richtext | Rich text content | No |
| alignment | Select | Text alignment (left, center, right) | No |

**blog_image** component:
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| image | Asset | Blog image | Yes |
| caption | Text | Image caption | No |
| width | Select | Image width (full, large, medium, small) | No |
| alignment | Select | Image alignment (left, center, right) | No |

**blog_quote** component:
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| text | Text | Quote text | Yes |
| author | Text | Author name | No |
| author_role | Text | Author role/title | No |
| background_color | Text | Background color class | No |

**blog_text_with_image** component:
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| text | Richtext | Text content | No |
| image | Asset | Image asset | Yes |
| image_position | Select | Image position (left, right) | No |
| background_color | Text | Background color | No |

#### 2. Main Layout Components

**blog_card** component:
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| title | Text | Blog post title | Yes |
| excerpt | Textarea | Brief excerpt | Yes |
| featured_image | Asset | Featured image | Yes |
| author_name | Text | Author name | No |
| publish_date | Date | Publication date | No |
| category | Text | Blog category | No |
| tags | Text (multi) | Blog tags | No |
| reading_time | Text | Estimated reading time | No |
| link | Link | Link to blog post | No |

**blog_grid** component:
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| title | Text | Section title | No |
| description | Textarea | Section description | No |
| badge_text | Text | Badge text (e.g., "Latest Posts") | No |
| blogs | Blocks | Array of blog_card components | No |
| columns | Number | Number of columns (1-3) | No |
| show_filters | Boolean | Show category filter tabs | No |
| filter_categories | Text (multi) | Filter category names | No |
| cta_text | Text | Call-to-action text | No |
| cta_link | Link | Call-to-action link | No |

**blog_hero** component:
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| title | Text | Blog post title | Yes |
| excerpt | Textarea | Brief excerpt/tagline | No |
| featured_image | Asset | Hero image | No |
| category | Text | Blog category | No |
| author_name | Text | Author name | No |
| publish_date | Date | Publication date | No |
| reading_time | Text | Reading time | No |
| back_link | Link | Back to blog link | No |

**blog_detail** component:
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| author_name | Text | Author name | No |
| author_avatar | Asset | Author avatar image | No |
| category | Text | Blog category | No |
| publish_date | Date | Publication date | No |
| updated_date | Date | Last updated date | No |
| reading_time | Text | Estimated reading time | No |
| tags | Text (multi) | Blog tags | No |
| content_blocks | Blocks | Generic content blocks | No |
| related_posts | Blocks | Related blog cards | No |
| cta_section_title | Text | CTA section title | No |
| cta_section_text | Textarea | CTA section description | No |
| cta_button_text | Text | CTA button text | No |
| cta_button_link | Link | CTA button link | No |

### Step 2: Create Blog Landing Page

1. In Storyblok, create new story: **"blog-landing-page"**
2. Content type: **Page**
3. Add to body: **blog_grid** component
4. Configure:
   - Title: "Our Blog"
   - Description: "Latest articles and insights..."
   - Badge: "Latest Posts"
5. Add 3-6 **blog_card** components inside the grid
6. **Publish**

### Step 3: Create Blog Folder

1. In Storyblok, create folder: **"blog"**
2. This will hold all individual blog posts

### Step 4: Create First Blog Post

1. Inside "blog" folder, create new story: **"my-first-blog-post"**
2. Content type: **Page**
3. The slug will be `blog/my-first-blog-post`
4. Add to body:
   - **blog_hero** (at the top)
   - **blog_detail** (below hero)
5. Inside **blog_detail** → content_blocks, add generic blocks:
   - `blog_heading` for section titles
   - `blog_body` for paragraphs
   - `blog_image` for images
   - `blog_quote` for quotes
   - `blog_text_with_image` for side-by-side layouts
6. **Publish**

### Step 5: Create the Page Route (Static HTML)

Now create the actual page file for perfect SEO:

```bash
# Copy the template folder
cp -r app/[lang]/blog/_template-blog app/[lang]/blog/my-first-blog-post

# Edit the new page.tsx file
# Change: const STORY_SLUG = 'blog/YOUR_BLOG_POST_SLUG_HERE'
# To:     const STORY_SLUG = 'blog/my-first-blog-post'
```

Or manually:
1. Copy folder: `app/[lang]/blog/_template-blog`
2. Rename to: `app/[lang]/blog/my-first-blog-post`
3. Open `page.tsx` inside
4. Change: `const STORY_SLUG = 'blog/my-first-blog-post'`

**Why This Step?** This creates a static HTML page (not dynamic) for optimal SEO performance. Search engines can crawl and index the page instantly.

### Step 6: Link Card to Detail Page

1. Go back to the landing page (blog-landing-page story)
2. Edit one **blog_card** in the grid
3. In the **link** field:
   - Type: **Story** (not URL)
   - Select: **blog/my-first-blog-post**
4. **Publish** the landing page

## Content Composition Examples

### Simple Blog Post Example

**blog_detail** content_blocks:

1. `blog_heading` (h2): "Introduction"
2. `blog_body`: Opening paragraph with context
3. `blog_image`: Hero image with caption
4. `blog_heading` (h2): "Main Topic"
5. `blog_body`: Main content paragraph
6. `blog_quote`: Key insight or testimonial
7. `blog_body`: Continuation of content
8. `blog_text_with_image`: Half text, half image comparison
9. `blog_heading` (h2): "Conclusion"
10. `blog_body`: Concluding thoughts

### Complex Blog Post Example

**blog_detail** content_blocks:

1. `blog_heading` (h2): "Background"
2. `blog_body`: Introduction
3. `blog_heading` (h3): "Problem Statement"
4. `blog_body`: The challenge
5. `blog_image`: Illustration of problem
6. `blog_heading` (h3): "Solution Approach"
7. `blog_text_with_image`: Text left, image right
8. `blog_quote`: Expert quote
9. `blog_heading` (h3): "Case Study"
10. `blog_body`: Real-world example
11. `blog_image`: Case study image
12. `blog_heading` (h2): "Key Takeaways"
13. `blog_body`: Summary and lessons learned

## URL Structure

### Landing Page
- English: `/en/blog`
- Arabic: `/ar/blog`
- Other languages: `/[lang]/blog`

### Detail Pages (Static Stories)
Each story in the blog folder becomes a static page:
- English: `/en/blog/post-slug`
- Arabic: `/ar/blog/post-slug`
- Other languages: `/[lang]/blog/post-slug`

## Design Features

### Color Scheme
- Primary: Blue (blue-600)
- Success: Green (green-500)
- Neutral: Gray scales
- Accent: Purple (for decorative elements)

### Typography
- Headings: Bold, large sizes (text-2xl to text-6xl)
- Body: Regular, readable sizes (text-base to text-xl)
- Prose styling with Tailwind prose utility

### Spacing
- Consistent padding and margins
- Responsive spacing (p-4 to p-8)
- Grid gaps optimized for readability

### Animations
- Smooth transitions (duration-300, duration-500)
- Hover effects on cards
- Scale transforms
- Fade effects

### Responsive Design
All components are fully responsive:
- **Mobile**: Single column cards, optimized touch targets
- **Tablet**: 2-column grids, larger text
- **Desktop**: 3-column grids, full features

## Technical Implementation

### Component Registration
All components registered in `/lib/blocks.tsx`:
```typescript
blog_heading: BlogHeading
blog_body: BlogBody
blog_image: BlogImage
blog_quote: BlogQuote
blog_text_with_image: BlogTextWithImage
blog_card: BlogCard
blog_grid: BlogGrid
blog_hero: BlogHero
blog_detail: BlogDetail
```

### Type Safety
Full TypeScript support with type definitions in `/lib/types.ts`

### SEO Optimization
- Dynamic metadata generation for all pages
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs
- Language alternates (hreflang)

### Performance
- Static generation with `generateStaticParams`
- Image optimization with Next.js Image
- Efficient caching strategy
- Preview mode support

## Troubleshooting

**Blog cards not linking?**
- Check link field points to correct story
- Use "Story" type (not URL) in link field
- Verify story is published

**Images not showing?**
- Verify image uploaded to Storyblok
- Check image URL is accessible
- Ensure alt text is set

**Blog landing page not found?**
- Create "blog-landing-page" story at root level
- Publish the story

**Blog detail page 404?**
- Create blog inside "blog" folder
- Use URL-friendly slug (lowercase, hyphens only)
- Publish the story
- In production: Run `npm run build` to generate static pages

**Content blocks not rendering?**
- Check all blocks are registered in Storyblok
- Verify blocks are added to content_blocks array
- Check component names match in TypeScript types

## Best Practices

1. **Use Descriptive Slugs**: Use clear, SEO-friendly slugs like "web-development-best-practices"
2. **Author Information**: Always include author name for credibility
3. **Publishing Dates**: Set accurate publish dates for chronological sorting
4. **Categories**: Use consistent category names for filtering
5. **Tags**: Use 3-5 relevant tags per post
6. **Reading Time**: Calculate and set accurate reading time
7. **Featured Images**: Use high-quality images (minimum 1200x600px)
8. **Image Optimization**: Optimize images before uploading to Storyblok
9. **SEO**: Add SEO component to blog posts for custom meta descriptions
10. **Content Structure**: Use heading hierarchy (h2, h3) for scannable content

## Multilingual Support

The system supports all your configured languages automatically. Just translate:
1. The blog landing page story
2. Each blog post story
3. Component content

URLs will be:
- English: `/en/blog/post-name`
- Arabic: `/ar/blog/post-name`

## Analytics Ready

The system is ready for analytics integration:
- Track blog views
- Monitor click-through rates
- Measure time on page
- Track CTA conversions

## Future Enhancements

Potential additions:
1. **Search functionality** - Full-text search across blog posts
2. **Pagination** - For large numbers of blog posts
3. **Comments** - Reader comments and discussions
4. **Social sharing** - Share buttons with tracking
5. **Newsletter signup** - Subscribe form on blog pages
6. **Related posts** - Automatic related content suggestions
7. **Blog archives** - Archive page by date/category
8. **RSS feed** - XML feed for blog subscribers

---

**Created:** 2025-10-25
**Version:** 1.0
**Status:** ✅ Complete
