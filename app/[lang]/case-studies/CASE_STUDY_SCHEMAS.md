# Case Study Storyblok Component Schemas

This document provides detailed JSON schemas for importing into Storyblok or as a reference for manual setup.

## Component 1: case_study_card

```json
{
  "name": "case_study_card",
  "display_name": "Case Study Card",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0,
      "required": true,
      "description": "Case study title"
    },
    "excerpt": {
      "type": "textarea",
      "pos": 1,
      "description": "Brief description (2-3 sentences)"
    },
    "featured_image": {
      "type": "asset",
      "pos": 2,
      "filetypes": ["images"],
      "description": "Featured image for the card"
    },
    "client_name": {
      "type": "text",
      "pos": 3,
      "description": "Client or company name"
    },
    "category": {
      "type": "text",
      "pos": 4,
      "description": "Project category (e.g., E-commerce, Mobile App)"
    },
    "tags": {
      "type": "text",
      "pos": 5,
      "description": "Comma-separated tags",
      "translatable": true
    },
    "key_metrics": {
      "type": "bloks",
      "pos": 6,
      "restrict_components": true,
      "component_whitelist": ["metric_item"],
      "description": "Key metrics to display (max 2-3 recommended)"
    },
    "link": {
      "type": "multilink",
      "pos": 7,
      "description": "Link to detailed case study page"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Case Studies"
}
```

## Component 2: metric_item (Helper Component)

```json
{
  "name": "metric_item",
  "display_name": "Metric Item",
  "schema": {
    "value": {
      "type": "text",
      "pos": 0,
      "required": true,
      "description": "Metric value (e.g., 150%, $2M, 10x)"
    },
    "label": {
      "type": "text",
      "pos": 1,
      "required": true,
      "description": "Metric label (e.g., ROI Increase, Revenue)"
    },
    "description": {
      "type": "text",
      "pos": 2,
      "description": "Additional context (optional)"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Case Studies"
}
```

## Component 3: stat_item (Helper Component)

```json
{
  "name": "stat_item",
  "display_name": "Stat Item",
  "schema": {
    "value": {
      "type": "text",
      "pos": 0,
      "required": true,
      "description": "Stat value"
    },
    "label": {
      "type": "text",
      "pos": 1,
      "required": true,
      "description": "Stat label"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Case Studies"
}
```

## Component 4: case_study_grid

```json
{
  "name": "case_study_grid",
  "display_name": "Case Study Grid",
  "schema": {
    "badge_text": {
      "type": "text",
      "pos": 0,
      "description": "Badge text (e.g., Our Work, Success Stories)"
    },
    "title": {
      "type": "text",
      "pos": 1,
      "default_value": "Our Case Studies",
      "description": "Main section title"
    },
    "description": {
      "type": "textarea",
      "pos": 2,
      "description": "Section description"
    },
    "case_studies": {
      "type": "bloks",
      "pos": 3,
      "restrict_components": true,
      "component_whitelist": ["case_study_card"],
      "description": "Add case study cards"
    },
    "show_filters": {
      "type": "boolean",
      "pos": 4,
      "default_value": false,
      "description": "Show category filter tabs (UI only)"
    },
    "filter_categories": {
      "type": "text",
      "pos": 5,
      "description": "Comma-separated filter categories"
    },
    "cta_text": {
      "type": "text",
      "pos": 6,
      "description": "Call-to-action button text"
    },
    "cta_link": {
      "type": "multilink",
      "pos": 7,
      "description": "Call-to-action button link"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Case Studies"
}
```

## Component 5: case_study_hero

```json
{
  "name": "case_study_hero",
  "display_name": "Case Study Hero",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0,
      "required": true,
      "description": "Case study title"
    },
    "summary": {
      "type": "textarea",
      "pos": 1,
      "description": "Brief summary or tagline"
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
      "description": "Project category"
    },
    "client_name": {
      "type": "text",
      "pos": 4,
      "description": "Client name"
    },
    "industry": {
      "type": "text",
      "pos": 5,
      "description": "Client industry"
    },
    "project_duration": {
      "type": "text",
      "pos": 6,
      "description": "Project duration (e.g., 3 months)"
    },
    "location": {
      "type": "text",
      "pos": 7,
      "description": "Project location"
    },
    "quick_stats": {
      "type": "bloks",
      "pos": 8,
      "restrict_components": true,
      "component_whitelist": ["stat_item"],
      "description": "Quick stats to display"
    },
    "back_link": {
      "type": "multilink",
      "pos": 9,
      "description": "Back to case studies link",
      "default_value": {
        "linktype": "story",
        "cached_url": "case-studies"
      }
    },
    "project_url": {
      "type": "multilink",
      "pos": 10,
      "description": "Link to live client project (secondary hero CTA)"
    },
    "primary_cta_text": {
      "type": "text",
      "pos": 11,
      "description": "Primary hero CTA label (defaults to Book a Free Consultation)"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Case Studies"
}
```

