# ♿ Accessibility Implementation Guide

> Comprehensive accessibility features for WCAG 2.1 AA compliance

## 🎯 Overview

This Next.js Storyblok application has been designed to meet **WCAG 2.1 AA compliance standards** and follows modern accessibility best practices for inclusive web experiences.

## ✨ Key Accessibility Features

### 🏗️ **Semantic HTML Structure**

| Element          | Implementation                                                  | Purpose                        |
| ---------------- | --------------------------------------------------------------- | ------------------------------ |
| **Header**       | `<header>` and `<nav>` elements with proper roles               | Clear navigation structure     |
| **Main Content** | Wrapped in `<main>` element with `id="main-content"`            | Primary content identification |
| **Footer**       | Uses `<footer>` element with `role="contentinfo"`               | Site information section       |
| **Navigation**   | Proper use of `<nav>` elements with `aria-label` attributes     | Accessible navigation          |
| **Lists**        | Navigation items properly wrapped in `<ul>` and `<li>` elements | Screen reader friendly lists   |

### 🎨 **ARIA Labels and Attributes**

| Component                | ARIA Implementation                                                         | Benefit                      |
| ------------------------ | --------------------------------------------------------------------------- | ---------------------------- |
| **Navigation**           | `aria-label` for main and mobile navigation                                 | Clear navigation context     |
| **Language Switcher**    | `aria-expanded`, `aria-haspopup`, `aria-labelledby`                         | Dropdown state communication |
| **Forms**                | `aria-describedby` for error messages, `aria-invalid` for validation states | Form validation feedback     |
| **Interactive Elements** | Comprehensive `aria-label` attributes for context                           | Clear interaction purpose    |

### ⌨️ **Keyboard Navigation Support**

| Feature               | Implementation                                   | User Benefit                     |
| --------------------- | ------------------------------------------------ | -------------------------------- |
| **Tab Navigation**    | All interactive elements are keyboard accessible | Keyboard-only users can navigate |
| **Skip Links**        | "Skip to main content" link for keyboard users   | Quick content access             |
| **Mobile Menu**       | Toggleable with keyboard (Enter/Space)           | Keyboard mobile navigation       |
| **Language Selector** | Arrow key navigation support                     | Efficient language switching     |
| **Form Elements**     | Full keyboard support with proper tab order      | Accessible form completion       |

### 🎯 **Focus Management**

| Feature                      | Implementation                                 | Benefit                  |
| ---------------------------- | ---------------------------------------------- | ------------------------ |
| **Visible Focus Indicators** | Custom focus rings on all interactive elements | Clear focus visibility   |
| **Focus Trapping**           | Implemented for dropdowns and modals           | Prevents focus loss      |
| **Focus Restoration**        | Previous focus restored when closing overlays  | Maintains user context   |
| **Skip Links**               | Positioned off-screen and revealed on focus    | Screen reader accessible |

### 📢 **Screen Reader Optimization**

| Feature                        | Implementation                                | Benefit                       |
| ------------------------------ | --------------------------------------------- | ----------------------------- |
| **Screen Reader Only Content** | `.sr-only` class for contextual information   | Hidden but accessible content |
| **Live Regions**               | `aria-live` for dynamic content announcements | Real-time updates announced   |
| **Descriptive Labels**         | All images have proper `alt` attributes       | Image content understanding   |
| **Form Validation**            | Error messages announced to screen readers    | Immediate feedback            |

### 🎨 **Color and Contrast**

| Feature                   | Implementation                               | Compliance                    |
| ------------------------- | -------------------------------------------- | ----------------------------- |
| **High Contrast Support** | Enhanced colors for high contrast mode       | WCAG AA compliance            |
| **Color Independence**    | Information not conveyed through color alone | Multiple information channels |
| **Focus Indicators**      | High contrast focus rings                    | Clear focus visibility        |
| **Text Contrast**         | Ensured WCAG AA compliance ratios            | Readable text for all users   |

### 📱 **Responsive and Touch-Friendly**

| Feature                 | Implementation                | Benefit                  |
| ----------------------- | ----------------------------- | ------------------------ |
| **Touch Targets**       | Minimum 44px touch targets    | Easy mobile interaction  |
| **Mobile Optimization** | Accessible mobile navigation  | Mobile accessibility     |
| **Responsive Design**   | Works across all device sizes | Universal device support |

## 🧩 Components with Accessibility Features

### HeaderNavigation

| Feature                | Implementation                               | Benefit                      |
| ---------------------- | -------------------------------------------- | ---------------------------- |
| **Semantic Structure** | `<header>` and `<nav>` elements              | Clear navigation hierarchy   |
| **Mobile Menu**        | Proper ARIA attributes for mobile navigation | Accessible mobile experience |
| **Keyboard Support**   | Hamburger menu accessible with keyboard      | Keyboard-only navigation     |
| **Skip Links**         | Skip to main content functionality           | Quick content access         |

