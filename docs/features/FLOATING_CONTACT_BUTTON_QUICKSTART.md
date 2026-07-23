# Floating Contact Button - Quick Start Guide

## Overview
The Floating Contact Button has been successfully implemented! Follow these steps to configure it in Storyblok.

## ✅ What's Already Done

1. ✅ **FloatingContactButton Component** created at `components/ui/FloatingContactButton.tsx`
2. ✅ **TypeScript Types** added to `lib/types.ts`
3. ✅ **Integration** added to `app/[lang]/layout.tsx`
4. ✅ **Animations** added to `app/globals.css`
5. ✅ **Documentation** created with full schema details

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create the Blok in Storyblok

1. Go to **Storyblok** → **Block Library** → **+ New Block**
2. **Name**: `floating_contact_button`
3. **Display Name**: `Floating Contact Button`

### Step 2: Add These Fields

Copy these field configurations:

| Field Name | Type | Default Value | Required |
|------------|------|---------------|----------|
| `enabled` | Boolean | `true` | No |
| `modal_title` | Text | `Contact Us` | No |
| `modal_subtitle` | Text | `Choose your preferred method` | No |
| `phone` | Text | - | No |
| `email` | Text | - | No |
| `whatsapp_number` | Text | - | No |
| `whatsapp_message` | Textarea | - | No |
| `button_color` | Option (blue/green/purple/orange) | `blue` | No |

**Quick Field Setup:**
```
1. Click "Add field" 8-10 times
2. Name them as above
3. Set types (most are Text)
4. Save the block
```

### Step 3: Add to Header Content Type

1. Open your **Header** content type in Storyblok
2. Add new field: **Floating Contact Button**
3. Type: **Blocks**
4. Restrict to: `floating_contact_button`
5. **Maximum**: 1 (single option)
6. Save

### Step 4: Configure in Your Header Story

1. Open your Header story (usually `en/header` or similar)
2. Add the **Floating Contact Button** block
3. Configure:

```
✅ Enabled: true
📱 Phone: +971 4 123 4567
✉️ Email: hello@igentx.com
💬 WhatsApp: 971501234567
📝 WhatsApp Message: Hello! I'm interested in your services.
🎨 Button Color: blue
```

4. **Save & Publish** ✅

## 🎉 Done!

The floating button should now appear on all pages of your website!

## 📋 Minimum Configuration

To see the button, you need **at least one** of these:
- Phone number
- Email address
- WhatsApp number
- Physical address
- Social links

## 🎨 Customization Options

### Button Colors
- **Blue** (default): Professional, corporate
- **Green**: Natural, growth-focused
- **Purple**: Creative, modern
- **Orange**: Energetic, bold

### Button Position
- **bottom-right** (default): Standard for LTR languages
- **bottom-left**: Standard for RTL languages (auto-adjusted)

## 📱 What It Looks Like

### Button (Closed)
- Floating circle button with chat icon
- Bottom-right corner (or left for RTL)
- Optional red notification badge

### Modal (Open)
- Beautiful card with gradient header
- Contact options as clickable cards
- WhatsApp, Phone, Email, Address
- Social media icons at the bottom
- Footer message

## 🔧 Troubleshooting

### Button Not Showing?
1. ✅ Check if `enabled` is `true` in Storyblok
2. ✅ Add at least one contact method (phone/email/WhatsApp)
3. ✅ Save and publish your Header story
4. ✅ Refresh your website
5. ✅ Check browser console for errors

### Modal Not Opening?
1. ✅ Clear browser cache
2. ✅ Check for JavaScript errors in console
3. ✅ Verify z-index isn't conflicting with other elements

### WhatsApp Not Working?
- Format: `971501234567` (country code + number, no + or spaces)
- ❌ Wrong: `+971 50 123 4567`
- ✅ Correct: `971501234567`

## 📚 Full Documentation

For complete details, see:
- **Full Schema**: `docs/features/FLOATING_CONTACT_BUTTON_SCHEMA.md`
- **Main Guide**: `docs/features/FLOATING_CONTACT_BUTTON.md`

## 🌍 Multilingual Support

The button automatically adapts to:
- RTL languages (Arabic, Hebrew, etc.)
- LTR languages (English, etc.)
- Custom translations via Storyblok

## 💡 Pro Tips

1. **⭐ WhatsApp is Featured**: WhatsApp gets premium styling with a full-width green gradient card, "Fastest" badge, and animated effects - making it the most prominent option
2. **Add Pre-filled Message**: Makes it easier for users to start conversation (shown as "Instant reply - Available now")
3. **WhatsApp Converts Best**: Studies show WhatsApp has 3x higher engagement than email for instant communication
4. **Keep Address Short**: Long addresses are truncated in the UI
5. **Test on Mobile**: Most users will interact via mobile
6. **Monitor Analytics**: Track which contact method users prefer

## 🎯 Next Steps

1. Configure the button in Storyblok (5 min)
2. Test on desktop and mobile
3. Add social media links (optional)
4. Customize button color to match brand
5. Monitor which contact methods get used most

## ✨ Features

- ✅ Auto-fetches data from Storyblok
- ✅ RTL language support
- ✅ Dark mode compatible
- ✅ Smooth animations
- ✅ Mobile responsive
- ✅ Accessible (ARIA labels, keyboard nav)
- ✅ Zero configuration needed (works out of the box)

## 🆘 Need Help?

1. Check the console for error messages
2. Verify your Storyblok configuration
3. Review the full documentation
4. Contact the development team

---

**Setup Time**: ~5 minutes
**Difficulty**: Beginner
**Last Updated**: October 26, 2025

