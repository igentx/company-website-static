export interface SeoFallback {
  title: string
  description: string
  keywords: string
}

const DEFAULT_SEO: SeoFallback = {
  title: 'AI Web Development & Digital Products | IGENTX',
  description:
    'IGENTX builds high-performance websites, AI customer service agents, and vertical SaaS products for growing businesses worldwide. UAE is our first market.',
  keywords:
    'web development, AI customer service agent, digital agency, custom software, igentx',
}

const SEO_BY_PATH: Record<string, SeoFallback> = {
  '/': {
    title: 'Web Development Company UAE | AI Software & Digital Products | IGENTX',
    description:
      'IGENXT is an AI-first technology company in the UAE. We build high-performance websites, custom software, AI customer agents, headless commerce, and SEO-driven growth for businesses in Dubai, Abu Dhabi, and worldwide.',
    keywords:
      'web development company UAE, website development Dubai, software development UAE, AI development company UAE, custom software development UAE, ecommerce development UAE, headless commerce UAE, SEO company UAE, Next.js development, React development',
  },
  '/contact': {
    title: 'Contact IGENTX | Web Development & AI Products',
    description:
      'Get in touch with IGENTX for web development, ecommerce, branding, SEO, AI customer agents, and DaycareMate.',
    keywords: 'contact igentx, web development quote, AI agent demo',
  },
  '/services': {
    title: 'Web Development & Digital Services | IGENTX',
    description:
      'Custom web development, ecommerce, branding, and technical SEO | delivered with AI-accelerated workflows and measurable performance.',
    keywords: 'web development services, ecommerce development, branding agency, technical SEO',
  },
  '/services/web-development': {
    title: 'Custom Web Development Company | IGENTX',
    description:
      'Performance-first websites with Next.js, modern stacks, and SEO built in. Global delivery from an AI-accelerated studio.',
    keywords: 'custom web development company, Next.js development agency, headless CMS websites',
  },
  '/services/ecommerce-development': {
    title: 'Ecommerce Website Development | IGENTX',
    description:
      'Conversion-focused online stores with fast checkout, mobile-first UX, and integrations for payments and fulfilment.',
    keywords: 'ecommerce website development, online store development, Shopify development',
  },
  '/services/branding-graphic-design': {
    title: 'Branding & Graphic Design Agency | IGENTX',
    description:
      'Brand identity, UI design, and visual systems that match your web product and marketing goals.',
    keywords: 'branding agency, graphic design, logo design, brand identity',
  },
  '/services/seo': {
    title: 'Technical SEO Services | IGENTX',
    description:
      'Core Web Vitals, schema markup, site architecture, and content strategy for search and AI discovery.',
    keywords: 'technical SEO services, Core Web Vitals, schema markup, GEO optimization',
  },
  '/services/web-development-uae': {
    title: 'Web Development Company Dubai & UAE | IGENTX',
    description:
      'Bilingual, mobile-first websites for UAE businesses. Next.js builds with Arabic RTL, local SEO, and fast performance.',
    keywords: 'web development company Dubai, web development UAE, bilingual website Dubai',
  },
  '/services/ecommerce-website-development-uae': {
    title: 'Ecommerce Website Development Dubai | IGENTX',
    description:
      'UAE ecommerce stores with local payment gateways, Arabic catalogues, and conversion-focused checkout flows.',
    keywords: 'ecommerce website development Dubai, online store UAE, Shopify Dubai',
  },
  '/services/graphic-design-uae': {
    title: 'Graphic Design Company Dubai | IGENTX',
    description:
      'Branding and graphic design for UAE businesses | logos, visual identity, and marketing assets.',
    keywords: 'graphic design Dubai, branding agency UAE, logo design Dubai',
  },
  '/services/seo-service-uae': {
    title: 'SEO Services Dubai & UAE | IGENTX',
    description:
      'Technical and local SEO for UAE businesses | Arabic SEO, schema, and performance optimization.',
    keywords: 'SEO services Dubai, Arabic SEO UAE, local SEO Dubai',
  },
  '/services/ai-solutions': {
    title: 'AI Solutions & Custom AI Integration | IGENTX',
    description:
      'Custom AI solutions for business automation: RAG assistants, workflow automation, intelligent features and product integrations. Delivered globally for growing businesses.',
    keywords: 'AI solutions, custom AI integration, RAG chatbot, workflow automation, AI development',
  },
  '/services/custom-software-development': {
    title: 'Custom Software Development | Bespoke Web Apps & Platforms | IGENTX',
    description:
      'Bespoke web applications, internal tools and product platforms built to fit your workflows and growth goals. Global delivery from an AI-accelerated studio.',
    keywords: 'custom software development, bespoke web applications, internal tools, API integrations, product platforms',
  },
  '/products': {
    title: 'IGENTX Products | AI Agent & DaycareMate',
    description:
      'Software products built by IGENTX: AI Customer Service Agent for websites and DaycareMate childcare management platform.',
    keywords: 'igentx products, AI customer service agent, childcare management software',
  },
  '/products/ai-customer-service-agent': {
    title: 'AI Customer Service Agent for Websites | IGENTX',
    description:
      '24/7 AI chat widget trained on your content. RAG-powered, multilingual, lightweight embed | under 7KB loader.',
    keywords:
      'AI customer service agent, RAG website chatbot, multilingual AI support widget, AI chat widget',
  },
  '/products/daycaremate': {
    title: 'DaycareMate | Childcare Management Software | IGENTX',
    description:
      'Childcare management platform by IGENTX: admissions, attendance, parent communication, and tax-aware billing. Single-tenant deployment per centre.',
    keywords:
      'childcare management software, nursery management system, preschool ERP, early childhood centre software',
  },
  '/uae': {
    title: 'Digital Agency Dubai & Childcare Management Software UAE | IGENTX',
    description:
      'DaycareMate by IGENTX: childcare management software for nurseries and preschools in Dubai and Abu Dhabi. Plus bilingual websites, ecommerce, branding, local SEO and AI enquiry tools for UAE businesses.',
    keywords:
      'digital agency Dubai, web development UAE, childcare management software UAE, nursery management software UAE, preschool management system Dubai, childcare centre software Abu Dhabi, early childhood education software UAE, DaycareMate UAE, AI agency Dubai, SEO services Dubai',
  },
  '/case-studies': {
    title: 'Case Studies | Web, AI & Product Success Stories | IGENTX',
    description:
      'Verified IGENTX case studies: traffic growth, AI enquiry assistants, childcare platform launches and high-performance websites for businesses worldwide.',
    keywords:
      'web development case studies, AI agent case study, childcare digital transformation, igentx portfolio, UAE web development success stories',
  },
  '/case-studies/moduluxe-group': {
    title: 'Moduluxe Group: 300% Organic Traffic Growth | IGENTX Case Study',
    description:
      'How Moduluxe Group achieved 300% organic traffic growth in 3 months with a bilingual, SEO-optimised Next.js website built for the UAE market.',
    keywords: 'web development UAE case study, Moduluxe Group, bilingual website UAE',
  },
  '/case-studies/dr-door': {
    title: 'DrDoor: 200% Organic Growth & Sub-Second Load Times | IGENTX Case Study',
    description:
      'How DrDoor achieved 200% organic traffic growth with a fast, SEO-optimised Next.js website for the India manufacturing market.',
    keywords: 'manufacturing website case study, DrDoor web development, SEO growth India',
  },
  '/case-studies/bloomwave-learning-daycare': {
    title: 'BloomWave: Integrated Web, AI Enquiries & Centre Operations | IGENTX Case Study',
    description:
      'How BloomWave Learning & Daycare launched bloomwave.ae with a 24/7 AI enquiry assistant and DaycareMate centre operations platform in one integrated rollout.',
    keywords: 'childcare centre digital transformation UAE, BloomWave, DaycareMate case study',
  },
  '/blog': {
    title: 'Blog | IGENTX | Web Development & AI Insights',
    description: 'Articles on web development, AI, SEO, and digital growth from the IGENTX team.',
    keywords: 'web development blog, AI web development, SEO UAE blog',
  },
  '/blog/daycaremate-childcare-management-software-guide': {
    title: 'DaycareMate: Childcare Centre Management Software Guide | IGENTX',
    description:
      'A practical guide to childcare centre management software: admissions, attendance, family communication and billing with DaycareMate by IGENTX.',
    keywords:
      'childcare management software, nursery management system, preschool ERP, DaycareMate, early childhood centre software',
  },
  '/blog/ai-translation-daycaremate-multilingual-uae': {
    title: 'How We Built AI Translation for DaycareMate | IGENTX',
    description:
      'Builder story: on-demand AI translation for multilingual UAE nurseries | 100+ languages, included for normal daycare use, server-side Gemini processing.',
    keywords:
      'AI childcare software IGENTX, DaycareMate translation, multilingual nursery communication UAE, childcare app translate messages',
  },
  '/blog/local-seo-dubai-uae-guide': {
    title: 'Local SEO Dubai & UAE Guide 2026 | IGENTX',
    description:
      'A practical local SEO guide for Dubai, Abu Dhabi and UAE businesses. Google Business Profile, bilingual pages, citations and measurable organic growth.',
    keywords: 'local SEO Dubai, local SEO UAE, Google Business Profile Dubai, Arabic SEO UAE',
  },
  '/blog/technical-seo-checklist-uae': {
    title: 'Technical SEO Checklist UAE 2026 | IGENTX',
    description:
      'Technical SEO checklist for UAE websites: Core Web Vitals, mobile performance, schema, hreflang and crawlability.',
    keywords: 'technical SEO UAE, Core Web Vitals Dubai, schema markup UAE, Arabic hreflang',
  },
  '/blog/ecommerce-website-development-dubai-uae': {
    title: 'Ecommerce Website Development Dubai & UAE | IGENTX',
    description:
      'Guide to ecommerce development in Dubai and the UAE: payment gateways, Arabic catalogues, checkout optimisation and conversions.',
    keywords: 'ecommerce website development Dubai, online store UAE, UAE payment gateway ecommerce',
  },
  '/blog/bilingual-website-development-uae': {
    title: 'Bilingual Arabic & English Website Development UAE | IGENTX',
    description:
      'How to build bilingual Arabic and English websites for the UAE with RTL, hreflang and SEO best practices.',
    keywords: 'bilingual website Dubai, Arabic RTL website UAE, hreflang UAE',
  },
  '/blog/custom-software-development-uae-guide': {
    title: 'Custom Software Development UAE Guide | IGENTX',
    description:
      'When UAE businesses need custom software vs off-the-shelf tools. Portals, integrations and scalable architecture.',
    keywords: 'custom software development UAE, bespoke web applications Dubai, UAE software company',
  },
  '/blog/branding-uae-startups-guide': {
    title: 'Branding for UAE Startups Guide | IGENTX',
    description:
      'Brand identity and graphic design for UAE startups: logo, visual language and digital presence that converts.',
    keywords: 'branding UAE startups, logo design Dubai, brand identity UAE',
  },
  '/blog/childcare-management-software-uae-guide': {
    title: 'How to Choose Childcare Management Software in the UAE | IGENTX',
    description:
      'Buyer guide for nursery and preschool management software in the UAE. What to evaluate before you choose a platform.',
    keywords: 'childcare management software UAE, nursery management software Dubai, preschool ERP UAE',
  },
  '/blog/opening-nursery-dubai-digital-tools': {
    title: 'Opening a Nursery in Dubai: Digital Tools Every Centre Needs | IGENTX',
    description:
      'Digital tools for new nurseries and preschools in Dubai: website, enquiry capture, centre management and family communication.',
    keywords: 'opening nursery Dubai, nursery digital tools UAE, preschool management Dubai',
  },
  '/blog/moduluxe-group-seo-case-study': {
    title: 'Moduluxe Group: 300% Organic Traffic Growth | IGENTX Case Study',
    description:
      'How Moduluxe Group achieved 300% organic traffic growth with a bilingual Next.js website and SEO strategy in the UAE.',
    keywords: 'Moduluxe Group case study, SEO growth UAE, bilingual website Dubai',
  },
  '/blog/bloomwave-daycaremate-digital-transformation': {
    title: 'BloomWave Digital Transformation | Website, AI & DaycareMate | IGENTX',
    description:
      'How BloomWave Learning and Daycare launched bloomwave.ae with an AI enquiry assistant and DaycareMate centre operations platform.',
    keywords: 'BloomWave case study, DaycareMate UAE, childcare centre digital transformation',
  },
  '/blog/web-development-uae': {
    title: 'Web Development in the UAE: A Practical Guide | IGENTX',
    description:
      'A practical guide to planning, building and optimising high-performance websites for businesses in Dubai, Abu Dhabi and across the UAE.',
    keywords: 'web development UAE, web development company UAE, web development Dubai, digital agency UAE',
  },
  '/blog/ai-in-web-development-uae': {
    title: 'How AI Is Revolutionizing Web Development in the UAE | IGENTX',
    description:
      'Explore how AI is transforming web development in the UAE: faster builds, smarter UX, automated SEO, and scalable digital products for modern businesses.',
    keywords: 'AI web development UAE, AI websites Dubai, AI digital agency UAE, Next.js AI development',
  },
  '/blog/ai-customer-service-agent-uae': {
    title: 'AI Customer Service Agent for UAE Websites | IGENTX',
    description:
      'The IGENTX AI Customer Service Agent is a 24/7 enquiry assistant for UAE websites. Instantly answer customer queries in multiple languages, and help your team capture qualified leads through manual follow-up.',
    keywords: 'AI customer service agent UAE, AI chatbot Dubai, multilingual AI chatbot, website assistant UAE',
  },
  '/blog/how-to-choose-best-web-development-agency-uae': {
    title: 'How to Choose the Best Web Development Agency in the UAE | IGENTX',
    description:
      'Looking for the best web development agency in the UAE? Discover key factors to consider and why IGENTX stands out with AI-powered, SEO-optimized websites built for performance.',
    keywords: 'best web development agency UAE, web design Dubai, website development Abu Dhabi, AI web development',
  },
  '/blog/importance-of-website-uae': {
    title: 'Why Every UAE Business Needs a Strong Website in 2026 | IGENTX',
    description:
      'Discover why having a professional, fast, and SEO-optimised website is crucial for UAE businesses in 2026. Learn how IGENTX helps companies grow with AI-driven web development.',
    keywords: 'importance of website UAE, website design Dubai, SEO UAE, digital presence UAE',
  },
  '/privacy': {
    title: 'Privacy Policy | IGENTX',
    description:
      'How IGENTX collects, uses, and protects your personal information when you visit our website or contact us.',
    keywords: 'privacy policy, data protection, IGENTX privacy, cookie policy',
  },
  '/terms': {
    title: 'Terms of Service | IGENTX',
    description: 'Terms and conditions governing your use of the IGENTX website and related services.',
    keywords: 'terms of service, terms and conditions, IGENTX terms, website terms',
  },
}

