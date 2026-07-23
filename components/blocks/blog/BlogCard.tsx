import { BlogCardBlok } from '@/lib/types'
import { formatBlogDate, parseBlogTags, resolveBlogHref } from '@/lib/blog-utils'
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  blok: BlogCardBlok
  variant?: 'default' | 'featured'
}

export default function BlogCard({ blok, variant = 'default' }: BlogCardProps) {
  const publishDate = formatBlogDate(blok.publish_date, 'short')
  const href = resolveBlogHref(blok.link)
  const tags = parseBlogTags(blok.tags)
  const isFeatured = variant === 'featured'

  return (
    <Link
      href={href}
      className="block group h-full"
      aria-label={`Read article: ${blok.title}`}
    >
      <article
        className={`bg-white overflow-hidden flex h-full transition-all duration-300 ${
          isFeatured
            ? 'rounded-2xl shadow-lg hover:shadow-2xl md:flex-row flex-col'
            : 'rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 flex-col'
        }`}
      >
        <div
          className={`relative overflow-hidden bg-gray-200 shrink-0 ${
            isFeatured ? 'md:w-1/2 aspect-video md:aspect-auto md:min-h-[280px]' : 'aspect-video'
          }`}
        >
          {blok.featured_image?.filename && (
            <Image
              src={blok.featured_image.filename}
              alt={blok.featured_image.alt || blok.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes={isFeatured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
            />
          )}
          {blok.category && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                {blok.category}
              </span>
            </div>
          )}
        </div>

        <div className={`flex flex-col flex-grow ${isFeatured ? 'p-8 md:w-1/2' : 'p-6'}`}>
          {isFeatured && (
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
              Featured Article
            </span>
          )}
          <h3
            className={`font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors ${
              isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}
          >
            {blok.title}
          </h3>
          <p className={`text-gray-600 mb-4 line-clamp-3 flex-grow ${isFeatured ? 'text-base' : 'text-sm'}`}>
            {blok.excerpt}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200 text-xs text-gray-500 mt-auto">
            {blok.author_name && (
              <span className="font-medium text-gray-700">{blok.author_name}</span>
            )}
            {publishDate && <span>{publishDate}</span>}
            {blok.reading_time && <span>{blok.reading_time}</span>}
          </div>
        </div>
      </article>
    </Link>
  )
}
