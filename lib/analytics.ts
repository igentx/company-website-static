/**
 * Small GA4 helpers for IGENTX.
 *
 * Measurement ID: process.env.NEXT_PUBLIC_GA_ID (set in Vercel / .env).
 * Do not hardcode a G- ID in source.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || ''

export function isGaConfigured(): boolean {
  return Boolean(GA_MEASUREMENT_ID)
}

type GtagConsentState = 'granted' | 'denied'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/** Ensure dataLayer + gtag stub exist before Consent Mode or config calls. */
export function ensureGtagStub(): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    // Must push the Arguments object (same stub as Google's snippet), not a rest array.
    window.gtag = function gtag(this: void) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments)
    }
  }
}

/**
 * Google Consent Mode v2 defaults (denied) so cookieless pings can still fire
 * once the GA tag loads, until the visitor updates consent.
 */
export function setConsentDefaults(): void {
  ensureGtagStub()
  window.gtag?.('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  })
}

export function updateAnalyticsConsent(granted: boolean): void {
  ensureGtagStub()
  const value: GtagConsentState = granted ? 'granted' : 'denied'
  window.gtag?.('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  })
}

/** Fire a GA4 event when gtag is available (no-op if GA is not loaded yet). */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === 'undefined') return
  if (!isGaConfigured()) return
  ensureGtagStub()
  window.gtag?.('event', eventName, params)
}

/** SPA page_view for App Router client navigations. */
export function trackPageView(pagePath: string): void {
  if (!isGaConfigured()) return
  ensureGtagStub()
  window.gtag?.('event', 'page_view', {
    page_path: pagePath,
    page_location: typeof window !== 'undefined' ? window.location.href : undefined,
    page_title: typeof document !== 'undefined' ? document.title : undefined,
  })
}

/** Successful contact / Book a Free Consultation form submission. */
export function trackGenerateLead(extra?: Record<string, string | number | boolean | undefined>): void {
  trackEvent('generate_lead', extra)
}

export function trackWhatsappClick(href: string): void {
  trackEvent('whatsapp_click', { link_url: href })
}

export function trackPhoneClick(href: string): void {
  trackEvent('phone_click', { link_url: href })
}

export function trackEmailClick(href: string): void {
  trackEvent('email_click', { link_url: href })
}