### LanguageSwitcher

| Feature                         | Implementation                   | Benefit                       |
| ------------------------------- | -------------------------------- | ----------------------------- |
| **Listbox Pattern**             | Proper ARIA roles and states     | Screen reader compatibility   |
| **Keyboard Navigation**         | Arrow keys, Escape key support   | Efficient keyboard control    |
| **ARIA States**                 | `aria-expanded`, `aria-selected` | Clear state communication     |
| **Screen Reader Announcements** | Proper announcements for changes | Accessible language switching |

### Form Component

| Feature                 | Implementation                                | Benefit                    |
| ----------------------- | --------------------------------------------- | -------------------------- |
| **ARIA Support**        | Form validation with ARIA attributes          | Accessible form validation |
| **Error Messages**      | Linked to form fields with `aria-describedby` | Clear error communication  |
| **Fieldsets**           | Grouped form controls with legends            | Logical form organization  |
| **Required Indicators** | Clear indication of required fields           | User guidance              |

### FooterContent

| Feature                 | Implementation                | Benefit                    |
| ----------------------- | ----------------------------- | -------------------------- |
| **Semantic Footer**     | Proper footer structure       | Clear site information     |
| **Social Links**        | Accessible social media links | Social media accessibility |
| **Navigation Labeling** | Proper navigation labeling    | Clear footer navigation    |

## 🛠️ Accessibility Utilities

### `accessibility-utils.ts`

| Utility                         | Purpose                            | Usage                       |
| ------------------------------- | ---------------------------------- | --------------------------- |
| **Focus Trapping**              | Trap focus within modals/dropdowns | Prevents focus loss         |
| **Screen Reader Announcements** | Announce dynamic content changes   | Real-time updates           |
| **Keyboard Navigation Helpers** | Keyboard event handling utilities  | Consistent keyboard support |
| **Color Contrast Checking**     | Validate color contrast ratios     | WCAG compliance             |

### `AccessibilityAnnouncer.tsx`

| Feature                        | Purpose                                    | Benefit                 |
| ------------------------------ | ------------------------------------------ | ----------------------- |
| **Dynamic Content**            | Announce content changes to screen readers | Real-time accessibility |
| **Priority Levels**            | Configurable announcement priority         | Appropriate urgency     |
| **Screen Reader Optimization** | Optimized for assistive technologies       | Better user experience  |

## 🧪 Testing Accessibility

### Automated Testing Setup

```bash
# Install accessibility testing tools
npm install --save-dev @axe-core/playwright
npm install --save-dev axe-core

# Run accessibility tests
npm run test:a11y
```

### Manual Testing Checklist

#### ⌨️ Keyboard Navigation Testing

| Test                                     | Expected Result                             |
| ---------------------------------------- | ------------------------------------------- |
| **Tab through all interactive elements** | All elements receive focus in logical order |
| **Use arrow keys in menus/lists**        | Proper navigation within components         |
| **Test Escape key functionality**        | Modals/dropdowns close properly             |
| **Verify skip links work**               | Skip links jump to main content             |

#### 📢 Screen Reader Testing

| Test                                    | Expected Result               |
| --------------------------------------- | ----------------------------- |
| **Test with VoiceOver (macOS)**         | All content announced clearly |
| **Test with NVDA (Windows)**            | Navigation works smoothly     |
| **Verify all content is announced**     | No content is missed          |
| **Check form validation announcements** | Errors announced immediately  |

#### 👁️ Visual Testing

| Test                                    | Expected Result                        |
| --------------------------------------- | -------------------------------------- |
| **Test at 200% zoom**                   | All content remains accessible         |
| **Check high contrast mode**            | Content remains readable               |
| **Verify focus indicators are visible** | Focus is clearly visible               |
| **Test with different color schemes**   | Accessibility maintained across themes |

## 📋 Best Practices for Contributors

### When Adding New Components

#### 1. Use Semantic HTML

```tsx
// ✅ Good - Semantic button
<button onClick={handleClick}>Click me</button>

// ❌ Bad - Non-semantic div
<div onClick={handleClick}>Click me</div>
```

#### 2. Add Proper ARIA Labels

```tsx
<button aria-label="Close dialog" aria-expanded={isOpen} onClick={handleClose}>
  <CloseIcon />
</button>
```

#### 3. Implement Keyboard Support

```tsx
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleAction()
    e.preventDefault()
  }
}
```

#### 4. Provide Focus Management

