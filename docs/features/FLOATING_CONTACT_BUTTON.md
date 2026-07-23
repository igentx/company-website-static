# Floating Contact Button Feature

## Overview

The Floating Contact Button is a convenient, always-visible UI component that provides quick access to all contact methods configured in the InfoBar. It appears as a fixed button on all pages and opens a beautiful modal with all available contact options when clicked.

## Features

- **Fixed Position**: Always visible in the bottom corner of the screen
- **Smart Data Fetching**: Automatically fetches contact data from InfoBar configuration in Storyblok
- **Multi-Channel Support**: Displays all available contact methods:
  - WhatsApp (with pre-filled message support)
  - Phone (direct call link)
  - Email (direct mailto link)
  - Physical Address
  - Social Media Links
- **RTL Support**: Automatically adjusts position based on language direction
- **Responsive Design**: Works beautifully on mobile and desktop
- **Dark Mode Ready**: Supports dark theme with proper contrast
- **Smooth Animations**: Beautiful slide-up animation and hover effects
- **Accessible**: Proper ARIA labels and keyboard navigation support
- **Notification Badge**: Optional notification indicator (can be customized)

## File Structure

```
components/ui/
  └── FloatingContactButton.tsx    # Main component

app/
  ├── globals.css                  # Animation definitions
  └── [lang]/
      └── layout.tsx               # Integration point
```

## Implementation Details

### Component Location
`components/ui/FloatingContactButton.tsx`

### Integration
The component is added to the main layout at `app/[lang]/layout.tsx` within the `LanguageProvider` context to access language and RTL settings.

### Data Source
The component fetches contact information from the InfoBar blok configured in Storyblok's header content:
- **Endpoint**: `{lang}/header`
- **Path**: `content.info_bar[0]`

### Contact Options Displayed

1. **WhatsApp** (★ FEATURED - shown first with premium styling)
   - **Special Highlighting**: Full-width gradient card in green
   - **Badge**: "Fastest" / "الأسرع" badge for instant attention
   - **Icon**: Large WhatsApp logo with animation effects
   - **Action**: Opens WhatsApp chat with pre-filled message
   - **Extra Info**: "Instant reply - Available now" subtext
   - **Animations**: Hover effects with shimmer and icon rotation
   - **Visual Priority**: Larger size, shadows, and standout design
   - Label: Customizable via `whatsapp_label`
   - Shows number as subtitle

2. **Phone**
   - Icon: Blue phone icon
   - Action: Direct tel: link for calling
   - Label: Customizable via `phone_label`
   - Shows number as subtitle

3. **Email**
   - Icon: Purple envelope icon
   - Action: Direct mailto: link
   - Label: Customizable via `email_label`
   - Shows email as subtitle

4. **Address**
   - Icon: Orange location pin
   - Display: Read-only contact information
   - Shows full address with line clamping

5. **Social Links**
   - Display: Grid of social media icons
   - Action: Opens social profile in new tab
   - Supports: Facebook, Twitter/X, Instagram, LinkedIn, YouTube
   - Custom icons supported via Storyblok assets

## Styling & Animations

### Button Styles
- Gradient background: `from-blue-600 to-blue-700`
- Fixed position: Bottom-right (LTR) or Bottom-left (RTL)
- Shadow: Large shadow with hover enhancement
- Scale on hover: 1.1x transform
- Focus ring: Blue ring for accessibility

### Modal Styles
- White background with dark mode support
- Rounded corners: `rounded-2xl`
- Backdrop blur effect
- Shadow: 2xl shadow for depth
- Max width: 320px (80 on mobile)
- Smooth slide-up animation

### Animations
**Defined in `app/globals.css`:**

```css
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out forwards;
}
```

## Customization Options

### 1. Change Button Position
Edit in `FloatingContactButton.tsx`:
```tsx
// Current: bottom-6, right-6 (or left-6 for RTL)
// Change to: bottom-8, right-8 for more spacing
className={`fixed bottom-8 ${isRTL ? 'left-8' : 'right-8'} ...`}
```

### 2. Remove Notification Badge
Remove or comment out this section:
```tsx
<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
  !
</span>
```

### 3. Change Button Colors
Modify the gradient:
```tsx
// Current: blue gradient
className="bg-gradient-to-r from-blue-600 to-blue-700"

// Example alternatives:
// Green: from-green-600 to-green-700
// Purple: from-purple-600 to-purple-700
// Orange: from-orange-600 to-orange-700
```

### 4. Customize Contact Card Colors
Each contact type has its own color scheme:
- WhatsApp: `bg-green-50` (green theme)
- Phone: `bg-blue-50` (blue theme)
- Email: `bg-purple-50` (purple theme)
- Address: `bg-orange-50` (orange theme)

### 5. Change Button Icon
Replace the chat icon SVG with another icon from Heroicons or custom SVG.

## InfoBar Configuration in Storyblok

The component reads from these InfoBar fields:

