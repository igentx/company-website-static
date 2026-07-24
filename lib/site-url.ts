export const DEFAULT_SITE_URL = 'https://www.igentx.com'

const APEX_HOST = 'igentx.com'
const WWW_HOST = 'www.igentx.com'

/**
 * Canonical public origin. Always uses the www host for igentx.com,
 * even if NEXT_PUBLIC_SITE_URL is set to the apex domain.
 */
export function getSiteBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!raw) return DEFAULT_SITE_URL
  try {
    const url = new URL(raw)
    if (url.hostname === APEX_HOST) {
      url.hostname = WWW_HOST
    }
    return url.origin
  } catch {
    return DEFAULT_SITE_URL
  }
}
