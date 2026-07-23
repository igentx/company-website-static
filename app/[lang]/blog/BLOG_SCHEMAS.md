# Blog Storyblok Component Schemas

This document provides detailed JSON schemas for importing into Storyblok or as a reference for manual setup.

## Component 1: blog_heading

```json
{
  "name": "blog_heading",
  "display_name": "Blog Heading",
  "schema": {
    "level": {
      "type": "text",
      "pos": 0,
      "description": "Heading level (h1, h2, h3, h4, h5, h6)"
    },
    "text": {
      "type": "text",
      "pos": 1,
      "required": true,
      "description": "Heading text content"
    },
    "alignment": {
      "type": "text",
      "pos": 2,
      "description": "Text alignment (left, center, right)"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Blog"
}
```

## Component 2: blog_body

```json
{
  "name": "blog_body",
  "display_name": "Blog Body",
  "schema": {
    "content": {
      "type": "richtext",
      "pos": 0,
      "description": "Rich text content with formatting"
    },
    "alignment": {
      "type": "text",
      "pos": 1,
      "description": "Text alignment (left, center, right)"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Blog"
}
```

## Component 3: blog_image

```json
{
  "name": "blog_image",
  "display_name": "Blog Image",
  "schema": {
    "image": {
      "type": "asset",
      "pos": 0,
      "required": true,
      "filetypes": ["images"],
      "description": "Blog image"
    },
    "caption": {
      "type": "text",
      "pos": 1,
      "description": "Image caption"
    },
    "width": {
      "type": "text",
      "pos": 2,
      "description": "Image width (full, large, medium, small)"
    },
    "alignment": {
      "type": "text",
      "pos": 3,
      "description": "Image alignment (left, center, right)"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Blog"
}
```

## Component 4: blog_quote

```json
{
  "name": "blog_quote",
  "display_name": "Blog Quote",
  "schema": {
    "text": {
      "type": "textarea",
      "pos": 0,
      "required": true,
      "description": "Quote text"
    },
    "author": {
      "type": "text",
      "pos": 1,
      "description": "Author name"
    },
    "author_role": {
      "type": "text",
      "pos": 2,
      "description": "Author role or title"
    },
    "background_color": {
      "type": "text",
      "pos": 3,
      "description": "Background color (Tailwind class)"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Blog"
}
```

## Component 5: blog_text_with_image

```json
{
  "name": "blog_text_with_image",
  "display_name": "Blog Text with Image",
  "schema": {
    "text": {
      "type": "richtext",
      "pos": 0,
      "description": "Text content"
    },
    "image": {
      "type": "asset",
      "pos": 1,
      "required": true,
      "filetypes": ["images"],
      "description": "Image asset"
    },
    "image_position": {
      "type": "text",
      "pos": 2,
      "description": "Image position (left, right)"
    },
    "background_color": {
      "type": "text",
      "pos": 3,
      "description": "Background color (Tailwind class)"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Blog"
}
```

## Component 6: blog_card

```json
{
  "name": "blog_card",
  "display_name": "Blog Card",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0,
      "required": true,
      "description": "Blog post title"
    },
    "excerpt": {
      "type": "textarea",
      "pos": 1,
      "required": true,
      "description": "Brief post summary"
    },
    "featured_image": {
      "type": "asset",
      "pos": 2,
      "required": true,
      "filetypes": ["images"],
      "description": "Featured image"
    },
    "author_name": {
      "type": "text",
      "pos": 3,
      "description": "Author name"
    },
    "publish_date": {
      "type": "text",
      "pos": 4,
      "description": "Publication date"
    },
    "category": {
      "type": "text",
      "pos": 5,
      "description": "Blog category"
    },
    "tags": {
      "type": "text",
      "pos": 6,
      "description": "Comma-separated tags"
    },
    "reading_time": {
      "type": "text",
      "pos": 7,
      "description": "Reading time (e.g., 5 min read)"
    },
    "link": {
      "type": "multilink",
      "pos": 8,
      "description": "Link to blog post"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Blog"
}
```

## Component 7: blog_grid

```json
{
  "name": "blog_grid",
  "display_name": "Blog Grid",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0,
      "description": "Section title"
    },
    "description": {
      "type": "textarea",
      "pos": 1,
      "description": "Section description"
    },
    "badge_text": {
      "type": "text",
      "pos": 2,
      "description": "Badge text"
    },
    "blogs": {
      "type": "bloks",
      "pos": 3,
      "restrict_components": true,
      "component_whitelist": ["blog_card"],
      "description": "Array of blog cards"
    },
    "columns": {
      "type": "text",
      "pos": 4,
      "description": "Number of columns (1-3)"
    },
    "show_filters": {
      "type": "boolean",
      "pos": 5,
      "description": "Show category filter tabs"
    },
    "filter_categories": {
      "type": "text",
      "pos": 6,
      "description": "Comma-separated filter categories"
    },
    "cta_text": {
      "type": "text",
      "pos": 7,
      "description": "Call-to-action text"
    },
    "cta_link": {
      "type": "multilink",
      "pos": 8,
      "description": "CTA link"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Blog"
}
```

