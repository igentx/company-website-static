import { HeroBlok } from '@/lib/types'
import Image from 'next/image'

/**
 * Hero component - Main banner section
 * Displays title, subtitle, background image, and call-to-action
 */
interface HeroProps {
  blok: HeroBlok
}

export default function Hero({ blok }: HeroProps) {
  const backgroundImage = blok.background_image?.filename
  const ctaUrl = blok.cta_link?.url || '#'

  return (
    <section
      className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-32 px-4 sm:px-6 lg:px-8"

    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={blok.background_image?.alt || ''}
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-primary mb-6">
          {blok.title || 'Welcome to Our Site'}
        </h1>

        {blok.subtitle && (
          <p className="text-xl md:text-2xl font-secondary mb-8 max-w-3xl mx-auto">{blok.subtitle}</p>
        )}

        {blok.cta_text && (
          <a
            href={ctaUrl}
            className="inline-block bg-white text-blue-600 font-semibold font-primary px-8 py-3 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors duration-200"
            aria-label={`${blok.cta_text} - Call to action button`}
          >
            {blok.cta_text}
          </a>
        )}
      </div>
    </section>
  )
}
