'use client'

import React from 'react'
import { BlockRenderer } from '@/lib/blocks'
import { HERO_SECTION_GRADIENT_CLASS } from '@/lib/cta-button-styles'
import { ContactCardBlok, ContactPageBlok } from '@/lib/types'

const heroAccentText =
  'bg-gradient-to-br from-[#6b8cce] via-[#a8b8d8] to-[#4a6fa5] bg-clip-text text-transparent'

const CIRCUIT_BG_STYLE = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2360a5fa;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2322d3ee;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' stroke='url(%23grad1)' stroke-width='1' stroke-linecap='round'%3E%3Cpath d='M0 20 L60 20 L60 40 L100 40' /%3E%3Cpath d='M200 60 L140 60 L140 80 L100 80' /%3E%3Cpath d='M0 100 L40 100 L40 120 L80 120' /%3E%3Cpath d='M200 140 L160 140 L160 120 L120 120' /%3E%3Cpath d='M0 180 L50 180 L50 160 L90 160' /%3E%3Cpath d='M20 0 L20 50 L40 50 L40 90' /%3E%3Cpath d='M60 200 L60 150 L80 150 L80 110' /%3E%3Cpath d='M100 0 L100 30 L120 30 L120 70' /%3E%3Cpath d='M140 200 L140 170 L160 170 L160 130' /%3E%3Cpath d='M180 0 L180 40 L160 40 L160 80' /%3E%3Ccircle cx='60' cy='20' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='140' cy='60' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='40' cy='100' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='160' cy='140' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='50' cy='180' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='20' cy='50' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='60' cy='150' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='100' cy='30' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='140' cy='170' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='180' cy='40' r='2' fill='%2360a5fa' /%3E%3Crect x='45' y='45' width='10' height='10' fill='none' stroke='%23a78bfa' stroke-width='1' /%3E%3Crect x='145' y='85' width='10' height='10' fill='none' stroke='%23a78bfa' stroke-width='1' /%3E%3Crect x='85' y='125' width='10' height='10' fill='none' stroke='%23a78bfa' stroke-width='1' /%3E%3C/g%3E%3C/svg%3E")`,
  backgroundSize: '200px 200px',
}

const REASSURANCE_METRICS = [
  {
    value: '24h',
    label: 'Response Time',
    description: 'We follow up within one business day',
    iconKey: 'clock' as const,
  },
  {
    value: 'Global',
    label: 'Delivery',
    description: 'UAE-first, worldwide delivery',
    iconKey: 'global' as const,
  },
  {
    value: '10+',
    label: 'Years of Experience',
    description: 'Combined team experience',
    iconKey: 'experience' as const,
  },
  {
    value: '100%',
    label: 'Custom-Built',
    description: 'Tailored to your goals',
    iconKey: 'custom' as const,
  },
]

function splitTitle(title: string) {
  const words = title.trim().split(/\s+/)
  if (words.length <= 1) return { lead: title, accent: '' }
  const accent = words.pop()!
  return { lead: words.join(' '), accent }
}

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const EnvelopeIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const MapPinIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const GlobeIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

function MetricIcon({ iconKey }: { iconKey: 'clock' | 'global' | 'experience' | 'custom' }) {
  const cls = 'w-5 h-5'
  switch (iconKey) {
    case 'clock':
      return <ClockIcon />
    case 'global':
      return <GlobeIcon />
    case 'experience':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'custom':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    default:
      return null
  }
}

interface ContactPageProps {
  blok: ContactPageBlok
}

