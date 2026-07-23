# Agent context — IGENTX marketing site

Use this doc as the first stop when changing copy, content, or homepage blocks in this repo. Paths are repo-root relative.

---

## 1. Product snapshot

**IGENXT** is an AI-first technology company. Marketing copy should be **outcome-first**: leads, conversions, operational efficiency, and measurable growth, not feature lists alone.

**Positioning:** Global early childhood and business technology partner; **UAE is the primary market**, not the geographic limit of the product or services.

**Core offerings**

| Area | What we market |
|------|----------------|
| Web & software | High-performance websites and custom applications (Next.js, React) |
| AI customer agent | 24/7 enquiry assistant with RAG, multilingual (EN/AR) |
| Ecommerce | Shopify, BigCommerce, headless commerce |
| SEO & growth | Technical SEO, performance, ongoing optimisation |
| Vertical products | DaycareMate (childcare centre management platform) |

---

## 2. Copy and EEAT rules

### Punctuation and style

- **No em dashes (`—`)** in public marketing copy under `content/en/`. Use commas, colons, or periods instead.
- Prefer clear, direct sentences over stacked clauses.
- Use **British spelling** where already established (e.g. optimisation, emphasise).

### Trust and metrics

Use **conservative, defensible** homepage trust-band values unless leadership approves new numbers:

| Metric | Value |
|--------|-------|
| Custom-built solutions | 100% |
| Client satisfaction | 100% (backed by published case study endorsements) |
| Combined team experience | 10+ years (label: Years of Experience) |
| Multi-country support | Global |
| Support | Customer Support (subtitle: Available 24/7) |

Do not inflate volume metrics (e.g. 50+ projects, 20+ industries) without verified evidence.

### Trust band

- **Light contrast section** between dark hero and Why Choose IGENTX: badge, gradient-accent title, partner logo card, metrics card with icons and descriptions
- **Technology partner icons + animated metrics** (no client logo marquee)
- Content fields: `badge_text`, `title`, `description`, `partner_logos`, `metrics` (with `description`, `icon_key`)

### Testimonials (EEAT)

- Set `verified: true` only when the quote is backed by a published case study.
- Keep homepage portfolio testimonials **in sync** with case study `testimonial_author`, `testimonial_role`, and `testimonial_text` fields.
- Do not invent client quotes or roles.

### CTAs

- Primary hero and conversion CTA: **"Book a Free Consultation"** → contact page
- Secondary hero CTA where applicable: **"View Our Work"** → case studies

---

## 3. Verified testimonials registry

| Author | Company | Role | Case study slug |
|--------|---------|------|-----------------|
| Murshid CK | Moduluxe | Operations Head | `case-studies/web-development-uae-startup-moduluxe-group` |
| Ajas Muhammed | BloomWave Learning & Daycare | Managing Director | `case-studies/bloomwave-learning-daycare` |
| Muhammed Ashraf | DrDoor | Managing Director | `case-studies/web-development-startup-dr-door` |

When adding or editing a testimonial, update **both** `content/en/home.json` (`igentx_portfolio.testimonials`) and the matching `content/en/case-studies/*.json` file.

---

## 4. Homepage structure

Block order in `content/en/home.json` → `content.body[]`:

```
igentx_hero
  → igentx_trust_band
  → why_choose_igentx
  → igentx_products
  → igentx_services
  → igentx_portfolio
  → igentx_cta_band
  → faq
```

**Trust band:** Intentional light section (`bg-gray-50`, white cards) between hero and Why Choose. Badge pill, partner logo card with dividers, 5-column metrics card (icons + animated values + descriptions). Trust-band stats stay in `igentx_trust_band` (not duplicated in Why Choose).

**Why Choose IGENTX:** Full-width dark section using hero navy gradient. Feature cards: glass panels, glowing icon borders, checkmark tags. UAE band and speed comparison sit below the grid on the same dark background.

**Hero settings:** 6 slides, `autoplay_delay` ~11000ms, fade transitions, primary + secondary CTA per slide.

**Services block:** 5 services with Problem → Solution → Outcome; 7-step process; 6 capability-based tech cards with descriptions and benefits row (no duplicate partner logo strip; trust band handles partner logos).

**FAQ:** ~18 curated questions with categories; FAQPage JSON-LD via `FAQ.tsx`.

---

## 5. DaycareMate / product truth (cross-repo)

All **DaycareMate** feature claims on this site must match:

`daycare-management-system/docs/product-features.md`

Do not invent features. Key marketing constraints:

| Topic | Approved framing |
|-------|------------------|
| Language | ECE-inclusive: centre, classroom, family (not daycare-only) |
| Geography | Global product; UAE is first market |
| AI enquiry assistant | Deployable for subscribers; **manual** lead conversion (not auto-logged) |
| Embeddable forms | Enquiry/lead capture only; **not** "visit booking" (no hosted `/visit` page) |
| Partial features | Use careful language from `product-features.md` notes |

---

## 6. Tech patterns (where to edit)

| Concern | Location |
|---------|----------|
| Page content | `content/en/*.json`, `content/en/case-studies/*.json`, `content/en/global/*.json` |
| Block components | `components/blocks/IGENTX*.tsx`, `FAQ.tsx`, `services/ServiceCard.tsx` |
| Block registry | `lib/blocks.tsx` |
| Types | `lib/types.ts` |
| SEO fallbacks | `lib/seo-keywords.ts` |
| Feature docs | `docs/features/` |

Content is JSON-driven (Storyblok-compatible shape). New homepage blocks require: component in `components/blocks/`, type in `lib/types.ts`, registration in `lib/blocks.tsx`, and content in the relevant `content/en/*.json` file.

---

## 7. Key homepage components

| Component | Role |
|-----------|------|
| `IGENTXHero.tsx` | Hero slider: fade transitions, secondary CTA, `autoplay_delay` from content |
| `IGENTXTrustBand.tsx` | Light trust band: badge, partner logo card, animated metrics with icons/descriptions (no client logos) |
| `WhyChooseIGENTX.tsx` | Value proposition cards |
| `IGENTXProducts.tsx` | Featured product + AI solution + coming soon layout |
| `IGENTXServices.tsx` | Problem → Solution → Outcome layout; process + tech stack |
| `IGENTXPortfolio.tsx` | Case studies, verified testimonials, technologies normalization |
| `IGENTXCtaBand.tsx` | Final conversion band before FAQ |
| `FAQ.tsx` | Categorized FAQ, expand/collapse, FAQPage JSON-LD |

Maintain the existing dark futuristic visual identity (Tailwind, gradient backgrounds). Reuse established blocks rather than one-off layouts.

---

## 8. SEO

- Homepage meta fallbacks: `lib/seo-keywords.ts` (`SEO_BY_PATH['/']`)
- Page-level SEO may also live in content JSON `seo` blocks
- UAE-focused keywords on homepage; global positioning in body copy
- See `docs/features/SEO_IMPLEMENTATION.md` and `docs/features/GLOBAL_SEO_SETUP.md` for structured data patterns

---

## 9. Related repos

| Repo | Purpose |
|------|---------|
| `daycare-management-system` | DaycareMate ERP; `docs/product-features.md` is product truth |
| `daycaremate` | DaycareMate marketing site (separate Astro site) |

When writing about DaycareMate capabilities on igentx.com, cross-check `product-features.md` before publishing.
