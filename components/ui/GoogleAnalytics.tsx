'use client'

import { Suspense, useEffect, useRef } from 'react'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  GA_MEASUREMENT_ID,
  isGaConfigured,
  trackPageView,
} from '@/lib/analytics'

/**
 * Google Analytics 4 for IGENTX.
 *
 * Consent Mode defaults and stored Reject are applied in the language layout
 * inline script before this config runs. Config uses anonymize_ip.
 * SPA page_view fires on App Router client navigations only.
 */
function GaRoutePageViews() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstPath = useRef(true)

  useEffect(() => {
    if (!isGaConfigured()) return
    // Initial page_view comes from gtag('config').
    if (isFirstPath.current) {
      isFirstPath.current = false
      return
    }
    const query = searchParams?.toString()
    const pagePath = query ? `${pathname}?${query}` : pathname
    trackPageView(pagePath)
  }, [pathname, searchParams])

  return null
}

export default function GoogleAnalyticsWrapper() {
  if (!isGaConfigured()) {
    return null
  }

  const gaId = GA_MEASUREMENT_ID

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
      <Suspense fallback={null}>
        <GaRoutePageViews />
      </Suspense>
    </>
  )
}
