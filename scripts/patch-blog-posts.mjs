#!/usr/bin/env node
/**
 * One-time patch script for blog post SEO/UX redesign.
 * Run: node scripts/patch-blog-posts.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const blogDir = path.join(__dirname, '../content/en/blog')

const ctaBand = {
  _uid: 'blog-post-cta-001',
  component: 'igentx_cta_band',
  title: 'Ready to turn these insights into results?',
  description:
    'Book a free consultation with IGENTX. We help businesses in the UAE and worldwide build high-performance websites, AI solutions and growth strategies.',
  primary_cta_text: 'Book a Free Consultation',
  primary_cta_link: { url: '/contact', linktype: 'url', cached_url: 'contact' },
  secondary_cta_text: 'View Case Studies',
  secondary_cta_link: { url: '/case-studies', linktype: 'url', cached_url: 'case-studies' },
}

const authorBio =
  'The IGENTX Digital Team writes practical guides on web development, AI, SEO and digital growth. We combine hands-on delivery experience with outcome-first advice for businesses in the UAE and worldwide.'

const postConfig = {
  'ai-customer-service-agent-uae.json': {
    category: 'AI',
    canonical: 'https://www.igentx.com/blog/ai-customer-service-agent-uae',
    publishDate: '2025-11-30',
    readingTime: '3 min read',
    section: 'AI Customer Support',
    structuredDataType: 'BlogPosting',
    keyTakeaways: [
      'AI enquiry assistants can answer questions 24/7 in multiple languages.',
      'Lead capture works best when visitors can chat naturally and your team follows up manually.',
      'Deploying an AI agent on your website typically requires a single line of integration code.',
    ],
    faqs: [
      {
        question: 'What is an AI customer service agent for websites?',
        answer:
          'An AI customer service agent is a chat assistant trained on your business content. It answers visitor questions in real time, supports multiple languages and can guide users toward enquiry or contact actions.',
      },
      {
        question: 'Can the IGENTX AI agent capture leads automatically?',
        answer:
          'The agent helps capture enquiry intent through conversation. Your team converts qualified conversations into leads manually, which keeps you in control of follow-up and CRM accuracy.',
      },
      {
        question: 'Does the AI agent support Arabic and English?',
        answer:
          'Yes. The IGENTX AI Customer Service Agent supports multilingual conversations including Arabic and English, which is essential for UAE businesses serving diverse audiences.',
      },
    ],
  },
  'ai-in-web-development-uae.json': {
    category: 'AI',
    canonical: 'https://www.igentx.com/blog/ai-in-web-development-uae',
    publishDate: '2025-10-28',
    readingTime: '6 min read',
    section: 'Web Development & AI',
    structuredDataType: 'BlogPosting',
    keyTakeaways: [
      'AI accelerates content workflows, SEO research and personalisation in modern web projects.',
      'Performance and security fundamentals still matter: AI enhances delivery, it does not replace engineering discipline.',
      'UAE businesses benefit most when AI is applied to measurable outcomes like faster launches and better conversions.',
    ],
    faqs: [
      {
        question: 'How is AI changing web development in the UAE?',
        answer:
          'AI helps teams move faster on content, SEO analysis, prototyping and personalisation. Combined with modern frameworks like Next.js, businesses can launch high-performance sites with stronger conversion focus.',
      },
      {
        question: 'Will AI replace web developers?',
        answer:
          'No. AI is a productivity tool. Strategy, architecture, performance optimisation, security and brand experience still require skilled developers and designers.',
      },
      {
        question: 'What should UAE businesses prioritise when adopting AI for their website?',
        answer:
          'Start with clear outcomes: lead generation, support efficiency or content velocity. Choose tools that integrate with your stack and measure impact on enquiries, speed and SEO visibility.',
      },
    ],
  },
  'importance-of-website-uae.json': {
    category: 'Web Development',
    canonical: 'https://www.igentx.com/blog/importance-of-website-uae',
    publishDate: '2025-10-28',
    readingTime: '5 min read',
    section: 'Web Development',
    structuredDataType: 'BlogPosting',
    keyTakeaways: [
      'Your website is often the first trust signal customers see in the UAE market.',
      'Mobile performance, clear CTAs and local SEO directly affect lead volume.',
      'A modern site should support analytics, enquiry capture and future integrations.',
    ],
    faqs: [
      {
        question: 'Why is a website important for UAE businesses in 2025?',
        answer:
          'Customers research online before they buy. A fast, credible website builds trust, improves visibility in search and converts visitors into enquiries across Dubai, Abu Dhabi and other emirates.',
      },
      {
        question: 'What makes a UAE business website effective?',
        answer:
          'Effective sites load quickly on mobile, communicate value clearly, support Arabic and English where needed, and make it easy to contact you or request a quote.',
      },
      {
        question: 'How often should a business redesign its website?',
        answer:
          'Most businesses benefit from a major refresh every 2 to 4 years, with ongoing SEO and content updates in between. Redesign when performance, branding or conversion metrics fall behind competitors.',
      },
    ],
  },
  'how-to-choose-best-web-development-agency-uae.json': {
    category: 'Web Development',
    canonical: 'https://www.igentx.com/blog/how-to-choose-best-web-development-agency-uae',
    publishDate: '2025-10-28',
    readingTime: '4 min read',
    section: 'Web Development',
    structuredDataType: 'BlogPosting',
    keyTakeaways: [
      'Evaluate agencies on outcomes, not just design portfolios.',
      'Ask about tech stack, SEO process, post-launch support and measurable results.',
      'Transparent timelines and documented case studies are strong trust signals.',
    ],
    faqs: [
      {
        question: 'What should I look for in a UAE web development agency?',
        answer:
          'Look for proven case studies, modern technology (Next.js, React), SEO and performance expertise, clear communication and post-launch support. Avoid agencies that only sell templates without a growth strategy.',
      },
      {
        question: 'How much does web development cost in the UAE?',
        answer:
          'Costs vary by scope, integrations and content volume. Focus on total value: conversion potential, SEO foundation, speed and maintainability often matter more than the lowest upfront quote.',
      },
      {
        question: 'Should my agency offer SEO and AI capabilities?',
        answer:
          'Yes, if growth is a priority. SEO-ready builds and AI enquiry tools can significantly improve lead generation when implemented as part of a cohesive digital strategy.',
      },
    ],
  },
  'web-development-uae.json': {
    category: 'Web Development',
    canonical: 'https://www.igentx.com/blog/web-development-uae',
    publishDate: '2025-11-06',
    readingTime: '8 min read',
    section: 'Web Development',
    structuredDataType: 'BlogPosting',
    keyTakeaways: [
      'Plan your website around business goals: leads, credibility and operational efficiency.',
      'Performance, mobile UX and technical SEO should be built in from day one.',
      'Choose a stack that scales as your content, traffic and integrations grow.',
    ],
    faqs: [
      {
        question: 'What is involved in web development for UAE businesses?',
        answer:
          'A typical project includes discovery, UX design, development on a modern stack, SEO setup, testing and launch. Ongoing optimisation helps maintain speed, security and search visibility.',
      },
      {
        question: 'Which technologies work best for UAE business websites?',
        answer:
          'Next.js and React are popular for performance, SEO and flexibility. The right choice depends on your integrations, content workflow and long-term growth plans.',
      },
      {
        question: 'How long does it take to build a business website in the UAE?',
        answer:
          'Timelines depend on scope. A focused marketing site may launch in weeks, while larger platforms with custom features require more planning. Clear requirements and agile delivery reduce delays.',
      },
    ],
  },
}

function makeFaqBlock(slug, faqs) {
  return {
    _uid: `faq-${slug}`,
    component: 'faq',
    faq_title: 'Frequently Asked Questions',
    faq_description: 'Common questions about this topic.',
    initial_visible_count: 5,
    faqs: faqs.map((f, i) => ({
      _uid: `faq-item-${slug}-${i}`,
      component: 'faq_item',
      question: f.question,
      answer: f.answer,
      category: 'General',
    })),
  }
}

function breadcrumbJson(canonical, title) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.igentx.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.igentx.com/blog' },
      { '@type': 'ListItem', position: 3, name: title, item: canonical },
    ],
  })
}

for (const [filename, config] of Object.entries(postConfig)) {
  const filePath = path.join(blogDir, filename)
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const body = data.content.body

  const seo = body.find((b) => b.component === 'seo')
  const hero = body.find((b) => b.component === 'blog_hero')
  const detail = body.find((b) => b.component === 'blog_detail')

  if (seo) {
    seo.structured_data_type = config.structuredDataType
    seo.canonical_url = config.canonical
    seo.og_type = 'article'
    seo.article_published_time = `${config.publishDate} 00:00`
    seo.article_modified_time = seo.article_modified_time || `${config.publishDate} 00:00`
    seo.article_author = seo.article_author || 'IGENTX Digital Team'
    seo.article_section = config.section
    seo.publisher = seo.publisher || 'IGENTX'
    seo.structured_data_custom = breadcrumbJson(config.canonical, hero?.title || seo.title)
    if (seo.og_image?.filename) {
      seo.og_image.alt = seo.og_image.alt || hero?.title || seo.title
    }
    if (!seo.twitter_image?.filename && seo.og_image?.filename) {
      seo.twitter_image = { ...seo.og_image }
    }
  }

  if (hero) {
    hero.category = config.category
    hero.author_name = hero.author_name || 'IGENTX Digital Team'
    hero.publish_date = config.publishDate
    hero.reading_time = config.readingTime
    hero.back_link = { url: '/blog', linktype: 'url', cached_url: '/blog' }
    if (hero.featured_image?.filename) {
      hero.featured_image.alt = hero.featured_image.alt || hero.title
    }
  }

  if (detail) {
    detail.category = config.category
    detail.author_name = 'IGENTX Digital Team'
    detail.author_role = 'Digital Strategy & Engineering'
    detail.author_bio = authorBio
    detail.publish_date = config.publishDate
    detail.reading_time = config.readingTime
    detail.show_toc = true
    detail.key_takeaways = config.keyTakeaways
    if (!detail.cta_section_title) {
      detail.cta_section_title = 'Need help implementing this?'
      detail.cta_section_text =
        'Our team builds high-performance websites and AI solutions for businesses in the UAE and worldwide.'
      detail.cta_button_text = 'Book a Free Consultation'
      detail.cta_button_link = { url: '/contact', linktype: 'url', cached_url: '/contact' }
    }
  }

  const hasFaq = body.some((b) => b.component === 'faq')
  const hasCta = body.some((b) => b.component === 'igentx_cta_band')

  if (!hasFaq) {
    body.push(makeFaqBlock(filename.replace('.json', ''), config.faqs))
  }
  if (!hasCta) {
    body.push({ ...ctaBand, _uid: `cta-${filename.replace('.json', '')}` })
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
  console.log(`Patched ${filename}`)
}

console.log('Done.')
