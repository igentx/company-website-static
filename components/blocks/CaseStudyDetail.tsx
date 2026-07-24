import { RichText } from '@/lib/blocks'
import { CaseStudyDetailBlok } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

interface CaseStudyDetailProps {
  blok: CaseStudyDetailBlok
}

function isRichTextDoc(value: unknown): value is { type: string } {
  return typeof value === 'object' && value !== null && (value as { type?: string }).type === 'doc'
}

function RichOrString({ value }: { value: unknown }) {
  if (!value) return null
  if (isRichTextDoc(value)) {
    return (
      <div className="text-gray-700 leading-relaxed prose prose-gray max-w-none">
        <RichText doc={value} />
      </div>
    )
  }
  if (typeof value === 'string') {
    return (
      <div
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    )
  }
  return null
}

function resolveProjectUrl(blok: CaseStudyDetailBlok): string | null {
  const url = blok.project_url?.url || blok.project_url?.cached_url
  return url && url !== '#' ? url : null
}

export default function CaseStudyDetail({ blok }: CaseStudyDetailProps) {
  const technologies: string[] = Array.isArray(blok.technologies)
    ? blok.technologies
    : typeof blok.technologies === 'string'
      ? blok.technologies.split(',').map((t) => t.trim()).filter(Boolean)
      : []

  const projectUrl = resolveProjectUrl(blok)

  return (
    <article>
      {/* Results strip */}
      {blok.results_metrics && blok.results_metrics.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
              Results and impact
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blok.results_metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200/80 p-6 text-center shadow-sm"
                >
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{metric.value}</div>
                  <div className="text-base font-semibold text-gray-900 mb-1">{metric.label}</div>
                  {metric.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">{metric.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main narrative */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
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
                  <span className="text-lg font-semibold text-gray-900">{blok.client_name}</span>
                </div>
              )}
              {blok.category && (
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {blok.category}
                </span>
              )}
              {blok.project_date && (
                <span className="text-gray-600 text-sm">
                  {new Date(blok.project_date).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </span>
              )}
            </div>
            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Visit live project
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>

          {blok.content && (
            <div className="prose prose-lg max-w-none mb-12">
              <RichOrString value={blok.content} />
            </div>
          )}

          {(blok.challenge || blok.solution || blok.outcome) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {blok.challenge && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">Problem</h3>
                  <RichOrString value={blok.challenge} />
                </div>
              )}
              {blok.solution && (
                <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-blue-600 mb-3">Solution</h3>
                  <RichOrString value={blok.solution} />
                </div>
              )}
              {blok.outcome && (
                <div className="rounded-2xl border border-green-100 bg-green-50/50 p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-green-600 mb-3">Business outcome</h3>
                  <RichOrString value={blok.outcome} />
                </div>
              )}
            </div>
          )}

          {blok.project_images && blok.project_images.length > 0 && (
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Project gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blok.project_images.map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
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

          {(technologies.length > 0 || (blok.service_links && blok.service_links.length > 0)) && (
            <section className="mb-12">
              {technologies.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Technologies used</h3>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              )}
              {blok.service_links && blok.service_links.length > 0 && (
                <>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Related services</h3>
                  <div className="flex flex-wrap gap-3">
                    {blok.service_links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url.startsWith('/') ? link.url : `/${link.url}`}
                        className="inline-flex items-center px-4 py-2 border border-blue-200 text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                      >
                        {link.label}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </section>
          )}
        </div>
      </section>

      {/* Verified testimonial */}
      {blok.testimonial_text && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#030a23] via-[#111d43] to-[#030a23]">
          <div className="max-w-4xl mx-auto">
            <div className="relative p-8 md:p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              {blok.testimonial_author && (
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold uppercase tracking-wide">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified client
                </div>
              )}
              <svg className="w-10 h-10 text-blue-300/60 mb-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-lg md:text-xl text-gray-100 leading-relaxed mb-6">{blok.testimonial_text}</p>
              {(blok.testimonial_author || blok.testimonial_role) && (
                <div className="border-t border-white/10 pt-4">
                  {blok.testimonial_author && (
                    <div className="font-semibold text-white">{blok.testimonial_author}</div>
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
    </article>
  )
}
