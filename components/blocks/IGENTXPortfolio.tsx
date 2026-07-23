import { IGENTXPortfolioBlok } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

function normalizeTechnologies(technologies?: string[] | string): string[] {
  if (Array.isArray(technologies)) return technologies
  if (typeof technologies === 'string') {
    return technologies.split('\n').map((tech) => tech.trim()).filter(Boolean)
  }
  return []
}

/**
 * IGENTX Portfolio component - Showcases case studies, demo projects, and before/after comparisons
 * Features performance metrics, client testimonials, and UAE market success stories
 */
interface IGENTXPortfolioProps {
  blok: IGENTXPortfolioBlok
}

export default function IGENTXPortfolio({ blok }: IGENTXPortfolioProps) {
  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100 overflow-hidden"
      id="our-case-studies"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          {blok.badge_text && (
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {blok.badge_text}
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {blok.title || 'Our Success Stories'}
          </h2>

          {blok.description && (
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {blok.description}
            </p>
          )}
        </div>

        {/* Portfolio Grid */}
        {Array.isArray(blok.case_studies) && blok.case_studies.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {blok.case_studies.map((caseStudy, index) => {
              const technologies = normalizeTechnologies(caseStudy.technologies)

              return (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Project Image */}
                {caseStudy.image?.filename && (
                  <div className="relative overflow-hidden">
                    <Image
                      src={caseStudy.image.filename}
                      alt={caseStudy.image.alt || ''}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}

                <div className="p-8">
                  {/* Project Category */}
                  {caseStudy.category && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-4">
                      {caseStudy.category}
                    </div>
                  )}

                  {(caseStudy.industry || caseStudy.country) && (
                    <div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-500">
                      {caseStudy.industry && <span>Industry: {caseStudy.industry}</span>}
                      {caseStudy.country && <span>· {caseStudy.country}</span>}
                    </div>
                  )}

                  {/* Project Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {caseStudy.title}
                  </h3>

                  {caseStudy.challenge && (
                    <p className="text-sm text-gray-500 mb-3">
                      <span className="font-semibold text-gray-700">Challenge: </span>
                      {caseStudy.challenge}
                    </p>
                  )}

                  {/* Project Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {caseStudy.description}
                  </p>

                  {/* Key Results */}
                  {Array.isArray(caseStudy.results) && caseStudy.results.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Results:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {caseStudy.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="text-2xl font-bold text-blue-600">{result.value}</div>
                            <div className="text-sm text-gray-600">{result.metric}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies Used */}
                  {technologies.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Links */}
                  <div className="flex flex-wrap gap-3">
                    {caseStudy.live_url && (
                      <a
                        href={caseStudy.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Live Site
                      </a>
                    )}
                    {caseStudy.case_study_url && (
                      <Link
                        href={caseStudy.case_study_url}
                        className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Read Case Study
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}

        {/* Performance Comparison */}
        {blok.show_performance_comparison && (
          <div className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">
                  {blok.performance_title || 'Before vs After: Real Performance Impact'}
                </h3>
                <p className="text-blue-100 max-w-2xl mx-auto">
                  {blok.performance_description || 'See how our AI-driven approach delivers measurable improvements in website performance and user experience.'}
                </p>
              </div>

              {Array.isArray(blok.performance_metrics) && blok.performance_metrics.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {blok.performance_metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <div className="text-2xl md:text-3xl font-bold mb-2">{metric.improvement}</div>
                        <div className="text-blue-200 text-xs md:text-sm mb-2">{metric.metric_name}</div>
                        <div className="flex justify-center items-center text-xs md:text-sm">
                          <span className="text-red-200 line-through mr-1.5">{metric.before}</span>
                          <svg className="w-3 h-3 md:w-4 md:h-4 text-green-300 mx-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                          <span className="text-green-300 font-semibold">{metric.after}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Client Testimonials */}
        {blok.testimonials && blok.testimonials.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {blok.testimonials_title || 'What Our Clients Say'}
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {blok.testimonials_description || 'Hear from UAE businesses that have transformed their digital presence with IGENTX.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blok.testimonials.map((testimonial, index) => {
                const rating = Number(testimonial.rating) || 5

                return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-gray-200/80 hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    </div>
                    {testimonial.verified && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Verified client
                      </span>
                    )}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex items-center">
                    {testimonial.avatar?.filename ? (
                      <Image
                        src={testimonial.avatar.filename}
                        alt={testimonial.avatar.alt || ''}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-semibold text-sm">
                          {testimonial.name?.charAt(0) || 'C'}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.position}
                        {testimonial.company && `, ${testimonial.company}`}
                        {testimonial.country && ` · ${testimonial.country}`}
                      </div>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        )}

        {/* Demo Projects CTA */}
        {blok.show_demo_cta && (
          <div className="text-center">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {blok.demo_cta_title || 'Want to See More?'}
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                {blok.demo_cta_description || 'Explore our demo projects and see how AI-driven development can transform your business.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {blok.demo_cta_primary && (
                  <a
                    href={blok.demo_cta_primary_link?.url || '#'}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
                  >
                    {blok.demo_cta_primary}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </a>
                )}
                {blok.demo_cta_secondary && (
                  <a
                    href={blok.demo_cta_secondary_link?.url || '#'}
                    className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300"
                  >
                    {blok.demo_cta_secondary}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
