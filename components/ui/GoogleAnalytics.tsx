'use client'

import { useEffect, useState } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { useConsent } from '@/contexts/ConsentContext'

/**
 * Google Analytics Component
 * 
 * Conditionally renders Google Analytics tracking script
 * Only loads when:
 * 1. NEXT_PUBLIC_GA_ID environment variable is set
 * 2. User has given consent for analytics tracking
 * 
 * Usage:
 * Add NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX to your .env.local file
 */
export default function GoogleAnalyticsWrapper() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const { hasConsented, consent } = useConsent()
  const [shouldLoad, setShouldLoad] = useState(false)

  // Only render Google Analytics if GA ID is provided
  if (!gaId) {
    return null
  }

  // Wait for consent decision before loading
  useEffect(() => {
    // Only load if user has explicitly accepted
    if (consent === 'accepted') {
      setShouldLoad(true)
    } else if (consent === 'declined') {
      setShouldLoad(false)
    }
    // If consent is null/pending, don't load (wait for user decision)
  }, [consent, hasConsented])

  // Only load GA if user has consented
  if (!shouldLoad) {
    return null
  }

  return <GoogleAnalytics gaId={gaId} />
}

