#!/usr/bin/env node
/**
 * Seed new global pages, products, UAE hub, and Bloomwave case study content.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const EN = path.join(ROOT, 'content', 'en')

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf-8'))
}

function writeJson(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, JSON.stringify(data, null, 2))
}

function cloneService(sourceSlug, targetSlug, seoPatch) {
  const src = readJson(path.join(EN, `${sourceSlug}.json`))
  const clone = structuredClone(src)
  clone.slug = targetSlug
  clone.name = seoPatch.name || clone.name
  const seoBlock = clone.content.body.find((b) => b.component === 'seo')
  if (seoBlock && seoPatch.seo) Object.assign(seoBlock, seoPatch.seo)
  writeJson(path.join(EN, `${targetSlug}.json`), clone)
  console.log(`✓ ${targetSlug}`)
  return clone
}

// Global services cloned from UAE pages
cloneService('services/web-development-uae', 'services/web-development', {
  name: 'Web Development',
  seo: {
    title: 'Custom Web Development Company | IGENTX',
    description:
      'Performance-first websites with Next.js and modern stacks. Global delivery from an AI-accelerated studio.',
    keywords: 'custom web development company, Next.js development agency, headless CMS websites',
    canonical_url: 'https://www.igentx.com/services/web-development',
    og_title: 'Custom Web Development Company | IGENTX',
    og_description:
      'High-performance websites built for speed, SEO, and scale — delivered globally from IGENTX.',
  },
})

cloneService('services/ecommerce-website-development-uae', 'services/ecommerce-development', {
  name: 'Ecommerce Development',
  seo: {
    title: 'Ecommerce Website Development | IGENTX',
    description:
      'Conversion-focused online stores with mobile-first UX and payment integrations.',
    keywords: 'ecommerce website development, online store development, Shopify development',
    canonical_url: 'https://www.igentx.com/services/ecommerce-development',
  },
})

cloneService('services/graphic-design-uae', 'services/branding-graphic-design', {
  name: 'Branding & Graphic Design',
  seo: {
    title: 'Branding & Graphic Design Agency | IGENTX',
    description: 'Brand identity, UI design, and visual systems for web and marketing.',
    keywords: 'branding agency, graphic design, logo design, brand identity',
    canonical_url: 'https://www.igentx.com/services/branding-graphic-design',
  },
})

cloneService('services/seo-service-uae', 'services/seo', {
  name: 'SEO Services',
  seo: {
    title: 'Technical SEO Services | IGENTX',
    description: 'Core Web Vitals, schema markup, and content strategy for search and AI discovery.',
    keywords: 'technical SEO services, Core Web Vitals, schema markup',
    canonical_url: 'https://www.igentx.com/services/seo',
  },
})

// UAE hub — clone services landing with regional focus
const servicesLanding = readJson(path.join(EN, 'services-landing-page.json'))
const uaeHub = structuredClone(servicesLanding)
uaeHub.slug = 'uae'
uaeHub.name = 'UAE'
const uaeSeo = uaeHub.content.body.find((b) => b.component === 'seo')
if (uaeSeo) {
  Object.assign(uaeSeo, {
    title: 'Digital Agency Dubai & UAE | IGENTX',
    description:
      'Web development, ecommerce, branding, SEO, and AI products for UAE businesses. Bilingual sites, local SEO, and regional expertise.',
    keywords: 'digital agency Dubai, web development UAE, AI agency Dubai',
    canonical_url: 'https://www.igentx.com/uae',
  })
}
const uaeGrid = uaeHub.content.body.find((b) => b.component === 'service_grid')
if (uaeGrid) {
  uaeGrid.title = 'IGENTX in the UAE'
  uaeGrid.description =
    'Our first market — helping Dubai and UAE businesses launch faster with bilingual websites, local SEO, and AI-powered support.'
}
writeJson(path.join(EN, 'uae.json'), uaeHub)
console.log('✓ uae')

// Products landing
const productsLanding = structuredClone(servicesLanding)
productsLanding.slug = 'products-landing-page'
productsLanding.name = 'Products'
const prodSeo = productsLanding.content.body.find((b) => b.component === 'seo')
if (prodSeo) {
  Object.assign(prodSeo, {
    title: 'IGENTX Products | AI Agent & DaycareMate',
    description: 'Software products built by IGENTX: AI Customer Service Agent and DaycareMate childcare platform.',
    canonical_url: 'https://www.igentx.com/products',
  })
}
writeJson(path.join(EN, 'products-landing-page.json'), productsLanding)
console.log('✓ products-landing-page')

// DaycareMate product page content
const aiProduct = readJson(path.join(EN, 'products/ai-customer-service-agent.json'))
const daycaremate = structuredClone(aiProduct)
daycaremate.slug = 'products/daycaremate'
daycaremate.name = 'DaycareMate'
daycaremate.content.body = [
  {
    _uid: 'dm-seo-1',
    component: 'seo',
    title: 'DaycareMate — Childcare Management Software | IGENTX',
    description:
      'Childcare management platform by IGENTX: admissions, attendance, parent communication, and tax-aware billing. Single-tenant deployment per centre.',
    keywords:
      'childcare management software, nursery management system, preschool ERP, early childhood centre software',
    canonical_url: 'https://www.igentx.com/products/daycaremate',
    robots_index: true,
    robots_follow: true,
    og_type: 'website',
    twitter_card_type: 'summary_large_image',
    structured_data_type: 'SoftwareApplication',
  },
  {
    _uid: 'dm-hero-1',
    component: 'service_hero',
    title: 'DaycareMate — childcare management software built by IGENTX',
    subtitle:
      'One platform for admissions, attendance, daily care, parent communication, and billing — with dedicated portals for admins, teachers, and families.',
    badge_text: 'IGENTX Product',
    cta_text: 'Visit daycaremate.com',
    cta_link: { url: 'https://daycaremate.com', linktype: 'url' },
    secondary_cta_text: 'Talk to IGENTX',
    secondary_cta_link: { url: '/contact', linktype: 'url' },
  },
  {
    _uid: 'dm-detail-1',
    component: 'service_detail',
    sections: [
      {
        _uid: 'dm-s1',
        component: 'service_detail_section',
        title: 'Built for early childhood education centres',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  text: 'DaycareMate serves preschools, nurseries, daycares, childcare centres, early learning centres, Montessori schools, kindergartens, and playschools worldwide. Each centre gets a dedicated deployment — your database, your private storage, your CDN.',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
      {
        _uid: 'dm-s2',
        component: 'service_detail_section',
        title: 'Admissions & enrollment',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  text: 'Magic-link parent onboarding, configurable admission forms, and one-click approval that materializes student records and first invoices.',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
      {
        _uid: 'dm-s3',
        component: 'service_detail_section',
        title: 'AI enquiry assistant (optional)',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  text: 'Deployable 24/7 website chat for subscribing centres. Admins review conversations and manually convert qualified enquiries to pipeline leads — not auto-logged.',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
      {
        _uid: 'dm-s4',
        component: 'service_detail_section',
        title: 'Trusted by BloomWave Learning & Daycare',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  text: 'See how BloomWave uses DaycareMate alongside their website and AI enquiry assistant: ',
                  type: 'text',
                },
                {
                  text: 'BloomWave case study',
                  type: 'text',
                  marks: [{ type: 'link', attrs: { href: '/case-studies/bloomwave-learning-daycare', target: '_self' } }],
                },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    _uid: 'dm-faq-1',
    component: 'faq',
    title: 'Frequently asked questions',
    faqs: [
      {
        _uid: 'dm-faq-q1',
        component: 'faq_item',
        question: 'Is DaycareMate only for UAE centres?',
        answer:
          'No. DaycareMate is built for early childhood education providers worldwide. Currency, timezone, and tax/VAT are configurable per deployment.',
      },
      {
        _uid: 'dm-faq-q2',
        component: 'faq_item',
        question: 'Does the AI assistant auto-create leads?',
        answer:
          'No. The AI enquiry assistant captures conversations for admin review. Your team decides what enters the leads pipeline.',
      },
    ],
  },
]
writeJson(path.join(EN, 'products/daycaremate.json'), daycaremate)
console.log('✓ products/daycaremate')

// Bloomwave case study — based on moduluxe structure
const moduluxe = readJson(
  path.join(EN, 'case-studies/web-development-uae-startup-moduluxe-group.json')
)
const bloomwave = structuredClone(moduluxe)
bloomwave.slug = 'case-studies/bloomwave-learning-daycare'
bloomwave.name = 'BloomWave Learning & Daycare'

const bwDescription =
  'How BloomWave Learning & Daycare launched bloomwave.ae with an AI enquiry assistant and DaycareMate centre operations platform.'
const bwSeoTitle = 'BloomWave Case Study | Website, AI Agent & DaycareMate'

const bwSeo = bloomwave.content.body.find((b) => b.component === 'seo')
if (bwSeo) {
  Object.assign(bwSeo, {
    title: bwSeoTitle,
    description: bwDescription,
    canonical_url: 'https://www.igentx.com/case-studies/bloomwave-learning-daycare',
    canonical_utl: 'https://www.igentx.com/case-studies/bloomwave-learning-daycare',
    og_title: bwSeoTitle,
    og_description: bwDescription,
    twitter_title: bwSeoTitle,
    twitter_description: bwDescription,
    keywords:
      'childcare case study, Storyblok, AI customer service agent, DaycareMate, bloomwave.ae, early learning centre UAE',
    structured_data_type: 'Article',
  })
}
const bwHero = bloomwave.content.body.find((b) => b.component === 'case_study_hero')
if (bwHero) {
  bwHero.title = 'BloomWave Learning & Daycare'
  bwHero.client_name = 'BloomWave'
  bwHero.category = 'Childcare · Web · AI · SaaS'
  bwHero.industry = 'Early Childhood Education'
  bwHero.summary =
    'A UAE early learning centre needed a professional web presence, 24/7 parent enquiries, and centre operations software — delivered as one integrated stack.'
  bwHero.featured_image = {
    filename: '/assets/logos/bloomwave.png',
    alt: 'BloomWave Learning & Daycare',
    fieldtype: 'asset',
  }
}
const bwDetail = bloomwave.content.body.find((b) => b.component === 'case_study_detail')
if (bwDetail) {
  bwDetail.category = 'Full Solution'
  bwDetail.challenge =
    'BloomWave needed a trustworthy marketing site, after-hours parent enquiry capture, and a single system for admissions and daily operations — without juggling spreadsheets and separate apps.'
  bwDetail.solution =
    'IGENTX delivered bloomwave.ae, deployed the IGENTX AI Customer Service Agent on the website, and implemented DaycareMate as the centre operations platform.'
  bwDetail.client_name = 'BloomWave Learning & Daycare'
  bwDetail.client_logo = {
    filename: '/assets/logos/bloomwave.png',
    alt: 'BloomWave Learning & Daycare',
    fieldtype: 'asset',
  }
  bwDetail.project_url = {
    url: 'https://bloomwave.ae',
    linktype: 'url',
    fieldtype: 'multilink',
    cached_url: 'https://bloomwave.ae',
  }
  bwDetail.project_images = []
  bwDetail.content = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        attrs: { textAlign: null },
        content: [
          {
            type: 'text',
            text: 'BloomWave Learning & Daycare, an early learning centre in Abu Dhabi, needed a trustworthy marketing presence that parents could explore at any time — plus a way to capture enquiries outside office hours without adding admin burden.',
          },
        ],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: null },
        content: [
          {
            type: 'text',
            text: 'IGENTX delivered bloomwave.ae on Next.js with Storyblok CMS for easy content updates, deployed the IGENTX AI Customer Service Agent for 24/7 parent enquiries, and implemented whitelabeled DaycareMate as the centre operations platform for admissions and daily care.',
          },
        ],
      },
    ],
  }
  bwDetail.results = [
    { _uid: 'bw-r1', metric: 'Website', value: 'bloomwave.ae', component: 'result_item' },
    { _uid: 'bw-r2', metric: 'AI Agent', value: '24/7 enquiries', component: 'result_item' },
    { _uid: 'bw-r3', metric: 'Platform', value: 'DaycareMate', component: 'result_item' },
  ]
  bwDetail.results_metrics = [
    {
      _uid: 'bw-m1',
      label: 'Website',
      value: 'bloomwave.ae',
      component: 'metric_item',
      description: 'Marketing site launched on Next.js with Storyblok CMS for flexible content management.',
    },
    {
      _uid: 'bw-m2',
      label: 'AI Agent',
      value: '24/7',
      component: 'metric_item',
      description: 'IGENTX AI Customer Service Agent handles parent enquiries around the clock.',
    },
    {
      _uid: 'bw-m3',
      label: 'Platform',
      value: 'DaycareMate',
      component: 'metric_item',
      description:
        'Whitelabeled centre operations platform for admissions, attendance, and family communication.',
    },
  ]
  bwDetail.technologies = ['Next.js', 'Storyblok', 'IGENTX AI Agent', 'DaycareMate', 'Tailwind CSS']
  bwDetail.testimonial_text = ''
  bwDetail.testimonial_author = ''
  bwDetail.testimonial_role = ''
}
writeJson(path.join(EN, 'case-studies/bloomwave-learning-daycare.json'), bloomwave)
console.log('✓ case-studies/bloomwave-learning-daycare')

// Update home.json — global hero positioning
const home = readJson(path.join(EN, 'home.json'))
const hero = home.content.body.find((b) => b.component === 'igentx_hero')
if (hero?.slides?.[0]) {
  hero.slides[0].title = 'AI Customer Service Agent for Your Website'
  hero.slides[0].summary =
    'A 24/7 AI support agent trained on your content. One line of code, multilingual, lightweight — built by IGENTX.'
}
if (hero?.slides?.[1]) {
  hero.slides[1].title = 'Web Development & Digital Products'
  hero.slides[1].summary =
    'We build high-performance websites and software for growing businesses worldwide — with UAE as our first market.'
  hero.slides[1].badge_text = 'Global delivery · UAE expertise'
  if (hero.slides[1].cta_link) {
    hero.slides[1].cta_link.cached_url = 'services/web-development'
  }
}
const homeSeo = home.content.body.find((b) => b.component === 'seo')
if (homeSeo) {
  Object.assign(homeSeo, {
    title: 'AI Web Development & Digital Products | IGENTX',
    description:
      'IGENTX builds fast websites, AI customer agents, and vertical SaaS. Global delivery with deep UAE market expertise.',
    keywords: 'AI web development company, custom web development, AI customer service agent, igentx',
    canonical_url: 'https://www.igentx.com/',
  })
}
// Remove Storyblok from pricing if present
const pricing = home.content.body.find((b) => b.component === 'igentx_pricing')
if (pricing?.packages) {
  for (const pkg of pricing.packages) {
    if (pkg.features) {
      pkg.features = pkg.features.map((f) =>
        typeof f === 'string' ? f.replace(/Storyblok CMS[^,]*/gi, 'Content management setup') : f
      )
    }
    if (pkg.includes_cms !== undefined) pkg.includes_cms = false
  }
  pricing.description = pricing.description?.replace(/Storyblok/gi, 'CMS') || pricing.description
}
const portfolio = home.content.body.find((b) => b.component === 'igentx_portfolio')
if (portfolio) {
  portfolio.title = 'Proven results across web, AI, and product'
  portfolio.description =
    "See how we've helped businesses launch websites, AI customer agents, and vertical SaaS — with integrated delivery from one team."
  const bloomwaveCard = {
    _uid: 'a8f2c91e-4b3d-4e17-9c6a-1d7e5f0b2a84',
    image: {
      id: null,
      alt: 'BloomWave Learning & Daycare website with AI enquiry assistant',
      name: '',
      focus: '',
      title: 'BloomWave Learning & Daycare',
      source: 'bloomwave.ae',
      filename: '/assets/images/bloomwave-homepage.jpg',
      copyright: 'IGENTX',
      fieldtype: 'asset',
      meta_data: {
        alt: 'BloomWave Learning & Daycare website with AI enquiry assistant',
        title: 'BloomWave Learning & Daycare',
        source: 'bloomwave.ae',
        copyright: 'IGENTX',
      },
      is_external_url: false,
    },
    title: 'BloomWave — Website, AI Agent & DaycareMate',
    results: [
      {
        _uid: 'e4a1b2c3-d5e6-4f78-9a0b-1c2d3e4f5a6b',
        value: 'bloomwave.ae',
        metric: 'Website',
        component: 'result_metric',
      },
      {
        _uid: 'f5b2c3d4-e6f7-4a89-0b1c-2d3e4f5a6b7c',
        value: '24/7 enquiries',
        metric: 'AI Agent',
        component: 'result_metric',
      },
      {
        _uid: 'a6c3d4e5-f7a8-4b90-1c2d-3e4f5a6b7c8d',
        value: 'DaycareMate',
        metric: 'Platform',
        component: 'result_metric',
      },
      {
        _uid: 'b7d4e5f6-a8b9-4c01-2d3e-4f5a6b7c8d9e',
        value: 'Storyblok',
        metric: 'CMS',
        component: 'result_metric',
      },
    ],
    category: 'Full Solution',
    live_url: 'https://bloomwave.ae',
    component: 'case_study_item',
    description:
      'How IGENTX helped BloomWave Learning & Daycare launch bloomwave.ae with a 24/7 AI enquiry assistant and DaycareMate centre operations platform.',
    technologies: 'Next.js\nStoryblok\nIGENTX AI Agent\nDaycareMate',
    case_study_url: '/case-studies/bloomwave-learning-daycare',
  }
  if (!portfolio.case_studies) portfolio.case_studies = []
  const hasBloomwave = portfolio.case_studies.some(
    (c) => c.case_study_url === '/case-studies/bloomwave-learning-daycare'
  )
  if (!hasBloomwave) {
    portfolio.case_studies.unshift(bloomwaveCard)
  }
}
writeJson(path.join(EN, 'home.json'), home)
console.log('✓ home.json updated')

