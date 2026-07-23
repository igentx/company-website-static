import { CaseStudyCardBlok } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

/**
 * CaseStudyCard component - Individual case study card for listing pages
 * Displays preview information and links to detailed case study page
 */
interface CaseStudyCardProps {
    blok: CaseStudyCardBlok
}

export default function CaseStudyCard({ blok }: CaseStudyCardProps) {
    const linkUrl = blok.link?.cached_url || blok.link?.url || '#'

    // Normalize tags: Storyblok may provide a comma-separated string or an array
    const tags: string[] = Array.isArray(blok.tags)
        ? (blok.tags as string[]).filter(Boolean)
        : typeof (blok as any).tags === 'string'
            ? (blok as any).tags.split(',').map((t: string) => t.trim()).filter(Boolean)
            : []

    return (
        <Link
            href={`/${linkUrl}`}
            className="block"

        >
            <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                {/* Featured Image */}
                {blok.featured_image?.filename && (
                    <div className="relative overflow-hidden aspect-video">
                        <Image
                            src={blok.featured_image.filename}
                            alt={blok.featured_image.alt || blok.title || 'Case study image'}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Category Badge */}
                        {blok.category && (
                            <div className="absolute top-4 left-4 z-10">
                                <span className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                                    {blok.category}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-6">
                    {/* Client Name */}
                    {blok.client_name && (
                        <p className="text-sm font-medium text-blue-600 mb-2">
                            {blok.client_name}
                        </p>
                    )}

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {blok.title || 'Case Study'}
                    </h3>

                    {/* Excerpt */}
                    {blok.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                            {blok.excerpt}
                        </p>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags.slice(0, 3).map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Stats/Metrics Preview */}
                    {blok.key_metrics && blok.key_metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
                            {blok.key_metrics.slice(0, 2).map((metric, index) => (
                                <div key={index}>
                                    <div className="text-2xl font-bold text-blue-600">
                                        {metric.value}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        {metric.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Read More Link */}
                    {/* Read More Text */}
                    <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-800 transition-colors">
                        Read Case Study
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
            </article>
        </Link>
    )
}
