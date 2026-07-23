import { BlockRenderer } from '@/lib/blocks'
import AutoClickChatFab from '@/components/ui/AutoClickChatFab'
import {
  buildPageMetadata,
  buildPageStructuredData,
  generateStaticLangParams,
  getPageContent,
} from '@/lib/static-page'
import type { Metadata } from 'next'

const STORY_SLUG = 'products/ai-customer-service-agent'
const CANONICAL_PATH = '/products/ai-customer-service-agent'

export const dynamic = 'force-static'

interface Props {
  params: Promise<{ lang: string }>
}

export default async function AiCustomerServiceAgentPage({ params }: Props) {
  const { lang } = await params
  const content = getPageContent(STORY_SLUG, lang)
  const structuredData = buildPageStructuredData(STORY_SLUG, lang, CANONICAL_PATH)

  return (
    <div className="min-h-screen">
      <AutoClickChatFab />
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
