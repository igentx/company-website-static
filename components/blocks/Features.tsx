import { FeatureBlok } from '@/lib/types'
import Image from 'next/image'

/**
 * Feature component - Display features section
 * Shows title, description, optional icon, and list of features
 */
interface FeaturesProps {
  blok: FeatureBlok
}

export default function Features({ blok }: FeaturesProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {blok.icon?.filename && (
            <div className="flex justify-center mb-6">
              <Image
                src={blok.icon.filename}
                alt={blok.icon.alt || ''}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-bold font-primary text-gray-900 mb-4">
            {blok.title || 'Our Features'}
          </h2>

          {blok.description && (
            <p className="text-lg text-gray-600 font-secondary max-w-3xl mx-auto">{blok.description}</p>
          )}
        </div>

        {/* Features Grid */}
        {blok.features && blok.features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blok.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold font-primary text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 font-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