// Update header navigation — Products dropdown
const header = readJson(path.join(EN, 'global/header.json'))
const nav = header.content.global?.[0]?.navigation_items
if (nav) {
  const aiNav = nav.find((n) => n.label === 'AI Agent')
  if (aiNav) {
    aiNav.label = 'Products'
    aiNav.link = { url: '/products', linktype: 'url', cached_url: 'products' }
    aiNav.children = [
      {
        _uid: 'nav-ai-agent',
        label: 'AI Customer Service Agent',
        component: 'navigation_items',
        children: [],
        link: {
          url: '',
          linktype: 'story',
          cached_url: 'products/ai-customer-service-agent',
        },
      },
      {
        _uid: 'nav-daycaremate',
        label: 'DaycareMate',
        component: 'navigation_items',
        children: [],
        link: { url: '/products/daycaremate', linktype: 'url', cached_url: 'products/daycaremate' },
      },
    ]
  }
  const servicesNav = nav.find((n) => n.label === 'Services')
  if (servicesNav?.children?.[0]) {
    servicesNav.children.unshift({
      _uid: 'nav-svc-global',
      label: 'Web Development (Global)',
      component: 'navigation_items',
      children: [],
      link: { url: '/services/web-development', linktype: 'url', cached_url: 'services/web-development' },
    })
  }
  nav.push({
    _uid: 'nav-uae',
    label: 'UAE',
    component: 'navigation_items',
    children: [],
    link: { url: '/uae', linktype: 'url', cached_url: 'uae' },
  })
}
const globalSeo = header.content.global?.[0]?.global_seo?.[0]
if (globalSeo) {
  globalSeo.title = 'AI Web Development & Digital Products | IGENTX'
  globalSeo.description =
    'IGENTX builds high-performance websites, AI customer agents, and childcare management software for businesses worldwide.'
}
writeJson(path.join(EN, 'global/header.json'), header)
console.log('✓ header navigation updated')

