import { ProductLink } from '@/lib/types'
import Image from 'next/image'

export function resolveHref(link?: ProductLink): string | undefined {
  const href = link?.cached_url || link?.url
  if (!href) return undefined

  const linkType = link?.linktype || 'url'
  if (linkType === 'story') {
    return `/${href.replace(/^\//, '')}`
  }

  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href
  }

  return href.startsWith('/') ? href : `/${href}`
}

export function isExternalHref(link?: ProductLink): boolean {
  const href = resolveHref(link)
  return !!href && (href.startsWith('http://') || href.startsWith('https://'))
}

export function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

type BadgeVariant = 'featured' | 'ai' | 'coming_soon'

const badgeStyles: Record<BadgeVariant, string> = {
  featured: 'bg-orange-50 text-orange-700 border-orange-200',
  ai: 'bg-blue-50 text-blue-700 border-blue-200',
  coming_soon: 'bg-purple-50 text-purple-700 border-purple-200',
}

export function ProductBadge({
  variant,
  children,
}: {
  variant: BadgeVariant
  children: React.ReactNode
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full border ${badgeStyles[variant]}`}
    >
      {children}
    </span>
  )
}

export function FeaturePillIcon({ icon }: { icon?: string }) {
  const cls = 'w-4 h-4 flex-shrink-0'
  switch (icon) {
    case 'admissions':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    case 'parent_app':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    case 'billing':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    case 'reports':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    case 'attendance':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-3.75h.008v.008H12V12.75zm0 3h.008v.008H12V15.75zm0 3h.008v.008H12V18.75z" />
        </svg>
      )
    case 'activity_feed':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm0 5.25h.007v.008H3.75V12zm0 5.25h.007v.008H3.75v-.008z" />
        </svg>
      )
    case 'messaging':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      )
    default:
      return null
  }
}

const pillIconColors: Record<string, string> = {
  admissions: 'text-purple-600 bg-purple-50 border-purple-100',
  parent_app: 'text-green-600 bg-green-50 border-green-100',
  billing: 'text-blue-600 bg-blue-50 border-blue-100',
  reports: 'text-orange-600 bg-orange-50 border-orange-100',
  attendance: 'text-teal-600 bg-teal-50 border-teal-100',
  activity_feed: 'text-rose-600 bg-rose-50 border-rose-100',
  messaging: 'text-indigo-600 bg-indigo-50 border-indigo-100',
}

export function getFeaturePillColor(icon?: string): string {
  return pillIconColors[icon || ''] || 'text-gray-600 bg-gray-50 border-gray-100'
}

const decorGlowStyles = {
  blue: 'bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.14)_0%,transparent_55%)]',
  purple: 'bg-[radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.14)_0%,transparent_55%)]',
}

const decorBannerGlowStyles = {
  blue: 'bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12)_0%,transparent_70%)]',
  purple: 'bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.12)_0%,transparent_70%)]',
}

type ProductCardDecorImageProps = {
  src: string
  alt: string
  glow: 'blue' | 'purple'
  variant: 'overlay' | 'banner'
}

export function ProductCardDecorImage({ src, alt, glow, variant }: ProductCardDecorImageProps) {
  const decorative = !alt

  if (variant === 'banner') {
    return (
      <div
        className="relative md:hidden h-36 sm:h-40 w-full shrink-0 overflow-hidden border-b border-gray-100 bg-gradient-to-b from-slate-50 to-white"
        aria-hidden={decorative}
      >
        <div className={`absolute inset-0 ${decorBannerGlowStyles[glow]}`} />
        <Image
          src={src}
          alt={decorative ? '' : alt}
          fill
          sizes="100vw"
          className="object-contain object-center p-4"
          aria-hidden={decorative}
        />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block" aria-hidden={decorative}>
      <div className={`absolute inset-0 ${decorGlowStyles[glow]}`} />
      <div className="absolute top-0 right-0 w-[min(58%,320px)] h-[min(72%,340px)]">
        <Image
          src={src}
          alt={decorative ? '' : alt}
          fill
          sizes="25vw"
          className="object-contain object-right object-top"
          aria-hidden={decorative}
        />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white via-white/90 to-transparent" />
      </div>
    </div>
  )
}
