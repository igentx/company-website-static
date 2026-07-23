# Contact Page - Storyblok Schema Quick Reference

Complete schema definitions for the Contact Page system with editable contact cards and the new **Generic Form Builder**.

> **✨ New in v2.0**: This guide now uses the Generic Form Builder with nested `form_field` blocks for maximum flexibility. The legacy JSON-based field configuration is still supported for backward compatibility.

## Key Features

- 🎨 **Beautiful Contact Cards** - Editable cards with custom icons, privacy controls, and highlighting
- 📝 **Generic Form Builder** - Visual form builder with 10+ field types
- ✉️ **Mailjet Integration** - Automated email delivery for form submissions
- 🎯 **Smart Validation** - Field-level validation with custom rules
- 📱 **Responsive Design** - Mobile-first, modern UI with smooth animations
- 🌐 **Multi-language Ready** - Built for internationalization

## 📋 Table of Contents

1. [Contact Page Component](#1-contact-page-component)
2. [Contact Card Component](#2-contact-card-component)  
3. [Form Component](#3-form-component)
4. [Form Field Component](#4-form-field-component)
5. [Example Configuration](#example-configuration)

---

## 1. Contact Page Component

**Component Name**: `contact_page`

### JSON Schema

```json
{
  "name": "contact_page",
  "display_name": "Contact Page",
  "schema": {
    "badge_text": {
      "type": "text",
      "pos": 0,
      "description": "Badge text above the title"
    },
    "title": {
      "type": "text",
      "pos": 1,
      "required": true,
      "default_value": "Get In Touch With Us"
    },
    "description": {
      "type": "textarea",
      "pos": 2,
      "description": "Page description/subtitle"
    },
    "contact_cards_title": {
      "type": "text",
      "pos": 3,
      "default_value": "Contact Information"
    },
    "contact_cards": {
      "type": "bloks",
      "pos": 4,
      "restrict_components": true,
      "component_whitelist": ["contact_card"]
    },
    "additional_info": {
      "type": "textarea",
      "pos": 5,
      "description": "Additional info below contact cards"
    },
    "form_section_title": {
      "type": "text",
      "pos": 6,
      "default_value": "Send Us a Message"
    },
    "form_section_description": {
      "type": "textarea",
      "pos": 7
    },
    "form": {
      "type": "bloks",
      "pos": 8,
      "restrict_components": true,
      "component_whitelist": ["form"],
      "maximum": 1
    },
    "show_map": {
      "type": "boolean",
      "pos": 9,
      "default_value": false
    },
    "map_section_title": {
      "type": "text",
      "pos": 10,
      "default_value": "Find Us"
    },
    "map_embed_url": {
      "type": "text",
      "pos": 11,
      "description": "Google Maps embed URL"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Contact"
}
```

---

## 2. Contact Card Component

**Component Name**: `contact_card`

### JSON Schema

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
        { "value": "location", "name": "Location" },
        { "value": "hours", "name": "Business Hours" },
        { "value": "website", "name": "Website" }
      ]
    },
    "label": {
      "type": "text",
      "pos": 1,
      "required": true
    },
    "value": {
      "type": "text",
      "pos": 2,
      "required": true
    },
    "subtitle": {
      "type": "text",
      "pos": 3
    },
    "show_value": {
      "type": "boolean",
      "pos": 4,
      "default_value": true,
      "description": "Show/hide contact value (for privacy)"
    },
    "highlight": {
      "type": "boolean",
      "pos": 5,
      "default_value": false,
      "description": "Highlight this card (recommended option)"
    },
    "icon": {
      "type": "asset",
      "pos": 6,
      "filetypes": ["images"],
      "description": "Custom icon (optional, 64x64px recommended)"
    },
    "whatsapp_message": {
      "type": "textarea",
      "pos": 7,
      "description": "For WhatsApp type only"
    },
    "map_link": {
      "type": "text",
      "pos": 8,
      "description": "For location type only"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Contact"
}
```

### Card Types & Features

| Type | Icon | Clickable | Opens | Special Fields |
|------|------|-----------|-------|----------------|
| **whatsapp** | WhatsApp logo | ✅ | WhatsApp app with pre-filled message | `whatsapp_message` |
| **phone** | Phone handset | ✅ | Phone dialer | - |
| **email** | Envelope | ✅ | Email client | - |
| **location** | Map pin | ✅ | Google Maps (new tab) | `map_link` |
| **hours** | Clock | ❌ | Informational only | - |
| **website** | Globe | ✅ | External website (new tab) | - |

### New Features

**Privacy Control (`show_value`):**
- Toggle visibility of contact value
- Perfect for hiding WhatsApp numbers
- Shows "Click to contact →" when hidden
- Card remains fully functional

**Highlight Feature (`highlight`):**
- Makes card stand out visually
- Gradient background
- "Recommended" badge
- Enhanced shadows and borders
- Perfect for primary contact method

---

## 3. Form Component

**Component Name**: `form`

### JSON Schema

```json
{
  "name": "form",
  "display_name": "Contact Form",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0,
      "required": true,
      "description": "Form title"
    },
    "description": {
      "type": "textarea",
      "pos": 1,
      "description": "Optional form description"
    },
    "form_fields": {
      "type": "bloks",
      "pos": 2,
      "restrict_components": true,
      "component_whitelist": ["form_field"],
      "description": "Add form fields using nested blocks (recommended)"
    },
    "submit_button_text": {
      "type": "text",
      "pos": 3,
      "default_value": "Send Message",
      "required": true
    },
    "success_message": {
      "type": "text",
      "pos": 4,
      "default_value": "Thank you! We'll get back to you soon.",
      "required": true
    },
    "error_message": {
      "type": "text",
      "pos": 5,
      "default_value": "Something went wrong. Please try again.",
      "required": true
    },
    "email_subject": {
      "type": "text",
      "pos": 6,
      "required": true,
      "description": "Email subject line"
    },
    "email_body_description": {
      "type": "textarea",
      "pos": 7,
      "description": "Optional text to include at the top of the email"
    },
    "recipient_email": {
      "type": "text",
      "pos": 8,
      "required": true,
      "description": "Where to send form submissions"
    },
    "sender_email": {
      "type": "text",
      "pos": 9,
      "description": "From email address (optional)"
    },
    "sender_name": {
      "type": "text",
      "pos": 10,
      "description": "From name (optional)"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Forms"
}
```

### Form Builder Approach

This schema uses the **new generic form builder** with nested `form_field` blocks for:
- ✅ Visual form building in Storyblok
- ✅ No JSON configuration needed
- ✅ 10+ field types with validation
- ✅ Flexible layout options (full, half, third width)
- ✅ Reusable across any form

**Backward Compatibility:** The legacy JSON-based `fields` array is still supported. Existing forms will continue to work without changes.

**Learn More:** See [GENERIC_FORM_BUILDER.md](../docs/features/GENERIC_FORM_BUILDER.md) for complete documentation.

---

## 4. Form Field Component

**Component Name**: `form_field`

### JSON Schema

```json
{
  "name": "form_field",
  "display_name": "Form Field",
  "schema": {
    "field_id": {
      "type": "text",
      "pos": 0,
      "required": true,
      "description": "Unique identifier (e.g., 'name', 'email', 'phone')"
    },
    "field_type": {
      "type": "option",
      "pos": 1,
      "required": true,
      "options": [
        { "value": "text", "name": "Text" },
        { "value": "email", "name": "Email" },
        { "value": "tel", "name": "Phone" },
        { "value": "number", "name": "Number" },
        { "value": "textarea", "name": "Textarea" },
        { "value": "select", "name": "Dropdown" },
        { "value": "checkbox", "name": "Checkbox" },
        { "value": "radio", "name": "Radio Buttons" },
        { "value": "date", "name": "Date" },
        { "value": "url", "name": "URL" }
      ]
    },
    "label": {
      "type": "text",
      "pos": 2,
      "required": true,
      "description": "Field label shown to users"
    },
    "placeholder": {
      "type": "text",
      "pos": 3,
      "description": "Placeholder text"
    },
    "required": {
      "type": "boolean",
      "pos": 4,
      "default_value": false
    },
    "default_value": {
      "type": "text",
      "pos": 5,
      "description": "Default value for the field"
    },
    "help_text": {
      "type": "text",
      "pos": 6,
      "description": "Helper text below the field"
    },
    "options": {
      "type": "textarea",
      "pos": 7,
      "description": "For select/radio/checkbox: Options separated by commas or newlines"
    },
    "validation_regex": {
      "type": "text",
      "pos": 8,
      "description": "Custom regex pattern for validation"
    },
    "validation_message": {
      "type": "text",
      "pos": 9,
      "description": "Custom error message"
    },
    "min_length": {
      "type": "number",
      "pos": 10,
      "description": "Minimum character length"
    },
    "max_length": {
      "type": "number",
      "pos": 11,
      "description": "Maximum character length"
    },
    "min_value": {
      "type": "number",
      "pos": 12,
      "description": "Minimum value (for number/date fields)"
    },
    "max_value": {
      "type": "number",
      "pos": 13,
      "description": "Maximum value (for number/date fields)"
    },
    "field_width": {
      "type": "option",
      "pos": 14,
      "options": [
        { "value": "full", "name": "Full Width" },
        { "value": "half", "name": "Half Width" },
        { "value": "third", "name": "One Third" },
        { "value": "two-thirds", "name": "Two Thirds" }
      ],
      "default_value": "full"
    },
    "autocomplete": {
      "type": "text",
      "pos": 15,
      "description": "HTML autocomplete attribute (e.g., 'name', 'email', 'tel')"
    },
    "multiple": {
      "type": "boolean",
      "pos": 16,
      "default_value": false,
      "description": "Allow multiple selections (for select fields)"
    }
  },
  "is_root": false,
  "is_nestable": true,
  "component_group_name": "Forms"
}
```

### Field Types & Features

| Field Type | Use Case | Special Features |
|------------|----------|------------------|
| **text** | Names, single-line text | min/max length, regex validation |
| **email** | Email addresses | Built-in email validation |
| **tel** | Phone numbers | Phone format validation |
| **number** | Numeric input | min/max value constraints |
| **textarea** | Long text, messages | Multi-line input, character count |
| **select** | Dropdown lists | Single/multiple selection, custom options |
| **checkbox** | Yes/no, agreements | Boolean or multiple choices |
| **radio** | Mutually exclusive options | Single selection from group |
| **date** | Date selection | Date picker, min/max dates |
| **url** | Website URLs | URL format validation |

---

## 5. Example Configuration

### Complete Contact Page Example

```json
{
  "component": "contact_page",
  "badge_text": "💬 We're Here to Help",
  "title": "Get In Touch With Us",
  "description": "Have questions? We'd love to hear from you. Send us a message and we'll respond within 24 hours.",
  
  "contact_cards_title": "Contact Information",
  "contact_cards": [
    {
      "_uid": "card-1",
      "component": "contact_card",
      "type": "whatsapp",
      "label": "WhatsApp",
      "value": "+971501234567",
      "subtitle": "Available 24/7 - Fastest Response",
      "show_value": false,
      "highlight": true,
      "whatsapp_message": "Hello! I would like to inquire about your services."
    },
    {
      "_uid": "card-2",
      "component": "contact_card",
      "type": "phone",
      "label": "Phone",
      "value": "+971 50 123 4567",
      "subtitle": "Mon-Fri, 9AM-6PM GST",
      "show_value": true,
      "highlight": false
    },
    {
      "_uid": "card-3",
      "component": "contact_card",
      "type": "email",
      "label": "Email",
      "value": "hello@igentx.com",
      "subtitle": "We respond within 24 hours",
      "show_value": true,
      "highlight": false
    },
    {
      "_uid": "card-4",
      "component": "contact_card",
      "type": "location",
      "label": "Office",
      "value": "Dubai, United Arab Emirates",
      "subtitle": "By appointment only",
      "show_value": true,
      "highlight": false,
      "map_link": "https://maps.google.com/?q=Dubai+UAE"
    }
  ],
  
  "additional_info": "We speak English and Arabic! / نحن نتحدث الإنجليزية والعربية!",
  
  "form_section_title": "Send Us a Message",
  "form_section_description": "Fill out the form and we'll get back to you shortly.",
  "form": [
    {
      "_uid": "form-1",
      "component": "form",
      "title": "Contact Form",
      "description": "",
      "form_fields": [
        {
          "_uid": "field-1",
          "component": "form_field",
          "field_id": "name",
          "field_type": "text",
          "label": "Full Name",
          "placeholder": "John Doe",
          "required": true,
          "min_length": 2,
          "max_length": 100,
          "autocomplete": "name",
          "field_width": "full"
        },
        {
          "_uid": "field-2",
          "component": "form_field",
          "field_id": "email",
          "field_type": "email",
          "label": "Email Address",
          "placeholder": "john@example.com",
          "required": true,
          "autocomplete": "email",
          "field_width": "half"
        },
        {
          "_uid": "field-3",
          "component": "form_field",
          "field_id": "phone",
          "field_type": "tel",
          "label": "Phone Number",
          "placeholder": "+971 50 123 4567",
          "required": false,
          "autocomplete": "tel",
          "field_width": "half"
        },
        {
          "_uid": "field-4",
          "component": "form_field",
          "field_id": "subject",
          "field_type": "select",
          "label": "Subject",
          "required": true,
          "options": "General Inquiry\nWeb Development\nMobile App Development\nUI/UX Design\nConsulting\nOther",
          "field_width": "full"
        },
        {
          "_uid": "field-5",
          "component": "form_field",
          "field_id": "message",
          "field_type": "textarea",
          "label": "Your Message",
          "placeholder": "Tell us about your project...",
          "required": true,
          "min_length": 10,
          "max_length": 1000,
          "help_text": "Please provide as much detail as possible",
          "field_width": "full"
        }
      ],
      "submit_button_text": "Send Message",
      "success_message": "Thank you! We'll respond within 24 hours.",
      "error_message": "Error sending message. Please try again.",
      "email_subject": "New Contact Form Submission - IGENTX",
      "email_body_description": "You have received a new contact form submission from your website.",
      "recipient_email": "hello@igentx.com",
      "sender_email": "noreply@igentx.com",
      "sender_name": "IGENTX Contact Form"
    }
  ],
  
  "show_map": true,
  "map_section_title": "Find Us",
  "map_embed_url": "https://www.google.com/maps/embed?pb=..."
}
```

---

## Icon Customization

### Using Custom Icons from Storyblok

1. **Upload icons** in Storyblok asset library
2. **Select icon** in contact card's `icon` field
3. **Recommended specs**:
   - Format: SVG (preferred) or PNG
   - Size: 64x64px or larger
   - Style: Monochrome for best results
   - Background: Transparent

### Default Icons

If no custom icon is provided, these built-in icons are used:

- 📱 **Phone**: Phone handset icon
- ✉️ **Email**: Envelope icon  
- 💬 **WhatsApp**: WhatsApp logo
- 📍 **Location**: Map pin icon
- 🕐 **Hours**: Clock icon
- 🌐 **Website**: Globe icon

---

## Quick Setup Checklist

### 1. Create Components in Storyblok

- [ ] Create `contact_page` component
- [ ] Create `contact_card` component
- [ ] Create `form` component (if not exists)
- [ ] Create `form_field` component

### 2. Create Contact Story

- [ ] Create new story at path: `contact`
- [ ] Add `contact_page` component to story
- [ ] Configure hero section (badge, title, description)

### 3. Add Contact Cards

- [ ] Add WhatsApp card (consider using `highlight: true`)
- [ ] Add Email card
- [ ] Optional: Add Phone, Location, Hours, Website cards
- [ ] Optional: Upload custom icons for cards

### 4. Build Contact Form

- [ ] Add `form` block to contact page
- [ ] Add `form_field` blocks for each field:
  - [ ] Name field (text, required)
  - [ ] Email field (email, required)
  - [ ] Phone field (tel, optional)
  - [ ] Subject field (select/text, optional)
  - [ ] Message field (textarea, required)
- [ ] Configure field widths for better layout
- [ ] Add helper text where needed

### 5. Configure Email Settings

- [ ] Set up Mailjet API keys in environment variables
- [ ] Configure recipient email in form
- [ ] Set email subject line
- [ ] Customize success/error messages

### 6. Optional Features

- [ ] Add Google Maps embed
- [ ] Add additional info section
- [ ] Customize form section title/description

### 7. Testing & Launch

- [ ] Test form submission
- [ ] Verify email delivery
- [ ] Test on mobile devices
- [ ] Check all contact card links
- [ ] Publish story

---

## Environment Variables Required

```env
# Mailjet Configuration
MAILJET_API_KEY=your_api_key_here
MAILJET_SECRET_KEY=your_secret_key_here
MAILJET_FROM_EMAIL=noreply@yourdomain.com
MAILJET_FROM_NAME=Your Company Name
```

---

## File Structure

```
www.igentx.com/
├── app/[lang]/contact/
│   └── page.tsx                          # Contact page route
├── components/blocks/contact/
│   ├── ContactPage.tsx                   # Main contact page component
│   ├── Form.tsx                          # Legacy form component (backward compatible)
│   ├── GenericForm.tsx                   # New generic form container
│   └── FormField.tsx                     # Individual form field component
├── app/api/contact/
│   └── route.ts                          # API route for form submissions (Mailjet)
├── lib/
│   ├── types.ts                          # TypeScript types
│   └── igentx-default-content.ts         # Default content
└── docs/
    ├── CONTACT_PAGE_SCHEMA.md            # This file (quick reference)
    ├── CONTACT_FORM_QUICKSTART.md        # Quick start guide
    ├── ENV_SETUP.md                      # Environment variables
    └── features/
        ├── GENERIC_FORM_BUILDER.md       # Generic form builder guide
        └── MAILJET_INTEGRATION.md        # Mailjet integration guide
```

---

## Related Documentation

### Essential Guides

- 🚀 [Contact Form Quick Start](../CONTACT_FORM_QUICKSTART.md) - Get started in 5 minutes
- 📝 [Generic Form Builder](../features/GENERIC_FORM_BUILDER.md) - Complete form builder documentation
- 📧 [Mailjet Integration](../features/MAILJET_INTEGRATION.md) - Email setup and configuration
- ⚙️ [Environment Setup](../ENV_SETUP.md) - Configure environment variables

### Advanced Topics

- 🎨 UX Best Practices - Form design and validation patterns
- 🔒 Security - CSRF protection and input sanitization
- 🌐 Multi-language Forms - Handling translations
- 📊 Analytics - Tracking form submissions

### Component Documentation

- **Contact Page**: This file (schema reference)
- **Form Field Types**: See [GENERIC_FORM_BUILDER.md](../features/GENERIC_FORM_BUILDER.md#field-types)
- **Validation**: See [GENERIC_FORM_BUILDER.md](../features/GENERIC_FORM_BUILDER.md#validation)

---

## Support & Troubleshooting

**Common Issues:**

1. **Form not submitting?**
   - Check Mailjet API keys in environment variables
   - Verify recipient email is set correctly
   - Check browser console for errors

2. **Fields not showing?**
   - Ensure `form_field` component is created in Storyblok
   - Check component is whitelisted in `form.form_fields`
   - Verify field IDs are unique

3. **Validation not working?**
   - Check field type matches validation rules
   - Verify required fields have `required: true`
   - Use proper regex patterns for custom validation

**Need Help?**
- Check [Generic Form Builder](../features/GENERIC_FORM_BUILDER.md) for detailed documentation
- Review example configurations above
- Test with default content first

---

**Version**: 2.0.0  
**Last Updated**: October 2025  
**Compatibility**: Next.js 14+, Storyblok CMS, React Hook Form, Zod Validation

