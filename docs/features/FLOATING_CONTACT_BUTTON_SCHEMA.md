# Floating Contact Button Schema

## Overview
This document provides the complete Storyblok schema for the Floating Contact Button blok. This blok should be added to your Header content type in Storyblok.

## Blok Name
`floating_contact_button`

## Complete JSON Schema

```json
{
  "name": "floating_contact_button",
  "display_name": "Floating Contact Button",
  "schema": {
    "enabled": {
      "type": "boolean",
      "default_value": true,
      "display_name": "Enable Floating Button",
      "description": "Show/hide the floating contact button on all pages"
    },
    "button_label": {
      "type": "text",
      "display_name": "Button Label (Accessibility)",
      "description": "Screen reader label for the button",
      "default_value": "Contact us"
    },
    "modal_title": {
      "type": "text",
      "display_name": "Modal Title",
      "default_value": "Contact Us"
    },
    "modal_subtitle": {
      "type": "text",
      "display_name": "Modal Subtitle",
      "default_value": "Choose your preferred method"
    },
    "modal_footer_text": {
      "type": "text",
      "display_name": "Modal Footer Text",
      "default_value": "We're here to help! Choose any method to reach us"
    },
    "phone": {
      "type": "text",
      "display_name": "Phone Number",
      "description": "Format: +971 4 123 4567"
    },
    "phone_label": {
      "type": "text",
      "display_name": "Phone Label",
      "default_value": "Phone"
    },
    "email": {
      "type": "text",
      "display_name": "Email Address"
    },
    "email_label": {
      "type": "text",
      "display_name": "Email Label",
      "default_value": "Email"
    },
    "whatsapp_number": {
      "type": "text",
      "display_name": "WhatsApp Number",
      "description": "International format without + or spaces: 971501234567"
    },
    "whatsapp_label": {
      "type": "text",
      "display_name": "WhatsApp Label",
      "default_value": "WhatsApp"
    },
    "whatsapp_message": {
      "type": "textarea",
      "display_name": "WhatsApp Pre-filled Message",
      "description": "Default message when user opens WhatsApp"
    },
    "address": {
      "type": "textarea",
      "display_name": "Physical Address"
    },
    "address_label": {
      "type": "text",
      "display_name": "Address Label",
      "default_value": "Address"
    },
    "social_links_title": {
      "type": "text",
      "display_name": "Social Links Title",
      "default_value": "Follow us on"
    },
    "social_links": {
      "type": "bloks",
      "restrict_type": "",
      "restrict_components": true,
      "component_whitelist": ["social_link"],
      "display_name": "Social Media Links"
    },
    "button_position": {
      "type": "option",
      "display_name": "Button Position",
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
      "default_value": "bottom-right"
    },
    "button_color": {
      "type": "option",
      "display_name": "Button Color Theme",
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
      "default_value": "blue"
    },
    "show_notification_badge": {
      "type": "boolean",
      "display_name": "Show Notification Badge",
      "description": "Display the red notification badge on the button",
      "default_value": false
    }
  },
  "is_root": false,
  "preview_field": null,
  "is_nestable": true,
  "all_presets": [],
  "preset_id": null,
  "real_name": "floating_contact_button",
  "component_group_uuid": null
}
```

## Social Link Blok Schema

You'll also need the `social_link` blok (if not already created):

```json
{
  "name": "social_link",
  "display_name": "Social Link",
  "schema": {
    "platform": {
      "type": "option",
      "display_name": "Platform",
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
      ]
    },
    "url": {
      "type": "text",
      "display_name": "Profile URL",
      "description": "Full URL to your social media profile"
    },
    "icon": {
      "type": "asset",
      "display_name": "Custom Icon (Optional)",
      "description": "Override default icon with custom image"
    }
  },
  "is_root": false,
  "is_nestable": true
}
```

## Setup Instructions

### Step 1: Create the Blok in Storyblok

1. Go to **Storyblok** → **Block Library**
2. Click **+ New Block**
3. Name it: `floating_contact_button`
4. Copy and paste the schema fields above
5. Save the block

### Step 2: Create Social Link Blok (if needed)

1. Click **+ New Block**
2. Name it: `social_link`
3. Copy and paste the social link schema
4. Save the block

### Step 3: Add to Header Content Type

