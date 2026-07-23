# Generic Form Builder

Build any form dynamically using Storyblok's visual editor. No coding required!

## Overview

The Generic Form Builder allows you to create and customize forms entirely through Storyblok CMS using nested form field blocks. Each field is a reusable component with its own configuration.

### Key Features

- ✨ **Visual Form Builder** - Build forms in Storyblok's visual editor
- 🔧 **Flexible Fields** - 10+ field types (text, email, number, date, etc.)
- ✅ **Built-in Validation** - Required, regex, min/max length, email validation
- 📱 **Responsive** - Automatic responsive layouts
- 🎨 **Customizable Width** - Full, half, third, or two-thirds width fields
- 🌐 **Accessible** - WCAG compliant with ARIA labels
- 📧 **Email Integration** - Works with existing Mailjet setup
- 🔄 **Backward Compatible** - Works alongside legacy form system

---

## Table of Contents

1. [Form Field Component Schema](#form-field-component-schema)
2. [Generic Form Component Schema](#generic-form-component-schema)
3. [Setup Instructions](#setup-instructions)
4. [Field Types Reference](#field-types-reference)
5. [Validation Guide](#validation-guide)
6. [Examples](#examples)
7. [Migration Guide](#migration-guide)

---

## Form Field Component Schema

### Component Name: `form_field`

```json
{
  "name": "form_field",
  "display_name": "Form Field",
  "schema": {
    "field_id": {
      "type": "text",
      "pos": 0,
      "required": true,
      "description": "Unique identifier (e.g., 'full_name', 'email', 'phone')"
    },
    "field_type": {
      "type": "option",
      "pos": 1,
      "required": true,
      "options": [
        { "value": "text", "name": "Text Input" },
        { "value": "email", "name": "Email" },
        { "value": "tel", "name": "Phone Number" },
        { "value": "number", "name": "Number" },
        { "value": "date", "name": "Date" },
        { "value": "url", "name": "URL" },
        { "value": "textarea", "name": "Textarea" },
        { "value": "select", "name": "Dropdown" },
        { "value": "checkbox", "name": "Checkbox" },
        { "value": "radio", "name": "Radio Buttons" }
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
      "description": "Placeholder text (optional)"
    },
    "required": {
      "type": "boolean",
      "pos": 4,
      "default_value": false,
      "description": "Make this field required"
    },
    "default_value": {
      "type": "text",
      "pos": 5,
      "description": "Default/pre-filled value"
    },
    "help_text": {
      "type": "text",
      "pos": 6,
      "description": "Helper text below the field"
    },
    "options": {
      "type": "textarea",
      "pos": 7,
      "description": "Options for select/checkbox/radio (one per line or comma-separated)"
    },
    "validation_regex": {
      "type": "text",
      "pos": 8,
      "description": "Custom validation regex pattern (e.g., '^[A-Z]{2}\\d{4}$')"
    },
    "validation_message": {
      "type": "text",
      "pos": 9,
      "description": "Custom validation error message"
    },
    "min_length": {
      "type": "number",
      "pos": 10,
      "description": "Minimum character length (for text fields)"
    },
    "max_length": {
      "type": "number",
      "pos": 11,
      "description": "Maximum character length (for text fields)"
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
      "default_value": "full",
      "options": [
        { "value": "full", "name": "Full Width" },
        { "value": "half", "name": "Half Width (1/2)" },
        { "value": "third", "name": "Third Width (1/3)" },
        { "value": "two-thirds", "name": "Two-Thirds Width (2/3)" }
      ],
      "description": "Field width on desktop (responsive on mobile)"
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

---

## Generic Form Component Schema

### Component Name: `generic_form`

```json
{
  "name": "generic_form",
  "display_name": "Generic Form (Field Builder)",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0,
      "required": true,
      "default_value": "Contact Us"
    },
    "description": {
      "type": "textarea",
      "pos": 1,
      "description": "Form description/subtitle"
    },
    "form_fields": {
      "type": "bloks",
      "pos": 2,
      "required": true,
      "restrict_components": true,
      "component_whitelist": ["form_field"],
      "description": "Add form fields here"
    },
    "submit_button_text": {
      "type": "text",
      "pos": 3,
      "required": true,
      "default_value": "Submit"
    },
    "success_message": {
      "type": "text",
      "pos": 4,
      "required": true,
      "default_value": "Thank you! Your submission has been received."
    },
    "error_message": {
      "type": "text",
      "pos": 5,
      "required": true,
      "default_value": "Sorry, something went wrong. Please try again."
    },
    "email_subject": {
      "type": "text",
      "pos": 6,
      "required": true,
      "default_value": "New Form Submission"
    },
    "email_body_description": {
      "type": "textarea",
      "pos": 7,
      "description": "Optional description in email body"
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

1. Go to **Components** in your Storyblok space
2. Create `form_field` component using schema above
3. Create `generic_form` component using schema above

### Step 2: Build Your First Form

1. Create or edit a story
2. Add a `generic_form` component
3. Click "Add Form Field" in the `form_fields` section
4. Configure each field:
   - Set unique `field_id`
   - Choose `field_type`
   - Add `label` and other properties
5. Configure email settings
6. Save and publish

### Step 3: Test Your Form

1. Visit your page
2. Fill out the form
3. Submit and verify email delivery

---

## Field Types Reference

### Text Input (`text`)
Basic single-line text input.

**Best for:** Names, titles, short answers
**Validations:** min_length, max_length, validation_regex

```json
{
  "field_id": "full_name",
  "field_type": "text",
  "label": "Full Name",
  "placeholder": "John Doe",
  "required": true,
  "min_length": 2,
  "max_length": 100,
  "autocomplete": "name"
}
```

### Email (`email`)
Email input with built-in validation.

**Best for:** Email addresses
**Auto-validation:** Email format

```json
{
  "field_id": "email",
  "field_type": "email",
  "label": "Email Address",
  "placeholder": "john@example.com",
  "required": true,
  "autocomplete": "email"
}
```

### Phone Number (`tel`)
Phone number input.

**Best for:** Phone numbers
**Validations:** validation_regex for format

```json
{
  "field_id": "phone",
  "field_type": "tel",
  "label": "Phone Number",
  "placeholder": "+971 50 123 4567",
  "required": false,
  "validation_regex": "^\\+?[0-9\\s\\-()]+$",
  "validation_message": "Please enter a valid phone number",
  "autocomplete": "tel"
}
```

### Number (`number`)
Numeric input only.

**Best for:** Age, quantity, ratings
**Validations:** min_value, max_value

```json
{
  "field_id": "age",
  "field_type": "number",
  "label": "Age",
  "required": true,
  "min_value": 18,
  "max_value": 120,
  "validation_message": "Age must be between 18 and 120"
}
```

### Date (`date`)
Date picker.

**Best for:** Birth dates, event dates, deadlines
**Validations:** min_value, max_value

```json
{
  "field_id": "birth_date",
  "field_type": "date",
  "label": "Date of Birth",
  "required": true
}
```

### URL (`url`)
URL input with validation.

**Best for:** Website links, social profiles
**Auto-validation:** URL format

```json
{
  "field_id": "website",
  "field_type": "url",
  "label": "Website",
  "placeholder": "https://example.com",
  "required": false
}
```

### Textarea (`textarea`)
Multi-line text area.

**Best for:** Messages, descriptions, comments
**Validations:** min_length, max_length

```json
{
  "field_id": "message",
  "field_type": "textarea",
  "label": "Message",
  "placeholder": "Tell us about your project...",
  "required": true,
  "min_length": 10,
  "max_length": 1000
}
```

### Dropdown (`select`)
Single or multiple selection dropdown.

**Best for:** Predefined choices
**Configuration:** options (one per line)

```json
{
  "field_id": "service",
  "field_type": "select",
  "label": "Service Interested In",
  "required": true,
  "options": "Web Development\nMobile App Development\nUI/UX Design\nConsulting",
  "multiple": false
}
```

### Checkbox (`checkbox`)
Multiple checkboxes.

**Best for:** Multiple selections, agreements
**Configuration:** options

```json
{
  "field_id": "interests",
  "field_type": "checkbox",
  "label": "Areas of Interest",
  "required": false,
  "options": "Web Development\nMobile Apps\nE-Commerce\nDigital Marketing"
}
```

### Radio Buttons (`radio`)
Single selection from options.

**Best for:** Single choice from options
**Configuration:** options

```json
{
  "field_id": "contact_preference",
  "field_type": "radio",
  "label": "Preferred Contact Method",
  "required": true,
  "options": "Email\nPhone\nWhatsApp"
}
```

---

## Validation Guide

### Built-in Validations

#### Required Fields
```json
{
  "required": true
}
```

#### Email Validation
```json
{
  "field_type": "email"
  // Automatically validates email format
}
```

#### Length Validation
```json
{
  "min_length": 3,
  "max_length": 50
}
```

#### Number Range
```json
{
  "min_value": 0,
  "max_value": 100
}
```

### Custom Regex Validation

#### Phone Number (International)
```json
{
  "validation_regex": "^\\+?[0-9\\s\\-()]+$",
  "validation_message": "Please enter a valid phone number"
}
```

#### UAE Phone Number
```json
{
  "validation_regex": "^(\\+971|00971|0)?[0-9]{9}$",
  "validation_message": "Please enter a valid UAE phone number"
}
```

#### Postal Code (UK)
```json
{
  "validation_regex": "^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\\s?[0-9][A-Z]{2}$",
  "validation_message": "Please enter a valid UK postal code"
}
```

#### Alphanumeric Only
```json
{
  "validation_regex": "^[a-zA-Z0-9]+$",
  "validation_message": "Only letters and numbers allowed"
}
```

---

## Examples

### Example 1: Simple Contact Form

```json
{
  "component": "generic_form",
  "title": "Contact Us",
  "description": "Send us a message and we'll get back to you soon.",
  "form_fields": [
    {
      "component": "form_field",
      "field_id": "name",
      "field_type": "text",
      "label": "Your Name",
      "required": true,
      "field_width": "full"
    },
    {
      "component": "form_field",
      "field_id": "email",
      "field_type": "email",
      "label": "Email Address",
      "required": true,
      "field_width": "full"
    },
    {
      "component": "form_field",
      "field_id": "message",
      "field_type": "textarea",
      "label": "Message",
      "required": true,
      "min_length": 10,
      "field_width": "full"
    }
  ],
  "submit_button_text": "Send Message",
  "recipient_email": "hello@example.com"
}
```

### Example 2: Job Application Form

```json
{
  "component": "generic_form",
  "title": "Job Application",
  "form_fields": [
    {
      "field_id": "full_name",
      "field_type": "text",
      "label": "Full Name",
      "required": true,
      "field_width": "half"
    },
    {
      "field_id": "email",
      "field_type": "email",
      "label": "Email",
      "required": true,
      "field_width": "half"
    },
    {
      "field_id": "phone",
      "field_type": "tel",
      "label": "Phone Number",
      "required": true,
      "field_width": "half"
    },
    {
      "field_id": "position",
      "field_type": "select",
      "label": "Position Applying For",
      "required": true,
      "field_width": "half",
      "options": "Frontend Developer\nBackend Developer\nUI/UX Designer\nProduct Manager"
    },
    {
      "field_id": "experience",
      "field_type": "number",
      "label": "Years of Experience",
      "required": true,
      "min_value": 0,
      "max_value": 50,
      "field_width": "third"
    },
    {
      "field_id": "linkedin",
      "field_type": "url",
      "label": "LinkedIn Profile",
      "required": false,
      "field_width": "two-thirds"
    },
    {
      "field_id": "cover_letter",
      "field_type": "textarea",
      "label": "Cover Letter",
      "required": true,
      "min_length": 50,
      "max_length": 1000,
      "field_width": "full"
    }
  ]
}
```

### Example 3: Event Registration

```json
{
  "component": "generic_form",
  "title": "Event Registration",
  "form_fields": [
    {
      "field_id": "attendee_name",
      "field_type": "text",
      "label": "Attendee Name",
      "required": true,
      "field_width": "half"
    },
    {
      "field_id": "email",
      "field_type": "email",
      "label": "Email",
      "required": true,
      "field_width": "half"
    },
    {
      "field_id": "ticket_type",
      "field_type": "radio",
      "label": "Ticket Type",
      "required": true,
      "field_width": "full",
      "options": "General Admission\nVIP Pass\nStudent Ticket"
    },
    {
      "field_id": "dietary_requirements",
      "field_type": "checkbox",
      "label": "Dietary Requirements",
      "field_width": "full",
      "options": "Vegetarian\nVegan\nGluten-Free\nHalal\nNone"
    },
    {
      "field_id": "special_requests",
      "field_type": "textarea",
      "label": "Special Requests",
      "field_width": "full"
    }
  ]
}
```

---

## Migration Guide

### Migrating from Legacy Forms

The new Generic Form Builder is fully backward compatible. You can:

1. **Keep existing forms** - They will continue to work
2. **Migrate gradually** - Convert forms one at a time
3. **Mix and match** - Use both systems simultaneously

### Migration Steps

1. Create `form_field` and `generic_form` components
2. Create new form using `generic_form`
3. Manually recreate each field as `form_field` block
4. Test thoroughly
5. Update story to use new form
6. Delete old form when satisfied

---

## Best Practices

### Field IDs
- Use snake_case: `full_name`, `email_address`
- Be descriptive: `home_phone` not `phone1`
- Avoid spaces and special characters

### Field Width
- Use `half` for short fields (name, email)
- Use `full` for textarea and long text
- Use `third` for numbers, dates
- Use `two-thirds` for medium fields

### Validation Messages
- Be specific and helpful
- Include examples: "Please enter a valid UAE phone number (+971...)"
- Use friendly language

### Options Format
- One per line (preferred) or comma-separated
- Keep labels short and clear
- Order logically (alphabetically or by popularity)

---

## Troubleshooting

### Form not submitting
- Check all required fields are filled
- Verify validation regex is correct
- Check browser console for errors

### Validation not working
- Ensure `validation_regex` uses proper escaping
- Test regex pattern externally first
- Check `required` is set to true

### Email not receiving
- Verify Mailjet credentials
- Check `recipient_email` is correct
- Check spam folder

---

## Related Documentation

- [Contact Page Setup](../CONTACT_PAGE_SETUP.md)
- [Mailjet Form Setup](./MAILJET_FORM_SETUP.md)
- [Form Component (Legacy)](./FORM_COMPONENT.md)

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Components**: `generic_form`, `form_field`

