import { BlogHeadingBlok } from '@/lib/types'
import { slugifyHeading } from '@/lib/blog-utils'

interface BlogHeadingProps {
  blok: BlogHeadingBlok
}

export default function BlogHeading({ blok }: BlogHeadingProps) {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[blok.alignment || 'left']

  const headingClasses = {
    h1: 'text-4xl md:text-5xl font-bold',
    h2: 'text-3xl md:text-4xl font-bold scroll-mt-28',
    h3: 'text-2xl md:text-3xl font-bold scroll-mt-28',
    h4: 'text-xl md:text-2xl font-bold',
    h5: 'text-lg md:text-xl font-bold',
    h6: 'text-base md:text-lg font-bold',
  }

  const level = blok.level || 'h2'
  const HeadingTag = level as keyof JSX.IntrinsicElements
  const headingId = slugifyHeading(blok.text || '')

  return (
    <div className={`py-4 ${alignmentClass}`}>
      <HeadingTag
        id={headingId || undefined}
        className={`${headingClasses[level]} text-gray-900 leading-tight`}
      >
        {blok.text}
      </HeadingTag>
    </div>
  )
}
