# Service Storyblok Component Schemas

This document provides detailed JSON schemas for importing into Storyblok or as a reference for manual setup.

## Component 1: service_card

```json
{
  "name": "service_card",
  "display_name": "Service Card",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0,
      "required": true,
      "description": "Service name (e.g., Web Development)"
    },
    "excerpt": {
      "type": "textarea",
      "pos": 1,
      "required": true,
      "description": "Brief service description (100-150 characters)"
    },
    "featured_image": {
      "type": "asset",
      "pos": 2,
      "required": true,
      "filetypes": ["images"],
      "description": "Service featured image"
    },
    "icon": {
      "type": "asset",
      "pos": 3,
      "filetypes": ["images"],
      "description": "Service icon (optional, displays with title)"
    },
    "category": {
      "type": "text",
      "pos": 4,
      "description": "Service category (e.g., Development, Design)"
    },
    "tags": {
      "type": "text",
      "pos": 5,
      "description": "Comma-separated tags (e.g., React, TypeScript)",
      "translatable": true
    },
    "pricing_preview": {
      "type": "text",
      "pos": 6,
      "description": "Price preview (e.g., From $5,000)"
    },
    "key_features": {
      "type": "textarea",
      "pos": 7,
      "description": "Key features (one per line, max 5)",
      "max_length": 500
    },
    "link": {
      "type": "multilink",
      "pos": 8,
      "required": true,
      "description": "Link to service detail page"
    },
    "is_popular": {
      "type": "boolean",
      "pos": 9,
      "default_value": false,
      "description": "Show popular badge"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Services"
}
```

## Component 2: service_grid

```json
{
  "name": "service_grid",
  "display_name": "Service Grid",
  "schema": {
    "badge_text": {
      "type": "text",
      "pos": 0,
      "description": "Badge text (e.g., What We Offer, Our Services)"
    },
    "title": {
      "type": "text",
      "pos": 1,
      "default_value": "Our Services",
      "description": "Main section title"
    },
    "description": {
      "type": "textarea",
      "pos": 2,
      "description": "Section description"
    },
    "services": {
      "type": "bloks",
      "pos": 3,
      "required": true,
      "restrict_components": true,
      "component_whitelist": ["service_card"],
      "description": "Add service cards"
    },
    "columns": {
      "type": "number",
      "pos": 4,
      "default_value": "3",
      "description": "Grid columns (1-4)"
    },
    "show_filters": {
      "type": "boolean",
      "pos": 5,
      "default_value": false,
      "description": "Show category filter tabs (UI only)"
    },
    "filter_categories": {
      "type": "text",
      "pos": 6,
      "description": "Comma-separated filter categories"
    },
    "cta_text": {
      "type": "text",
      "pos": 7,
      "description": "Call-to-action heading"
    },
    "cta_link": {
      "type": "multilink",
      "pos": 8,
      "description": "Call-to-action link"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Services"
}
```

## Component 3: service_hero

```json
{
  "name": "service_hero",
  "display_name": "Service Hero",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0,
      "required": true,
      "description": "Service title"
    },
    "summary": {
      "type": "textarea",
      "pos": 1,
      "description": "Brief service summary (20-30 words)"
    },
    "featured_image": {
      "type": "asset",
      "pos": 2,
      "filetypes": ["images"],
      "description": "Hero image"
    },
    "category": {
      "type": "text",
      "pos": 3,
      "description": "Service category"
    },
    "pricing_preview": {
      "type": "text",
      "pos": 4,
      "description": "Starting price (e.g., From $5,000)"
    },
    "duration": {
      "type": "text",
      "pos": 5,
      "description": "Project timeline (e.g., 4-8 weeks)"
    },
    "quick_features": {
      "type": "textarea",
      "pos": 6,
      "description": "Quick features list (one per line, 4-6 items)",
      "max_length": 500
    },
    "back_link": {
      "type": "multilink",
      "pos": 7,
      "description": "Back to services link",
      "default_value": {
        "linktype": "story",
        "cached_url": "services"
      }
    },
    "cta_text": {
      "type": "text",
      "pos": 8,
      "description": "CTA button text (e.g., Get Started)"
    },
    "cta_link": {
      "type": "multilink",
      "pos": 9,
      "description": "CTA button link"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Services"
}
```

## Component 4: service_process_step (Helper Component)

```json
{
  "name": "service_process_step",
  "display_name": "Service Process Step",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0,
      "required": true,
      "description": "Step title (e.g., Discovery & Planning)"
    },
    "description": {
      "type": "textarea",
      "pos": 1,
      "required": true,
      "description": "Step description"
    },
    "duration": {
      "type": "text",
      "pos": 2,
      "description": "Step duration (e.g., 1 week)"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Services"
}
```

## Component 5: service_pricing_tier (Helper Component)

