#!/usr/bin/env node
/** Copy and cleanup passes after mechanical rewrite-marketing-copy.mjs */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = path.join(root, 'content/en')

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

function stripPricingText(s) {
  if (typeof s !== 'string') return s
  return s
    .replace(/AED\s*[\d,]+(\s*\/\s*Month)?/gi, '')
    .replace(/starting from AED[\d,\s]+/gi, '')
    .replace(/starting at AED[\d,\s]+/gi, '')
    .replace(/Our Startup Web Package \(AED[^)]+\)/gi, 'A typical web project')
    .replace(/Startup Web Package/gi, 'web project')
    .replace(/Business Package/gi, 'scaled web project')
    .replace(/Enterprise Package/gi, 'enterprise web project')
    .replace(/Startup Store/gi, 'ecommerce project')
    .replace(/Business Store/gi, 'scaled ecommerce project')
    .replace(/transparent quote/gi, 'tailored proposal')
    .replace(/transparent pricing/gi, 'tailored proposals')
    .replace(/all packages include/gi, 'projects can include')
    .replace(/right package/gi, 'right scope')
    .replace(/suggest the right package/gi, 'recommend the right scope')
    .replace(/Packages start at[^.]+./gi, 'Contact sales for a tailored proposal.')
    .replace(/pricing depends on[^.]+./gi, 'Scope depends on complexity, integrations, and languages. Contact sales for a quote.')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function globalServiceCopy(filePath, config) {
  const data = readJson(filePath)
  walk(data, (node) => {
    if (typeof node !== 'object' || !node) return
    if (node.component === 'seo' && node.title && config.seo) {
      Object.assign(node, config.seo)
    }
    if (node.component === 'service_hero' && config.hero) {
      Object.assign(node, config.hero)
      node.pricing_preview = ''
      node.cta_link = {
        id: '',
        url: '/contact',
        linktype: 'url',
        fieldtype: 'multilink',
        cached_url: 'contact',
      }
      node.cta_text = node.cta_text || 'Contact sales'
    }
    if (node.component === 'igentx_pricing') {
      node.description = config.pricingDescription || node.description
      node.value_props_title = ''
      node.value_props_description = ''
      if (node.description?.includes('package') || node.description?.includes('UAE market')) {
        node.description =
          config.pricingDescription ||
          'Tell us your goals — we scope deliverables, integrations, and timelines with you.'
      }
    }
    if (node.component === 'faq_item') {
      if (node.answer) node.answer = stripPricingText(node.answer)
      if (node.question) {
        node.question = node.question
          .replace(/packages/gi, 'projects')
          .replace(/How much does/i, 'How do I get a quote for')
          .replace(/cost in the UAE/i, '')
      }
      if (/AED|package.*\d|starting at|\/month/i.test(node.answer || '')) {
        node.answer =
          'Scope depends on your requirements. Contact sales via our contact form for a tailored proposal.'
      }
    }
    for (const k of ['answer', 'summary', 'description', 'twitter_description', 'og_description']) {
      if (typeof node[k] === 'string') node[k] = stripPricingText(node[k])
    }
  })
  if (config.structuredData) {
    const seo = data.content.body.find((b) => b.component === 'seo')
    if (seo) seo.structured_data_custom = JSON.stringify(config.structuredData, null, 2)
  }
  writeJson(filePath, data)
}

