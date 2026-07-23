#!/usr/bin/env node
/**
 * One-time generator for the 10 UAE blog posts in the expansion plan.
 * Run: node scripts/generate-blog-posts.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const BLOG_DIR = path.join(ROOT, 'content/en/blog')

const PUBLISH_DATE = '2026-07-23'

function seoBlock(post) {
  const url = `https://www.igentx.com/blog/${post.slug}`
  const structured = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        url,
        datePublished: `${PUBLISH_DATE}T00:00:00+00:00`,
        dateModified: `${PUBLISH_DATE}T00:00:00+00:00`,
        author: { '@type': 'Person', name: 'IGENTX Digital Team' },
        publisher: {
          '@type': 'Organization',
          name: 'IGENTX',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.igentx.com/assets/logos/igentx-logo-01.svg',
          },
        },
        image: `https://www.igentx.com${post.image}`,
        articleSection: post.category,
        keywords: post.keywords,
        inLanguage: 'en',
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.igentx.com/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.igentx.com/blog' },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  }
  return {
    _uid: `${post.slug}-seo`,
    component: 'seo',
    title: post.seoTitle,
    author: 'IGENTX Digital Team',
    og_type: 'article',
    keywords: post.keywords,
    og_image: {
      filename: post.image,
      alt: post.imageAlt,
      fieldtype: 'asset',
      is_external_url: false,
    },
    og_title: post.title,
    publisher: 'IGENTX',
    description: post.description,
    article_tags: post.keywords,
    robots_index: true,
    canonical_url: url,
    robots_follow: true,
    twitter_image: {
      filename: post.image,
      alt: post.imageAlt,
      fieldtype: 'asset',
      is_external_url: false,
    },
    twitter_title: post.title,
    article_author: 'IGENTX Digital Team',
    og_description: post.description,
    article_section: post.category,
    robots_noarchive: false,
    robots_nosnippet: false,
    twitter_card_type: 'summary_large_image',
    twitter_description: post.description,
    structured_data_type: 'BlogPosting',
    article_modified_time: `${PUBLISH_DATE} 00:00`,
    article_published_time: `${PUBLISH_DATE} 00:00`,
    structured_data_custom: JSON.stringify(structured),
  }
}

function blogCard(related, uid) {
  return {
    _uid: uid,
    component: 'blog_card',
    title: related.title,
    excerpt: related.excerpt,
    category: related.category,
    author_name: 'IGENTX Digital Team',
    publish_date: related.date || PUBLISH_DATE,
    reading_time: related.readingTime || '5 min read',
    link: {
      url: '',
      linktype: 'story',
      cached_url: `blog/${related.slug}`,
    },
    featured_image: {
      filename: related.image,
      alt: related.imageAlt || related.title,
      fieldtype: 'asset',
      is_external_url: false,
    },
  }
}

function buildPost(post) {
  const contentBlocks = []
  post.sections.forEach((section, i) => {
    contentBlocks.push({
      _uid: `${post.slug}-h-${i}`,
      component: 'blog_heading',
      level: section.level || 'h2',
      text: section.heading,
    })
    contentBlocks.push({
      _uid: `${post.slug}-b-${i}`,
      component: 'blog_body',
      content: section.body,
    })
    if (section.image) {
      contentBlocks.push({
        _uid: `${post.slug}-img-${i}`,
        component: 'blog_image',
        image: { filename: section.image, alt: section.imageAlt || '' },
        caption: section.caption || '',
        width: 'large',
        alignment: 'center',
      })
    }
    if (section.quote) {
      contentBlocks.push({
        _uid: `${post.slug}-q-${i}`,
        component: 'blog_quote',
        text: section.quote.text,
        author: section.quote.author,
        author_role: section.quote.role,
      })
    }
  })

  return {
    slug: `blog/${post.slug}`,
    name: post.slug,
    published_at: `${PUBLISH_DATE}T12:00:00.000Z`,
    content: {
      _uid: `${post.slug}-page`,
      component: 'page',
      body: [
        seoBlock(post),
        {
          _uid: `${post.slug}-hero`,
          component: 'blog_hero',
          title: post.title,
          excerpt: post.excerpt,
          category: post.category,
          author_name: 'IGENTX Digital Team',
          publish_date: PUBLISH_DATE,
          reading_time: post.readingTime,
          back_link: { url: '/blog', linktype: 'url', cached_url: '/blog' },
          featured_image: {
            filename: post.image,
            alt: post.imageAlt,
            fieldtype: 'asset',
            is_external_url: false,
          },
        },
        {
          _uid: `${post.slug}-detail`,
          component: 'blog_detail',
          category: post.category,
          author_name: 'IGENTX Digital Team',
          author_role: 'Digital Strategy & Engineering',
          author_bio:
            'The IGENTX Digital Team writes practical guides on web development, AI, SEO, vertical products and digital growth for businesses in the UAE and worldwide.',
          publish_date: PUBLISH_DATE,
          reading_time: post.readingTime,
          show_toc: true,
          key_takeaways: post.takeaways,
          tags: post.keywords,
          related_posts: post.related.map((r, i) => blogCard(r, `${post.slug}-rel-${i}`)),
          cta_section_title: post.ctaTitle,
          cta_section_text: post.ctaText,
          cta_button_text: post.ctaButton,
          cta_button_link: {
            url: post.ctaLink,
            linktype: 'url',
            cached_url: post.ctaLink.replace(/^\//, ''),
          },
          content_blocks: contentBlocks,
        },
        {
          _uid: `${post.slug}-faq`,
          component: 'faq',
          faq_title: 'Frequently Asked Questions',
          faq_description: post.faqDescription,
          initial_visible_count: 5,
          faqs: post.faqs.map((f, i) => ({
            _uid: `${post.slug}-faq-${i}`,
            component: 'faq_item',
            question: f.q,
            answer: f.a,
            category: f.category || 'General',
          })),
        },
        {
          _uid: `${post.slug}-cta`,
          component: 'igentx_cta_band',
          title: post.finalCtaTitle,
          description: post.finalCtaDescription,
          primary_cta_text: 'Book a Free Consultation',
          primary_cta_link: {
            url: '/contact',
            linktype: 'url',
            cached_url: 'contact',
          },
          secondary_cta_text: post.secondaryCtaText,
          secondary_cta_link: {
            url: post.secondaryCtaLink,
            linktype: 'url',
            cached_url: post.secondaryCtaLink.replace(/^\//, ''),
          },
        },
      ],
    },
  }
}

const POSTS = [
  {
    slug: 'local-seo-dubai-uae-guide',
    title: 'Local SEO in Dubai and the UAE: A Practical Guide for 2026',
    seoTitle: 'Local SEO Dubai & UAE Guide 2026 | IGENTX',
    description:
      'A practical local SEO guide for Dubai, Abu Dhabi and UAE businesses. Google Business Profile, bilingual pages, citations and measurable organic growth.',
    keywords:
      'local SEO Dubai, local SEO UAE, Google Business Profile Dubai, Arabic SEO UAE, SEO services Dubai',
    category: 'SEO',
    readingTime: '7 min read',
    image: '/assets/blog/seo-og.webp',
    imageAlt: 'Local SEO guide for Dubai and UAE businesses',
    excerpt:
      'Local search drives enquiries for UAE businesses every day. This guide covers Google Business Profile, bilingual landing pages, citations and the technical foundations that help you rank in Dubai, Abu Dhabi and across the Emirates.',
    takeaways: [
      'Local SEO in the UAE requires bilingual strategy, mobile-first performance and location-specific landing pages.',
      'Google Business Profile, citations and schema markup work together to improve map pack and organic visibility.',
      'Measure success by qualified enquiries and conversions, not rankings alone.',
    ],
    ctaTitle: 'Need local SEO support in the UAE?',
    ctaText: 'IGENXT helps businesses improve local search visibility with technical SEO, Arabic and English content and ongoing optimisation.',
    ctaButton: 'Explore SEO Services UAE',
    ctaLink: '/services/seo-service-uae',
    finalCtaTitle: 'Ready to grow local search visibility?',
    finalCtaDescription:
      'Book a free consultation to review your Google Business Profile, website and local SEO opportunities in Dubai and the UAE.',
    secondaryCtaText: 'View SEO Services',
    secondaryCtaLink: '/services/seo-service-uae',
    faqDescription: 'Common questions about local SEO for UAE businesses.',
    related: [
      {
        slug: 'technical-seo-checklist-uae',
        title: 'Technical SEO Checklist for UAE Websites',
        excerpt: 'Core Web Vitals, schema, hreflang and performance checks for UAE sites.',
        category: 'SEO',
        image: '/assets/blog/seo-banner.webp',
      },
      {
        slug: 'web-development-uae',
        title: 'Web Development in the UAE: A Practical Guide',
        excerpt: 'Planning and building high-performance websites for UAE businesses.',
        category: 'Web Development',
        date: '2025-11-06',
        image: '/assets/images/web-development-uae.webp',
      },
      {
        slug: 'moduluxe-group-seo-case-study',
        title: 'How Moduluxe Group Grew Organic Traffic by 312%',
        excerpt: 'Bilingual SEO and performance results for a UAE real estate brand.',
        category: 'Web Development',
        image: '/assets/images/moduluxegroup.webp',
      },
    ],
    sections: [
      {
        heading: 'Why local SEO matters in the UAE',
        body: '<p>When someone searches for a service in Dubai, Abu Dhabi, Sharjah or Ajman, Google often shows a map pack, local results and organic listings together. If your business is not visible in those places, competitors capture the enquiry.</p><p>Local SEO is not a one-time task. It combines your <strong>Google Business Profile</strong>, website structure, bilingual content, reviews and technical performance. UAE audiences search in both English and Arabic, often on mobile, so your local strategy must account for language, speed and trust signals.</p><p>IGENXT has helped UAE clients such as <a href="/case-studies/moduluxe-group">Moduluxe Group</a> achieve measurable organic growth through bilingual SEO and performance-first web builds. The same principles apply whether you run a professional services firm, ecommerce store or childcare centre.</p>',
      },
      {
        heading: 'Google Business Profile essentials',
        body: '<p>Your Google Business Profile (GBP) is often the first impression for local searchers. Complete every section: business name, category, service areas, hours, photos and posts. Use consistent NAP (name, address, phone) data across your website and directories.</p><ul><li><strong>Categories:</strong> Choose primary and secondary categories that match how customers search.</li><li><strong>Service areas:</strong> List Dubai, Abu Dhabi and other emirates you serve if you do not have a public storefront.</li><li><strong>Reviews:</strong> Respond professionally to reviews. Authentic feedback builds trust.</li><li><strong>Posts and updates:</strong> Share offers, events and news to keep the profile active.</li></ul><p>Link your GBP to location pages on your website. Each emirate or neighbourhood you target deserves a dedicated, useful page rather than duplicate thin content.</p>',
        image: '/assets/blog/seo-banner.webp',
        imageAlt: 'Technical and local SEO for UAE websites',
        caption: 'Local SEO combines Google Business Profile, on-site pages and technical performance.',
      },
      {
        heading: 'Bilingual and Arabic SEO',
        body: '<p>UAE local search is bilingual. Many users search in Arabic, many in English, and Google expects proper language signals. Build <strong>RTL-ready Arabic pages</strong> alongside English content, with correct <code>hreflang</code> tags and language switchers that preserve context.</p><p>Avoid machine-translated duplicate pages. Localised copy should reflect how customers in Dubai and Abu Dhabi actually describe your services. Arabic SEO also benefits from Arabic meta titles, headings and schema where appropriate.</p><p>Read our guide on <a href="/blog/bilingual-website-development-uae">bilingual website development in the UAE</a> for implementation details.</p>',
      },
      {
        heading: 'Citations, directories and local links',
        body: '<p>Consistent business listings on reputable UAE and industry directories reinforce your location signals. Audit existing listings for outdated addresses or phone numbers. Prioritise quality over quantity.</p><p>Local partnerships, chamber memberships and case studies on regional sites can earn relevant links. Content that answers UAE-specific questions, such as payment gateways or free zone setup, naturally attracts links over time.</p>',
      },
      {
        heading: 'Measure what drives enquiries',
        body: '<p>Track calls, form submissions and qualified leads from organic and local search. Use Google Search Console, analytics and call tracking where appropriate. Rankings are a leading indicator; <strong>enquiries and revenue</strong> are the outcomes that matter.</p><p>IGENXT provides <a href="/services/seo-service-uae">SEO services for Dubai and the UAE</a> with technical audits, local optimisation and ongoing reporting. <a href="/contact">Book a free consultation</a> to review your current visibility.</p>',
      },
    ],
    faqs: [
      {
        q: 'How long does local SEO take to show results in Dubai?',
        a: 'Timelines vary by competition and starting point. Technical fixes and GBP optimisation can show movement within weeks. Sustainable organic growth typically builds over 3 to 6 months with consistent content and local signals.',
      },
      {
        q: 'Do I need separate pages for Dubai and Abu Dhabi?',
        a: 'If you serve multiple emirates, dedicated location or service-area pages help users and search engines understand your coverage. Each page should offer unique, useful content rather than copy-pasted city names.',
      },
      {
        q: 'Does IGENTX handle Arabic SEO?',
        a: 'Yes. We build bilingual Arabic and English websites with hreflang, RTL layout and localised on-page SEO. This supports ranking in both language markets across the UAE.',
      },
      {
        q: 'What is the difference between local SEO and technical SEO?',
        a: 'Local SEO focuses on geographic visibility: GBP, citations, local content and map rankings. Technical SEO covers site speed, crawlability, schema and Core Web Vitals. Both are essential for UAE businesses.',
      },
    ],
  },
  {
    slug: 'technical-seo-checklist-uae',
    title: 'Technical SEO Checklist for UAE Websites in 2026',
    seoTitle: 'Technical SEO Checklist UAE 2026 | IGENTX',
    description:
      'A technical SEO checklist for UAE websites: Core Web Vitals, mobile performance, schema, hreflang, crawlability and indexation best practices.',
    keywords:
      'technical SEO UAE, Core Web Vitals Dubai, website SEO checklist, schema markup UAE, Arabic hreflang',
    category: 'SEO',
    readingTime: '6 min read',
    image: '/assets/blog/seo-banner.webp',
    imageAlt: 'Technical SEO checklist for UAE websites',
    excerpt:
      'Technical SEO is the foundation for ranking in the UAE. Use this checklist to audit Core Web Vitals, mobile performance, schema, hreflang and crawlability before you invest in content alone.',
    takeaways: [
      'Core Web Vitals and mobile performance directly affect rankings and conversions in mobile-first UAE markets.',
      'Schema markup, canonical tags and hreflang prevent duplicate content issues on bilingual sites.',
      'Regular technical audits catch crawl errors, broken links and indexation problems early.',
    ],
    ctaTitle: 'Want a technical SEO audit?',
    ctaText: 'IGENXT runs technical SEO audits for UAE businesses and fixes performance, schema and indexation issues.',
    ctaButton: 'Explore SEO Services UAE',
    ctaLink: '/services/seo-service-uae',
    finalCtaTitle: 'Fix technical SEO issues before they cost you leads',
    finalCtaDescription:
      'Book a free consultation for a technical SEO review of your UAE website.',
    secondaryCtaText: 'Read Local SEO Guide',
    secondaryCtaLink: '/blog/local-seo-dubai-uae-guide',
    faqDescription: 'Technical SEO questions for UAE website owners.',
    related: [
      {
        slug: 'local-seo-dubai-uae-guide',
        title: 'Local SEO in Dubai and the UAE',
        excerpt: 'Google Business Profile, citations and local landing pages.',
        category: 'SEO',
        image: '/assets/blog/seo-og.webp',
      },
      {
        slug: 'importance-of-website-uae',
        title: 'Why Every UAE Business Needs a Strong Website',
        excerpt: 'Growth, trust and visibility in competitive UAE markets.',
        category: 'Web Development',
        date: '2025-10-28',
        image: '/assets/images/web-development-uae.webp',
      },
      {
        slug: 'moduluxe-group-seo-case-study',
        title: 'Moduluxe Group: 312% Organic Traffic Growth',
        excerpt: 'How bilingual SEO and performance delivered measurable results.',
        category: 'Web Development',
        image: '/assets/images/moduluxegroup.webp',
      },
    ],
    sections: [
      {
        heading: 'Start with crawlability and indexation',
        body: '<p>Search engines must crawl and index your pages correctly. Check <strong>robots.txt</strong>, XML sitemaps and canonical tags. Ensure important pages are not blocked and that staging environments are not indexable.</p><ul><li>Submit an XML sitemap in Google Search Console.</li><li>Fix 404 errors and redirect chains.</li><li>Use canonical URLs on paginated and filtered views.</li><li>Monitor coverage reports for excluded pages.</li></ul>',
      },
      {
        heading: 'Core Web Vitals and mobile performance',
        body: '<p>UAE users browse heavily on mobile. Slow sites lose rankings and conversions. Target strong <strong>LCP, INP and CLS</strong> scores. Use modern hosting, image optimisation and lean JavaScript.</p><p>IGENXT builds on Next.js and Vercel with performance budgets from day one. Our <a href="/case-studies/moduluxe-group">Moduluxe Group case study</a> achieved 0.8s load times and 95% performance scores after rebuild.</p>',
        image: '/assets/images/seo-optimisation.webp',
        imageAlt: 'SEO and performance optimisation',
        caption: 'Technical SEO and Core Web Vitals support both rankings and user experience.',
      },
      {
        heading: 'Bilingual hreflang and RTL',
        body: '<p>UAE sites often serve English and Arabic. Implement <code>hreflang</code> links between language versions, use proper <code>lang</code> attributes and test RTL layouts. Avoid serving the wrong language based on IP alone without user control.</p><p>See our <a href="/blog/bilingual-website-development-uae">bilingual website development guide</a> for implementation patterns.</p>',
      },
      {
        heading: 'Structured data and schema',
        body: '<p>Add schema for <strong>Organization</strong>, <strong>LocalBusiness</strong> (where accurate), <strong>Service</strong>, <strong>FAQPage</strong> and <strong>Article</strong> where relevant. Valid JSON-LD helps search engines understand your content and can enable rich results.</p><p>Test markup with Google Rich Results Test and fix warnings before launch.</p>',
      },
      {
        heading: 'Ongoing monitoring',
        body: '<p>Technical SEO is not a one-off audit. Schedule quarterly reviews of Search Console, broken links, security (HTTPS), and page speed. Pair technical work with <a href="/blog/local-seo-dubai-uae-guide">local SEO</a> and quality content for compounding results.</p><p><a href="/services/seo-service-uae">IGENXT SEO services</a> include technical audits and ongoing optimisation for UAE businesses. <a href="/contact">Book a consultation</a> to get started.</p>',
      },
    ],
    faqs: [
      {
        q: 'What Core Web Vitals scores should I aim for?',
        a: 'Aim for LCP under 2.5 seconds, INP under 200ms and CLS under 0.1 for a good user experience. Higher scores correlate with better engagement and can support SEO performance.',
      },
      {
        q: 'Is hreflang required for UAE bilingual sites?',
        a: 'Hreflang is strongly recommended when you publish distinct English and Arabic URLs. It helps Google serve the correct language version to users and reduces duplicate content confusion.',
      },
      {
        q: 'How often should I run a technical SEO audit?',
        a: 'Run a full audit at launch, after major site changes and at least quarterly. Monitor Search Console weekly for new crawl or indexation issues.',
      },
      {
        q: 'Can you fix SEO issues on WordPress sites?',
        a: 'Yes. We audit and improve WordPress, headless and Next.js sites. We also help businesses migrate to Next.js when performance and scalability require it.',
      },
    ],
  },
]

// Write first batch (SEO posts) - rest appended in same file below
for (const post of POSTS) {
  const file = path.join(BLOG_DIR, `${post.slug}.json`)
  fs.writeFileSync(file, JSON.stringify(buildPost(post), null, 2))
  console.log('Wrote', file)
}
