#!/usr/bin/env node
/**
 * Generator for the remaining 8 UAE blog posts in the expansion plan.
 * Run: node scripts/generate-blog-posts-part2.mjs
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
    slug: 'ecommerce-website-development-dubai-uae',
    title: 'Ecommerce Website Development in Dubai and the UAE: A Practical Guide',
    seoTitle: 'Ecommerce Website Development Dubai UAE | IGENTX',
    description:
      'Plan and build high-converting ecommerce websites in Dubai and the UAE. Covers platform choice, payments, mobile UX, SEO and measurable sales growth.',
    keywords:
      'ecommerce website development Dubai, ecommerce UAE, online store Dubai, Shopify UAE, headless commerce UAE',
    category: 'Ecommerce',
    readingTime: '7 min read',
    image: '/assets/blog/ecommerce-og.webp',
    imageAlt: 'Ecommerce website development guide for Dubai and UAE businesses',
    excerpt:
      'UAE shoppers expect fast, mobile-first online stores with trusted payment options. This guide covers platform selection, checkout UX, local payments, SEO and the technical choices that drive conversions in Dubai and across the Emirates.',
    takeaways: [
      'Platform choice should match your catalogue size, integrations and growth plans, not trends alone.',
      'Mobile performance, Arabic support and trusted payment gateways directly affect conversion rates in the UAE.',
      'Measure success by revenue, average order value and repeat purchases, not page views alone.',
    ],
    ctaTitle: 'Planning an ecommerce store in the UAE?',
    ctaText:
      'IGENXT builds ecommerce websites on Shopify, BigCommerce and headless stacks with performance, SEO and conversion optimisation built in.',
    ctaButton: 'Explore Ecommerce Development UAE',
    ctaLink: '/services/ecommerce-website-development-uae',
    finalCtaTitle: 'Ready to launch or rebuild your online store?',
    finalCtaDescription:
      'Book a free consultation to review your ecommerce goals, platform options and growth roadmap for Dubai and the UAE.',
    secondaryCtaText: 'View Ecommerce Services',
    secondaryCtaLink: '/services/ecommerce-website-development-uae',
    faqDescription: 'Common questions about ecommerce website development in Dubai and the UAE.',
    related: [
      {
        slug: 'web-development-uae',
        title: 'Web Development in the UAE: A Practical Guide',
        excerpt: 'Planning and building high-performance websites for UAE businesses.',
        category: 'Web Development',
        date: '2025-11-06',
        image: '/assets/images/web-development-uae.webp',
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
        slug: 'local-seo-dubai-uae-guide',
        title: 'Local SEO in Dubai and the UAE',
        excerpt: 'Google Business Profile, citations and local landing pages.',
        category: 'SEO',
        image: '/assets/blog/seo-og.webp',
      },
    ],
    sections: [
      {
        heading: 'Why ecommerce matters in the UAE',
        body: '<p>Online retail in the UAE continues to grow as consumers expect convenience, fast delivery and secure checkout on mobile. Whether you sell products in Dubai, Abu Dhabi or across the GCC, your website is often the first touchpoint and the final conversion step.</p><p>Strong ecommerce is not just a catalogue online. It combines <strong>platform reliability</strong>, <strong>payment trust</strong>, <strong>mobile UX</strong> and <strong>discoverability through SEO</strong>. Businesses that treat the store as a growth channel, not a brochure, see better repeat purchase rates and lower acquisition costs over time.</p>',
      },
      {
        heading: 'Choosing the right platform',
        body: '<p>Platform selection depends on your product count, customisation needs and team capacity:</p><ul><li><strong>Shopify and BigCommerce:</strong> Strong for rapid launch, app ecosystems and managed hosting. Ideal for many SME and mid-market brands in the UAE.</li><li><strong>Headless commerce:</strong> Next.js storefronts with a commerce API backend suit brands that need bespoke UX, bilingual content and tight performance control.</li><li><strong>Custom builds:</strong> When workflows, B2B pricing or integrations are unique, a tailored stack may deliver better long-term ROI.</li></ul><p>IGENXT helps UAE businesses evaluate and implement the stack that matches their growth stage. See our <a href="/services/ecommerce-website-development-uae">ecommerce website development services</a> for typical engagement models.</p>',
        image: '/assets/blog/ecommerce-banner.webp',
        imageAlt: 'Ecommerce development for UAE online stores',
        caption: 'The right platform balances speed to market with room to scale.',
      },
      {
        heading: 'Payments, logistics and trust signals',
        body: '<p>UAE shoppers expect familiar payment methods and clear delivery information. Integrate gateways that support local cards and wallets where your audience prefers them. Show VAT, shipping costs and return policies before checkout to reduce cart abandonment.</p><p>Trust badges, authentic reviews and responsive customer support channels (including optional AI enquiry assistants) help convert hesitant buyers. Pair your store with a fast marketing site and structured product schema for better organic visibility.</p>',
      },
      {
        heading: 'Mobile-first UX and performance',
        body: '<p>Most UAE ecommerce traffic arrives on mobile. Optimise Core Web Vitals, compress images, and simplify checkout to as few steps as possible. Arabic and English support matters for bilingual audiences: RTL layouts, localised product copy and hreflang signals improve both UX and SEO.</p><p>Read our guides on <a href="/blog/bilingual-website-development-uae">bilingual website development</a> and <a href="/blog/technical-seo-checklist-uae">technical SEO</a> for implementation patterns that apply to storefronts as well as marketing sites.</p>',
      },
      {
        heading: 'Measure what drives revenue',
        body: '<p>Track conversion rate, average order value, cart abandonment and channel attribution. Use analytics and search console data to refine product pages, category structure and paid campaigns. SEO and performance improvements compound: faster pages rank better and convert more visitors into buyers.</p><p><a href="/contact">Book a free consultation</a> with IGENTX to review your ecommerce roadmap, or explore <a href="/services/ecommerce-website-development-uae">ecommerce development for Dubai and the UAE</a>.</p>',
      },
    ],
    faqs: [
      {
        q: 'How much does ecommerce website development cost in Dubai?',
        a: 'Costs vary by platform, catalogue size, integrations and design scope. A focused Shopify launch differs from a headless rebuild with custom workflows. IGENTX provides scoped proposals after a discovery call.',
      },
      {
        q: 'Should I use Shopify or a custom Next.js store in the UAE?',
        a: 'Shopify suits many brands that want fast launch and managed infrastructure. Headless Next.js fits when you need bespoke UX, bilingual content control and maximum performance. We help you choose based on goals, not hype.',
      },
      {
        q: 'Do UAE ecommerce sites need Arabic support?',
        a: 'If you serve bilingual customers, Arabic pages with RTL layout and hreflang improve trust and search visibility. Many successful UAE stores operate in both English and Arabic.',
      },
      {
        q: 'Can IGENTX migrate my existing store?',
        a: 'Yes. We migrate product data, redirects and SEO signals from WooCommerce, Magento, legacy platforms and other Shopify stores while minimising downtime and ranking loss.',
      },
    ],
  },
  {
    slug: 'bilingual-website-development-uae',
    title: 'Bilingual Website Development in the UAE: English and Arabic Done Right',
    seoTitle: 'Bilingual Website Development UAE | IGENTX',
    description:
      'Build bilingual English and Arabic websites for the UAE with RTL layout, hreflang, localised content and performance-first Next.js development.',
    keywords:
      'bilingual website UAE, Arabic website development Dubai, RTL website UAE, hreflang Arabic English, multilingual web development UAE',
    category: 'Web Development',
    readingTime: '7 min read',
    image: '/assets/images/web-development-uae.webp',
    imageAlt: 'Bilingual English and Arabic website development for UAE businesses',
    excerpt:
      'UAE audiences search and buy in both English and Arabic. This guide covers RTL design, hreflang, content localisation, language switchers and the technical patterns that help bilingual sites rank and convert.',
    takeaways: [
      'Bilingual UAE sites need proper hreflang, lang attributes and RTL-ready layouts, not machine-translated duplicates.',
      'Language switchers should preserve page context so users do not lose their place when switching.',
      'Localised copy and performance-first builds improve both SEO and conversion in Dubai and Abu Dhabi.',
    ],
    ctaTitle: 'Need a bilingual website in the UAE?',
    ctaText:
      'IGENXT builds Arabic and English websites on Next.js with RTL support, hreflang and SEO foundations from day one.',
    ctaButton: 'Explore Web Development UAE',
    ctaLink: '/services/web-development-uae',
    finalCtaTitle: 'Ready for a bilingual site that ranks in both languages?',
    finalCtaDescription:
      'Book a free consultation to plan your English and Arabic website structure, content and launch roadmap.',
    secondaryCtaText: 'Read Local SEO Guide',
    secondaryCtaLink: '/blog/local-seo-dubai-uae-guide',
    faqDescription: 'Questions about bilingual and Arabic website development in the UAE.',
    related: [
      {
        slug: 'web-development-uae',
        title: 'Web Development in the UAE: A Practical Guide',
        excerpt: 'Planning and building high-performance websites for UAE businesses.',
        category: 'Web Development',
        date: '2025-11-06',
        image: '/assets/images/web-development-uae.webp',
      },
      {
        slug: 'local-seo-dubai-uae-guide',
        title: 'Local SEO in Dubai and the UAE',
        excerpt: 'Google Business Profile, citations and bilingual local pages.',
        category: 'SEO',
        image: '/assets/blog/seo-og.webp',
      },
      {
        slug: 'moduluxe-group-seo-case-study',
        title: 'Moduluxe Group: 312% Organic Traffic Growth',
        excerpt: 'Bilingual SEO and performance results for a UAE real estate brand.',
        category: 'Web Development',
        image: '/assets/images/moduluxegroup.webp',
      },
    ],
    sections: [
      {
        heading: 'Why bilingual websites matter in the UAE',
        body: '<p>The UAE is a multilingual market. Customers search in English and Arabic, often on mobile, and expect content in their preferred language. A site that serves only one language leaves visibility and revenue on the table.</p><p>Bilingual development is more than translation. It requires <strong>RTL layout</strong>, culturally appropriate copy, consistent branding and technical signals so search engines serve the correct language version. Done well, bilingual sites improve trust, time on site and qualified enquiries.</p>',
      },
      {
        heading: 'URL structure and hreflang',
        body: '<p>Choose a URL pattern and stick to it. Common approaches include language subdirectories (<code>/en/</code> and <code>/ar/</code>) or subdomains. Each English page should have a matching Arabic counterpart where content exists.</p><p>Implement <code>hreflang</code> tags linking language alternates, set correct <code>lang</code> attributes on the HTML element, and use canonical tags to avoid duplicate content issues. Test with Google Search Console after launch.</p><p>Our <a href="/blog/technical-seo-checklist-uae">technical SEO checklist</a> covers hreflang validation and indexation checks for UAE sites.</p>',
        image: '/assets/images/seo-optimisation.webp',
        imageAlt: 'SEO optimisation for bilingual UAE websites',
        caption: 'Hreflang and canonical tags help Google serve the right language to UAE searchers.',
      },
      {
        heading: 'RTL design and UX',
        body: '<p>Arabic interfaces read right to left. Mirror navigation, icons and form layouts where appropriate, but do not flip logos or media that should stay LTR. Typography, line height and button placement need RTL testing on real devices.</p><p>Language switchers should preserve context: switching from an English service page should land on the Arabic equivalent, not the homepage. Avoid auto-redirecting by IP alone without a clear user override.</p>',
      },
      {
        heading: 'Localisation, not literal translation',
        body: '<p>Effective Arabic content reflects how customers in Dubai and Abu Dhabi describe your services. Work with professional localisation or native copywriters rather than machine translation for customer-facing pages.</p><p>Meta titles, headings, schema and alt text should be localised where they affect search and accessibility. IGENTX clients such as <a href="/case-studies/moduluxe-group">Moduluxe Group</a> improved organic visibility by ranking in both Arabic and English searches after a bilingual SEO-ready rebuild.</p>',
      },
      {
        heading: 'Build on a performance-first stack',
        body: '<p>Next.js with static generation or ISR delivers fast bilingual pages at scale. Pair with a CMS that supports field-level translation workflows so marketing teams can update both languages without developer bottlenecks.</p><p><a href="/services/web-development-uae">IGENXT web development in the UAE</a> includes bilingual architecture, RTL theming and SEO setup. <a href="/contact">Book a free consultation</a> to plan your English and Arabic site.</p>',
      },
    ],
    faqs: [
      {
        q: 'Should Arabic be the default language on a UAE website?',
        a: 'Default language depends on your primary audience and brand strategy. Many businesses default to English with a prominent Arabic switcher. The key is consistent URLs, hreflang and equal quality in both languages.',
      },
      {
        q: 'Can you add Arabic to an existing English-only site?',
        a: 'Yes. We audit structure, implement RTL theming, add hreflang and migrate content into a bilingual routing pattern. Major redesigns may be faster than patching legacy templates.',
      },
      {
        q: 'Does bilingual content hurt SEO?',
        a: 'Not when hreflang and unique localised pages are implemented correctly. Duplicate thin translation hurts SEO; thoughtful localisation improves visibility in both language markets.',
      },
      {
        q: 'Which CMS works best for bilingual UAE sites?',
        a: 'We often use Storyblok or similar headless CMS with field-level translation. The CMS should support workflow for both languages and preview before publish.',
      },
    ],
  },
  {
    slug: 'custom-software-development-uae-guide',
    title: 'Custom Software Development in the UAE: A Practical Guide for Growing Businesses',
    seoTitle: 'Custom Software Development UAE Guide | IGENTX',
    description:
      'When to choose custom software in the UAE, how to scope projects, select a partner and deliver measurable operational efficiency and growth.',
    keywords:
      'custom software development UAE, bespoke software Dubai, web application development UAE, SaaS development UAE, software agency Dubai',
    category: 'Web Development',
    readingTime: '7 min read',
    image: '/assets/images/custom-software-development.webp',
    imageAlt: 'Custom software development guide for UAE businesses',
    excerpt:
      'Off-the-shelf tools do not always fit UAE workflows, integrations or compliance needs. This guide explains when custom software makes sense, how to scope projects and what to expect from a development partner.',
    takeaways: [
      'Custom software pays off when unique workflows, integrations or data models create clear ROI over generic SaaS.',
      'Discovery, phased delivery and measurable KPIs reduce risk on UAE software projects.',
      'Modern stacks like Next.js and React support web apps, internal tools and customer-facing platforms at scale.',
    ],
    ctaTitle: 'Considering custom software in the UAE?',
    ctaText:
      'IGENXT designs and builds custom web applications, internal tools and vertical platforms with performance and maintainability in mind.',
    ctaButton: 'Explore Custom Software Development',
    ctaLink: '/services/custom-software-development',
    finalCtaTitle: 'Have a software idea or operational bottleneck?',
    finalCtaDescription:
      'Book a free consultation to discuss scope, timeline and the business outcomes your custom build should deliver.',
    secondaryCtaText: 'View Custom Software Services',
    secondaryCtaLink: '/services/custom-software-development',
    faqDescription: 'Questions about custom software development for UAE businesses.',
    related: [
      {
        slug: 'web-development-uae',
        title: 'Web Development in the UAE: A Practical Guide',
        excerpt: 'Planning and building high-performance websites for UAE businesses.',
        category: 'Web Development',
        date: '2025-11-06',
        image: '/assets/images/web-development-uae.webp',
      },
      {
        slug: 'ai-in-web-development-uae',
        title: 'How AI Is Revolutionizing Web Development in the UAE',
        excerpt: 'AI-assisted development, automation and smarter digital products.',
        category: 'AI',
        date: '2025-11-06',
        image: '/assets/images/ai-solutions.webp',
      },
      {
        slug: 'how-to-choose-best-web-development-agency-uae',
        title: 'How to Choose the Best Web Development Agency in the UAE',
        excerpt: 'Evaluation criteria for selecting a development partner in Dubai.',
        category: 'Web Development',
        date: '2025-11-06',
        image: '/assets/images/web-development-uae.webp',
      },
    ],
    sections: [
      {
        heading: 'When custom software beats off-the-shelf',
        body: '<p>Many UAE businesses start with spreadsheets and generic SaaS. That works until workflows become unique, integrations multiply or compliance requirements do not fit standard products.</p><p>Custom software makes sense when you need:</p><ul><li><strong>Proprietary workflows</strong> that differentiate your service or operations.</li><li><strong>Deep integrations</strong> with ERP, payment, CRM or industry systems.</li><li><strong>Data ownership</strong> and deployment control for regulated or multi-country operations.</li><li><strong>Vertical platforms</strong> you may productise later, similar to how IGENTX built <a href="/products/daycaremate">DaycareMate</a> for early childhood education centres.</li></ul>',
      },
      {
        heading: 'Scoping for outcomes, not feature lists',
        body: '<p>Start with the business outcome: fewer manual hours, faster approvals, higher conversion, better reporting. Map current pain points and define KPIs before writing user stories.</p><p>A focused MVP validates assumptions without overbuilding. Phased delivery lets UAE teams adopt gradually while funding stays aligned with measurable progress.</p>',
        image: '/assets/images/custom-software-development.webp',
        imageAlt: 'Custom software development for UAE businesses',
        caption: 'Scope custom projects around measurable operational and revenue outcomes.',
      },
      {
        heading: 'Technology choices for UAE projects',
        body: '<p>Web applications on <strong>Next.js and React</strong> offer strong performance, SEO where needed and a large talent pool. API-first backends (Node, serverless or dedicated services) integrate with mobile apps and third parties.</p><p>Cloud hosting on Vercel, AWS or Azure supports UAE and global users. Consider bilingual UI, role-based access and audit trails early if your users span admin, staff and customer portals.</p><p>For AI-enhanced products, pair structured data with optional assistants. See our <a href="/blog/ai-in-web-development-uae">AI in web development guide</a> for practical patterns.</p>',
      },
      {
        heading: 'Choosing a development partner',
        body: '<p>Evaluate agencies on relevant case studies, communication, security practices and post-launch support. Ask how they handle discovery, testing, documentation and handover.</p><p>Our guide on <a href="/blog/how-to-choose-best-web-development-agency-uae">choosing a web development agency in the UAE</a> applies equally to custom software engagements. Prefer partners who challenge scope creep and tie milestones to outcomes.</p>',
      },
      {
        heading: 'Delivery, maintenance and growth',
        body: '<p>Plan for ongoing maintenance, security updates and feature iteration. Custom software is a product, not a one-off project. Monitoring, error tracking and user feedback loops keep quality high after launch.</p><p><a href="/services/custom-software-development">IGENXT custom software development</a> covers discovery through launch and beyond. <a href="/contact">Book a free consultation</a> to discuss your UAE project.</p>',
      },
    ],
    faqs: [
      {
        q: 'How long does custom software development take in the UAE?',
        a: 'Timelines depend on scope. A focused MVP may take weeks to a few months. Larger platforms with multiple portals and integrations take longer. Discovery produces a realistic phased plan.',
      },
      {
        q: 'How much does custom software cost compared to SaaS?',
        a: 'Upfront build cost is higher than subscribing to generic SaaS, but custom software can reduce long-term licence fees and fit workflows precisely. ROI comes from efficiency, conversion and capabilities SaaS cannot offer.',
      },
      {
        q: 'Can IGENTX integrate with our existing systems?',
        a: 'Yes. We integrate with payment gateways, CRMs, accounting tools and custom APIs. Integration complexity is scoped during discovery.',
      },
      {
        q: 'Do you build mobile apps as well as web apps?',
        a: 'Our primary focus is high-performance web applications and progressive web experiences. We can advise on mobile strategy and partner on native apps when required.',
      },
    ],
  },
  {
    slug: 'branding-uae-startups-guide',
    title: 'Branding for UAE Startups: Build Trust Before You Scale',
    seoTitle: 'Branding UAE Startups Guide | IGENTX',
    description:
      'A practical branding guide for UAE startups: visual identity, messaging, digital touchpoints and design that converts trust into leads and investment interest.',
    keywords:
      'branding UAE startups, graphic design Dubai, startup brand identity UAE, logo design Dubai, brand guidelines UAE',
    category: 'Branding',
    readingTime: '6 min read',
    image: '/assets/blog/branding-og.webp',
    imageAlt: 'Branding guide for UAE startups and growing businesses',
    excerpt:
      'In competitive UAE markets, strong branding helps startups win trust fast. This guide covers visual identity, messaging, digital touchpoints and the design decisions that support fundraising, partnerships and customer conversion.',
    takeaways: [
      'Startup branding should clarify who you serve, why you matter and how you look across every digital touchpoint.',
      'Consistent logos, colour systems and typography build recognition before large marketing budgets.',
      'Brand and website design work together: trust on the landing page converts visitors into enquiries.',
    ],
    ctaTitle: 'Building a startup brand in the UAE?',
    ctaText:
      'IGENXT delivers branding, graphic design and website experiences that help UAE startups look credible from day one.',
    ctaButton: 'Explore Graphic Design UAE',
    ctaLink: '/services/graphic-design-uae',
    finalCtaTitle: 'Ready to sharpen your startup brand?',
    finalCtaDescription:
      'Book a free consultation to review your visual identity, messaging and digital presence.',
    secondaryCtaText: 'View Branding Services',
    secondaryCtaLink: '/services/branding-graphic-design',
    faqDescription: 'Common branding questions for UAE startups.',
    related: [
      {
        slug: 'importance-of-website-uae',
        title: 'Why Every UAE Business Needs a Strong Website',
        excerpt: 'Growth, trust and visibility in competitive UAE markets.',
        category: 'Web Development',
        date: '2025-10-28',
        image: '/assets/images/web-development-uae.webp',
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
        slug: 'how-to-choose-best-web-development-agency-uae',
        title: 'How to Choose the Best Web Development Agency in the UAE',
        excerpt: 'Evaluation criteria for selecting a development partner in Dubai.',
        category: 'Web Development',
        date: '2025-11-06',
        image: '/assets/blog/best-web-development-agency-uae-og.webp',
      },
    ],
    sections: [
      {
        heading: 'Why branding matters early for UAE startups',
        body: '<p>UAE investors, partners and customers form opinions quickly. Before you scale paid acquisition, your brand must communicate credibility, category clarity and professionalism across your website, pitch deck, social profiles and sales collateral.</p><p>Branding is not only a logo. It is the <strong>system of visuals and messages</strong> that tells people what you do, who you serve and why they should trust you. Startups that invest early reduce friction in sales conversations and look established alongside larger competitors.</p>',
      },
      {
        heading: 'Core brand foundations',
        body: '<p>Define these elements before heavy design production:</p><ul><li><strong>Positioning:</strong> One clear sentence on the outcome you deliver.</li><li><strong>Audience:</strong> Who buys, who influences and what they fear or desire.</li><li><strong>Personality:</strong> Tone of voice that fits your category without sounding generic.</li><li><strong>Visual direction:</strong> Mood, colour ranges and typography that work in digital and print.</li></ul><p>Outcome-first messaging aligns with how IGENTX writes for UAE clients: leads, efficiency and measurable growth, not feature dumps alone.</p>',
        image: '/assets/blog/branding-banner.webp',
        imageAlt: 'Branding and graphic design for UAE startups',
        caption: 'Strong startup brands combine clear messaging with consistent visual systems.',
      },
      {
        heading: 'Logo, identity and guidelines',
        body: '<p>Your logo must work at favicon size, on dark backgrounds and in monochrome applications. Build a compact identity kit: primary and secondary logos, colour palette with accessibility contrast, typography pairings and spacing rules.</p><p>Brand guidelines keep founders, freelancers and agencies aligned as you grow. Even a lightweight one-page guide prevents off-brand social posts and inconsistent pitch materials.</p>',
      },
      {
        heading: 'Digital touchpoints that convert',
        body: '<p>Your website is the hub. Landing pages, product screenshots, iconography and photography style should feel cohesive. Arabic and English variants need equal care if you serve bilingual markets.</p><p>Pair branding with a fast, SEO-ready site. Read <a href="/blog/importance-of-website-uae">why every UAE business needs a strong website</a> and plan design and development together rather than treating them as separate projects.</p>',
      },
      {
        heading: 'When to refresh versus rebrand',
        body: '<p>Refresh when visuals feel dated but positioning still holds. Rebrand when you pivot market, merge or outgrow a name that confuses buyers. Either way, update digital assets, email signatures and key sales documents in one coordinated rollout.</p><p><a href="/services/graphic-design-uae">IGENXT graphic design and branding in the UAE</a> supports startups from identity through website launch. <a href="/contact">Book a free consultation</a> to get started.</p>',
      },
    ],
    faqs: [
      {
        q: 'How much does startup branding cost in Dubai?',
        a: 'Investment depends on deliverables: logo only, full identity, guidelines, pitch deck templates and website design. IGENTX scopes packages after understanding your stage and goals.',
      },
      {
        q: 'Should my startup brand support Arabic?',
        a: 'If you target UAE and GCC customers, plan Arabic typography and RTL layouts early. Bilingual brand assets prevent expensive rework later.',
      },
      {
        q: 'Can IGENTX design our website and brand together?',
        a: 'Yes. Integrated brand and web projects keep messaging, visuals and UX consistent. We also offer standalone graphic design engagements.',
      },
      {
        q: 'What files should I receive from a branding project?',
        a: 'Expect vector logos, colour codes, font licences or references, export packs for web and print, and guidelines your team can follow without constant agency support.',
      },
    ],
  },
  {
    slug: 'childcare-management-software-uae-guide',
    title: 'How to Choose Childcare Management Software in the UAE: A Buyer\'s Guide',
    seoTitle: 'Childcare Management Software UAE Buyer Guide | IGENTX',
    description:
      'Evaluate nursery and preschool management software for UAE centres. Covers admissions, family communication, billing, compliance and vendor selection without generic feature hype.',
    keywords:
      'childcare management software UAE, nursery software Dubai, preschool management system UAE, early learning centre software, nursery ERP UAE',
    category: 'Products',
    readingTime: '8 min read',
    image: '/assets/images/daycaremate-hero.webp',
    imageAlt: 'Guide to choosing childcare management software for UAE centres',
    excerpt:
      'UAE nurseries and early learning centres need software that handles admissions, daily operations, family communication and billing in one workflow. This buyer\'s guide helps you evaluate vendors, avoid common pitfalls and choose a platform that fits your centre.',
    takeaways: [
      'Evaluate software against your full workflow from enquiry to billing, not isolated features.',
      'UAE centres need mobile-friendly family portals, role-based staff access and regional billing settings.',
      'AI enquiry tools and embeddable forms can capture leads, but qualified admissions should be reviewed and converted manually by your team.',
    ],
    ctaTitle: 'Shortlisting centre management software?',
    ctaText:
      'Compare your requirements with DaycareMate, IGENTX\'s platform for nurseries, preschools and early learning providers worldwide, with the UAE as our primary market.',
    ctaButton: 'Explore DaycareMate',
    ctaLink: '/products/daycaremate',
    finalCtaTitle: 'Need help choosing centre software in the UAE?',
    finalCtaDescription:
      'Book a free consultation to walk through your admissions, operations and billing requirements with the IGENTX team.',
    secondaryCtaText: 'Opening a Nursery in Dubai',
    secondaryCtaLink: '/blog/opening-nursery-dubai-digital-tools',
    faqDescription: 'Buyer questions about childcare management software in the UAE.',
    related: [
      {
        slug: 'opening-nursery-dubai-digital-tools',
        title: 'Opening a Nursery in Dubai: Essential Digital Tools',
        excerpt: 'Website, enquiry capture and centre software for new nursery owners.',
        category: 'Products',
        image: '/assets/images/daycaremate-dashboard.webp',
      },
      {
        slug: 'daycaremate-childcare-management-software-guide',
        title: 'DaycareMate: Childcare Centre Management Software Guide',
        excerpt: 'Deep dive into DaycareMate features for admissions, attendance and billing.',
        category: 'Products',
        date: '2026-07-23',
        image: '/assets/images/daycaremate-hero.webp',
      },
      {
        slug: 'bloomwave-daycaremate-digital-transformation',
        title: 'BloomWave: Digital Transformation with DaycareMate',
        excerpt: 'How one UAE centre launched website, AI enquiries and operations software.',
        category: 'Products',
        image: '/assets/images/bloomwave-homepage.jpg',
      },
    ],
    sections: [
      {
        heading: 'Why UAE centres need purpose-built software',
        body: '<p>Nurseries, preschools and early learning centres in the UAE juggle admissions enquiries, classroom operations, parent communication and billing under tight timelines. Spreadsheets and messaging apps break down as enrolment grows.</p><p>Purpose-built childcare management software connects these workflows so staff spend less time on admin and families get clearer, more professional communication. The right platform supports your team from first enquiry through daily care and invoicing.</p><p>This guide helps buyers evaluate options. For a detailed look at IGENTX\'s platform, see the <a href="/blog/daycaremate-childcare-management-software-guide">DaycareMate product guide</a>, which covers feature depth rather than vendor selection criteria.</p>',
      },
      {
        heading: 'Define your requirements before demos',
        body: '<p>Start with outcomes your centre needs:</p><ul><li><strong>Pipeline visibility:</strong> Track enquiries and admissions status without lost follow-ups.</li><li><strong>Daily operations:</strong> Attendance, classroom activity and staff workflows on mobile.</li><li><strong>Family experience:</strong> Portals or apps parents actually use for updates and messages.</li><li><strong>Billing accuracy:</strong> Invoice-first finance with VAT-aware settings for UAE deployments.</li><li><strong>Access control:</strong> Separate permissions for front desk, teachers, billing and administrators.</li></ul><p>Score vendors against this list instead of generic feature checklists from sales decks.</p>',
      },
      {
        heading: 'Admissions and lead capture in the UAE context',
        body: '<p>Enquiries arrive from your website, walk-ins, referrals and campaigns. Software should centralise leads on an admin board with clear status tracking and one-click conversion to admissions.</p><p>Look for <strong>embeddable enquiry and admission forms</strong> you can place on your existing website. These forms capture interest and consent: they are not a hosted visit-booking page. Some centres also deploy an optional <strong>AI website enquiry assistant</strong> that answers common questions 24/7.</p><p>Important: AI conversations should be reviewed by your team, and qualified enquiries converted to pipeline leads <strong>manually</strong>. Do not assume automatic CRM creation without staff oversight.</p>',
        image: '/assets/images/daycaremate-dashboard.webp',
        imageAlt: 'Childcare centre admin dashboard for admissions and operations',
        caption: 'Centralised admissions and operations reduce manual follow-up for UAE centre teams.',
      },
      {
        heading: 'Operations, communication and billing',
        body: '<p>Daily care features should include check-in and check-out, activity logging and parent-visible updates. Messaging and announcements reduce reliance on informal chat groups.</p><p>Billing modules should support your fee structures, program catalogues and parent statements. For UAE centres, confirm currency, timezone and VAT configuration per deployment. Payment proof workflows may matter depending on how families pay.</p><p>Ask vendors about data isolation, backup practices and onboarding support for your staff size and programme structure.</p>',
      },
      {
        heading: 'Evaluate vendors and plan rollout',
        body: '<p>Request references from similar centre sizes in your region. Pilot with one classroom or programme before full rollout. Train front desk and teachers separately: they use different parts of the system daily.</p><p><a href="/products/daycaremate">DaycareMate</a> is built by IGENTX for early childhood education centres worldwide, with dedicated deployments and Admin, Teacher and Family portals. Read how <a href="/case-studies/bloomwave-learning-daycare">BloomWave Learning and Daycare</a> combined website, enquiry capture and DaycareMate in one rollout.</p><p><a href="/contact">Book a free consultation</a> to compare your shortlist or plan a DaycareMate demo for your UAE centre.</p>',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between this guide and the DaycareMate product guide?',
        a: 'This article helps UAE buyers evaluate any childcare management software against their workflow. The DaycareMate guide explains IGENTX platform features in detail for centres considering our product specifically.',
      },
      {
        q: 'Do UAE nurseries need Arabic support in centre software?',
        a: 'Many centres serve bilingual families. Confirm whether family portals, messages and documents support Arabic and English if that matters for your community.',
      },
      {
        q: 'Can enquiry forms replace a full admissions workflow?',
        a: 'Embeddable forms capture leads on your website, but you still need pipeline tracking, staff review and structured admissions inside your centre software. Forms complement operations; they do not replace them.',
      },
      {
        q: 'Does AI automatically enrol families from website chat?',
        a: 'Responsible implementations review AI conversations and convert qualified enquiries manually. DaycareMate and IGENTX AI assistants follow this pattern rather than auto-creating enrolments without staff approval.',
      },
    ],
  },
  {
    slug: 'opening-nursery-dubai-digital-tools',
    title: 'Opening a Nursery in Dubai: Essential Digital Tools for Launch',
    seoTitle: 'Opening a Nursery Dubai Digital Tools | IGENTX',
    description:
      'Digital checklist for opening a nursery in Dubai: website, enquiry capture, centre management software, parent communication and compliance-ready workflows.',
    keywords:
      'opening a nursery Dubai, nursery setup UAE, childcare centre digital tools, nursery website Dubai, early learning centre launch UAE',
    category: 'Products',
    readingTime: '7 min read',
    image: '/assets/images/daycaremate-dashboard.webp',
    imageAlt: 'Digital tools for opening a nursery in Dubai',
    excerpt:
      'Opening a nursery in Dubai means more than licensing and fit-out. This checklist covers the digital tools you need from day one: a trustworthy website, enquiry capture, centre operations software and parent communication that scales.',
    takeaways: [
      'Launch with a professional website and enquiry capture before paid campaigns drive traffic nowhere useful.',
      'Centre management software should connect admissions, attendance, messaging and billing from the start.',
      'Optional AI enquiry assistants capture interest outside office hours, with manual lead conversion by your team.',
    ],
    ctaTitle: 'Opening a nursery in Dubai or the UAE?',
    ctaText:
      'IGENXT helps early learning centres launch websites, enquiry workflows and DaycareMate operations software in coordinated rollouts.',
    ctaButton: 'Explore DaycareMate',
    ctaLink: '/products/daycaremate',
    finalCtaTitle: 'Planning your nursery launch?',
    finalCtaDescription:
      'Book a free consultation to map your digital stack from website through centre operations.',
    secondaryCtaText: 'Childcare Software Buyer Guide',
    secondaryCtaLink: '/blog/childcare-management-software-uae-guide',
    faqDescription: 'Digital tool questions for new nurseries in Dubai.',
    related: [
      {
        slug: 'childcare-management-software-uae-guide',
        title: 'How to Choose Childcare Management Software in the UAE',
        excerpt: 'Buyer guide for evaluating nursery and preschool software vendors.',
        category: 'Products',
        image: '/assets/images/daycaremate-hero.webp',
      },
      {
        slug: 'daycaremate-childcare-management-software-guide',
        title: 'DaycareMate: Childcare Centre Management Software Guide',
        excerpt: 'Feature overview for admissions, attendance and billing.',
        category: 'Products',
        date: '2026-07-23',
        image: '/assets/images/daycaremate-hero.webp',
      },
      {
        slug: 'bloomwave-daycaremate-digital-transformation',
        title: 'BloomWave: Digital Transformation with DaycareMate',
        excerpt: 'Real-world UAE centre launch with website and operations platform.',
        category: 'Products',
        image: '/assets/images/bloomwave-homepage.jpg',
      },
    ],
    sections: [
      {
        heading: 'Digital readiness before you open doors',
        body: '<p>Opening a nursery in Dubai involves licensing, premises, staffing and curriculum planning. Digital tools are easy to defer, but parents research centres online long before they tour a classroom.</p><p>A weak web presence or chaotic enquiry handling costs enrolments. Plan your digital stack alongside physical setup so marketing, admissions and daily operations run smoothly from opening week.</p>',
      },
      {
        heading: 'Website and local visibility',
        body: '<p>Your website should explain programmes, age groups, location and how families enquire. Mobile performance matters: parents browse on phones during commutes. Clear calls to action, trust signals and professional photography build credibility.</p><p>Pair the site with basic local SEO: Google Business Profile, consistent contact details and location content. See our <a href="/blog/local-seo-dubai-uae-guide">local SEO guide for Dubai and the UAE</a> for foundational steps.</p>',
        image: '/assets/images/daycaremate-hero.webp',
        imageAlt: 'Professional web presence for UAE early learning centres',
        caption: 'A trustworthy website is often the first impression for Dubai nursery parents.',
      },
      {
        heading: 'Enquiry capture that staff can action',
        body: '<p>Embed <strong>enquiry and admission forms</strong> on your website to capture leads with consent. These are lead capture forms, not a hosted visit-booking page. Route submissions to a central pipeline your admissions team monitors daily.</p><p>Some centres add an optional <strong>AI enquiry assistant</strong> on the website to answer FAQs outside office hours. Conversations are reviewed by staff and qualified leads are converted manually. This captures interest without promising automated enrolment.</p>',
      },
      {
        heading: 'Centre operations from day one',
        body: '<p>Before enrolment scales, implement childcare management software for attendance, classroom activity, parent messaging and billing. Starting with spreadsheets makes migration painful once you have dozens of families onboard.</p><p><a href="/products/daycaremate">DaycareMate</a> provides Admin, Teacher and Family portals with admissions workflows, invoice-first billing and role-based access. Read our <a href="/blog/childcare-management-software-uae-guide">UAE buyer\'s guide</a> to compare requirements before you choose a vendor.</p>',
      },
      {
        heading: 'Launch playbook and support',
        body: '<p>Sequence rollout: website and forms first, operations software configured with programmes and fees, staff trained on admissions and daily workflows, then marketing campaigns. Document who owns enquiries, billing and parent communication.</p><p><a href="/case-studies/bloomwave-learning-daycare">BloomWave Learning and Daycare</a> worked with IGENTX on an integrated launch. <a href="/contact">Book a free consultation</a> to plan digital tools for your Dubai nursery opening.</p>',
      },
    ],
    faqs: [
      {
        q: 'When should I launch my nursery website?',
        a: 'Launch as soon as you can credibly describe programmes, location and enquiry process. Parents research early; a placeholder page with clear contact beats silence during fit-out.',
      },
      {
        q: 'Do I need centre software before opening?',
        a: 'Configure core admissions and billing workflows before your first enrolled families. Daily attendance and parent messaging become critical within weeks of opening.',
      },
      {
        q: 'Can parents book tours through DaycareMate forms?',
        a: 'Embeddable forms capture enquiries and admission interest on your website. They are not a hosted visit-booking page. Your team follows up to schedule tours manually.',
      },
      {
        q: 'Does IGENTX help with nursery websites and software together?',
        a: 'Yes. We deliver websites, optional AI enquiry assistants and DaycareMate centre operations in coordinated projects, as we did for BloomWave in Abu Dhabi.',
      },
    ],
  },
  {
    slug: 'moduluxe-group-seo-case-study',
    title: 'How Moduluxe Group Grew Organic Traffic by 312% with Bilingual SEO',
    seoTitle: 'Moduluxe Group SEO Case Study 312% Traffic | IGENTX',
    description:
      'Case study: Moduluxe Group achieved 312% organic traffic growth with a bilingual, performance-first Next.js website and SEO foundation built by IGENTX in the UAE.',
    keywords:
      'Moduluxe Group case study, SEO case study UAE, bilingual website SEO, organic traffic growth Dubai, Next.js SEO UAE',
    category: 'Web Development',
    readingTime: '6 min read',
    image: '/assets/images/moduluxegroup.webp',
    imageAlt: 'Moduluxe Group website and SEO case study',
    excerpt:
      'Moduluxe Group, a UAE rental brand, needed quality leads from organic search in English and Arabic. IGENTX rebuilt their site on Next.js with bilingual SEO and performance optimisation, delivering 312% organic traffic growth and stronger conversions.',
    takeaways: [
      'A performance-first rebuild with bilingual SEO helped Moduluxe rank in English and Arabic searches.',
      'Organic traffic growth of 312% translated into quality leads from day one of the new site.',
      'Technical SEO, local signals and fast page loads compounded visibility for a competitive UAE market.',
    ],
    ctaTitle: 'Want similar SEO results in the UAE?',
    ctaText:
      'Read the full Moduluxe case study for project details, metrics and the technology stack behind the results.',
    ctaButton: 'View Full Case Study',
    ctaLink: '/case-studies/moduluxe-group',
    finalCtaTitle: 'Ready to grow organic traffic in the UAE?',
    finalCtaDescription:
      'Book a free consultation to review your website, bilingual SEO and performance opportunities.',
    secondaryCtaText: 'Explore SEO Services UAE',
    secondaryCtaLink: '/services/seo-service-uae',
    faqDescription: 'Questions about the Moduluxe Group SEO case study.',
    related: [
      {
        slug: 'local-seo-dubai-uae-guide',
        title: 'Local SEO in Dubai and the UAE',
        excerpt: 'Google Business Profile, citations and bilingual local pages.',
        category: 'SEO',
        image: '/assets/blog/seo-og.webp',
      },
      {
        slug: 'technical-seo-checklist-uae',
        title: 'Technical SEO Checklist for UAE Websites',
        excerpt: 'Core Web Vitals, schema, hreflang and performance checks.',
        category: 'SEO',
        image: '/assets/blog/seo-banner.webp',
      },
      {
        slug: 'bilingual-website-development-uae',
        title: 'Bilingual Website Development in the UAE',
        excerpt: 'English and Arabic implementation patterns for UAE sites.',
        category: 'Web Development',
        image: '/assets/images/web-development-uae.webp',
      },
    ],
    sections: [
      {
        heading: 'Client background and challenge',
        body: '<p><strong>Moduluxe Group</strong> operates in the UAE rental market from Abu Dhabi. Their previous web presence did not reflect the brand quality they delivered offline, and organic visibility in English and Arabic searches was limited.</p><p>The goal was clear: generate <strong>quality leads from organic search</strong>, improve trust on first visit and build a foundation for long-term SEO growth without sacrificing performance on mobile.</p>',
      },
      {
        heading: 'Strategy: bilingual SEO on a modern stack',
        body: '<p>IGENXT rebuilt the site on <strong>Next.js</strong> with Tailwind CSS and Storyblok CMS for flexible content management. The architecture prioritised Core Web Vitals, clean URL structure and bilingual pages with proper SEO signals.</p><p>Technical work included schema markup, optimised metadata, image performance and crawl-friendly sitemaps. Content structure supported both English and Arabic discovery, aligned with our <a href="/blog/bilingual-website-development-uae">bilingual development guide</a>.</p>',
        image: '/assets/images/moduluxegroup.webp',
        imageAlt: 'Moduluxe Group bilingual website built by IGENTX',
        caption: 'Performance-first bilingual architecture supported SEO gains for Moduluxe Group.',
      },
      {
        heading: 'Results: 312% organic traffic growth',
        body: '<p>Within three months of launch, Moduluxe achieved <strong>312% organic traffic growth</strong>. Performance scores reached 95+ through Next.js optimisation and caching. The site ranked more effectively in both Arabic and English searches, feeding a steady pipeline of enquiries.</p><p>These metrics come from the published <a href="/case-studies/moduluxe-group">Moduluxe Group case study</a>. Results vary by industry and starting point, but the pattern holds: technical SEO plus bilingual content on a fast site drives measurable visibility.</p>',
        quote: {
          text: 'The new website transformed our online presence. We started getting quality leads from day one, and the bilingual SEO setup helped us rank in both Arabic and English searches.',
          author: 'Murshid CK',
          role: 'Operations Head, Moduluxe UAE',
        },
      },
      {
        heading: 'What other UAE businesses can learn',
        body: '<p>Three lessons apply beyond real estate:</p><ul><li><strong>Performance is SEO:</strong> Fast pages improve engagement signals and rankings.</li><li><strong>Bilingual equals broader reach:</strong> UAE markets search in two languages; serve both properly.</li><li><strong>CMS flexibility supports SEO:</strong> Marketing teams need to publish and optimise without developer delays.</li></ul><p>Pair this case with our <a href="/blog/local-seo-dubai-uae-guide">local SEO guide</a> and <a href="/blog/technical-seo-checklist-uae">technical SEO checklist</a> to audit your own site.</p>',
      },
      {
        heading: 'Work with IGENTX on SEO and web development',
        body: '<p>IGENXT delivers SEO-ready websites for UAE startups and established brands. Services include technical audits, bilingual implementation and ongoing optimisation.</p><p><a href="/case-studies/moduluxe-group">Read the full Moduluxe case study</a>, explore <a href="/services/seo-service-uae">SEO services in the UAE</a>, or <a href="/contact">book a free consultation</a> to discuss your goals.</p>',
      },
    ],
    faqs: [
      {
        q: 'How was 312% traffic growth measured?',
        a: 'Organic traffic was tracked before and after launch over a three-month window, as documented in the Moduluxe Group case study. Baselines and analytics setup were part of the engagement.',
      },
      {
        q: 'What technology stack did Moduluxe use?',
        a: 'Next.js, Tailwind CSS and Storyblok CMS on a performance-optimised hosting setup. The stack supports bilingual content, fast loads and flexible marketing updates.',
      },
      {
        q: 'Can similar results be guaranteed for my business?',
        a: 'No agency can guarantee specific rankings or traffic multiples. Moduluxe results reflect their market, content investment and technical starting point. We scope realistic KPIs during discovery.',
      },
      {
        q: 'Does IGENTX provide ongoing SEO after launch?',
        a: 'Yes. We offer technical SEO, content support and reporting for UAE clients who want compounding organic growth after the initial build.',
      },
    ],
  },
  {
    slug: 'bloomwave-daycaremate-digital-transformation',
    title: 'BloomWave: Digital Transformation with Website, AI Enquiries and DaycareMate',
    seoTitle: 'BloomWave DaycareMate Case Study | IGENTX',
    description:
      'How BloomWave Learning and Daycare launched bloomwave.ae with an AI enquiry assistant and DaycareMate centre operations platform in one integrated UAE rollout.',
    keywords:
      'BloomWave case study, DaycareMate case study, nursery digital transformation UAE, childcare website UAE, AI enquiry assistant nursery',
    category: 'Products',
    readingTime: '6 min read',
    image: '/assets/images/bloomwave-homepage.jpg',
    imageAlt: 'BloomWave Learning and Daycare website and digital transformation',
    excerpt:
      'BloomWave Learning and Daycare needed a professional web presence, 24/7 parent enquiries and centre operations software. IGENTX delivered bloomwave.ae, an AI enquiry assistant and DaycareMate in one coordinated rollout for the Abu Dhabi centre.',
    takeaways: [
      'Integrated rollout beats stitching together unrelated vendors for website, enquiries and centre software.',
      'An AI enquiry assistant captures parent interest outside office hours, with manual lead conversion by centre staff.',
      'DaycareMate centralises admissions and daily operations so teams stop juggling disconnected tools.',
    ],
    ctaTitle: 'Want an integrated centre digital stack?',
    ctaText:
      'Read the full BloomWave case study for project scope, results and how IGENTX coordinates website, AI and DaycareMate delivery.',
    ctaButton: 'View Full Case Study',
    ctaLink: '/case-studies/bloomwave-learning-daycare',
    finalCtaTitle: 'Planning digital tools for your centre?',
    finalCtaDescription:
      'Book a free consultation to discuss website, enquiry capture and DaycareMate for your nursery or preschool.',
    secondaryCtaText: 'Explore DaycareMate',
    secondaryCtaLink: '/products/daycaremate',
    faqDescription: 'Questions about the BloomWave digital transformation case study.',
    related: [
      {
        slug: 'childcare-management-software-uae-guide',
        title: 'How to Choose Childcare Management Software in the UAE',
        excerpt: 'Buyer guide for nursery and preschool software evaluation.',
        category: 'Products',
        image: '/assets/images/daycaremate-hero.webp',
      },
      {
        slug: 'opening-nursery-dubai-digital-tools',
        title: 'Opening a Nursery in Dubai: Essential Digital Tools',
        excerpt: 'Digital checklist for new nursery launches in the UAE.',
        category: 'Products',
        image: '/assets/images/daycaremate-dashboard.webp',
      },
      {
        slug: 'daycaremate-childcare-management-software-guide',
        title: 'DaycareMate: Childcare Centre Management Software Guide',
        excerpt: 'Platform features for admissions, attendance and billing.',
        category: 'Products',
        date: '2026-07-23',
        image: '/assets/images/daycaremate-hero.webp',
      },
    ],
    sections: [
      {
        heading: 'Centre background and goals',
        body: '<p><strong>BloomWave Learning and Daycare</strong> is an early learning centre in Abu Dhabi. Leadership wanted parents to see a professional, trustworthy brand online, capture enquiries outside office hours and run admissions and daily care from one operations platform.</p><p>Fragmented tools would slow staff and confuse families. BloomWave chose IGENTX for an integrated delivery: marketing website, optional AI enquiry assistant and <a href="/products/daycaremate">DaycareMate</a> centre management software.</p>',
      },
      {
        heading: 'Website: bloomwave.ae',
        body: '<p>IGENXT launched <strong>bloomwave.ae</strong> on Next.js with Storyblok CMS so the centre can update content without developer dependency. The site presents programmes, trust signals and clear enquiry paths optimised for mobile parents researching childcare options.</p><p>A fast, credible website supports admissions before families ever call. See our <a href="/blog/opening-nursery-dubai-digital-tools">digital tools guide for opening a nursery in Dubai</a> for a similar launch checklist.</p>',
        image: '/assets/images/bloomwave-homepage.jpg',
        imageAlt: 'BloomWave Learning and Daycare homepage',
        caption: 'bloomwave.ae gives parents a professional presence they can trust.',
      },
      {
        heading: 'AI enquiry assistant with manual lead conversion',
        body: '<p>BloomWave deployed an <strong>IGENTX AI enquiry assistant</strong> on the website to answer common parent questions 24/7. The assistant helps capture enquiry intent through conversation when staff are unavailable.</p><p>Qualified conversations are <strong>reviewed by centre admins</strong> and converted to pipeline leads manually. The assistant does not auto-create enrolments or CRM records without staff oversight. Embeddable enquiry forms on the site complement chat for structured lead capture.</p>',
      },
      {
        heading: 'DaycareMate for admissions and operations',
        body: '<p>DaycareMate handles admissions workflows, attendance, family messaging and billing in dedicated Admin, Teacher and Family portals. BloomWave uses the platform to keep daily operations aligned with the brand experience promised on the website.</p><p>For feature depth, read the <a href="/blog/daycaremate-childcare-management-software-guide">DaycareMate product guide</a> or the <a href="/blog/childcare-management-software-uae-guide">UAE buyer\'s guide</a> for evaluation criteria.</p>',
        quote: {
          text: 'IGENXT delivered a complete digital foundation for our centre: bloomwave.ae gives parents a professional presence they can trust, the AI enquiry assistant captures leads outside office hours, and DaycareMate keeps admissions and daily operations in one place. One team, one rollout, exactly what we needed.',
          author: 'Ajas Muhammed',
          role: 'Managing Director, BloomWave Learning and Daycare',
        },
      },
      {
        heading: 'Lessons for other UAE centres',
        body: '<p>BloomWave shows that early learning centres benefit when website, enquiry capture and operations software share one delivery partner and timeline. Parents experience consistent communication; staff avoid duplicate data entry across disconnected systems.</p><p><a href="/case-studies/bloomwave-learning-daycare">Read the full BloomWave case study</a>, explore <a href="/products/daycaremate">DaycareMate</a>, or <a href="/contact">book a free consultation</a> with IGENTX to plan your centre\'s digital foundation.</p>',
      },
    ],
    faqs: [
      {
        q: 'How long did the BloomWave rollout take?',
        a: 'The published case study notes a two-week project duration for the integrated website, AI assistant and DaycareMate configuration scope agreed with the centre.',
      },
      {
        q: 'Is the AI assistant included with every DaycareMate subscription?',
        a: 'The AI enquiry assistant is optional and environment-gated for subscribers who want website chat. It complements embeddable enquiry forms; leads are converted manually by staff.',
      },
      {
        q: 'Can IGENTX deliver only the website without DaycareMate?',
        a: 'Yes. We also deliver standalone websites and AI agents for centres using other operations tools. Integrated rollout is recommended when you want one team and timeline.',
      },
      {
        q: 'Does BloomWave use visit booking on their website?',
        a: 'Enquiry and admission forms capture leads for staff follow-up. IGENTX embeddable forms are lead capture, not a hosted visit-booking page.',
      },
    ],
  },
]

for (const post of POSTS) {
  const file = path.join(BLOG_DIR, `${post.slug}.json`)
  fs.writeFileSync(file, JSON.stringify(buildPost(post), null, 2))
  console.log('Wrote', file)
}

console.log(`\nDone. Generated ${POSTS.length} blog posts.`)
