import { BlockRenderer } from '@/lib/blocks'
import { CaseStudyGridBlok } from '@/lib/types'

/**
 * CaseStudyGrid component - Displays a grid of case study cards
 * Main component for case studies listing page
 */
interface CaseStudyGridProps {
    blok: CaseStudyGridBlok
}

export default function CaseStudyGrid({ blok }: CaseStudyGridProps) {
    return (
        <section className="bg-white">
            {/* Gradient Header Section */}
            <div
                className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-blue-900 via-purple-900 to-blue-950 overflow-hidden"
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
                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16">
                        {blok.badge_text && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 rounded-full text-xs md:text-sm font-medium tracking-wider uppercase mb-6 opacity-80">
                                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                {blok.badge_text}
                            </div>
                        )}

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            {blok.title || 'Our Case Studies'}
                        </h2>

                        {blok.description && (
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                {blok.description}
                            </p>
                        )}
                    </div>

                    {/* Filter Tabs (Optional) */}
                    {blok.show_filters && blok.filter_categories && blok.filter_categories.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                                All
                            </button>
                            {blok.filter_categories.map((category: string, index: number) => (
                                <button
                                    key={index}
                                    className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-100 transition-colors"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* White Content Section */}
            <div className="px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-7xl mx-auto">
                    {/* Case Studies Grid */}
                    {blok.case_studies && blok.case_studies.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blok.case_studies.map((caseStudy) => (
                                <BlockRenderer blok={caseStudy} key={caseStudy._uid} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg">No case studies available yet.</p>
                        </div>
                    )}

                    {/* Call to Action */}
                    {blok.cta_text && blok.cta_link && (
                        <div className="mt-16 text-center">
                            <a
                                href={blok.cta_link.url || '#'}
                                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                            >
                                {blok.cta_text}
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
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
