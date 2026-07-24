import { CaseStudyHeroBlok } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

interface CaseStudyHeroProps {
  blok: CaseStudyHeroBlok
}

function resolveProjectUrl(blok: CaseStudyHeroBlok): string | null {
  const url = blok.project_url?.url || blok.project_url?.cached_url
  return url && url !== '#' ? url : null
}

export default function CaseStudyHero({ blok }: CaseStudyHeroProps) {
  const projectUrl = resolveProjectUrl(blok)
  const backHref = blok.back_link?.cached_url || blok.back_link?.url || '/case-studies'
  const backPath = backHref.startsWith('/') ? backHref : `/${backHref}`

  return (
    <section className="relative bg-gradient-to-br from-[#030a23] via-[#111d43] to-[#030a23] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.12)_0%,_transparent_60%)]"
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {(blok.back_link || blok.category) && (
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {blok.back_link && (
                  <Link
                    href={backPath}
                    className="inline-flex items-center text-blue-100 hover:text-white transition-colors text-sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Case Studies
                  </Link>
                )}
                {blok.category && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/20 text-white/80 rounded-full text-xs font-medium tracking-wider uppercase">
                    {blok.category}
                  </div>
                )}
              </div>
            )}

            {blok.client_name && (
              <p className="text-blue-200 text-sm font-medium mb-3 uppercase tracking-wide">{blok.client_name}</p>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {blok.title || 'Case Study'}
            </h1>

            {blok.summary && (
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">{blok.summary}</p>
            )}

            {blok.quick_stats && blok.quick_stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {blok.quick_stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-blue-200 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 text-sm">
              {blok.industry && (
                <div>
                  <div className="text-blue-200 mb-1">Industry</div>
                  <div className="font-semibold">{blok.industry}</div>
                </div>
              )}
              {blok.project_duration && (
                <div>
                  <div className="text-blue-200 mb-1">Duration</div>
                  <div className="font-semibold">{blok.project_duration}</div>
                </div>
              )}
              {blok.location && (
                <div>
                  <div className="text-blue-200 mb-1">Location</div>
                  <div className="font-semibold">{blok.location}</div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#030a23] font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                {blok.primary_cta_text || 'Book a Free Consultation'}
              </Link>
              {projectUrl && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                >
                  Visit live site
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>

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
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group-hover:ring-white/30 transition">
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
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <Image
                    src={blok.featured_image.filename}
                    alt={blok.featured_image.alt || blok.title || 'Case study featured image'}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
