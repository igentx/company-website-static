/**
 * TypeScript type definitions for CMS content blocks
 */

export interface SbBlokData {
  _uid: string
  component: string
  [key: string]: unknown
}

export interface StoryblokStory {
  id: number
  uuid: string
  name: string
  slug: string
  full_slug: string
  created_at: string
  published_at: string
  first_published_at: string
  content: Record<string, unknown>
  position: number
  tag_list: string[]
  is_startpage: boolean
  parent_id: number | null
  meta_data: Record<string, unknown>
  group_id: string
  alternates: Record<string, unknown>[]
  translated_slugs: Record<string, unknown>[]
  lang: string
}

export interface HeroBlok extends SbBlokData {
  component: 'hero'
  title: string
  subtitle?: string
  background_image?: {
    filename: string
    alt: string
  }
  cta_text?: string
  cta_link?: {
    url: string
    linktype: string
  }
}

export interface FeatureBlok extends SbBlokData {
  component: 'features'
  title: string
  description: string
  icon?: {
    filename: string
    alt: string
  }
  features?: {
    title: string
    description: string
  }[]
}

export interface AboutBlok extends SbBlokData {
  component: 'about'
  title: string
  content: string
  image?: {
    filename: string
    alt: string
  }
  team_members?: {
    name: string
    position: string
    bio: string
    photo?: {
      filename: string
      alt: string
    }
  }[]
}

// Form Field Block - Generic, reusable form field component
export interface FormFieldBlok extends SbBlokData {
  component: 'form_field'
  field_id: string // Unique identifier for the field
  field_type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'url'
  label: string
  placeholder?: string
  required?: boolean
  default_value?: string
  help_text?: string // Helper text below the field

  // For select, checkbox, radio
  options?: string // Comma-separated or newline-separated options (e.g., "Option 1, Option 2")

  // Validation
  validation_regex?: string // Custom regex pattern
  validation_message?: string // Custom validation error message
  min_length?: number
  max_length?: number
  min_value?: number // For number/date fields
  max_value?: number // For number/date fields

  // Styling
  field_width?: 'full' | 'half' | 'third' | 'two-thirds'

  // Advanced
  autocomplete?: string // HTML autocomplete attribute
  multiple?: boolean // For select fields
}

// Legacy types for backward compatibility
export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern'
  value?: string | number
  message: string
}

export interface FormField {
  id: string
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio'
  label: string
  placeholder?: string
  required: boolean
  options?: { label: string; value: string }[]
  validation?: ValidationRule[]
}

// Form component blok
export interface FormBlok extends SbBlokData {
  component: 'form'
  title: string
  description?: string

  // New approach: Use nested form_field blocks
  form_fields?: FormFieldBlok[]

  // Legacy approach: JSON field configuration (for backward compatibility)
  fields?: FormField[]

  submit_button_text: string
  success_message: string
  error_message: string

  // Email settings
  email_subject: string
  email_body_description?: string
  recipient_email: string
  sender_email?: string
  sender_name?: string
}

// Breadcrumb item for custom breadcrumbs
export interface BreadcrumbItemBlok extends SbBlokData {
  component: 'breadcrumb_item'
  name: string
  url: string
}

// SEO Block for comprehensive SEO management
export interface SEOBlok extends SbBlokData {
  component: 'seo'
  // Basic SEO
  title?: string
  description?: string
  keywords?: string
  canonical_url?: string
  focus_keyword?: string
  seo_score?: 'poor' | 'good' | 'excellent'

  // Open Graph / Social Media
  og_title?: string
  og_description?: string
  og_image?: {
    filename: string
    alt: string
  }
  og_type?: 'website' | 'article' | 'product' | 'profile'

  // Twitter Card
  twitter_title?: string
  twitter_description?: string
  twitter_image?: {
    filename: string
    alt: string
  }
  twitter_card_type?: 'summary' | 'summary_large_image' | 'app' | 'player'

