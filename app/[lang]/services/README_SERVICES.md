# Services System

A comprehensive services management system with listing and detail pages, fully integrated with Storyblok CMS.

## 📁 Directory Structure

```
app/[lang]/services/
├── page.tsx                    # Services listing page
├── _template-service/          # Template for creating new service pages
│   └── page.tsx
├── web-development/            # Example service detail page
│   └── page.tsx
├── README_SERVICES.md          # This file
├── SERVICE_QUICK_START.md      # Quick start guide
└── SERVICE_SCHEMAS.md          # Storyblok schema definitions
```

## 🎯 Features

### Service Listing Page
- **Hero Section**: Eye-catching gradient header (same as blog listing)
- **Service Grid**: Responsive grid layout (1/2/3 columns)
- **Service Cards**: Interactive cards with:
  - Featured image
  - Icon
  - Title & excerpt
  - Key features
  - Tags
  - Pricing preview
  - Popular badge
- **Filtering**: Category-based filtering (UI ready)
- **CTA Section**: Call-to-action at the bottom

### Service Detail Pages
- **Hero Section**: Full-width hero with:
  - Title & summary
  - Category badge
  - Quick features list
  - Pricing & duration
  - CTA button
  - Featured image
- **Overview Section**: Rich text overview
- **What You Get**: Grid of features/deliverables
- **Process Steps**: Visual step-by-step process
- **Pricing Tiers**: Multiple pricing options
- **Technologies**: Tech stack display
- **Related Services**: Service recommendations
- **CTA Section**: Bottom call-to-action

**Note**: For FAQs, use the separate `faq` component that can be added to the page as needed.

## 🚀 Quick Start

### 1. Create Service Listing Page in Storyblok

1. Navigate to Storyblok
2. Create a new story: `services-landing-page`
3. Set the content type to: `page`
4. Add a `service_grid` component with:
   - Title: "Our Services"
   - Description: "Explore our comprehensive range of services"
   - Badge text: "What We Offer"
   - Services: Add multiple `service_card` components

### 2. Create Individual Service Pages

1. Copy the template directory:
   ```bash
   cp -r app/[lang]/services/_template-service app/[lang]/services/web-development
   ```

2. Update the `STORY_SLUG` in `page.tsx`:
   ```typescript
   const STORY_SLUG = 'services/web-development'
   ```

3. Create the corresponding story in Storyblok:
   - Path: `services/web-development`
   - Content type: `page`
   - Add `service_hero` and `service_detail` components

### 3. Configure Service Card

Each service card should have:
- **Title**: Service name
- **Excerpt**: Brief description
- **Featured Image**: Service image
- **Icon**: (Optional) Service icon
- **Category**: Service category
- **Tags**: Comma-separated or array
- **Pricing Preview**: "From $X,XXX"
- **Key Features**: Array of main features
- **Link**: Link to detail page
- **Is Popular**: Toggle for popular badge

## 🎨 Styling

The services system uses the same gradient header as the blog:
- Gradient: `from-blue-600 via-purple-600 to-blue-800`
- Background pattern for visual depth
- Consistent with blog and case study UX

## 📝 Content Types

### Service Card
- Used in: Service listing page
- Component: `service_card`
- Purpose: Preview card in grid

### Service Grid
- Used in: Service listing page
- Component: `service_grid`
- Purpose: Container for service cards

### Service Hero
- Used in: Service detail page (top)
- Component: `service_hero`
- Purpose: Hero section for detail page

### Service Detail
- Used in: Service detail page (main content)
- Component: `service_detail`
- Purpose: Main content and sections

## 🔗 Related Documentation

- [Quick Start Guide](./SERVICE_QUICK_START.md) - Step-by-step setup
- [Schema Definitions](./SERVICE_SCHEMAS.md) - Storyblok schemas
- [Blog System](../blog/README_BLOG.md) - Similar pattern
- [Case Study System](../case-studies/README_CASE_STUDIES.md) - Similar pattern

## 💡 Tips

1. **Consistent Slugs**: Keep Storyblok slugs and directory names in sync
2. **SEO**: Configure page-level SEO in each service story
3. **Images**: Use high-quality images (min 1200x800px)
4. **Pricing**: Keep pricing format consistent
5. **Categories**: Use consistent category names for filtering

## 🛠️ Customization

### Grid Columns
Adjust columns in `ServiceGrid`:
```typescript
const gridColumns = blok.columns || 3  // Change default
```

### Card Height
All cards have `h-full` for equal heights

### Colors
Primary gradient: Blue → Purple → Blue
Accent: Blue-600, Purple-600

## 📊 Examples

### Example Service Cards
- Web Development
- Mobile App Development
- E-commerce Solutions
- Branding & Design
- SEO & Marketing
- Consulting Services

### Example Categories
- Development
- Design
- Marketing
- Consulting
- Support

## 🎯 Best Practices

1. **Service Pages**: Create one page per service
2. **Content**: Keep excerpts under 150 characters
3. **Features**: Highlight 3-5 key features per service
4. **Process**: Show 4-6 clear steps
5. **Pricing**: Be transparent about pricing tiers
6. **CTAs**: Use action-oriented language
7. **FAQs**: Address common questions upfront

## 🔄 Updates

When updating services:
1. Edit in Storyblok (draft mode)
2. Preview changes
3. Publish when ready
4. Cache auto-refreshes (1 hour)

For immediate updates, use the revalidation API:
```bash
POST /api/revalidate?secret=YOUR_SECRET&path=/services
```

