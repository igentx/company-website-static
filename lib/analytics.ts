/**
 * Small GA4 helpers for IGENTX.
 *
 * Measurement ID: process.env.NEXT_PUBLIC_GA_ID (set in Vercel / .env).
 * Do not hardcode a G- ID in source.
 *
 * Consent is opt-out (aligned with clayox.com): analytics_storage defaults to
 * granted; ad_* stay denied. Accept/Reject update only analytics_storage.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || ''

/** localStorage: 'accepted' | 'rejected' */
export const COOKIE_CONSENT_KEY = 'igentx-cookie-consent'

/** localStorage: timestamp string; banner hidden for 30 days after dismiss/choice */
export const COOKIE_BANNER_SEEN_KEY = 'igentx-cookie-banner-seen'

export const COOKIE_BANNER_SEEN_TTL_MS = 30 * 24 * 60 * 60 * 1000

export const OPEN_COOKIE_SETTINGS_EVENT = 'igentx:open-cookie-settings'

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
 * Opt-out Consent Mode v2 defaults: analytics on, ads off.
 * Call before gtag config. A stored Reject is applied separately.
 */
export function setConsentDefaults(): void {
  ensureGtagStub()
  window.gtag?.('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  })
}

/** Apply a stored Reject before config so later visits stay opted out. */
export function applyStoredRejectBeforeConfig(): void {
  if (typeof window === 'undefined') return
  ensureGtagStub()
  try {
    if (localStorage.getItem(COOKIE_CONSENT_KEY) === 'rejected') {
      window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
    }
  } catch {
    /* private mode / blocked storage */
  }
}

/** Accept or Reject updates only analytics_storage (ads stay denied). */
export function updateAnalyticsConsent(granted: boolean): void {
  ensureGtagStub()
  const value: GtagConsentState = granted ? 'granted' : 'denied'
  window.gtag?.('consent', 'update', {
    analytics_storage: value,
  })
}

/** Clear GA (_ga*) cookies after Reject. */
export function clearGaCookies(): void {
  if (typeof document === 'undefined') return
  document.cookie.split(';').forEach((cookie) => {
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim()
    if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`
    }
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
