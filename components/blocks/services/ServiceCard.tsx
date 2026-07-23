import { ServiceCardBlok } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

interface ServiceCardProps {
    blok: ServiceCardBlok
}

export default function ServiceCard({ blok }: ServiceCardProps) {
    const linkUrl = blok.link?.cached_url || blok.link?.url || '#'
    const linkType = blok.link?.linktype || 'url'
    const isExternal = linkType === 'url'

    // Normalize tags to an array (handles comma-separated string or array)
    const tags: string[] = Array.isArray(blok.tags)
        ? blok.tags
        : typeof blok.tags === 'string'
            ? blok.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean)
            : []

    // Normalize key features to an array (handle textarea input)
    const keyFeatures: string[] = Array.isArray(blok.key_features)
        ? blok.key_features
        : typeof blok.key_features === 'string'
            ? blok.key_features
                .split('\n')
                .map((feature) => feature.trim())
                .filter(Boolean)
            : []

    return (
        <Link
            href={`/${linkUrl}`}
            className="block"

        >
            <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full flex flex-col relative">
                {/* Popular Badge */}
                {blok.is_popular && (
                    <div className="absolute top-4 right-4 z-10">
                        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                            Popular
                        </span>
                    </div>
                )}

                {/* Featured Image */}
                {blok.featured_image?.filename && (
                    <div className="relative overflow-hidden aspect-[3/2] rounded-t-2xl bg-gradient-to-br from-blue-300 via-blue-200 to-violet-300">
                        <div className="absolute inset-0 bg-gradient-to-t from-violet-400/20 via-transparent to-blue-300/20 pointer-events-none" />
                        <Image
                            src={blok.featured_image.filename}
                            alt={blok.featured_image.alt || blok.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain p-4 sm:p-5 object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Category Badge */}
                        {blok.category && (
                            <div className="absolute top-4 left-4 z-10">
                                <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm border border-blue-100 text-blue-700 text-sm font-semibold rounded-full shadow-sm">
                                    {blok.category}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-3">
                        {blok.icon?.filename && (
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-2 group-hover:scale-110 transition-transform duration-300">
                                <Image
                                    src={blok.icon.filename}
                                    alt={blok.icon.alt || blok.title}
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-contain brightness-0 invert"
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {blok.title}
                            </h3>
                        </div>
                    </div>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                        {blok.excerpt}
                    </p>

                    {(blok.problem || blok.audience || blok.benefits) && (
                        <div className="mb-4 space-y-3 text-sm">
                            {blok.problem && (
                                <p><span className="font-semibold text-gray-900">Problem: </span><span className="text-gray-600">{blok.problem}</span></p>
                            )}
                            {blok.audience && (
                                <p><span className="font-semibold text-gray-900">Who it&apos;s for: </span><span className="text-gray-600">{blok.audience}</span></p>
                            )}
                            {blok.benefits && (
                                <p><span className="font-semibold text-gray-900">Benefits: </span><span className="text-gray-600">{blok.benefits}</span></p>
                            )}
                        </div>
                    )}

                    {/* Key Features */}
                    {keyFeatures.length > 0 && (
                        <div className="mb-4 space-y-2">
                            {keyFeatures.slice(0, 3).map((feature, index) => (
                                <div key={index} className="flex items-start gap-2">
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

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Pricing & CTA */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            {blok.pricing_preview && (
                                <div className="text-sm text-gray-600">
                                    <span className="text-xs">Starting from</span>
                                    <div className="text-lg font-bold text-blue-600">
                                        {blok.pricing_preview}
                                    </div>
                                </div>
                            )}
                            <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-800 transition-colors ml-auto">
                                Learn More
                                <svg
                                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
}

