'use client'

import type { ReactNode } from 'react'
import { render } from 'storyblok-rich-text-react-renderer'

interface RichTextProps {
  doc: unknown
}

export function RichText({ doc }: RichTextProps) {
  if (!doc || typeof doc !== 'object') return null
  return <>{render(doc as Parameters<typeof render>[0])}</>
}

interface BlockRendererProps {
  blok: { component?: string; _uid?: string; [key: string]: unknown }
  [key: string]: unknown
}

export function BlockRenderer({ blok, ...rest }: BlockRendererProps) {
  if (!blok?.component) return null
  const Component = blockRegistry[blok.component]
  if (!Component) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Unknown block component: ${blok.component}`)
    }
    return null
  }
  return <Component blok={blok} {...rest} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BlockComponent = React.ComponentType<any>

import Features from '@/components/blocks/Features'
import About from '@/components/blocks/About'
import Page from '@/components/blocks/Page'
import HeaderNavigation from '@/components/blocks/HeaderNavigation'
import FooterContent from '@/components/blocks/FooterContent'
import NavigationItem from '@/components/blocks/NavigationItem'
import SocialLink from '@/components/blocks/SocialLink'
import FooterLink from '@/components/blocks/FooterLink'
import SEO from '@/components/blocks/SEO'
import InfoBar from '@/components/blocks/InfoBar'
import IGENTXHero from '@/components/blocks/IGENTXHero'
import IGENTXTrustBand from '@/components/blocks/IGENTXTrustBand'
import IGENTXCtaBand from '@/components/blocks/IGENTXCtaBand'
import WhyChooseIGENTX from '@/components/blocks/WhyChooseIGENTX'
import IGENTXProducts from '@/components/blocks/IGENTXProducts'
import IGENTXServices from '@/components/blocks/IGENTXServices'
import IGENTXPortfolio from '@/components/blocks/IGENTXPortfolio'
import IGENTXPricing from '@/components/blocks/IGENTXPricing'
import FAQ from '@/components/blocks/FAQ'
import CaseStudyCard from '@/components/blocks/CaseStudyCard'
import CaseStudyGrid from '@/components/blocks/CaseStudyGrid'
import CaseStudyHero from '@/components/blocks/CaseStudyHero'
import CaseStudyDetail from '@/components/blocks/CaseStudyDetail'
import BlogHeading from '@/components/blocks/blog/BlogHeading'
import BlogBody from '@/components/blocks/blog/BlogBody'
import BlogImage from '@/components/blocks/blog/BlogImage'
import BlogQuote from '@/components/blocks/blog/BlogQuote'
import BlogTextWithImage from '@/components/blocks/blog/BlogTextWithImage'
import BlogCard from '@/components/blocks/blog/BlogCard'
import BlogGrid from '@/components/blocks/blog/BlogGrid'
import BlogHero from '@/components/blocks/blog/BlogHero'
import BlogDetail from '@/components/blocks/blog/BlogDetail'
import BlogKeyTakeaways from '@/components/blocks/blog/BlogKeyTakeaways'
import Form from '@/components/blocks/contact/Form'
import ContactPage from '@/components/blocks/contact/ContactPage'
import GenericForm from '@/components/blocks/contact/GenericForm'
import FormField from '@/components/blocks/contact/FormField'
import ServiceCard from '@/components/blocks/services/ServiceCard'
import ServiceGrid from '@/components/blocks/services/ServiceGrid'
import ServiceHero from '@/components/blocks/services/ServiceHero'
import ServiceDetail from '@/components/blocks/services/ServiceDetail'
import LegalPage from '@/components/blocks/LegalPage'

export const blockRegistry: Record<string, BlockComponent> = {
  features: Features,
  about: About,
  page: Page,
  header_navigation: HeaderNavigation,
  footer_content: FooterContent,
  navigation_items: NavigationItem,
  social_links: SocialLink,
  footer_links: FooterLink,
  seo: SEO,
  info_bar: InfoBar,
  igentx_hero: IGENTXHero,
  igentx_trust_band: IGENTXTrustBand,
  why_choose_igentx: WhyChooseIGENTX,
  igentx_products: IGENTXProducts,
  igentx_services: IGENTXServices,
  igentx_portfolio: IGENTXPortfolio,
  igentx_cta_band: IGENTXCtaBand,
  igentx_pricing: IGENTXPricing,
  faq: FAQ,
  case_study_card: CaseStudyCard,
  case_study_grid: CaseStudyGrid,
  case_study_hero: CaseStudyHero,
  case_study_detail: CaseStudyDetail,
  blog_heading: BlogHeading,
  blog_body: BlogBody,
  blog_image: BlogImage,
  blog_quote: BlogQuote,
  blog_text_with_image: BlogTextWithImage,
  blog_card: BlogCard,
  blog_grid: BlogGrid,
  blog_hero: BlogHero,
  blog_detail: BlogDetail,
  blog_key_takeaways: BlogKeyTakeaways,
  contact: Form,
  form: Form,
  contact_page: ContactPage,
  generic_form: GenericForm,
  form_field: FormField,
  service_card: ServiceCard,
  service_grid: ServiceGrid,
  service_hero: ServiceHero,
  service_detail: ServiceDetail,
  legal_page: LegalPage,
}

export function renderBlock(blok: BlockRendererProps['blok']): ReactNode {
  return <BlockRenderer blok={blok} />
}
