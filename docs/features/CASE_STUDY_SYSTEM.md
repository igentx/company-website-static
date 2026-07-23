# Case Study System Documentation

## Overview

The Case Study system provides a comprehensive solution for displaying project portfolios and success stories. It includes components for listing case studies in a grid layout and detailed pages for individual case studies.

## Components

### 1. CaseStudyCard

A reusable card component that displays a preview of a case study on listing pages.

**Features:**
- Featured image with category badge overlay
- Client name and case study title
- Excerpt text with line clamping
- Tags display (up to 3 tags)
- Key metrics preview (up to 2 metrics)
- Hover animations and transitions
- Link to detailed case study page

**Component Name in Storyblok:** `case_study_card`

### 2. CaseStudyGrid

The main component for the case studies landing page that displays multiple case study cards in a responsive grid.

**Features:**
- Customizable title, description, and badge
- Optional filter tabs by category
- Responsive grid layout (1-3 columns)
- Call-to-action button
- Empty state message
- Nested CaseStudyCard components

**Component Name in Storyblok:** `case_study_grid`

### 3. CaseStudyHero

A hero section specifically designed for case study detail pages.

**Features:**
- Large featured image with decorative elements
- Category badge and breadcrumb navigation
- Project metadata (client, industry, duration, location)
- Quick stats display
- Animated background pattern
- Scroll indicator

**Component Name in Storyblok:** `case_study_hero`

### 4. CaseStudyDetail

The main content component for case study detail pages.

**Features:**
- Client logo and project metadata
- Rich text content sections
- Challenge section (red-themed box)
- Solution section (green-themed box)
- Project image gallery
- Results & metrics display
- Technologies used
- Client testimonial section
- Link to live project

**Component Name in Storyblok:** `case_study_detail`

## Page Structure

### Case Studies Landing Page
**Route:** `/[lang]/case-studies`
**File:** `app/[lang]/case-studies/page.tsx`

This page should contain:
- Page component with body containing CaseStudyGrid
- CaseStudyGrid with nested CaseStudyCard components

### Individual Case Study Pages (Static)
**Routes:** Created as separate stories in Storyblok
**Examples:** 
- `/[lang]/case-studies/ecommerce-redesign`
- `/[lang]/case-studies/mobile-app-development`
- `/[lang]/case-studies/brand-identity`

Each case study page should contain:
- Page component with body containing:
  - CaseStudyHero (optional but recommended)
  - CaseStudyDetail

**Why Static Pages?**
- Better SEO: Each page generates as static HTML
- Faster loading: Pre-rendered at build time
- Better indexing: Search engines can crawl all pages
- Lower server costs: No dynamic rendering needed

## Storyblok Schema Setup

### Schema 1: CaseStudyCard

Create a new component in Storyblok with the following fields:

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| `title` | Text | Case study title | Yes |
| `excerpt` | Textarea | Brief description (2-3 sentences) | No |
| `featured_image` | Asset | Main preview image | No |
| `client_name` | Text | Client/company name | No |
| `category` | Text | Project category (e.g., "E-commerce", "Mobile App") | No |
| `tags` | Text (multi) | Technology/service tags | No |
| `key_metrics` | Blocks | Metrics to display (use nested blocks) | No |
| `link` | Link | Link to detailed case study page | No |

**Key Metrics Nested Block Schema:**
- `value` (Text): Metric value (e.g., "150%", "$2M")
- `label` (Text): Metric label (e.g., "ROI Increase", "Revenue Generated")
- `description` (Text, optional): Additional context

### Schema 2: CaseStudyGrid

Create a new component in Storyblok with the following fields:

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| `title` | Text | Section title | No |
| `description` | Textarea | Section description | No |
| `badge_text` | Text | Badge text (e.g., "Our Work", "Success Stories") | No |
| `case_studies` | Blocks | Array of CaseStudyCard components | No |
| `show_filters` | Boolean | Show category filter tabs | No |
| `filter_categories` | Text (multi) | Filter category names | No |
| `cta_text` | Text | Call-to-action button text | No |
| `cta_link` | Link | Call-to-action button link | No |

### Schema 3: CaseStudyHero