## Component 8: blog_hero

```json
{
  "name": "blog_hero",
  "display_name": "Blog Hero",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0,
      "required": true,
      "description": "Blog post title"
    },
    "excerpt": {
      "type": "textarea",
      "pos": 1,
      "description": "Brief excerpt"
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
      "description": "Blog category"
    },
    "author_name": {
      "type": "text",
      "pos": 4,
      "description": "Author name"
    },
    "publish_date": {
      "type": "text",
      "pos": 5,
      "description": "Publication date"
    },
    "reading_time": {
      "type": "text",
      "pos": 6,
      "description": "Reading time"
    },
    "back_link": {
      "type": "multilink",
      "pos": 7,
      "description": "Back to blog link",
      "default_value": {
        "linktype": "story",
        "cached_url": "blog"
      }
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Blog"
}
```

## Component 9: blog_detail

```json
{
  "name": "blog_detail",
  "display_name": "Blog Detail",
  "schema": {
    "author_name": {
      "type": "text",
      "pos": 0,
      "description": "Author name"
    },
    "author_avatar": {
      "type": "asset",
      "pos": 1,
      "filetypes": ["images"],
      "description": "Author avatar"
    },
    "category": {
      "type": "text",
      "pos": 2,
      "description": "Blog category"
    },
    "publish_date": {
      "type": "text",
      "pos": 3,
      "description": "Publication date"
    },
    "updated_date": {
      "type": "text",
      "pos": 4,
      "description": "Last updated date"
    },
    "reading_time": {
      "type": "text",
      "pos": 5,
      "description": "Reading time"
    },
    "tags": {
      "type": "text",
      "pos": 6,
      "description": "Comma-separated tags"
    },
    "content_blocks": {
      "type": "bloks",
      "pos": 7,
      "restrict_components": true,
      "component_whitelist": ["blog_heading", "blog_body", "blog_image", "blog_quote", "blog_text_with_image"],
      "description": "Content composition blocks"
    },
    "related_posts": {
      "type": "bloks",
      "pos": 8,
      "restrict_components": true,
      "component_whitelist": ["blog_card"],
      "description": "Related blog posts"
    },
    "cta_section_title": {
      "type": "text",
      "pos": 9,
      "description": "CTA section title"
    },
    "cta_section_text": {
      "type": "textarea",
      "pos": 10,
      "description": "CTA section text"
    },
    "cta_button_text": {
      "type": "text",
      "pos": 11,
      "description": "CTA button text"
    },
    "cta_button_link": {
      "type": "multilink",
      "pos": 12,
      "description": "CTA button link"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Blog"
}
```

## Quick Setup Instructions

### Method 1: Manual Setup in Storyblok

1. Go to your Storyblok space
2. Navigate to "Components" in the sidebar
3. Click "New" to create a new component
4. Follow the schema above for each component
5. Create components in this order:
   - `blog_heading`
   - `blog_body`
   - `blog_image`
   - `blog_quote`
   - `blog_text_with_image`
   - `blog_card`
   - `blog_grid`
   - `blog_hero`
   - `blog_detail`

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

| Type | Description | Example Use |
|------|-------------|-------------|
| `text` | Single line text | Titles, names, short text |
| `textarea` | Multi-line text | Descriptions, excerpts |
| `richtext` | Rich text editor | Long-form content |
| `asset` | Single file/image | Featured images, avatars |
| `multilink` | Link to URL/Story/Asset | Navigation links, CTAs |
| `bloks` | Nested components | Repeatable sections |
| `boolean` | True/false toggle | Feature flags |

## Component Groups

All blog components are organized under the "Blog" group in Storyblok for easy navigation.

## Validation Rules

Recommended validation rules for fields:

- **title**: Required, max length 100 characters
- **excerpt**: Max length 200 characters
- **reading_time**: Format as "5 min read"
- **tags**: Comma-separated list

## Default Values

Suggested default values:

- `blog_grid.columns`: 3
- `blog_grid.show_filters`: false
- `blog_hero.back_link`: Link to "blog" story
- `blog_detail.cta_button_text`: "Learn More"

## Translatable Fields

For multilingual sites, mark these fields as translatable:

- All `text` and `textarea` fields
- `richtext` fields
- `tags` and category fields
- Button text and descriptions

## Testing Your Setup

After creating the components:

1. Create a "blog-landing-page" story
2. Add a `blog_grid` component
3. Add 2-3 `blog_card` components within the grid
4. Create a blog post story in the "blog" folder
5. Add `blog_hero` and `blog_detail` components
6. Preview the pages to verify everything renders correctly
