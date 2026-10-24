'use client'

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react'
import {
  COOKIE_BANNER_SEEN_KEY,
  COOKIE_BANNER_SEEN_TTL_MS,
  COOKIE_CONSENT_KEY,
  OPEN_COOKIE_SETTINGS_EVENT,
  clearGaCookies,
  isGaConfigured,
  updateAnalyticsConsent,
} from '@/lib/analytics'

export type CookieConsentChoice = 'accepted' | 'rejected' | null

interface ConsentContextType {
  consent: CookieConsentChoice
  /** Persist Accept/Reject and update Consent Mode (analytics_storage only). */
  setConsent: (status: 'accepted' | 'rejected') => void
  /** Whether the pill banner should be visible. */
  showBanner: boolean
  /** Incremented on each open so auto-hide re-arms when reopening. */
  bannerEpoch: number
  /** Focus Accept when opened via Cookie settings. */
  focusPrimary: boolean
  /** Reopen the banner (Cookie settings). Hiding is not a consent choice. */
  openBanner: (options?: { focusPrimary?: boolean }) => void
  /** Hide the banner and mark seen (30-day). Does not change consent. */
  dismissBanner: () => void
  /** Clear the one-shot focus flag after focusing. */
  clearFocusPrimary: () => void
  hasConsented: boolean
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined)

interface ConsentProviderProps {
  children: ReactNode
}

function readConsent(): CookieConsentChoice {
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (value === 'accepted' || value === 'rejected') return value
  } catch {
    /* ignore */
  }
  return null
}

function hasSeenRecently(): boolean {
  try {
    const raw = localStorage.getItem(COOKIE_BANNER_SEEN_KEY)
    if (!raw) return false
    const ts = Number(raw)
    if (!Number.isFinite(ts)) return false
    return Date.now() - ts < COOKIE_BANNER_SEEN_TTL_MS
  } catch {
    return false
  }
}

function markSeen(): void {
  try {
    localStorage.setItem(COOKIE_BANNER_SEEN_KEY, String(Date.now()))
  } catch {
    /* ignore */
  }
}

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [consent, setConsentState] = useState<CookieConsentChoice>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [bannerEpoch, setBannerEpoch] = useState(0)
  const [focusPrimary, setFocusPrimary] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const stored = readConsent()
    setConsentState(stored)

    // Sync Consent Mode if they previously rejected (defaults already granted).
    if (isGaConfigured() && stored === 'rejected') {
      updateAnalyticsConsent(false)
    } else if (isGaConfigured() && stored === 'accepted') {
      updateAnalyticsConsent(true)
    }

    // Auto-show only when no choice and banner not seen in the last 30 days.
    if (stored === 'accepted' || stored === 'rejected' || hasSeenRecently()) {
      setShowBanner(false)
    } else {
      setShowBanner(true)
      setBannerEpoch((n) => n + 1)
    }
    setReady(true)
  }, [])

  const dismissBanner = useCallback(() => {
    markSeen()
    setShowBanner(false)
    setFocusPrimary(false)
  }, [])

  const openBanner = useCallback((options?: { focusPrimary?: boolean }) => {
    setFocusPrimary(Boolean(options?.focusPrimary))
    setShowBanner(true)
    setBannerEpoch((n) => n + 1)
  }, [])

  const clearFocusPrimary = useCallback(() => {
    setFocusPrimary(false)
  }, [])

  const setConsent = useCallback(
    (status: 'accepted' | 'rejected') => {
      try {
        localStorage.setItem(COOKIE_CONSENT_KEY, status)
      } catch {
        /* ignore */
      }
      setConsentState(status)

      if (isGaConfigured()) {
        updateAnalyticsConsent(status === 'accepted')
      }

      if (status === 'rejected') {
        clearGaCookies()
      }

      dismissBanner()
    },
    [dismissBanner]
  )

  // Footer "Cookie settings" and any other openers.
  useEffect(() => {
    const onOpen = () => openBanner({ focusPrimary: true })
    document.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen)
    return () => document.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen)
  }, [openBanner])

  const hasConsented = consent === 'accepted'

  return (
    <ConsentContext.Provider
      value={{
        consent,
        setConsent,
        showBanner: ready && showBanner,
        bannerEpoch,
        focusPrimary,
        openBanner,
        dismissBanner,
        clearFocusPrimary,
        hasConsented,
      }}
    >
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  const context = useContext(ConsentContext)
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider')
  }
  return context
}

/** Dispatch from footer Cookie settings (or anywhere). */
export function openCookieSettings(): void {
  if (typeof document === 'undefined') return
  document.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT))
}
