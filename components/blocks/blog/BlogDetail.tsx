import { BlockRenderer } from '@/lib/blocks'
import { BlogDetailBlok } from '@/lib/types'
import {
  extractHeadings,
  formatBlogDate,
  isExternalBlogHref,
  parseBlogTags,
  resolveBlogHref,
} from '@/lib/blog-utils'
import BlogTableOfContents from './BlogTableOfContents'
import BlogShareBar from './BlogShareBar'
import BlogAuthorBio from './BlogAuthorBio'
import Link from 'next/link'

interface BlogDetailProps {
  blok: BlogDetailBlok
  pageTitle?: string
}

function normalizeTakeaways(items?: string[] | string): string[] {
  if (Array.isArray(items)) return items.filter(Boolean)
  if (typeof items === 'string') {
    return items
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

export default function BlogDetail({ blok, pageTitle }: BlogDetailProps) {
  const updatedDate = formatBlogDate(blok.updated_date)
  const publishDate = formatBlogDate(blok.publish_date)
  const tags = parseBlogTags(blok.tags)
  const headings = extractHeadings(blok.content_blocks)
  const showToc = blok.show_toc !== false && headings.length > 0
  const takeaways = normalizeTakeaways(blok.key_takeaways)
  const shareTitle = pageTitle || 'IGENTX Blog Article'

  return (
    <article className="bg-gray-50">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`grid gap-10 ${showToc ? 'lg:grid-cols-[220px_1fr]' : ''}`}>
            {showToc && <BlogTableOfContents headings={headings} />}

            <div className="min-w-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 max-w-3xl">
                {takeaways.length > 0 && (
                  <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Key takeaways</h2>
                    <ul className="space-y-2">
                      {takeaways.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {blok.content_blocks && blok.content_blocks.length > 0 ? (
                  <div className="prose prose-lg max-w-none mb-8">
                    {blok.content_blocks.map((block) => (
                      <BlockRenderer key={block._uid} blok={block} />
                    ))}
                  </div>
                ) : null}

                <BlogShareBar title={shareTitle} />

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 py-6">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {updatedDate && publishDate !== updatedDate && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                    Last updated on {updatedDate}
                  </div>
                )}

                {(blok.cta_section_title || blok.cta_section_text) && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-[#030a23] to-[#111d43] rounded-xl">
                    {blok.cta_section_title && (
                      <h3 className="text-xl font-bold text-white mb-3">
                        {blok.cta_section_title}
                      </h3>
                    )}
                    {blok.cta_section_text && (
                      <p className="text-gray-300 mb-4 text-sm">{blok.cta_section_text}</p>
                    )}
                    {blok.cta_button_link && (
                      isExternalBlogHref(resolveBlogHref(blok.cta_button_link)) ? (
                        <a
                          href={resolveBlogHref(blok.cta_button_link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-5 py-2.5 bg-white text-[#030a23] font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
                        >
                          {blok.cta_button_text || 'Learn more'}
                        </a>
                      ) : (
                        <Link
                          href={resolveBlogHref(blok.cta_button_link)}
                          className="inline-flex items-center px-5 py-2.5 bg-white text-[#030a23] font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
                        >
                          {blok.cta_button_text || 'Learn more'}
                        </Link>
                      )
                    )}
                  </div>
                )}

                {blok.author_name && blok.author_bio && (
                  <BlogAuthorBio
                    authorName={blok.author_name}
                    authorRole={blok.author_role}
                    authorBio={blok.author_bio}
                    authorAvatar={blok.author_avatar}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {blok.related_posts && blok.related_posts.length > 0 && (
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blok.related_posts.map((post) => (
                <BlockRenderer key={post._uid} blok={post} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
