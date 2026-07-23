# Case Study System - Quick Start Guide

## 🎯 What You Get

A complete case study portfolio system with:
- **Landing page** with filterable grid of case studies
- **Detail pages** for individual case studies with rich content
- **4 Storyblok components** ready to use
- **Full multilingual support**
- **SEO optimization** built-in

## 📁 Files Created

### Components
```
components/blocks/
├── CaseStudyCard.tsx       # Preview card for listing page
├── CaseStudyGrid.tsx       # Main grid layout for landing page
├── CaseStudyHero.tsx       # Hero section for detail pages
└── CaseStudyDetail.tsx     # Full content for detail pages
```

### Routes
```
app/[lang]/
├── case-studies/
│   ├── page.tsx           # Landing page route
│   └── [slug]/
│       └── page.tsx       # Dynamic detail page route
```

### Types
```
lib/types.ts               # Updated with case study types
```

### Registration
```
lib/blocks.tsx          # Components registered
```

## 🚀 Quick Setup (5 Steps)

### Step 1: Create Components in Storyblok

Go to Storyblok → Components → Create these 6 components:

1. **metric_item** (helper component)
   - value (Text)
   - label (Text)
   - description (Text, optional)

2. **stat_item** (helper component)
   - value (Text)
   - label (Text)

3. **case_study_card**
   - title (Text)
   - excerpt (Textarea)
   - featured_image (Asset)
   - client_name (Text)
   - category (Text)
   - tags (Text)
   - key_metrics (Blocks → metric_item)
   - link (Link)

4. **case_study_grid**
   - badge_text (Text)
   - title (Text)
   - description (Textarea)
   - case_studies (Blocks → case_study_card)
   - show_filters (Boolean)
   - filter_categories (Text)
   - cta_text (Text)
   - cta_link (Link)

5. **case_study_hero**
   - title (Text)
   - summary (Textarea)
   - featured_image (Asset)
   - category (Text)
   - client_name (Text)
   - industry (Text)
   - project_duration (Text)
   - location (Text)
   - quick_stats (Blocks → stat_item)
   - back_link (Link)

6. **case_study_detail**
   - client_name (Text)
   - client_logo (Asset)
   - category (Text)
   - project_date (Text)
   - content (Richtext)
   - challenge (Richtext)
   - solution (Richtext)
   - project_images (Multi-asset)
   - results_metrics (Blocks → metric_item)
   - technologies (Text)
   - testimonial_text (Textarea)
   - testimonial_author (Text)
   - testimonial_role (Text)
   - project_url (Link)

📋 **Detailed schemas**: See `/docs/CASE_STUDY_SCHEMAS.md`

### Step 2: Create Landing Page

1. In Storyblok, create new story: **"case-studies"**
2. Content type: **Page**
3. Add to body: **case_study_grid** component
4. Configure:
   - Title: "Our Success Stories"
   - Description: "Explore our portfolio..."
   - Badge: "Our Work"
5. Add 3-6 **case_study_card** components inside the grid
6. **Publish**

### Step 3: Create Case Study Folder

1. In Storyblok, create folder: **"case-studies"**
2. This will hold all individual case studies

### Step 4: Create First Case Study in Storyblok

1. Inside "case-studies" folder, create new story: **"my-first-project"**
2. Content type: **Page**
3. The slug "my-first-project" will become the URL: `/en/case-studies/my-first-project`
4. Add to body:
   - **case_study_hero** (at the top)
   - **case_study_detail** (below hero)
5. Fill in the content
6. **Publish** (this makes it available for static generation)

### Step 4.5: Create the Page Route (Static HTML)

Now create the actual page file for perfect SEO:

```bash
# Copy the template folder
cp -r app/[lang]/case-studies/_template-case-study app/[lang]/case-studies/my-first-project

# Edit the new page.tsx file
# Change: const CASE_STUDY_SLUG = 'example-project'
# To:     const CASE_STUDY_SLUG = 'my-first-project'
```

Or manually:
1. Copy folder: `app/[lang]/case-studies/_template-case-study`
2. Rename to: `app/[lang]/case-studies/my-first-project`
3. Open `page.tsx` inside
4. Change line: `const CASE_STUDY_SLUG = 'my-first-project'`

**Why This Step?** This creates a static HTML page (not dynamic) for optimal SEO performance. Search engines can crawl and index the page instantly.

### Step 5: Link Card to Detail Page

1. Go back to the landing page (case-studies story)
2. Edit one **case_study_card** in the grid
3. In the **link** field:
   - Type: **Story** (not URL)
   - Select: **case-studies/my-first-project**
   - Storyblok will auto-generate the correct URL path
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
- Landing page: `http://localhost:3000/en/case-studies`
- Detail page: `http://localhost:3000/en/case-studies/my-first-project`

**For Production (Static HTML):**
```bash
# Generate all static pages
npm run build

# Test the production build
npm start
```

All case study pages will be pre-rendered as static HTML files. Check `.next/server/pages/` to see the generated HTML.

## 🎨 Component Overview

