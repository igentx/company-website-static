'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useConsent } from '@/contexts/ConsentContext'

const AUTO_HIDE_MS = 5000

/**
 * Opt-out analytics cookie pill (aligned with clayox.com).
 * Bottom-left so it does not overlap chat / WhatsApp (typically bottom-right).
 * Auto-dismiss is not a consent choice.
 */
export default function CookieConsentBanner() {
  const {
    showBanner,
    bannerEpoch,
    focusPrimary,
    setConsent,
    dismissBanner,
    clearFocusPrimary,
  } = useConsent()
  const acceptRef = useRef<HTMLButtonElement>(null)

  // Auto-hide: 5s, first scroll, or internal link click (not a consent choice).
  useEffect(() => {
    if (!showBanner) return

    const onAutoHide = () => dismissBanner()

    const onNavClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a[href]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href.charAt(0) === '#') return
      if (anchor.getAttribute('target') === '_blank') return
      // Ignore clicks inside the banner itself (Learn more).
      if (anchor.closest('[data-cookie-banner]')) return
      onAutoHide()
    }

    const hideTimer = window.setTimeout(onAutoHide, AUTO_HIDE_MS)
    window.addEventListener('scroll', onAutoHide, { once: true, passive: true, capture: true })
    document.addEventListener('click', onNavClick, true)

    if (focusPrimary) {
      acceptRef.current?.focus({ preventScroll: true })
      clearFocusPrimary()
    }

    return () => {
      window.clearTimeout(hideTimer)
      window.removeEventListener('scroll', onAutoHide, true)
      document.removeEventListener('click', onNavClick, true)
    }
  }, [showBanner, bannerEpoch, focusPrimary, dismissBanner, clearFocusPrimary])

  if (!showBanner) {
    return null
  }

  return (
    <div
      data-cookie-banner
      role="status"
      aria-live="polite"
      aria-label="Analytics cookies notice"
      className="fixed z-[45] left-3 bottom-3 right-auto max-w-[min(calc(100vw-1.5rem),26rem)] flex flex-wrap items-center gap-x-[0.55rem] gap-y-[0.4rem] px-[0.55rem] py-[0.4rem] rounded-full border border-[#e2e8f0] bg-white/[0.96] shadow-[0_4px_16px_rgba(15,23,42,0.08)] backdrop-blur-[8px] pointer-events-auto max-[420px]:left-2 max-[420px]:bottom-2 max-[420px]:max-w-[calc(100vw-1rem)] max-[420px]:rounded-[14px] max-[420px]:px-[0.45rem] max-[420px]:py-[0.35rem]"
    >
      <p className="m-0 inline-flex flex-wrap items-center gap-[0.35rem] font-primary text-xs font-medium leading-tight text-slate-600 whitespace-nowrap max-[420px]:whitespace-normal max-[420px]:text-[0.7rem]">
        <span>We use analytics cookies.</span>
        <Link
          href="/privacy#cookies"
          className="font-semibold text-blue-800 underline underline-offset-[0.12em] decoration-blue-800/35 hover:text-blue-900"
        >
          Learn more
        </Link>
      </p>
      <div className="inline-flex flex-shrink-0 items-center gap-[0.3rem]">
        <button
          type="button"
          onClick={() => setConsent('rejected')}
          className="inline-flex items-center justify-center rounded-full border border-blue-700 bg-transparent px-[0.65rem] py-[0.28rem] font-primary text-[0.7rem] font-semibold leading-tight text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Reject
        </button>
        <button
          ref={acceptRef}
          type="button"
          onClick={() => setConsent('accepted')}
          className="inline-flex items-center justify-center rounded-full border-0 bg-blue-600 px-[0.65rem] py-[0.28rem] font-primary text-[0.7rem] font-semibold leading-tight text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
