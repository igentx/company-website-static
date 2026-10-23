import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Arabic locale content was removed. Redirect /ar and /ar/* to English in one hop
 * (before Next.js trailing-slash normalisation can turn /ar/ into /ar → /).
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
