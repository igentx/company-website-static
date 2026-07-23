#!/usr/bin/env node
/**
 * Mechanical transforms for IGENXT marketing copy rewrite.
 * Copy/voice changes are applied separately; this handles pricing removal,
 * CTA links, and structured data cleanup.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contentDir = path.join(__dirname, '../content/en')

const GLOBAL_SERVICE_SLUGS = {
  'services/web-development-uae': 'services/web-development',
  'services/ecommerce-website-development-uae': 'services/ecommerce-development',
  'services/graphic-design-uae': 'services/branding-graphic-design',
  'services/seo-service-uae': 'services/seo',
}

const GLOBAL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Digital Agency Services',
  provider: {
    '@type': 'Organization',
    name: 'IGENTX',
    url: 'https://www.igentx.com',
    logo: 'https://igentx.com/assets/images/logo.png',
  },
  areaServed: { '@type': 'Place', name: 'Worldwide' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'IGENTX Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Web Development',
          description: 'Performance-first websites and web applications.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Ecommerce Development',
          description: 'Headless and platform ecommerce with secure checkout.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Branding & Graphic Design',
          description: 'Logo, identity systems, and marketing creative.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Search Engine Optimisation',
          description: 'Technical SEO, content strategy, and measurable growth.',
        },
      },
    ],
  },
}

function walk(obj, fn) {
  if (obj === null || typeof obj !== 'object') return
  fn(obj)
  if (Array.isArray(obj)) {
    for (const item of obj) walk(item, fn)
  } else {
    for (const key of Object.keys(obj)) walk(obj[key], fn)
  }
}

function clearPricingFields(obj) {
  walk(obj, (node) => {
    if (typeof node !== 'object' || node === null) return
    if ('pricing_preview' in node && typeof node.pricing_preview === 'string' && node.pricing_preview) {
      node.pricing_preview = ''
    }
    if ('price_range' in node && typeof node.price_range === 'string' && node.price_range) {
      node.price_range = ''
    }
  })
}

function transformPricingBlock(block) {
  if (block.component !== 'igentx_pricing') return
  block.packages = []
  block.badge_text = ''
  block.title = block.title?.includes('quote') ? block.title : 'Get a tailored quote'
  block.description =
    block.description && !block.description.includes('AED')
      ? block.description.replace(/Transparent[^.]*\./i, '').trim() ||
        'Tell us your goals — we scope deliverables, integrations, and timelines with you.'
      : 'Tell us your goals — we scope deliverables, integrations, and timelines with you.'
  block.show_custom_quote = true
  block.show_pricing_toggle = false
  block.custom_quote_title = 'Talk to our team'
  block.custom_quote_description =
    'Every project is scoped to your requirements. Contact sales for a tailored proposal.'
  block.custom_quote_cta = 'Contact sales'
  block.custom_quote_cta_link = {
    id: '',
    url: '/contact',
    linktype: 'url',
    fieldtype: 'multilink',
    cached_url: 'contact',
  }
  block.whatsapp_number = ''
  block.toggle_option1 = ''
  block.toggle_option2 = ''
  block.value_props_title = block.value_props_title || ''
  block.value_props_description = block.value_props_description || ''
}

function cleanStructuredDataString(str, isUae) {
  if (!str || typeof str !== 'string') return str
  try {
    const unescaped = str.replace(/\\n/g, '\n').replace(/\\"/g, '"')
    const data = JSON.parse(unescaped)
    delete data.price
    delete data.priceCurrency
    if (data.offers && typeof data.offers === 'object') {
      delete data.offers.price
      delete data.offers.priceCurrency
      if (Object.keys(data.offers).length <= 1 && data.offers['@type'] === 'Offer') {
        delete data.offers
      }
    }
    if (data.hasOfferCatalog?.itemListElement) {
      for (const item of data.hasOfferCatalog.itemListElement) {
        if (item['@type'] === 'Offer') {
          delete item.price
          delete item.priceCurrency
          delete item.priceSpecification
        }
      }
    }
    if (!isUae && data.areaServed) {
      data.areaServed = { '@type': 'Place', name: 'Worldwide' }
    }
    if (!isUae && data.serviceType?.includes('UAE')) {
      data.serviceType = data.serviceType.replace(/ in UAE/gi, '').replace(/UAE/gi, '').trim()
    }
    return JSON.stringify(data, null, 2)
  } catch {
    return str
      .replace(/"priceCurrency"\s*:\s*"[^"]*"\s*,?/g, '')
      .replace(/"price"\s*:\s*"[^"]*"\s*,?/g, '')
      .replace(/"price"\s*:\s*\d+\s*,?/g, '')
  }
}

function fixCtaText(str) {
  if (typeof str !== 'string') return str
  return str
    .replace(/Explore our packages/gi, 'Get a quote')
    .replace(/Explore Web Packages/gi, 'Learn more')
    .replace(/Explore Branding Packages/gi, 'Learn more')
    .replace(/Explore Packages/gi, 'Get a quote')
    .replace(/View packages/gi, 'Contact sales')
    .replace(/Get Started/gi, 'Contact sales')
    .replace(/Book a Free Consultation/gi, 'Contact sales')
    .replace(/Start Your Project/gi, 'Contact sales')
}

function processFile(filePath, options = {}) {
  const { isUae = false, useGlobalLinks = false } = options
  const rel = path.relative(contentDir, filePath)
  let data
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (e) {
    console.warn('Skip (parse error):', rel, e.message)
    return
  }

  clearPricingFields(data)

  walk(data, (node) => {
    if (typeof node !== 'object' || node === null) return

    if (node.component === 'igentx_pricing') transformPricingBlock(node)

    if (typeof node.structured_data_custom === 'string') {
      node.structured_data_custom = cleanStructuredDataString(node.structured_data_custom, isUae)
    }

    for (const key of ['cta_text', 'primary_cta_text', 'secondary_cta_text', 'cta_title']) {
      if (typeof node[key] === 'string') node[key] = fixCtaText(node[key])
    }

    if (useGlobalLinks && node.cached_url && GLOBAL_SERVICE_SLUGS[node.cached_url]) {
      node.cached_url = GLOBAL_SERVICE_SLUGS[node.cached_url]
    }
    if (useGlobalLinks && typeof node.url === 'string' && GLOBAL_SERVICE_SLUGS[node.url]) {
      node.url = GLOBAL_SERVICE_SLUGS[node.url]
    }
  })

  // Global landing pages: replace structured data entirely
  if (rel === 'services-landing-page.json') {
    const seo = data.content?.body?.find((b) => b.component === 'seo')
    if (seo) seo.structured_data_custom = JSON.stringify(GLOBAL_SCHEMA, null, 2)
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
  console.log('Processed:', rel)
}

function allJsonFiles(dir) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) results.push(...allJsonFiles(full))
    else if (entry.name.endsWith('.json')) results.push(full)
  }
  return results
}

const uaePattern = /-uae\.json$|\/uae\.json$|\/blog\//

for (const file of allJsonFiles(contentDir)) {
  const rel = path.relative(contentDir, file)
  const isUae = uaePattern.test('/' + rel) || rel === 'uae.json'
  const useGlobalLinks = !isUae && !rel.startsWith('blog/') && !rel.startsWith('case-studies/')
  processFile(file, { isUae, useGlobalLinks })
}

console.log('Done.')
