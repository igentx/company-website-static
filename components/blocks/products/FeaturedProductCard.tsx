import { FeaturedProductBlok } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRightIcon,
  FeaturePillIcon,
  ProductBadge,
  getFeaturePillColor,
  isExternalHref,
  resolveHref,
} from './utils'

interface FeaturedProductCardProps {
  product: FeaturedProductBlok
}

function FeaturedProductDescription({ product }: { product: FeaturedProductBlok }) {
  const { description, brand_link: brandLink } = product

  if (!brandLink?.text || !brandLink.url || !description.includes(brandLink.text)) {
    return <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
  }

  const linkIndex = description.indexOf(brandLink.text)

  return (
    <p className="text-gray-600 leading-relaxed mb-6">
      {description.slice(0, linkIndex)}
      <a
        href={brandLink.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-purple-600 underline decoration-purple-200 underline-offset-2 hover:text-purple-800 hover:decoration-purple-400 transition-colors"
      >
        {brandLink.text}
      </a>
      {description.slice(linkIndex + brandLink.text.length)}
    </p>
  )
}

export default function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const ctaHref = resolveHref(product.cta_link)
  const ctaIsExternal = isExternalHref(product.cta_link)
  const ctaClassName =
    'inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors'

  return (
    <article className="relative bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/80 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 sm:p-8 lg:pt-16 lg:pr-6 flex flex-col">
          <div className="mb-4 lg:absolute lg:top-5 lg:left-5 lg:z-10">
            <ProductBadge variant="featured">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {product.badge_text || 'Featured Product'}
            </ProductBadge>
          </div>

          {product.logo?.filename && (
            <div className="mb-4">
              <Image
                src={product.logo.filename}
                alt={product.logo.alt || product.title}
                width={200}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </div>
          )}

          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{product.title}</h3>

          {product.tagline && (
            <p className="text-purple-600 font-medium mb-4">{product.tagline}</p>
          )}

          <FeaturedProductDescription product={product} />

          {product.feature_pills && product.feature_pills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.feature_pills.map((pill, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm font-medium rounded-lg border ${getFeaturePillColor(pill.icon)}`}
                >
                  <FeaturePillIcon icon={pill.icon} />
                  {pill.label}
                </span>
              ))}
            </div>
          )}

          {product.trust_banner && (
            <div className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-purple-50 border border-purple-100">
              <svg
                className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-sm text-purple-900 leading-relaxed">{product.trust_banner}</p>
            </div>
          )}

          {product.cta_text && ctaHref && (
            <div className="mt-auto">
              {ctaIsExternal ? (
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ctaClassName}
                >
                  {product.cta_text}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </a>
              ) : (
                <Link href={ctaHref} className={ctaClassName}>
                  {product.cta_text}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
              )}
            </div>
          )}
        </div>

        {product.screenshot?.filename && (
          <div className="relative min-h-[200px] sm:min-h-[240px] lg:min-h-full bg-gradient-to-br from-slate-50 via-white to-purple-50 p-4 sm:p-6 flex items-center justify-center border-t border-gray-100 lg:border-t-0">
            <div className="relative w-full aspect-[1024/609] rounded-xl overflow-hidden shadow-md border border-gray-100">
              <Image
                src={product.screenshot.filename}
                alt={product.screenshot.alt || `${product.title} dashboard`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-left object-top"
              />
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
