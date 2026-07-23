# Header Navigation with Child Links

This guide explains how to enable nested (dropdown) navigation in the header using Storyblok.

- Component: `header_navigation`
- Child component: `navigation_items` (now supports `children`)

## What changed

- The header now renders dropdowns on desktop and nested lists on mobile.
- `navigation_items` supports an optional `children` field containing more `navigation_items`.
- Links use language-aware URLs for internal stories; external URLs remain unchanged.

## Update your Storyblok schemas

Create or update these components in your space.

### 1) Header Navigation component

```json
{
  "name": "header_navigation",
  "component": "header_navigation",
  "display_name": "Header Navigation",
  "description": "Site header with logo, language-aware links, and optional nested dropdown items",
  "is_root": false,
  "is_nestable": true,
  "schema": {
    "logo": {
      "type": "asset",
      "display_name": "Logo",
      "filetypes": ["images"],
      "required": false
    },
    "logo_text": {
      "type": "text",
      "display_name": "Logo Text",
      "required": false,
      "translatable": true
    },
    "navigation_items": {
      "type": "bloks",
      "display_name": "Navigation Items",
      "restrict_components": true,
      "component_whitelist": ["navigation_items"],
      "required": false
    },
    "global_seo": {
      "type": "bloks",
      "display_name": "Global SEO (Optional)",
      "restrict_components": true,
      "component_whitelist": ["seo"],
      "required": false
    }
  }
}
```

### 2) Navigation Item component (supports children)

```json
{
  "name": "navigation_items",
  "component": "navigation_items",
  "display_name": "Navigation Item",
  "description": "A single navigation item which can optionally contain child links",
  "is_root": false,
  "is_nestable": true,
  "schema": {
    "label": {
      "type": "text",
      "display_name": "Label",
      "required": true,
      "translatable": true
    },
    "link": {
      "type": "multilink",
      "display_name": "Link",
      "description": "Internal story or external URL",
      "required": false
    },
    "children": {
      "type": "bloks",
      "display_name": "Child Links (Dropdown)",
      "restrict_components": true,
      "component_whitelist": ["navigation_items"],
      "required": false
    }
  }
}
```

## Example content structure

- Home
- Services ▾
  - Web Development
  - Ecommerce Development
  - Branding
- Case Studies
- About
- Blog
- Contact

## Notes

- If a parent item has no link, it will behave like a label with a dropdown on desktop and a section heading on mobile.
- Internal Storyblok links automatically become language-aware (e.g., `/ar/services`). External links are left unchanged.
- The header also renders the Global SEO blok if present in `global/header`.

## Revalidate after schema/content updates

If you change global header content in a running environment, trigger a revalidation:

```sh
npm run revalidate:header
```

Or hit the revalidate endpoint in your environment:

```sh
curl -X GET "https://<your-host>/api/revalidate?global=header"
```
