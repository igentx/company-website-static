import { RichText, BlockRenderer } from '@/lib/blocks'
import { ServiceDetailBlok } from '@/lib/types'
import Link from 'next/link'

interface ServiceDetailProps {
    blok: ServiceDetailBlok
}

export default function ServiceDetail({ blok }: ServiceDetailProps) {
    // Normalize technologies to an array
    const technologies: string[] = Array.isArray(blok.technologies)
        ? blok.technologies
        : typeof blok.technologies === 'string'
            ? blok.technologies
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean)
            : []

    // Normalize what_you_get to an array (handle textarea input)
    const whatYouGet: string[] = Array.isArray(blok.what_you_get)
        ? blok.what_you_get
        : typeof blok.what_you_get === 'string'
            ? blok.what_you_get
                .split('\n')
                .map((item) => item.trim())
                .filter(Boolean)
            : []

    return (
        <article
            className="relative pt-12 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-950 overflow-hidden"

        >
            {/* AI Circuit Board Background Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                {/* Circuit Lines Pattern */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2360a5fa;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2322d3ee;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' stroke='url(%23grad1)' stroke-width='1' stroke-linecap='round'%3E%3C!-- Horizontal lines --%3E%3Cpath d='M0 20 L60 20 L60 40 L100 40' /%3E%3Cpath d='M200 60 L140 60 L140 80 L100 80' /%3E%3Cpath d='M0 100 L40 100 L40 120 L80 120' /%3E%3Cpath d='M200 140 L160 140 L160 120 L120 120' /%3E%3Cpath d='M0 180 L50 180 L50 160 L90 160' /%3E%3C!-- Vertical lines --%3E%3Cpath d='M20 0 L20 50 L40 50 L40 90' /%3E%3Cpath d='M60 200 L60 150 L80 150 L80 110' /%3E%3Cpath d='M100 0 L100 30 L120 30 L120 70' /%3E%3Cpath d='M140 200 L140 170 L160 170 L160 130' /%3E%3Cpath d='M180 0 L180 40 L160 40 L160 80' /%3E%3C!-- Connection nodes --%3E%3Ccircle cx='60' cy='20' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='140' cy='60' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='40' cy='100' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='160' cy='140' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='50' cy='180' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='20' cy='50' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='60' cy='150' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='100' cy='30' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='140' cy='170' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='180' cy='40' r='2' fill='%2360a5fa' /%3E%3C!-- Microchip shapes --%3E%3Crect x='45' y='45' width='10' height='10' fill='none' stroke='%23a78bfa' stroke-width='1' /%3E%3Crect x='145' y='85' width='10' height='10' fill='none' stroke='%23a78bfa' stroke-width='1' /%3E%3Crect x='85' y='125' width='10' height='10' fill='none' stroke='%23a78bfa' stroke-width='1' /%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px',
                }} />

                {/* Animated Glowing Circuit End Nodes */}
                <div className="absolute top-10 left-10 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8),0_0_20px_4px_rgba(0,233,254,0.5),0_0_30px_6px_rgba(0,233,254,0.2)]" style={{ backgroundColor: '#00e9fe', animationDelay: '0s', animationDuration: '2s' }} />
                <div className="absolute top-20 right-20 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8),0_0_20px_4px_rgba(0,233,254,0.5),0_0_30px_6px_rgba(0,233,254,0.2)]" style={{ backgroundColor: '#00e9fe', animationDelay: '0.5s', animationDuration: '2.5s' }} />
                <div className="absolute bottom-20 left-20 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8),0_0_20px_4px_rgba(0,233,254,0.5),0_0_30px_6px_rgba(0,233,254,0.2)]" style={{ backgroundColor: '#00e9fe', animationDelay: '1s', animationDuration: '3s' }} />
                <div className="absolute bottom-10 right-10 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8),0_0_20px_4px_rgba(0,233,254,0.5),0_0_30px_6px_rgba(0,233,254,0.2)]" style={{ backgroundColor: '#00e9fe', animationDelay: '1.5s', animationDuration: '2s' }} />
                <div className="absolute top-1/2 left-1/4 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8),0_0_20px_4px_rgba(0,233,254,0.5),0_0_30px_6px_rgba(0,233,254,0.2)]" style={{ backgroundColor: '#00e9fe', animationDelay: '0.8s', animationDuration: '2.8s' }} />
                <div className="absolute top-1/3 right-1/3 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8),0_0_20px_4px_rgba(0,233,254,0.5),0_0_30px_6px_rgba(0,233,254,0.2)]" style={{ backgroundColor: '#00e9fe', animationDelay: '1.2s', animationDuration: '2.2s' }} />

                {/* Additional scattered glowing end nodes */}
                <div className="absolute top-1/4 left-1/2 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8),0_0_20px_4px_rgba(0,233,254,0.5),0_0_30px_6px_rgba(0,233,254,0.2)]" style={{ backgroundColor: '#00e9fe', animationDelay: '0.3s', animationDuration: '2.4s' }} />
                <div className="absolute bottom-1/3 right-1/2 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8),0_0_20px_4px_rgba(0,233,254,0.5),0_0_30px_6px_rgba(0,233,254,0.2)]" style={{ backgroundColor: '#00e9fe', animationDelay: '1.8s', animationDuration: '2.6s' }} />
                <div className="absolute top-2/3 left-1/3 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8),0_0_20px_4px_rgba(0,233,254,0.5),0_0_30px_6px_rgba(0,233,254,0.2)]" style={{ backgroundColor: '#00e9fe', animationDelay: '0.6s', animationDuration: '3.2s' }} />
                <div className="absolute top-1/3 left-10 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8),0_0_20px_4px_rgba(0,233,254,0.5),0_0_30px_6px_rgba(0,233,254,0.2)]" style={{ backgroundColor: '#00e9fe', animationDelay: '1.4s', animationDuration: '2.3s' }} />
                <div className="absolute bottom-1/2 right-10 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8),0_0_20px_4px_rgba(0,233,254,0.5),0_0_30px_6px_rgba(0,233,254,0.2)]" style={{ backgroundColor: '#00e9fe', animationDelay: '0.9s', animationDuration: '2.7s' }} />

                {/* Large Circuit Elements */}
                <div className="absolute top-1/4 right-10 w-16 h-16 border-2 border-cyan-400/30 rounded-lg animate-pulse-slow" />
                <div className="absolute bottom-1/4 left-10 w-20 h-20 border-2 border-purple-400/30 rounded-lg animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Overview Section */}
                {blok.overview && (
                    <div className="mb-16 p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
                        <div className="prose prose-lg max-w-none">
                            {typeof blok.overview === 'object' && blok.overview.type === 'doc' ? (
                                <RichText doc={blok.overview} />
                            ) : (
                                <div
                                    dangerouslySetInnerHTML={{ __html: blok.overview as unknown as string }}
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* What You Get Section */}
                {whatYouGet.length > 0 && (
                    <section className="mb-16 p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                            <svg
                                className="w-8 h-8 mr-3 text-blue-900"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            {blok.what_you_get_title || "What You'll Get"}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {whatYouGet.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <svg
                                        className="w-6 h-6 text-green-500 flex-shrink-0 mt-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Process Steps Section */}
                {blok.process_steps && blok.process_steps.length > 0 && (
                    <section className="mb-16 p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            {blok.process_title || 'Our Process'}
                        </h3>
                        <div className="relative">
                            {/* Connecting line */}
                            <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200"></div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {blok.process_steps.map((step, index) => (
                                    <div key={index} className="group relative">
                                        <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                                            {/* Step Number */}
                                            <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-900 to-purple-900 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-all duration-300">
                                                {index + 1}
                                            </div>

                                            {/* Content */}
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
                                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium bg-white/50 backdrop-blur-sm text-gray-600 border border-gray-200/50 mx-auto opacity-70">
                                                        <svg
                                                            className="w-3 h-3"
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
                                                        <span className="uppercase tracking-wide">{step.duration}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Pricing Tiers Section */}
                {blok.pricing_tiers && blok.pricing_tiers.length > 0 && (
                    <section className="mb-16">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Pricing Options
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {blok.pricing_tiers.map((tier, index) => {
                                // Normalize features to an array (handle textarea input)
                                const features: string[] = Array.isArray(tier.features)
                                    ? tier.features
                                    : typeof tier.features === 'string'
                                        ? tier.features
                                            .split('\n')
                                            .map((f) => f.trim())
                                            .filter(Boolean)
                                        : []

                                // Determine if tier is highlighted and what badge to show
                                const isHighlighted = tier.is_popular || tier.is_recommended || tier.highlight_badge
                                const badgeText = tier.highlight_badge ||
                                    (tier.is_popular ? 'Most Popular' : '') ||
                                    (tier.is_recommended ? 'Recommended' : '')

                                return (
                                    <div
                                        key={index}
                                        className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 ${isHighlighted
                                            ? 'border-blue-600 shadow-2xl scale-105 z-10'
                                            : 'border-gray-200 hover:border-blue-500 hover:shadow-2xl'
                                            }`}
                                    >
                                        {/* Highlight Badge */}
                                        {isHighlighted && badgeText && (
                                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow-lg">
                                                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    {badgeText}
                                                </span>
                                            </div>
                                        )}

                                        <div className="text-center mb-6">
                                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                                                {tier.name}
                                            </h4>
                                            {tier.description && (
                                                <p className="text-sm text-gray-600">{tier.description}</p>
                                            )}
                                        </div>
                                        <div className="text-center mb-6">
                                            <div className="text-4xl font-bold text-blue-600">
                                                {tier.price}
                                                {tier.currency && (
                                                    <span className="text-2xl text-gray-500 ml-1">
                                                        {tier.currency}
                                                    </span>
                                                )}
                                            </div>
                                            {tier.duration && (
                                                <div className="text-sm text-gray-600 mt-1">
                                                    {tier.duration}
                                                </div>
                                            )}
                                        </div>
                                        {features.length > 0 && (
                                            <div className="space-y-3">
                                                {features.map((feature, featureIndex) => (
                                                    <div
                                                        key={featureIndex}
                                                        className="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        <span className="text-sm text-gray-700">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )}

                {/* Technologies Section */}
                {technologies && technologies.length > 0 && (
                    <section className="mb-16 p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Technologies We Use
                        </h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-gray-800 rounded-lg font-medium hover:from-blue-100 hover:to-purple-100 transition-all"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Content Blocks */}
                {blok.content_blocks && blok.content_blocks.length > 0 && (
                    <div className="mb-16 p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
                        {blok.content_blocks.map((block) => (
                            <BlockRenderer key={block._uid} blok={block} />
                        ))}
                    </div>
                )}

                {/* CTA Section */}
                {(blok.cta_section_title || blok.cta_section_text) && (
                    <div className="mt-16 p-8 bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl text-white shadow-xl">
                        {blok.cta_section_title && (
                            <h3 className="text-3xl font-bold mb-4">
                                {blok.cta_section_title}
                            </h3>
                        )}
                        {blok.cta_section_text && (
                            <p className="text-blue-100 mb-6 text-lg">{blok.cta_section_text}</p>
                        )}
                        {blok.cta_button_link && (
                            <div>
                                {blok.cta_button_link.linktype === 'url' ? (
                                    <a
                                        href={blok.cta_button_link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl"
                                    >
                                        {blok.cta_button_text || 'Get Started'}
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
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </a>
                                ) : (
                                    <Link
                                        href={blok.cta_button_link.url}
                                        className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl"
                                    >
                                        {blok.cta_button_text || 'Get Started'}
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
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Related Services Section */}
            {blok.related_services && blok.related_services.length > 0 && (
                <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200 mt-16">
                    <div className="max-w-6xl mx-auto">
                        <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                            Related Services
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {blok.related_services.map((service) => (
                                <BlockRenderer key={service._uid} blok={service} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </article>
    )
}

