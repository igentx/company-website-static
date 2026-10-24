import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Legacy crawl URLs → live English destinations (one hop).
 * Applied in middleware before the generic /ar strip so /ar legacy paths
 * do not bounce through an intermediate English legacy URL.
 */
const LEGACY_DESTINATIONS: Record<string, string> = {
  '/case-studies-landing-page': '/case-studies',
  '/service': '/services',
  '/web-development-uae': '/services/web-development-uae',
  '/ar/case-studies-landing-page': '/case-studies',
  '/ar/service': '/services',
  '/ar/web-development-uae': '/services/web-development-uae',
}

function withoutTrailingSlash(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

/**
 * Broken relative-link crawls sometimes produce /$/... or /%24/... paths.
 * Collapse those to the real path in one hop.
 */
function dollarPrefixRedirect(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl
  let rest: string | null = null

  if (pathname === '/$' || pathname === '/%24') {
    rest = '/'
  } else if (pathname.startsWith('/$/')) {
    rest = pathname.slice(2) || '/'
  } else if (pathname.startsWith('/%24/')) {
    rest = pathname.slice(4) || '/'
  }

  if (rest === null) return null

  const url = request.nextUrl.clone()
  url.pathname = rest.startsWith('/') ? rest : `/${rest}`
  return NextResponse.redirect(url, 308)
}

function legacyPathRedirect(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl
  const normalised = withoutTrailingSlash(pathname)

  const exact = LEGACY_DESTINATIONS[normalised]
  if (exact) {
    const url = request.nextUrl.clone()
    url.pathname = exact
    return NextResponse.redirect(url, 308)
  }

  // Nested historical prefixes (keep at least one path segment when present)
  if (normalised.startsWith('/case-studies-landing-page/')) {
    const url = request.nextUrl.clone()
    url.pathname = normalised.replace(/^\/case-studies-landing-page/, '') || '/'
    return NextResponse.redirect(url, 308)
  }
  if (normalised.startsWith('/ar/case-studies-landing-page/')) {
    const url = request.nextUrl.clone()
    url.pathname = normalised.replace(/^\/ar\/case-studies-landing-page/, '') || '/'
    return NextResponse.redirect(url, 308)
  }
  if (normalised.startsWith('/blog/services/')) {
    const url = request.nextUrl.clone()
    url.pathname = normalised.replace(/^\/blog\/services/, '/services')
    return NextResponse.redirect(url, 308)
  }
  if (normalised.startsWith('/ar/blog/services/')) {
    const url = request.nextUrl.clone()
    url.pathname = normalised.replace(/^\/ar\/blog\/services/, '/services')
    return NextResponse.redirect(url, 308)
  }

  return null
}

/**
 * Arabic locale content was removed. Redirect /ar and /ar/* to English in one hop
 * (before Next.js trailing-slash normalisation can turn /ar/ into /ar → /).
 * Legacy /ar mappings are handled above so they never fall through to a bare strip.
 */
function arabicToEnglishRedirect(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl
  if (pathname !== '/ar' && pathname !== '/ar/' && !pathname.startsWith('/ar/')) {
    return null
  }

  const englishPath =
    pathname === '/ar' || pathname === '/ar/' ? '/' : pathname.replace(/^\/ar/, '') || '/'

  const url = request.nextUrl.clone()
  url.pathname = englishPath
  return NextResponse.redirect(url, 308)
}

/**
 * Basic security headers
 */
export function middleware(request: NextRequest) {
  const dollarRedirect = dollarPrefixRedirect(request)
  if (dollarRedirect) return dollarRedirect

  // Legacy mappings (including /ar legacy) before generic /ar strip
  const legacyRedirect = legacyPathRedirect(request)
  if (legacyRedirect) return legacyRedirect

  const arabicRedirect = arabicToEnglishRedirect(request)
  if (arabicRedirect) return arabicRedirect

  const response = NextResponse.next()

  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  const isProduction = process.env.NODE_ENV === 'production'

  const csp = [
    "default-src 'self'",
    // cdn.igentx.cloud and ai.igentx.com are for loading the AI agent script
    `script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms https://cdn.igentx.cloud https://ai.igentx.com https://challenges.cloudflare.com ${isProduction ? 'https://vercel.live' : ''}`.trim(),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    // ai.igentx.com is for API calls from the AI agent
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.clarity.ms https://*.clarity.ms https://ai.igentx.com https://api.igentx.com https://cdn.igentx.cloud",
    // ai.igentx.com renders the AI chat widget in an iframe; vercel.live is for Vercel preview toolbar
    `frame-src 'self' https://ai.igentx.com https://challenges.cloudflare.com ${isProduction ? 'https://vercel.live' : ''}`.trim(),
    "frame-ancestors 'self'",
  ].join('; ')

  response.headers.set('Content-Security-Policy', csp)

  if (process.env.NODE_ENV === 'production' && !request.nextUrl.pathname.startsWith('/_next')) {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|txt|xml|ico)$).*)'],
}
