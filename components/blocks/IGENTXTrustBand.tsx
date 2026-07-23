'use client'

import { IGENTXTrustBandBlok } from '@/lib/types'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface IGENTXTrustBandProps {
  blok: IGENTXTrustBandBlok
}

function splitTrustTitle(title: string) {
  const prefix = 'Trusted by '
  if (title.startsWith(prefix)) {
    return { lead: 'Trusted by', accent: title.slice(prefix.length) }
  }
  const words = title.trim().split(/\s+/)
  if (words.length <= 1) return { lead: title, accent: '' }
  const accent = words.pop()!
  return { lead: words.join(' '), accent }
}

function TrustIcon({ iconKey, className }: { iconKey?: string; className?: string }) {
  const cls = className || 'w-5 h-5'
  switch (iconKey) {
    case 'custom':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    case 'experience':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'satisfaction':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    case 'global':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'support':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'shield':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case 'lightning':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'chat':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    case 'award':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    default:
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      )
  }
}

function AnimatedMetric({
  value,
  label,
  description,
  iconKey,
}: {
  value: string
  label: string
  description?: string
  iconKey?: string
}) {
  const [displayValue, setDisplayValue] = useState(value)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const numericMatch = value.match(/^(\d+)(.*)$/)
    if (!numericMatch || hasAnimated.current) return

    const target = parseInt(numericMatch[1], 10)
    const suffix = numericMatch[2] || ''

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true

        const duration = 1200
        const start = performance.now()

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const current = Math.round(target * progress)
          setDisplayValue(`${current}${suffix}`)
          if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-3 py-6 md:px-4 md:py-8">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-purple-200 bg-purple-50 text-purple-600">
        <TrustIcon iconKey={iconKey} className="w-5 h-5" />
      </div>
      <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{displayValue}</div>
      <div className="text-sm font-semibold text-gray-900 mb-1">{label}</div>
      {description && (
        <p className="text-xs text-gray-500 leading-relaxed max-w-[10rem]">{description}</p>
      )}
    </div>
  )
}

function partnerLabel(partner: { name?: string; icon?: { alt?: string } }) {
  return partner.name || partner.icon?.alt || 'Technology partner'
}

export default function IGENTXTrustBand({ blok }: IGENTXTrustBandProps) {
  const metrics = blok.metrics || []
  const partners = blok.partner_logos || []
  const valueProps = blok.value_props || []
  const title = blok.title || 'Trusted by Growing Businesses'
  const { lead, accent } = splitTrustTitle(title)

  return (
    <section
      className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      aria-label="Trust and credentials"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          {blok.badge_text && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50 text-purple-700 border border-purple-100 rounded-full text-xs font-semibold tracking-[0.15em] uppercase mb-6">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {blok.badge_text}
            </div>
          )}

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {lead && <span>{lead} </span>}
            {accent && (
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {accent}
              </span>
            )}
          </h2>

          {blok.description && (
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              {blok.description}
            </p>
          )}

          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
        </div>

        {/* Partner logos card */}
        {partners.length > 0 && (
          <div className="mb-6 overflow-x-auto">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm min-w-max md:min-w-0">
              <div className="flex divide-x divide-gray-200">
                {partners.map((partner, index) => {
                  const label = partnerLabel(partner)
                  const iconFilename = partner.icon?.filename

                  return (
                    <figure
                      key={partner._uid || index}
                      className="m-0 flex flex-1 flex-col items-center justify-center gap-2 px-4 py-6 md:px-6 md:py-8 min-w-[7rem] md:min-w-0"
                      title={label}
                    >
                      <div className="flex h-10 w-20 md:h-12 md:w-24 items-center justify-center">
                        {iconFilename ? (
                          <Image
                            src={iconFilename}
                            alt=""
                            aria-hidden
                            width={96}
                            height={48}
                            className="h-8 w-auto max-w-[5rem] object-contain md:h-10 md:max-w-[6rem]"
                          />
                        ) : (
                          <span className="text-sm font-semibold text-gray-700">{label}</span>
                        )}
                      </div>
                      <figcaption className="text-xs font-medium text-gray-500">{label}</figcaption>
                    </figure>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Metrics card */}
        {metrics.length > 0 && (
          <div className="mb-10 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
              {metrics.map((metric, index) => (
                <AnimatedMetric
                  key={metric._uid || index}
                  value={metric.value}
                  label={metric.label}
                  description={metric.description}
                  iconKey={metric.icon_key}
                />
              ))}
            </div>
          </div>
        )}

        {/* Value props row */}
        {valueProps.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {valueProps.map((prop, index) => (
              <div key={prop._uid || index} className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-full border border-purple-200 bg-purple-50 text-purple-600">
                  <TrustIcon iconKey={prop.icon_key} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{prop.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{prop.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