  // Advanced SEO
  robots_index?: boolean
  robots_follow?: boolean
  robots_noarchive?: boolean
  robots_nosnippet?: boolean
  priority?: '0.1' | '0.3' | '0.5' | '0.8' | '1.0'
  change_frequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

  // Structured Data
  structured_data_type?:
  | 'WebSite'
  | 'Organization'
  | 'LocalBusiness'
  | 'Article'
  | 'BlogPosting'
  | 'Product'
  | 'Event'
  | 'FAQ'
  | 'BreadcrumbList'
  | 'Custom'
  structured_data_custom?: string // JSON string for custom structured data

  // Additional meta tags
  author?: string
  publisher?: string
  article_published_time?: string
  article_modified_time?: string
  article_author?: string
  article_section?: string
  article_tags?: string

  // Language and localization
  language?: string
  alternate_languages?: {
    language: string
    url: string
  }[]

  // Custom breadcrumbs
  breadcrumb_override?: BreadcrumbItemBlok[]
}

// IGENTX Hero Block - Enhanced hero with AI-driven messaging
// Hero Slide Item - Individual slide in the hero slider
// Hero Slide - Matches ServiceHeroBlok fields exactly for consistency
export interface HeroSlideBlok extends SbBlokData {
  component: 'hero_slide'
  // Primary fields (matching ServiceHero)
  category?: string // Category badge (e.g., "Web Development")
  title: string // Main slide title
  summary?: string // Supporting description
  featured_image?: {
    filename: string
    alt: string
  }
  quick_features?: string | string[] // Feature bullet points
  pricing_preview?: string // Starting price (e.g., "AED 4,999")
  duration?: string // Timeline (e.g., "2-3 weeks")
  cta_text?: string // CTA button label
  cta_link?: {
    url: string
    linktype: string
  }
  // Deprecated fields (kept for backward compatibility)
  badge_text?: string // DEPRECATED: Use 'category' instead
  headline_part1?: string // DEPRECATED: Use 'title' instead
  headline_part2?: string // DEPRECATED: Not used
  headline_part3?: string // DEPRECATED: Not used
  subheadline?: string // DEPRECATED: Use 'summary' instead
  primary_cta_text?: string // DEPRECATED: Use 'cta_text' instead
  primary_cta_link?: {
    url: string
    linktype: string
  }
  secondary_cta_text?: string // DEPRECATED: Not used
  secondary_cta_link?: {
    url: string
    linktype: string
  }
  background_image?: {
    filename: string
    alt: string
  }
  background_video?: {
    filename: string
    alt: string
  }
  trust_signals?: TrustSignalItemBlok[] // DEPRECATED: Not used
}

export interface IGENTXHeroBlok extends SbBlokData {
  component: 'igentx_hero'
  // Slider-only mode - requires slides
  slides: HeroSlideBlok[]
  enable_autoplay?: boolean
  autoplay_delay?: number | string
}

// Trust Band Block - Metrics and partner logos below hero
export interface TrustBandMetricBlok extends SbBlokData {
  component: 'trust_band_metric'
  value: string
  label: string
  description?: string
  icon_key?: string
}

export interface TrustBandPartnerBlok extends SbBlokData {
  component: 'trust_band_partner'
  name?: string
  icon?: {
    filename: string
    alt?: string
  }
}

export interface TrustBandValuePropBlok extends SbBlokData {
  component: 'trust_band_value_prop'
  title: string
  description: string
  icon_key?: string
}

export interface IGENTXTrustBandBlok extends SbBlokData {
  component: 'igentx_trust_band'
  badge_text?: string
  title?: string
  description?: string
  metrics?: TrustBandMetricBlok[]
  partner_logos?: TrustBandPartnerBlok[]
  value_props?: TrustBandValuePropBlok[]
}

