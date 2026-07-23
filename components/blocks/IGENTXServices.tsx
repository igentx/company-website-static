import { IGENTXServicesBlok } from '@/lib/types'
import Image from 'next/image'

const CATEGORY_ICON_STYLES: Record<string, { bg: string; text: string }> = {
  ai: { bg: 'bg-purple-100', text: 'text-purple-600' },
  cloud: { bg: 'bg-blue-100', text: 'text-blue-600' },
  web: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
  commerce: { bg: 'bg-orange-100', text: 'text-orange-600' },
  analytics: { bg: 'bg-violet-100', text: 'text-violet-600' },
  automation: { bg: 'bg-amber-100', text: 'text-amber-600' },
}

function TechStackIcon({ iconKey, className }: { iconKey?: string; className?: string }) {
  const cls = className || 'w-5 h-5'

  switch (iconKey) {
    case 'ai':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    case 'cloud':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.98 5 5 0 10-9.9 4 4 0 00-3.9 5.98z" />
        </svg>
      )
    case 'web':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    case 'commerce':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    case 'analytics':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    case 'automation':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    case 'lightning':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'layers':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    case 'shield':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case 'clock':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'rocket':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    default:
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
  }
}

/**
 * IGENTX Services component - Showcases Web Development, Branding, and Ecommerce solutions
 * Features AI-driven development, multilingual support, and UAE market focus
 */
interface IGENTXServicesProps {
  blok: IGENTXServicesBlok
}

