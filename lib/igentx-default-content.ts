/**
 * IGENTX Default Content - Complete default content for all IGENTX components
 * This content showcases the full IGENTX website structure and provides fallback content
 */

// ============================================================================
// HEADER CONTENT
// ============================================================================

export const defaultInfoBarContent = {
  _uid: 'default-infobar',
  component: 'info_bar',
  message: '🚀 Trusted by Fast-Growing UAE Startups',
  email: 'hello@igentx.com',
  email_label: 'Email us',
  address: 'Dubai, UAE',
  whatsapp_number: '+971501234567',
  whatsapp_text: 'Hello! I am interested in your web development services',
  whatsapp_label: 'WhatsApp me',
  show_language_switcher: true,
  show_contact_text: true,
  social_links: [
    {
      _uid: 'social-linkedin',
      component: 'social_links',
      platform: 'linkedin',
      url: 'https://linkedin.com/company/igentx',
    },
    {
      _uid: 'social-twitter',
      component: 'social_links',
      platform: 'twitter',
      url: 'https://twitter.com/igentx',
    },
    {
      _uid: 'social-instagram',
      component: 'social_links',
      platform: 'instagram',
      url: 'https://instagram.com/igentx',
    },
    {
      _uid: 'social-facebook',
      component: 'social_links',
      platform: 'facebook',
      url: 'https://facebook.com/igentx',
    },
  ],
}

export const defaultHeaderContent = {
  _uid: 'default-header',
  component: 'header_navigation',
  logo_text: 'IGENTX',
  info_bar: [defaultInfoBarContent],
  navigation_items: [
    {
      _uid: 'nav-home',
      component: 'navigation_items',
      label: 'Home',
      link: { url: '/', linktype: 'story' },
    },
    {
      _uid: 'nav-services',
      component: 'navigation_items',
      label: 'Services',
      link: { url: '/services', linktype: 'story' },
      children: [
        {
          _uid: 'nav-services-web-dev',
          component: 'navigation_items',
          label: 'Web Development',
          link: { url: '/services/web-development', linktype: 'story' },
        },
        {
          _uid: 'nav-services-ecommerce',
          component: 'navigation_items',
          label: 'Ecommerce Development',
          link: { url: '/services/ecommerce-development', linktype: 'story' },
        },
        {
          _uid: 'nav-services-branding',
          component: 'navigation_items',
          label: 'Branding',
          link: { url: '/services/branding', linktype: 'story' },
        },
      ],
    },
    {
      _uid: 'nav-case-studies',
      component: 'navigation_items',
      label: 'Case Studies',
      link: { url: '/case-studies', linktype: 'story' },
    },
    {
      _uid: 'nav-about',
      component: 'navigation_items',
      label: 'About',
      link: { url: '/about', linktype: 'story' },
    },
    {
      _uid: 'nav-blog',
      component: 'navigation_items',
      label: 'Blog',
      link: { url: '/blog', linktype: 'story' },
    },
    {
      _uid: 'nav-contact',
      component: 'navigation_items',
      label: 'Contact',
      link: { url: '#contact', linktype: 'url' },
    },
  ],
}

// ============================================================================
// FOOTER CONTENT
// ============================================================================

