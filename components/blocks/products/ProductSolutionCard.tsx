import { ProductSolutionBlok } from '@/lib/types'
import Link from 'next/link'
import { ArrowRightIcon, ProductBadge, ProductCardDecorImage, resolveHref } from './utils'

interface ProductSolutionCardProps {
  product: ProductSolutionBlok
}

export default function ProductSolutionCard({ product }: ProductSolutionCardProps) {
  const ctaHref = resolveHref(product.cta_link)
  const imageSrc = product.image?.filename
  const imageAlt = product.image?.alt || product.title

  return (
    <article className="relative flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/80 overflow-hidden">
      {imageSrc && (
        <>
          <ProductCardDecorImage src={imageSrc} alt={imageAlt} glow="blue" variant="banner" />
          <ProductCardDecorImage src={imageSrc} alt={imageAlt} glow="blue" variant="overlay" />
        </>
      )}

      <div className="relative z-10 flex flex-col flex-grow p-6 sm:p-8">
        <div className="md:max-w-[58%] lg:max-w-[55%]">
          <div className="mb-4">
            <ProductBadge variant="ai">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {product.badge_text || 'AI Solution'}
            </ProductBadge>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{product.title}</h3>

          <p className="text-gray-600 leading-relaxed mb-5">{product.description}</p>

          {product.feature_pills && product.feature_pills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5 md:mb-0">
              {product.feature_pills.map((pill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-full"
                >
                  {pill}
                </span>
              ))}
            </div>
          )}
        </div>

        {product.stats && product.stats.length > 0 && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full mt-5 mb-5">
            {product.stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-center px-3 py-2.5 sm:px-3 sm:py-3 rounded-xl bg-gray-50 border border-gray-100"
              >
                <p className="text-sm font-semibold text-gray-900 leading-snug">{stat.value}</p>
                {stat.label && <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>}
              </div>
            ))}
          </div>
        )}

        {product.cta_text && ctaHref && (
          <div className="mt-auto md:max-w-[58%] lg:max-w-[55%]">
            <Link
              href={ctaHref}
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              {product.cta_text}
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}
