'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type ConsentStatus = 'pending' | 'accepted' | 'declined' | null

interface ConsentContextType {
  consent: ConsentStatus
  setConsent: (status: 'accepted' | 'declined') => void
  hasConsented: boolean
  showBanner: boolean
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined)

const CONSENT_STORAGE_KEY = 'analytics-consent'
const CONSENT_EXPIRY_DAYS = 365 // Consent expires after 1 year

interface ConsentProviderProps {
  children: ReactNode
}

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [consent, setConsentState] = useState<ConsentStatus>(null)
  const [showBanner, setShowBanner] = useState(false)

  // Load consent from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
      if (stored) {
        const { status, expiry } = JSON.parse(stored)
        const now = Date.now()

        // Check if consent has expired
        if (expiry && now < expiry) {
          setConsentState(status)
          setShowBanner(false)
        } else {
          // Consent expired, show banner again
          localStorage.removeItem(CONSENT_STORAGE_KEY)
          setConsentState(null)
          setShowBanner(true)
        }
      } else {
        // No consent stored, show banner
        setShowBanner(true)
      }
    } catch (error) {
      console.error('Error reading consent from storage:', error)
      setShowBanner(true)
    }
  }, [])

  const setConsent = (status: 'accepted' | 'declined') => {
    const expiry = Date.now() + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000

    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ status, expiry }))
      setConsentState(status)
      setShowBanner(false)

      // If consent is declined, clear any existing analytics cookies
      if (status === 'declined') {
        // Clear Google Analytics and Microsoft Clarity cookies
        document.cookie.split(';').forEach((cookie) => {
          const eqPos = cookie.indexOf('=')
          const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
          if (
            name.startsWith('_ga') ||
            name.startsWith('_gid') ||
            name.startsWith('_gat') ||
            name.startsWith('_clck') ||
            name.startsWith('_clsk')
          ) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`
          }
        })
      }
    } catch (error) {
      console.error('Error storing consent:', error)
    }
  }

  const hasConsented = consent === 'accepted'

  return (
    <ConsentContext.Provider value={{ consent, setConsent, hasConsented, showBanner }}>
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

