'use client'

import { HeroSlideBlok, IGENTXHeroBlok } from '@/lib/types'
import Image from 'next/image'
import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import Link from 'next/link'
import { Vortex } from '@/components/ui/vortex'
import { HERO_CTA_PRIMARY_CLASS, HERO_CTA_SECONDARY_CLASS } from '@/lib/cta-button-styles'

interface IGENTXHeroProps {
  blok: IGENTXHeroBlok
}

interface SlideData {
  title: string
  summary?: string
  ctaText?: string
  ctaLink?: HeroSlideBlok['cta_link']
  slideCtaUrl: string
  isExternal: boolean
  secondaryCtaText?: string
  secondaryCtaLink?: HeroSlideBlok['secondary_cta_link']
  secondaryCtaUrl: string
  isSecondaryExternal: boolean
  quickFeatures: string[]
}

function resolveSlideUrl(link?: { linktype?: string; url?: string; cached_url?: string }) {
  const linkType = link?.linktype || 'url'
  if (linkType === 'story') {
    return link?.cached_url || link?.url || '#'
  }
  return link?.url || link?.cached_url || '#'
}

function getSlideData(slide: HeroSlideBlok): SlideData {
  const title = slide.title || slide.headline_part1 || ''
  const ctaLink = slide.cta_link || slide.primary_cta_link
  const linkType = ctaLink?.linktype || 'url'
  const isExternal = linkType === 'url' && (ctaLink?.url?.startsWith('http') ?? false)
  const secondaryCtaLink = slide.secondary_cta_link
  const secondaryLinkType = secondaryCtaLink?.linktype || 'url'
  const isSecondaryExternal =
    secondaryLinkType === 'url' && (secondaryCtaLink?.url?.startsWith('http') ?? false)

  const quickFeatures: string[] = Array.isArray(slide.quick_features)
    ? slide.quick_features
    : typeof slide.quick_features === 'string'
      ? slide.quick_features
          .split('\n')
          .map((feature) => feature.trim())
          .filter(Boolean)
      : []

  return {
    title,
    summary: slide.summary || slide.subheadline,
    ctaText: slide.cta_text || slide.primary_cta_text,
    ctaLink,
    slideCtaUrl: resolveSlideUrl(ctaLink),
    isExternal,
    secondaryCtaText: slide.secondary_cta_text,
    secondaryCtaLink,
    secondaryCtaUrl: resolveSlideUrl(secondaryCtaLink),
    isSecondaryExternal,
    quickFeatures,
  }
}

function renderCtaButton(
  text: string,
  href: string,
  isExternal: boolean,
  variant: 'primary' | 'secondary' = 'primary'
) {
  const className = variant === 'primary' ? HERO_CTA_PRIMARY_CLASS : HERO_CTA_SECONDARY_CLASS
  const arrow = (
    <svg
      className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {text}
        {arrow}
      </a>
    )
  }

  return (
    <Link href={href.startsWith('/') ? href : `/${href}`} className={className}>
      {text}
      {arrow}
    </Link>
  )
}

interface HeroSlideContentProps {
  slide: HeroSlideBlok
  slideData: SlideData
  isActive: boolean
  slideIndex: number
}

