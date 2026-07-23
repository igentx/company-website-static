#!/usr/bin/env node
/**
 * Regenerate app page.tsx files to use static content layer.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const PAGES = [
  { file: 'app/[lang]/page.tsx', slug: 'home', path: '/', name: 'LanguageHomePage' },
  { file: 'app/[lang]/contact/page.tsx', slug: 'contact', path: '/contact', name: 'LanguageContactPage' },
  { file: 'app/[lang]/privacy/page.tsx', slug: 'privacy', path: '/privacy', name: 'LanguagePrivacyPage' },
  { file: 'app/[lang]/terms/page.tsx', slug: 'terms', path: '/terms', name: 'LanguageTermsPage' },
  { file: 'app/[lang]/services/page.tsx', slug: 'services-landing-page', path: '/services', name: 'LanguageServicesPage' },
  { file: 'app/[lang]/services/web-development-uae/page.tsx', slug: 'services/web-development-uae', path: '/services/web-development-uae', name: 'WebDevelopmentUaePage' },
  { file: 'app/[lang]/services/web-development/page.tsx', slug: 'services/web-development', path: '/services/web-development', name: 'WebDevelopmentPage' },
  { file: 'app/[lang]/services/ecommerce-development/page.tsx', slug: 'services/ecommerce-development', path: '/services/ecommerce-development', name: 'EcommerceDevelopmentPage' },
  { file: 'app/[lang]/services/branding-graphic-design/page.tsx', slug: 'services/branding-graphic-design', path: '/services/branding-graphic-design', name: 'BrandingGraphicDesignPage' },
  { file: 'app/[lang]/services/seo/page.tsx', slug: 'services/seo', path: '/services/seo', name: 'SeoServicesPage' },
  { file: 'app/[lang]/services/ecommerce-website-development-uae/page.tsx', slug: 'services/ecommerce-website-development-uae', path: '/services/ecommerce-website-development-uae', name: 'EcommerceUaePage' },
  { file: 'app/[lang]/services/graphic-design-uae/page.tsx', slug: 'services/graphic-design-uae', path: '/services/graphic-design-uae', name: 'GraphicDesignUaePage' },
  { file: 'app/[lang]/services/seo-service-uae/page.tsx', slug: 'services/seo-service-uae', path: '/services/seo-service-uae', name: 'SeoServiceUaePage' },
  { file: 'app/[lang]/uae/page.tsx', slug: 'uae', path: '/uae', name: 'UaeHubPage' },
  { file: 'app/[lang]/products/page.tsx', slug: 'products-landing-page', path: '/products', name: 'ProductsLandingPage' },
  { file: 'app/[lang]/products/daycaremate/page.tsx', slug: 'products/daycaremate', path: '/products/daycaremate', name: 'DaycareMateProductPage' },
  { file: 'app/[lang]/case-studies/page.tsx', slug: 'case-studies-landing-page', path: '/case-studies', name: 'CaseStudiesPage' },
  { file: 'app/[lang]/case-studies/web-development-uae-startup-moduluxe-group/page.tsx', slug: 'case-studies/web-development-uae-startup-moduluxe-group', path: '/case-studies/moduluxe-group', name: 'ModuluxeCaseStudyPage' },
  { file: 'app/[lang]/products/ai-customer-service-agent/page.tsx', slug: 'products/ai-customer-service-agent', path: '/products/ai-customer-service-agent', name: 'AiCustomerServiceAgentPage', extraImports: "import AutoClickChatFab from '@/components/ui/AutoClickChatFab'", extraBody: '<AutoClickChatFab />', wrapperClass: 'min-h-screen bg-white' },
  { file: 'app/[lang]/case-studies/web-development-startup-dr-door/page.tsx', slug: 'case-studies/web-development-startup-dr-door', path: '/case-studies/dr-door', name: 'DrDoorCaseStudyPage' },
  { file: 'app/[lang]/case-studies/bloomwave-learning-daycare/page.tsx', slug: 'case-studies/bloomwave-learning-daycare', path: '/case-studies/bloomwave-learning-daycare', name: 'BloomwaveCaseStudyPage' },
  { file: 'app/[lang]/blog/page.tsx', slug: 'blog-landing-page', path: '/blog', name: 'BlogLandingPage' },
  { file: 'app/[lang]/blog/importance-of-website-uae/page.tsx', slug: 'blog/importance-of-website-uae', path: '/blog/importance-of-website-uae', name: 'BlogImportancePage' },
  { file: 'app/[lang]/blog/ai-in-web-development-uae/page.tsx', slug: 'blog/ai-in-web-development-uae', path: '/blog/ai-in-web-development-uae', name: 'BlogAiWebDevPage' },
  { file: 'app/[lang]/blog/how-to-choose-best-web-development-agency-uae/page.tsx', slug: 'blog/how-to-choose-best-web-development-agency-uae', path: '/blog/how-to-choose-best-web-development-agency-uae', name: 'BlogChooseAgencyPage' },
  { file: 'app/[lang]/blog/web-development-uae/page.tsx', slug: 'blog/web-development-uae', path: '/blog/web-development-uae', name: 'BlogWebDevUaePage' },
  { file: 'app/[lang]/blog/ai-customer-service-agent-uae/page.tsx', slug: 'blog/ai-customer-service-agent-uae', path: '/blog/ai-customer-service-agent-uae', name: 'BlogAiAgentUaePage' },
  { file: 'app/[lang]/blog/daycaremate-childcare-management-software-guide/page.tsx', slug: 'blog/daycaremate-childcare-management-software-guide', path: '/blog/daycaremate-childcare-management-software-guide', name: 'BlogDaycareMateGuidePage' },
]

function generatePage({ slug, path: canonicalPath, name, extraImports = '', extraBody = '', wrapperClass = 'min-h-screen' }) {
  return `import { BlockRenderer } from '@/lib/blocks'
${extraImports}
import {
  buildPageMetadata,
  buildPageStructuredData,
  generateStaticLangParams,
  getPageContent,
} from '@/lib/static-page'
import type { Metadata } from 'next'

const STORY_SLUG = '${slug}'
const CANONICAL_PATH = '${canonicalPath}'

export const dynamic = 'force-static'

interface Props {
  params: Promise<{ lang: string }>
}

export default async function ${name}({ params }: Props) {
  const { lang } = await params
  const content = getPageContent(STORY_SLUG, lang)
  const structuredData = buildPageStructuredData(STORY_SLUG, lang, CANONICAL_PATH)

  return (
    <div className="${wrapperClass}">
      ${extraBody}
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
`
}

for (const page of PAGES) {
  const filePath = path.join(ROOT, page.file)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, generatePage(page))
  console.log(`✓ ${page.file}`)
}
