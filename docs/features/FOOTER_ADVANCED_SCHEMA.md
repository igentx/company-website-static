# Advanced Footer Schema (Storyblok)

Component: `footer_content`

This component supports brand info, multiple link groups, contact info, social links, newsletter (optional), and legal links.

## Footer Schema (JSON)

```json
{
  "name": "footer_content",
  "component": "footer_content",
  "display_name": "Footer Content (Advanced)",
  "description": "Global site footer with brand, links, contact info, and legal",
  "is_root": false,
  "is_nestable": true,
  "schema": {
    "brand_logo": { "type": "asset", "display_name": "Brand Logo", "filetypes": ["images"] },
    "brand_name": { "type": "text", "display_name": "Brand Name", "translatable": true },
    "description": { "type": "textarea", "display_name": "Description", "translatable": true },

    "link_groups": {
      "type": "bloks",
      "display_name": "Link Groups",
      "restrict_components": true,
      "component_whitelist": ["footer_link_group"],
      "required": false
    },

    "footer_links": {
      "type": "bloks",
      "display_name": "Links (Legacy)",
      "restrict_components": true,
      "component_whitelist": ["footer_links"],
      "required": false
    },

    "social_links": {
      "type": "bloks",
      "display_name": "Social Links",
      "restrict_components": true,
      "component_whitelist": ["social_links"],
      "required": false
    },

    "contact_info": {
      "type": "bloks",
      "display_name": "Contact Info",
      "restrict_components": true,
      "component_whitelist": ["footer_contact_info"],
      "required": false
    },

    "newsletter": {
      "type": "bloks",
      "display_name": "Newsletter",
      "restrict_components": true,
      "component_whitelist": ["footer_newsletter"],
      "required": false
    },

    "legal_links": {
      "type": "bloks",
      "display_name": "Legal Links",
      "restrict_components": true,
      "component_whitelist": ["footer_links"],
      "required": false
    },

    "copyright_text": { "type": "text", "display_name": "Copyright Text", "translatable": true }
  }
}
```

## Supporting Components

1) `footer_link_group`

```json
{
  "name": "footer_link_group",
  "display_name": "Footer Link Group",
  "is_root": false,
  "is_nestable": true,
  "schema": {
    "title": { "type": "text", "display_name": "Group Title", "translatable": true },
    "links": {
      "type": "bloks",
      "display_name": "Links",
      "restrict_components": true,
      "component_whitelist": ["footer_links"],
      "required": false
    }
  }
}
```

2) `footer_links`

```json
{
  "name": "footer_links",
  "display_name": "Footer Link",
  "is_root": false,
  "is_nestable": true,
  "schema": {
    "label": { "type": "text", "display_name": "Label", "translatable": true },
    "link": { "type": "multilink", "display_name": "Link" }
  }
}
```

3) `social_links`

```json
{
  "name": "social_links",
  "display_name": "Social Link",
  "is_root": false,
  "is_nestable": true,
  "schema": {
    "platform": {
      "type": "option",
      "display_name": "Platform",
      "options": [
        { "name": "LinkedIn", "value": "linkedin" },
        { "name": "Twitter", "value": "twitter" },
        { "name": "Instagram", "value": "instagram" },
        { "name": "Facebook", "value": "facebook" },
        { "name": "Github", "value": "github" }
      ]
    },
    "url": { "type": "text", "display_name": "URL" },
    "icon": { "type": "asset", "display_name": "Custom Icon (optional)", "filetypes": ["images", "svg"] }
  }
}
```

4) `footer_contact_info`

```json
{
  "name": "footer_contact_info",
  "display_name": "Footer Contact Info",
  "is_root": false,
  "is_nestable": true,
  "schema": {
    "address": { "type": "textarea", "display_name": "Address", "translatable": true },
    "email": { "type": "text", "display_name": "Email" },
    "phone": { "type": "text", "display_name": "Phone" },
    "whatsapp": { "type": "text", "display_name": "WhatsApp Number (International Format)" },
    "hours": { "type": "text", "display_name": "Business Hours", "translatable": true },
    "map_url": { "type": "text", "display_name": "Google Map URL" }
  }
}
```

5) `footer_newsletter`

```json
{
  "name": "footer_newsletter",
  "display_name": "Footer Newsletter",
  "is_root": false,
  "is_nestable": true,
  "schema": {
    "enabled": { "type": "boolean", "display_name": "Enabled", "default_value": true },
    "title": { "type": "text", "display_name": "Title", "translatable": true },
    "description": { "type": "textarea", "display_name": "Description", "translatable": true },
    "placeholder": { "type": "text", "display_name": "Input Placeholder", "translatable": true },
    "submit_label": { "type": "text", "display_name": "Submit Button Label", "translatable": true },
    "privacy_text": { "type": "text", "display_name": "Privacy Note", "translatable": true },
    "action_url": { "type": "text", "display_name": "Action URL (optional)" }
  }
}
```

## Usage Notes

- Prefer `link_groups` for multi-column layout; `footer_links` remains for simple legacy setups.
- Use `platform` in `social_links`; `flatform` legacy is still supported by the component.
- Legal links can be added either as a separate `link_groups` column or as `legal_links` in the bottom bar.
- Newsletter is optional—enable only if you have a backend endpoint or third-party integration.