1. Go to your **Header** content type
2. Add a new field: **Floating Contact Button**
3. Field type: **Blocks**
4. Restrict to component: `floating_contact_button`
5. Set to **Single-option** (only one floating button)
6. Save

### Step 4: Configure in Storyblok

1. Open your Header story
2. Add the **Floating Contact Button** blok
3. Enable it and fill in your contact details:
   - Phone: `+971 4 123 4567`
   - Email: `hello@igentx.com`
   - WhatsApp: `971501234567`
   - WhatsApp Message: `Hello! I'm interested in your services.`
   - Address: `Dubai Silicon Oasis, Dubai, UAE`
4. Add social links as needed
5. Customize button color and position
6. Save and publish

## Field Descriptions

| Field | Type | Purpose | Required |
|-------|------|---------|----------|
| `enabled` | Boolean | Control visibility globally | No (default: true) |
| `button_label` | Text | Accessibility label | No |
| `modal_title` | Text | Header title in modal | No |
| `modal_subtitle` | Text | Subtitle in modal header | No |
| `modal_footer_text` | Text | Footer message | No |
| `phone` | Text | Phone number for calls | No |
| `phone_label` | Text | Custom phone label | No |
| `email` | Text | Email address | No |
| `email_label` | Text | Custom email label | No |
| `whatsapp_number` | Text | WhatsApp number (international) | No |
| `whatsapp_label` | Text | Custom WhatsApp label | No |
| `whatsapp_message` | Textarea | Pre-filled message | No |
| `address` | Textarea | Physical address | No |
| `address_label` | Text | Custom address label | No |
| `social_links_title` | Text | Social section title | No |
| `social_links` | Blocks | Array of social_link bloks | No |
| `button_position` | Option | Bottom-right or bottom-left | No |
| `button_color` | Option | Color theme (blue/green/purple/orange) | No |
| `show_notification_badge` | Boolean | Show red notification badge | No |

## Example Configuration

```json
{
  "component": "floating_contact_button",
  "enabled": true,
  "button_label": "Contact us",
  "modal_title": "Contact Us",
  "modal_subtitle": "Choose your preferred method",
  "modal_footer_text": "We're here to help! Choose any method to reach us",
  "phone": "+971 4 123 4567",
  "phone_label": "Call Us",
  "email": "hello@igentx.com",
  "email_label": "Email Us",
  "whatsapp_number": "971501234567",
  "whatsapp_label": "Chat on WhatsApp",
  "whatsapp_message": "Hello! I'm interested in your web development services.",
  "address": "Office 123, Building ABC\nDubai Silicon Oasis\nDubai, UAE",
  "address_label": "Visit Us",
  "social_links_title": "Follow us on",
  "social_links": [
    {
      "component": "social_link",
      "platform": "facebook",
      "url": "https://facebook.com/igentx"
    },
    {
      "component": "social_link",
      "platform": "linkedin",
      "url": "https://linkedin.com/company/igentx"
    },
    {
      "component": "social_link",
      "platform": "instagram",
      "url": "https://instagram.com/igentx"
    }
  ],
  "button_position": "bottom-right",
  "button_color": "blue",
  "show_notification_badge": true
}
```

## Multilingual Support

All text fields support Storyblok's translation feature. Configure translations for:
- `button_label`
- `modal_title`
- `modal_subtitle`
- `modal_footer_text`
- `phone_label`
- `email_label`
- `whatsapp_label`
- `whatsapp_message`
- `address`
- `address_label`
- `social_links_title`

## Color Theme Options

### Blue (Default)
- Primary: `from-blue-600 to-blue-700`
- Hover: `from-blue-700 to-blue-800`

### Green
- Primary: `from-green-600 to-green-700`
- Hover: `from-green-700 to-green-800`

### Purple
- Primary: `from-purple-600 to-purple-700`
- Hover: `from-purple-700 to-purple-800`

### Orange
- Primary: `from-orange-600 to-orange-700`
- Hover: `from-orange-700 to-orange-800`

## Notes

- At least one contact method should be provided for the button to appear
- WhatsApp number should be in international format without + or spaces
- Phone can include spaces and special characters for display
- Social links are optional but recommended
- The button respects RTL languages automatically
- Dark mode is fully supported

---

**Schema Version**: 1.0.0
**Last Updated**: October 26, 2025

