# IGENTX Storyblok Component Schemas

This document provides the complete Storyblok component schemas for the IGENTX website. Use these schemas to create the components in your Storyblok space.

## Table of Contents

1. [Global Components](#global-components)
   - [Header Navigation](#1---header-navigation-component)
   - [Info Bar](#2---info-bar-component)
   - [Footer](#3---footer-schema-json)
   - [Floating Contact Button](#4---floating-contact-button-component)
   - [Social Link](#5---social-link-component-for-floating-contact-button)
2. [IGENTX Hero Component](#1-igentx-hero-component)
3. [Why Choose IGENTX Component](#2-why-choose-igentx-component)
4. [IGENTX Services Component](#3-igentx-services-component)
5. [IGENTX Portfolio Component](#4-igentx-portfolio-component)
6. [IGENTX Pricing Component](#5-igentx-pricing-component)
7. [Setup Instructions](#setup-instructions)

---

## Global Components

### 1 - Header Navigation component

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
    "info_bar": {
      "type": "bloks",
      "display_name": "Info Bar",
      "description": "Top banner with contact info and announcements",
      "restrict_components": true,
      "component_whitelist": ["info_bar"],
      "maximum": 1,
      "required": false
    },
    "floating_contact_button": {
      "type": "bloks",
      "display_name": "Floating Contact Button",
      "description": "Floating button that displays all contact options in a modal",
      "restrict_components": true,
      "component_whitelist": ["floating_contact_button"],
      "maximum": 1,
      "required": false
    }
  }
}
```

### 2 - Info Bar Component

**Component Name:** `info_bar`

```json
{
  "name": "info_bar",
  "component": "info_bar",
  "display_name": "Info Bar",
  "description": "Top banner with announcements, contact info, and social links",
  "is_root": false,
  "is_nestable": true,
  "schema": {
    "message": {
      "type": "text",
      "display_name": "Message",
      "description": "Short message or announcement to display",
      "required": false,
      "translatable": true,
      "default_value": "🚀 Trusted by Fast-Growing UAE Startups"
    },
    "phone": {
      "type": "text",
      "display_name": "Phone Number",
      "description": "Phone number for contact (e.g., +971 50 123 4567)",
      "required": false
    },
    "phone_label": {
      "type": "text",
      "display_name": "Phone Label (Text)",
      "description": "Optional label to show next to the phone icon (e.g., 'Call us')",
      "required": false,
      "translatable": true
    },
    "email": {
      "type": "text",
      "display_name": "Email Address",
      "description": "Email address for contact",
      "required": false
    },
    "email_label": {
      "type": "text",
      "display_name": "Email Label (Text)",
      "description": "Optional label to show next to the email icon (e.g., 'Email us')",
      "required": false,
      "translatable": true
    },
    "address": {
      "type": "text",
      "display_name": "Address",
      "description": "Physical address or location (e.g., Dubai, UAE)",
      "required": false,
      "translatable": true
    },
    "whatsapp_number": {
      "type": "text",
      "display_name": "WhatsApp Number",
      "description": "WhatsApp contact number (include country code, e.g., +971501234567)",
      "required": false
    },
    "whatsapp_text": {
      "type": "text",
      "display_name": "WhatsApp Pre-filled Text",
      "description": "Pre-filled message when user clicks WhatsApp link",
      "required": false,
      "translatable": true,
      "default_value": "Hello, I'm interested in your services"
    },
    "whatsapp_label": {
      "type": "text",
      "display_name": "WhatsApp Label (Text)",
      "description": "Optional label to show next to the WhatsApp icon (e.g., 'WhatsApp me')",
      "required": false,
      "translatable": true
    },
    "show_contact_text": {
      "type": "boolean",
      "display_name": "Show Contact Text on Desktop",
      "description": "If enabled, shows text next to contact icons on desktop. When disabled, icons only.",
      "required": false,
      "default_value": true
    },
    "show_language_switcher": {
      "type": "boolean",
      "display_name": "Show Language Switcher",
      "description": "Display the language switcher in the info bar",
      "required": false,
      "default_value": true
    },
    "social_links": {
      "type": "bloks",
      "display_name": "Social Links",
      "description": "Social media links to display (reuses Footer's social_links component)",
      "restrict_components": true,
      "component_whitelist": ["social_links"],
      "maximum": 6,
      "required": false
    }
  }
}
```

**Note:** The Info Bar reuses the existing `social_links` component from the Footer (see [Footer Schema](#3---footer-schema-json) for component details).

**Features:**

**Component Name:** `navigation_items`

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
### 3 - Footer Schema (JSON)

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

## Supporting Components of Footer

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

### 4 - Floating Contact Button Component

**Component Name:** `floating_contact_button`

```json
{
  "name": "floating_contact_button",
  "component": "floating_contact_button",
  "display_name": "Floating Contact Button",
  "description": "Floating button that shows contact options in a modal. Add this to your header for site-wide visibility.",
  "is_root": false,
  "is_nestable": true,
  "schema": {
    "enabled": {
      "type": "boolean",
      "display_name": "Enable Button",
      "description": "Show/hide the floating contact button",
      "default_value": true,
      "required": false
    },
    "button_label": {
      "type": "text",
      "display_name": "Button Label (Accessibility)",
      "description": "Screen reader label for accessibility",
      "default_value": "Contact us",
      "translatable": true,
      "required": false
    },
    "modal_title": {
      "type": "text",
      "display_name": "Modal Title",
      "description": "Title shown in the contact modal header",
      "default_value": "Contact Us",
      "translatable": true,
      "required": false
    },
    "modal_subtitle": {
      "type": "text",
      "display_name": "Modal Subtitle",
      "description": "Subtitle shown below the modal title",
      "default_value": "Choose your preferred method",
      "translatable": true,
      "required": false
    },
    "modal_footer_text": {
      "type": "text",
      "display_name": "Modal Footer Text",
      "description": "Help text shown at the bottom of the modal",
      "default_value": "We're here to help! Choose any method to reach us",
      "translatable": true,
      "required": false
    },
    "phone": {
      "type": "text",
      "display_name": "Phone Number",
      "description": "Phone number with country code (e.g., +971 4 123 4567)",
      "required": false
    },
    "phone_label": {
      "type": "text",
      "display_name": "Phone Label",
      "description": "Custom label for phone option (e.g., 'Call Us')",
      "default_value": "Phone",
      "translatable": true,
      "required": false
    },
    "email": {
      "type": "text",
      "display_name": "Email Address",
      "description": "Email address for contact",
      "required": false
    },
    "email_label": {
      "type": "text",
      "display_name": "Email Label",
      "description": "Custom label for email option (e.g., 'Email Us')",
      "default_value": "Email",
      "translatable": true,
      "required": false
    },
    "whatsapp_number": {
      "type": "text",
      "display_name": "WhatsApp Number",
      "description": "WhatsApp number in international format WITHOUT + or spaces (e.g., 971501234567)",
      "required": false
    },
    "whatsapp_label": {
      "type": "text",
      "display_name": "WhatsApp Label",
      "description": "Custom label for WhatsApp option",
      "default_value": "WhatsApp",
      "translatable": true,
      "required": false
    },
    "whatsapp_message": {
      "type": "textarea",
      "display_name": "WhatsApp Pre-filled Message",
      "description": "Default message when user opens WhatsApp chat",
      "translatable": true,
      "required": false
    },
    "address": {
      "type": "textarea",
      "display_name": "Physical Address",
      "description": "Your office or business address",
      "translatable": true,
      "required": false
    },
    "address_label": {
      "type": "text",
      "display_name": "Address Label",
      "description": "Custom label for address",
      "default_value": "Address",
      "translatable": true,
      "required": false
    },
    "social_links_title": {
      "type": "text",
      "display_name": "Social Links Section Title",
      "description": "Title for the social media links section",
      "default_value": "Follow us on",
      "translatable": true,
      "required": false
    },
    "social_links": {
      "type": "bloks",
      "display_name": "Social Media Links",
      "description": "Add your social media profiles",
      "restrict_components": true,
      "component_whitelist": ["social_link"],
      "required": false
    },
    "button_position": {
      "type": "option",
      "display_name": "Button Position",
      "description": "Position of the floating button (auto-adjusts for RTL)",
      "options": [
        {
          "value": "bottom-right",
          "name": "Bottom Right"
        },
        {
          "value": "bottom-left",
          "name": "Bottom Left"
        }
      ],
      "default_value": "bottom-right",
      "required": false
    },
    "button_color": {
      "type": "option",
      "display_name": "Button Color Theme",
      "description": "Choose the button gradient color",
      "options": [
        {
          "value": "blue",
          "name": "Blue (Default)"
        },
        {
          "value": "green",
          "name": "Green"
        },
        {
          "value": "purple",
          "name": "Purple"
        },
        {
          "value": "orange",
          "name": "Orange"
        }
      ],
      "default_value": "blue",
      "required": false
    },
    "show_notification_badge": {
      "type": "boolean",
      "display_name": "Show Notification Badge",
      "description": "Display a red notification badge on the button",
      "default_value": false,
      "required": false
    }
  }
}
```

### 5 - Social Link Component (for Floating Contact Button)

**Component Name:** `social_link`

```json
{
  "name": "social_link",
  "component": "social_link",
  "display_name": "Social Link",
  "description": "Individual social media link for use in floating contact button and other components",
  "is_root": false,
  "is_nestable": true,
  "schema": {
    "platform": {
      "type": "option",
      "display_name": "Social Platform",
      "options": [
        {
          "value": "facebook",
          "name": "Facebook"
        },
        {
          "value": "twitter",
          "name": "Twitter / X"
        },
        {
          "value": "instagram",
          "name": "Instagram"
        },
        {
          "value": "linkedin",
          "name": "LinkedIn"
        },
        {
          "value": "youtube",
          "name": "YouTube"
        },
        {
          "value": "tiktok",
          "name": "TikTok"
        },
        {
          "value": "snapchat",
          "name": "Snapchat"
        }
      ],
      "required": true
    },
    "url": {
      "type": "text",
      "display_name": "Profile URL",
      "description": "Full URL to your social media profile (e.g., https://facebook.com/yourpage)",
      "required": true
    },
    "icon": {
      "type": "asset",
      "display_name": "Custom Icon (Optional)",
      "description": "Upload a custom icon to override the default platform icon",
      "filetypes": ["images"],
      "required": false
    }
  }
}
```

---

## 1. IGENTX Hero Component

**Component Name:** `igentx_hero`

> **🚀 SLIDER-ONLY MODE**  
> The IGENTX Hero is now a pure slider component that requires at least one `hero_slide` block. This provides a consistent, modern carousel experience with smooth transitions, auto-play, pagination dots, and navigation buttons. See [Hero Slider Documentation](./features/HERO_SLIDER_SCHEMA.md) for detailed setup.

### Features:
- ✅ **Always Slider-Based**: Requires 1+ hero_slide blocks
- ✅ **Single Slide Support**: Works with 1 slide (no navigation controls shown)
- ✅ **Multi-Slide Carousel**: Auto-play, nav buttons, and dots with 2+ slides
- ✅ **Content Reveal Animations**: Staggered entrance effects for all elements
- ✅ **Responsive Layout**: Two-column on desktop, stacked on mobile
- ✅ **Navigation Controls**: Previous/Next buttons + pagination dots (2+ slides)
- ✅ **Pause on Hover**: Better user experience
- ✅ **Featured Images**: Right column images for each slide

### Schema Fields:

```json
{
  "name": "igentx_hero",
  "component": "igentx_hero",
  "display_name": "IGENTX Hero",
  "description": "Slider-only hero section with carousel slides. Requires at least one hero_slide block.",
  "schema": {
    "slides": {
      "type": "bloks",
      "display_name": "Hero Slides",
      "description": "Add 1 or more slides. Single slide shows content without navigation. Multiple slides enable auto-play carousel with navigation controls.",
      "restrict_components": true,
      "component_whitelist": ["hero_slide"],
      "required": true,
      "tooltip": true,
      "pos": 0
    },
    "enable_autoplay": {
      "type": "boolean",
      "display_name": "Enable Autoplay",
      "description": "Automatically advance slides when there are 2+ slides. Slider pauses on hover for better UX.",
      "default_value": true,
      "required": false,
      "tooltip": true,
      "pos": 1
    },
    "autoplay_delay": {
      "type": "number",
      "display_name": "Autoplay Delay (ms)",
      "description": "Time between slide transitions in milliseconds. Default: 5000 (5 seconds). Recommended range: 3000-8000ms.",
      "default_value": 5000,
      "required": false,
      "tooltip": true,
      "pos": 2
    }
  }
}
```

### Hero Slide Component:

**Component Name:** `hero_slide`

> This component is used within the `slides` field of `igentx_hero` to create individual carousel slides. **Uses the exact same fields as ServiceHero** for consistency and reusability.

```json
{
  "name": "hero_slide",
  "component": "hero_slide",
  "display_name": "Hero Slide",
  "description": "Individual slide for the hero carousel - matches ServiceHero fields exactly: category, title, summary, features, pricing/duration, and CTA",
  "is_nestable": true,
  "schema": {
    "category": {
      "type": "text",
      "display_name": "Category",
      "description": "Category or service label (e.g., 'Web Development', 'SEO Services'). Displays as solid blue badge.",
      "translatable": true,
      "required": false,
      "max_length": 50,
      "tooltip": true,
      "pos": 0
    },
    "title": {
      "type": "text",
      "display_name": "Title",
      "description": "Main slide title (large, single heading). Example: 'Professional E-commerce Website Development in UAE'",
      "translatable": true,
      "required": true,
      "max_length": 120,
      "regex": "^[^<>]*$",
      "tooltip": true,
      "pos": 1
    },
    "summary": {
      "type": "textarea",
      "display_name": "Summary",
      "description": "Supporting description text that explains the service/offering. Displays in larger text (text-xl).",
      "translatable": true,
      "required": false,
      "max_length": 500,
      "regex": "^[^<>]*$",
      "tooltip": true,
      "pos": 2
    },
    "featured_image": {
      "type": "asset",
      "display_name": "Featured Image",
      "description": "Main slide image displayed on the right column. Recommended: 1200x1200px square aspect ratio",
      "filetypes": ["images"],
      "required": false,
      "tooltip": true,
      "pos": 3
    },
    "quick_features": {
      "type": "text",
      "display_name": "Quick Features",
      "description": "Add 3-5 feature bullet points (one per line or as array). Each gets a green checkmark icon.",
      "translatable": true,
      "required": false,
      "allow_multiple": true,
      "tooltip": true,
      "pos": 4
    },
    "pricing_preview": {
      "type": "text",
      "display_name": "Pricing Preview",
      "description": "Starting price or price range (e.g., 'AED 4,999', '$2,999'). Displays in glassmorphism box with 'Starting from' label.",
      "translatable": true,
      "required": false,
      "max_length": 50,
      "tooltip": true,
      "pos": 5
    },
    "duration": {
      "type": "text",
      "display_name": "Duration / Timeline",
      "description": "Project timeline or duration (e.g., '2-3 weeks', '30 days'). Displays in glassmorphism box with 'Timeline' label.",
      "translatable": true,
      "required": false,
      "max_length": 50,
      "tooltip": true,
      "pos": 6
    },
    "cta_text": {
      "type": "text",
      "display_name": "CTA Button Text",
      "description": "Call-to-action button label (e.g., 'Get a Quote', 'Get Started'). Displays as white button with blue text.",
      "translatable": true,
      "required": false,
      "max_length": 30,
      "regex": "^[^<>]*$",
      "tooltip": true,
      "pos": 7
    },
    "cta_link": {
      "type": "multilink",
      "display_name": "CTA Button Link",
      "description": "Button destination URL (typically /contact or a service page)",
      "required": false,
      "tooltip": true,
      "pos": 8
    }
  }
}
```

### Field Mapping (ServiceHero → Hero Slide):

**Hero Slide uses the EXACT same fields as ServiceHero:**

| Field Name | Type | Description |
|------------|------|-------------|
| `category` | Text | Category badge (blue pill) |
| `title` | Text | Main slide title (4xl-6xl font) |
| `summary` | Textarea | Supporting description (xl font) |
| `featured_image` | Asset | Right column image (1200x1200px) |
| `quick_features` | Text (Multiple) | 3-5 bullet points with green checkmarks |
| `pricing_preview` | Text | Starting price in glassmorphism box |
| `duration` | Text | Timeline in glassmorphism box |
| `cta_text` | Text | CTA button label |
| `cta_link` | Link | CTA button destination |

✅ **Benefit**: You can duplicate ServiceHero content and convert it directly to Hero Slides without field mapping!
### Usage:

**Minimum Requirement**: Add at least 1 `hero_slide` block

- **1 Slide**: Two-column layout without navigation controls (static display)
- **2+ Slides**: Full carousel with auto-play, navigation buttons, and pagination dots
- **No Slides**: Shows warning message in Storyblok editor

### Migration Note:

> ⚠️ **Breaking Change**: This is now a slider-only component. If you were using the old single-hero mode, you'll need to migrate your content to a `hero_slide` block. See migration guide below.

---

### Trust Signal Item Component:

**Component Name:** `trust_signal_item`

```json
{
  "name": "trust_signal_item",
  "component": "trust_signal_item",
  "display_name": "Trust Signal Item",
  "description": "Individual trust signal with metric value and label",
  "schema": {
    "value": {
      "type": "text",
      "display_name": "Value",
      "description": "The metric value (e.g., '3x', '99%')",
      "tooltip": "The numerical or percentage value that represents your achievement or metric.",
      "translatable": true,
      "required": true,
      "max_length": 10
    },
    "label": {
      "type": "text",
      "display_name": "Label",
      "description": "Description of the metric",
      "tooltip": "Brief description of what the metric represents (e.g., 'Faster Delivery', 'Customer Satisfaction').",
      "translatable": true,
      "required": true,
      "max_length": 30,
      "regex": "^[^<>]*$"
    }
  }
}
```

---

## 2. Why Choose IGENTX Component

**Component Name:** `why_choose_igentx`

### Schema Fields:

```json
{
  "name": "why_choose_igentx",
  "component": "why_choose_igentx",
  "display_name": "Why Choose IGENTX",
  "description": "Section highlighting key differentiators, features, and competitive advantages",
  "schema": {
    "badge_text": {
      "type": "text",
      "display_name": "Badge Text",
      "description": "Small badge text above the section title",
      "tooltip": "Short, impactful text that appears above the main section title. Usually a question or statement.",
      "default_value": "Why IGENTX?",
      "translatable": true,
      "required": false,
      "max_length": 30,
      "regex": "^[^<>]*$"
    },
    "title": {
      "type": "text",
      "display_name": "Section Title",
      "description": "Main title for the Why Choose section",
      "tooltip": "The primary heading that explains why customers should choose your service. Make it compelling and clear.",
      "default_value": "Why Choose IGENTX?",
      "translatable": true,
      "required": true,
      "max_length": 60,
      "regex": "^[^<>]*$"
    },
    "description": {
      "type": "textarea",
      "display_name": "Section Description",
      "description": "Supporting text that explains the value proposition",
      "tooltip": "Detailed explanation of your unique value proposition. This helps visitors understand what makes you different.",
      "default_value": "Empowering UAE businesses with AI-driven web solutions that deliver speed, performance, and growth.",
      "translatable": true,
      "required": false,
      "max_length": 300,
      "regex": "^[^<>]*$"
    },
    "features": {
      "type": "bloks",
      "display_name": "Features",
      "description": "Key differentiators and features that set you apart",
      "tooltip": "Add the main features and benefits that differentiate your service. These are the core reasons why customers should choose you.",
      "restrict_components": true,
      "component_whitelist": ["differentiator_feature"],
      "required": true
    },
    "uae_signals_title": {
      "type": "text",
      "display_name": "UAE Signals Title",
      "description": "Title for the UAE-specific trust signals section",
      "tooltip": "Title for the section that highlights your local UAE expertise and credentials.",
      "default_value": "Trusted by UAE Businesses",
      "translatable": true,
      "required": false,
      "max_length": 50,
      "regex": "^[^<>]*$"
    },
    "uae_signals_description": {
      "type": "textarea",
      "display_name": "UAE Signals Description",
      "description": "Description for the UAE trust signals section",
      "tooltip": "Brief explanation of your local expertise and how it benefits UAE businesses.",
      "default_value": "Local expertise. Global standards.",
      "translatable": true,
      "required": false,
      "max_length": 100,
      "regex": "^[^<>]*$"
    },
    "uae_signals": {
      "type": "bloks",
      "display_name": "UAE Trust Signals",
      "description": "Local UAE-specific trust indicators and credentials",
      "tooltip": "Add items that highlight your local UAE expertise, certifications, or local business credentials.",
      "restrict_components": true,
      "component_whitelist": ["uae_signal_item"],
      "required": false
    },
    "show_speed_comparison": {
      "type": "boolean",
      "display_name": "Show Speed Comparison",
      "description": "Toggle to show/hide the speed comparison section",
      "tooltip": "Enable this to display a comparison between traditional development and your AI-driven approach.",
      "default_value": true,
      "required": false
    },
    "speed_comparison_title": {
      "type": "text",
      "display_name": "Speed Comparison Title",
      "description": "Title for the speed comparison section",
      "tooltip": "Compelling title that emphasizes the importance of speed in your market.",
      "default_value": "Speed is Everything in the UAE Market",
      "translatable": true,
      "required": false,
      "max_length": 60,
      "regex": "^[^<>]*$"
    },
    "speed_comparison_description": {
      "type": "textarea",
      "display_name": "Speed Comparison Description",
      "description": "Description explaining the speed advantage",
      "tooltip": "Explain how your approach delivers faster results compared to traditional methods.",
      "default_value": "Our AI-driven workflow consistently outperforms traditional web development—delivering faster, more reliable websites built for growth.",
      "translatable": true,
      "required": false,
      "max_length": 200,
      "regex": "^[^<>]*$"
    },
    "traditional_approach_title": {
      "type": "text",
      "display_name": "Traditional Approach Title",
      "description": "Title for the traditional approach column",
      "tooltip": "Label for the column showing traditional development challenges or limitations.",
      "default_value": "Traditional Approach",
      "translatable": true,
      "required": false,
      "max_length": 40,
      "regex": "^[^<>]*$"
    },
    "traditional_approach_points": {
      "type": "bloks",
      "display_name": "Traditional Approach Points",
      "description": "Points highlighting traditional development challenges",
      "tooltip": "Add points that show the limitations or challenges of traditional development methods.",
      "restrict_components": true,
      "component_whitelist": ["speed_comparison_point"],
      "required": false
    },
    "igentx_approach_title": {
      "type": "text",
      "display_name": "IGENTX Approach Title",
      "description": "Title for your approach column",
      "tooltip": "Label for the column showcasing your superior approach or methodology.",
      "default_value": "AI-Driven Development",
      "translatable": true,
      "required": false,
      "max_length": 40,
      "regex": "^[^<>]*$"
    },
    "igentx_advantage_label": {
      "type": "text",
      "display_name": "IGENTX Advantage Label",
      "description": "Badge label highlighting your advantage",
      "tooltip": "Short label that appears as a badge to highlight your competitive advantage.",
      "default_value": "IGENTX Advantage",
      "translatable": true,
      "required": false,
      "max_length": 30,
      "regex": "^[^<>]*$"
    },
    "igentx_approach_points": {
      "type": "bloks",
      "display_name": "IGENTX Approach Points",
      "description": "Points highlighting your approach benefits",
      "tooltip": "Add points that showcase the benefits and advantages of your approach.",
      "restrict_components": true,
      "component_whitelist": ["speed_comparison_point"],
      "required": false
    }
  }
}
```

### Supporting Components:

**Differentiator Feature Component:** `differentiator_feature`

```json
{
  "name": "differentiator_feature",
  "component": "differentiator_feature",
  "display_name": "Differentiator Feature",
  "description": "Individual feature or benefit that differentiates your service",
  "schema": {
    "title": {
      "type": "text",
      "display_name": "Feature Title",
      "description": "Title of the feature or benefit",
      "tooltip": "Clear, compelling title that describes the feature or benefit. Make it specific and impactful.",
      "translatable": true,
      "required": true,
      "max_length": 60,
      "regex": "^[^<>]*$"
    },
    "description": {
      "type": "textarea",
      "display_name": "Feature Description",
      "description": "Detailed description of the feature",
      "tooltip": "Explain how this feature benefits the customer. Focus on the value and outcome, not just the feature itself.",
      "translatable": true,
      "required": true,
      "max_length": 200,
      "regex": "^[^<>]*$"
    },
    "highlight": {
      "type": "text",
      "display_name": "Highlight Badge",
      "description": "Optional highlight text (e.g., '60% Faster')",
      "tooltip": "Short, impactful metric or benefit that can be displayed as a badge. Use numbers, percentages, or key benefits.",
      "translatable": true,
      "required": false,
      "max_length": 20,
      "regex": "^[^<>]*$"
    },
    "icon": {
      "type": "asset",
      "display_name": "Feature Icon",
      "description": "Icon representing the feature",
      "tooltip": "Visual icon that represents this feature. Recommended size: 64x64px, SVG format preferred for scalability.",
      "filetypes": ["images"],
      "required": false
    }
  }
}
```

**UAE Signal Item Component:** `uae_signal_item`

```json
{
  "name": "uae_signal_item",
  "component": "uae_signal_item",
  "display_name": "UAE Signal Item",
  "description": "Individual UAE-specific trust signal or credential",
  "schema": {
    "title": {
      "type": "text",
      "display_name": "Signal Title",
      "description": "Title of the trust signal",
      "tooltip": "Short, clear title that describes the trust signal (e.g., 'Dubai-Based Team', 'UAE-Compliant Solutions').",
      "translatable": true,
      "required": true,
      "max_length": 40,
      "regex": "^[^<>]*$"
    },
    "description": {
      "type": "text",
      "display_name": "Signal Description",
      "description": "Description of the trust signal",
      "tooltip": "Brief explanation of how this trust signal benefits UAE businesses or demonstrates local expertise.",
      "translatable": true,
      "required": true,
      "max_length": 100,
      "regex": "^[^<>]*$"
    },
    "icon": {
      "type": "asset",
      "display_name": "Signal Icon",
      "filetypes": ["images"],
      "required": false
    }
  }
}
```

**Speed Comparison Point Component:** `speed_comparison_point`

```json
{
  "name": "speed_comparison_point",
  "component": "speed_comparison_point",
  "display_name": "Speed Comparison Point",
  "description": "Individual comparison point for speed comparison section",
  "schema": {
    "text": {
      "type": "text",
      "display_name": "Comparison Point Text",
      "translatable": true,
      "required": true
    },
    "enabled": {
      "type": "boolean",
      "display_name": "Show This Point",
      "default_value": true,
      "required": false
    }
  }
}
```

---

## 3. IGENTX Services Component

**Component Name:** `igentx_services`

### Schema Fields:

```json
{
  "name": "igentx_services",
  "component": "igentx_services",
  "display_name": "IGENTX Services",
  "description": "Services section showcasing complete digital solutions and technology stack",
  "schema": {
    "badge_text": {
      "type": "text",
      "display_name": "Badge Text",
      "default_value": "Our Services",
      "translatable": true,
      "required": false
    },
    "title": {
      "type": "text",
      "display_name": "Section Title",
      "default_value": "Complete Digital Solutions",
      "translatable": true,
      "required": true
    },
    "description": {
      "type": "textarea",
      "display_name": "Section Description",
      "default_value": "From concept to launch, we provide everything you need to succeed online in the UAE market",
      "translatable": true,
      "required": false
    },
    "services": {
      "type": "bloks",
      "display_name": "Services",
      "restrict_components": true,
      "component_whitelist": ["service_item"],
      "required": true
    },
    "show_tech_stack": {
      "type": "boolean",
      "display_name": "Show Technology Stack",
      "default_value": true,
      "required": false
    },
    "tech_stack_badge": {
      "type": "text",
      "display_name": "Tech Stack Badge",
      "default_value": "Engineering Excellence",
      "translatable": true,
      "required": false
    },
    "tech_stack_title": {
      "type": "text",
      "display_name": "Tech Stack Title",
      "default_value": "Engineering Excellence, Business Impact",
      "translatable": true,
      "required": false
    },
    "tech_stack_description": {
      "type": "textarea",
      "display_name": "Tech Stack Description",
      "default_value": "We combine modern technologies, cloud infrastructure and AI capabilities to build scalable, secure and future-ready solutions that drive real business growth.",
      "translatable": true,
      "required": false
    },
    "tech_categories": {
      "type": "bloks",
      "display_name": "Technology Categories",
      "restrict_components": true,
      "component_whitelist": ["tech_category"],
      "required": false
    },
    "tech_benefits": {
      "type": "bloks",
      "display_name": "Tech Stack Benefits",
      "restrict_components": true,
      "component_whitelist": ["tech_benefit"],
      "required": false
    },
    "process_title": {
      "type": "text",
      "display_name": "Process Title",
      "default_value": "Our AI-Driven Process",
      "translatable": true,
      "required": false
    },
    "process_description": {
      "type": "textarea",
      "display_name": "Process Description",
      "default_value": "From concept to launch, our streamlined process ensures faster delivery without compromising quality.",
      "translatable": true,
      "required": false
    },
    "process_steps": {
      "type": "bloks",
      "display_name": "Process Steps",
      "restrict_components": true,
      "component_whitelist": ["process_step"],
      "required": false
    },
    "cta_title": {
      "type": "text",
      "display_name": "CTA Title",
      "translatable": true,
      "required": false
    },
    "cta_description": {
      "type": "textarea",
      "display_name": "CTA Description",
      "translatable": true,
      "required": false
    },
    "cta_text": {
      "type": "text",
      "display_name": "CTA Button Text",
      "translatable": true,
      "required": false
    },
    "cta_link": {
      "type": "multilink",
      "display_name": "CTA Link",
      "required": false
    }
  }
}
```

### Supporting Components:

**Service Item Component:** `service_item`

```json
{
  "name": "service_item",
  "component": "service_item",
  "display_name": "Service Item",
  "description": "Individual service offering with details and features",
  "schema": {
    "title": {
      "type": "text",
      "display_name": "Service Title",
      "translatable": true,
      "required": true
    },
    "description": {
      "type": "textarea",
      "display_name": "Service Description",
      "translatable": true,
      "required": true
    },
    "image": {
      "type": "asset",
      "display_name": "Service Image",
      "filetypes": ["images"],
      "required": false
    },
    "features": {
      "type": "textarea",
      "display_name": "Features List",
      "description": "One feature per line",
      "translatable": true,
      "required": false
    },
    "price_range": {
      "type": "text",
      "display_name": "Price Range",
      "description": "e.g., 'AED 2,999 - 14,999+'",
      "translatable": true,
      "required": false
    },
    "cta_text": {
      "type": "text",
      "display_name": "CTA Text",
      "translatable": true,
      "required": false
    },
    "cta_link": {
      "type": "multilink",
      "display_name": "CTA Link",
      "required": false
    },
    "is_popular": {
      "type": "boolean",
      "display_name": "Mark as Popular",
      "required": false
    }
  }
}
```

**Technology Category Component:** `tech_category`

```json
{
  "name": "tech_category",
  "component": "tech_category",
  "display_name": "Tech Category",
  "description": "Technology category with related tools and frameworks",
  "schema": {
    "title": {
      "type": "text",
      "display_name": "Category Title",
      "translatable": true,
      "required": true
    },
    "description": {
      "type": "textarea",
      "display_name": "Category Description",
      "description": "Short outcome-focused description for this capability area",
      "translatable": true,
      "required": false
    },
    "icon_key": {
      "type": "option",
      "display_name": "Category Icon",
      "options": [
        { "name": "AI Powered", "value": "ai" },
        { "name": "Cloud Native", "value": "cloud" },
        { "name": "Modern Web", "value": "web" },
        { "name": "Commerce Solutions", "value": "commerce" },
        { "name": "Analytics and Insights", "value": "analytics" },
        { "name": "Automation and Integrations", "value": "automation" }
      ],
      "required": false
    },
    "width": {
      "type": "option",
      "display_name": "Category Width",
      "description": "Control the width of this category card",
      "options": [
        { "name": "Full Width", "value": "full" },
        { "name": "Three Quarters (3/4)", "value": "3/4" },
        { "name": "Half Width (1/2)", "value": "1/2" },
        { "name": "One Third (1/3)", "value": "1/3" },
        { "name": "One Quarter (1/4)", "value": "1/4" }
      ],
      "default_value": "full",
      "required": false
    },
    "technologies": {
      "type": "bloks",
      "display_name": "Technologies",
      "restrict_components": true,
      "component_whitelist": ["technology_item"],
      "required": true
    }
  }
}
```

**Technology Item Component:** `technology_item`

```json
{
  "name": "technology_item",
  "component": "technology_item",
  "display_name": "Technology Item",
  "description": "Individual technology tool or framework",
  "schema": {
    "name": {
      "type": "text",
      "display_name": "Technology Name",
      "translatable": true,
      "required": true
    },
    "icon": {
      "type": "asset",
      "display_name": "Technology Icon",
      "filetypes": ["images"],
      "required": false
    }
  }
}
```

**Tech Benefit Component:** `tech_benefit`

```json
{
  "name": "tech_benefit",
  "component": "tech_benefit",
  "display_name": "Tech Stack Benefit",
  "description": "Benefit row item below the technology category grid",
  "schema": {
    "title": {
      "type": "text",
      "display_name": "Title",
      "translatable": true,
      "required": true
    },
    "description": {
      "type": "text",
      "display_name": "Description",
      "translatable": true,
      "required": true
    },
    "icon_key": {
      "type": "option",
      "display_name": "Icon",
      "options": [
        { "name": "Lightning", "value": "lightning" },
        { "name": "Layers", "value": "layers" },
        { "name": "Shield", "value": "shield" },
        { "name": "Clock", "value": "clock" },
        { "name": "Rocket", "value": "rocket" }
      ],
      "required": false
    }
  }
}
```

**Process Step Component:** `process_step`

```json
{
  "name": "process_step",
  "component": "process_step",
  "display_name": "Process Step",
  "description": "Individual step in the development process",
  "schema": {
    "title": {
      "type": "text",
      "display_name": "Step Title",
      "translatable": true,
      "required": true
    },
    "description": {
      "type": "textarea",
      "display_name": "Step Description",
      "translatable": true,
      "required": true
    },
    "duration": {
      "type": "text",
      "display_name": "Duration",
      "description": "e.g., '1-2 days'",
      "translatable": true,
      "required": false
    }
  }
}
```

---

## 4. IGENTX Portfolio Component

**Component Name:** `igentx_portfolio`

### Schema Fields:

```json
{
  "name": "igentx_portfolio",
  "component": "igentx_portfolio",
  "display_name": "IGENTX Portfolio",
  "description": "Portfolio section showcasing case studies, performance metrics, and client testimonials",
  "schema": {
    "badge_text": {
      "type": "text",
      "display_name": "Badge Text",
      "default_value": "Success Stories",
      "translatable": true,
      "required": false
    },
    "title": {
      "type": "text",
      "display_name": "Section Title",
      "default_value": "Proven Results in the UAE Market",
      "translatable": true,
      "required": true
    },
    "description": {
      "type": "textarea",
      "display_name": "Section Description",
      "default_value": "See how we've helped businesses across the UAE achieve their digital transformation goals",
      "translatable": true,
      "required": false
    },
    "case_studies": {
      "type": "bloks",
      "display_name": "Case Studies",
      "restrict_components": true,
      "component_whitelist": ["case_study_item"],
      "required": true
    },
    "show_performance_comparison": {
      "type": "boolean",
      "display_name": "Show Performance Comparison",
      "default_value": true,
      "required": false
    },
    "performance_title": {
      "type": "text",
      "display_name": "Performance Section Title",
      "default_value": "Before vs After: Real Performance Impact",
      "translatable": true,
      "required": false
    },
    "performance_description": {
      "type": "textarea",
      "display_name": "Performance Section Description",
      "default_value": "See how our AI-driven approach delivers measurable improvements in website performance and user experience.",
      "translatable": true,
      "required": false
    },
    "performance_metrics": {
      "type": "bloks",
      "display_name": "Performance Metrics",
      "restrict_components": true,
      "component_whitelist": ["performance_metric"],
      "required": false
    },
    "testimonials_title": {
      "type": "text",
      "display_name": "Testimonials Title",
      "default_value": "What Our Clients Say",
      "translatable": true,
      "required": false
    },
    "testimonials_description": {
      "type": "textarea",
      "display_name": "Testimonials Description",
      "default_value": "Hear from our satisfied clients across the UAE",
      "translatable": true,
      "required": false
    },
    "testimonials": {
      "type": "bloks",
      "display_name": "Testimonials",
      "restrict_components": true,
      "component_whitelist": ["testimonial_item"],
      "required": false
    },
    "show_demo_cta": {
      "type": "boolean",
      "display_name": "Show Demo CTA",
      "default_value": true,
      "required": false
    },
    "demo_cta_title": {
      "type": "text",
      "display_name": "Demo CTA Title",
      "translatable": true,
      "required": false
    },
    "demo_cta_description": {
      "type": "textarea",
      "display_name": "Demo CTA Description",
      "default_value": "Explore our demo projects and see how AI-driven development can transform your business.",
      "translatable": true,
      "required": false
    },
    "demo_cta_primary": {
      "type": "text",
      "display_name": "Primary Demo CTA Text",
      "default_value": "View Live Demos",
      "translatable": true,
      "required": false
    },
    "demo_cta_primary_link": {
      "type": "multilink",
      "display_name": "Primary Demo CTA Link",
      "required": false
    },
    "demo_cta_secondary": {
      "type": "text",
      "display_name": "Secondary Demo CTA Text",
      "default_value": "Download Case Studies",
      "translatable": true,
      "required": false
    },
    "demo_cta_secondary_link": {
      "type": "multilink",
      "display_name": "Secondary Demo CTA Link",
      "required": false
    }
  }
}
```

### Supporting Components:

**Case Study Item Component:** `case_study_item`

```json
{
  "name": "case_study_item",
  "component": "case_study_item",
  "display_name": "Case Study Item",
  "description": "Individual case study with project details and results",
  "schema": {
    "title": {
      "type": "text",
      "display_name": "Case Study Title",
      "translatable": true,
      "required": true
    },
    "description": {
      "type": "textarea",
      "display_name": "Case Study Description",
      "translatable": true,
      "required": true
    },
    "category": {
      "type": "text",
      "display_name": "Category",
      "description": "e.g., 'Web Development', 'Full Solution'",
      "translatable": true,
      "required": false
    },
    "image": {
      "type": "asset",
      "display_name": "Case Study Image",
      "filetypes": ["images"],
      "required": false
    },
    "results": {
      "type": "bloks",
      "display_name": "Results",
      "restrict_components": true,
      "component_whitelist": ["result_metric"],
      "required": false
    },
    "technologies": {
      "type": "textarea",
      "display_name": "Technologies Used",
      "description": "One technology per line",
      "translatable": true,
      "required": false
    },
    "live_url": {
      "type": "text",
      "display_name": "Live Site URL",
      "required": false
    },
    "case_study_url": {
      "type": "text",
      "display_name": "Case Study URL",
      "required": false
    }
  }
}
```

**Result Metric Component:** `result_metric`

```json
{
  "name": "result_metric",
  "component": "result_metric",
  "schema": {
    "value": {
      "type": "text",
      "display_name": "Metric Value",
      "description": "e.g., '300%', '2.5s'",
      "translatable": true,
      "required": true
    },
    "metric": {
      "type": "text",
      "display_name": "Metric Name",
      "description": "e.g., 'Organic Traffic', 'Load Time'",
      "translatable": true,
      "required": true
    }
  }
}
```

**Performance Metric Component:** `performance_metric`

```json
{
  "name": "performance_metric",
  "component": "performance_metric",
  "display_name": "Performance Metric",
  "description": "Individual performance metric with before/after values",
  "schema": {
    "metric_name": {
      "type": "text",
      "display_name": "Metric Name",
      "translatable": true,
      "required": true
    },
    "before": {
      "type": "text",
      "display_name": "Before Value",
      "translatable": true,
      "required": true
    },
    "after": {
      "type": "text",
      "display_name": "After Value",
      "translatable": true,
      "required": true
    },
    "improvement": {
      "type": "text",
      "display_name": "Improvement Text",
      "description": "e.g., '81% Faster'",
      "translatable": true,
      "required": false
    }
  }
}
```

**Testimonial Item Component:** `testimonial_item`

```json
{
  "name": "testimonial_item",
  "component": "testimonial_item",
  "display_name": "Testimonial Item",
  "description": "Individual client testimonial with quote and attribution",
  "schema": {
    "content": {
      "type": "textarea",
      "display_name": "Testimonial Content",
      "translatable": true,
      "required": true
    },
    "name": {
      "type": "text",
      "display_name": "Client Name",
      "translatable": true,
      "required": true
    },
    "position": {
      "type": "text",
      "display_name": "Client Position",
      "translatable": true,
      "required": false
    },
    "company": {
      "type": "text",
      "display_name": "Company Name",
      "translatable": true,
      "required": false
    },
    "rating": {
      "type": "number",
      "display_name": "Rating (1-5)",
      "default_value": 5,
      "required": false
    },
    "avatar": {
      "type": "asset",
      "display_name": "Client Avatar",
      "filetypes": ["images"],
      "required": false
    }
  }
}
```

---

## 5. IGENTX Pricing Component

**Component Name:** `igentx_pricing`

### Schema Fields:

```json
{
  "name": "igentx_pricing",
  "component": "igentx_pricing",
  "display_name": "IGENTX Pricing",
  "description": "Pricing section with packages, value propositions, and custom quote options. For FAQs, use the new FAQ blok in the page body.",
  "schema": {
    "badge_text": {
      "type": "text",
      "display_name": "Badge Text",
      "default_value": "Transparent Pricing",
      "translatable": true,
      "required": false
    },
    "title": {
      "type": "text",
      "display_name": "Section Title",
      "default_value": "Transparent Pricing for UAE Businesses",
      "translatable": true,
      "required": true
    },
    "description": {
      "type": "textarea",
      "display_name": "Section Description",
      "default_value": "Clear, premium packages designed for the UAE market. Every package includes Storyblok CMS from day one.",
      "translatable": true,
      "required": false
    },
    "show_pricing_toggle": {
      "type": "boolean",
      "display_name": "Show Pricing Toggle",
      "required": false
    },
    "toggle_option1": {
      "type": "text",
      "display_name": "Toggle Option 1",
      "default_value": "One-time Payment",
      "translatable": true,
      "required": false
    },
    "toggle_option2": {
      "type": "text",
      "display_name": "Toggle Option 2",
      "default_value": "Monthly Payment",
      "translatable": true,
      "required": false
    },
    "packages": {
      "type": "bloks",
      "display_name": "Pricing Packages",
      "restrict_components": true,
      "component_whitelist": ["pricing_package"],
      "required": true
    },
    "value_props_title": {
      "type": "text",
      "display_name": "Value Props Title",
      "default_value": "Why Our Packages Stand Out",
      "translatable": true,
      "required": false
    },
    "value_props_description": {
      "type": "textarea",
      "display_name": "Value Props Description",
      "translatable": true,
      "required": false
    },
    "value_props": {
      "type": "bloks",
      "display_name": "Value Propositions",
      "restrict_components": true,
      "component_whitelist": ["value_prop_item"],
      "required": false
    },
    "show_custom_quote": {
      "type": "boolean",
      "display_name": "Show Custom Quote CTA",
      "default_value": true,
      "required": false
    },
    "custom_quote_title": {
      "type": "text",
      "display_name": "Custom Quote Title",
      "default_value": "Need a Custom Solution?",
      "translatable": true,
      "required": false
    },
    "custom_quote_description": {
      "type": "textarea",
      "display_name": "Custom Quote Description",
      "default_value": "Large enterprise or have specific requirements? Let us create a tailored package that fits your business needs and budget.",
      "translatable": true,
      "required": false
    },
    "custom_quote_cta": {
      "type": "text",
      "display_name": "Custom Quote CTA Text",
      "default_value": "Get Custom Quote",
      "translatable": true,
      "required": false
    },
    "custom_quote_cta_link": {
      "type": "multilink",
      "display_name": "Custom Quote CTA Link",
      "required": false
    },
    "whatsapp_number": {
      "type": "text",
      "display_name": "WhatsApp Number",
      "description": "Format: 971501234567 (without +)",
      "default_value": "971501234567",
      "required": false
    }
  }
}

```


### Supporting Components:

**Pricing Package Component:** `pricing_package`

```json
{
  "name": "pricing_package",
  "component": "pricing_package",
  "display_name": "Pricing Package",
  "description": "Individual pricing package with features and pricing details",
  "schema": {
    "name": {
      "type": "text",
      "display_name": "Package Name",
      "translatable": true,
      "required": true
    },
    "subtitle": {
      "type": "text",
      "display_name": "Package Subtitle",
      "translatable": true,
      "required": false
    },
    "price": {
      "type": "text",
      "display_name": "Price",
      "translatable": true,
      "required": true
    },
    "currency": {
      "type": "text",
      "display_name": "Currency",
      "default_value": "AED",
      "translatable": true,
      "required": false
    },
    "price_suffix": {
      "type": "text",
      "display_name": "Price Suffix",
      "description": "e.g., '+', '/month'",
      "translatable": true,
      "required": false
    },
    "price_note": {
      "type": "text",
      "display_name": "Price Note",
      "description": "e.g., 'One-time payment'",
      "translatable": true,
      "required": false
    },
    "features": {
      "type": "textarea",
      "display_name": "Features List",
      "description": "One feature per line",
      "translatable": true,
      "required": false
    },
    "includes_cms": {
      "type": "boolean",
      "display_name": "Includes CMS",
      "default_value": true,
      "required": false
    },
    "cta_text": {
      "type": "text",
      "display_name": "CTA Text",
      "translatable": true,
      "required": false
    },
    "cta_link": {
      "type": "multilink",
      "display_name": "CTA Link",
      "required": false
    },
    "is_popular": {
      "type": "boolean",
      "display_name": "Mark as Popular",
      "required": false
    },
    "popular_text": {
      "type": "text",
      "display_name": "Popular Badge Text",
      "default_value": "Most Popular",
      "translatable": true,
      "required": false
    },
    "additional_info": {
      "type": "text",
      "display_name": "Additional Info",
      "translatable": true,
      "required": false
    },
    "icon": {
      "type": "asset",
      "display_name": "Package Icon",
      "filetypes": ["images"],
      "required": false
    }
  }
}
```

**Value Proposition Item Component:** `value_prop_item`

```json
{
  "name": "value_prop_item",
  "component": "value_prop_item",
  "display_name": "Value Proposition Item",
  "description": "Individual value proposition highlighting package benefits",
  "schema": {
    "title": {
      "type": "text",
      "display_name": "Value Prop Title",
      "translatable": true,
      "required": true
    },
    "description": {
      "type": "text",
      "display_name": "Value Prop Description",
      "translatable": true,
      "required": false
    },
    "icon": {
      "type": "asset",
      "display_name": "Value Prop Icon",
      "filetypes": ["images"],
      "required": false
    }
  }
}
```

# FAQ Blok Schema (Storyblok)

**Component Name:** `faq`

A reusable FAQ section for any page. Use this blok in the page body wherever FAQs are needed.

## Schema

```json
{
  "name": "faq",
  "component": "faq",
  "display_name": "FAQ Section",
  "description": "A section with frequently asked questions and answers. First 5 FAQs visible, rest scrollable.",
  "is_root": false,
  "is_nestable": true,
  "schema": {
    "faq_title": {
      "type": "text",
      "display_name": "FAQ Title",
      "default_value": "Frequently Asked Questions",
      "translatable": true,
      "required": false
    },
    "faq_description": {
      "type": "textarea",
      "display_name": "FAQ Description",
      "translatable": true,
      "required": false
    },
    "background_color": {
      "type": "text",
      "display_name": "Background Color",
      "description": "Enter HEX color code (e.g., #FFFFFF for white, #F3F4F6 for light gray)",
      "default_value": "#FFFFFF",
      "required": false
    },
    "faqs": {
      "type": "bloks",
      "display_name": "FAQs",
      "restrict_components": true,
      "component_whitelist": ["faq_item"],
      "required": true
    }
  }
}
```

## Supporting Component: `faq_item`

```json
{
  "name": "faq_item",
  "component": "faq_item",
  "display_name": "FAQ Item",
  "description": "A single question and answer for the FAQ section.",
  "is_root": false,
  "is_nestable": true,
  "schema": {
    "question": {
      "type": "text",
      "display_name": "Question",
      "translatable": true,
      "required": true
    },
    "answer": {
      "type": "textarea",
      "display_name": "Answer",
      "translatable": true,
      "required": true
    }
  }
}
```

## Setup Instructions

### Step 1: Create Main Components

1. Go to your Storyblok space
2. Navigate to Components
3. Create each of the 5 main components with their respective schemas:
   - `igentx_hero`
   - `why_choose_igentx`
   - `igentx_services`
   - `igentx_portfolio`
   - `igentx_pricing`

### Step 2: Create Supporting Components

Create all the supporting components listed above. The main components reference these nested components:

**For IGENTX Hero:**
- `hero_slide` - Individual slides for carousel mode
- `trust_signal_item` - Trust indicators/statistics

**For Why Choose IGENTX:**
- `differentiator_feature` - Individual features/benefits

**For IGENTX Services:**
- `service_item` - Individual service offerings

**For IGENTX Portfolio:**
- `case_study_item` - Individual portfolio projects

**For IGENTX Pricing:**
- `pricing_package` - Individual pricing tiers

### Step 3: Update Page Component

Add the new IGENTX components to your existing `page` component's `body` field whitelist:

```json
{
  "component_whitelist": [
    "hero",
    "features",
    "about",
    "form",
    "igentx_hero",
    "why_choose_igentx",
    "igentx_services",
    "igentx_portfolio",
    "igentx_pricing"
  ]
}
```

### Step 4: Create Content

1. Create a new story called "home"
2. Use the `page` component
3. Add the IGENTX components in this order:
   - IGENTX Hero
   - Why Choose IGENTX
   - IGENTX Services
   - IGENTX Portfolio
   - IGENTX Pricing

### Step 5: Configure Default Values

Use the default content provided in `/lib/igentx-default-content.ts` as a reference for populating your Storyblok content.

---

## Tips for Content Creation

1. **Hero Section** (Slider-Only): Create 1-5 slides to showcase your value propositions, seasonal offers, or key services.
   - **Required**: At least 1 `hero_slide` block
   - **Recommended**: 2-5 slides for dynamic carousel
   - Each slide can have its own:
     - Badge text (optional announcement)
     - Three-part headline with gradient effect
     - Subheadline for description
     - Featured image (1200x1200px square recommended)
     - Quick features list (3-5 bullet points)
     - Primary and secondary CTAs
     - Trust signals (stats, metrics)
   - Keep headlines concise and impactful for better readability
   - Use high-quality images that represent your brand and services
   - See [Hero Slider Quick Start Guide](./features/HERO_SLIDER_QUICKSTART.md) for step-by-step setup

2. **Why Choose IGENTX**: Highlight your differentiators with specific metrics and UAE-focused trust signals.

3. **Services**: Use clear pricing ranges and emphasize the CMS inclusion to differentiate from competitors.

4. **Portfolio**: Include real performance metrics and UAE-based testimonials to build credibility.

5. **Pricing**: Make sure to emphasize the value proposition of including Storyblok CMS from day one.

Remember to optimize all images for web performance and include proper alt text for accessibility.

---

## Hero Slider Resources

The IGENTX Hero is now a **slider-only component** with powerful carousel features:

- 📖 [Hero Slider Setup Guide](./features/HERO_SLIDER_QUICKSTART.md) - Get started in 5 minutes
- 📋 [Hero Slider Schema](./features/HERO_SLIDER_SCHEMA.md) - Complete documentation
- 🎬 [Hero Slider Animations](./features/HERO_SLIDER_ANIMATIONS.md) - Animation details and customization
- 📄 [Hero Slider JSON](./features/HERO_SLIDER_SCHEMA.json) - Ready-to-import schema

**Key Features:**
- **Slider-only mode** - Requires 1+ `hero_slide` blocks
- Auto-playing carousel with configurable delay (default: 5s, only with 2+ slides)
- Smooth transitions with staggered content reveal animations
- Navigation buttons + pagination dots (shown with 2+ slides)
- Pause on hover for better UX
- Fully responsive (two-column on desktop, stacked on mobile)
- Two-column layout with content + featured image for all slides

---

## Migration Guide: Single Hero → Slider

> ⚠️ **Breaking Change Alert**: The old single-hero mode has been removed. Follow these steps to migrate existing content.

### What Changed?

**Before** (Old):
- Root-level fields for content (badge_text, headline_part1, etc.)
- Optional `slides` field for carousel mode
- Two different layouts (centered vs. two-column)

**After** (New - Slider-Only):
- **No root-level content fields**
- **Required** `slides` field with `hero_slide` blocks
- Consistent two-column layout for all slides

### Migration Steps:

#### Step 1: Create `hero_slide` Component (if not exists)

Go to Storyblok → Block Library → Create the `hero_slide` component using the schema above.

#### Step 2: Migrate Your Content

For each page using `igentx_hero`:

1. **Open the page** in Storyblok editor
2. **Locate the `igentx_hero` component**
3. **Click "+ Add Block"** in the `slides` field
4. **Select "Hero Slide"**
5. **Copy your content** from the old root-level fields:
   - Copy `badge_text` → slide's `badge_text`
   - Copy `headline_part1` → slide's `headline_part1`
   - Copy `headline_part2` → slide's `headline_part2`
   - Copy `headline_part3` → slide's `headline_part3`
   - Copy `subheadline` → slide's `subheadline`
   - Copy `primary_cta_text` → slide's `primary_cta_text`
   - Copy `primary_cta_link` → slide's `primary_cta_link`
   - Copy `secondary_cta_text` → slide's `secondary_cta_text`
   - Copy `secondary_cta_link` → slide's `secondary_cta_link`
   - Copy `trust_signals` → slide's `trust_signals`
6. **Add a featured image** (required for best layout)
7. **Remove old root-level content** (Storyblok will show warnings for unknown fields)
8. **Save and publish**

#### Step 3: Update Component Schema in Storyblok

1. Go to Storyblok → Block Library → `igentx_hero`
2. **Remove all old content fields**:
   - Remove: `badge_text`, `headline_part1`, `headline_part2`, `headline_part3`
   - Remove: `subheadline`, `background_image`, `background_video`
   - Remove: `primary_cta_text`, `primary_cta_link`
   - Remove: `secondary_cta_text`, `secondary_cta_link`
   - Remove: `trust_signals`
3. **Keep only these fields**:
   - `slides` (Blocks, required, restrict to: `hero_slide`)
   - `enable_autoplay` (Boolean, default: true)
   - `autoplay_delay` (Number, default: 5000)
4. **Save the component**

#### Step 4: Test Your Pages

- Visit each migrated page
- Verify slides display correctly
- Test navigation (if 2+ slides)
- Check animations and responsiveness
- Test on mobile devices

### Example Migration:

**Old Structure:**
```json
{
  "component": "igentx_hero",
  "badge_text": "🚀 New Feature",
  "headline_part1": "AI-Driven Web &",
  "headline_part2": "Branding Solutions",
  "headline_part3": "for Fast-Growing Businesses",
  "subheadline": "Transform your digital presence...",
  "primary_cta_text": "Get Started",
  "primary_cta_link": { "url": "/contact" },
  "trust_signals": [...]
}
```

**New Structure:**
```json
{
  "component": "igentx_hero",
  "slides": [
    {
      "component": "hero_slide",
      "badge_text": "🚀 New Feature",
      "headline_part1": "AI-Driven Web &",
      "headline_part2": "Branding Solutions",
      "headline_part3": "for Fast-Growing Businesses",
      "subheadline": "Transform your digital presence...",
      "featured_image": { "filename": "..." },
      "primary_cta_text": "Get Started",
      "primary_cta_link": { "url": "/contact" },
      "trust_signals": [...]
    }
  ],
  "enable_autoplay": true,
  "autoplay_delay": 5000
}
```

### Benefits of Migration:

✅ **Consistent UX** - Same layout for all hero sections
✅ **More Flexible** - Easy to add seasonal/promotional slides
✅ **Better Performance** - Simplified component logic
✅ **Cleaner Schema** - No field duplication
✅ **Modern Design** - Two-column layout with featured images

### Need Help?

If you encounter issues during migration:
1. Check the [Quick Start Guide](./features/HERO_SLIDER_QUICKSTART.md)
2. Review the [Schema Documentation](./features/HERO_SLIDER_SCHEMA.md)
3. Ensure the `hero_slide` component is created correctly
