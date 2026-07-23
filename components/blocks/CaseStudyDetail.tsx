import { RichText } from '@/lib/blocks'
import { CaseStudyDetailBlok } from '@/lib/types'
import Image from 'next/image'

/**
 * CaseStudyDetail component - Detailed case study page content
 * Displays comprehensive information about a single case study
 */
interface CaseStudyDetailProps {
    blok: CaseStudyDetailBlok
}

export default function CaseStudyDetail({ blok }: CaseStudyDetailProps) {
    // Normalize technologies to an array (handles comma-separated string or array)
    const technologies: string[] = Array.isArray(blok.technologies)
        ? blok.technologies
        : typeof blok.technologies === 'string'
            ? blok.technologies
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean)
            : []
    return (
        <article
            className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-white"

        >
            <div className="max-w-5xl mx-auto mt-6">
                {/* Top Row: Client/Category + Visit Project */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex flex-wrap items-center gap-4">
                        {blok.client_name && (
                            <div className="flex items-center">
                                {blok.client_logo?.filename && (
                                    <Image
                                        src={blok.client_logo.filename}
                                        alt={blok.client_logo.alt || blok.client_name}
                                        width={80}
                                        height={40}
                                        className="object-contain mr-3"
                                    />
                                )}
                                <span className="text-lg font-semibold text-gray-900">
                                    {blok.client_name}
                                </span>
                            </div>
                        )}
                        {blok.category && (
                            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                {blok.category}
                            </span>
                        )}
                        {blok.project_date && (
                            <span className="text-gray-600 text-sm">
                                {new Date(blok.project_date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                })}
                            </span>
                        )}
                    </div>

                    {/* Visit Live Project CTA on the right */}
                    {blok.project_url && (
                        <a
                            href={(blok as any).project_url?.url || (blok as any).project_url?.cached_url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                        >
                            Visit Live Project
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
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </a>
                    )}
                </div>

                {/* Main Content */}
                <div className="prose prose-lg max-w-none mb-12">
                    {blok.content && (
                        // Prefer rendering Storyblok RichText JSON; fallback to raw HTML string if provided
                        typeof (blok as any).content === 'object' && (blok as any).content.type === 'doc' ? (
                            <div className="text-gray-700 leading-relaxed">
                                <RichText doc={(blok as any).content} />
                            </div>
                        ) : (
                            <div
                                className="text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: (blok as any).content as unknown as string }}
                            />
                        )
                    )}
                </div>

                {/* Challenge Section */}
                {blok.challenge && (
                    <section className="mb-12 p-8 bg-red-50 rounded-2xl border-l-4 border-red-500">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <svg
                                className="w-6 h-6 mr-3 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            The Challenge
                        </h3>
                        <div className="text-gray-700">
                            {typeof (blok as any).challenge === 'object' && (blok as any).challenge.type === 'doc' ? (
                                <RichText doc={(blok as any).challenge} />
                            ) : (
                                <div
                                    dangerouslySetInnerHTML={{ __html: (blok as any).challenge as unknown as string }}
                                />
                            )}
                        </div>
                    </section>
                )}

                {/* Solution Section */}
                {blok.solution && (
                    <section className="mb-12 p-8 bg-green-50 rounded-2xl border-l-4 border-green-500">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <svg
                                className="w-6 h-6 mr-3 text-green-500"
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
                            Our Solution
                        </h3>
                        <div className="text-gray-700">
                            {typeof (blok as any).solution === 'object' && (blok as any).solution.type === 'doc' ? (
                                <RichText doc={(blok as any).solution} />
                            ) : (
                                <div
                                    dangerouslySetInnerHTML={{ __html: (blok as any).solution as unknown as string }}
                                />
                            )}
                        </div>
                    </section>
                )}

                {/* Project Images Gallery */}
                {blok.project_images && blok.project_images.length > 0 && (
                    <section className="mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {blok.project_images.map((image: { filename: string; alt: string }, index: number) => (
                                <div
                                    key={index}
                                    className="relative aspect-video rounded-xl overflow-hidden shadow-lg"
                                >
                                    <Image
                                        src={image.filename}
                                        alt={image.alt || `Project image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Key Metrics/Results */}
                {blok.results_metrics && blok.results_metrics.length > 0 && (
                    <section className="mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            Results & Impact
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blok.results_metrics.map((metric: { value: string; label: string; description?: string }, index: number) => (
                                <div
                                    key={index}
                                    className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl"
                                >
                                    <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                                        {metric.value}
                                    </div>
                                    <div className="text-lg font-semibold text-gray-900 mb-1">
                                        {metric.label}
                                    </div>
                                    {metric.description && (
                                        <div className="text-sm text-gray-600">
                                            {metric.description}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Technologies Used */}
                {technologies && technologies.length > 0 && (
                    <section className="mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Technologies Used</h3>
                        <div className="flex flex-wrap gap-3">
                            {technologies.map((tech: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Testimonial */}
                {blok.testimonial_text && (
                    <section className="mb-12 p-8 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl text-white">
                        <div className="flex items-start mb-4">
                            <svg
                                className="w-10 h-10 text-blue-200 mr-4 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <div>
                                <p className="text-lg leading-relaxed mb-4">
                                    {blok.testimonial_text}
                                </p>
                                {(blok.testimonial_author || blok.testimonial_role) && (
                                    <div className="border-t border-blue-400 pt-4">
                                        {blok.testimonial_author && (
                                            <div className="font-semibold">{blok.testimonial_author}</div>
                                        )}
                                        {blok.testimonial_role && (
                                            <div className="text-blue-200 text-sm">{blok.testimonial_role}</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Project Link moved to header (top-right) */}
            </div>
        </article>
    )
}