export const defaultFooterContent = {
  _uid: 'default-footer',
  component: 'footer_content',
  brand_name: 'IGENTX',
  brand_logo: { filename: '/logo.svg', alt: 'IGENTX' },
  description: 'AI-Driven Web & Branding Solutions for Fast-Growing Businesses in the UAE',
  link_groups: [
    {
      title: 'Company',
      links: [
        { _uid: 'footer-about', component: 'footer_links', label: 'About', link: { url: '/about', linktype: 'story' } },
        { _uid: 'footer-case-studies', component: 'footer_links', label: 'Case Studies', link: { url: '/case-studies', linktype: 'story' } },
        { _uid: 'footer-blog', component: 'footer_links', label: 'Blog', link: { url: '/blog', linktype: 'story' } },
        { _uid: 'footer-contact', component: 'footer_links', label: 'Contact', link: { url: '#contact', linktype: 'url' } },
      ],
    },
    {
      title: 'Services',
      links: [
        { _uid: 'footer-services-web', component: 'footer_links', label: 'Web Development', link: { url: '/services/web-development', linktype: 'story' } },
        { _uid: 'footer-services-ecom', component: 'footer_links', label: 'Ecommerce Development', link: { url: '/services/ecommerce-development', linktype: 'story' } },
        { _uid: 'footer-services-branding', component: 'footer_links', label: 'Branding', link: { url: '/services/branding', linktype: 'story' } },
      ],
    },
    {
      title: 'Resources',
      links: [
        { _uid: 'footer-privacy', component: 'footer_links', label: 'Privacy Policy', link: { url: '/privacy', linktype: 'story' } },
        { _uid: 'footer-terms', component: 'footer_links', label: 'Terms of Service', link: { url: '/terms', linktype: 'story' } },
        { _uid: 'footer-support', component: 'footer_links', label: 'Support', link: { url: '#contact', linktype: 'url' } },
      ],
    },
  ],
  social_links: [
    {
      _uid: 'social-linkedin',
      component: 'social_links',
      platform: 'linkedin',
      url: 'https://linkedin.com/company/igentx',
    },
    {
      _uid: 'social-twitter',
      component: 'social_links',
      platform: 'twitter',
      url: 'https://twitter.com/igentx',
    },
    {
      _uid: 'social-instagram',
      component: 'social_links',
      platform: 'instagram',
      url: 'https://instagram.com/igentx',
    },
  ],
  contact_info: {
    address: 'Dubai, UAE',
    email: 'hello@igentx.com',
    whatsapp: '971501234567',
    hours: 'Sun–Thu: 9:00–18:00 GST',
  },
  legal_links: [
    { _uid: 'legal-privacy', component: 'footer_links', label: 'Privacy Policy', link: { url: '/privacy', linktype: 'story' } },
    { _uid: 'legal-terms', component: 'footer_links', label: 'Terms of Service', link: { url: '/terms', linktype: 'story' } },
  ],
  copyright_text: '© 2025 IGENTX. All rights reserved.',
}

// ============================================================================
// ABOUT PAGE CONTENT
// ============================================================================

export const defaultAboutContent = {
  _uid: 'default-about',
  component: 'page',
  title: 'About IGENTX',
  body: [
    {
      _uid: 'default-about-section',
      component: 'about',
      title: 'About IGENTX',
      content: `Welcome to IGENTX - where AI meets modern web development! We're revolutionizing how businesses in the UAE build their digital presence.

Our AI-driven approach combines the power of Next.js, React, and cutting-edge CMS platforms with intelligent automation, delivering websites up to 60% faster than traditional development—without compromising quality.

We specialize in multilingual websites (Arabic + English), SEO optimization, and high-performance solutions tailored specifically for the UAE market. Every project includes Storyblok CMS from day one, giving you complete control over your content.

Whether you're a startup looking to make your mark or an established business seeking digital transformation, IGENTX provides the technology, expertise, and support you need to succeed in today's competitive online landscape.`,
      team_members: [
        {
          name: 'AI Development Team',
          position: 'Full-Stack Engineers',
          bio: 'Leveraging AI and modern web technologies to build lightning-fast, scalable solutions.',
        },
        {
          name: 'UAE Market Experts',
          position: 'Digital Strategists',
          bio: 'Deep understanding of local business culture, multilingual requirements, and UAE market dynamics.',
        },
        {
          name: 'Design & UX Team',
          position: 'Creative Directors',
          bio: 'Crafting beautiful, accessible, and conversion-focused user experiences for diverse audiences.',
        },
      ],
    },
  ],
}

// ============================================================================
// HOME PAGE CONTENT
// ============================================================================

