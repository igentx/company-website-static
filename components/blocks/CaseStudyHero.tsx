import { CaseStudyHeroBlok } from '@/lib/types'
import Image from 'next/image'

/**
 * CaseStudyHero component - Hero section for case study detail pages
 * Displays featured image, title, summary, and key project information
 */
interface CaseStudyHeroProps {
    blok: CaseStudyHeroBlok
}

export default function CaseStudyHero({ blok }: CaseStudyHeroProps) {
    // Try to resolve a live project URL if present on this blok (optional field)
    const projectUrl = (blok as any)?.project_url?.url || (blok as any)?.project_url?.cached_url
    return (
        <section
            className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-blue-950 text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"

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

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        {/* Breadcrumb + Category aligned */}
                        {(blok.back_link || blok.category) && (
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                {blok.back_link && (
                                    <a
                                        href={blok.back_link.url || '/case-studies'}
                                        className="inline-flex items-center text-blue-100 hover:text-white transition-colors"
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
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                        Back to Case Studies
                                    </a>
                                )}
                                {blok.category && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/5 backdrop-blur-sm border border-white/20 text-white/80 rounded-full text-xs md:text-sm font-medium tracking-wider uppercase opacity-80">
                                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        {blok.category}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            {blok.title || 'Case Study'}
                        </h1>

                        {/* Summary */}
                        {blok.summary && (
                            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                                {blok.summary}
                            </p>
                        )}

                        {/* Project Meta Info */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            {blok.client_name && (
                                <div>
                                    <div className="text-sm text-blue-200 mb-1">Client</div>
                                    <div className="text-lg font-semibold">{blok.client_name}</div>
                                </div>
                            )}
                            {blok.industry && (
                                <div>
                                    <div className="text-sm text-blue-200 mb-1">Industry</div>
                                    <div className="text-lg font-semibold">{blok.industry}</div>
                                </div>
                            )}
                            {blok.project_duration && (
                                <div>
                                    <div className="text-sm text-blue-200 mb-1">Duration</div>
                                    <div className="text-lg font-semibold">{blok.project_duration}</div>
                                </div>
                            )}
                            {blok.location && (
                                <div>
                                    <div className="text-sm text-blue-200 mb-1">Location</div>
                                    <div className="text-lg font-semibold">{blok.location}</div>
                                </div>
                            )}
                        </div>

                        {/* Quick Stats */}
                        {blok.quick_stats && blok.quick_stats.length > 0 && (
                            <div className="flex flex-wrap gap-6 pt-6 border-t border-white/20">
                                {blok.quick_stats.map((stat: { value: string; label: string }, index: number) => (
                                    <div key={index}>
                                        <div className="text-3xl font-bold text-white">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-blue-200">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Content - Featured Image */}
                    {blok.featured_image?.filename && (
                        <div className="relative">
                            {projectUrl ? (
                                <a
                                    href={projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Open live project in a new tab"
                                    className="block group"
                                >
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-0 group-hover:ring-2 group-hover:ring-white/60 transition">
                                        <Image
                                            src={blok.featured_image.filename}
                                            alt={blok.featured_image.alt || blok.title || 'Case study featured image'}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                </a>
                            ) : (
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={blok.featured_image.filename}
                                        alt={blok.featured_image.alt || blok.title || 'Case study featured image'}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            )}
                            {/* Decorative Element */}
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-2xl -z-10" />
                            <div className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-20 blur-2xl -z-10" />
                        </div>
                    )}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg
                    className="w-6 h-6 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </section>
    )
}
