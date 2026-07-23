# ⚡ Quick Setup Guide

> Static-content Next.js site. Content lives in `content/` and is rendered by block components in `components/blocks/` via `lib/blocks.tsx`. Storyblok is only used for optional one-time exports (`npm run export:storyblok`).

## 🚀 Quick Start (5 minutes)

### Prerequisites

| Requirement           | Version | Purpose                                      |
| --------------------- | ------- | -------------------------------------------- |
| **Node.js**           | 18+     | Runtime environment                          |
| **npm/yarn**          | Latest  | Package manager                              |

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env.local
```

### 3. Start Development Server

```bash
# Regular development
npm run dev

# HTTPS development (required for Storyblok Visual Editor)
npm run dev:https
```

**Access your application:**

- 🌐 **HTTP**: http://localhost:3000
- 🔒 **HTTPS**: https://localhost:3000 (for Visual Editor)

> **Note**: The template works with default content even without Storyblok configuration!

## 🎯 Storyblok Integration (10 minutes)

### Step 1: Create Storyblok Space

1. Sign up at [Storyblok](https://app.storyblok.com/)
2. Create a new space
3. Note your space ID

### Step 2: Get Access Tokens

1. Go to **Settings > API Keys**
2. Copy the **Public Access Token**
3. Copy the **Preview Access Token**

### Step 3: Update Environment Variables

Edit `.env.local`:

```env
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_public_token_here
STORYBLOK_PREVIEW_TOKEN=your_preview_token_here
```

### Step 4: Import Component Schemas

Import these component schemas in your Storyblok space:

#### 📄 Page Component

```json
{
  "name": "page",
  "display_name": "Page",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0
    },
    "body": {
      "type": "bloks",
      "restrict_components": true,
      "component_whitelist": ["hero", "feature", "about"],
      "pos": 1
    }
  }
}
```

#### 🦸 Hero Component

```json
{
  "name": "hero",
  "display_name": "Hero",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0
    },
    "subtitle": {
      "type": "textarea",
      "pos": 1
    },
    "background_image": {
      "type": "asset",
      "filetypes": ["images"],
      "pos": 2
    },
    "cta_text": {
      "type": "text",
      "pos": 3
    },
    "cta_link": {
      "type": "multilink",
      "pos": 4
    }
  }
}
```

#### ⭐ Feature Component

```json
{
  "name": "feature",
  "display_name": "Feature",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0
    },
    "description": {
      "type": "textarea",
      "pos": 1
    },
    "icon": {
      "type": "asset",
      "filetypes": ["images"],
      "pos": 2
    },
    "features": {
      "type": "bloks",
      "restrict_components": true,
      "component_whitelist": ["feature_item"],
      "pos": 3
    }
  }
}
```

#### 👥 About Component

```json
{
  "name": "about",
  "display_name": "About",
  "schema": {
    "title": {
      "type": "text",
      "pos": 0
    },
    "content": {
      "type": "textarea",
      "pos": 1
    },
    "image": {
      "type": "asset",
      "filetypes": ["images"],
      "pos": 2
    },
    "team_members": {
      "type": "bloks",
      "restrict_components": true,
      "component_whitelist": ["team_member"],
      "pos": 3
    }
  }
}
```

### Step 5: Create Content

1. Create a new story with slug `home`
2. Use the `page` component as the content type
3. Add hero and feature blocks to the body
4. Publish the story

### Step 6: Configure Visual Editor

1. Go to **Settings > Visual Editor**
2. Set Preview URL to: `https://localhost:3000`
3. Start dev server with HTTPS: `npm run dev:https`
4. Click "Open Visual Editor" in your story

## 🎨 Customization Tips

### Adding New Components

| Step | Action                                                  | Result                   |
| ---- | ------------------------------------------------------- | ------------------------ |
| 1    | Create React component in `components/blocks/`          | New component ready      |
| 2    | Add to component registry in `lib/blocks.tsx`           | Component registered     |
| 3    | Add matching JSON in `content/en/`                      | Content available        |
| 4    | Run `npm run build` to verify                           | Static page generated    |

### Styling Guidelines

| Aspect                | Implementation              | Benefit                  |
| --------------------- | --------------------------- | ------------------------ |
| **Colors**            | Use Tailwind CSS classes    | Consistent design system |
| **Customization**     | Modify `tailwind.config.ts` | Brand-specific styling   |
| **Global Styles**     | Add to `app/globals.css`    | Site-wide styling        |
| **Responsive Design** | Mobile-first approach       | Universal device support |

### SEO Optimization

| Feature                | Implementation                                | Benefit                    |
| ---------------------- | --------------------------------------------- | -------------------------- |
| **Metadata**           | Update metadata in page components            | Search engine optimization |
| **Structured Data**    | Add structured data for better search results | Rich snippets              |
| **Image Optimization** | Use Next.js Image component                   | Performance and SEO        |

## 🚨 Troubleshooting

### Common Issues & Solutions

| Issue                         | Solution                                      | Expected Result               |
| ----------------------------- | --------------------------------------------- | ----------------------------- |
| **Visual Editor not loading** | Use HTTPS development (`npm run dev:https`)   | Visual Editor loads properly  |
| **Content not showing**       | Check if story exists and is published        | Content displays correctly    |
| **HTTPS certificate warning** | Click "Advanced" then "Proceed to localhost"  | HTTPS works for Visual Editor |
| **Build errors**              | Verify environment variables and dependencies | Clean build process           |

### Debug Steps

1. **Check Storyblok**: Ensure story exists and is published
2. **Verify Component Names**: Match between React and Storyblok
3. **Check Console**: Look for API errors in browser dev tools
4. **Environment Variables**: Ensure all required variables are set

## 📞 Need Help?

### Getting Support

| Resource                    | Type          | Purpose                          |
| --------------------------- | ------------- | -------------------------------- |
| **Main README.md**          | Documentation | Complete setup and usage guide   |
| **Storyblok Documentation** | Official      | CMS-specific guidance            |
| **Repository Issues**       | Community     | Bug reports and feature requests |
| **Community Discussions**   | Community     | Questions and answers            |

### Quick Reference

| Command             | Purpose                        |
| ------------------- | ------------------------------ |
| `npm run dev`       | Start development server       |
| `npm run dev:https` | Start HTTPS development server |
| `npm run build`     | Build for production           |
| `npm run lint`      | Check code quality             |

---

## 🎉 You're All Set!

Your NextJS Storyblok template is now ready for development. You can:

- ✅ **Create content** in Storyblok Visual Editor
- ✅ **Customize components** to match your design
- ✅ **Add new features** using the component system
- ✅ **Deploy to production** when ready

**Happy coding!** 🚀
