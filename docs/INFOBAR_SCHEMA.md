# Info Bar Component Schema

## Overview
The Info Bar is a top banner that appears above the main navigation header. It displays important information like messages, WhatsApp contact, social media links, and language switcher. It smoothly hides when the user scrolls down.

## Component: `info_bar`

### Fields Configuration

#### 1. **message** (Text)
- **Type**: Text
- **Display Name**: Message
- **Description**: Short message or announcement to display in the info bar
- **Required**: No
- **Example**: "🚀 Trusted by Fast-Growing UAE Startups"

#### 2. **whatsapp_number** (Text)
- **Type**: Text
- **Display Name**: WhatsApp Number
- **Description**: WhatsApp contact number (include country code, e.g., +971501234567)
- **Required**: No
- **Example**: "+971501234567"

#### 3. **whatsapp_text** (Text)
- **Type**: Text
- **Display Name**: WhatsApp Pre-filled Text
- **Description**: Pre-filled message when user clicks WhatsApp link
- **Required**: No
- **Example**: "Hello, I'm interested in your services"

#### 4. **show_language_switcher** (Boolean)
- **Type**: Boolean
- **Display Name**: Show Language Switcher
- **Description**: Display the language switcher in the info bar
- **Required**: No
- **Default**: true

#### 5. **social_links** (Blocks)
- **Type**: Blocks
- **Display Name**: Social Links
- **Description**: Social media links to display
- **Required**: No
- **Allowed Blocks**: `social_link`
- **Maximum**: 6

---

## Nested Component: `social_link`

### Fields Configuration

#### 1. **platform** (Text)
- **Type**: Text
- **Display Name**: Platform Name
- **Description**: Social media platform name (facebook, twitter, instagram, linkedin, youtube, etc.)
- **Required**: Yes
- **Example**: "facebook"

#### 2. **url** (Link)
- **Type**: Link / URL
- **Display Name**: Social Media URL
- **Description**: Full URL to your social media profile
- **Required**: Yes
- **Example**: "https://facebook.com/yourpage"

#### 3. **icon** (Text)
- **Type**: Text
- **Display Name**: Custom Icon (Optional)
- **Description**: Custom icon emoji or text (leave empty to use default platform icon)
- **Required**: No
- **Example**: "📱" or "FB"

---

## Updated Header Schema

Add the info bar to your `header_navigation` component:

### Add New Field to `header_navigation`:

#### **info_bar** (Blocks)
- **Type**: Blocks
- **Display Name**: Info Bar
- **Description**: Top banner with contact info and announcements
- **Required**: No
- **Allowed Blocks**: `info_bar`
- **Maximum**: 1

---

## Implementation Steps

### 1. Create `social_link` Component
```
Component Name: social_link
Display Name: Social Link
```

Fields:
- `platform` (text, required)
- `url` (link, required)
- `icon` (text, optional)

### 2. Create `info_bar` Component
```
Component Name: info_bar
Display Name: Info Bar
Is Nestable: No (top-level component)
```

Fields:
- `message` (text)
- `whatsapp_number` (text)
- `whatsapp_text` (text)
- `show_language_switcher` (boolean, default: true)
- `social_links` (blocks, allow: social_link, max: 6)

### 3. Update `header_navigation` Component

Add new field:
- `info_bar` (blocks, allow: info_bar, max: 1)

---

## Example JSON Structure

```json
{
  "info_bar": [
    {
      "component": "info_bar",
      "message": "🚀 Trusted by Fast-Growing UAE Startups",
      "whatsapp_number": "+971501234567",
      "whatsapp_text": "Hello, I'm interested in your services",
      "show_language_switcher": true,
      "social_links": [
        {
          "component": "social_link",
          "platform": "facebook",
          "url": "https://facebook.com/igentx",
          "icon": ""
        },
        {
          "component": "social_link",
          "platform": "twitter",
          "url": "https://twitter.com/igentx",
          "icon": ""
        },
        {
          "component": "social_link",
          "platform": "instagram",
          "url": "https://instagram.com/igentx",
          "icon": ""
        },
        {
          "component": "social_link",
          "platform": "linkedin",
          "url": "https://linkedin.com/company/igentx",
          "icon": ""
        }
      ]
    }
  ]
}
```

---

## Features

✅ **Smooth Hide on Scroll**: Info bar smoothly slides up when user scrolls down
✅ **Responsive Design**: Mobile-friendly with content moved to hamburger menu
✅ **Language Switcher**: Moved from main nav to info bar for better UX
✅ **WhatsApp Integration**: Direct WhatsApp link with pre-filled message
✅ **Social Media Icons**: Built-in icons for popular platforms
✅ **Custom Icons**: Support for emoji or custom text icons
✅ **RTL Support**: Full right-to-left language support
✅ **Glassmorphic Design**: Modern gradient background

---

## Styling

- **Background**: Blue gradient (from-blue-600 to-blue-700)
- **Text Color**: White
- **Height**: 48px (3rem)
- **Transition**: 500ms ease-in-out
- **Icons**: 20px (w-5 h-5)

---

## Mobile Behavior

On mobile (< 1024px):
- Info bar is hidden from top
- All info bar content appears at bottom of hamburger menu
- Language switcher included
- WhatsApp contact with icon
- Social links displayed horizontally

---

## Supported Social Platforms

Default icons provided for:
- Facebook
- Twitter / X
- Instagram
- LinkedIn
- YouTube

Custom icons supported for any other platform.
