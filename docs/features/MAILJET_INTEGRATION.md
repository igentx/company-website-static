# Mailjet Email Integration Guide - IGENTX

Complete guide to integrating and using Mailjet email service with your contact forms.

## Overview

The IGENTX website uses Mailjet as the email service provider for all contact form submissions. Forms automatically send emails to designated recipients when users submit them.

### Features

- ✅ **Automatic Email Delivery** - Forms submit to Mailjet API
- ✅ **HTML & Plain Text** - Beautifully formatted emails
- ✅ **Form Validation** - Client and server-side validation
- ✅ **Error Handling** - Graceful error handling with user feedback
- ✅ **Both Form Types** - Works with legacy forms and new generic forms
- ✅ **Backward Compatible** - Existing forms continue to work

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Mailjet Credentials](#getting-mailjet-credentials)
3. [Environment Setup](#environment-setup)
4. [Email Configuration](#email-configuration)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)
7. [Production Considerations](#production-considerations)

---

## Prerequisites

### Required

- Mailjet account (free tier available)
- Access to environment variables
- Contact form configured in Storyblok

### Already Installed

The following dependencies are already installed in the project:

```json
{
  "dependencies": {
    "node-mailjet": "^6.0.9"
  },
  "devDependencies": {
    "@types/node-mailjet": "^3.3.12"
  }
}
```

---

## Getting Mailjet Credentials

### Step 1: Sign Up for Mailjet

1. Go to [https://www.mailjet.com](https://www.mailjet.com)
2. Click "Sign Up" (free tier available)
3. Complete registration and verify your email

### Step 2: Get API Credentials

1. Log in to your Mailjet account
2. Go to **Account Settings** → **API Keys** (REST API)
   - Or visit: [https://app.mailjet.com/account/api_keys](https://app.mailjet.com/account/api_keys)
3. You'll see:
   - **API Key** (Public key)
   - **Secret Key** (Private key)
4. Copy both keys (you'll need them for environment variables)

### Step 3: Verify Sender Email (Important!)

For production use, you must verify your sender email domain:

1. Go to **Account Settings** → **Sender Addresses & Domains**
2. Add your domain (e.g., `yourdomain.com`)
3. Follow DNS verification steps
4. Wait for verification (usually < 24 hours)

**Note**: For development, you can use a verified email address without domain verification.

---

## Environment Setup

### Step 1: Create Environment File

Create a `.env.local` file in the project root:

```bash
# In /Users/igentx/Documents/Projects/IGENXT/www.igentx.com/
touch .env.local
```

### Step 2: Add Mailjet Configuration

Add the following to your `.env.local`:

```env
# Storyblok Configuration (Required)
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_storyblok_token_here

# Mailjet Email Service (Required for forms)
MAILJET_API_KEY=your_mailjet_api_key_here
MAILJET_SECRET_KEY=your_mailjet_secret_key_here
MAILJET_FROM_EMAIL=noreply@yourdomain.com
MAILJET_FROM_NAME=IGENTX Contact Form

# Optional: Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Step 3: Replace Placeholder Values

Replace the following with your actual values:

- `your_mailjet_api_key_here` → Your Mailjet API Key
- `your_mailjet_secret_key_here` → Your Mailjet Secret Key
- `noreply@yourdomain.com` → Your verified sender email
- `IGENTX Contact Form` → Your preferred sender name

### Example Configuration

```env
MAILJET_API_KEY=a1b2c3d4e5f6g7h8i9j0
MAILJET_SECRET_KEY=k1l2m3n4o5p6q7r8s9t0
MAILJET_FROM_EMAIL=noreply@igentx.com
MAILJET_FROM_NAME=IGENTX Website
```

### Step 4: Restart Development Server

After adding environment variables:

```bash
# Stop the server (Ctrl+C)
# Start it again
npm run dev
# or
yarn dev
```

---

## Email Configuration

### In Storyblok Contact Form

When configuring forms in Storyblok, set these email fields:

#### Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| `email_subject` | Email subject line | "New Contact Form Submission" |
| `recipient_email` | Where to send emails | "hello@igentx.com" |

#### Optional Fields

| Field | Description | Example |
|-------|-------------|---------|
| `email_body_description` | Email introduction text | "A new message was received from your website contact form:" |
| `sender_email` | Override default sender | Uses `MAILJET_FROM_EMAIL` if not set |
| `sender_name` | Override default sender name | Uses `MAILJET_FROM_NAME` if not set |

### Email Format

Emails are sent in both HTML and plain text formats:

#### HTML Email Includes:
- Form title as header
- Optional description
- All form fields in formatted layout
- Responsive design
- Professional styling

#### Plain Text Email Includes:
- Form title
- Optional description
- All form fields (key: value format)
- Footer with source info

---

## Testing

### Test Email Sending

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Navigate to Contact Page**
   - Go to `/contact` in your browser

3. **Fill Out Form**
   - Complete all required fields
   - Click submit

4. **Check for Success**
   - Success message should appear
   - Check server console for "Email sent successfully"

5. **Check Email**
   - Check the recipient inbox
   - Check spam folder if not received

### Test Checklist

- [ ] Environment variables set correctly
- [ ] Development server restarted after adding env vars
- [ ] Mailjet credentials are valid
- [ ] Sender email is verified in Mailjet
- [ ] Form submits without errors
- [ ] Success message appears
- [ ] Email received in inbox
- [ ] Email formatting looks correct

### Common Test Scenarios

#### Test 1: Basic Contact Form
```
Name: John Doe
Email: john@example.com
Message: This is a test message
```

#### Test 2: Job Application Form
```
Name: Jane Smith
Email: jane@example.com
Position: Frontend Developer
Experience: 5 years
```

#### Test 3: Special Characters
```
Name: José García
Email: jose@example.com
Message: Testing special characters: üöäß€
```

---

## Troubleshooting

### Issue: "Email service not available"

**Cause**: Mailjet credentials not configured

**Solution**:
1. Check `.env.local` file exists
2. Verify `MAILJET_API_KEY` and `MAILJET_SECRET_KEY` are set
3. Restart development server
4. Check console for "Mailjet API credentials not configured"

### Issue: "Email service authentication failed" (401)

**Cause**: Invalid or incorrect credentials

**Solution**:
1. Verify API key and secret key in Mailjet dashboard
2. Ensure no extra spaces in `.env.local`
3. Check keys haven't expired
4. Regenerate keys if necessary

### Issue: "Invalid email configuration" (400)

**Cause**: Sender email not verified or invalid format

**Solution**:
1. Verify sender email in Mailjet dashboard
2. Check email format is valid
3. Ensure domain is verified (for production)
4. Use a verified email address

### Issue: Emails going to spam

**Cause**: Domain not verified or SPF/DKIM not configured

**Solution**:
1. Verify your domain in Mailjet
2. Add SPF and DKIM records to DNS
3. Follow Mailjet's domain verification guide
4. Use consistent sender name and email

### Issue: Form submits but no email received

**Cause**: Multiple possible causes

**Solution**:
1. Check recipient email address is correct
2. Check spam folder
3. Look for errors in server console
4. Verify Mailjet account is active
5. Check Mailjet dashboard for delivery status

### Debug Mode

To enable detailed logging, check the server console:

```bash
# Look for these messages:
# ✅ "Email sent successfully:"
# ❌ "Error processing form submission:"
# ❌ "Mailjet error details:"
```

---

## Production Considerations

### Before Going Live

#### 1. Domain Verification
- Verify your sender domain in Mailjet
- Add SPF and DKIM DNS records
- Test from verified domain

#### 2. Email Limits
- Free Mailjet: 200 emails/day, 6,000/month
- Check your plan limits
- Monitor usage in Mailjet dashboard

#### 3. Security
- Keep API credentials secure
- Never commit `.env.local` to git
- Use environment variables in deployment
- Rotate keys periodically

#### 4. Rate Limiting
Consider implementing rate limiting to prevent spam:

```typescript
// Example: Add to API route
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 requests per window
})
```

#### 5. CAPTCHA
Add reCAPTCHA to prevent bot submissions:

```bash
npm install react-google-recaptcha
```

#### 6. Monitoring
- Set up error monitoring (Sentry, LogRocket)
- Monitor Mailjet dashboard for delivery issues
- Set up alerts for failed emails

### Deployment Checklist

- [ ] Domain verified in Mailjet
- [ ] SPF/DKIM records added to DNS
- [ ] Environment variables set in hosting platform
- [ ] Sender email verified
- [ ] Rate limiting implemented
- [ ] CAPTCHA added
- [ ] Error monitoring configured
- [ ] Test forms in production
- [ ] Monitor email delivery

### Environment Variables in Vercel

If deploying to Vercel:

1. Go to Project Settings
2. Navigate to Environment Variables
3. Add all `MAILJET_*` variables
4. Redeploy

### Environment Variables in Other Platforms

**Netlify**: Site Settings → Build & Deploy → Environment
**Railway**: Variables tab in project
**AWS**: Systems Manager Parameter Store
**Heroku**: Settings → Config Vars

---

## API Endpoint Reference

### POST `/api/contact`

Handles form submissions and sends emails via Mailjet.

#### Request Body

```json
{
  "formData": {
    "field_id_1": "value 1",
    "field_id_2": "value 2"
  },
  "formConfig": {
    "title": "Contact Form",
    "email_subject": "New Submission",
    "email_body_description": "Optional description",
    "recipient_email": "hello@igentx.com",
    "sender_email": "noreply@igentx.com",
    "sender_name": "IGENTX",
    "fields": [/* form field definitions */]
  }
}
```

#### Success Response (200)

```json
{
  "message": "Form submitted successfully"
}
```

#### Error Responses

**503 - Service Unavailable**
```json
{
  "message": "Email service not available"
}
```

**400 - Bad Request**
```json
{
  "message": "Invalid form data"
}
```

**500 - Internal Server Error**
```json
{
  "message": "Email service authentication failed"
}
```

---

## Form Types Supported

### 1. Legacy Form Component (`form`)

Traditional JSON-configured form fields:

```json
{
  "component": "form",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Name",
      "required": true
    }
  ]
}
```

### 2. Generic Form Builder (`generic_form`)

New block-based form fields:

```json
{
  "component": "generic_form",
  "form_fields": [
    {
      "component": "form_field",
      "field_id": "name",
      "field_type": "text",
      "label": "Name",
      "required": true
    }
  ]
}
```

**Both work seamlessly with Mailjet!**

---

## Related Documentation

- [Generic Form Builder Guide](./GENERIC_FORM_BUILDER.md)
- [Contact Page Setup](../CONTACT_PAGE_SETUP.md)
- [Mailjet Official Documentation](https://dev.mailjet.com/)
- [Mailjet API Reference](https://dev.mailjet.com/email/reference/)

---

## Support & Resources

### Mailjet Resources
- [Mailjet Help Center](https://www.mailjet.com/support/)
- [API Documentation](https://dev.mailjet.com/)
- [Status Page](https://status.mailjet.com/)

### Project Resources
- Check `/app/api/contact/route.ts` for implementation
- Review form components in `/components/blocks/contact/`
- See type definitions in `/lib/types.ts`

---

## FAQ

**Q: Is Mailjet free?**  
A: Yes, Mailjet has a free tier with 200 emails/day, 6,000/month.

**Q: Can I use a different email service?**  
A: Yes, but you'll need to modify `/app/api/contact/route.ts` to use a different provider.

**Q: Do I need to verify my domain?**  
A: For production, yes. For development/testing, a verified email address is sufficient.

**Q: Can I send to multiple recipients?**  
A: Yes, modify the API route to add multiple recipients in the `To` array.

**Q: What happens if Mailjet is down?**  
A: The form will show an error message. Consider implementing a queue system for critical applications.

**Q: Can I customize the email template?**  
A: Yes, modify the `generateEmailContent` and `generateTextContent` functions in the API route.

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Mailjet SDK Version**: 6.0.9  
**Status**: ✅ Production Ready