| Field | Type | Purpose |
|-------|------|---------|
| `phone` | String | Phone number for calling |
| `phone_label` | String | Custom label for phone (optional) |
| `email` | String | Email address |
| `email_label` | String | Custom label for email (optional) |
| `whatsapp_number` | String | WhatsApp number with country code |
| `whatsapp_text` | String | Pre-filled message text (optional) |
| `whatsapp_label` | String | Custom label for WhatsApp (optional) |
| `address` | String | Physical address |
| `social_links` | Array | Social media links with platform and URL |

### Example InfoBar Configuration

```json
{
  "phone": "+971 4 123 4567",
  "phone_label": "Call Us",
  "email": "hello@igentx.com",
  "email_label": "Email Us",
  "whatsapp_number": "+971501234567",
  "whatsapp_text": "Hello! I'm interested in your services.",
  "whatsapp_label": "Chat on WhatsApp",
  "address": "Dubai Silicon Oasis, Dubai, UAE",
  "social_links": [
    {
      "platform": "facebook",
      "url": "https://facebook.com/yourpage"
    },
    {
      "platform": "linkedin",
      "url": "https://linkedin.com/company/yourcompany"
    }
  ]
}
```

## Multilingual Support

The component includes built-in translations for Arabic and English:

### Hardcoded Labels
- **Contact Us**: "تواصل معنا" (AR) / "Contact Us" (EN)
- **Choose your preferred method**: "اختر طريقة التواصل المفضلة" (AR) / "Choose your preferred method" (EN)
- **Follow us on**: "تابعنا على" (AR) / "Follow us on" (EN)
- **Phone**: "هاتف" (AR) / "Phone" (EN)
- **Email**: "بريد إلكتروني" (AR) / "Email" (EN)
- **WhatsApp**: "واتساب" (AR) / "WhatsApp" (EN)
- **Address**: "العنوان" (AR) / "Address" (EN)
- **We're here to help**: "نحن هنا للمساعدة! اختر أي طريقة للتواصل" (AR) / "We're here to help! Choose any method to reach us" (EN)

### Adding More Languages
To add more languages, extend the conditional rendering:

```tsx
// Example for French
{infoBarData.phone_label || (
  lang === 'ar' ? 'هاتف' : 
  lang === 'fr' ? 'Téléphone' :
  'Phone'
)}
```

## Best Practices

1. **Keep Contact Info Updated**: Regularly review and update contact information in Storyblok
2. **Test WhatsApp Links**: Ensure WhatsApp number includes country code without + or spaces
3. **Optimize for Mobile**: The component is responsive, but test on actual devices
4. **Monitor Analytics**: Track which contact methods users prefer to optimize your communication strategy
5. **Privacy Compliance**: Ensure email collection and communication comply with GDPR/privacy laws
6. **Accessibility**: Always provide meaningful aria-labels for screen readers

## Troubleshooting

### Button Not Showing
1. Check if InfoBar has at least one contact method configured
2. Verify the component is imported in `app/[lang]/layout.tsx`
3. Check browser console for API errors

### Contact Methods Not Working
1. **Phone**: Ensure number format is correct (e.g., "+971 4 123 4567")
2. **WhatsApp**: Number must be in international format without spaces (e.g., "971501234567")
3. **Email**: Verify email address is valid
4. **Social Links**: Check URLs are complete with https://

### Styling Issues
1. Ensure `globals.css` is imported in layout
2. Verify Tailwind is properly configured
3. Check for CSS conflicts with other components

### Modal Not Opening
1. Check for JavaScript errors in console
2. Verify React state is working properly
3. Check z-index conflicts with other fixed elements

## Performance Considerations

- **Data Fetching**: Contact data is fetched once on component mount
- **Caching**: Consider adding caching strategy for InfoBar data
- **Bundle Size**: Component adds ~5KB to bundle (gzipped)
- **Animation Performance**: Uses CSS transforms for smooth 60fps animations

## Future Enhancements

Potential improvements for future versions:

1. **Live Chat Integration**: Add live chat widget option
2. **Contact Form Modal**: Inline contact form instead of email link
3. **Business Hours**: Display availability based on timezone
4. **Click Analytics**: Track which contact methods are most popular
5. **Customizable Position**: Add option to toggle left/right position
6. **Multiple Languages in CMS**: Pull translations from Storyblok
7. **Quick Actions**: Add more actions like "Book Meeting" or "Request Quote"
8. **Animation Preferences**: Respect user's motion preferences
9. **Offline Support**: Show cached contact info when offline

## Related Documentation

- [InfoBar Schema](../INFOBAR_SCHEMA.md)
- [Multilingual Setup](./MULTILANGUAGE_SETUP.md)
- [Theme System](./THEME_SYSTEM.md)
- [Accessibility Guidelines](./ACCESSIBILITY.md)

## Support

For questions or issues with the Floating Contact Button:
1. Check this documentation
2. Review the component code for inline comments
3. Test in Storyblok preview mode
4. Contact the development team

---

**Component Version**: 1.0.0
**Last Updated**: October 26, 2025
**Author**: IGENTX Development Team

