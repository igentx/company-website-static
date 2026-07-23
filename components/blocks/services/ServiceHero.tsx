import { ServiceHeroBlok } from '@/lib/types'
import { HERO_SECTION_GRADIENT_CLASS } from '@/lib/cta-button-styles'
import HeroCtaButton from '@/components/ui/HeroCtaButton'
import Image from 'next/image'
import Link from 'next/link'
import ServiceHeroImageSlider from './ServiceHeroImageSlider'

interface ServiceHeroProps {
  blok: ServiceHeroBlok
}

function resolveLink(link?: { linktype?: string; url?: string; cached_url?: string }) {
  if (!link) return '#'
  const linkType = link.linktype || 'url'
  if (linkType === 'story') {
    const path = link.cached_url || link.url || ''
    return path.startsWith('/') ? path : `/${path}`
  }
  const url = link.url || link.cached_url || '#'
  if (url.startsWith('http') || url.startsWith('#')) return url
  return url.startsWith('/') ? url : `/${url}`
}

function isExternalLink(link?: { linktype?: string; url?: string; cached_url?: string }) {
  const href = resolveLink(link)
  return (link?.linktype === 'url' || !link?.linktype) && href.startsWith('http')
}

export default function ServiceHero({ blok }: ServiceHeroProps) {
  const quickFeatures: string[] = Array.isArray(blok.quick_features)
    ? blok.quick_features
    : typeof blok.quick_features === 'string'
      ? blok.quick_features
          .split('\n')
          .map((feature) => feature.trim())
          .filter(Boolean)
      : []

  const badgeLabel = blok.badge_text || blok.category
  const summary = blok.summary || blok.subtitle
  const backHref = blok.back_link ? resolveLink(blok.back_link) : null
  const backLabel =
    blok.back_link_label ||
    (blok.back_link?.cached_url?.includes('product') ? 'Back to Products' : 'Back to Services')

  const primaryHref = resolveLink(blok.cta_link)
  const secondaryHref = resolveLink(blok.secondary_cta_link)

  const heroImages = (blok.hero_images || []).filter((image) => image.filename)
  const showImageSlider = heroImages.length > 0
  const showFeaturedImage = !showImageSlider && blok.featured_image?.filename

  return (
    <section
      className={`relative pt-20 md:pt-28 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 ${HERO_SECTION_GRADIENT_CLASS} overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2360a5fa;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2322d3ee;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' stroke='url(%23grad1)' stroke-width='1' stroke-linecap='round'%3E%3Cpath d='M0 20 L60 20 L60 40 L100 40' /%3E%3Cpath d='M200 60 L140 60 L140 80 L100 80' /%3E%3Cpath d='M0 100 L40 100 L40 120 L80 120' /%3E%3Cpath d='M200 140 L160 140 L160 120 L120 120' /%3E%3Cpath d='M0 180 L50 180 L50 160 L90 160' /%3E%3Cpath d='M20 0 L20 50 L40 50 L40 90' /%3E%3Cpath d='M60 200 L60 150 L80 150 L80 110' /%3E%3Cpath d='M100 0 L100 30 L120 30 L120 70' /%3E%3Cpath d='M140 200 L140 170 L160 170 L160 130' /%3E%3Cpath d='M180 0 L180 40 L160 40 L160 80' /%3E%3Ccircle cx='60' cy='20' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='140' cy='60' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='40' cy='100' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='160' cy='140' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='50' cy='180' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='20' cy='50' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='60' cy='150' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='100' cy='30' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='140' cy='170' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='180' cy='40' r='2' fill='%2360a5fa' /%3E%3Crect x='45' y='45' width='10' height='10' fill='none' stroke='%23a78bfa' stroke-width='1' /%3E%3Crect x='145' y='85' width='10' height='10' fill='none' stroke='%23a78bfa' stroke-width='1' /%3E%3Crect x='85' y='125' width='10' height='10' fill='none' stroke='%23a78bfa' stroke-width='1' /%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
        <div
          className="absolute top-10 left-10 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8)]"
          style={{ backgroundColor: '#00e9fe', animationDuration: '2s' }}
        />
        <div
          className="absolute top-20 right-20 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8)]"
          style={{ backgroundColor: '#00e9fe', animationDelay: '0.5s', animationDuration: '2.5s' }}
        />
        <div
          className="absolute bottom-20 left-20 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8)]"
          style={{ backgroundColor: '#00e9fe', animationDelay: '1s', animationDuration: '3s' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {backLabel}
          </Link>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="min-w-0">
            {badgeLabel && (
              <div className="inline-block mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/5 backdrop-blur-sm border border-white/20 text-white/80 rounded-full text-xs md:text-sm font-medium tracking-wider uppercase break-words max-w-full">
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {badgeLabel}
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{blok.title}</h1>

            {summary && (
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">{summary}</p>
            )}

            {quickFeatures.length > 0 && (
              <div className="space-y-3 mb-8">
                {quickFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-green-400 flex-shrink-0 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-white font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {(blok.pricing_preview || blok.duration) && (
              <div className="flex flex-wrap items-center gap-6 mb-8">
                {blok.pricing_preview && (
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4">
                    <div className="text-sm text-gray-200 mb-1">Starting from</div>
                    <div className="text-2xl font-bold text-white">{blok.pricing_preview}</div>
                  </div>
                )}
                {blok.duration && (
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4">
                    <div className="text-sm text-gray-200 mb-1">Timeline</div>
                    <div className="text-2xl font-bold text-white">{blok.duration}</div>
                  </div>
                )}
              </div>
            )}

            {(blok.cta_text || blok.secondary_cta_text) && (
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                {blok.cta_text && blok.cta_link && (
                  <HeroCtaButton
                    text={blok.cta_text}
                    href={primaryHref}
                    variant="primary"
                    isExternal={isExternalLink(blok.cta_link)}
                  />
                )}
                {blok.secondary_cta_text && blok.secondary_cta_link && (
                  <HeroCtaButton
                    text={blok.secondary_cta_text}
                    href={secondaryHref}
                    variant="secondary"
                    isExternal={isExternalLink(blok.secondary_cta_link)}
                  />
                )}
              </div>
            )}
          </div>

          {showImageSlider && (
            <ServiceHeroImageSlider
              images={heroImages}
              fallbackAlt={blok.title}
              enableAutoplay={blok.enable_image_autoplay !== false}
              autoplayDelay={Number(blok.image_autoplay_delay) || 5000}
            />
          )}

          {showFeaturedImage && blok.featured_image && (
            <div className="relative min-w-0 w-full max-w-full">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] flex items-center justify-center">
                <Image
                  src={blok.featured_image.filename}
                  alt={blok.featured_image.alt || blok.title}
                  fill
                  className="object-contain object-center p-2 sm:p-4"
                  priority
                  sizes="(max-width: 1024px) 100vw, 576px"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