### CaseStudyGrid (Landing Page)
```
┌─────────────────────────────────────┐
│         Badge: "Our Work"           │
│   Title: "Our Success Stories"     │
│   Description: "Explore..."         │
│                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │ Card │  │ Card │  │ Card │     │
│  │  1   │  │  2   │  │  3   │     │
│  └──────┘  └──────┘  └──────┘     │
│                                     │
│      [Call to Action Button]       │
└─────────────────────────────────────┘
```

### CaseStudyCard
```
┌─────────────────────────┐
│  ┌──────────────────┐   │
│  │   Featured Image │   │ ← Category badge
│  └──────────────────┘   │
│  Client Name            │
│  Title                  │
│  Excerpt text...        │
│  [Tag] [Tag] [Tag]      │
│  ┌───────┬───────┐      │
│  │ 150%  │ $2M   │      │ ← Key metrics
│  │ ROI   │Revenue│      │
│  └───────┴───────┘      │
│  Read Case Study →      │
└─────────────────────────┘
```

### CaseStudyHero (Detail Page)
```
┌───────────────────────────────────────┐
│ ← Back to Case Studies                │
│ [Category Badge]                      │
│                                       │
│ Large Title                    ┌────┐│
│ Summary text...                │IMG ││
│                                └────┘│
│ Client: ABC Corp    Industry: Tech   │
│ Duration: 3 months  Location: UAE    │
│                                       │
│ 150%    $2M      50K                 │
│ ROI     Revenue  Users                │
└───────────────────────────────────────┘
```

### CaseStudyDetail (Detail Page Content)
```
┌─────────────────────────────────┐
│ Client Logo | Client Name       │
│ [Category] | Date               │
│                                 │
│ Main content...                 │
│                                 │
│ ┌─ The Challenge ─────────┐    │
│ │ Problem description...  │    │
│ └─────────────────────────┘    │
│                                 │
│ ┌─ Our Solution ──────────┐    │
│ │ Solution description... │    │
│ └─────────────────────────┘    │
│                                 │
│ Project Gallery                 │
│ [Img] [Img] [Img] [Img]        │
│                                 │
│ Results & Impact                │
│ ┌──────┬──────┬──────┐         │
│ │ 250% │ 10x  │ 98%  │         │
│ └──────┴──────┴──────┘         │
│                                 │
│ Technologies Used               │
│ [React] [Next.js] [AWS]        │
│                                 │
│ 💬 Client Testimonial           │
│ "Amazing results..."            │
│ - John Doe, CEO                 │
│                                 │
│ [Visit Live Project]            │
└─────────────────────────────────┘
```

## 📝 Content Guidelines

### Card Excerpts
- Keep under 150 characters
- Focus on the outcome
- Make it compelling

### Metrics
- Use specific numbers: "150%" not "significant"
- Include context: "in 6 months"
- Show business impact

### Images
- Minimum 1200x800px
- Optimize before upload
- Always add alt text

### Challenge/Solution
- Keep sections focused
- Use bullet points
- Highlight key points

## 🌍 Multilingual

The system supports all your configured languages automatically. Just translate:
1. The landing page story
2. Each case study story
3. Component content

URLs will be:
- English: `/en/case-studies/project-name`
- Arabic: `/ar/case-studies/project-name`

## 🔍 SEO

Add SEO component to any page:
1. Add **seo** component to page body
2. Configure title, description, OG tags
3. It's hidden but editable in Storyblok

## 🎨 Styling

All components use Tailwind CSS. To customize:

**Colors**: Change in component files
```tsx
bg-blue-600 → bg-purple-600
text-gray-900 → text-slate-900
```

**Spacing**:
```tsx
py-20 → py-12  (vertical padding)
gap-8 → gap-6  (grid gap)
```

## 📚 Full Documentation

- **Complete guide**: `/docs/features/CASE_STUDY_SYSTEM.md`
- **Storyblok schemas**: `/docs/CASE_STUDY_SCHEMAS.md`

## 🐛 Troubleshooting

**Cards not linking?**
- Check link field points to correct story
- Use "Story" type (not URL) in link field
- Verify story is published

**Images not showing?**
- Verify image uploaded to Storyblok
- Check image URL is accessible

**Page not found?**
- Create "case-studies" story at root level
- Publish the story

**Detail page 404?**
- Create case study inside "case-studies" folder
- Use URL-friendly slug (lowercase, hyphens only)
- Publish the story
- In production: Run `npm run build` to generate static pages

**Build not generating pages?**
- Check all stories are published (not draft)
- Verify Storyblok access token is set
- Check build logs for errors
- Ensure stories are in the correct folder structure

## 🚀 Next Steps

1. Add real content to your first case study
2. Create 5-10 case studies
3. Configure filters if needed
4. Set up analytics tracking
5. Share on social media

## 💡 Tips

- **Start simple**: Create 2-3 case studies first
- **Use real data**: Actual metrics are more compelling
- **Get testimonials**: Always ask clients for quotes
- **Update regularly**: Add new case studies monthly
- **Cross-promote**: Link from homepage

## 📞 Need Help?

Check these files:
- Component code: `/components/blocks/CaseStudy*.tsx`
- Type definitions: `/lib/types.ts`
- Routes: `/app/[lang]/case-studies/`

---

**Ready to showcase your success stories! 🎉**