Create a new component in Storyblok with the following fields:

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| `title` | Text | Case study title | Yes |
| `summary` | Textarea | Brief summary/tagline | No |
| `featured_image` | Asset | Hero image | No |
| `category` | Text | Project category | No |
| `client_name` | Text | Client name | No |
| `industry` | Text | Client industry | No |
| `project_duration` | Text | Project duration (e.g., "3 months") | No |
| `location` | Text | Project location | No |
| `quick_stats` | Blocks | Quick stats to display | No |
| `back_link` | Link | Back to case studies link | No |

**Quick Stats Nested Block Schema:**
- `value` (Text): Stat value
- `label` (Text): Stat label

### Schema 4: CaseStudyDetail

Create a new component in Storyblok with the following fields:

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| `client_name` | Text | Client/company name | No |
| `client_logo` | Asset | Client logo image | No |
| `category` | Text | Project category | No |
| `project_date` | Date | Project completion date | No |
| `content` | Richtext | Main content body | No |
| `challenge` | Richtext | Challenge/problem section | No |
| `solution` | Richtext | Solution section | No |
| `project_images` | Assets (multi) | Gallery images | No |
| `results_metrics` | Blocks | Results and metrics | No |
| `technologies` | Text (multi) | Technologies used | No |
| `testimonial_text` | Textarea | Client testimonial quote | No |
| `testimonial_author` | Text | Testimonial author name | No |
| `testimonial_role` | Text | Author's role/position | No |
| `project_url` | Link | Link to live project | No |

**Results Metrics Nested Block Schema:**
- `value` (Text): Metric value (e.g., "250%", "10x")
- `label` (Text): Metric label (e.g., "Traffic Increase")
- `description` (Text, optional): Additional details

## Creating Content in Storyblok

### Step 1: Create the Case Studies Landing Page

