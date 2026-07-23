# Mailjet Form Integration Setup Guide

This guide explains how to set up and use the Mailjet-powered form component in your Next.js Storyblok project.

## Prerequisites

1. **Mailjet Account**: Sign up at [mailjet.com](https://www.mailjet.com)
2. **Mailjet API Credentials**: Get your API key and secret from the Mailjet dashboard

## Installation

The necessary dependencies have already been installed:

- `node-mailjet` - Mailjet SDK
- `react-hook-form` - Form handling
- `zod` - Validation schema
- `@hookform/resolvers` - React Hook Form Zod integration

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Mailjet Configuration
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_SECRET_KEY=your_mailjet_secret_key
MAILJET_FROM_EMAIL=your_from_email@example.com
MAILJET_FROM_NAME=Your Company Name
```

## Storyblok Component Schema

Create a new component in Storyblok with the name `form` and the following schema:

### Basic Fields

| Field Name           | Field Type | Description                             |
| -------------------- | ---------- | --------------------------------------- |
| `title`              | Text       | Form title (required)                   |
| `description`        | Textarea   | Optional form description               |
| `submit_button_text` | Text       | Submit button label (default: "Submit") |
| `success_message`    | Text       | Success message after form submission   |
| `error_message`      | Text       | Error message for failed submissions    |

### Email Configuration

| Field Name               | Field Type | Description                                          |
| ------------------------ | ---------- | ---------------------------------------------------- |
| `email_subject`          | Text       | Email subject line (required)                        |
| `email_body_description` | Textarea   | Optional email body introduction                     |
| `recipient_email`        | Text       | Email address to receive form submissions (required) |
| `sender_email`           | Text       | Sender email (optional, uses env var if not set)     |
| `sender_name`            | Text       | Sender name (optional, uses env var if not set)      |

### Form Fields Configuration

| Field Name | Field Type | Description                      |
| ---------- | ---------- | -------------------------------- |
| `fields`   | Blocks     | Repeatable block for form fields |

#### Form Field Block Schema

For each field in the `fields` block, create the following structure:

| Field Name    | Field Type    | Options                                        | Description                      |
| ------------- | ------------- | ---------------------------------------------- | -------------------------------- |
| `id`          | Text          | -                                              | Unique identifier for the field  |
| `type`        | Single-Option | text, email, textarea, select, checkbox, radio | Field input type                 |
| `label`       | Text          | -                                              | Field label                      |
| `placeholder` | Text          | -                                              | Optional placeholder text        |
| `required`    | Boolean       | -                                              | Whether the field is required    |
| `options`     | Blocks        | -                                              | For select/checkbox/radio fields |
| `validation`  | Blocks        | -                                              | Validation rules                 |

#### Options Block (for select/checkbox/radio fields)

| Field Name | Field Type | Description         |
| ---------- | ---------- | ------------------- |
| `label`    | Text       | Option display text |
| `value`    | Text       | Option value        |

#### Validation Block

| Field Name | Field Type    | Options                                        | Description                                 |
| ---------- | ------------- | ---------------------------------------------- | ------------------------------------------- |
| `type`     | Single-Option | required, email, minLength, maxLength, pattern | Validation rule type                        |
| `value`    | Text          | -                                              | Validation value (for length/pattern rules) |
| `message`  | Text          | -                                              | Error message to display                    |

## Example Form Configuration in Storyblok

Here's an example of how to configure a contact form in Storyblok:

### Basic Information

- **Title**: "Contact Us"
- **Description**: "Get in touch with our team"
- **Submit Button Text**: "Send Message"
- **Success Message**: "Thank you! Your message has been sent successfully."
- **Error Message**: "Sorry, there was an error sending your message. Please try again."

### Email Settings

- **Email Subject**: "New Contact Form Submission"
- **Email Body Description**: "A new message has been received from your website contact form:"
- **Recipient Email**: "hello@yourcompany.com"

### Form Fields Example

1. **Name Field**
   - ID: `name`
   - Type: `text`
   - Label: "Full Name"
   - Required: `true`
   - Validation:
     - Type: `required`, Message: "Name is required"
     - Type: `minLength`, Value: `2`, Message: "Name must be at least 2 characters"

2. **Email Field**
   - ID: `email`
   - Type: `email`
   - Label: "Email Address"
   - Required: `true`
   - Validation:
     - Type: `required`, Message: "Email is required"
     - Type: `email`, Message: "Please enter a valid email address"

3. **Subject Field**
   - ID: `subject`
   - Type: `select`
   - Label: "Subject"
   - Required: `true`
   - Options:
     - Label: "General Inquiry", Value: "general"
     - Label: "Support Request", Value: "support"
     - Label: "Partnership", Value: "partnership"

4. **Message Field**
   - ID: `message`
   - Type: `textarea`
   - Label: "Message"
   - Placeholder: "Tell us how we can help you..."
   - Required: `true`
   - Validation:
     - Type: `required`, Message: "Message is required"
     - Type: `minLength`, Value: `10`, Message: "Message must be at least 10 characters"

## Usage in Storyblok

1. Create a new story or edit an existing one
2. Add the "Form" component to your page
3. Configure the form fields according to your needs
4. Set up the email configuration
5. Publish your story

## Email Template

The system generates both HTML and plain text versions of the email. The email includes:

- Form title as the subject
- Optional email body description
- All form field values in a formatted layout
- Timestamp and source information

## Validation

The form supports the following validation types:

- **required**: Field must be filled
- **email**: Valid email format
- **minLength**: Minimum character length
- **maxLength**: Maximum character length
- **pattern**: Regular expression pattern

## Error Handling

The system handles various error scenarios:

- Missing Mailjet credentials
- Invalid email configuration
- Network connectivity issues
- Mailjet API errors

All errors are logged server-side and user-friendly messages are displayed to users.

## Security Considerations

- Environment variables are used for sensitive credentials
- Form submissions are validated both client-side and server-side
- CSRF protection is handled by Next.js
- Rate limiting should be implemented for production use

## Customization

### Styling

The form uses Tailwind CSS classes and can be customized by modifying the `Form.tsx` component.

### Additional Field Types

To add new field types:

1. Update the `FormField` type in `lib/types.ts`
2. Add rendering logic in the `renderField` function
3. Update validation schema as needed

### Email Templates

Customize the email templates by modifying the `generateEmailContent` and `generateTextContent` functions in the API route.

## Troubleshooting

### Common Issues

1. **Emails not sending**: Check Mailjet credentials and API status
2. **Validation errors**: Verify field IDs and validation rules
3. **Form not appearing**: Ensure the component is registered in `lib/blocks.tsx`

### Debug Mode

Enable console logging in the API route to debug email sending issues.

## Production Considerations

- Implement rate limiting to prevent spam
- Add CAPTCHA for additional security
- Monitor Mailjet usage and costs
- Set up proper error monitoring
- Consider implementing email queuing for high-volume sites
