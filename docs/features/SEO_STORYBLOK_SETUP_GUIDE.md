# SEO Component Setup Guide for Storyblok

This guide will help you add the missing SEO fields to your Storyblok SEO component.

## Current Status

Based on your screenshots, you already have these tabs configured:
- ✅ **General** - Title, Description, Keywords, Canonical URL
- ✅ **Open Graph Fields** - OG Title, Description, Image, Type
- ✅ **Twitter Card Fields** - Twitter Title, Description, Image, Card Type
- ✅ **Advanced SEO Fields** - Robots Index, Follow, Noarchive, Nosnippet
- ❌ **Structured Data Fields** - Missing (shows "No results")
- ⚠️ **Additional Fields** - May need to add some fields

---

## Quick Fix: Add Structured Data Fields

### Step 1: Add "Structured Data Type" Field

1. In Storyblok, go to **Components** → Find your **SEO** component → Click **Edit**
2. Click **"+ Add field"**
3. Configure the field:
   - **Technical Name:** `structured_data_type`
   - **Display Name:** `Structured Data Type`
   - **Field Type:** **Single-Option** (dropdown)
   - **Tab:** Select **"Structured Data Fields"**
   - **Description:** `Schema.org structured data type for this page`

4. Add these **Options** (click "+ Add option" for each):
   ```
   Value: WebSite              | Name: WebSite
   Value: Organization         | Name: Organization
   Value: LocalBusiness        | Name: Local Business
   Value: Article              | Name: Article
   Value: Product              | Name: Product
   Value: Event                | Name: Event
   Value: FAQ                  | Name: FAQ
   Value: BreadcrumbList       | Name: Breadcrumb List
   Value: Custom               | Name: Custom JSON-LD
   ```

5. Click **Save**

---

### Step 2: Add "Custom JSON-LD" Field

1. Still in the SEO component, click **"+ Add field"** again
2. Configure the field:
   - **Technical Name:** `structured_data_custom`
   - **Display Name:** `Structured Data Custom`
   - **Field Type:** **Textarea**
   - **Tab:** Select **"Structured Data Fields"**
   - **Description:** `Custom JSON-LD structured data (only used when Custom is selected)`

3. Click **Save**

---

## Optional: Add Additional Fields Tab

If you want to add the "Additional Fields" tab for article metadata:

### Fields to Add:

1. **Author**
   - Technical Name: `author`
   - Type: Text
   - Tab: Additional Fields
   - Translatable: ✓

2. **Publisher**
   - Technical Name: `publisher`
   - Type: Text
   - Tab: Additional Fields
   - Translatable: ✓

3. **Article Published Time**
   - Technical Name: `article_published_time`
   - Type: Date/Time
   - Tab: Additional Fields

4. **Article Modified Time**
   - Technical Name: `article_modified_time`
   - Type: Date/Time
   - Tab: Additional Fields

5. **Article Author**
   - Technical Name: `article_author`
   - Type: Text
   - Tab: Additional Fields
   - Translatable: ✓

6. **Article Section**
   - Technical Name: `article_section`
   - Type: Text
   - Tab: Additional Fields
   - Translatable: ✓
   - Description: `Article category or section`

7. **Article Tags**
   - Technical Name: `article_tags`
   - Type: Text
   - Tab: Additional Fields
   - Translatable: ✓
   - Description: `Comma-separated article tags`

---

## Verification

After adding the fields:

1. **Refresh** your Storyblok editor
2. Go to any story using the SEO component
3. Click on the **"Structured Data Fields"** tab
4. You should now see:
   - Structured Data Type (dropdown)
   - Structured Data Custom (textarea)

---

## Usage Examples

### For a Homepage (WebSite Schema)
- **Structured Data Type:** Select "WebSite"
- Leave **Structured Data Custom** empty

### For Company Page (Organization Schema)
- **Structured Data Type:** Select "Organization"
- Leave **Structured Data Custom** empty

### For Blog Posts (Article Schema)
- **Structured Data Type:** Select "Article"
- Fill in **Additional Fields** (author, published time, etc.)

### For Custom Schema
- **Structured Data Type:** Select "Custom JSON-LD"
- In **Structured Data Custom**, enter valid JSON-LD:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": "Chocolate Chip Cookies",
    "author": {
      "@type": "Person",
      "name": "Jane Smith"
    }
  }
  ```

---

## Important Notes

- The technical field names **MUST match exactly** as shown above
- Your TypeScript types already expect these field names
- The structured data is automatically processed by `lib/seo-utils.ts`
- Always test your structured data using [Google's Rich Results Test](https://search.google.com/test/rich-results)

---

## Reference Files

- **Complete Schema:** `docs/features/SEO_COMPONENT_SCHEMA.json`
- **TypeScript Types:** `lib/types.ts` (SEOBlok interface)
- **SEO Utilities:** `lib/seo-utils.ts`
- **Implementation Guide:** `docs/features/SEO_IMPLEMENTATION.md`

