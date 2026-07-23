'use client'

import { BlockRenderer } from '@/lib/blocks'
import { PageBlok } from '@/lib/types'

/**
 * Page component - Main container for all page content
 * This component renders the page body which contains other Storyblok components
 * It also includes optional page-specific SEO data
 */
interface PageProps {
  blok: PageBlok
}

export default function Page({ blok }: PageProps) {
  return (
    <div className="min-h-screen">
      {/* Page-specific SEO Component - Hidden but editable in Storyblok */}
      {blok.seo && <BlockRenderer blok={blok.seo} />}

      {/* Render all body components */}
      {blok.body?.map((nestedBlok) => (
        <BlockRenderer blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  )
}