```json
{
  "name": "service_pricing_tier",
  "display_name": "Service Pricing Tier",
  "schema": {
    "name": {
      "type": "text",
      "pos": 0,
      "required": true,
      "description": "Tier name (e.g., Basic, Professional, Enterprise)"
    },
    "price": {
      "type": "text",
      "pos": 1,
      "required": true,
      "description": "Price amount (e.g., $5,000)"
    },
    "currency": {
      "type": "text",
      "pos": 2,
      "description": "Currency (e.g., USD)"
    },
    "duration": {
      "type": "text",
      "pos": 3,
      "description": "Billing period (e.g., one-time, per month)"
    },
    "description": {
      "type": "text",
      "pos": 4,
      "description": "Tier description (e.g., Perfect for startups)"
    },
    "features": {
      "type": "textarea",
      "pos": 5,
      "description": "Included features (one per line)",
      "max_length": 500
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Services"
}
```

## Component 6: service_detail

```json
{
  "name": "service_detail",
  "display_name": "Service Detail",
  "schema": {
    "category": {
      "type": "text",
      "pos": 0,
      "description": "Service category"
    },
    "overview": {
      "type": "richtext",
      "pos": 1,
      "description": "Service overview (200-300 words)"
    },
    "what_you_get_title": {
      "type": "text",
      "pos": 2,
      "default_value": "What You'll Get",
      "description": "Section title for deliverables"
    },
    "what_you_get": {
      "type": "textarea",
      "pos": 3,
      "description": "List of deliverables/features (one per line, 6-10 items)",
      "max_length": 1000
    },
    "process_title": {
      "type": "text",
      "pos": 4,
      "default_value": "Our Process",
      "description": "Process section title"
    },
    "process_steps": {
      "type": "bloks",
      "pos": 5,
      "restrict_components": true,
      "component_whitelist": ["service_process_step"],
      "description": "Process steps (4-6 recommended)"
    },
    "technologies": {
      "type": "text",
      "pos": 6,
      "description": "Comma-separated technologies used"
    },
    "pricing_tiers": {
      "type": "bloks",
      "pos": 7,
      "restrict_components": true,
      "component_whitelist": ["service_pricing_tier"],
      "description": "Pricing tiers (2-4 recommended)"
    },
    "cta_section_title": {
      "type": "text",
      "pos": 8,
      "description": "CTA section title"
    },
    "cta_section_text": {
      "type": "textarea",
      "pos": 9,
      "description": "CTA section description"
    },
    "cta_button_text": {
      "type": "text",
      "pos": 10,
      "description": "CTA button text"
    },
    "cta_button_link": {
      "type": "multilink",
      "pos": 11,
      "description": "CTA button link"
    },
    "related_services": {
      "type": "bloks",
      "pos": 12,
      "restrict_components": true,
      "component_whitelist": ["service_card"],
      "description": "Related services (3 recommended)"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Services"
}
```

## Quick Setup Instructions

### Method 1: Manual Setup in Storyblok

1. Go to your Storyblok space
2. Navigate to "Components" in the sidebar
3. Click "New" to create a new component
4. Follow the schema above for each component
5. Create components in this order:
   - `service_process_step` (helper)
   - `service_pricing_tier` (helper)
   - `service_card`
   - `service_grid`
   - `service_hero`
   - `service_detail`

### Method 2: Using Storyblok CLI (Advanced)

If you have the Storyblok CLI installed, you can import these schemas programmatically.

1. Save each schema to separate JSON files
2. Use the Storyblok CLI to push components:
   ```bash
   storyblok push-components ./components --space YOUR_SPACE_ID
   ```

### Method 3: Storyblok Management API

Use the Storyblok Management API to programmatically create these components. Reference: https://www.storyblok.com/docs/api/management

## Field Type Reference

For manual setup, here's a quick reference of Storyblok field types:

| Type | Description | Example Use |
|------|-------------|-------------|
| `text` | Single line text | Titles, names, short text |
| `textarea` | Multi-line text | Descriptions, excerpts |
| `richtext` | Rich text editor | Long-form content |
| `asset` | Single file/image | Featured images, icons |
| `multilink` | Link to URL/Story/Asset | Navigation links, CTAs |
| `bloks` | Nested components | Repeatable sections |
| `boolean` | True/false toggle | Feature flags |
| `number` | Numeric input | Grid columns, counts |
| `textarea` | Multi-line text | Lists (one item per line) |

## Component Groups

All service components are organized under the "Services" group in Storyblok for easy navigation.

## Validation Rules

Recommended validation rules for fields:

- **title**: Required, max length 100 characters
- **excerpt**: Max length 200 characters
- **tags**: Max length 150 characters (for comma-separated list)
- **key_features**: Max 5 items (one per line)
- **quick_features**: 4-6 items (one per line)
- **what_you_get**: 6-10 items (one per line)
- **process_steps**: 4-6 steps recommended
- **pricing_tiers**: 2-4 tiers recommended

## Default Values

Suggested default values:

- `service_grid.title`: "Our Services"
- `service_grid.columns`: 3
- `service_grid.show_filters`: false
- `service_hero.back_link`: Link to "services" story
- `service_detail.what_you_get_title`: "What You'll Get"
- `service_detail.process_title`: "Our Process"

## Translatable Fields

For multilingual sites, mark these fields as translatable:

- All `text` and `textarea` fields
- `richtext` fields
- `tags` and category fields
- Button text and descriptions