// Final CTA Band Block
export interface IGENTXCtaBandBlok extends SbBlokData {
  component: 'igentx_cta_band'
  title: string
  description?: string
  primary_cta_text?: string
  primary_cta_link?: {
    url: string
    linktype: string
    cached_url?: string
  }
  secondary_cta_text?: string
  secondary_cta_link?: {
    url: string
    linktype: string
    cached_url?: string
  }
}

// Trust Signal Item Block - Individual trust signal
export interface TrustSignalItemBlok extends SbBlokData {
  component: 'trust_signal_item'
  value: string
  label: string
}

// Speed Comparison Point - Individual comparison item
export interface SpeedComparisonPointBlok extends SbBlokData {
  component: 'speed_comparison_point'
  text: string
  enabled: boolean
}

// Why Choose IGENTX Block - Differentiator section
export interface WhyChooseIGENTXBlok extends SbBlokData {
  component: 'why_choose_igentx'
  badge_text?: string
  title: string
  description?: string
  features?: {
    title: string
    description: string
    highlight?: string
    icon?: {
      filename: string
      alt: string
    }
  }[]
  uae_signals_title?: string
  uae_signals_description?: string
  uae_signals?: {
    title: string
    description: string
    icon?: {
      filename: string
      alt: string
    }
  }[]
  show_speed_comparison?: boolean
  speed_comparison_title?: string
  speed_comparison_description?: string
  // Enhanced speed comparison with CMS control
  traditional_approach_title?: string
  traditional_approach_points?: SpeedComparisonPointBlok[]
  igentx_approach_title?: string
  igentx_advantage_label?: string
  igentx_approach_points?: SpeedComparisonPointBlok[]
}

// IGENTX Products Block - Home page product offerings
export interface ProductLink {
  url: string
  linktype: string
  cached_url?: string
}

export interface ProductFeaturePill {
  label: string
  icon?: string
}

export interface ProductStat {
  label?: string
  value: string
}

export interface FeaturedProductBlok {
  badge_text?: string
  logo: ServiceImage
  title: string
  tagline?: string
  description: string
  brand_link?: {
    text: string
    url: string
  }
  feature_pills?: ProductFeaturePill[]
  trust_banner?: string
  cta_text?: string
  cta_link?: ProductLink
  screenshot: ServiceImage
}

export interface ProductSolutionBlok {
  badge_text?: string
  title: string
  description: string
  feature_pills?: string[]
  stats?: ProductStat[]
  cta_text?: string
  cta_link?: ProductLink
  image: ServiceImage
}

export interface ComingSoonProductBlok {
  badge_text?: string
  title: string
  description: string
  category_pills?: string[]
  image: ServiceImage
}

export interface IGENTXProductsBlok extends SbBlokData {
  component: 'igentx_products'
  badge_text?: string
  title: string
  description?: string
  featured_product?: FeaturedProductBlok
  ai_product?: ProductSolutionBlok
  coming_soon?: ComingSoonProductBlok
  cta_text?: string
  cta_link?: ProductLink
}

// IGENTX Services Block - Service offerings
export interface IGENTXServicesBlok extends SbBlokData {
  component: 'igentx_services'
  badge_text?: string
  title: string
  description?: string
  services?: {
    title: string
    description: string
    problem?: string
    solution?: string
    outcome?: string
    image?: {
      filename: string
      alt: string
    }
    features?: string[] | string
    price_range?: string
    cta_text?: string
    cta_link?: {
      url: string
      linktype: string
      cached_url?: string
    }
    is_popular?: boolean
  }[]
  show_tech_stack?: boolean
  tech_stack_badge?: string
  tech_stack_title?: string
  tech_stack_description?: string
  tech_categories?: {
    title: string
    description?: string
    icon_key?: string
    width?: 'full' | '3/4' | '1/2' | '1/3' | '1/4'
    technologies?: {
      name: string
      icon?: {
        filename: string
        alt: string
      }
    }[]
  }[]
  tech_benefits?: {
    title: string
    description: string
    icon_key?: string
  }[]
  process_title?: string
  process_description?: string
  process_steps?: {
    title: string
    description: string
    duration?: string
  }[]
  cta_title?: string
  cta_description?: string
  cta_text?: string
  cta_link?: {
    url: string
    linktype: string
  }
}

