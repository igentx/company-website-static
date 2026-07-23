import { BlockRenderer } from '@/lib/blocks'

import {
  buildPageMetadata,
  buildPageStructuredData,
  generateStaticLangParams,
  getPageContent,
} from '@/lib/static-page'
import type { Metadata } from 'next'

const STORY_SLUG = 'blog/childcare-management-software-uae-guide'
const CANONICAL_PATH = '/blog/childcare-management-software-uae-guide'

export const dynamic = 'force-static'

interface Props {
  params: Promise<{ lang: string }>
}

export default async function BlogchildcaremanagementsoftwareuaeguidePage({ params }: Props) {
  const { lang } = await params
  const content = getPageContent(STORY_SLUG, lang)
  const structuredData = buildPageStructuredData(STORY_SLUG, lang, CANONICAL_PATH)

  return (
    <div className="min-h-screen">
      <BlockRenderer blok={content} />
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </div>
  )
}

export const generateStaticParams = generateStaticLangParams

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return buildPageMetadata({ storySlug: STORY_SLUG, canonicalPath: CANONICAL_PATH, lang })
}
