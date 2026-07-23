# IGENTX Static Site

Static-content Next.js marketing site for [igentx.com](https://www.igentx.com). Content lives in `content/` (no Storyblok at runtime). API routes (`/api/contact`) remain on the same deployment.

## Setup

```bash
npm install
cp .env.example .env.local
# Fill Mailjet keys for contact form
```

## Content

- English content: `content/en/`
- Block components: `components/blocks/` (rendered via `lib/blocks.tsx`)
- One-time Storyblok export: `npm run export:storyblok` (requires `STORYBLOK_ACCESS_TOKEN`)
- Edit JSON files directly for content updates

## Development

```bash
npm run dev
npm run build
npm run start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build (SSG, no CMS) |
| `npm run export:storyblok` | One-time export from Storyblok to `content/` |
| `npm run seed:content` | Seed global pages, products, UAE hub, Bloomwave |
| `npm run generate:pages` | Regenerate `page.tsx` files from config |

## Content workflow

1. Edit JSON in `content/en/` directly for copy changes
2. Re-export from Storyblok if needed: `npm run export:storyblok`
3. Re-seed derived pages: `npm run seed:content`
4. `npm run build` — no Storyblok token required at build time