export function getSeoFallback(canonicalPath: string): SeoFallback {
  const normalized = canonicalPath.replace(/\/$/, '') || '/'
  return SEO_BY_PATH[normalized] ?? DEFAULT_SEO
}

export function getSeoFallbackForSlug(storySlug: string): SeoFallback {
  const slugToPath: Record<string, string> = {
    home: '/',
    contact: '/contact',
    'services-landing-page': '/services',
    'services/web-development-uae': '/services/web-development-uae',
    'services/ecommerce-website-development-uae': '/services/ecommerce-website-development-uae',
    'services/graphic-design-uae': '/services/graphic-design-uae',
    'services/seo-service-uae': '/services/seo-service-uae',
    'services/web-development': '/services/web-development',
    'services/ecommerce-development': '/services/ecommerce-development',
    'services/branding-graphic-design': '/services/branding-graphic-design',
    'services/seo': '/services/seo',
    'services/ai-solutions': '/services/ai-solutions',
    'services/custom-software-development': '/services/custom-software-development',
    'products-landing-page': '/products',
    'products/ai-customer-service-agent': '/products/ai-customer-service-agent',
    'products/daycaremate': '/products/daycaremate',
    'case-studies-landing-page': '/case-studies',
    'case-studies/web-development-uae-startup-moduluxe-group': '/case-studies/moduluxe-group',
    'case-studies/web-development-startup-dr-door': '/case-studies/dr-door',
    'case-studies/bloomwave-learning-daycare': '/case-studies/bloomwave-learning-daycare',
    'blog-landing-page': '/blog',
    'blog/daycaremate-childcare-management-software-guide':
      '/blog/daycaremate-childcare-management-software-guide',
    'blog/ai-translation-daycaremate-multilingual-uae':
      '/blog/ai-translation-daycaremate-multilingual-uae',
    'blog/local-seo-dubai-uae-guide': '/blog/local-seo-dubai-uae-guide',
    'blog/technical-seo-checklist-uae': '/blog/technical-seo-checklist-uae',
    'blog/ecommerce-website-development-dubai-uae': '/blog/ecommerce-website-development-dubai-uae',
    'blog/bilingual-website-development-uae': '/blog/bilingual-website-development-uae',
    'blog/custom-software-development-uae-guide': '/blog/custom-software-development-uae-guide',
    'blog/branding-uae-startups-guide': '/blog/branding-uae-startups-guide',
    'blog/childcare-management-software-uae-guide': '/blog/childcare-management-software-uae-guide',
    'blog/opening-nursery-dubai-digital-tools': '/blog/opening-nursery-dubai-digital-tools',
    'blog/moduluxe-group-seo-case-study': '/blog/moduluxe-group-seo-case-study',
    'blog/bloomwave-daycaremate-digital-transformation':
      '/blog/bloomwave-daycaremate-digital-transformation',
    'blog/web-development-uae': '/blog/web-development-uae',
    'blog/ai-in-web-development-uae': '/blog/ai-in-web-development-uae',
    'blog/ai-customer-service-agent-uae': '/blog/ai-customer-service-agent-uae',
    'blog/how-to-choose-best-web-development-agency-uae':
      '/blog/how-to-choose-best-web-development-agency-uae',
    'blog/importance-of-website-uae': '/blog/importance-of-website-uae',
    uae: '/uae',
    privacy: '/privacy',
    terms: '/terms',
  }
  const path = slugToPath[storySlug] ?? `/${storySlug}`
  return getSeoFallback(path)
}
