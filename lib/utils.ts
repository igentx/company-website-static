import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Check if we're in preview mode (NEXT_PUBLIC_ENVIRONMENT=preview).
 */
export function isPreview() {
  return process.env.NEXT_PUBLIC_ENVIRONMENT === 'preview'
}

/**
 * Ensure internal hrefs are root-absolute so relative paths like `blog/slug`
 * never resolve as `/blog/blog/slug` or `/service/blog/slug` from nested pages.
 */
export function normalizeInternalHref(path?: string | null, fallback = '#'): string {
  if (!path || path === '#') return fallback
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#') ||
    path.startsWith('//')
  ) {
    return path
  }
  return path.startsWith('/') ? path : `/${path}`
}

/**
 * Rewrite root-relative-missing hrefs inside HTML fragments (blog/service bodies)
 * so `href="services/..."` cannot resolve as `/blog/services/...` on nested pages.
 */
export function normalizeInternalHrefsInHtml(html: string): string {
  return html.replace(
    /href=(["'])(?!\/|https?:|mailto:|tel:|#|\/\/)([^"']+)\1/gi,
    (_match, quote: string, path: string) => `href=${quote}/${path}${quote}`
  )
}