// IGENTX Portfolio Block - Case studies and success stories
export interface IGENTXPortfolioBlok extends SbBlokData {
  component: 'igentx_portfolio'
  badge_text?: string
  title: string
  description?: string
  case_studies?: {
    title: string
    description: string
    category?: string
    industry?: string
    country?: string
    challenge?: string
    image?: {
      filename: string
      alt: string
    }
    results?: {
      value: string
      metric: string
    }[]
    technologies?: string[] | string
    live_url?: string
    case_study_url?: string
  }[]
  show_performance_comparison?: boolean
  performance_title?: string
  performance_description?: string
  performance_metrics?: {
    metric_name: string
    before: string
    after: string
    improvement: string
  }[]
  testimonials_title?: string
  testimonials_description?: string
  testimonials?: {
    content: string
    name: string
    position: string
    company?: string
    country?: string
    verified?: boolean
    rating?: number | string
    avatar?: {
      filename: string
      alt: string
    }
  }[]
  show_demo_cta?: boolean
  demo_cta_title?: string
  demo_cta_description?: string
  demo_cta_primary?: string
  demo_cta_primary_link?: {
    url: string
    linktype: string
  }
  demo_cta_secondary?: string
  demo_cta_secondary_link?: {
    url: string
    linktype: string
  }
}

// IGENTX Pricing Block - UAE market focused packages
export interface IGENTXPricingBlok extends SbBlokData {
  component: 'igentx_pricing'
  badge_text?: string
  title: string
  description?: string
  show_pricing_toggle?: boolean
  toggle_option1?: string
  toggle_option2?: string
  packages?: {
    name: string
    subtitle?: string
    price: string
    currency?: string
    price_suffix?: string
    price_note?: string
    features?: string[] | string
    includes_cms?: boolean
    cta_text?: string
    cta_link?: {
      url: string
      linktype: string
    }
    is_popular?: boolean
    popular_text?: string
    additional_info?: string
    icon?: {
      filename: string
      alt: string
    }
  }[]
  value_props_title?: string
  value_props_description?: string
  value_props?: {
    title: string
    description: string
    icon?: {
      filename: string
      alt: string
    }
  }[]
  show_custom_quote?: boolean
  custom_quote_title?: string
  custom_quote_description?: string
  custom_quote_cta?: string
  custom_quote_cta_link?: {
    url: string
    linktype: string
  }
  whatsapp_number?: string
}

// New FAQ Block - Independent FAQ section
export interface FAQBlok extends SbBlokData {
  component: 'faq'
  faq_title?: string
  faq_description?: string
  background_color?: string
  faqs: {
    question: string
    answer: string
    category?: string
  }[]
  initial_visible_count?: number
}

export interface PageBlok extends SbBlokData {
  component: 'page'
  title: string
  seo?: SEOBlok // Optional page-specific SEO
  body: (
    | HeroBlok
    | FeatureBlok
    | AboutBlok
    | FormBlok
    | IGENTXHeroBlok
    | IGENTXTrustBandBlok
    | WhyChooseIGENTXBlok
    | IGENTXProductsBlok
    | IGENTXServicesBlok
    | IGENTXPortfolioBlok
    | IGENTXCtaBandBlok
    | IGENTXPricingBlok
  )[]
}

// Header content type with global SEO
// Navigation item used in Storyblok header/footer bloks (supports nesting)
export interface NavigationItemBlok extends SbBlokData {
  component: 'navigation_items'
  label: string
  link?: {
    url?: string
    linktype?: string
    cached_url?: string
  }
  // Nested child links (dropdown/mega menu)
  children?: NavigationItemBlok[]
}

