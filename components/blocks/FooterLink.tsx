'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { resolveMultilinkHref } from '@/lib/utils'

/**
 * Footer Link component - Individual footer navigation link
 */
interface FooterLinkProps {
  blok: {
    _uid: string
    component: 'footer_links'
    lable: string // Note: this is 'lable' not 'label' in Storyblok
    link: {
      url: string
      linktype: string
      cached_url?: string
    }
    [key: string]: unknown
  }
}

export default function FooterLink({ blok }: FooterLinkProps) {
  const { createLanguageAwareUrl } = useLanguage()

  // Helper function to make URLs language-aware
  const getLanguageAwareUrl = (url: string) => {
    // Handle external links and empty/hash links
    if (!url || url.startsWith('http') || url.startsWith('//') || url === '#') {
      return url // External links and hash links remain unchanged
    }

    // For internal links, make them language-aware
    return createLanguageAwareUrl(url)
  }

  return (
    <li>
      <a
        href={getLanguageAwareUrl(resolveMultilinkHref(blok.link))}
        className="text-gray-300 hover:text-white transition-colors"
      >
        {blok.lable}
      </a>
    </li>
  )
}
