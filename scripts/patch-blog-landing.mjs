#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const file = path.join(__dirname, '../content/en/blog-landing-page.json')
const data = JSON.parse(fs.readFileSync(file, 'utf8'))
const grid = data.content.body.find((b) => b.component === 'blog_grid')

grid.filter_categories = 'Web Development, AI, SEO, Ecommerce, Products, Branding'

const newCards = [
  {
    _uid: 'card-local-seo',
    slug: 'local-seo-dubai-uae-guide',
    title: 'Local SEO in Dubai and the UAE: A Practical Guide for 2026',
    excerpt:
      'Google Business Profile, bilingual landing pages, citations and technical foundations for local search in the Emirates.',
    category: 'SEO',
    reading_time: '7 min read',
    image: '/assets/blog/seo-og.webp',
    alt: 'Local SEO guide for Dubai and UAE businesses',
  },
  {
    _uid: 'card-tech-seo',
    slug: 'technical-seo-checklist-uae',
    title: 'Technical SEO Checklist for UAE Websites in 2026',
    excerpt:
      'Audit Core Web Vitals, mobile performance, schema, hreflang and crawlability.',
    category: 'SEO',
    reading_time: '6 min read',
    image: '/assets/blog/seo-banner.webp',
    alt: 'Technical SEO checklist for UAE websites',
  },
  {
    _uid: 'card-ecommerce',
    slug: 'ecommerce-website-development-dubai-uae',
    title: 'Ecommerce Website Development in Dubai and the UAE',
    excerpt:
      'Platform selection, checkout UX, local payments and SEO for UAE online stores.',
    category: 'Ecommerce',
    reading_time: '7 min read',
    image: '/assets/blog/ecommerce-og.webp',
    alt: 'Ecommerce website development guide for Dubai and UAE',
  },
  {
    _uid: 'card-bilingual',
    slug: 'bilingual-website-development-uae',
    title: 'Bilingual Arabic and English Website Development in the UAE',
    excerpt: 'RTL design, hreflang and localisation patterns for bilingual UAE sites.',
    category: 'Web Development',
    reading_time: '6 min read',
    image: '/assets/images/web-development-uae.webp',
    alt: 'Bilingual website development for UAE businesses',
  },
  {
    _uid: 'card-custom-sw',
    slug: 'custom-software-development-uae-guide',
    title: 'Custom Software Development in the UAE: A Practical Guide',
    excerpt: 'When custom software makes sense for UAE workflows and integrations.',
    category: 'Web Development',
    reading_time: '6 min read',
    image: '/assets/images/custom-software-development.webp',
    alt: 'Custom software development guide for UAE businesses',
  },
  {
    _uid: 'card-branding',
    slug: 'branding-uae-startups-guide',
    title: 'Branding for UAE Startups: Logo, Identity and Digital Presence',
    excerpt: 'Visual identity and digital touchpoints that help UAE startups convert.',
    category: 'Branding',
    reading_time: '5 min read',
    image: '/assets/blog/branding-og.webp',
    alt: 'Branding guide for UAE startups',
  },
  {
    _uid: 'card-childcare-buyer',
    slug: 'childcare-management-software-uae-guide',
    title: 'How to Choose Childcare Management Software in the UAE',
    excerpt: 'Buyer guide for evaluating nursery and preschool software in the UAE.',
    category: 'Products',
    reading_time: '8 min read',
    image: '/assets/images/daycaremate-hero.webp',
    alt: 'Childcare management software buyer guide for UAE centres',
  },
  {
    _uid: 'card-nursery-tools',
    slug: 'opening-nursery-dubai-digital-tools',
    title: 'Opening a Nursery in Dubai: Essential Digital Tools for Launch',
    excerpt: 'Website, enquiry capture, centre software and parent communication checklist.',
    category: 'Products',
    reading_time: '7 min read',
    image: '/assets/images/daycaremate-dashboard.webp',
    alt: 'Digital tools for opening a nursery in Dubai',
  },
  {
    _uid: 'card-moduluxe-blog',
    slug: 'moduluxe-group-seo-case-study',
    title: 'How Moduluxe Group Grew Organic Traffic by 312%',
    excerpt: 'Bilingual SEO and performance results for a UAE real estate brand.',
    category: 'Web Development',
    reading_time: '6 min read',
    image: '/assets/images/moduluxegroup.webp',
    alt: 'Moduluxe Group SEO case study',
  },
  {
    _uid: 'card-bloomwave-blog',
    slug: 'bloomwave-daycaremate-digital-transformation',
    title: 'BloomWave: Digital Transformation with Website, AI and DaycareMate',
    excerpt: 'How one UAE centre launched website, AI enquiries and operations software.',
    category: 'Products',
    reading_time: '6 min read',
    image: '/assets/images/bloomwave-homepage.jpg',
    alt: 'BloomWave digital transformation case study',
  },
]