const globalServices = {
  'services/web-development.json': {
    seo: {
      title: 'Custom Web Development Company | IGENTX',
      og_title: 'Custom Web Development Company | IGENTX',
      twitter_title: 'Custom Web Development | IGENTX',
      description:
        'Performance-first websites with Next.js and modern stacks. Global delivery from an AI-accelerated studio.',
      twitter_description:
        'AI-accelerated web development for speed, SEO, and scale — serving businesses worldwide.',
      article_tags:
        'web development, Next.js agency, headless CMS, SEO websites, multilingual websites',
      keywords:
        'custom web development company, Next.js development agency, headless CMS websites, AI web development',
    },
    hero: {
      summary:
        'AI-powered, SEO-optimized websites that scale faster, rank higher, and perform flawlessly — for businesses worldwide.',
      category: 'Web Development',
    },
    pricingDescription:
      'Tell us your goals — we scope pages, integrations, CMS, and launch timelines with you.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Custom Web Development',
      provider: {
        '@type': 'Organization',
        name: 'IGENTX',
        url: 'https://www.igentx.com',
        logo: 'https://igentx.com/assets/images/logo.png',
      },
      areaServed: { '@type': 'Place', name: 'Worldwide' },
      description:
        'AI-accelerated web development with Next.js, headless CMS, SEO, and multilingual support.',
    },
  },
  'services/ecommerce-development.json': {
    seo: {
      title: 'Ecommerce Development | Headless & Platform Stores | IGENTX',
      og_title: 'Ecommerce Development | IGENTX',
      twitter_title: 'Ecommerce Development | IGENTX',
      description:
        'Headless and platform ecommerce built for speed, conversion, and global payments. AI-accelerated delivery from IGENTX.',
      twitter_description:
        'Ecommerce storefronts that load fast and convert — Shopify, WooCommerce, BigCommerce, or custom Next.js.',
      article_tags: 'ecommerce development, headless commerce, Shopify, WooCommerce, online store',
      keywords:
        'ecommerce development agency, headless ecommerce, Shopify development, online store development',
    },
    hero: {
      summary:
        'Headless and platform ecommerce for retailers worldwide — fast storefronts, secure checkout, and integrations that scale.',
      category: 'Ecommerce Development',
    },
    pricingDescription:
      'We scope your catalog size, platform, payment gateways, and integrations — then provide a tailored proposal.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Ecommerce Website Development',
      provider: {
        '@type': 'Organization',
        name: 'IGENTX',
        url: 'https://www.igentx.com',
        logo: 'https://igentx.com/assets/images/logo.png',
      },
      areaServed: { '@type': 'Place', name: 'Worldwide' },
      description: 'Ecommerce development for Shopify, WooCommerce, BigCommerce, and custom storefronts.',
    },
  },
  'services/branding-graphic-design.json': {
    seo: {
      title: 'Branding & Graphic Design | IGENTX',
      og_title: 'Branding & Graphic Design | IGENTX',
      twitter_title: 'Branding & Graphic Design | IGENTX',
      description:
        'Strategic branding and graphic design for global businesses — logo, identity systems, and marketing creative.',
      twitter_description:
        'Brand identity and design that works across digital and print — delivered worldwide from IGENTX.',
      article_tags: 'branding, graphic design, logo design, brand identity',
      keywords: 'branding agency, graphic design, logo design, brand identity',
    },
    hero: {
      summary:
        'Strategic branding and creative design that build trust and visual consistency across every touchpoint.',
      category: 'Branding & Graphic Design',
    },
    pricingDescription:
      'Share your brand goals — we scope identity deliverables, revisions, and timelines with you.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Branding & Graphic Design',
      provider: {
        '@type': 'Organization',
        name: 'IGENTX',
        url: 'https://www.igentx.com',
        logo: 'https://igentx.com/assets/images/logo.png',
      },
      areaServed: { '@type': 'Place', name: 'Worldwide' },
      description: 'Logo design, brand guidelines, and marketing creative for global businesses.',
    },
  },
  'services/seo.json': {
    seo: {
      title: 'SEO Services | Technical & Content SEO | IGENTX',
      og_title: 'SEO Services | IGENTX',
      twitter_title: 'SEO Services | IGENTX',
      description:
        'AI-driven SEO for measurable organic growth — technical audits, content strategy, and performance reporting.',
      twitter_description:
        'SEO that improves rankings and traffic — on-page, technical, and content strategy from IGENTX.',
      article_tags: 'SEO services, technical SEO, content SEO, search optimisation',
      keywords: 'SEO agency, technical SEO, content strategy, search engine optimisation',
    },
    hero: {
      summary:
        'AI-driven SEO strategies for measurable growth — technical optimisation, content, and reporting for global markets.',
      category: 'Search Engine Optimisation',
    },
    pricingDescription:
      'SEO engagements are scoped to your site, markets, and goals. Contact sales for a tailored plan.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Search Engine Optimisation',
      provider: {
        '@type': 'Organization',
        name: 'IGENTX',
        url: 'https://www.igentx.com',
        logo: 'https://igentx.com/assets/images/logo.png',
      },
      areaServed: { '@type': 'Place', name: 'Worldwide' },
      description: 'Technical SEO, content strategy, and performance reporting.',
    },
  },
}

