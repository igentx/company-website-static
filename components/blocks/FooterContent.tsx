'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * Footer Content component - Editable footer content
 */
interface SocialLink {
  _uid: string
  component: 'social_links'
  flatform: ('github' | 'twitter' | 'linkedin' | 'facebook' | 'instagram')[] // Note: this is 'flatform' not 'platform' in Storyblok
  url: string
  [key: string]: unknown
}

interface FooterLink {
  _uid: string
  component: 'footer_links'
  lable: string // Note: this is 'lable' not 'label' in Storyblok
  link: {
    url: string
    linktype: string
  }
  [key: string]: unknown
}

interface LinkGroup {
  title?: string
  links?: FooterLink[]
}

interface FooterContentProps {
  blok: {
    _uid: string
    component: 'footer_content'
    brand_name?: string
    brand_logo?: { filename: string; alt?: string }
    description?: string
    footer_links?: FooterLink[] // legacy
    link_groups?: LinkGroup[]
    social_links?: SocialLink[]
    contact_info?: {
      address?: string
      email?: string
      phone?: string
      whatsapp?: string
      hours?: string
      map_url?: string
    }
    newsletter?: {
      enabled?: boolean
      title?: string
      description?: string
      placeholder?: string
      submit_label?: string
      privacy_text?: string
      action_url?: string
    }
    legal_links?: FooterLink[]
    copyright_text?: string
    [key: string]: unknown
  }
}

export default function FooterContent({ blok }: FooterContentProps) {
  const currentYear = new Date().getFullYear()
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

  const getSocialIcon = (platform: string) => {
    const iconClass = 'h-6 w-6 transition-all duration-300'

    switch (platform.toLowerCase()) {
      case 'github':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        )
      case 'twitter':
      case 'x':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        )
      case 'facebook':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        )
      case 'instagram':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
          </svg>
        )
      case 'linkedin':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              clipRule="evenodd"
            />
          </svg>
        )
      case 'youtube':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        )
      default:
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )
    }
  }

  // Normalize social platform from legacy 'flatform' or proper 'platform'
  const resolvePlatform = (social: SocialLink) => {
    const pf = (Array.isArray((social as any).flatform)
      ? (social as any).flatform?.[0]
      : (social as any).flatform) as string | undefined
    return (pf || (social as any).platform || 'github').toLowerCase()
  }


  // Prefer link_groups, fallback to legacy footer_links
  const linkGroups: LinkGroup[] = Array.isArray((blok as any).link_groups)
    ? (blok as any).link_groups
    : blok.footer_links
      ? [{ title: 'Navigation', links: blok.footer_links }]
      : []

  // Calculate number of columns: brand + linkGroups + social (max 5)
  const numLinkGroups = Math.min(linkGroups.length, 3)
  const totalColumns = 2 + numLinkGroups // brand + social + up to 3 link groups
  const gridCols = Math.min(totalColumns, 5)

  // Map gridCols to actual Tailwind classes
  const getGridClass = () => {
    switch (gridCols) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2'
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      case 5:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5'
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    }
  }

  return (
    <footer

      role="contentinfo"
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className={`grid ${getGridClass()} gap-8`}>
          {/* Brand Section */}
          <div>
            <div className="flex items-left space-x-3 mb-4">
              {blok.brand_logo?.filename && (
                <Image
                  src={blok.brand_logo.filename}
                  alt="IGENTX"
                  width={40}
                  height={40}
                  className="h-32 w-[206px] object-contain brightness-0 invert"
                />
              )}
              <h3 className="text-3xl font-bold font-primary bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {blok.brand_name || 'IGENTX'}
              </h3>
            </div>
            <p className="text-gray-300 font-secondary mb-6 max-w-md text-lg leading-relaxed">
              {blok.description || 'AI-Driven Web & Branding Solutions for Fast-Growing Businesses in the UAE'}
            </p>
            {/* Decorative line */}
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>

            {/* Contact Info */}
            {(blok.contact_info?.address || blok.contact_info?.email || blok.contact_info?.phone) && (
              <div className="mt-6 text-gray-300 font-secondary space-y-2">
                {blok.contact_info?.address && <p>{blok.contact_info.address}</p>}
                {blok.contact_info?.email && (
                  <p>
                    Email: <a className="underline hover:text-white" href={`mailto:${blok.contact_info.email}`}>{blok.contact_info.email}</a>
                  </p>
                )}
                {blok.contact_info?.phone && (
                  <p>
                    Phone: <a className="underline hover:text-white" href={`tel:${blok.contact_info.phone}`}>{blok.contact_info.phone}</a>
                  </p>
                )}
                {blok.contact_info?.whatsapp && (
                  <p>
                    WhatsApp: <a className="underline hover:text-white" href={`https://wa.me/${blok.contact_info.whatsapp}`}>{blok.contact_info.whatsapp}</a>
                  </p>
                )}
                {blok.contact_info?.hours && <p>Hours: {blok.contact_info.hours}</p>}
              </div>
            )}
          </div>

          {/* Link Groups */}
          {linkGroups.slice(0, 3).map((group, idx) => (
            <nav key={idx} aria-labelledby={`footer-group-${idx}`}>
              {group.title && (
                <h4 id={`footer-group-${idx}`} className="text-xl font-semibold font-primary mb-6 text-white">
                  {group.title}
                </h4>
              )}
              <ul className="space-y-3">
                {group.links?.map((link) => {
                  const label = (link as any).label || (link as any).lable
                  const href = getLanguageAwareUrl(link.link?.url || (link.link as any)?.cached_url || '#')
                  return (
                    <li key={link._uid}>
                      <a
                        href={href}
                        className="text-gray-300 font-secondary hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded transition-all duration-300 hover:translate-x-1 hover:scale-105 block py-1"
                      >
                        {label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          ))}

          {/* Social Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Follow Us</h4>
            <ul className="flex space-x-4" role="list">
              {blok.social_links?.map((social) => {
                const platform = resolvePlatform(social)
                return (
                  <li key={social._uid}>
                    <a
                      href={social.url}
                      className="text-gray-300 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded-full p-3 transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:shadow-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${platform}`}
                    >
                      {getSocialIcon(platform)}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        {/* Bottom / Legal Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm">
              {blok.copyright_text || `© ${currentYear} ${blok.brand_name || 'IGENTX'}. All rights reserved.`}
            </p>
            {blok.legal_links && blok.legal_links.length > 0 && (
              <ul className="flex flex-wrap items-center gap-4">
                {blok.legal_links.map((link) => {
                  const label = (link as any).label || (link as any).lable
                  const href = getLanguageAwareUrl(link.link?.url || (link.link as any)?.cached_url || '#')
                  return (
                    <li key={link._uid}>
                      <a href={href} className="text-gray-300 hover:text-white text-sm">
                        {label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
