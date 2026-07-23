import { ComingSoonProductBlok } from '@/lib/types'
import { ProductBadge, ProductCardDecorImage } from './utils'

interface ComingSoonProductCardProps {
  product: ComingSoonProductBlok
}

export default function ComingSoonProductCard({ product }: ComingSoonProductCardProps) {
  const imageSrc = product.image?.filename

  return (
    <article className="relative flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/80 overflow-hidden">
      {imageSrc && (
        <>
          <ProductCardDecorImage src={imageSrc} alt="" glow="purple" variant="banner" />
          <ProductCardDecorImage src={imageSrc} alt="" glow="purple" variant="overlay" />
        </>
      )}

      <div className="relative z-10 flex flex-col flex-grow p-6 sm:p-8">
        <div className="md:max-w-[58%] lg:max-w-[55%]">
          <div className="mb-4">
            <ProductBadge variant="coming_soon">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {product.badge_text || 'Coming Soon'}
            </ProductBadge>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{product.title}</h3>

          <p className="text-gray-600 leading-relaxed mb-5">{product.description}</p>

          {product.category_pills && product.category_pills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {product.category_pills.map((pill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-100 rounded-full"
                >
                  {pill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
