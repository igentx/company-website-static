import { SEOBlok } from '@/lib/types'

/**
 * SEO component - This component doesn't render visible content
 * It's used as a data container for SEO information in Storyblok
 * The actual SEO tags are rendered in the page metadata
 */
interface SEOProps {
  blok: SEOBlok
}

export default function SEO({ blok }: SEOProps) {
  // This component doesn't render any visible content
  // It's just a data container for the Storyblok visual editor
  return (
    <div className="hidden">
      {/* SEO data container - not visible in frontend */}
      <span data-seo-title={blok.title} />
      <span data-seo-description={blok.description} />
      <span data-seo-component="true" />
    </div>
  )
}
