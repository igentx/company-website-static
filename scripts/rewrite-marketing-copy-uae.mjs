#!/usr/bin/env node
/** UAE-specific copy pass */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const contentDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'content/en')

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}
function writeJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n')
}
function walk(obj, fn) {
  if (obj === null || typeof obj !== 'object') return
  fn(obj)
  if (Array.isArray(obj)) obj.forEach((i) => walk(i, fn))
  else Object.values(obj).forEach((v) => walk(v, fn))
}

const uaeServices = {
  'services/web-development-uae.json': {
    seo: {
      title: 'Web Development in UAE | AI-Powered, Fast & Multilingual | IGENTX',
      twitter_title: 'Web Development in UAE | IGENTX',
      description:
        'AI-driven web development in the UAE with Next.js. Multilingual, SEO-optimized websites for Dubai, Abu Dhabi, and the Emirates.',
      keywords:
        'web development UAE, AI web development Dubai, multilingual websites UAE, Next.js developers UAE, website design Dubai',
    },
    hero: {
      summary:
        'AI-powered, SEO-optimized websites for UAE businesses — bilingual Arabic/English, fast on Vercel, built to rank and convert.',
      category: 'Web Development in UAE',
    },
    serviceType: 'Web Development in UAE',
  },
  'services/ecommerce-website-development-uae.json': {
    seo: {
      title: 'Ecommerce Development in UAE | Headless & Platform Stores | IGENTX',
      twitter_title: 'Ecommerce Development UAE | IGENTX',
      description:
        'Ecommerce development for UAE retailers — local payment gateways, Arabic/English storefronts, Shopify, WooCommerce, or custom Next.js.',
      keywords:
        'ecommerce development UAE, online store Dubai, Shopify UAE, headless ecommerce Dubai, payment gateway UAE',
    },
    hero: {
      summary:
        'Ecommerce for UAE retailers — Tabby, Telr, Stripe, bilingual checkout, and headless architecture built to sell.',
      category: 'Ecommerce Development in UAE',
    },
    serviceType: 'Ecommerce Website Development in UAE',
  },
  'services/graphic-design-uae.json': {
    seo: {
      title: 'Branding & Graphic Design in UAE | IGENTX',
      twitter_title: 'Branding & Graphic Design UAE | IGENTX',
      description:
        'Branding and graphic design for UAE businesses — logo, identity systems, bilingual brand assets, and marketing creative.',
      keywords:
        'branding UAE, graphic design Dubai, logo design UAE, brand identity Dubai, creative agency UAE',
    },
    hero: {
      summary:
        'Strategic branding for UAE businesses — bilingual Arabic/English assets, guidelines, and creative that builds trust locally.',
      category: 'Branding & Graphic Design in UAE',
    },
    serviceType: 'Branding & Graphic Design in UAE',
  },
  'services/seo-service-uae.json': {
    seo: {
      title: 'SEO Services in UAE | Local & Technical SEO | IGENTX',
      twitter_title: 'SEO Services UAE | IGENTX',
      description:
        'SEO for UAE businesses — Google Maps local SEO, technical audits, Arabic/English content strategy, and monthly reporting.',
      keywords:
        'SEO services UAE, local SEO Dubai, SEO agency UAE, Google Maps SEO Dubai, Arabic SEO',
    },
    hero: {
      summary:
        'AI-driven SEO for UAE markets — local search, technical optimisation, and content that ranks in Dubai and beyond.',
      category: 'SEO Services in UAE',
    },
    serviceType: 'Search Engine Optimisation in UAE',
  },
}

for (const [rel, cfg] of Object.entries(uaeServices)) {
  const data = readJson(path.join(contentDir, rel))
  walk(data, (node) => {
    if (node.component === 'seo') Object.assign(node, cfg.seo)
    if (node.component === 'service_hero') {
      Object.assign(node, cfg.hero)
      node.cta_link = {
        id: '',
        url: '/contact',
        linktype: 'url',
        fieldtype: 'multilink',
        cached_url: 'contact',
      }
      node.cta_text = 'Contact sales'
      node.pricing_preview = ''
    }
    if (node.component === 'igentx_pricing') {
      node.description =
        'Tell us your UAE project goals — bilingual needs, integrations, and launch timeline. We provide a tailored proposal.'
    }
  })
  const seo = data.content.body.find((b) => b.component === 'seo')
  if (seo?.structured_data_custom) {
    try {
      const sd = JSON.parse(seo.structured_data_custom)
      sd.serviceType = cfg.serviceType
      sd.areaServed = { '@type': 'Country', name: 'United Arab Emirates' }
      delete sd.price
      delete sd.priceCurrency
      if (sd.offers) {
        delete sd.offers.price
        delete sd.offers.priceCurrency
      }
      seo.structured_data_custom = JSON.stringify(sd, null, 2)
    } catch {
      /* ignore */
    }
  }
  writeJson(path.join(contentDir, rel), data)
  console.log('UAE service:', rel)
}

// uae.json landing
const uae = readJson(path.join(contentDir, 'uae.json'))
walk(uae, (node) => {
  if (node.component === 'seo') {
    node.title = 'Digital Agency Dubai & UAE | IGENTX'
    node.description =
      'Web development, ecommerce, branding, SEO, and AI products for UAE businesses. Bilingual sites, local SEO, and regional expertise.'
    node.keywords = 'digital agency Dubai, web development UAE, AI agency Dubai, ecommerce Dubai, branding UAE'
    node.twitter_title = 'IGENTX UAE | Web, Ecommerce, Branding & SEO'
    node.twitter_description =
      'AI-accelerated digital studio with deep UAE expertise — bilingual delivery, local payments, and regional case studies.'
  }
  if (node.pricing_preview) node.pricing_preview = ''
  if (node.component === 'service_card') {
    node.excerpt = (node.excerpt || '').replace(/AED[^.]*\./g, '')
  }
})
const uaeSeo = uae.content.body.find((b) => b.component === 'seo')
if (uaeSeo?.structured_data_custom) {
  try {
    const sd = JSON.parse(uaeSeo.structured_data_custom.replace(/\\n/g, '\n').replace(/\\"/g, '"'))
    sd.areaServed = { '@type': 'Country', name: 'United Arab Emirates' }
    uaeSeo.structured_data_custom = JSON.stringify(sd, null, 2)
  } catch {
    /* keep */
  }
}
writeJson(path.join(contentDir, 'uae.json'), uae)
console.log('uae.json')