## Component 6: case_study_detail

```json
{
  "name": "case_study_detail",
  "display_name": "Case Study Detail",
  "schema": {
    "client_name": {
      "type": "text",
      "pos": 0,
      "description": "Client or company name"
    },
    "client_logo": {
      "type": "asset",
      "pos": 1,
      "filetypes": ["images"],
      "description": "Client logo"
    },
    "category": {
      "type": "text",
      "pos": 2,
      "description": "Project category"
    },
    "project_date": {
      "type": "text",
      "pos": 3,
      "description": "Project date (YYYY-MM format recommended)"
    },
    "content": {
      "type": "richtext",
      "pos": 4,
      "description": "Main content body"
    },
    "challenge": {
      "type": "richtext",
      "pos": 5,
      "description": "The challenge or problem section"
    },
    "solution": {
      "type": "richtext",
      "pos": 6,
      "description": "The solution section"
    },
    "outcome": {
      "type": "richtext",
      "pos": 7,
      "description": "Business outcome section (Problem → Solution → Outcome narrative)"
    },
    "project_images": {
      "type": "multiasset",
      "pos": 8,
      "filetypes": ["images"],
      "description": "Project gallery images"
    },
    "results_metrics": {
      "type": "bloks",
      "pos": 8,
      "restrict_components": true,
      "component_whitelist": ["metric_item"],
      "description": "Results and impact metrics"
    },
    "technologies": {
      "type": "text",
      "pos": 10,
      "description": "Comma-separated technologies used"
    },
    "service_links": {
      "type": "bloks",
      "pos": 11,
      "description": "Related service/product links (label + url)"
    },
    "testimonial_text": {
      "type": "textarea",
      "pos": 12,
      "description": "Client testimonial quote"
    },
    "testimonial_author": {
      "type": "text",
      "pos": 11,
      "description": "Testimonial author name"
    },
    "testimonial_role": {
      "type": "text",
      "pos": 12,
      "description": "Author's role or position"
    },
    "project_url": {
      "type": "multilink",
      "pos": 13,
      "description": "Link to live project"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Case Studies"
}
```

## Component 7: case_study_related

```json
{
  "name": "case_study_related",
  "display_name": "Case Study Related",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0,
      "default_value": "More success stories",
      "description": "Section heading"
    },
    "related_case_studies": {
      "type": "bloks",
      "pos": 1,
      "description": "Two sibling case study cards (title, excerpt, client_name, featured_image, link)"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Case Studies"
}
```

## Quick Setup Instructions

### Method 1: Manual Setup in Storyblok

1. Go to your Storyblok space
2. Navigate to "Components" in the sidebar
3. Click "New" to create a new component
4. Follow the schema above for each component
5. Create components in this order:
   - `metric_item` (helper)
   - `stat_item` (helper)
   - `case_study_card`
   - `case_study_grid`
   - `case_study_hero`
   - `case_study_detail`

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
| `asset` | Single file/image | Featured images, logos |
| `multiasset` | Multiple files/images | Image galleries |
| `multilink` | Link to URL/Story/Asset | Navigation links, CTAs |
| `bloks` | Nested components | Repeatable sections |
| `boolean` | True/false toggle | Feature flags |

## Component Groups

All case study components are organized under the "Case Studies" group in Storyblok for easy navigation.

## Validation Rules

Recommended validation rules for fields:

- **title**: Required, max length 100 characters
- **excerpt**: Max length 200 characters
- **tags**: Max length 150 characters (for comma-separated list)
- **value** (in metrics): Required
- **label** (in metrics): Required

## Default Values

Suggested default values:

- `case_study_grid.title`: "Our Case Studies"
- `case_study_grid.show_filters`: false
- `case_study_hero.back_link`: Link to "case-studies" story

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
   - Case Studies List: `https://your-domain.com/[lang]/case-studies`
   - Case Study Detail: `https://your-domain.com/[lang]/case-studies/[slug]`
3. Enable visual editor for all components

## Testing Your Setup

After creating the components:

1. Create a test "case-studies" story
2. Add a `case_study_grid` component
3. Add 2-3 `case_study_card` components within the grid
4. Create a test case study story in the "case-studies" folder
5. Add `case_study_hero` and `case_study_detail` components
6. Preview the pages to verify everything renders correctly

## Common Issues

### Components not appearing in the component list
- Ensure components are created and saved
- Check that `is_nestable` is set correctly
- Verify component names match exactly

### Nested blocks not working
- Check `component_whitelist` settings
- Ensure helper components (`metric_item`, `stat_item`) are created first
- Verify `restrict_components` is set to true

### Images not displaying
- Verify the `filetypes` setting is set to `["images"]`
- Check that assets are uploaded correctly
- Ensure alt text is provided for accessibility
