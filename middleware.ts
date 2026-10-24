import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function withoutTrailingSlash(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

/**
 * Map a path (already without /ar) to its live English destination.
 * Returns null when the path does not need a legacy redirect.
 *
 * Order matters: /service/blog/* before /service/:path*, and exact /service
 * before the catch-all.
 */
function resolveLegacyDestination(pathname: string): string | null {
  const normalised = withoutTrailingSlash(pathname)

  const exact: Record<string, string> = {
    '/case-studies-landing-page': '/case-studies',
    '/service': '/services',
    '/web-development-uae': '/services/web-development-uae',
  }
  if (exact[normalised]) return exact[normalised]

  // Keep existing /service/blog/* → /blog/* rule
  if (normalised.startsWith('/service/blog/')) {
    return normalised.replace(/^\/service\/blog/, '/blog') || '/blog'
  }

  // Other /service/:path* (e.g. /service/contact) → /:path*
  if (normalised.startsWith('/service/')) {
    return normalised.slice('/service'.length) || '/'
  }

  if (normalised.startsWith('/case-studies-landing-page/')) {
    return normalised.replace(/^\/case-studies-landing-page/, '') || '/'
  }

  if (normalised.startsWith('/blog/services/')) {
    return normalised.replace(/^\/blog\/services/, '/services')
  }

  return null
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

  // Also collapse legacy segments after stripping the "$" prefix
  const resolved = resolveLegacyDestination(rest) || rest
  const url = request.nextUrl.clone()
  url.pathname = resolved.startsWith('/') ? resolved : `/${resolved}`
  return NextResponse.redirect(url, 308)
}

/**
 * English legacy crawl URLs → live paths in one hop.
 */
function legacyPathRedirect(request: NextRequest): NextResponse | null {
  const destination = resolveLegacyDestination(request.nextUrl.pathname)
  if (!destination) return null

  const url = request.nextUrl.clone()
  url.pathname = destination
  return NextResponse.redirect(url, 308)
}

/**
 * Arabic locale content was removed. Strip /ar, then apply English legacy
 * mappings to that stripped path in the same response so /ar legacy URLs
 * never need a second hop (e.g. /ar/web-development-uae → /services/...).
 */
function arabicToEnglishRedirect(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl
  if (pathname !== '/ar' && pathname !== '/ar/' && !pathname.startsWith('/ar/')) {
    return null
  }

  const stripped =
    pathname === '/ar' || pathname === '/ar/' ? '/' : pathname.replace(/^\/ar/, '') || '/'

  const destination = resolveLegacyDestination(stripped) || stripped

  const url = request.nextUrl.clone()
  url.pathname = destination
  return NextResponse.redirect(url, 308)
}

/**
 * Basic security headers
 */
export function middleware(request: NextRequest) {
  const dollarRedirect = dollarPrefixRedirect(request)
  if (dollarRedirect) return dollarRedirect

  // English legacy first (covers /service/contact etc.)
  const legacyRedirect = legacyPathRedirect(request)
  if (legacyRedirect) return legacyRedirect

  // /ar strip + legacy on stripped path in one hop
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