// Update manifest with new routes
const manifest = readJson(path.join(ROOT, 'content', 'manifest.json'))
const newRoutes = [
  { slug: 'uae', path: '/uae', priority: 0.88, changeFrequency: 'monthly' },
  { slug: 'services/web-development', path: '/services/web-development', priority: 0.85, changeFrequency: 'monthly' },
  { slug: 'services/ecommerce-development', path: '/services/ecommerce-development', priority: 0.85, changeFrequency: 'monthly' },
  { slug: 'services/branding-graphic-design', path: '/services/branding-graphic-design', priority: 0.85, changeFrequency: 'monthly' },
  { slug: 'services/seo', path: '/services/seo', priority: 0.85, changeFrequency: 'monthly' },
  { slug: 'products-landing-page', path: '/products', priority: 0.9, changeFrequency: 'monthly' },
  { slug: 'products/daycaremate', path: '/products/daycaremate', priority: 0.9, changeFrequency: 'monthly' },
  {
    slug: 'case-studies/bloomwave-learning-daycare',
    path: '/case-studies/bloomwave-learning-daycare',
    priority: 0.82,
    changeFrequency: 'monthly',
  },
]
for (const route of newRoutes) {
  if (!manifest.routes.some((r) => r.path === route.path)) {
    manifest.routes.push({ ...route, lastModified: new Date().toISOString() })
  }
}
// Update moduluxe/dr-door paths in manifest
for (const r of manifest.routes) {
  if (r.path === '/case-studies/web-development-uae-startup-moduluxe-group') {
    r.path = '/case-studies/moduluxe-group'
  }
  if (r.path === '/case-studies/web-development-startup-dr-door') {
    r.path = '/case-studies/dr-door'
  }
}
writeJson(path.join(ROOT, 'content', 'manifest.json'), manifest)
console.log('✓ manifest updated')

console.log('\n✅ Content seed complete')