function HeroSlideContent({ slide, slideData, isActive, slideIndex }: HeroSlideContentProps) {
  const {
    title,
    summary,
    ctaText,
    ctaLink,
    slideCtaUrl,
    isExternal,
    secondaryCtaText,
    secondaryCtaLink,
    secondaryCtaUrl,
    isSecondaryExternal,
    quickFeatures,
  } = slideData

  const titleClass =
    'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-4 motion-safe:animate-slide-in-left'

  const renderTitle = (): ReactNode => {
    if (isActive) {
      return (
        <h1 className={titleClass} style={{ animationDelay: '0.2s' }}>
          {title}
        </h1>
      )
    }
    return <p className={titleClass}>{title}</p>
  }

  const renderImage = (className: string, sizes: string) => {
    if (!slide.featured_image?.filename) return null
    return (
      <div className={`relative w-full aspect-[4/3] lg:aspect-square motion-safe:animate-fade-in ${className}`}>
        <Image
          src={slide.featured_image.filename}
          alt={slide.featured_image.alt || title || 'Hero image'}
          fill
          className="object-contain"
          priority={slideIndex === 0}
          sizes={sizes}
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 lg:items-center px-4 sm:px-6 lg:px-8">
      {/* Mobile image */}
      <div className="lg:hidden order-1 mb-6" style={{ animationDelay: '0.1s' }}>
        {renderImage('', '100vw')}
      </div>

      {/* Content */}
      <div className="order-2 lg:order-1">
        {renderTitle()}

        {summary && (
          <p
            className="text-base sm:text-lg text-gray-200 mb-5 leading-relaxed motion-safe:animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            {summary}
          </p>
        )}

        {quickFeatures.length > 0 && (
          <div className="space-y-2 mb-5">
            {quickFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 motion-safe:animate-reveal-up"
                style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
              >
                <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-md border border-green-400/50 flex items-center justify-center flex-shrink-0 mt-1 shadow-[0_0_10px_rgba(74,222,128,0.4),inset_0_0_10px_rgba(74,222,128,0.1)] group hover:shadow-[0_0_15px_rgba(74,222,128,0.6),inset_0_0_15px_rgba(74,222,128,0.2)] transition-all duration-300">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {(slide.pricing_preview || slide.duration) && (
          <div
            className="flex flex-wrap items-center gap-4 mb-5 motion-safe:animate-fade-in-scale"
            style={{ animationDelay: '0.8s' }}
          >
            {slide.pricing_preview && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3">
                <div className="text-sm text-gray-200 mb-1">Starting from</div>
                <div className="text-xl font-bold text-white">{slide.pricing_preview}</div>
              </div>
            )}
            {slide.duration && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3">
                <div className="text-sm text-gray-200 mb-1">Timeline</div>
                <div className="text-xl font-bold text-white">{slide.duration}</div>
              </div>
            )}
          </div>
        )}

        {ctaText && ctaLink && (
          <div
            className="flex flex-wrap items-center gap-3 motion-safe:animate-fade-in-scale"
            style={{ animationDelay: '0.9s' }}
          >
            {renderCtaButton(ctaText, slideCtaUrl, isExternal, 'primary')}
            {secondaryCtaText &&
              secondaryCtaLink &&
              renderCtaButton(secondaryCtaText, secondaryCtaUrl, isSecondaryExternal, 'secondary')}
          </div>
        )}
      </div>

      {/* Desktop image */}
      <div className="hidden lg:block order-3 lg:order-2" style={{ animationDelay: '0.4s' }}>
        {renderImage('motion-safe:animate-fade-in', '50vw')}
      </div>
    </div>
  )
}

function NoSlidesMessage() {
  return (
    <div className="text-center py-20">
      <div className="max-w-2xl mx-auto p-8 bg-yellow-500/10 border-2 border-yellow-500/50 rounded-xl">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-white mb-2">No Hero Slides Found</h2>
        <p className="text-gray-300 mb-4">Please add at least one Hero Slide to display content.</p>
        <p className="text-sm text-gray-400">Go to Storyblok → Add Block → Hero Slide</p>
      </div>
    </div>
  )
}

/**
 * IGENTX Hero component - AI-Driven messaging with UAE market focus
 * Single responsive slider tree; active slide visible in SSR for SEO.
 */
export default function IGENTXHero({ blok }: IGENTXHeroProps) {
  const slides = blok.slides || []
  const autoPlayDelay = Number(blok.autoplay_delay) || 5000
  const enableAutoplay = blok.enable_autoplay !== false

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < slides.length) {
        setCurrentSlide(index)
      }
    },
    [slides.length]
  )

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (slides.length < 2 || !enableAutoplay || isPaused) {
      return
    }

    autoPlayRef.current = setInterval(() => {
      nextSlide()
    }, autoPlayDelay)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [slides.length, enableAutoplay, isPaused, autoPlayDelay, nextSlide])

  return (
    <section
      className="relative pt-16 md:pt-8 pb-16 md:pb-4 overflow-hidden min-h-[600px] bg-gradient-to-br from-[#030a23] via-[#111d43] to-[#030a23]"
      role="banner"
      aria-label="Hero section"
    >
      {/* Desktop Vortex background (decorative) */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <Vortex
          backgroundColor="transparent"
          className="flex items-center justify-center w-full h-full"
          containerClassName="absolute inset-0"
        />
      </div>

      <div
        className="relative z-10 max-w-7xl mx-auto w-full px-2 md:px-10 py-4 flex flex-col justify-center min-h-[480px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative min-h-[480px]">
          {slides.length > 0 ? (
            <div className="relative">
              {slides.map((slide, index) => {
                const isActive = index === currentSlide
                const slideData = getSlideData(slide)

                return (
                  <div
                    key={slide._uid || index}
                    className={isActive ? 'w-full relative z-10' : 'hidden'}
                    aria-hidden={!isActive}
                  >
                    <HeroSlideContent
                      slide={slide}
                      slideData={slideData}
                      isActive={isActive}
                      slideIndex={index}
                    />
                  </div>
                )
              })}
            </div>
          ) : (
            <NoSlidesMessage />
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center gap-px">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="flex-1 h-0.5 bg-white/10 hover:bg-white/20 transition-all duration-300 focus:outline-none relative overflow-hidden group"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
              style={{ height: '2px' }}
            >
              <div
                className={`absolute inset-0 bg-white/10 origin-left ${
                  index === currentSlide
                    ? enableAutoplay && !isPaused
                      ? 'animate-progress-fill'
                      : 'w-full'
                    : 'w-0'
                }`}
                style={
                  index === currentSlide && enableAutoplay && !isPaused
                    ? { animation: `progressFill ${autoPlayDelay}ms linear` }
                    : {}
                }
              />
              <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
