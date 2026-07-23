# Environment Variables Setup

This document lists all required and optional environment variables for the IGENTX website.

## Creating Your Environment File

Create a `.env.local` file in the project root:

```bash
touch .env.local
```

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

---

## Required Variables

### Storyblok

```env
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_storyblok_access_token_here
```

**Where to get it:**
1. Go to [Storyblok Dashboard](https://app.storyblok.com)
2. Navigate to Settings → Access Tokens
3. Copy your Preview or Public token

---

## Email Service (Mailjet)

### Required for Contact Forms

```env
MAILJET_API_KEY=your_mailjet_api_key_here
MAILJET_SECRET_KEY=your_mailjet_secret_key_here
MAILJET_FROM_EMAIL=noreply@yourdomain.com
MAILJET_FROM_NAME=Your Company Name
```

**Where to get it:**
1. Sign up at [Mailjet](https://www.mailjet.com)
2. Go to Account Settings → API Keys
3. Copy API Key and Secret Key

**Notes:**
- For development: Any verified email works
- For production: Verify your domain in Mailjet
- Free tier: 200 emails/day, 6,000/month

---

## Optional Variables

### Analytics

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### Preview Mode

```env
NEXT_PUBLIC_PREVIEW_MODE=false
```

---

## Complete Example

Here's a complete `.env.local` file template:

```env
# ============================================
# REQUIRED
# ============================================

# Storyblok CMS
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_storyblok_token_here

# Mailjet Email Service
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_SECRET_KEY=your_mailjet_secret_key
MAILJET_FROM_EMAIL=noreply@igentx.com
MAILJET_FROM_NAME=IGENTX Website

# ============================================
# OPTIONAL
# ============================================

# Google Analytics (Optional)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Preview Mode (Optional)
# NEXT_PUBLIC_PREVIEW_MODE=false
```

---

## Verification

### Check if variables are loaded:

```typescript
// In any component or API route
console.log('Storyblok:', !!process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN)
console.log('Mailjet:', !!process.env.MAILJET_API_KEY)
```

### Test Email Service:

Visit `/contact` and submit the form. Check:
- Server console for "Email sent successfully"
- Recipient inbox for email

---

## Deployment

### Vercel

1. Go to Project Settings
2. Navigate to Environment Variables
3. Add all variables
4. Redeploy

### Netlify

1. Site Settings → Build & Deploy
2. Environment → Environment Variables
3. Add all variables
4. Trigger deploy

### Other Platforms

- **Railway**: Variables tab
- **AWS**: Systems Manager Parameter Store
- **Heroku**: Settings → Config Vars
- **Docker**: Pass via `docker run -e` or `.env` file

---

## Security Best Practices

1. ✅ **Never commit** `.env.local` to version control
2. ✅ **Rotate keys** periodically
3. ✅ **Use different keys** for development and production
4. ✅ **Restrict API access** in Mailjet dashboard
5. ✅ **Monitor usage** to detect unauthorized access

---

## Troubleshooting

### Issue: Variables not loading

**Solution:**
1. Restart development server after adding variables
2. Check file is named `.env.local` exactly
3. Verify no syntax errors (no spaces around `=`)
4. Check file is in project root

### Issue: Mailjet not working

**Solution:**
1. Verify credentials in Mailjet dashboard
2. Check email is verified
3. Test with different email address
4. Review [MAILJET_INTEGRATION.md](./features/MAILJET_INTEGRATION.md)

---

## Related Documentation

- [Mailjet Integration Guide](./features/MAILJET_INTEGRATION.md)
- [Contact Page Setup](./CONTACT_PAGE_SETUP.md)
- [Deployment Guide](./deployment/DEPLOYMENT.md)

---

**Last Updated**: October 2025

