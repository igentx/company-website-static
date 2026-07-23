# Contact Card Features Guide

Quick reference for privacy and highlighting features in contact cards.

## 🔒 Privacy Control (`show_value`)

### When to Hide Values

**Perfect for:**
- Protecting WhatsApp numbers from scraping
- Encouraging direct clicks vs. copying
- Privacy compliance
- Spam prevention

### Visual Comparison

#### With `show_value: true` (Default)
```
┌─────────────────────────────────┐
│  💬  WhatsApp                   │
│      +971 50 123 4567           │
│      Available 24/7             │
└─────────────────────────────────┘
```

#### With `show_value: false`
```
┌─────────────────────────────────┐
│  💬  WhatsApp                   │
│      Click to contact →         │
│      Available 24/7             │
└─────────────────────────────────┘
```

## ✨ Highlight Feature (`highlight`)

### Visual Effects

#### Regular Card
```
┌─────────────────────────────────┐
│ 📱  PHONE                        │
│     +971 50 123 4567            │
│     Mon-Fri, 9AM-6PM GST        │
└─────────────────────────────────┘
```
- White background
- Gray border
- Standard shadow
- Simple hover effect

#### Highlighted Card
```
╔═════════════════════════════════╗
║ 💬  WHATSAPP  [Recommended]     ║
║     Click to contact →          ║
║     Available 24/7              ║
╚═════════════════════════════════╝
```
- Gradient blue background (from-blue-50 to-indigo-50)
- Blue border (border-blue-400)
- Enhanced shadow
- "Recommended" badge
- Ring effect on icon
- Bolder text
- Stronger hover effects

### Design Specifications

| Feature | Regular | Highlighted |
|---------|---------|-------------|
| **Background** | `bg-white` | `bg-gradient-to-br from-blue-50 to-indigo-50` |
| **Border** | `border-gray-200` | `border-blue-400 border-2` |
| **Shadow** | `hover:shadow-lg` | `shadow-lg hover:shadow-xl` |
| **Icon Ring** | None | `ring-2 ring-blue-400` |
| **Icon BG** | `bg-blue-50` | `bg-blue-100` |
| **Label Color** | `text-gray-500` | `text-blue-700` |
| **Badge** | None | "Recommended" badge |
| **Value Font** | `font-medium` | `font-semibold` |

## 📋 Common Configurations

### Configuration 1: Privacy-Focused WhatsApp (Recommended)
```json
{
  "type": "whatsapp",
  "label": "WhatsApp Us",
  "value": "+971501234567",
  "subtitle": "Available 24/7 - Fastest Response",
  "show_value": false,    // 🔒 Hide number
  "highlight": true,      // ✨ Stand out
  "whatsapp_message": "Hello! I'd like to inquire about your services."
}
```

**Best for:**
- Primary contact method
- Privacy protection
- Encouraging WhatsApp usage
- Modern, clean look

---

### Configuration 2: Standard Display with Highlight
```json
{
  "type": "phone",
  "label": "Call Us",
  "value": "+971 50 123 4567",
  "subtitle": "Direct line - Business hours",
  "show_value": true,     // ✅ Show number
  "highlight": true,      // ✨ Highlight
  "icon": { "filename": "custom-phone-icon.svg" }
}
```

**Best for:**
- Trusted audiences
- B2B clients
- When you want calls
- Established businesses

---

### Configuration 3: Regular Card (No Special Features)
```json
{
  "type": "email",
  "label": "Email",
  "value": "hello@igentx.com",
  "subtitle": "We respond within 24 hours",
  "show_value": true,
  "highlight": false
}
```

**Best for:**
- Secondary contact methods
- Supporting options
- Standard information

---

### Configuration 4: All Hidden for Privacy
```json
[
  {
    "type": "whatsapp",
    "show_value": false,
    "highlight": true,
    "label": "WhatsApp",
    "subtitle": "Fastest response"
  },
  {
    "type": "phone",
    "show_value": false,
    "highlight": false,
    "label": "Phone",
    "subtitle": "Business hours"
  },
  {
    "type": "email",
    "show_value": false,
    "highlight": false,
    "label": "Email",
    "subtitle": "Response in 24h"
  }
]
```

**Best for:**
- Maximum privacy
- Spam prevention
- Click-to-contact only
- High-traffic websites

---

## 🎯 Best Practices

### ✅ DO
- Highlight only 1-2 cards maximum
- Use highlight for your preferred contact method
- Combine `show_value: false` with `highlight: true` for WhatsApp
- Test on mobile devices
- Consider your audience's preferences
- Match card prominence to response capability

### ❌ DON'T
- Highlight all cards (defeats the purpose)
- Hide all values without good reason
- Use highlight without a clear preference
- Forget to set WhatsApp message
- Use inconsistent styling

---

## 🌍 UAE Market Recommendations

### Recommended Setup for UAE Businesses:

```json
{
  "contact_cards": [
    {
      "type": "whatsapp",
      "label": "WhatsApp",
      "value": "+971501234567",
      "subtitle": "Available 24/7 - احصل على رد فوري",
      "show_value": false,
      "highlight": true,
      "whatsapp_message": "Hello! I would like to inquire about your services. مرحبا! أود الاستفسار عن خدماتكم"
    },
    {
      "type": "phone",
      "label": "Phone / الهاتف",
      "value": "+971 50 123 4567",
      "subtitle": "Sun-Thu, 9AM-6PM GST",
      "show_value": true,
      "highlight": false
    },
    {
      "type": "email",
      "label": "Email / البريد",
      "value": "hello@company.ae",
      "subtitle": "Response within 24 hours",
      "show_value": true,
      "highlight": false
    },
    {
      "type": "location",
      "label": "Office / المكتب",
      "value": "Dubai, UAE",
      "subtitle": "By appointment only",
      "show_value": true,
      "highlight": false
    }
  ]
}
```

**Why this works for UAE:**
- WhatsApp is most popular in UAE/GCC
- Bilingual labels (English/Arabic)
- Privacy-first approach
- Clear availability times
- Weekend alignment (Sun-Thu)

---

## 🎨 Styling Customization

Want to change the highlight colors? Edit `ContactPage.tsx`:

```tsx
// Current highlighting (Blue theme)
isHighlighted 
  ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-400'
  : 'bg-white border-gray-200'

// Alternative: Green theme for WhatsApp-focused
isHighlighted 
  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400'
  : 'bg-white border-gray-200'

// Alternative: Purple theme for premium feel
isHighlighted 
  ? 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-400'
  : 'bg-white border-gray-200'
```

---

## 📊 Analytics Tip

Track which contact methods are used most:

1. **Google Tag Manager**: Track clicks on highlighted vs. regular cards
2. **WhatsApp Business**: Monitor incoming messages
3. **A/B Testing**: Try different highlight configurations
4. **Heat maps**: See where users click most

---

## 🔧 Troubleshooting

### Highlight not showing?
- Check `highlight: true` is set
- Verify no conflicting custom CSS
- Clear browser cache
- Check Tailwind is compiled

### "Click to contact" not showing?
- Verify `show_value: false`
- Check card type is clickable
- Ensure value is still set (required)

### Badge says "Recommended" in wrong language?
- Edit `ContactPage.tsx` line 175-177
- Add language-specific badge text
- Use your site's i18n system

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Component**: ContactPage.tsx