export default function ContactPage({ blok }: ContactPageProps) {
  const { lead, accent } = splitTitle(blok.title)

  const getContactIcon = (card: ContactCardBlok) => {
    if (card.icon?.filename) {
      return (
        <img
          src={card.icon.filename}
          alt={card.icon.alt || card.label}
          className="w-6 h-6 object-contain"
        />
      )
    }

    switch (card.type) {
      case 'phone':
        return <PhoneIcon />
      case 'email':
        return <EnvelopeIcon />
      case 'whatsapp':
        return <WhatsAppIcon />
      case 'location':
        return <MapPinIcon />
      case 'hours':
        return <ClockIcon />
      case 'website':
        return <GlobeIcon />
      default:
        return <PhoneIcon />
    }
  }

  const getContactLink = (card: ContactCardBlok) => {
    switch (card.type) {
      case 'phone':
        return `tel:${card.value}`
      case 'email':
        return `mailto:${card.value}`
      case 'whatsapp': {
        const whatsappMessage = card.whatsapp_message || 'Hello! I would like to get in touch.'
        return `https://wa.me/${card.value.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`
      }
      case 'location':
        return card.map_link || `https://maps.google.com/?q=${encodeURIComponent(card.value)}`
      case 'website':
        return card.value.startsWith('http') ? card.value : `https://${card.value}`
      default:
        return '#'
    }
  }

  const renderContactCard = (card: ContactCardBlok) => {
    const isClickable = ['phone', 'email', 'whatsapp', 'location', 'website'].includes(card.type)
    const link = isClickable ? getContactLink(card) : '#'
    const showValue = card.show_value !== false
    const isHighlighted = card.highlight === true
    const isWhatsApp = card.type === 'whatsapp'

    const cardInner = (
      <div
        className={`group flex items-start gap-4 p-6 rounded-2xl border transition-all duration-300 ${
          isHighlighted
            ? isWhatsApp
              ? 'bg-white border-green-200 shadow-md hover:shadow-lg hover:border-green-300'
              : 'bg-white border-purple-200 shadow-md hover:shadow-lg hover:border-purple-300'
            : 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300'
        }`}
      >
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
            isWhatsApp
              ? 'bg-green-50 text-green-600'
              : isHighlighted
                ? 'bg-purple-50 text-purple-600'
                : 'bg-gray-50 text-gray-600'
          }`}
        >
          {getContactIcon(card)}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">
            {card.label}
          </h3>
          {showValue && (
            <p className="text-base font-semibold text-gray-900 mb-1 break-words">{card.value}</p>
          )}
          {card.subtitle && <p className="text-sm text-gray-500">{card.subtitle}</p>}
          {!showValue && isClickable && (
            <p className="text-sm font-medium text-[#4a6fa5] mt-1 group-hover:underline">
              Click to contact
            </p>
          )}
        </div>

        {isClickable && (
          <svg
            className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1 group-hover:text-gray-600 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </div>
    )

    if (isClickable) {
      return (
        <a
          key={card._uid}
          href={link}
          target={card.type === 'location' || card.type === 'website' ? '_blank' : undefined}
          rel={card.type === 'location' || card.type === 'website' ? 'noopener noreferrer' : undefined}
          className="block"
        >
          {cardInner}
        </a>
      )
    }

    return <div key={card._uid}>{cardInner}</div>
  }

  return (
    <div>
      {/* Hero */}
      <section
        className={`relative pt-20 md:pt-28 pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 ${HERO_SECTION_GRADIENT_CLASS} overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden" aria-hidden>
          <div className="absolute inset-0" style={CIRCUIT_BG_STYLE} />
          <div
            className="absolute top-10 left-10 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8)]"
            style={{ backgroundColor: '#00e9fe', animationDuration: '2s' }}
          />
          <div
            className="absolute top-20 right-20 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8)]"
            style={{ backgroundColor: '#00e9fe', animationDelay: '0.5s', animationDuration: '2.5s' }}
          />
          <div
            className="absolute bottom-20 left-20 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8)]"
            style={{ backgroundColor: '#00e9fe', animationDelay: '1s', animationDuration: '3s' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            {blok.badge_text && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 rounded-full text-xs font-semibold tracking-[0.15em] uppercase mb-6">
                {blok.badge_text}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {lead}
              {accent && (
                <>
                  {' '}
                  <span className={heroAccentText}>{accent}</span>
                </>
              )}
            </h1>

            {blok.description && (
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">{blok.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* Reassurance band + main content */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-16 md:pb-20">
          {/* Reassurance metrics */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
              What to expect
            </h2>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                {REASSURANCE_METRICS.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex flex-col items-center text-center px-4 py-8 md:px-6"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-purple-200 bg-purple-50 text-purple-600">
                      <MetricIcon iconKey={metric.iconKey} />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">{metric.label}</div>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-[10rem]">
                      {metric.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Two-column: contact methods + form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Left: contact cards */}
            {blok.contact_cards && blok.contact_cards.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {blok.contact_cards_title || 'Get In Touch'}
                </h2>
                <div className="space-y-4">
                  {blok.contact_cards.map((card) => renderContactCard(card))}
                </div>

                {blok.additional_info && (
                  <div className="mt-6 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-600 leading-relaxed">{blok.additional_info}</p>
                  </div>
                )}
              </div>
            )}

            {/* Right: form */}
            {blok.form && blok.form.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
                {blok.form_section_title && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {blok.form_section_title}
                    </h2>
                    {blok.form_section_description && (
                      <p className="text-gray-600">{blok.form_section_description}</p>
                    )}
                  </div>
                )}
                <BlockRenderer blok={blok.form[0]} variant="embedded" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      {blok.show_map && blok.map_embed_url && (
        <section className="py-16 md:py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {blok.map_section_title && (
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                {blok.map_section_title}
              </h2>
            )}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <iframe
                src={blok.map_embed_url}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
                className="w-full"
              />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