1. In Storyblok, create a new story at the root level
2. Name it "case-studies"
3. Set the content type to "Page"
4. In the body, add a "CaseStudyGrid" component
5. Configure the grid settings (title, description, badge)
6. Add multiple "CaseStudyCard" components within the grid
7. For each card, provide:
   - Title and excerpt
   - Featured image
   - Client name and category
   - Tags
   - Key metrics (2-3 recommended)
   - Link to the detailed page (use Storyblok's link field)

### Step 2: Create Individual Case Study Pages (Static Stories)

1. Create a new folder called "case-studies" in Storyblok (if not already created)
2. For each case study:
   - Create a new story inside the "case-studies" folder
   - Name it with a URL-friendly slug (e.g., "ecommerce-platform-redesign")
   - Set the content type to "Page"
   - The slug you enter will be the URL path (e.g., slug "ecommerce-redesign" → `/en/case-studies/ecommerce-redesign`)
   - In the body, add:
     - "CaseStudyHero" component (optional but recommended)
     - "CaseStudyDetail" component
   - Fill in all relevant fields
   - **Important**: Publish the story to generate the static page

**Static Generation Benefits:**
- Each story creates a static HTML page at build time
- Better SEO as search engines can index all pages
- Faster page loads with no server rendering
- All pages generated during `npm run build`

**How it Works:**
This project uses explicit page routes with a convenient template system:

1. A template folder (`_template-case-study`) is provided
2. Copy the template folder and rename it to match your case study slug
3. Update one constant (`CASE_STUDY_SLUG`) in the page.tsx file
4. Build the site - the page is generated as static HTML

**Template Location:** `app/[lang]/case-studies/_template-case-study/`

**Step-by-step:**
```bash
# 1. Copy the template
cp -r app/[lang]/case-studies/_template-case-study app/[lang]/case-studies/my-project

# 2. Edit app/[lang]/case-studies/my-project/page.tsx
# Change: const CASE_STUDY_SLUG = 'example-project'
# To:     const CASE_STUDY_SLUG = 'my-project'

# 3. Build
npm run build
```

**Result:** Static HTML page at `/en/case-studies/my-project` with perfect SEO

See `app/[lang]/case-studies/README.md` for detailed instructions.

### Step 3: Link Cards to Detail Pages

In each CaseStudyCard within the CaseStudyGrid:
1. Use the "link" field
2. Select "Story" as the link type
3. Choose the corresponding case study story from the case-studies folder
4. Storyblok will automatically generate the correct URL

## Example Content Structure

```
Storyblok Content Tree:
├── home
├── about
├── case-studies (story - landing page at /case-studies)
│   └── Body:
│       └── CaseStudyGrid
│           ├── CaseStudyCard → links to case-studies/project-1
│           ├── CaseStudyCard → links to case-studies/project-2
│           └── CaseStudyCard → links to case-studies/project-3
└── case-studies/ (folder)
    ├── project-1 (story → generates static page at /case-studies/project-1)
    │   └── Body:
    │       ├── CaseStudyHero
    │       └── CaseStudyDetail
    ├── project-2 (story → generates static page at /case-studies/project-2)
    │   └── Body:
    │       ├── CaseStudyHero
    │       └── CaseStudyDetail
    └── project-3 (story → generates static page at /case-studies/project-3)
        └── Body:
            ├── CaseStudyHero
            └── CaseStudyDetail
```

**Important**: Each story in the case-studies folder becomes a separate static page. When you run `npm run build`, Next.js will generate static HTML for each story, ensuring optimal SEO and performance.

## SEO Configuration

Both the landing page and individual case study pages support full SEO configuration:

1. Add an "SEO" component to the page body (it's hidden but editable)
2. Configure:
   - Page title and description
   - Open Graph tags for social sharing
   - Twitter Card settings
   - Custom meta tags

## Multilingual Support

The case study system fully supports multilingual content:

1. Translate the case-studies landing page for each language
2. Translate individual case study stories
3. The routing system automatically handles language prefixes
4. Use Storyblok's translation workflow to manage translations

## Best Practices

### Images
- Use high-quality images (1200x800px or larger)
- Optimize images before uploading
- Always add alt text for accessibility

### Content
- Keep excerpts concise (100-150 characters)
- Use clear, benefit-focused titles
- Highlight specific metrics and results
- Include client testimonials when possible

### Metrics
- Use specific numbers (150% vs "significant increase")
- Focus on business outcomes
- Include time context (e.g., "in 6 months")

### Categories
- Keep categories consistent across case studies
- Use 4-6 main categories
- Consider your target audience's perspective

### Tags
- Use technology names (React, Next.js, etc.)
- Include service types (Web Development, UI/UX Design)
- Limit to 5-7 tags per case study

## Styling Customization

All components use Tailwind CSS classes and can be customized by editing the component files:

- **Colors**: Modify the color classes (bg-blue-600, text-gray-900, etc.)
- **Spacing**: Adjust padding and margin classes (p-6, mb-4, etc.)
- **Typography**: Change font sizes and weights (text-2xl, font-bold, etc.)
- **Animations**: Customize hover effects and transitions

## Troubleshooting

### Case study cards not linking correctly
- Verify the link field in CaseStudyCard points to the correct story
- Check that the case study stories are published
- The link should use Storyblok's internal link (Story type), not URL
- Storyblok will automatically generate the correct path

### 404 on case study detail pages
- Ensure the story is published in Storyblok
- Verify the story is inside the "case-studies" folder
- Check the slug is URL-friendly (lowercase, hyphens, no spaces)
- Run `npm run build` to generate static pages
- In development, pages are generated on-demand

### Images not displaying
- Verify images are uploaded to Storyblok
- Check image URLs are accessible
- Ensure alt text is provided

### Metrics not showing
- Verify the nested blocks are added correctly
- Check that value and label fields are populated
- Review the component schema in Storyblok

### Filters not working
- Note: The current implementation shows filter UI only
- To add functional filtering, you'll need to implement client-side filtering logic
- Consider using URL parameters for filter state

### Static pages not generating
- Run `npm run build` to generate all static pages
- Check Storyblok stories are published (not in draft)
- Verify your Storyblok access token is configured
- Check the build logs for any errors

## Future Enhancements

Potential improvements to consider:

1. **Functional Filtering**: Add client-side or server-side filtering
2. **Pagination**: Support for large numbers of case studies
3. **Search**: Add search functionality
4. **Related Case Studies**: Show related projects on detail pages
5. **Social Sharing**: Add share buttons for social media
6. **Print Styles**: Optimize case studies for printing
7. **PDF Export**: Generate PDF versions of case studies
8. **Analytics**: Track case study views and interactions

## Support

For issues or questions:
1. Check the component files in `/components/blocks/`
2. Review type definitions in `/lib/types.ts`
3. Consult Storyblok documentation for CMS-specific questions
4. Check the Next.js documentation for routing issues
