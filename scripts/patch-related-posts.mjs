#!/usr/bin/env node
/** Patch related_posts on the 6 original blog posts to link into new clusters */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BLOG = path.join(__dirname, '../content/en/blog')

const card = (uid, slug, title, excerpt, category, image, date = '2026-07-23', rt = '6 min read') => ({
  _uid: uid,
  component: 'blog_card',
  title,
  excerpt,
  category,
  author_name: 'IGENTX Digital Team',
  publish_date: date,
  reading_time: rt,
  link: { url: '', linktype: 'story', cached_url: `blog/${slug}` },
  featured_image: {
    filename: image,
    alt: title,
    fieldtype: 'asset',
    is_external_url: false,
  },
})

const patches = {
  'importance-of-website-uae': [
    card('rel-local-seo', 'local-seo-dubai-uae-guide', 'Local SEO in Dubai and the UAE', 'Google Business Profile and bilingual local pages.', 'SEO', '/assets/blog/seo-og.webp', '2026-07-23', '7 min read'),
    card('rel-bilingual', 'bilingual-website-development-uae', 'Bilingual Website Development in the UAE', 'RTL, hreflang and localisation for UAE sites.', 'Web Development', '/assets/images/web-development-uae.webp'),
    card('rel-ecommerce', 'ecommerce-website-development-dubai-uae', 'Ecommerce Development in Dubai and the UAE', 'Payments, checkout and conversions for UAE stores.', 'Ecommerce', '/assets/blog/ecommerce-og.webp', '2026-07-23', '7 min read'),
  ],
  'ai-in-web-development-uae': [
    card('rel-custom-sw', 'custom-software-development-uae-guide', 'Custom Software Development UAE Guide', 'When bespoke software beats off-the-shelf tools.', 'Web Development', '/assets/images/custom-software-development.webp'),
    card('rel-moduluxe', 'moduluxe-group-seo-case-study', 'Moduluxe Group: 312% Organic Traffic Growth', 'Bilingual SEO case study for a UAE brand.', 'Web Development', '/assets/images/moduluxegroup.webp'),
    card('rel-tech-seo', 'technical-seo-checklist-uae', 'Technical SEO Checklist for UAE Websites', 'Core Web Vitals, schema and hreflang.', 'SEO', '/assets/blog/seo-banner.webp'),
  ],
  'how-to-choose-best-web-development-agency-uae': [
    card('rel-bilingual', 'bilingual-website-development-uae', 'Bilingual Website Development in the UAE', 'What to expect from bilingual delivery.', 'Web Development', '/assets/images/web-development-uae.webp'),
    card('rel-moduluxe', 'moduluxe-group-seo-case-study', 'Moduluxe Group Case Study', '312% organic traffic with IGENTX.', 'Web Development', '/assets/images/moduluxegroup.webp'),
    card('rel-branding', 'branding-uae-startups-guide', 'Branding for UAE Startups', 'Identity and digital presence for new brands.', 'Branding', '/assets/blog/branding-og.webp', '2026-07-23', '5 min read'),
  ],
  'web-development-uae': [
    card('rel-local-seo', 'local-seo-dubai-uae-guide', 'Local SEO in Dubai and the UAE', 'Local search strategy for the Emirates.', 'SEO', '/assets/blog/seo-og.webp', '2026-07-23', '7 min read'),
    card('rel-bilingual', 'bilingual-website-development-uae', 'Bilingual Website Development in the UAE', 'Arabic and English implementation patterns.', 'Web Development', '/assets/images/web-development-uae.webp'),
    card('rel-custom-sw', 'custom-software-development-uae-guide', 'Custom Software Development UAE Guide', 'Portals, integrations and bespoke builds.', 'Web Development', '/assets/images/custom-software-development.webp'),
  ],
  'ai-customer-service-agent-uae': [
    card('rel-bloomwave', 'bloomwave-daycaremate-digital-transformation', 'BloomWave Digital Transformation', 'Website, AI agent and DaycareMate rollout.', 'Products', '/assets/images/bloomwave-homepage.jpg'),
    card('rel-childcare', 'childcare-management-software-uae-guide', 'Childcare Management Software UAE Guide', 'Buyer guide for centre software.', 'Products', '/assets/images/daycaremate-hero.webp', '2026-07-23', '8 min read'),
    card('rel-local-seo', 'local-seo-dubai-uae-guide', 'Local SEO in Dubai and the UAE', 'Capture more website enquiries with local SEO.', 'SEO', '/assets/blog/seo-og.webp', '2026-07-23', '7 min read'),
  ],
  'daycaremate-childcare-management-software-guide': [
    card('rel-childcare-buyer', 'childcare-management-software-uae-guide', 'How to Choose Childcare Software in the UAE', 'Vendor evaluation for UAE centres.', 'Products', '/assets/images/daycaremate-hero.webp', '2026-07-23', '8 min read'),
    card('rel-nursery', 'opening-nursery-dubai-digital-tools', 'Opening a Nursery in Dubai: Digital Tools', 'Launch checklist for new centres.', 'Products', '/assets/images/daycaremate-dashboard.webp', '2026-07-23', '7 min read'),
    card('rel-bloomwave', 'bloomwave-daycaremate-digital-transformation', 'BloomWave Digital Transformation', 'Real UAE centre rollout story.', 'Products', '/assets/images/bloomwave-homepage.jpg'),
  ],
}

for (const [slug, related] of Object.entries(patches)) {
  const file = path.join(BLOG, `${slug}.json`)
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  const detail = data.content.body.find((b) => b.component === 'blog_detail')
  if (detail) {
    detail.related_posts = related
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
    console.log('Patched related_posts:', slug)
  }
}