function toCard(c) {
  return {
    _uid: c._uid,
    component: 'blog_card',
    title: c.title,
    excerpt: c.excerpt,
    category: c.category,
    author_name: 'IGENTX Digital Team',
    publish_date: '2026-07-23',
    reading_time: c.reading_time,
    link: { url: '', linktype: 'story', cached_url: `blog/${c.slug}` },
    featured_image: {
      filename: c.image,
      alt: c.alt,
      fieldtype: 'asset',
      is_external_url: false,
    },
  }
}

const existingSlugs = new Set(
  grid.blogs.map((b) => (b.link?.cached_url || '').replace('blog/', ''))
)
for (const c of newCards) {
  if (!existingSlugs.has(c.slug)) {
    grid.blogs.unshift(toCard(c))
  }
}

grid.topic_links.push({
  _uid: 'topic-ecommerce',
  component: 'blog_topic_link',
  title: 'Ecommerce Development UAE',
  description: 'Online stores with UAE payment gateways and conversion-focused checkout.',
  link: {
    url: '/services/ecommerce-website-development-uae',
    linktype: 'url',
    cached_url: 'services/ecommerce-website-development-uae',
  },
})

grid.topic_links.push({
  _uid: 'topic-branding',
  component: 'blog_topic_link',
  title: 'Branding & Design UAE',
  description: 'Logo, brand identity and marketing creative for UAE businesses.',
  link: {
    url: '/services/graphic-design-uae',
    linktype: 'url',
    cached_url: 'services/graphic-design-uae',
  },
})

const allPosts = [
  { name: 'Local SEO in Dubai and the UAE', slug: 'local-seo-dubai-uae-guide' },
  { name: 'Technical SEO Checklist for UAE Websites', slug: 'technical-seo-checklist-uae' },
  { name: 'Ecommerce Website Development in Dubai and the UAE', slug: 'ecommerce-website-development-dubai-uae' },
  { name: 'Bilingual Website Development in the UAE', slug: 'bilingual-website-development-uae' },
  { name: 'Custom Software Development UAE Guide', slug: 'custom-software-development-uae-guide' },
  { name: 'Branding for UAE Startups', slug: 'branding-uae-startups-guide' },
  { name: 'Childcare Management Software UAE Buyer Guide', slug: 'childcare-management-software-uae-guide' },
  { name: 'Opening a Nursery in Dubai Digital Tools', slug: 'opening-nursery-dubai-digital-tools' },
  { name: 'Moduluxe Group SEO Case Study', slug: 'moduluxe-group-seo-case-study' },
  { name: 'BloomWave DaycareMate Digital Transformation', slug: 'bloomwave-daycaremate-digital-transformation' },
  { name: 'AI Customer Service Agent with Smart Lead Generation', slug: 'ai-customer-service-agent-uae' },
  { name: 'Why Every UAE Business Needs a Strong Website in 2025', slug: 'importance-of-website-uae' },
  { name: 'How AI Is Revolutionizing Web Development in the UAE', slug: 'ai-in-web-development-uae' },
  { name: 'How to Choose the Best Web Development Agency in the UAE', slug: 'how-to-choose-best-web-development-agency-uae' },
  { name: 'Web Development in the UAE: A Practical Guide', slug: 'web-development-uae' },
  { name: 'DaycareMate Childcare Centre Management Software Guide', slug: 'daycaremate-childcare-management-software-guide' },
]

const seo = data.content.body.find((b) => b.component === 'seo')
seo.structured_data_custom = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'IGENTX Blog Articles',
  description: 'Articles on web development, AI, SEO and digital growth from IGENTX.',
  itemListElement: allPosts.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    url: `https://www.igentx.com/blog/${p.slug}`,
  })),
})

fs.writeFileSync(file, JSON.stringify(data, null, 2))
console.log('Patched blog-landing-page.json')
