'use client'

import { BlockRenderer } from '@/lib/blocks'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import InfoBar from './InfoBar'
import { useLanguage } from '@/contexts/LanguageContext'
import { HeaderBlok, NavigationItemBlok } from '@/lib/types'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

/** Pages with a light background from the top need solid header styling immediately. */
function isLightHeaderPage(pathname: string | null): boolean {
  if (!pathname) return false
  return /\/(privacy|terms|blog)$/.test(pathname)
}

/**
 * Header Navigation component - Editable navigation for header
 */
interface NavigationItem extends NavigationItemBlok { }

interface HeaderNavigationProps {
  blok: HeaderBlok & {
    logo_text: string
    navigation_items?: NavigationItem[]
    info_bar?: any[]
    [key: string]: unknown
  }
}

export default function HeaderNavigation({ blok }: HeaderNavigationProps) {
  const { isRTL, createLanguageAwareUrl } = useLanguage()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const showSolidHeader = isScrolled || isLightHeaderPage(pathname)

  // Handle scroll behavior for header styling
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          // Apply glass effect when scrolled past 10px for more responsive feel
          setIsScrolled(currentScrollY > 10)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Helper function to make URLs language-aware
  const getLanguageAwareUrl = (url: string) => {
    // Handle Storyblok internal links and external links
    if (!url || url.startsWith('http') || url.startsWith('//')) {
      return url // External links remain unchanged
    }

    // For internal links, make them language-aware
    return createLanguageAwareUrl(url)
  }

  // Resolve the best URL available from Storyblok multilink
  const resolveItemUrl = (item?: NavigationItem) => {
    const rawUrl = item?.link?.url || (item as any)?.link?.cached_url || ''
    if (!rawUrl) return '#'
    return getLanguageAwareUrl(rawUrl)
  }

  return (
    <header

      role="banner"
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Global SEO Component - Hidden but editable in Storyblok */}
      {blok.global_seo && Array.isArray(blok.global_seo) && blok.global_seo.length > 0 && (
        <BlockRenderer blok={blok.global_seo[0]} />
      )}

      {/* Info Bar */}
      {blok.info_bar && Array.isArray(blok.info_bar) && blok.info_bar.length > 0 && (
        <BlockRenderer blok={blok.info_bar[0]} isScrolled={isScrolled} />
      )}

      <nav
        className={`flex items-center justify-between h-16 px-4 md:px-6 lg:px-8 transition-all duration-700 ease-in-out ${isRTL ? 'flex-row-reverse' : ''
          } ${showSolidHeader
            ? 'bg-white/70 backdrop-blur-xl backdrop-saturate-150 border-b border-white/20 shadow-lg shadow-black/5'
            : 'bg-transparent border-b border-transparent'
          }`}
        role="navigation"
        aria-label="Main navigation"
        style={showSolidHeader ? {
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        } : undefined}
      >
        {/* Logo - Left aligned on all devices */}
        <div className="flex items-center justify-start flex-shrink-0">
          {blok.logo?.filename ? (
            <a
              href={createLanguageAwareUrl('/')}
              className="flex items-center space-x-2"
              aria-label={`${blok.logo_text || 'NextJS Storyblok'} - Go to homepage`}
            >
              <Image
                src={blok.logo.filename}
                alt="IGENTX"
                width={32}
                height={32}
                className={`h-24 sm:h-28 md:h-32 w-auto transition-all duration-700 ${showSolidHeader ? 'filter-none' : 'brightness-0 invert'
                  }`}
              />
              {blok.logo_text && (
                <span
                  className={`hidden sm:inline text-xl sm:text-2xl font-bold font-primary transition-all duration-300 hover:scale-105 ${showSolidHeader
                    ? 'text-primary-950 hover:text-blue-900'
                    : 'text-white hover:text-blue-200 drop-shadow-lg'
                    }`}
                >
                  {blok.logo_text}
                </span>
              )}
            </a>
          ) : (
            <a
              href={createLanguageAwareUrl('/')}
              className={`text-xl sm:text-2xl font-bold font-primary transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded ${showSolidHeader
                ? 'text-primary-950 hover:text-blue-900'
                : 'text-white hover:text-blue-200 drop-shadow-lg'
                }`}
              aria-label="Go to homepage"
            >
              {blok.logo_text || 'NextJS Storyblok'}
            </a>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className={`lg:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-300 hover:scale-110 ${showSolidHeader
            ? 'text-gray-700 hover:text-blue-900 hover:bg-white/20'
            : 'text-white hover:text-blue-200 hover:bg-white/20'
            }`}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle main menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {/* Hamburger icon */}
          <svg
            className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          {/* Close icon */}
          <svg
            className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <ul
            className={`flex items-center space-x-4 xl:space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}
            role="list"
          >
            {blok.navigation_items?.map((item) => {
              const hasChildren = Array.isArray(item.children) && item.children.length > 0
              return (
                <li key={item._uid} className="relative group">
                  <a
                    href={resolveItemUrl(item)}
                    className={`flex items-center px-2 xl:px-3 py-2 text-sm font-medium font-primary transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded ${showSolidHeader
                      ? 'text-gray-700 hover:text-blue-900 hover:bg-white/20'
                      : 'text-white hover:text-blue-200 hover:bg-white/20'
                      }`}
                    aria-haspopup={hasChildren ? 'true' : undefined}
                    aria-expanded={hasChildren ? 'false' : undefined}
                  >
                    {item.label}
                    {hasChildren && (
                      <svg
                        className="w-4 h-4 ml-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </a>
                  {hasChildren && (
                    <div
                      className={`invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 absolute ${isRTL ? 'right-0' : 'left-0'
                        } mt-2 min-w-[200px] rounded-md shadow-lg transition-all duration-300 backdrop-blur-xl ${showSolidHeader
                          ? 'bg-white/95 backdrop-blur border border-white/30'
                          : 'bg-white/95 backdrop-blur'
                        }`}
                      role="menu"
                    >
                      <ul className="py-2">
                        {item.children!.map((child) => (
                          <li key={child._uid}>
                            <a
                              href={resolveItemUrl(child as NavigationItem)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation - Collapsible menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        id="mobile-menu"
      >
        <nav
          className={`space-y-1 pt-2 pb-3 transition-all duration-500 ease-out ${showSolidHeader
            ? 'bg-white/95 backdrop-blur-lg border-t border-white/30'
            : 'bg-white/90 border-t border-white/20'
            }`}
          aria-label="Mobile navigation"
        >
          {blok.navigation_items?.map((item) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0
            return (
              <div key={item._uid} className="px-1">
                <a
                  href={resolveItemUrl(item)}
                  className="flex items-center justify-between text-gray-700 hover:text-blue-900 hover:bg-white/20 px-3 py-2 text-base font-medium font-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  onClick={() => !hasChildren && setIsMobileMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  {hasChildren && (
                    <svg
                      className="w-4 h-4 ml-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </a>
                {hasChildren && (
                  <ul className="ml-4 mt-1 border-l border-gray-200">
                    {item.children!.map((child) => (
                      <li key={child._uid}>
                        <a
                          href={resolveItemUrl(child as NavigationItem)}
                          className="block text-gray-700 hover:text-blue-900 hover:bg-white/10 px-3 py-2 text-base font-medium font-primary"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}

          {/* Mobile Info Bar Content */}
          {blok.info_bar && Array.isArray(blok.info_bar) && blok.info_bar.length > 0 && (
            <div className="border-t border-gray-200 pt-3 mt-2 px-3">
              {/* Language Switcher */}
              <div className="mb-3">
                <LanguageSwitcher isScrolled={true} />
              </div>

              {/* Social Links */}
              {blok.info_bar[0].social_links && blok.info_bar[0].social_links.length > 0 && (
                <div className="flex items-center gap-4 py-2">
                  {blok.info_bar[0].social_links.map((social: any) => {
                    // Skip if no URL
                    if (!social.url) return null

                    const IconComponent = getMobileSocialIcon(social.platform)

                    return (
                      <a
                        key={social._uid}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-blue-900 inline-flex items-center justify-center transition-colors"
                        aria-label={`Visit our ${social.platform}`}
                      >
                        {social.icon?.filename ? (
                          <img
                            src={social.icon.filename}
                            alt={social.icon.alt || social.platform}
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          IconComponent
                        )}
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

// Helper function for mobile social icons
function getMobileSocialIcon(platform: string) {
  const iconClass = "w-6 h-6 flex-shrink-0"

  switch (platform.toLowerCase()) {
    case 'facebook':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    case 'twitter':
    case 'x':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    case 'youtube':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    default:
      return <span className="text-lg font-semibold">{platform[0].toUpperCase()}</span>
  }
}