// Header content type with global SEO (Storyblok)
// Backward compatible with earlier "header" component, but actual implementation uses "header_navigation"
export interface HeaderBlok extends SbBlokData {
  component: 'header' | 'header_navigation'
  // New schema (preferred)
  navigation_items?: NavigationItemBlok[]
  logo_text?: string
  logo?: {
    filename: string
    alt: string
  }
  global_seo?: SEOBlok // Global/default SEO settings
  // Legacy schema (kept for compatibility with older content)
  navigation?: NavigationItem[]
}

// Footer content type
// Advanced Footer blok (aligning with component mapping 'footer_content')
export interface FooterBlok extends SbBlokData {
  component: 'footer' | 'footer_content'
  // Branding
  brand_name?: string
  brand_logo?: { filename: string; alt?: string }
  description?: string

  // Legacy single links list (kept for compatibility)
  footer_links?: {
    _uid?: string
    component?: 'footer_links'
    label?: string
    lable?: string // legacy typo support
    link?: { url?: string; linktype?: string; cached_url?: string }
  }[]

  // Link groups for multi-column layout
  link_groups?: {
    title?: string
    links?: {
      _uid?: string
      component?: 'footer_links'
      label?: string
      lable?: string // legacy typo support
      link?: { url?: string; linktype?: string; cached_url?: string }
    }[]
  }[]

  // Social links
  social_links?: {
    _uid?: string
    component?: 'social_links'
    platform?: 'github' | 'twitter' | 'linkedin' | 'facebook' | 'instagram' | string
    flatform?: Array<'github' | 'twitter' | 'linkedin' | 'facebook' | 'instagram' | string>
    url?: string
    icon?: { filename: string; alt?: string }
  }[]

  // Contact information
  contact_info?: {
    address?: string
    email?: string
    phone?: string
    whatsapp?: string
    hours?: string
    map_url?: string
  }

  // Newsletter subscription block
  newsletter?: {
    enabled?: boolean
    title?: string
    description?: string
    placeholder?: string
    submit_label?: string
    privacy_text?: string
    action_url?: string // optional external service endpoint
  }

  // Legal area
  legal_links?: {
    _uid?: string
    component?: 'footer_links'
    label?: string
    lable?: string
    link?: { url?: string; linktype?: string; cached_url?: string }
  }[]
  copyright_text?: string
}

export interface NavigationItem {
  name: string
  href: string
  current?: boolean
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  navigation: NavigationItem[]
  social: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}

// Language and internationalization types
export interface Language {
  code: string
  name: string
  flag: string
  direction: 'ltr' | 'rtl'
}

export interface LanguageContextType {
  currentLanguage: string
  languages: Language[]
  changeLanguage: (langCode: string) => void
  isRTL: boolean
  createLanguageAwareUrl: (path: string, targetLang?: string) => string
  navigateTo: (path: string) => void
}

// Case Study Types
export interface CaseStudyMetric {
  value: string
  label: string
  description?: string
}

export interface CaseStudyImage {
  filename: string
  alt: string
}

export interface CaseStudyStat {
  value: string
  label: string
}

// CaseStudyCard Block - Individual card for listing pages
export interface CaseStudyCardBlok extends SbBlokData {
  component: 'case_study_card'
  title: string
  excerpt?: string
  featured_image?: CaseStudyImage
  client_name?: string
  category?: string
  tags?: string[] | string
  key_metrics?: CaseStudyMetric[]
  link?: {
    url?: string
    cached_url?: string
    linktype?: string
  }
}

// CaseStudyGrid Block - Main listing component
export interface CaseStudyGridBlok extends SbBlokData {
  component: 'case_study_grid'
  title?: string
  description?: string
  badge_text?: string
  case_studies?: CaseStudyCardBlok[]
  show_filters?: boolean
  filter_categories?: string[]
  cta_text?: string
  cta_link?: {
    url: string
    linktype: string
  }
}