export const igentxDefaultPageContent = {
  _uid: 'igentx-default-page',
  component: 'page',
  title: 'IGENTX - Smart & Modern Web Solutions',
  description: 'AI-Driven Web & Branding Solutions for Fast-Growing Businesses in the UAE',
  body: [
    {
      _uid: 'igentx-hero-section',
      component: 'igentx_hero',
      badge_text: 'Trusted by Fast-Growing UAE Startups',
      headline_part1: 'Smart & Modern Web Solutions',
      headline_part2: 'Built to Launch Faster',
      headline_part3: 'with the Power of AI and the Modern Web Stack',
      subheadline:
        'We craft high-performance, AI-driven websites using React, Next.js, and CMS. Integrated with third-party applications and deployed on Vercel. Build, edit, and scale your business effortlessly with the next generation of web technology.',
      primary_cta_text: 'Get a Free Consultation',
      primary_cta_link: { url: '#contact', linktype: 'url' },
      secondary_cta_text: 'See Our Services',
      secondary_cta_link: { url: '#pricing', linktype: 'url' },
      trust_signals: [
        { value: '3x', label: 'Faster Delivery' },
        { value: '99+', label: 'Core Web Vitals Score' },
        { value: '24/7', label: 'Customer Support' },
        { value: '95%', label: 'Customer Satisfaction' },
      ],
    },
    {
      _uid: 'why-choose-igentx-section',
      component: 'why_choose_igentx',
      badge_text: 'Why IGENTX?',
      title: 'Why Choose IGENTX?',
      description:
        'Empowering UAE businesses with AI-driven web solutions that deliver speed, performance, and growth.',
      features: [
        {
          title: 'AI-Powered Development for Faster Delivery',
          description:
            'Our intelligent development workflow accelerates project timelines by up to 60%—without compromising quality.',
          highlight: '60% Faster',
        },
        {
          title: 'Vercel Edge Hosting for Lightning Speed',
          description:
            'Experience sub-100ms load times with global CDN and edge computing tuned for the UAE and Middle East.',
          highlight: '<100ms Load Time',
        },
        {
          title: 'SEO-First Websites that Rank Higher',
          description:
            'Every project is built with performance, structure, and multilingual SEO best practices—helping you reach top positions on Google.',
          highlight: 'Top 3 Rankings',
        },
        {
          title: 'Accessible, Responsive & PWA-Ready',
          description:
            'We build future-proof websites that load fast, adapt beautifully across all devices, and meet international accessibility standards.',
          highlight: 'WCAG 2.1 AA',
        },
        {
          title: 'From Design to Deployment – All in One Place',
          description:
            'From custom web apps to ecommerce and brand identity, we offer an end-to-end digital solution for modern businesses.',
          highlight: 'Complete Solution',
        },
        {
          title: 'WhatsApp + AI Chatbots that Convert',
          description:
            'Engage visitors instantly with automated WhatsApp and AI chatbot integration—delivering 24/7 customer support.',
          highlight: '24/7 Support',
        },
      ],
      uae_signals_title: 'Trusted by UAE Businesses',
      uae_signals_description: 'Local expertise. Global standards.',
      uae_signals: [
        {
          title: 'Dubai-Based Team',
          description: 'We understand the UAE market, its pace, and business culture.',
        },
        {
          title: 'Arabic + English Support',
          description:
            'Native bilingual capability to help you connect with both local and global audiences.',
        },
        {
          title: 'UAE-Compliant Solutions',
          description:
            'All projects follow local data protection and digital business regulations.',
        },
      ],
      show_speed_comparison: true,
      speed_comparison_title: 'Speed is Everything in the UAE Market',
      speed_comparison_description:
        'Our AI-driven workflow consistently outperforms traditional web development—delivering faster, more reliable websites built for growth.',
      // Defaults for the comparison cards
      traditional_approach_title: 'Traditional Approach',
      traditional_approach_points: [
        {
          _uid: 'trad-pt-1',
          component: 'speed_comparison_point',
          text: '6-12 weeks development time',
          enabled: true,
        },
        {
          _uid: 'trad-pt-2',
          component: 'speed_comparison_point',
          text: 'Manual coding & testing',
          enabled: true,
        },
        {
          _uid: 'trad-pt-3',
          component: 'speed_comparison_point',
          text: 'Limited scalability',
          enabled: true,
        },
        {
          _uid: 'trad-pt-4',
          component: 'speed_comparison_point',
          text: 'Higher maintenance costs',
          enabled: true,
        },
      ],
      igentx_advantage_label: 'IGENTX Advantage',
      igentx_approach_title: 'AI-Driven Development',
      igentx_approach_points: [
        {
          _uid: 'igentx-pt-1',
          component: 'speed_comparison_point',
          text: '1-3 weeks delivery time',
          enabled: true,
        },
        {
          _uid: 'igentx-pt-2',
          component: 'speed_comparison_point',
          text: 'AI-assisted optimization',
          enabled: true,
        },
        {
          _uid: 'igentx-pt-3',
          component: 'speed_comparison_point',
          text: 'Built for scale from day 1',
          enabled: true,
        },
        {
          _uid: 'igentx-pt-4',
          component: 'speed_comparison_point',
          text: 'Proactive maintenance',
          enabled: true,
        },
      ],
    },
    {
      _uid: 'igentx-services-section',
      component: 'igentx_services',
      badge_text: 'Our Services',
      title: 'Complete Digital Solutions',
      description:
        'From concept to launch, we provide everything you need to succeed online in the UAE market',
      services: [
        {
          title: 'Web Development (AI-Driven)',
          description: 'Lightning-fast, SEO-optimized websites built with cutting-edge technology',
          features: [
            'Next.js + TypeScript + Tailwind + Storyblok',
            'Multilingual (Arabic + English ready)',
            'SEO, Accessibility, Performance, PWA',
            'Mobile-first responsive design',
            'Content Management System included',
          ],
          price_range: 'AED 2,999 - 14,999+',
          cta_text: 'Explore Web Packages',
          cta_link: { url: '#pricing', linktype: 'url' },
          is_popular: true,
        },
        {
          title: 'Branding Solutions',
          description:
            'Professional brand identity that makes your business stand out in the UAE market',
          features: [
            'Logo Design & Brand Guidelines',
            'Business Cards & Letterheads',
            'Catalog & Company Profile Design',
            'Social Media Posts & Festival Graphics',
            'Brand Strategy & Positioning',
          ],
          price_range: 'AED 1,500 - 8,000',
          cta_text: 'View Branding Packages',
          cta_link: { url: '#contact', linktype: 'url' },
        },
        {
          title: 'Ecommerce Solutions',
          description:
            'Powerful online stores that drive sales and provide excellent customer experience',
          features: [
            'Shopify / BigCommerce Stores',
            'Next.js Commerce Storefront',
            'Custom Widgets for BigCommerce',
            'Payment Gateway Integration',
            'Inventory Management',
          ],
          price_range: 'AED 5,999 - 25,000+',
          cta_text: 'Get Ecommerce Quote',
          cta_link: { url: '#contact', linktype: 'url' },
        },
      ],
      show_tech_stack: true,
      tech_stack_title: 'Cutting-Edge Technology Stack',
      tech_stack_description:
        'We use the latest technologies to ensure your project is built for performance, scalability, and future growth.',
      process_title: 'Our AI-Driven Process',
      process_description:
        'From concept to launch, our streamlined process ensures faster delivery without compromising quality.',
      process_steps: [
        {
          title: 'Discovery & Planning',
          description: 'AI-powered analysis of your requirements and market research',
          duration: '1-2 days',
        },
        {
          title: 'Design & Prototyping',
          description: 'Rapid prototyping with AI-assisted design optimization',
          duration: '2-3 days',
        },
        {
          title: 'Development & Testing',
          description: 'AI-driven development with automated testing and optimization',
          duration: '5-10 days',
        },
        {
          title: 'Launch & Support',
          description: 'Seamless deployment with ongoing AI-powered monitoring',
          duration: '1 day',
        },
      ],
      cta_title: 'Ready to Transform Your Business?',
      cta_description:
        'Let us help you build a powerful digital presence that drives results in the UAE market.',
      cta_text: 'Start Your Project',
      cta_link: { url: '#contact', linktype: 'url' },
    },
    {
      _uid: 'igentx-portfolio-section',
      component: 'igentx_portfolio',
      badge_text: 'Success Stories',
      title: 'Proven Results in the UAE Market',
      description:
        "See how we've helped businesses across the UAE achieve their digital transformation goals",
      case_studies: [
        {
          title: 'UAE Tech Startup - 300% Traffic Increase',
          description:
            'AI-driven multilingual website with advanced SEO optimization led to remarkable organic growth',
          category: 'Web Development',
          results: [
            { value: '300%', metric: 'Organic Traffic' },
            { value: '2.5s', metric: 'Load Time' },
            { value: '95%', metric: 'Performance Score' },
            { value: '150%', metric: 'Conversion Rate' },
          ],
          technologies: ['Next.js', 'Storyblok', 'Tailwind CSS', 'TypeScript', 'Vercel'],
        },
        {
          title: 'Dubai Restaurant Chain - Digital Transformation',
          description:
            'Complete branding and e-commerce solution with multilingual support and WhatsApp integration',
          category: 'Full Solution',
          results: [
            { value: '200%', metric: 'Online Orders' },
            { value: '24/7', metric: 'Customer Support' },
            { value: '50%', metric: 'Cost Reduction' },
            { value: '4.8★', metric: 'Customer Rating' },
          ],
          technologies: ['Shopify', 'WhatsApp API', 'AI Chatbot', 'Payment Gateway'],
        },
      ],
      show_performance_comparison: true,
      performance_title: 'Before vs After: Real Performance Impact',
      performance_description:
        'See how our AI-driven approach delivers measurable improvements in website performance and user experience.',
      performance_metrics: [
        {
          metric_name: 'Page Load Speed',
          before: '4.2s',
          after: '0.8s',
          improvement: '81% Faster',
        },
        {
          metric_name: 'SEO Score',
          before: '65/100',
          after: '98/100',
          improvement: '+51% Better',
        },
        {
          metric_name: 'Mobile Performance',
          before: '72/100',
          after: '95/100',
          improvement: '+32% Better',
        },
      ],
      testimonials: [
        {
          content:
            'IGENTX transformed our online presence completely. The AI-driven approach delivered results faster than we ever imagined possible.',
          name: 'Ahmed Al-Rashid',
          position: 'CEO',
          company: 'Dubai Tech Solutions',
          rating: 5,
        },
        {
          content:
            'The multilingual support and local UAE expertise made all the difference. Our Arabic customers now have the same great experience.',
          name: 'Fatima Hassan',
          position: 'Marketing Director',
          company: 'Emirates Retail Group',
          rating: 5,
        },
        {
          content:
            'Best investment we made for our business. The website performance and SEO improvements drove 3x more leads within 2 months.',
          name: 'Mohammad Bin Khalifa',
          position: 'Founder',
          company: 'Abu Dhabi Consulting',
          rating: 5,
        },
      ],
      show_demo_cta: true,
      demo_cta_title: 'Want to See More?',
      demo_cta_description:
        'Explore our demo projects and see how AI-driven development can transform your business.',
      demo_cta_primary: 'View Live Demos',
      demo_cta_primary_link: { url: '#demos', linktype: 'url' },
      demo_cta_secondary: 'Download Case Studies',
      demo_cta_secondary_link: { url: '#case-studies', linktype: 'url' },
    },
    {
      _uid: 'igentx-pricing-section',
      component: 'igentx_pricing',
      badge_text: 'Transparent Pricing',
      title: 'Transparent Pricing for UAE Businesses',
      description:
        'Clear, premium packages designed for the UAE market. Every package includes Storyblok CMS from day one.',
      packages: [
        {
          name: 'Starter',
          subtitle: 'Perfect for small businesses',
          price: '2,999',
          currency: 'AED',
          price_suffix: '',
          price_note: 'One-time payment',
          features: [
            '5–7 Pages (Corporate / Company Website)',
            'Storyblok CMS (Easy Content Management)',
            'Multi-lingual Support (English + Arabic)',
            'SEO Optimized',
            'Responsive Design (Mobile-First)',
            'Hosted on Vercel (Ultra-Fast Edge Delivery)',
            '1 Month Support Included',
          ],
          includes_cms: true,
          cta_text: 'Get Started',
          cta_link: { url: '#contact', linktype: 'url' },
          additional_info: 'Perfect for startups and small businesses',
        },
        {
          name: 'Professional',
          subtitle: 'Most popular for growing businesses',
          price: '7,999',
          currency: 'AED',
          price_suffix: '',
          price_note: 'One-time payment',
          features: [
            '10–15 Pages + Blog (Storyblok CMS)',
            'Advanced SEO + Performance Audit',
            'WhatsApp Chat Integration',
            'Progressive Web App (PWA) Enabled',
            'AI Chatbot (Basic)',
            'Monthly Support (3 Months Included)',
            'Google Analytics & Search Console Setup',
            'Social Media Integration',
          ],
          includes_cms: true,
          cta_text: 'Most Popular',
          cta_link: { url: '#contact', linktype: 'url' },
          is_popular: true,
          popular_text: 'Most Popular',
          additional_info: 'Best value for growing businesses',
        },
        {
          name: 'Enterprise',
          subtitle: 'For large businesses and corporations',
          price: '14,999',
          currency: 'AED',
          price_suffix: '+',
          price_note: 'Starting price',
          features: [
            'Custom Enterprise Website',
            'Advanced Multi-lingual (Unlimited Languages)',
            'AI Chatbot + Automation (Lead Capture, FAQ)',
            'Performance Dashboard + Analytics',
            'Dedicated Priority Support (6 Months Included)',
            'Custom Integrations (CRM, ERP, etc.)',
            'Advanced Security & Compliance',
            'White-label Solutions Available',
          ],
          includes_cms: true,
          cta_text: 'Contact Sales',
          cta_link: { url: '#contact', linktype: 'url' },
          additional_info: 'Custom solutions for enterprise needs',
        },
      ],
      value_props: [
        {
          title: 'CMS Included',
          description: 'Storyblok CMS from day one - no extra charges for content updates',
        },
        {
          title: 'Multilingual Ready',
          description: 'Arabic + English support built-in for the UAE market',
        },
        {
          title: 'Lightning Fast',
          description: 'Vercel Edge hosting optimized for Middle East performance',
        },
        {
          title: 'AI-Powered',
          description: 'AI-driven development for faster delivery and better results',
        },
      ],
      faqs: [
        {
          question: 'Why is Storyblok CMS included in all packages?',
          answer:
            'We believe you should have full control over your content from day one. Unlike other agencies that charge extra for content updates, we include a professional CMS so you can manage everything yourself.',
        },
        {
          question: 'How fast can you deliver my website?',
          answer:
            'With our AI-driven approach, most Starter packages are delivered in 1-2 weeks, Professional packages in 2-3 weeks, and Enterprise solutions in 3-4 weeks. This is 60% faster than traditional development.',
        },
        {
          question: 'Do you provide ongoing support?',
          answer:
            'Yes! All packages include support ranging from 1-6 months. We also offer ongoing maintenance packages for long-term partnerships.',
        },
        {
          question: 'Can you help with Arabic content and RTL design?',
          answer:
            'Absolutely! We specialize in multilingual websites with full Arabic support, RTL (right-to-left) design, and culturally appropriate design for the UAE market.',
        },
      ],
      show_custom_quote: true,
      custom_quote_title: 'Need a Custom Solution?',
      custom_quote_description:
        'Large enterprise or have specific requirements? Let us create a tailored package that fits your business needs and budget.',
      custom_quote_cta: 'Get Custom Quote',
      custom_quote_cta_link: { url: '#contact', linktype: 'url' },
      whatsapp_number: '971501234567',
    },
  ],
}

