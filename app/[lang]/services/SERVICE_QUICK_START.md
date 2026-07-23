# Services System - Quick Start Guide

Get your services pages up and running in minutes!

## 🎯 Goal

Create a beautiful services listing page with individual service detail pages, all managed through Storyblok CMS.

## 📋 Prerequisites

- Storyblok account and space configured
- Next.js app running locally
- Storyblok access token in `.env.local`

## 🚀 Step-by-Step Setup

### Step 1: Create Storyblok Components (One-Time Setup)

You need to create these components in Storyblok once:

#### 1.1 Service Card Component

1. Go to Storyblok → Components → Block Library
2. Click "New Component"
3. Name: `service_card`
4. Type: Nestable block
5. Add these fields:

```
- title (Text)
- excerpt (Textarea)
- featured_image (Asset - Single)
- icon (Asset - Single)
- category (Text)
- tags (Text | Multi-options - Options: Development, Design, Marketing, SEO, E-commerce, Consulting)
- pricing_preview (Text)
- key_features (Multi-options - Options: Custom options)
- link (Link)
- is_popular (Boolean)
```

#### 1.2 Service Grid Component

1. Create new component
2. Name: `service_grid`
3. Type: Nestable block
4. Add these fields:

```
- title (Text)
- description (Textarea)
- badge_text (Text)
- services (Blocks - Allowed: service_card)
- columns (Number - Default: 3)
- show_filters (Boolean)
- filter_categories (Text | Multi-options)
- cta_text (Text)
- cta_link (Link)
```

#### 1.3 Service Hero Component

1. Create new component
2. Name: `service_hero`
3. Type: Nestable block
4. Add these fields:

```
- title (Text - Required)
- summary (Textarea)
- featured_image (Asset - Single)
- category (Text)
- pricing_preview (Text)
- duration (Text)
- quick_features (Multi-options - Custom options)
- back_link (Link)
- cta_text (Text)
- cta_link (Link)
```

#### 1.4 Service Detail Component

1. Create new component
2. Name: `service_detail`
3. Type: Nestable block
4. Add these fields:

```
- category (Text)
- overview (Richtext)
- what_you_get_title (Text - Default: "What You'll Get")
- what_you_get (Multi-options - Custom options)
- process_title (Text)
- process_steps (Blocks - Create nested block for steps):
  * title (Text)
  * description (Textarea)
  * duration (Text)
- technologies (Text | Multi-options)
- pricing_tiers (Blocks - Create nested block):
  * name (Text)
  * price (Text)
  * currency (Text)
  * duration (Text)
  * description (Text)
  * features (Multi-options)
- cta_section_title (Text)
- cta_section_text (Textarea)
- cta_button_text (Text)
- cta_button_link (Link)

**Note**: For FAQs, use the separate `faq` component that can be added after the `service_detail` component.

**Important**: For fields like `key_features`, `quick_features`, and `what_you_get`, enter one item per line in the textarea:
```
Responsive Design
SEO Optimized
Fast Performance
```
```

### Step 2: Create Services Listing Page

#### 2.1 Create Story in Storyblok

1. Go to Content
2. Click "Create new" at root level
3. Name: `services-landing-page`
4. Slug: `services-landing-page`
5. Content type: Select `page`

#### 2.2 Configure Content

1. In the page body, click "Add block"
2. Select `service_grid`
3. Configure:
   - Title: "Our Services"
   - Description: "Comprehensive solutions for your business needs"
   - Badge text: "What We Offer"
   - Columns: 3
   - Show filters: true
   - Filter categories: "Development, Design, Marketing, Consulting"

#### 2.3 Add Service Cards

1. In the services field, click "Add block"
2. Select `service_card`
3. Fill in:
   - Title: "Web Development"
   - Excerpt: "Custom web applications built with cutting-edge technology"
   - Featured image: Upload image
   - Category: "Development"
   - Tags: "Next.js, React, TypeScript"
   - Pricing preview: "From $5,000"
   - Key features: ["Responsive Design", "SEO Optimized", "Fast Performance"]
   - Link: Internal link to service detail page
   - Is popular: true (optional)

4. Repeat for other services

#### 2.4 Add CTA

1. CTA text: "Need a Custom Solution?"
2. CTA link: Link to contact page

