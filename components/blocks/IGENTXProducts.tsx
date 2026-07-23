import { IGENTXProductsBlok } from '@/lib/types'
import Link from 'next/link'
import ComingSoonProductCard from './products/ComingSoonProductCard'
import FeaturedProductCard from './products/FeaturedProductCard'
import ProductSolutionCard from './products/ProductSolutionCard'
import { ArrowRightIcon, resolveHref } from './products/utils'

interface IGENTXProductsProps {
  blok: IGENTXProductsBlok
}

export default function IGENTXProducts({ blok }: IGENTXProductsProps) {
  const ctaHref = resolveHref(blok.cta_link)

  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100 overflow-hidden"
      id="our-products"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          {blok.badge_text && (
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6">
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

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {blok.title || 'Our Products'}
          </h2>

          {blok.description && (
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {blok.description}
            </p>
          )}
        </div>

        <div className="space-y-6 mb-12">
          {blok.featured_product && (
            <FeaturedProductCard product={blok.featured_product} />
          )}

          {(blok.ai_product || blok.coming_soon) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blok.ai_product && <ProductSolutionCard product={blok.ai_product} />}
              {blok.coming_soon && <ComingSoonProductCard product={blok.coming_soon} />}
            </div>
          )}
        </div>

        {blok.cta_text && ctaHref && (
          <div className="text-center">
            <Link
              href={ctaHref}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-900 to-purple-900 text-white font-semibold rounded-xl hover:from-blue-950 hover:to-purple-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
            >
              {blok.cta_text}
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
