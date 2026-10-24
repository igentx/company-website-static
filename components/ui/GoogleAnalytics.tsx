'use client'

import { Suspense, useEffect, useRef } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  GA_MEASUREMENT_ID,
  isGaConfigured,
  setConsentDefaults,
  trackPageView,
  updateAnalyticsConsent,
} from '@/lib/analytics'
import { useConsent } from '@/contexts/ConsentContext'

/**
 * Google Analytics 4 via @next/third-parties/google.
 *
 * - Loads on every route from the language root layout when NEXT_PUBLIC_GA_ID is set.
 * - Consent Mode v2: default denied (cookieless pings), update to granted on accept.
 * - Fires page_view on App Router client-side navigations.
 *
 * Measurement ID: NEXT_PUBLIC_GA_ID (never hardcode).
 */
function GaRoutePageViews() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstPath = useRef(true)

  useEffect(() => {
    if (!isGaConfigured()) return
    // Initial page_view is sent by gtag('config') from @next/third-parties.
    // Only send again on client-side route changes.
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
  const { consent } = useConsent()

  // Consent Mode defaults as early as possible on the client, then sync stored choice.
  useEffect(() => {
    if (!isGaConfigured()) return
    setConsentDefaults()
    if (consent === 'accepted') {
      updateAnalyticsConsent(true)
    } else if (consent === 'declined') {
      updateAnalyticsConsent(false)
    }
  }, [consent])

  if (!isGaConfigured()) {
    return null
  }

  return (
    <>
      {/* Always load the tag so Consent Mode cookieless pings can fire. */}
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <Suspense fallback={null}>
        <GaRoutePageViews />
      </Suspense>
    </>
  )
}
