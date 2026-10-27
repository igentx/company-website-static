'use client'

import type { IGENTXDigitalPartnershipBlok } from '@/lib/types'
import { normalizeInternalHref } from '@/lib/utils'

interface Props {
  blok: IGENTXDigitalPartnershipBlok
}

function splitLines(value?: string | string[]): string[] {
  if (Array.isArray(value)) return value.map((item) => item.trim()).filter(Boolean)
  if (typeof value !== 'string') return []
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function resolveHref(url?: string) {
  return normalizeInternalHref(url)
}

function isExternal(href: string) {
  return href.startsWith('http://') || href.startsWith('https://')
}

export default function IGENTXDigitalPartnership({ blok }: Props) {
  const overviewPoints = splitLines(blok.overview_points)
  const tiers = Array.isArray(blok.tiers) ? blok.tiers : []
  const inclusionRows = Array.isArray(blok.inclusion_rows) ? blok.inclusion_rows : []
  const extras = Array.isArray(blok.extras) ? blok.extras : []
  const inclusionColumns = blok.inclusion_columns || ['Standalone', 'Starter', 'Plus', 'Growth']

  const demoHref = resolveHref(blok.demo_cta_link?.url || blok.demo_cta_url)
  const softwareHref = resolveHref(blok.software_side_link?.url || blok.software_side_url)
  const demoLabel = blok.demo_cta_text || 'Book a Clayox Demo'
  const softwareLabel = blok.software_side_label || 'Clayox digital partnership details'

  return (
    <div>
      <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#030a23] via-[#111d43] to-[#030a23] overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2360a5fa' stroke-width='1'%3E%3Cpath d='M0 20 L60 20 L60 40 L100 40' /%3E%3Cpath d='M200 60 L140 60 L140 80 L100 80' /%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          {blok.overview_badge && (
            <p className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/15 text-cyan-200 border border-cyan-400/30 mb-6">
              {blok.overview_badge}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            {blok.overview_title || 'A done-for-you digital foundation for childcare centres'}
          </h2>
          {blok.overview_description && (
            <p className="text-lg text-gray-300 leading-relaxed mb-8">{blok.overview_description}</p>
          )}
          {overviewPoints.length > 0 && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-3xl mx-auto">
              {overviewPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-gray-200"
                >
                  <svg
                    className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
          {(demoHref !== '#' || softwareHref !== '#') && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {demoHref !== '#' &&
                (isExternal(demoHref) ? (
                  <a
                    href={demoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-7 py-3.5 rounded-xl font-semibold bg-white text-[#030a23] hover:bg-gray-100 transition-colors"
                  >
                    {demoLabel}
                  </a>
                ) : (
                  <a
                    href={demoHref}
                    className="inline-flex items-center px-7 py-3.5 rounded-xl font-semibold bg-white text-[#030a23] hover:bg-gray-100 transition-colors"
                  >
                    {demoLabel}
                  </a>
                ))}
              {softwareHref !== '#' &&
                (isExternal(softwareHref) ? (
                  <a
                    href={softwareHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-7 py-3.5 rounded-xl font-semibold border border-white/40 text-white hover:bg-white/10 transition-colors"
                  >
                    {softwareLabel}
                  </a>
                ) : (
                  <a
                    href={softwareHref}
                    className="inline-flex items-center px-7 py-3.5 rounded-xl font-semibold border border-white/40 text-white hover:bg-white/10 transition-colors"
                  >
                    {softwareLabel}
                  </a>
                ))}
            </div>
          )}
        </div>
      </section>

      <section id="plans" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {blok.pricing_title || 'Annual partnership plans'}
            </h2>
            {blok.pricing_description && (
              <p className="text-lg text-gray-600 leading-relaxed">{blok.pricing_description}</p>
            )}
            {blok.billing_note && (
              <p className="mt-3 text-sm text-gray-500">{blok.billing_note}</p>
            )}
          </div>

          {tiers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-10">
              {tiers.map((tier) => {
                const features = splitLines(tier.features)
                const href = resolveHref(tier.cta_link?.url || demoHref)
                return (
                  <article
                    key={tier.name}
                    className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm ${
                      tier.is_featured
                        ? 'border-blue-500 shadow-lg ring-1 ring-blue-200'
                        : 'border-gray-200'
                    }`}
                  >
                    {tier.badge && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                        {tier.badge}
                      </span>
                    )}
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                      {tier.name}
                    </p>
                    {tier.subtitle && (
                      <h3 className="mt-2 text-lg font-bold text-gray-900">{tier.subtitle}</h3>
                    )}
                    <p className="mt-4 text-3xl font-bold text-gray-900">{tier.price_annual}</p>
                    {tier.price_monthly_equivalent && (
                      <p className="mt-1 text-sm text-gray-500">{tier.price_monthly_equivalent}</p>
                    )}
                    {tier.price_note && (
                      <p className="mt-2 text-xs text-gray-500">{tier.price_note}</p>
                    )}
                    {features.length > 0 && (
                      <ul className="mt-5 flex-1 space-y-2.5">
                        {features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                            <svg
                              className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {tier.cta_text && href !== '#' && (
                      <a
                        href={href}
                        {...(isExternal(href)
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                          tier.is_featured
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        {tier.cta_text}
                      </a>
                    )}
                  </article>
                )
              })}
            </div>
          )}

          {blok.stacking_note && (
            <p className="text-center text-sm text-gray-600 max-w-3xl mx-auto">{blok.stacking_note}</p>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {blok.inclusions_title || 'What each plan includes'}
            </h2>
            {blok.inclusions_description && (
              <p className="text-lg text-gray-600">{blok.inclusions_description}</p>
            )}
          </div>

          {inclusionRows.length > 0 && (
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-10">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <caption className="sr-only">
                  {blok.inclusions_table_caption || 'Partnership plan inclusions comparison'}
                </caption>
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold text-gray-900">
                      Include
                    </th>
                    {inclusionColumns.map((column) => (
                      <th key={column} scope="col" className="px-4 py-3 font-semibold text-gray-900">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inclusionRows.map((row) => (
                    <tr key={row.label} className="border-b border-gray-100 last:border-0">
                      <th scope="row" className="px-4 py-3 font-medium text-gray-900">
                        {row.label}
                      </th>
                      {(row.values || []).map((value, index) => (
                        <td key={`${row.label}-${index}`} className="px-4 py-3 text-gray-600">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {blok.inclusions_footnote && (
            <p className="text-center text-sm text-gray-500 mb-12">{blok.inclusions_footnote}</p>
          )}

          {extras.length > 0 && (
            <>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                {blok.extras_title || 'Extras'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {extras.map((extra) => (
                  <div
                    key={extra.title}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-6"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{extra.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{extra.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