// CaseStudyHero Block - Hero section for detail pages
export interface CaseStudyHeroBlok extends SbBlokData {
  component: 'case_study_hero'
  title: string
  summary?: string
  featured_image?: CaseStudyImage
  category?: string
  client_name?: string
  industry?: string
  project_duration?: string
  location?: string
  quick_stats?: CaseStudyStat[]
  back_link?: {
    url?: string
    cached_url?: string
    linktype: string
  }
  project_url?: {
    url?: string
    cached_url?: string
    linktype?: string
  }
  primary_cta_text?: string
}

export interface CaseStudyServiceLink {
  label: string
  url: string
}

export interface CaseStudyRelatedItem {
  title: string
  excerpt?: string
  client_name?: string
  featured_image?: CaseStudyImage
  link?: {
    url?: string
    cached_url?: string
    linktype?: string
  }
}

// CaseStudyDetail Block - Detailed content for case study pages
export interface CaseStudyDetailBlok extends SbBlokData {
  component: 'case_study_detail'
  client_name?: string
  client_logo?: CaseStudyImage
  category?: string
  project_date?: string
  // Richtext fields can be Storyblok JSON (doc) or legacy HTML string
  content?: any
  challenge?: any
  solution?: any
  outcome?: any
  project_images?: CaseStudyImage[]
  results_metrics?: CaseStudyMetric[]
  service_links?: CaseStudyServiceLink[]
  // Accept comma-separated string or array from CMS
  technologies?: string | string[]
  testimonial_text?: string
  testimonial_author?: string
  testimonial_role?: string
  project_url?: {
    url?: string
    cached_url?: string
    linktype?: string
  }
}

// CaseStudyRelated Block - Related case studies on detail pages
export interface CaseStudyRelatedBlok extends SbBlokData {
  component: 'case_study_related'
  title?: string
  related_case_studies?: CaseStudyRelatedItem[]
}

// ============================================
// BLOG SYSTEM TYPES
// ============================================

// Blog Image/Asset type
export interface BlogImage {
  filename: string
  alt?: string
  title?: string
  copyright?: string
}

// Generic content blocks for blog detail pages
export interface BlogHeadingBlok extends SbBlokData {
  component: 'blog_heading'
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  text: string
  alignment?: 'left' | 'center' | 'right'
}

export interface BlogBodyBlok extends SbBlokData {
  component: 'blog_body'
  content?: any // Richtext field
  alignment?: 'left' | 'center' | 'right'
}

export interface BlogImageBlok extends SbBlokData {
  component: 'blog_image'
  image: BlogImage
  caption?: string
  width?: 'full' | 'large' | 'medium' | 'small'
  alignment?: 'left' | 'center' | 'right'
}

export interface BlogQuoteBlok extends SbBlokData {
  component: 'blog_quote'
  text: string
  author?: string
  author_role?: string
  background_color?: string
}

export interface BlogTextWithImageBlok extends SbBlokData {
  component: 'blog_text_with_image'
  text?: any // Richtext field
  image: BlogImage
  image_position?: 'left' | 'right'
  background_color?: string
}

// Blog Card Block - Preview card for listing pages
export interface BlogCardBlok extends SbBlokData {
  component: 'blog_card'
  title: string
  excerpt: string
  featured_image: BlogImage
  author_name?: string
  publish_date?: string
  category?: string
  tags?: string | string[]
  reading_time?: string
  link?: {
    url: string
    linktype: string
    cached_url?: string
  }
}

export interface BlogTopicLinkBlok extends SbBlokData {
  component: 'blog_topic_link'
  title: string
  description?: string
  link?: {
    url: string
    linktype: string
    cached_url?: string
  }
}

// Blog Grid Block - Landing page grid
export interface BlogGridBlok extends SbBlokData {
  component: 'blog_grid'
  title?: string
  description?: string
  badge_text?: string
  intro_text?: string
  featured_blog?: BlogCardBlok
  blogs: BlogCardBlok[]
  columns?: number | string
  show_filters?: boolean
  filter_categories?: string | string[]
  topic_links?: BlogTopicLinkBlok[]
  cta_text?: string
  cta_link?: {
    url: string
    linktype: string
    cached_url?: string
  }
}