```tsx
import { trapFocus } from '@/lib/accessibility-utils'

useEffect(() => {
  if (isOpen && modalRef.current) {
    const cleanup = trapFocus(modalRef.current)
    return cleanup
  }
}, [isOpen])
```

### Form Accessibility Guidelines

#### 1. Associate Labels with Inputs

```tsx
<label htmlFor="email">Email Address</label>
<input
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
{hasError && (
  <div id="email-error" role="alert">
    Please enter a valid email
  </div>
)}
```

#### 2. Group Related Fields

```tsx
<fieldset>
  <legend>Contact Information</legend>
  {/* form fields */}
</fieldset>
```

### Image Accessibility Guidelines

#### 1. Descriptive Alt Text

```tsx
// ✅ Good - Descriptive alt text
<img src="chart.png" alt="Sales increased 25% from Q1 to Q2" />

// ❌ Bad - Generic alt text
<img src="chart.png" alt="chart" />
```

#### 2. Decorative Images

```tsx
<img src="decoration.png" alt="" role="presentation" />
```

## 🌐 Browser Support

This accessibility implementation supports:

| Technology              | Support Level                   | Notes                         |
| ----------------------- | ------------------------------- | ----------------------------- |
| **Modern Browsers**     | Full ARIA support               | Chrome, Firefox, Safari, Edge |
| **Screen Readers**      | NVDA, JAWS, VoiceOver, TalkBack | Comprehensive support         |
| **Keyboard Navigation** | Full support                    | All interactive elements      |
| **High Contrast Modes** | Supported                       | Enhanced visibility           |
| **Reduced Motion**      | Respected                       | Respects user preferences     |

## 📊 Reporting Issues

### When Reporting Accessibility Issues

| Information              | Required | Description                             |
| ------------------------ | -------- | --------------------------------------- |
| **Browser**              | ✅       | Which browser and version               |
| **Assistive Technology** | ✅       | Screen reader, magnification tool, etc. |
| **Steps to Reproduce**   | ✅       | Detailed reproduction steps             |
| **Expected Behavior**    | ✅       | What should happen                      |
| **Actual Behavior**      | ✅       | What actually happens                   |
| **Severity Level**       | ✅       | Critical, High, Medium, Low             |

### Issue Severity Levels

| Level        | Description               | Examples                                        |
| ------------ | ------------------------- | ----------------------------------------------- |
| **Critical** | Blocks core functionality | Can't navigate, can't submit forms              |
| **High**     | Major usability impact    | Missing important content, confusing navigation |
| **Medium**   | Moderate impact           | Minor navigation issues, unclear labels         |
| **Low**      | Minor improvements        | Cosmetic issues, nice-to-have features          |

## 🔄 Continuous Improvement

### Regular Audits Should Include:

| Audit Type            | Frequency   | Tools                       |
| --------------------- | ----------- | --------------------------- |
| **Automated Testing** | Every build | axe-core, Lighthouse        |
| **Manual Testing**    | Monthly     | Real assistive technologies |
| **User Testing**      | Quarterly   | Users with disabilities     |
| **Guideline Review**  | Annually    | New WCAG guidelines         |

### Resources for Ongoing Learning

| Resource                                                                      | Type      | Purpose                         |
| ----------------------------------------------------------------------------- | --------- | ------------------------------- |
| [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)                | Official  | Current accessibility standards |
| [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)            | Official  | ARIA implementation patterns    |
| [WebAIM Accessibility Checklist](https://webaim.org/standards/wcag/checklist) | Community | Practical checklist             |
| [axe DevTools](https://www.deque.com/axe/devtools/)                           | Tool      | Automated testing               |

---

## 🎯 Quick Reference

### Essential ARIA Attributes

| Attribute          | Purpose                | Example                        |
| ------------------ | ---------------------- | ------------------------------ |
| `aria-label`       | Accessible name        | `aria-label="Close dialog"`    |
| `aria-describedby` | Additional description | `aria-describedby="help-text"` |
| `aria-expanded`    | Expandable state       | `aria-expanded="true"`         |
| `aria-invalid`     | Validation state       | `aria-invalid="true"`          |
| `aria-live`        | Live region            | `aria-live="polite"`           |

### Common Patterns

| Pattern        | Implementation                           | Use Case             |
| -------------- | ---------------------------------------- | -------------------- |
| **Button**     | `<button>` with `aria-label`             | Interactive elements |
| **Link**       | `<a>` with descriptive text              | Navigation           |
| **Form**       | `<form>` with `<label>` and `<fieldset>` | Data input           |
| **Navigation** | `<nav>` with `aria-label`                | Site navigation      |
| **Dialog**     | `<dialog>` with focus management         | Modal windows        |

> **Remember**: Accessibility is not a feature—it's a fundamental requirement for inclusive web experiences! ♿
