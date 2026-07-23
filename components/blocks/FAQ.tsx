'use client'

import { FAQBlok } from '@/lib/types'
import { useMemo, useState } from 'react'

interface FAQProps {
  blok: FAQBlok
}

export default function FAQ({ blok }: FAQProps) {
  const [expanded, setExpanded] = useState(false)

  if (!Array.isArray(blok.faqs) || blok.faqs.length === 0) return null

  const initialCount = blok.initial_visible_count || 10
  const visibleFaqs = expanded ? blok.faqs : blok.faqs.slice(0, initialCount)

  const groupedFaqs = useMemo(() => {
    const groups = new Map<string, typeof blok.faqs>()
    visibleFaqs.forEach((faq) => {
      const category = faq.category || 'General'
      if (!groups.has(category)) groups.set(category, [])
      groups.get(category)!.push(faq)
    })
    return Array.from(groups.entries())
  }, [visibleFaqs])

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: blok.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1535] to-[#030a23]"
      id="faq"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {blok.faq_title || 'Frequently Asked Questions'}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {blok.faq_description ||
              'Authoritative answers about our services, process and technology.'}
          </p>
        </div>

        <div className="space-y-10">
          {groupedFaqs.map(([category, faqs]) => (
            <div key={category}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 mb-4">
                {category}
              </h3>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={`${category}-${index}`}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <h4 className="font-semibold text-white pr-4">{faq.question}</h4>
                        <svg
                          className="w-5 h-5 text-gray-400 transform group-open:rotate-180 transition-transform flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {blok.faqs.length > initialCount && (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="inline-flex items-center px-8 py-3 border-2 border-purple-400/50 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              {expanded ? 'Show fewer questions' : `View all FAQs (${blok.faqs.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
