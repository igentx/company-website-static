import { BlockRenderer } from '@/lib/blocks'
import { LegalPageBlok } from '@/lib/types'

interface LegalPageProps {
  blok: LegalPageBlok
}

function formatLastUpdated(dateString: string): string {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function LegalPage({ blok }: LegalPageProps) {
  return (
    <article className="bg-white">
      <div className="pt-24 pb-12 md:pt-28 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 pb-8 border-b border-gray-200">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {blok.title}
            </h1>
            {blok.last_updated && (
              <p className="text-sm text-gray-500">
                Last updated: {formatLastUpdated(blok.last_updated)}
              </p>
            )}
          </header>

          {blok.content_blocks?.map((nestedBlok) => (
            <BlockRenderer blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      </div>
    </article>
  )
}