## Preview Configuration

For optimal editing experience in Storyblok:

1. Set up real-time preview in your space settings
2. Configure preview URLs:
   - Services List: `https://your-domain.com/[lang]/services`
   - Service Detail: `https://your-domain.com/[lang]/services/[slug]`
3. Enable visual editor for all components

## Content Guidelines

### Service Card Best Practices

- **Title**: 3-5 words, clear and descriptive
- **Excerpt**: 100-150 characters, benefit-focused
- **Features**: 3-5 key points
- **Pricing**: Use consistent format (e.g., "From $X,XXX")
- **Tags**: 3-5 relevant tags
- **Images**: High-quality, minimum 1200x800px

### Service Detail Best Practices

- **Hero Summary**: 20-30 words, compelling
- **Overview**: 200-300 words, benefit-driven
- **What You Get**: 6-10 clear deliverables
- **Process**: 4-6 clear, sequential steps
- **Pricing Tiers**: 2-4 tiers with clear differentiation
- **Technologies**: 5-10 relevant technologies

**Note**: For FAQs, use the separate `faq` component that can be added to any page.

## Example Content Structure

### Service Listing Page Story

```
Story: services-landing-page
Content Type: page
Body:
  - service_grid
    - badge_text: "What We Offer"
    - title: "Our Services"
    - description: "Comprehensive digital solutions for your business"
    - columns: 3
    - services:
      - service_card (Web Development)
      - service_card (Mobile App Development)
      - service_card (E-commerce Solutions)
    - cta_text: "Need a Custom Solution?"
    - cta_link: /contact
```

### Service Detail Page Story

```
Story: services/web-development
Content Type: page
Body:
  - service_hero
    - title: "Web Development Services"
    - summary: "Professional web applications that drive business growth"
    - pricing_preview: "From $5,000"
    - duration: "4-8 weeks"
    - quick_features: ["Responsive Design", "SEO Optimized", "Fast Performance"]
    - cta_text: "Get Started"
    - cta_link: /contact
  
  - service_detail
    - overview: [Rich text content]
    - what_you_get: ["Custom Design", "Responsive Layout", "Admin Dashboard"]
    - process_steps:
      - service_process_step (Discovery)
      - service_process_step (Design)
      - service_process_step (Development)
      - service_process_step (Testing)
    - pricing_tiers:
      - service_pricing_tier (Basic)
      - service_pricing_tier (Professional)
      - service_pricing_tier (Enterprise)
  
  - faq (Use the separate FAQ component)
    - faq_title: "Frequently Asked Questions"
    - faqs: [FAQ items from the global FAQ component]
```

## Testing Your Setup

After creating the components:

1. Create a test "services-landing-page" story
2. Add a `service_grid` component
3. Add 2-3 `service_card` components within the grid
4. Create a test service story in the "services" folder
5. Add `service_hero` and `service_detail` components
6. Preview the pages to verify everything renders correctly

## Common Issues

### Components not appearing in the component list
- Ensure components are created and saved
- Check that `is_nestable` is set correctly
- Verify component names match exactly (case-sensitive)

### Nested blocks not working
- Check `component_whitelist` settings
- Ensure helper components are created first
- Verify `restrict_components` is set to true

### Images not displaying
- Verify the `filetypes` setting is set to `["images"]`
- Check that assets are uploaded correctly
- Ensure Next.js image domains are configured

### Options field not working
- Set `source` to "custom"
- Options will be entered when adding content
- Use comma-separated values for multiple selections

## Styling Guidelines

### Color Palette
- Primary: Blue (#2563EB)
- Secondary: Purple (#7C3AED)
- Gradient: `from-blue-600 via-purple-600 to-blue-800`
- Success: Green (#10B981)
- Text: Gray-900 (#111827)

### Typography
- Headings: Font-bold, responsive sizes
- Body: Font-normal, comfortable line-height
- Small text: text-sm, text-xs

### Spacing
- Section padding: py-16 md:py-24
- Card padding: p-6, p-8
- Grid gap: gap-4, gap-6, gap-8

## Integration with Code

These schemas match the TypeScript interfaces in:
- `/lib/types.ts` - Type definitions
- `/components/blocks/services/` - React components
- `/lib/blocks.tsx` - Component registration

## Using Textarea Fields for Lists

Several fields use `textarea` type for entering lists (e.g., `key_features`, `quick_features`, `what_you_get`):

**How to enter values:**
1. Open the field in Storyblok
2. Enter one item per line
3. Press Enter/Return after each item
4. Empty lines are automatically filtered out

**Example:**
```
Responsive Design
SEO Optimized
Fast Performance
Mobile-First Approach
24/7 Support
```

This will render as a bullet list with checkmarks in the UI.

## Additional Resources

- [Storyblok Component Documentation](https://www.storyblok.com/docs/guide/essentials/content-structures)
- [Storyblok Field Types](https://www.storyblok.com/docs/schema-configuration)
- [Next.js Documentation](https://nextjs.org/docs)
- Service Quick Start Guide: `./SERVICE_QUICK_START.md`
- Service System Overview: `./README_SERVICES.md`
