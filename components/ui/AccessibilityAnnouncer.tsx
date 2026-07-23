'use client'

import { useEffect, useRef } from 'react'

interface AccessibilityAnnouncerProps {
  message: string
  priority?: 'polite' | 'assertive'
  delay?: number
}

/**
 * AccessibilityAnnouncer component - Announces messages to screen readers
 * Useful for dynamic content changes, form submissions, etc.
 */
export default function AccessibilityAnnouncer({
  message,
  priority = 'polite',
  delay = 100,
}: AccessibilityAnnouncerProps) {
  const announceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (message && announceRef.current) {
      // Clear previous message
      announceRef.current.textContent = ''

      // Add new message with slight delay to ensure screen readers pick it up
      const timeoutId = setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = message
        }
      }, delay)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [message, delay])

  return (
    <div
      ref={announceRef}
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
      role="status"
    />
  )
}
