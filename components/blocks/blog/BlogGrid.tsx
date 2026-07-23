import { BlogGridBlok } from '@/lib/types'
import BlogCard from './BlogCard'
import BlogGridClient from './BlogGridClient'
import Link from 'next/link'
import { resolveBlogHref } from '@/lib/blog-utils'

interface BlogGridProps {
  blok: BlogGridBlok
}

export default function BlogGrid({ blok }: BlogGridProps) {
  const featuredUid = blok.featured_blog?._uid
  const gridBlogs =
    featuredUid && blok.blogs
      ? blok.blogs.filter((blog) => blog._uid !== featuredUid)
      : blok.blogs || []

  const ctaHref = blok.cta_link ? resolveBlogHref(blok.cta_link) : undefined

  return (
    <section id="blog-articles" className="bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto">
          {(blok.badge_text || blok.title || blok.description) && (
            <div className="text-center mb-12">
              {blok.badge_text && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                  {blok.badge_text}
                </span>
              )}
              {blok.title && (
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blok.title}</h1>
              )}
              {blok.description && (
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">{blok.description}</p>
              )}
              {blok.intro_text && (
                <p className="text-base text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
                  {blok.intro_text}
                </p>
              )}
            </div>
          )}

          {blok.featured_blog && (
            <div className="mb-12">
              <BlogCard blok={blok.featured_blog} variant="featured" />
            </div>
          )}

          {blok.topic_links && blok.topic_links.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {blok.topic_links.map((topic) => {
                const href = resolveBlogHref(topic.link)
                return (
                  <Link
                    key={topic._uid}
                    href={href}
                    className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{topic.title}</h3>
                    {topic.description && (
                      <p className="text-sm text-gray-600">{topic.description}</p>
                    )}
                  </Link>
                )
              })}
            </div>
          )}

          <BlogGridClient
            blogs={gridBlogs}
            columns={blok.columns}
            showFilters={blok.show_filters}
            filterCategories={blok.filter_categories}
          />

          {(blok.cta_text || blok.cta_link) && (
            <div className="mt-16 text-center rounded-2xl bg-gradient-to-br from-[#030a23] via-[#111d43] to-[#030a23] px-8 py-12">
              {blok.cta_text && (
                <h3 className="text-2xl font-bold text-white mb-6">{blok.cta_text}</h3>
              )}
              {ctaHref && (
                <Link
                  href={ctaHref}
                  className="inline-flex items-center px-8 py-3 bg-white text-[#030a23] font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Book a Free Consultation
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
