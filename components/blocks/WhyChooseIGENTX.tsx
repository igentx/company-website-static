'use client'

import { WhyChooseIGENTXBlok } from '@/lib/types'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

interface WhyChooseIGENTXProps {
  blok: WhyChooseIGENTXBlok
}

const heroGradient = 'bg-gradient-to-br from-[#030a23] via-[#111d43] to-[#030a23]'
const heroAccentText =
  'bg-gradient-to-br from-[#6b8cce] via-[#a8b8d8] to-[#4a6fa5] bg-clip-text text-transparent'
const iconGlowBorder =
  'bg-gradient-to-br from-[#4a6fa5]/80 via-[#111d43] to-[#030a23] shadow-[0_0_24px_rgba(74,111,165,0.35)]'

function splitTitle(title: string) {
  const words = title.trim().split(/\s+/)
  if (words.length <= 1) return { lead: title, accent: '' }
  const accent = words.pop()!
  return { lead: words.join(' '), accent }
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function WhyChooseIGENTX({ blok }: WhyChooseIGENTXProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const title = blok.title || 'Why Choose IGENTX?'
  const { lead, accent } = splitTitle(title.replace(/\?$/, ''))
  const badgeLabel = blok.badge_text || 'Why Choose IGENTX'

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const progress = Math.max(
          0,
          Math.min(1, (window.innerHeight - rect.top) / window.innerHeight)
        )
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 ${heroGradient} text-white`}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4a6fa5]/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] bg-[#111d43]/40 rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-14 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-xs font-medium tracking-[0.2em] uppercase text-gray-300 mb-8">
            <span className="text-[#8fa3c8]">✦</span>
            <span>{badgeLabel}</span>
            <span className="text-[#8fa3c8]">✦</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {lead && <span className="block text-white">{lead}</span>}
            {accent && <span className={`block ${heroAccentText}`}>{accent}</span>}
          </h2>

          {blok.description && (
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {blok.description}
            </p>
          )}
        </div>

        {/* Features Grid */}
        {blok.features && blok.features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-16">
            {blok.features.map((feature, index) => (
              <div
                key={index}
                className="group relative flex flex-col p-6 md:p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex justify-center mb-6">
                  <div className={`p-[1px] rounded-2xl ${iconGlowBorder}`}>
                    <div className="w-[4.5rem] h-[4.5rem] rounded-2xl bg-[#0a1535]/90 flex items-center justify-center">
                      {feature.icon?.filename ? (
                        <Image
                          src={feature.icon.filename}
                          alt={feature.icon.alt || ''}
                          width={48}
                          height={48}
                          className="object-contain w-11 h-11 brightness-0 invert opacity-90"
                        />
                      ) : (
                        <svg
                          className="w-9 h-9 text-white/90"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 text-center">{feature.title}</h3>

                <p className="text-sm text-gray-400 text-center leading-relaxed flex-1">
                  {feature.description}
                </p>

                {feature.highlight && (
                  <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#8fa3c8]">
                    <CheckIcon className="w-4 h-4 flex-shrink-0 text-[#6b8cce]" />
                    <span>{feature.highlight}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* UAE Trust Signals */}
        {blok.uae_signals && blok.uae_signals.length > 0 && (
          <div
            className="rounded-2xl p-8 md:p-12 border border-gray-200/80 bg-white/80 backdrop-blur-sm relative overflow-hidden"
            style={{
              transform: `translateY(${scrollProgress * -10}px)`,
            }}
          >
            <div className="text-center mb-8 relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                {blok.uae_signals_title || 'Trusted by UAE Businesses'}
              </h3>
              {blok.uae_signals_description && (
                <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                  {blok.uae_signals_description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blok.uae_signals.map((signal, index) => (
                <div
                  key={index}
                  className="text-center group relative p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-purple-200 hover:bg-purple-50/30 transition-all duration-300"
                >
                  <div className="flex justify-center mb-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-purple-200 bg-purple-50 text-purple-600">
                      {signal.icon?.filename ? (
                        <Image
                          src={signal.icon.filename}
                          alt={signal.icon.alt || ''}
                          width={32}
                          height={32}
                          className="object-contain w-7 h-7"
                        />
                      ) : (
                        <svg
                          className="w-7 h-7"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  <h4 className="font-bold mb-2 text-lg text-gray-900">{signal.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{signal.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Speed Comparison */}
        {blok.show_speed_comparison && (
          <div className="mt-16 relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 md:p-12">
            <div className="text-center mb-10 sm:mb-12">
              {blok.speed_comparison_title && (
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight text-white">
                  {blok.speed_comparison_title}
                </h3>
              )}
              {blok.speed_comparison_description && (
                <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  {blok.speed_comparison_description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Traditional */}
              <div className="rounded-2xl p-6 sm:p-8 border border-gray-200/80 bg-white/80 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                    <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  {blok.traditional_approach_title && (
                    <h4 className="text-xl font-bold text-gray-900">{blok.traditional_approach_title}</h4>
                  )}
                </div>
                {blok.traditional_approach_points && (
                  <ul className="space-y-3">
                    {blok.traditional_approach_points
                      .filter((point) => point.enabled !== false)
                      .map((point, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-600">
                          <svg className="w-5 h-5 mt-0.5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm leading-relaxed">{point.text}</span>
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              {/* IGENTX */}
              <div className="relative rounded-2xl p-6 sm:p-8 border border-purple-200/80 bg-white/80 backdrop-blur-sm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-900 to-purple-900 border border-purple-200 text-white px-4 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm">
                    {blok.igentx_advantage_label || 'IGENTX Advantage'}
                  </span>
                </div>
                <div className="text-center mb-6 mt-2">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl border border-purple-200 bg-purple-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  {blok.igentx_approach_title && (
                    <h4 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {blok.igentx_approach_title}
                    </h4>
                  )}
                </div>
                {blok.igentx_approach_points && (
                  <ul className="space-y-3">
                    {blok.igentx_approach_points
                      .filter((point) => point.enabled !== false)
                      .map((point, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-600">
                          <CheckIcon className="w-5 h-5 mt-0.5 text-purple-600 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{point.text}</span>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