for (const [rel, cfg] of Object.entries(globalServices)) {
  globalServiceCopy(path.join(contentDir, rel), cfg)
  console.log('Global service:', rel)
}

// Global products
const aiProduct = readJson(path.join(contentDir, 'products/ai-customer-service-agent.json'))
walk(aiProduct, (node) => {
  if (node.component === 'seo') {
    node.title = 'AI Customer Service Agent | 24/7 Website Chatbot | IGENTX'
    node.og_title = 'AI Customer Service Agent | IGENTX'
    node.twitter_title = 'AI Customer Service Agent | IGENTX'
    node.description =
      '24/7 AI support agent trained on your content. One-line integration, multilingual, lightweight — deployable on any website worldwide.'
    node.twitter_description =
      'Add intelligent 24/7 customer support to your website with IGENTX AI Agent — RAG-trained, multilingual, under 7KB.'
    node.keywords =
      'AI customer service agent, website chatbot, AI support widget, RAG chatbot, multilingual chatbot'
    node.structured_data_custom = JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'AI Customer Service Agent',
        brand: 'IGENTX',
        description:
          'AI-powered customer service agent for websites with 24/7 responses and one-line integration.',
        applicationCategory: 'AI Chatbot, Customer Support Software',
      },
      null,
      2
    )
  }
  if (node.component === 'service_hero') {
    node.title = 'AI Customer Service Agent for Your Website'
    node.summary =
      'Intelligent 24/7 support trained on your content — one line of code, multilingual, deployable globally.'
    node.cta_text = 'Contact sales'
    node.cta_link = {
      url: '/contact',
      linktype: 'url',
      cached_url: 'contact',
      fieldtype: 'multilink',
      id: '',
    }
    node.pricing_preview = ''
  }
  if (node.component === 'faq_item' && node.answer) {
    node.answer = stripPricingText(node.answer)
    if (/pricing/i.test(node.question) && !/contact/i.test(node.answer)) {
      node.answer = 'Contact sales for deployment options and a tailored proposal.'
    }
  }
})
writeJson(path.join(contentDir, 'products/ai-customer-service-agent.json'), aiProduct)
console.log('Product: ai-customer-service-agent.json')

// Bulk text cleanup across all content JSON
for (const file of fs
  .readdirSync(contentDir, { recursive: true })
  .filter((f) => f.endsWith('.json'))
  .map((f) => path.join(contentDir, f))) {
  const data = readJson(file)
  let changed = false
  walk(data, (node) => {
    if (typeof node !== 'object' || !node) return
    for (const k of Object.keys(node)) {
      if (typeof node[k] === 'string' && /AED|starting at|\/month|priceCurrency/i.test(node[k])) {
        if (k === 'pricing_preview') node[k] = ''
        else if (k === 'structured_data_custom') {
          /* handled elsewhere */
        } else node[k] = stripPricingText(node[k])
        changed = true
      }
    }
    if (node.component === 'faq_item' && node.answer && /AED/i.test(node.answer)) {
      node.answer =
        'Contact sales for a tailored proposal based on your requirements.'
      changed = true
    }
  })
  if (changed) {
    writeJson(file, data)
    console.log('Cleaned:', path.relative(contentDir, file))
  }
}

console.log('Copy pass complete.')
