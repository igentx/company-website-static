'use client'

import { useCallback, useState } from 'react'

interface AnnouncementOptions {
  priority?: 'polite' | 'assertive'
  delay?: number
  clearAfter?: number
}

/**
 * Custom hook for announcing messages to screen readers
 * Provides a clean API for making accessibility announcements
 */
export function useAccessibilityAnnouncer() {
  const [announcement, setAnnouncement] = useState('')
  const [priority, setPriority] = useState<'polite' | 'assertive'>('polite')

  const announce = useCallback((message: string, options: AnnouncementOptions = {}) => {
    const { priority: announcePriority = 'polite', delay = 100, clearAfter = 3000 } = options

    // Clear any existing announcement
    setAnnouncement('')
    setPriority(announcePriority)

    // Set new announcement after a brief delay
    setTimeout(() => {
      setAnnouncement(message)

      // Clear announcement after specified time
      if (clearAfter > 0) {
        setTimeout(() => {
          setAnnouncement('')
        }, clearAfter)
      }
    }, delay)
  }, [])

  const clearAnnouncement = useCallback(() => {
    setAnnouncement('')
  }, [])

  return {
    announcement,
    priority,
    announce,
    clearAnnouncement,
  }
}

/**
 * Hook for form-specific accessibility announcements
 */
export function useFormAccessibilityAnnouncer() {
  const { announce } = useAccessibilityAnnouncer()

  const announceFormSuccess = useCallback(
    (message: string) => {
      announce(message, { priority: 'assertive', delay: 200 })
    },
    [announce]
  )

  const announceFormError = useCallback(
    (message: string) => {
      announce(message, { priority: 'assertive', delay: 100 })
    },
    [announce]
  )

  const announceFieldError = useCallback(
    (fieldLabel: string, errorMessage: string) => {
      announce(`${fieldLabel}: ${errorMessage}`, { priority: 'assertive' })
    },
    [announce]
  )

  const announceValidationSummary = useCallback(
    (errorCount: number) => {
      const message =
        errorCount === 1 ? '1 error found in form' : `${errorCount} errors found in form`
      announce(message, { priority: 'assertive', delay: 300 })
    },
    [announce]
  )

  return {
    announceFormSuccess,
    announceFormError,
    announceFieldError,
    announceValidationSummary,
  }
}

/**
 * Hook for navigation-specific accessibility announcements
 */
export function useNavigationAccessibilityAnnouncer() {
  const { announce } = useAccessibilityAnnouncer()

  const announcePageChange = useCallback(
    (pageTitle: string) => {
      announce(`Navigated to ${pageTitle}`, { priority: 'assertive', delay: 500 })
    },
    [announce]
  )

  const announceLanguageChange = useCallback(
    (languageName: string) => {
      announce(`Language changed to ${languageName}`, { priority: 'assertive' })
    },
    [announce]
  )

  const announceMenuToggle = useCallback(
    (isOpen: boolean) => {
      const message = isOpen ? 'Menu opened' : 'Menu closed'
      announce(message, { priority: 'polite' })
    },
    [announce]
  )

  const announceSearchResults = useCallback(
    (resultCount: number, searchTerm: string) => {
      const message =
        resultCount === 0
          ? `No results found for "${searchTerm}"`
          : resultCount === 1
            ? `1 result found for "${searchTerm}"`
            : `${resultCount} results found for "${searchTerm}"`
      announce(message, { priority: 'assertive', delay: 300 })
    },
    [announce]
  )

  return {
    announcePageChange,
    announceLanguageChange,
    announceMenuToggle,
    announceSearchResults,
  }
}
