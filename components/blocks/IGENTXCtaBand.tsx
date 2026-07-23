'use client'

import { IGENTXCtaBandBlok } from '@/lib/types'
import HeroCtaButton from '@/components/ui/HeroCtaButton'
import Link from 'next/link'

interface IGENTXCtaBandProps {
  blok: IGENTXCtaBandBlok
}

function resolveHref(link?: { linktype?: string; url?: string; cached_url?: string }) {
  const linkType = link?.linktype || 'url'
  if (linkType === 'story') {
    return `/${(link?.cached_url || link?.url || '').replace(/^\//, '')}`
  }
  const url = link?.url || link?.cached_url || '#'
  if (url.startsWith('http') || url.startsWith('#')) return url
  return url.startsWith('/') ? url : `/${url}`
}

function isExternalHref(href: string) {
  return href.startsWith('http')
}

export default function IGENTXCtaBand({ blok }: IGENTXCtaBandProps) {
  const primaryHref = resolveHref(blok.primary_cta_link)
  const secondaryHref = resolveHref(blok.secondary_cta_link)

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#030a23] via-[#111d43] to-[#030a23]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.15)_0%,_transparent_70%)]" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{blok.title}</h2>
        {blok.description && (
          <p className="text-xl text-gray-200 mb-10 leading-relaxed">{blok.description}</p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {blok.primary_cta_text && (
            primaryHref === '#ai-chat-fab' ? (
              <HeroCtaButton text={blok.primary_cta_text} href={primaryHref} variant="primary" />
            ) : isExternalHref(primaryHref) ? (
              <a
                href={primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-[#030a23] font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                {blok.primary_cta_text}
              </a>
            ) : (
              <Link
                href={primaryHref}
                className="inline-flex items-center px-8 py-4 bg-white text-[#030a23] font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                {blok.primary_cta_text}
              </Link>
            )
          )}
          {blok.secondary_cta_text && (
            secondaryHref === '#ai-chat-fab' ? (
              <HeroCtaButton
                text={blok.secondary_cta_text}
                href={secondaryHref}
                variant="secondary"
              />
            ) : (
              <Link
                href={secondaryHref}
                className="inline-flex items-center px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                {blok.secondary_cta_text}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  )
}
