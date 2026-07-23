import { BlockRenderer } from '@/lib/blocks'
import { ServiceGridBlok } from '@/lib/types'
import Link from 'next/link'

interface ServiceGridProps {
  blok: ServiceGridBlok
}

export default function ServiceGrid({ blok }: ServiceGridProps) {
  const gridColumns = blok.columns || 3

  const filterCategories: string[] = Array.isArray(blok.filter_categories)
    ? blok.filter_categories
    : typeof blok.filter_categories === 'string'
      ? blok.filter_categories
          .split(',')
          .map((cat) => cat.trim())
          .filter(Boolean)
      : []

  const ctaHref = blok.cta_link?.cached_url || blok.cta_link?.url

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {(blok.badge_text || blok.title || blok.description) && (
          <div className="text-center mb-12 md:mb-16">
            {blok.badge_text && (
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                {blok.badge_text}
              </div>
            )}
            {blok.title && (
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {blok.title}
              </h2>
            )}
            {blok.description && (
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {blok.description}
              </p>
            )}
          </div>
        )}

        {blok.show_filters && filterCategories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              type="button"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              All Services
            </button>
            {filterCategories.map((category, index) => (
              <button
                key={index}
                type="button"
                className="px-6 py-2 border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:border-blue-300 hover:text-blue-700 transition-colors bg-white"
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {blok.services && blok.services.length > 0 ? (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${gridColumns} gap-8 mb-16`}
          >
            {blok.services.map((service) => (
              <BlockRenderer key={service._uid} blok={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No services available yet. Check back soon!</p>
          </div>
        )}

        {(blok.cta_text || ctaHref) && (
          <div className="text-center pt-4">
            {blok.cta_text && (
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">{blok.cta_text}</p>
            )}
            {ctaHref && (
              <Link
                href={ctaHref.startsWith('/') ? ctaHref : `/${ctaHref}`}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-900 to-purple-900 text-white font-semibold rounded-xl hover:from-blue-950 hover:to-purple-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              >
                Book a Free Consultation
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
