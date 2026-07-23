# Contact Page Setup Guide

This guide explains how to set up and customize the comprehensive Contact Page system in your Storyblok CMS.

## Overview

The Contact Page system provides:
- **Contact Detail Cards**: Editable cards for WhatsApp, Email, Phone, Location, Hours, and Website
- **Dynamic Contact Form**: Fully configurable form with validation
- **Optional Map Integration**: Embed Google Maps or other mapping services
- **Mobile Responsive**: Beautiful design that works on all devices

> **Note**: For FAQ sections, use the separate `faq` component which can be added to any page

## Table of Contents

1. [Contact Page Component Schema](#contact-page-component-schema)
2. [Contact Card Component Schema](#contact-card-component-schema)
3. [Form Component Schema](#form-component-schema)
4. [Setup Instructions](#setup-instructions)
5. [Customization Guide](#customization-guide)
6. [Usage Examples](#usage-examples)

---

## Contact Page Component Schema

### Component Name: `contact_page`

```json
{
  "name": "contact_page",
  "display_name": "Contact Page",
  "schema": {
    "badge_text": {
      "type": "text",
      "pos": 0,
      "description": "Badge text above the title (e.g., '💬 We're Here to Help')"
    },
    "title": {
      "type": "text",
      "pos": 1,
      "required": true,
      "default_value": "Get In Touch With Us",
      "description": "Main page title"
    },
    "description": {
      "type": "textarea",
      "pos": 2,
      "description": "Subtitle/description text below the title"
    },
    "contact_cards_title": {
      "type": "text",
      "pos": 3,
      "default_value": "Contact Information",
      "description": "Title for the contact cards section"
    },
    "contact_cards": {
      "type": "bloks",
      "pos": 4,
      "restrict_components": true,
      "component_whitelist": ["contact_card"],
      "description": "Add contact detail cards (WhatsApp, Email, Phone, etc.)"
    },
    "additional_info": {
      "type": "textarea",
      "pos": 5,
      "description": "Additional information displayed below contact cards (e.g., multilingual support message)"
    },
    "form_section_title": {
      "type": "text",
      "pos": 6,
      "default_value": "Send Us a Message",
      "description": "Title for the form section"
    },
    "form_section_description": {
      "type": "textarea",
      "pos": 7,
      "description": "Description text above the form"
    },
    "form": {
      "type": "bloks",
      "pos": 8,
      "restrict_components": true,
      "component_whitelist": ["form"],
      "maximum": 1,
      "description": "Contact form (only one form allowed)"
    },
    "show_map": {
      "type": "boolean",
      "pos": 9,
      "default_value": false,
      "description": "Toggle to show/hide the map section"
    },
    "map_section_title": {
      "type": "text",
      "pos": 10,
      "default_value": "Find Us",
      "description": "Title for the map section"
    },
    "map_embed_url": {
      "type": "text",
      "pos": 11,
      "description": "Google Maps embed URL (get from Google Maps > Share > Embed a map)"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Contact"
}
```

---

## Contact Card Component Schema

### Component Name: `contact_card`

```json
{
  "name": "contact_card",
  "display_name": "Contact Card",
  "schema": {
    "type": {
      "type": "option",
      "pos": 0,
      "required": true,
      "options": [
        { "value": "whatsapp", "name": "WhatsApp" },
        { "value": "phone", "name": "Phone" },
        { "value": "email", "name": "Email" },
        { "value": "location", "name": "Location/Address" },
        { "value": "hours", "name": "Business Hours" },
        { "value": "website", "name": "Website" }
      ],
      "description": "Type of contact card (determines default icon if custom icon not provided)"
    },
    "label": {
      "type": "text",
      "pos": 1,
      "required": true,
      "description": "Card label (e.g., 'WhatsApp', 'Call Us', 'Email')"
    },
    "value": {
      "type": "text",
      "pos": 2,
      "required": true,
      "description": "Contact value (phone number, email, address, etc.)"
    },
    "subtitle": {
      "type": "text",
      "pos": 3,
      "description": "Additional info displayed below the value (e.g., 'Available 24/7')"
    },
    "show_value": {
      "type": "boolean",
      "pos": 4,
      "default_value": true,
      "description": "Toggle to show/hide the contact value (useful for privacy - e.g., hide WhatsApp number)"
    },
    "highlight": {
      "type": "boolean",
      "pos": 5,
      "default_value": false,
      "description": "Highlight this card with special styling to make it stand out (recommended/primary option)"
    },
    "icon": {
      "type": "asset",
      "pos": 6,
      "filetypes": ["images"],
      "description": "Custom icon for this card (optional - defaults to built-in icon based on type). Recommended: SVG or PNG, 64x64px"
    },
    "whatsapp_message": {
      "type": "textarea",
      "pos": 7,
      "display_name": "WhatsApp Pre-filled Message",
      "description": "Default message for WhatsApp (only for WhatsApp type)"
    },
    "map_link": {
      "type": "text",
      "pos": 8,
      "description": "Custom map link (only for location type, defaults to Google Maps)"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Contact"
}
```

---

## Form Component Schema

### Component Name: `form`

```json
{
  "name": "form",
  "display_name": "Contact Form",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0,
      "required": true,
      "description": "Form title (can be hidden if using page-level title)"
    },
    "description": {
      "type": "textarea",
      "pos": 1,
      "description": "Optional description below form title"
    },
    "fields": {
      "type": "custom",
      "field_type": "form-fields",
      "pos": 2,
      "required": true,
      "description": "Form fields configuration",
      "schema": [
        {
          "id": {
            "type": "text",
            "required": true,
            "description": "Unique field ID (e.g., 'name', 'email')"
          },
          "type": {
            "type": "option",
            "required": true,
            "options": [
              { "value": "text", "name": "Text Input" },
              { "value": "email", "name": "Email Input" },
              { "value": "textarea", "name": "Textarea" },
              { "value": "select", "name": "Dropdown" },
              { "value": "checkbox", "name": "Checkbox" },
              { "value": "radio", "name": "Radio Button" }
            ]
          },
          "label": {
            "type": "text",
            "required": true
          },
          "placeholder": {
            "type": "text"
          },
          "required": {
            "type": "boolean",
            "default_value": false
          },
          "options": {
            "type": "custom",
            "description": "For select/checkbox/radio fields",
            "schema": [
              {
                "label": { "type": "text", "required": true },
                "value": { "type": "text", "required": true }
              }
            ]
          },
          "validation": {
            "type": "custom",
            "schema": [
              {
                "type": {
                  "type": "option",
                  "options": [
                    { "value": "required", "name": "Required" },
                    { "value": "email", "name": "Email Format" },
                    { "value": "minLength", "name": "Min Length" },
                    { "value": "maxLength", "name": "Max Length" },
                    { "value": "pattern", "name": "Custom Pattern" }
                  ]
                },
                "value": { "type": "text" },
                "message": { "type": "text", "required": true }
              }
            ]
          }
        }
      ]
    },
    "submit_button_text": {
      "type": "text",
      "pos": 3,
      "required": true,
      "default_value": "Send Message"
    },
    "success_message": {
      "type": "text",
      "pos": 4,
      "required": true,
      "default_value": "Thank you! We'll get back to you soon."
    },
    "error_message": {
      "type": "text",
      "pos": 5,
      "required": true,
      "default_value": "Something went wrong. Please try again."
    },
    "email_subject": {
      "type": "text",
      "pos": 6,
      "required": true,
      "default_value": "New Contact Form Submission"
    },
    "email_body_description": {
      "type": "textarea",
      "pos": 7
    },
    "recipient_email": {
      "type": "text",
      "pos": 8,
      "required": true,
      "description": "Email address to receive form submissions"
    },
    "sender_email": {
      "type": "text",
      "pos": 9,
      "description": "From email address"
    },
    "sender_name": {
      "type": "text",
      "pos": 10,
      "description": "From name"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Forms"
}
```

---

## Setup Instructions

### Step 1: Create Components in Storyblok

1. Go to your Storyblok space
2. Navigate to **Components** (Block Library)
3. Create three new components using the schemas above:
   - `contact_page`
   - `contact_card`
   - `form`

### Step 2: Create Your Contact Story

1. In Storyblok, create a new story at the path: `contact`
2. Set the content type to use the `contact_page` component
3. Configure your contact page:

#### Hero Section
- **Badge Text**: `💬 We're Here to Help`
- **Title**: `Get In Touch With Us`
- **Description**: Your custom description

#### Add Contact Cards
Click "Add Contact Card" and add the following:

**WhatsApp Card:**
- Type: `whatsapp`
- Label: `WhatsApp`
- Value: `+971 50 123 4567`
- Subtitle: `Available 24/7`
- WhatsApp Message: `Hello! I would like to inquire about your services.`

**Phone Card:**
- Type: `phone`
- Label: `Phone`
- Value: `+971 50 123 4567`
- Subtitle: `Mon-Fri, 9AM-6PM GST`

**Email Card:**
- Type: `email`
- Label: `Email`
- Value: `hello@yourdomain.com`
- Subtitle: `We respond within 24 hours`

**Location Card:**
- Type: `location`
- Label: `Office`
- Value: `Dubai, United Arab Emirates`
- Subtitle: `By appointment only`
- Map Link: `https://maps.google.com/?q=YourAddress`

**Business Hours Card:**
- Type: `hours`
- Label: `Business Hours`
- Value: `Mon-Fri: 9:00 AM - 6:00 PM`
- Subtitle: `Saturday: 10:00 AM - 2:00 PM`

#### Add Contact Form
1. Click "Add Form"
2. Configure your form fields (see example below)
3. Set email settings (recipient, sender, etc.)

#### Optional: Add Map
1. Toggle `show_map` to `true`
2. Get embed URL from Google Maps:
   - Go to Google Maps
   - Search for your location
   - Click **Share** → **Embed a map**
   - Copy the iframe `src` URL
3. Paste into `map_embed_url`

### Step 3: Configure Email Settings

Ensure your environment variables are set for Mailjet (or your email service):

```env
MAILJET_API_KEY=your_api_key
MAILJET_SECRET_KEY=your_secret_key
MAILJET_FROM_EMAIL=noreply@yourdomain.com
MAILJET_FROM_NAME=Your Company Name
```

---

## Customization Guide

### Customizing Icons

Each contact card can have a custom icon uploaded from Storyblok:

1. **Upload Custom Icons**: In Storyblok, when editing a contact card, click on the **Icon** field
2. **Upload or Select**: Choose an image from your assets or upload a new one
3. **Recommended Format**: SVG (best) or PNG with transparent background
4. **Recommended Size**: 64x64px or larger (will be displayed at 24x24px)
5. **Color**: Icons will inherit the card's color scheme (blue or green for WhatsApp)

**Default Icons**: If no custom icon is provided, the system uses beautiful built-in icons based on the card type:
- Phone: Phone handset icon
- Email: Envelope icon
- WhatsApp: WhatsApp logo
- Location: Map pin icon
- Hours: Clock icon
- Website: Globe icon

**Icon Best Practices**:
- Use monochrome icons for consistency
- SVG format is preferred for crisp rendering at any size
- Keep icons simple and recognizable
- Test icons on both light and colored backgrounds

### Privacy & Highlighting Features

#### Hide Contact Values (`show_value`)
Perfect for privacy or encouraging specific contact methods:

**Use Cases:**
- **WhatsApp Privacy**: Show "WhatsApp" button without displaying the number
- **Email Privacy**: Hide email but allow clicks to open email client
- **Call-to-Action**: Force users to click rather than copy contact info

**When `show_value` is false:**
- Contact info is hidden
- Clickable cards show "Click to contact →" message
- Card remains fully functional (opens WhatsApp, email, etc.)

**Example:**
```json
{
  "type": "whatsapp",
  "label": "WhatsApp",
  "value": "+971501234567",
  "subtitle": "Fastest response time",
  "show_value": false,  // Number is hidden
  "highlight": true     // But card stands out
}
```

#### Highlight Cards (`highlight`)
Make specific contact methods stand out:

**Visual Effects:**
- Gradient blue background
- Stronger border color (blue-400)
- Enhanced shadow
- "Recommended" badge
- Bolder text
- Ring effect on icon
- Hover effects intensified

**Use Cases:**
- Highlight preferred contact method (e.g., WhatsApp)
- Draw attention to fastest response channel
- Promote business hours availability
- Feature primary contact option

**Best Practices:**
- Highlight only 1-2 cards maximum
- Use for your preferred/fastest contact method
- Combine with `show_value: false` for privacy + emphasis
- Great for WhatsApp as primary contact

**Example Configuration:**
```json
[
  {
    "type": "whatsapp",
    "highlight": true,          // ✨ Featured
    "show_value": false,        // 🔒 Private
    "label": "WhatsApp Us",
    "subtitle": "Available 24/7 - Fastest Response"
  },
  {
    "type": "phone",
    "highlight": false,         // Regular display
    "show_value": true,
    "label": "Call Us"
  },
  {
    "type": "email",
    "highlight": false,
    "show_value": true,
    "label": "Email"
  }
]
```

### Contact Card Types

#### WhatsApp
- Automatically opens WhatsApp with pre-filled message
- Use international format: `+[country code][number]`
- Remove spaces: `+971501234567` (not `+971 50 123 4567`)
- **Pro Tip**: Set `show_value: false` and `highlight: true` for privacy + emphasis

#### Phone
- Creates clickable tel: link
- Displays formatted number to users

#### Email
- Creates mailto: link
- Opens user's default email client

#### Location
- Links to Google Maps by default
- Can override with custom map link
- Opens in new tab

#### Hours
- Displays business hours
- Non-clickable informational card

#### Website
- Links to external website
- Opens in new tab

### Form Field Configuration

#### Common Field Types:

**Text Field:**
```json
{
  "id": "name",
  "type": "text",
  "label": "Full Name",
  "placeholder": "John Doe",
  "required": true,
  "validation": [
    {
      "type": "required",
      "message": "Name is required"
    },
    {
      "type": "minLength",
      "value": 2,
      "message": "Name must be at least 2 characters"
    }
  ]
}
```

**Email Field:**
```json
{
  "id": "email",
  "type": "email",
  "label": "Email Address",
  "placeholder": "john@example.com",
  "required": true,
  "validation": [
    {
      "type": "required",
      "message": "Email is required"
    },
    {
      "type": "email",
      "message": "Please enter a valid email"
    }
  ]
}
```

**Dropdown Field:**
```json
{
  "id": "service",
  "type": "select",
  "label": "Service Interested In",
  "required": true,
  "options": [
    { "label": "Web Development", "value": "web-dev" },
    { "label": "Mobile App", "value": "mobile" },
    { "label": "Consulting", "value": "consulting" }
  ],
  "validation": [
    {
      "type": "required",
      "message": "Please select a service"
    }
  ]
}
```

**Textarea Field:**
```json
{
  "id": "message",
  "type": "textarea",
  "label": "Message",
  "placeholder": "Tell us about your project...",
  "required": true,
  "validation": [
    {
      "type": "required",
      "message": "Message is required"
    },
    {
      "type": "minLength",
      "value": 20,
      "message": "Please provide at least 20 characters"
    }
  ]
}
```

### Styling Customization

The contact page uses Tailwind CSS classes. To customize:

1. Edit `/components/blocks/contact/ContactPage.tsx`
2. Modify class names to match your design system
3. Key sections to customize:
   - Hero gradient: `bg-gradient-to-b from-white to-gray-50`
   - Card hover effects: `hover:border-blue-300 hover:shadow-lg`
   - Form container: `bg-white rounded-2xl shadow-xl`
   - Button colors: `bg-blue-600 hover:bg-blue-700`

---

## Usage Examples

### Multilingual Support

Add language-specific messages in `additional_info`:

```text
We also speak Arabic! Feel free to contact us in your preferred language.
نحن نتحدث العربية أيضاً! لا تتردد في التواصل معنا بلغتك المفضلة.
```

### UAE-Specific Configuration

For UAE businesses:
- Use `+971` country code
- Include GST timezone in business hours
- Add Arabic language support message
- Consider adding location in both English and Arabic

### Multiple Locations

Create multiple location cards:

```json
{
  "type": "location",
  "label": "Dubai Office",
  "value": "Business Bay, Dubai, UAE",
  "map_link": "..."
},
{
  "type": "location",
  "label": "Abu Dhabi Office",
  "value": "Al Maryah Island, Abu Dhabi, UAE",
  "map_link": "..."
}
```

### Social Media Integration

While contact cards focus on direct contact methods, you can add a website card linking to your social media profiles or integrate with the footer's social links.

---

## Design Features

### Mobile Responsive
- Contact cards stack vertically on mobile
- Form becomes full-width
- Touch-optimized buttons and inputs
- Larger touch targets for phone/email links

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Focus states on all interactive elements

### Performance
- Lazy loading for map iframe
- Optimized images
- Minimal JavaScript
- Fast page load times

---

## Troubleshooting

### Contact Cards Not Showing
1. Verify component name is exactly `contact_card`
2. Check component_whitelist in contact_page schema
3. Ensure cards are properly nested in `contact_cards` field

### Form Not Submitting
1. Check `/api/contact` route is working
2. Verify email environment variables
3. Check browser console for errors
4. Ensure recipient_email is set

### Map Not Displaying
1. Verify `show_map` is set to `true`
2. Check embed URL is correct (should be iframe src, not page URL)
3. Ensure URL starts with `https://`

### WhatsApp Link Not Working
1. Use international format: `+[country][number]`
2. Remove all spaces and special characters
3. Example: `+971501234567` (not `+971 50 123 4567`)

---

## Related Documentation

- [Form Setup with Mailjet](../features/MAILJET_FORM_SETUP.md)
- [Contact Card Features Guide](./CONTACT_CARD_FEATURES.md)
- [Contact Page Schema Reference](./CONTACT_PAGE_SCHEMA.md)

---

## Support

For issues or questions:
1. Check this documentation
2. Review component schemas in Storyblok
3. Check browser console for errors
4. Contact your development team

---

**Last Updated**: October 2025
**Component Version**: 1.0.0

