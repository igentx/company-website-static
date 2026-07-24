'use client'

import Script from 'next/script'
import { getTurnstileSiteKey } from '@/lib/env'

const TURNSTILE_WIDGET_SELECTOR = '.cf-turnstile'

declare global {
  interface Window {
    turnstile?: {
      reset: (widget?: HTMLElement | string) => void
    }
  }
}

export function getTurnstileToken(form: HTMLFormElement): string | undefined {
  return (
    form.querySelector<HTMLInputElement>("[name='cf-turnstile-response']")?.value?.trim() ||
    undefined
  )
}

export function resetTurnstileWidget(): void {
  const widget = document.querySelector<HTMLElement>(TURNSTILE_WIDGET_SELECTOR)
  if (widget && window.turnstile) {
    window.turnstile.reset(widget)
  }
}

export default function TurnstileField() {
  const siteKey = getTurnstileSiteKey()

  if (!siteKey) {
    return null
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
      />
      <div className="cf-turnstile" data-sitekey={siteKey} />
    </>
  )
}
