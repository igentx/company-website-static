import { CaseStudyRelatedBlok } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

interface CaseStudyRelatedProps {
  blok: CaseStudyRelatedBlok
}

function resolveHref(link?: { linktype?: string; url?: string; cached_url?: string }) {
  const raw = link?.cached_url || link?.url || ''
  if (!raw) return '#'
  if (raw.startsWith('http')) return raw
  return raw.startsWith('/') ? raw : `/${raw}`
}

export default function CaseStudyRelated({ blok }: CaseStudyRelatedProps) {
  const items = blok.related_case_studies?.filter((item) => item.title) ?? []
  if (items.length === 0) return null

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
          {blok.title || 'More success stories'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => {
            const href = resolveHref(item.link)
            return (
              <Link
                key={index}
                href={href}
                className="group block bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {item.featured_image?.filename && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={item.featured_image.filename}
                      alt={item.featured_image.alt || item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  {item.client_name && (
                    <p className="text-sm font-medium text-blue-600 mb-2">{item.client_name}</p>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{item.excerpt}</p>
                  )}
                  <span className="inline-flex items-center mt-4 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                    Read case study
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
