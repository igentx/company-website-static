import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Poppins, Cairo } from 'next/font/google'
import '../globals.css'
import { getGlobalContent, getSupportedLanguageCodes } from '@/lib/content'
import { BlockRenderer } from '@/lib/blocks'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ConsentProvider } from '@/contexts/ConsentContext'
import { isRTLLanguage } from '@/lib/languages'
import { extractSEOFromStoryblok, mergeSEOData, generateStructuredData } from '@/lib/seo-utils'
import GoogleAnalyticsWrapper from '@/components/ui/GoogleAnalytics'
import CookieConsentBanner from '@/components/ui/CookieConsentBanner'
import MicrosoftClarity from '@/components/ui/MicrosoftClarity'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { generateStaticLangParams } from '@/lib/static-page'
import { getSeoFallback } from '@/lib/seo-keywords'
import { getSiteBaseUrl } from '@/lib/site-url'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
})

const siteFallback = getSeoFallback('/')

export const metadata: Metadata = {
  title: siteFallback.title,
  description: siteFallback.description,
  keywords: siteFallback.keywords.split(', '),
  authors: [{ name: 'IGENTX' }],
  openGraph: {
    title: siteFallback.title,
    description: siteFallback.description,
    type: 'website',
    siteName: 'IGENTX',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteFallback.title,
    description: siteFallback.description,
  },
}

interface Props {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export const dynamic = 'force-static'
export const dynamicParams = false

export default async function LanguageLayout({ children, params }: Props) {
  const { lang } = await params

  if (!getSupportedLanguageCodes().includes(lang)) {
    notFound()
  }

  const headerContent = getGlobalContent('header', lang)
  const footerContent = getGlobalContent('footer', lang)
  const isRTL = isRTLLanguage(lang)

  const siteBaseUrl = getSiteBaseUrl()

  let structuredData: Record<string, unknown> | null = null
  try {
    const globalSEO = extractSEOFromStoryblok(headerContent)
    if (globalSEO.global) {
      const seoData = mergeSEOData({
        global: globalSEO.global,
        fallback: {
          title: siteFallback.title,
          description: siteFallback.description,
          siteName: 'IGENTX',
          url: isRTL ? `${siteBaseUrl}/${lang}/` : `${siteBaseUrl}/`,
        },
      })
      structuredData = generateStructuredData(
        seoData,
        isRTL ? `${siteBaseUrl}/${lang}/` : `${siteBaseUrl}/`,
        lang,
        'IGENTX'
      ) as Record<string, unknown>
    }
  } catch (error) {
    console.error('Error generating structured data:', error)
  }

  if (!structuredData) {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'IGENTX',
      description: siteFallback.description,
      url: isRTL ? `${siteBaseUrl}/${lang}/` : `${siteBaseUrl}/`,
      inLanguage: lang,
    }
  }

  const headerBlok =
    (headerContent as { global?: Record<string, unknown>[] })?.global?.[0] ||
    headerContent
  const footerBlok =
    (footerContent as { global?: Record<string, unknown>[] })?.global?.[0] ||
    footerContent

  return (
    <html lang={lang} dir={isRTL ? 'rtl' : 'ltr'} className={`${poppins.variable} ${cairo.variable}`}>
      <body className="font-secondary">
        <ConsentProvider>
          <ThemeProvider>
            <LanguageProvider initialLanguage={lang}>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 focus:ring-white"
              >
                Skip to main content
              </a>
              <div className="min-h-screen flex flex-col">
                <BlockRenderer blok={headerBlok as { component: string; _uid: string }} />
                <main id="main-content" className="flex-grow mt-10 md:mt-12" tabIndex={-1}>
                  {children}
                </main>
                <BlockRenderer blok={footerBlok as { component: string; _uid: string }} />
              </div>
              <CookieConsentBanner />
              <GoogleAnalyticsWrapper />
              <MicrosoftClarity />
              <SpeedInsights />
              <Analytics />
            </LanguageProvider>
          </ThemeProvider>
        </ConsentProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const script = document.createElement('script');
                script.src='https://ai.igentx.com/igentx-ai-agent-dc8be0bba04a.min.js';
                script.integrity='sha384-yEPoZlcC+ewAh16pux+hJ43uKkzmffCx1BRXfTGl3ZzMota/bgp7nkms03wed+KG';
                script.crossOrigin = 'anonymous';
                script.async = true;
                script.setAttribute('data-site-key', 'igentx-sites');
                document.body.appendChild(script);
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}

export const generateStaticParams = generateStaticLangParams