// Blog Hero Block - Detail page hero
export interface BlogHeroBlok extends SbBlokData {
  component: 'blog_hero'
  title: string
  excerpt?: string
  featured_image?: BlogImage
  category?: string
  author_name?: string
  publish_date?: string
  reading_time?: string
  back_link?: {
    url: string
    linktype: string
  }
}

// Legal Page Block - Privacy policy, terms of service, and similar documents
export interface LegalPageBlok extends SbBlokData {
  component: 'legal_page'
  title: string
  last_updated?: string
  content_blocks?: Array<BlogHeadingBlok | BlogBodyBlok>
}

export interface BlogKeyTakeawaysBlok extends SbBlokData {
  component: 'blog_key_takeaways'
  title?: string
  items: string[] | string
}

// Blog Detail Block - Main container for blog content
export interface BlogDetailBlok extends SbBlokData {
  component: 'blog_detail'
  author_name?: string
  author_avatar?: BlogImage
  author_bio?: string
  author_role?: string
  category?: string
  publish_date?: string
  updated_date?: string
  reading_time?: string
  tags?: string | string[]
  key_takeaways?: string[] | string
  show_toc?: boolean
  content_blocks?: Array<
    | BlogHeadingBlok
    | BlogBodyBlok
    | BlogImageBlok
    | BlogQuoteBlok
    | BlogTextWithImageBlok
    | BlogKeyTakeawaysBlok
  >
  related_posts?: BlogCardBlok[]
  cta_section_title?: string
  cta_section_text?: string
  cta_button_text?: string
  cta_button_link?: {
    url: string
    linktype: string
    cached_url?: string
  }
}

// ============================================
// SERVICES SYSTEM TYPES
// ============================================

// Service Image/Asset type
export interface ServiceImage {
  filename: string
  alt?: string
  title?: string
  copyright?: string
}

// Service Feature Item
export interface ServiceFeature {
  title: string
  description?: string
  icon?: ServiceImage
}

// Service Pricing Tier
export interface ServicePricingTier {
  name: string
  price: string
  currency?: string
  duration?: string
  description?: string
  features?: string | string[]
  is_popular?: boolean // Mark as "Most Popular"
  is_recommended?: boolean // Mark as "Recommended"
  highlight_badge?: string // Custom badge text (overrides popular/recommended)
}

// Service Card Block - Preview card for listing pages
export interface ServiceCardBlok extends SbBlokData {
  component: 'service_card'
  title: string
  excerpt: string
  problem?: string
  audience?: string
  benefits?: string
  featured_image: ServiceImage
  icon?: ServiceImage
  category?: string
  tags?: string | string[]
  pricing_preview?: string
  key_features?: string | string[]
  link?: {
    url: string
    linktype: string
    cached_url?: string
  }
  is_popular?: boolean
}

// Service Grid Block - Landing page grid
export interface ServiceGridBlok extends SbBlokData {
  component: 'service_grid'
  title?: string
  description?: string
  badge_text?: string
  services: ServiceCardBlok[]
  columns?: number
  show_filters?: boolean
  filter_categories?: string | string[]
  cta_text?: string
  cta_link?: {
    url: string
    linktype: string
    cached_url?: string
  }
}

// Service Hero Block - Detail page hero
export interface ServiceHeroBlok extends SbBlokData {
  component: 'service_hero'
  title: string
  summary?: string
  subtitle?: string
  featured_image?: ServiceImage
  category?: string
  badge_text?: string
  pricing_preview?: string
  duration?: string
  quick_features?: string | string[]
  back_link?: {
    url: string
    linktype: string
    cached_url?: string
  }
  back_link_label?: string
  cta_text?: string
  cta_link?: {
    url: string
    linktype: string
    cached_url?: string
  }
  secondary_cta_text?: string
  secondary_cta_link?: {
    url: string
    linktype: string
    cached_url?: string
  }
  hero_images?: ServiceImage[]
  enable_image_autoplay?: boolean
  image_autoplay_delay?: string | number
}

