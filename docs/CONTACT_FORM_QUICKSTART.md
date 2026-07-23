# Contact Form Quick Start Guide

Get your contact forms up and running with email delivery in 10 minutes.

## 🚀 Quick Setup (3 Steps)

### Step 1: Get Mailjet Credentials (2 min)

1. Sign up at [mailjet.com](https://www.mailjet.com) (free)
2. Go to Account Settings → API Keys
3. Copy your API Key and Secret Key

### Step 2: Configure Environment (1 min)

Create `.env.local` in project root:

```env
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_storyblok_token
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_SECRET_KEY=your_mailjet_secret_key
MAILJET_FROM_EMAIL=noreply@yourdomain.com
MAILJET_FROM_NAME=Your Company Name
```

### Step 3: Restart Server (1 min)

```bash
# Stop server (Ctrl+C)
npm run dev
# or
yarn dev
```

**Done!** Your contact forms now send emails. 🎉

---

## ✅ Test Your Setup (2 min)

1. Visit `/contact` in your browser
2. Fill out and submit the form
3. Check console for "Email sent successfully"
4. Check recipient inbox (or spam folder)

---

## 📋 What You Get

✅ **Automatic email delivery** via Mailjet  
✅ **Beautiful HTML emails** with professional formatting  
✅ **Plain text fallback** for email clients  
✅ **Form validation** client and server-side  
✅ **Error handling** with user-friendly messages  
✅ **Both form types** legacy and new generic forms

---

## 🎯 Form Options

### Option 1: Use Existing Contact Page

The contact page at `/contact` is already configured with:
- Contact cards (WhatsApp, Phone, Email, etc.)
- Contact form with validation
- Email delivery via Mailjet

**Just configure your Storyblok content and you're done!**

### Option 2: Create Custom Form

Use the Generic Form Builder:

1. In Storyblok, add `generic_form` component
2. Add `form_field` blocks for each field
3. Configure email settings
4. Publish

See [Generic Form Builder Guide](./features/GENERIC_FORM_BUILDER.md)

---

## 📧 Email Configuration

In Storyblok, configure these fields:

| Field | Example |
|-------|---------|
| **Email Subject** | "New Contact Form Submission" |
| **Recipient Email** | "hello@igentx.com" |
| **Email Description** | "A new message from your website:" |

That's it! Emails will be sent automatically.

---

## 🔧 Customization

### Change Email Template

Edit `/app/api/contact/route.ts`:
- Modify `generateEmailContent()` for HTML
- Modify `generateTextContent()` for plain text

### Add More Fields

Use the Generic Form Builder:
- 10+ field types available
- Custom validation with regex
- Responsive width options

### Style the Form

Edit form components in:
- `/components/blocks/contact/`
- Uses Tailwind CSS

---

## 📚 Next Steps

### For Basic Setup
- ✅ You're done! Forms work out of the box.

### For Production
- [ ] Verify your domain in Mailjet
- [ ] Add SPF/DKIM DNS records
- [ ] Add rate limiting
- [ ] Add CAPTCHA (optional)
- [ ] Set up error monitoring

See [Mailjet Integration Guide](./features/MAILJET_INTEGRATION.md) for production checklist.

---

## 🆘 Need Help?

### Common Issues

**Forms not sending?**
- Check `.env.local` exists and has correct values
- Restart development server
- Check Mailjet credentials

**Emails not received?**
- Check spam folder
- Verify recipient email is correct
- Check Mailjet dashboard for delivery status

### Full Documentation

- [Mailjet Integration Guide](./features/MAILJET_INTEGRATION.md) - Complete setup
- [Environment Variables](./ENV_SETUP.md) - All env vars
- [Generic Form Builder](./features/GENERIC_FORM_BUILDER.md) - Build custom forms
- [Contact Page Setup](./CONTACT_PAGE_SETUP.md) - Full contact page

---

## 💡 Quick Tips

1. **Development**: Use any verified email as sender
2. **Production**: Verify your domain for better deliverability
3. **Free Tier**: 200 emails/day is plenty for most sites
4. **Testing**: Send test emails to yourself first
5. **Monitoring**: Check Mailjet dashboard for insights

---

## 📊 What's Included

The project already includes:

✅ Mailjet SDK (`node-mailjet`)  
✅ Form validation (`zod`, `react-hook-form`)  
✅ API route (`/app/api/contact/route.ts`)  
✅ Legacy form component  
✅ Generic form builder  
✅ Contact page with cards  
✅ Email templates  
✅ Error handling  

**You just need to add Mailjet credentials!**

---

## 🎉 Success!

You're all set! Your contact forms now automatically send professional emails to your inbox.

**Questions?** See full documentation in `/docs/features/MAILJET_INTEGRATION.md`

---

**Setup Time**: ~5 minutes  
**Status**: ✅ Ready to use  
**Last Updated**: October 2025

