import { BlogHeroBlok } from '@/lib/types'
import { formatBlogDate } from '@/lib/blog-utils'
import CircuitHeroBackground from '@/components/ui/CircuitHeroBackground'
import Image from 'next/image'
import Link from 'next/link'

interface BlogHeroProps {
  blok: BlogHeroBlok
}

export default function BlogHero({ blok }: BlogHeroProps) {
  const publishDate = formatBlogDate(blok.publish_date)
  const category = blok.category

  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-blue-950 text-white pt-20 pb-12 md:pt-28 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <CircuitHeroBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-blue-200">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            {category && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <span className="text-white/80">{category}</span>
                </li>
              </>
            )}
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {category && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 rounded-full text-xs font-medium tracking-wider uppercase mb-6">
                {category}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              {blok.title}
            </h1>

            {blok.excerpt && (
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-medium">
                {blok.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/20">
              {blok.author_name && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="font-bold text-white">
                      {blok.author_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium text-white">By {blok.author_name}</span>
                </div>
              )}
              {publishDate && <span className="text-gray-300">{publishDate}</span>}
              {blok.reading_time && <span className="text-gray-300">{blok.reading_time}</span>}
            </div>
          </div>

          {blok.featured_image?.filename && (
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={blok.featured_image.filename}
                alt={blok.featured_image.alt || blok.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