// Generic content blocks for service detail pages
export interface ServiceHeadingBlok extends SbBlokData {
  component: 'service_heading'
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  text: string
  alignment?: 'left' | 'center' | 'right'
}

export interface ServiceBodyBlok extends SbBlokData {
  component: 'service_body'
  content?: any // Richtext field
  alignment?: 'left' | 'center' | 'right'
}

export interface ServiceImageBlok extends SbBlokData {
  component: 'service_image'
  image: ServiceImage
  caption?: string
  width?: 'full' | 'large' | 'medium' | 'small'
  alignment?: 'left' | 'center' | 'right'
}

export interface ServiceFeatureListBlok extends SbBlokData {
  component: 'service_feature_list'
  title?: string
  features: ServiceFeature[]
  layout?: 'grid' | 'list'
  columns?: number
}

// Service Detail Block - Main container for service content
export interface ServiceDetailBlok extends SbBlokData {
  component: 'service_detail'
  category?: string
  overview?: any // Richtext field
  what_you_get_title?: string
  what_you_get?: string | string[]
  process_title?: string
  process_steps?: {
    title: string
    description: string
    duration?: string
  }[]
  technologies?: string | string[]
  pricing_tiers?: ServicePricingTier[]
  content_blocks?: Array<
    | ServiceHeadingBlok
    | ServiceBodyBlok
    | ServiceImageBlok
    | ServiceFeatureListBlok
  >
  related_services?: ServiceCardBlok[]
  cta_section_title?: string
  cta_section_text?: string
  cta_button_text?: string
  cta_button_link?: {
    url: string
    linktype: string
  }
}

// ============================================
// CONTACT PAGE TYPES
// ============================================

// Contact Card for contact page
export interface ContactCardBlok extends SbBlokData {
  component: 'contact_card'
  type: 'phone' | 'email' | 'whatsapp' | 'location' | 'hours' | 'website'
  label: string
  value: string
  subtitle?: string
  show_value?: boolean // Toggle to show/hide the value (useful for privacy)
  highlight?: boolean // Highlight this card to make it stand out
  icon?: {
    filename: string
    alt?: string
  }
  map_link?: string // For location type
  whatsapp_message?: string // For WhatsApp type
}

// Contact Page Block - Main contact page component
export interface ContactPageBlok extends SbBlokData {
  component: 'contact_page'
  // Hero Section
  badge_text?: string
  title: string
  description?: string

  // Contact Cards Section
  contact_cards_title?: string
  contact_cards?: ContactCardBlok[]
  additional_info?: string

  // Form Section
  form_section_title?: string
  form_section_description?: string
  form?: FormBlok[]

  // Map Section
  show_map?: boolean
  map_section_title?: string
  map_embed_url?: string
}

// ============================================
// FLOATING CONTACT BUTTON TYPES
// ============================================

// Social Link for Floating Contact Button
export interface FloatingContactSocialLink extends SbBlokData {
  component: 'social_link'
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'snapchat' | string
  url: string
  icon?: {
    filename: string
    alt?: string
  }
}

// Floating Contact Button Block
export interface FloatingContactButtonBlok extends SbBlokData {
  component: 'floating_contact_button'
  enabled?: boolean
  button_label?: string
  modal_title?: string
  modal_subtitle?: string
  modal_footer_text?: string
  phone?: string
  phone_label?: string
  email?: string
  email_label?: string
  whatsapp_number?: string
  whatsapp_label?: string
  whatsapp_message?: string
  address?: string
  address_label?: string
  social_links_title?: string
  social_links?: FloatingContactSocialLink[]
  button_position?: 'bottom-right' | 'bottom-left'
  button_color?: 'blue' | 'green' | 'purple' | 'orange'
  show_notification_badge?: boolean
}
