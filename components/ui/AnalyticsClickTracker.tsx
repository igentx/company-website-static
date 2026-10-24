'use client'

import { useEffect } from 'react'
import {
  isGaConfigured,
  trackEmailClick,
  trackPhoneClick,
  trackWhatsappClick,
} from '@/lib/analytics'

/**
 * Delegated click tracking for tel:, mailto:, and wa.me links site-wide.
 */
export default function AnalyticsClickTracker() {
  useEffect(() => {
    if (!isGaConfigured()) return

    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest('a')
      if (!anchor) return

      const href = anchor.href || anchor.getAttribute('href') || ''
      if (!href) return

      const lower = href.toLowerCase()
      if (lower.startsWith('tel:')) {
        trackPhoneClick(href)
        return
      }
      if (lower.startsWith('mailto:')) {
        trackEmailClick(href)
        return
      }
      if (lower.includes('wa.me/') || lower.includes('api.whatsapp.com/')) {
        trackWhatsappClick(href)
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
