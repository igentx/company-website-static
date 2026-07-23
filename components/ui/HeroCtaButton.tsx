'use client'

import Link from 'next/link'
import { HERO_CTA_PRIMARY_CLASS, HERO_CTA_SECONDARY_CLASS } from '@/lib/cta-button-styles'

interface HeroCtaButtonProps {
  text: string
  href: string
  variant?: 'primary' | 'secondary'
  isExternal?: boolean
  className?: string
}

function CtaArrow() {
  return (
    <svg
      className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )
}

function normalizeHref(href: string) {
  if (href.startsWith('#') || href.startsWith('http')) return href
  return href.startsWith('/') ? href : `/${href}`
}

export default function HeroCtaButton({
  text,
  href,
  variant = 'primary',
  isExternal = false,
  className = '',
}: HeroCtaButtonProps) {
  const buttonClass =
    variant === 'primary'
      ? `${HERO_CTA_PRIMARY_CLASS} ${className}`.trim()
      : `${HERO_CTA_SECONDARY_CLASS} ${className}`.trim()

  if (href === '#ai-chat-fab') {
    return (
      <button
        type="button"
        className={buttonClass}
        onClick={() => document.getElementById('ai-chat-fab')?.click()}
      >
        {text}
        <CtaArrow />
      </button>
    )
  }

  const resolvedHref = normalizeHref(href)

  if (isExternal) {
    return (
      <a href={resolvedHref} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        {text}
        <CtaArrow />
      </a>
    )
  }

  return (
    <Link href={resolvedHref} className={buttonClass}>
      {text}
      <CtaArrow />
    </Link>
  )
}