export default function IGENTXServices({ blok }: IGENTXServicesProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" id="our-services">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          {blok.badge_text && (
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
              {blok.badge_text}
            </div>
          )}

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {blok.title || 'Our Services'}
          </h2>

          {blok.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {blok.description}
            </p>
          )}
        </div>

        {/* Services Grid */}
        {Array.isArray(blok.services) && blok.services.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {blok.services.map((service, index) => {
              const serviceHref =
                service.cta_link?.cached_url ||
                service.cta_link?.url ||
                '#'
              const normalizedHref = serviceHref.startsWith('/')
                ? serviceHref
                : `/${serviceHref}`

              return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Service Icon/Image */}
                {service.image?.filename ? (
                  <div className="relative mb-6">
                    <Image
                      src={service.image.filename}
                      alt={service.image.alt || ''}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                  </div>
                ) : (
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Service Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                {(service.problem || service.solution || service.outcome) ? (
                  <div className="mb-6 space-y-4">
                    {service.problem && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Problem</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{service.problem}</p>
                      </div>
                    )}
                    {service.solution && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wide text-blue-600 mb-1">Solution</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{service.solution}</p>
                      </div>
                    )}
                    {service.outcome && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wide text-green-600 mb-1">Business Outcome</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{service.outcome}</p>
                      </div>
                    )}
                  </div>
                ) : service.features ? (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4>
                    <ul className="space-y-2">
                      {(Array.isArray(service.features)
                        ? service.features
                        : service.features.split('\n').filter((feature) => feature.trim())
                      ).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700 text-sm">
                            {typeof feature === 'string' ? feature.trim() : feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Price Range */}
                {service.price_range && (
                  <div className="mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
                      <div className="text-center">
                        <span className="text-sm text-gray-600">Starting from</span>
                        <div className="text-2xl font-bold text-blue-600">
                          {service.price_range}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                {service.cta_text && (
                  <a
                    href={normalizedHref}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-900 to-purple-900 text-white font-semibold rounded-xl hover:from-blue-950 hover:to-purple-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform group-hover:scale-105"
                  >
                    {service.cta_text}
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                )}

                {/* Popular Badge */}
                {service.is_popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
              </div>
              )
            })}
          </div>
        )}

        {/* Technology Stack */}
        {blok.show_tech_stack && (
          <div className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 rounded-3xl p-8 md:p-12 overflow-hidden border border-gray-100">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl -z-0" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-100/30 to-pink-100/30 rounded-full blur-3xl -z-0" />

            <div className="relative z-10">
              <div className="text-center mb-12">
                {blok.tech_stack_badge && (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50 text-purple-700 border border-purple-100 rounded-full text-xs font-semibold tracking-[0.15em] uppercase mb-6">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {blok.tech_stack_badge}
                  </div>
                )}

                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {blok.tech_stack_title || 'Engineering Excellence, Business Impact'}
                </h3>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                  {blok.tech_stack_description ||
                    'We combine modern technologies, cloud infrastructure and AI capabilities to build scalable, secure solutions that drive measurable growth.'}
                </p>
              </div>

              {Array.isArray(blok.tech_categories) && blok.tech_categories.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blok.tech_categories.map((category, index) => {
                    const iconStyle = CATEGORY_ICON_STYLES[category.icon_key || ''] || {
                      bg: 'bg-blue-100',
                      text: 'text-blue-600',
                    }

                    return (
                      <div
                        key={index}
                        className="group flex flex-col bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div
                            className={`flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl ${iconStyle.bg} ${iconStyle.text}`}
                          >
                            <TechStackIcon iconKey={category.icon_key} className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-lg text-gray-900 mb-1">{category.title}</h4>
                            {category.description && (
                              <p className="text-sm text-gray-500 leading-relaxed">{category.description}</p>
                            )}
                          </div>
                        </div>

                        {Array.isArray(category.technologies) && category.technologies.length > 0 && (
                          <div className="mt-auto pt-4 border-t border-gray-100">
                            <div className="flex flex-wrap gap-4 justify-start">
                              {category.technologies.map((tech, techIndex) => (
                                <div
                                  key={techIndex}
                                  className="flex flex-col items-center gap-1.5 w-[4.5rem] flex-shrink-0"
                                >
                                  {tech.icon?.filename ? (
                                    <div className="flex h-8 w-8 items-center justify-center">
                                      <Image
                                        src={tech.icon.filename}
                                        alt={tech.icon.alt || tech.name}
                                        width={32}
                                        height={32}
                                        className="h-7 w-auto max-w-[2rem] object-contain"
                                      />
                                    </div>
                                  ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-[10px] font-semibold text-gray-500 text-center leading-tight px-0.5">
                                      {tech.name.split(' ')[0].slice(0, 4)}
                                    </div>
                                  )}
                                  <span className="text-center text-gray-500 text-[10px] font-medium leading-tight line-clamp-2">
                                    {tech.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {Array.isArray(blok.tech_benefits) && blok.tech_benefits.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-200/80">
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
                    {blok.tech_benefits.map((benefit, index) => (
                      <div key={index} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                        <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-purple-200 bg-purple-50 text-purple-600 mb-3">
                          <TechStackIcon iconKey={benefit.icon_key} className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">{benefit.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Process Steps */}
        {Array.isArray(blok.process_steps) && blok.process_steps.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full mb-4">
                <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span className="text-sm font-semibold text-purple-600">Our Process</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent mb-4">
                {blok.process_title || 'Our AI-Driven Process'}
              </h3>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                {blok.process_description ||
                  'From concept to launch, our streamlined process ensures faster delivery without compromising quality.'}
              </p>
            </div>

            <div className="relative">
              {/* Animated connecting line */}
              <div className="hidden lg:block absolute top-[72px] left-0 right-0 h-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.isArray(blok.process_steps) &&
                  blok.process_steps.map((step, index) => (
                    <div
                      key={index}
                      className="group relative"
                    >
                      {/* Card */}
                      <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                        {/* Step Number Circle */}
                        <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-900 to-purple-900 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                          {index + 1}
                          {/* Pulse ring on hover */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-900 to-purple-900 opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-500"></div>
                        </div>

                        {/* Step Content */}
                        <div className="text-center flex-1">
                          <h4 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {step.title}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {step.description}
                          </p>
                        </div>

                        {/* Duration Badge */}
                        {step.duration && (
                          <div className="mt-auto pt-4">
                            <div className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-100 group-hover:from-blue-900 group-hover:to-purple-900 group-hover:text-white group-hover:border-transparent transition-all duration-300 mx-auto">
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {step.duration}
                            </div>
                          </div>
                        )}

                        {/* Arrow connector (visible on larger screens) */}
                        {index < (blok.process_steps?.length || 0) - 1 && (
                          <div className="hidden lg:block absolute top-[72px] -right-4 z-20">
                            <svg className="w-8 h-8 text-blue-500 group-hover:text-purple-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}

                        {/* Decorative gradient on hover */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-900/5 to-purple-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        {blok.cta_text && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {blok.cta_title || 'Ready to Transform Your Business?'}
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                {blok.cta_description ||
                  'Let us help you build a powerful digital presence that drives results in the UAE market.'}
              </p>
              <a
                href={blok.cta_link?.url || '#'}
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                {blok.cta_text}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