#### 2.5 Publish

Click "Publish" in the top-right corner

### Step 3: Create Service Detail Pages

#### 3.1 Create Service Detail Story

1. In Storyblok Content, create folder: `services`
2. Inside `services` folder, create story: `web-development`
3. Content type: `page`

#### 3.2 Add Service Hero

1. Add block: `service_hero`
2. Configure:
   - Title: "Web Development Services"
   - Summary: "Custom web applications that drive results"
   - Featured image: Upload image
   - Category: "Development"
   - Pricing preview: "From $5,000"
   - Duration: "4-8 weeks"
   - Quick features: ["Responsive Design", "SEO Optimized", "Fast Performance", "Mobile-First"]
   - Back link: `/services` (to listing page)
   - CTA text: "Get Started"
   - CTA link: `/contact`

#### 3.3 Add Service Detail

1. Add block: `service_detail`
2. Configure:
   - Overview: Rich text describing the service
   - What you get: ["Custom Design", "Mobile App", "Admin Panel", "API Integration", "Testing", "Deployment"]
   - Process steps: Add 4-6 steps
   - Technologies: "Next.js, React, TypeScript, Tailwind CSS, Node.js"
   - Pricing tiers: Add 2-3 pricing options
   - CTA section
3. (Optional) Add `faq` component for FAQs

#### 3.4 Publish

Save and publish the story

### Step 4: Create Page File (Code)

#### 4.1 Copy Template

```bash
cd app/[lang]/services
cp -r _template-service web-development
```

#### 4.2 Update STORY_SLUG

Edit `app/[lang]/services/web-development/page.tsx`:

```typescript
// Change this line:
const STORY_SLUG = 'services/web-development'
```

#### 4.3 Repeat for Other Services

For each service:
1. Copy template directory
2. Update STORY_SLUG
3. Create corresponding story in Storyblok

### Step 5: Test Everything

#### 5.1 Development Mode

```bash
npm run dev
```

Visit:
- http://localhost:3000/services (listing page)
- http://localhost:3000/services/web-development (detail page)

#### 5.2 Check Storyblok Visual Editor

1. Open story in Storyblok
2. Click "Open in Visual Editor"
3. Verify components render correctly
4. Test editing and live updates

### Step 6: Configure SEO (Optional)

For each page, add SEO component:
1. In Storyblok story, add `seo` component
2. Configure:
   - Title
   - Description
   - OG image
   - Keywords
   - etc.

## 🎨 Customization

### Change Grid Columns

In Storyblok, change the "columns" field in `service_grid`

### Change Colors

Edit the components in:
- `components/blocks/services/ServiceCard.tsx`
- `components/blocks/services/ServiceGrid.tsx`
- `components/blocks/services/ServiceHero.tsx`

### Add More Fields

1. Add field in Storyblok component schema
2. Update TypeScript interface in `lib/types.ts`
3. Use field in component

## 🐛 Troubleshooting

### Services don't show up
- Check STORY_SLUG matches Storyblok path exactly
- Verify story is published
- Check browser console for errors

### Images not loading
- Ensure images are uploaded to Storyblok
- Check image URL is valid
- Verify Next.js image domains in `next.config.ts`

### Styling issues
- Clear Next.js cache: `rm -rf .next`
- Restart dev server
- Check Tailwind classes are valid

### Storyblok not connecting
- Verify `NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN` in `.env.local`
- Check API token has correct permissions
- Confirm space region (EU/US) in `lib/blocks.tsx`

## 📚 Next Steps

- Add more services
- Customize styling
- Add filtering functionality
- Integrate with contact forms
- Add testimonials section
- Implement search functionality

## 🆘 Need Help?

- Check [README_SERVICES.md](./README_SERVICES.md)
- Review [SERVICE_SCHEMAS.md](./SERVICE_SCHEMAS.md)
- Look at example services in Storyblok
- Check console for errors

## ✅ Checklist

- [ ] Storyblok components created
- [ ] Service listing story created
- [ ] Service cards added
- [ ] Service detail stories created
- [ ] Page files created and configured
- [ ] SEO configured
- [ ] Tested in development
- [ ] Images optimized
- [ ] Content reviewed
- [ ] Ready to publish!

🎉 **Congratulations!** Your services system is ready to go!

