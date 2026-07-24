/**
 * Environment validation for the static IGENTX site (no Storyblok at runtime).
 */

function validateEnv() {
  // Mailjet is optional at build time; contact form checks isEmailEnabled() at runtime.
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SITE_URL) {
    console.warn(
      'Missing NEXT_PUBLIC_SITE_URL — canonical URLs may fall back to https://www.igentx.com'
    )
  } else if (
    process.env.NODE_ENV === 'production' &&
    process.env.NEXT_PUBLIC_SITE_URL?.includes('igentx.com') &&
    !process.env.NEXT_PUBLIC_SITE_URL.includes('www.')
  ) {
    console.warn(
      'NEXT_PUBLIC_SITE_URL should use https://www.igentx.com (www primary). Apex redirects to www at runtime.'
    )
  }
}

validateEnv()

export const isEmailEnabled = () =>
  !!(process.env.MAILJET_API_KEY && process.env.MAILJET_SECRET_KEY)

export const isGoogleAnalyticsEnabled = () => !!process.env.NEXT_PUBLIC_GA_ID

export const isClarityEnabled = () => !!process.env.NEXT_PUBLIC_CLARITY_ID

export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'
