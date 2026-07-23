import { IGENTXPricingBlok } from '@/lib/types'
import Image from 'next/image'

/**
 * IGENTX Pricing component - UAE market focused packages with clear pricing
 * Features Starter, Professional, and Enterprise packages with CMS included from day one
 */
interface IGENTXPricingProps {
  blok: IGENTXPricingBlok
}

export default function IGENTXPricing({ blok }: IGENTXPricingProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" id="explore-packages">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          {blok.badge_text && (
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {blok.badge_text}
            </div>
          )}

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {blok.title || 'Transparent Pricing for UAE Businesses'}
          </h2>

          {blok.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {blok.description}
            </p>
          )}
        </div>

        {/* Pricing Toggle */}
        {blok.show_pricing_toggle && (
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-xl p-1 border border-gray-200">
              <div className="grid grid-cols-2 gap-1">
                <button className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm">
                  {blok.toggle_option1 || 'One-time Payment'}
                </button>
                <button className="px-6 py-2 rounded-lg text-gray-600 font-medium text-sm hover:text-gray-900">
                  {blok.toggle_option2 || 'Monthly Payment'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        {Array.isArray(blok.packages) && blok.packages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {blok.packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${pkg.is_popular ? 'border-2 border-blue-500 scale-105' : 'border border-gray-200'
                  }`}
              >
                {/* Popular Badge */}
                {pkg.is_popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      {pkg.popular_text || 'Most Popular'}
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Package Icon */}
                  {pkg.icon?.filename ? (
                    <div className="flex justify-center mb-6">
                      <Image
                        src={pkg.icon.filename}
                        alt={pkg.icon.alt || ''}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${pkg.is_popular
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                          : 'bg-gradient-to-br from-gray-400 to-gray-600'
                          }`}
                      >
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0h-2m-2 0h-2m-2 0h-2M3 5a2 2 0 012-2h1a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                          />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Package Name */}
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{pkg.name}</h3>

                  {/* Package Subtitle */}
                  {pkg.subtitle && <p className="text-gray-600 text-center mb-6">{pkg.subtitle}</p>}

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        {pkg.currency || 'AED'} {pkg.price}
                      </span>
                      {pkg.price_suffix && (
                        <span className="text-gray-600 ml-1">{pkg.price_suffix}</span>
                      )}
                    </div>
                    {pkg.price_note && (
                      <p className="text-sm text-gray-500 mt-2">{pkg.price_note}</p>
                    )}
                  </div>

                  {/* Features */}
                  {pkg.features && (
                    <div className="mb-8">
                      <ul className="space-y-3">
                        {(Array.isArray(pkg.features)
                          ? pkg.features
                          : pkg.features.split('\n').filter((feature) => feature.trim())
                        ).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700">
                              {typeof feature === 'string' ? feature.trim() : feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* What's Included Highlight */}
                  {pkg.includes_cms && (
                    <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
                      <div className="flex items-center text-blue-800">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-semibold text-sm">
                          Includes Storyblok CMS from Day 1
                        </span>
                      </div>
                      <p className="text-blue-600 text-xs mt-1">
                        No need to pay for content updates - manage everything yourself!
                      </p>
                    </div>
                  )}

                  {/* CTA Button */}
                  <a
                    href={pkg.cta_link?.url || '#'}
                    className={`block w-full text-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${pkg.is_popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                  >
                    {pkg.cta_text || 'Get Started'}
                  </a>

                  {/* Additional Info */}
                  {pkg.additional_info && (
                    <p className="text-xs text-gray-500 text-center mt-4">{pkg.additional_info}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Value Propositions */}
        {Array.isArray(blok.value_props) && blok.value_props.length > 0 && (
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {blok.value_props_title || 'Why Our Packages Stand Out'}
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {blok.value_props_description ||
                  'Every package includes features that traditional agencies charge extra for.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {blok.value_props.map((prop, index) => (
                <div key={index} className="text-center">
                  {prop.icon?.filename ? (
                    <div className="flex justify-center mb-4">
                      <Image
                        src={prop.icon.filename}
                        alt={prop.icon.alt || ''}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                  <h4 className="font-bold text-gray-900 mb-2">{prop.title}</h4>
                  <p className="text-gray-600 text-sm">{prop.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section removed. Use <FAQ blok={...} /> as a separate blok in the page body. */}

        {/* Custom Quote CTA */}
        {blok.show_custom_quote && (
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {blok.custom_quote_title || 'Need a Custom Solution?'}
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                {blok.custom_quote_description ||
                  'Large enterprise or have specific requirements? Let us create a tailored package that fits your business needs and budget.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={blok.custom_quote_cta_link?.url || '#'}
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {blok.custom_quote_cta || 'Get Custom Quote'}
                </a>
                {blok.whatsapp_number && (
                  <a
                    href={`https://wa.me/${blok.whatsapp_number}?text=Hi, I'm interested in a custom package for my business.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-blue-600 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700" />
                    </svg>
                    WhatsApp Us
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