// ============================================================================
// CONTACT PAGE CONTENT
// ============================================================================

export const defaultContactContent = {
  _uid: 'default-contact-page',
  component: 'contact_page',
  badge_text: '💬 We\'re Here to Help',
  title: 'Get In Touch With Us',
  description:
    'Have a project in mind or questions about our services? We\'d love to hear from you. Reach out to us through any of the channels below, and our team will get back to you within 24 hours.',

  // Contact Cards
  contact_cards_title: 'Contact Information',
  contact_cards: [
    {
      _uid: 'contact-whatsapp',
      component: 'contact_card',
      type: 'whatsapp',
      label: 'WhatsApp',
      value: '+971 50 123 4567',
      subtitle: '⚡ Instant response - Available 24/7',
      show_value: false, // Hide number for privacy
      highlight: true, // Make this card stand out
      whatsapp_message: 'Hello! I would like to inquire about your web development services.',
    },
    {
      _uid: 'contact-email',
      component: 'contact_card',
      type: 'email',
      label: 'Email Us',
      value: 'hello@igentx.com',
      subtitle: '📧 Quick Response',
      show_value: true,
      highlight: false,
    },
  ],
  additional_info:
    'We also speak Arabic! Feel free to contact us in your preferred language. / نحن نتحدث العربية أيضاً! لا تتردد في التواصل معنا بلغتك المفضلة.',

  // Form Section
  form_section_title: 'Send Us a Message',
  form_section_description: 'Fill out the form below and we\'ll get back to you as soon as possible.',
  form: [
    {
      _uid: 'contact-form',
      component: 'form',
      title: 'Contact Form',
      description: '',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Full Name',
          placeholder: 'John Doe',
          required: true,
          validation: [
            {
              type: 'required',
              message: 'Name is required',
            },
            {
              type: 'minLength',
              value: 2,
              message: 'Name must be at least 2 characters',
            },
          ],
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          placeholder: 'john@example.com',
          required: true,
          validation: [
            {
              type: 'required',
              message: 'Email is required',
            },
            {
              type: 'email',
              message: 'Please enter a valid email address',
            },
          ],
        },
        {
          id: 'phone',
          type: 'text',
          label: 'Phone Number',
          placeholder: '+971 50 123 4567',
          required: false,
        },
        {
          id: 'company',
          type: 'text',
          label: 'Company Name',
          placeholder: 'Your Company',
          required: false,
        },
        {
          id: 'service',
          type: 'select',
          label: 'Service Interested In',
          required: true,
          options: [
            { label: 'Website Development', value: 'website-dev' },
            { label: 'E-Commerce Development', value: 'ecommerce' },
            { label: 'Mobile App Development', value: 'mobile-app' },
            { label: 'CMS Integration', value: 'cms' },
            { label: 'UI/UX Design', value: 'design' },
            { label: 'Consulting', value: 'consulting' },
            { label: 'Other', value: 'other' },
          ],
          validation: [
            {
              type: 'required',
              message: 'Please select a service',
            },
          ],
        },
        {
          id: 'budget',
          type: 'select',
          label: 'Estimated Budget',
          required: false,
          options: [
            { label: 'Less than AED 10,000', value: 'under-10k' },
            { label: 'AED 10,000 - AED 25,000', value: '10k-25k' },
            { label: 'AED 25,000 - AED 50,000', value: '25k-50k' },
            { label: 'AED 50,000 - AED 100,000', value: '50k-100k' },
            { label: 'More than AED 100,000', value: 'over-100k' },
            { label: 'Not sure yet', value: 'unsure' },
          ],
        },
        {
          id: 'message',
          type: 'textarea',
          label: 'Project Details',
          placeholder: 'Tell us about your project, goals, and timeline...',
          required: true,
          validation: [
            {
              type: 'required',
              message: 'Message is required',
            },
            {
              type: 'minLength',
              value: 20,
              message: 'Please provide at least 20 characters',
            },
          ],
        },
      ],
      submit_button_text: 'Send Message',
      success_message:
        'Thank you for contacting us! We\'ll get back to you within 24 hours.',
      error_message:
        'Oops! Something went wrong. Please try again or contact us directly at hello@igentx.com',
      email_subject: 'New Contact Form Submission - IGENTX',
      email_body_description:
        'You have received a new contact form submission from your website.',
      recipient_email: 'hello@igentx.com',
      sender_email: 'noreply@igentx.com',
      sender_name: 'IGENTX Contact Form',
    },
  ],

  // Map Section
  show_map: false,
  map_section_title: 'Find Us',
  map_embed_url: '',
}

// ============================================================================
// EXPORT ALIAS FOR BACKWARD COMPATIBILITY
// ============================================================================

export const defaultPageContent = igentxDefaultPageContent
