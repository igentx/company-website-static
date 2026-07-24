import { Language } from './types'
import { getSupportedLanguageCodes } from './content'

/**
 * Language cache configuration
 */
const CACHE_CONFIG = {
  STORAGE_KEY: 'content_languages_cache',
  EXPIRY_HOURS: 24, // Cache for 24 hours
  BACKGROUND_REFRESH_HOURS: 12, // Background refresh after 12 hours
} as const

interface CachedLanguages {
  languages: string[]
  timestamp: number
  expiresAt: number
}

// In-memory cache for fastest access
let memoryCache: Language[] | null = null
let memoryCacheTimestamp: number = 0

/**
 * Language metadata mapping
 * This maps language codes to their display information
 */
export const LANGUAGE_METADATA: Record<string, Omit<Language, 'code'>> = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
  },
  ar: {
    name: 'العربية',
    flag: '🇸🇦',
    direction: 'rtl',
  },
  es: {
    name: 'Español',
    flag: '🇪🇸',
    direction: 'ltr',
  },
  fr: {
    name: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
  },
  de: {
    name: 'Deutsch',
    flag: '🇩🇪',
    direction: 'ltr',
  },
  // Add more language metadata as needed
}

export const DEFAULT_LANGUAGE = 'en'

/**
 * Get cached languages from localStorage
 */
function getCachedLanguages(): string[] | null {
  if (typeof window === 'undefined') return null

  try {
    const cached = localStorage.getItem(CACHE_CONFIG.STORAGE_KEY)
    if (!cached) return null

    const data: CachedLanguages = JSON.parse(cached)
    const now = Date.now()

    // Check if cache is expired
    if (now > data.expiresAt) {
      localStorage.removeItem(CACHE_CONFIG.STORAGE_KEY)
      return null
    }

    return data.languages
  } catch {
    console.warn('Error reading language cache:', 'Cache read failed')
    localStorage.removeItem(CACHE_CONFIG.STORAGE_KEY)
    return null
  }
}

/**
 * Save languages to localStorage cache
 */
function setCachedLanguages(languages: string[]): void {
  if (typeof window === 'undefined') return

  try {
    const now = Date.now()
    const data: CachedLanguages = {
      languages,
      timestamp: now,
      expiresAt: now + CACHE_CONFIG.EXPIRY_HOURS * 60 * 60 * 1000,
    }

    localStorage.setItem(CACHE_CONFIG.STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.warn('Error saving language cache:', error)
  }
}

/**
 * Check if we should trigger a background refresh
 */
function shouldBackgroundRefresh(): boolean {
  if (typeof window === 'undefined') return false

  try {
    const cached = localStorage.getItem(CACHE_CONFIG.STORAGE_KEY)
    if (!cached) return false

    const data: CachedLanguages = JSON.parse(cached)
    const now = Date.now()
    const backgroundRefreshTime =
      data.timestamp + CACHE_CONFIG.BACKGROUND_REFRESH_HOURS * 60 * 60 * 1000

    return now > backgroundRefreshTime
  } catch {
    return false
  }
}

/**
 * Transform language codes to Language objects with metadata
 */
function transformLanguageCodes(languageCodes: string[]): Language[] {

  // Ensure we always have both default and provided languages
  const allCodes = new Set([DEFAULT_LANGUAGE, ...languageCodes])
  const codesArray = Array.from(allCodes)

  // Always include the default language first
  const defaultLanguage: Language = {
    code: DEFAULT_LANGUAGE,
    ...(LANGUAGE_METADATA[DEFAULT_LANGUAGE] || {
      name: 'English',
      flag: '🇺🇸',
      direction: 'ltr' as const,
    }),
  }

  // Add other languages, excluding the default language if it appears in the list
  const otherLanguages = codesArray
    .filter((code: string) => code !== DEFAULT_LANGUAGE)
    .map((code: string) => ({
      code,
      ...(LANGUAGE_METADATA[code] || {
        name: code.toUpperCase(),
        flag: '🌐',
        direction: 'ltr' as const,
      }),
    }))

  const result = [defaultLanguage, ...otherLanguages]
  return result
}

/**
 * Background refresh of languages (non-blocking)
 */
async function backgroundRefreshLanguages(): Promise<void> {
  try {
    const freshLanguageCodes = getSupportedLanguageCodes()

    // Update both caches
    const freshLanguages = transformLanguageCodes(freshLanguageCodes)
    memoryCache = freshLanguages
    memoryCacheTimestamp = Date.now()
    setCachedLanguages(freshLanguageCodes)

  } catch (error) {
    console.warn('Background refresh failed:', error)
  }
}

/**
 * Fetch supported languages from static content with multi-tier caching
 * 1. Memory cache (fastest)
 * 2. localStorage cache (persistent)
 * 3. Fresh API call (fallback)
 */
export async function getSupportedLanguages(): Promise<Language[]> {
  const now = Date.now()
  const MEMORY_CACHE_TTL = 5 * 60 * 1000 // 5 minutes for memory cache

  try {
    // 1. Check memory cache first (fastest)
    if (memoryCache && now - memoryCacheTimestamp < MEMORY_CACHE_TTL) {

      // Trigger background refresh if needed (non-blocking)
      if (shouldBackgroundRefresh()) {
        backgroundRefreshLanguages() // Fire and forget
      }

      return memoryCache
    }

    // 2. Check localStorage cache
    const cachedLanguageCodes = getCachedLanguages()
    if (cachedLanguageCodes) {

      const cachedLanguages = transformLanguageCodes(cachedLanguageCodes)

      // Update memory cache
      memoryCache = cachedLanguages
      memoryCacheTimestamp = now

      // Trigger background refresh if needed (non-blocking)
      if (shouldBackgroundRefresh()) {
        backgroundRefreshLanguages() // Fire and forget
      }

      return cachedLanguages
    }

    // 3. Fresh API call (cache miss)
    const freshLanguageCodes = getSupportedLanguageCodes()
    const freshLanguages = transformLanguageCodes(freshLanguageCodes)

    // Update both caches
    memoryCache = freshLanguages
    memoryCacheTimestamp = now
    setCachedLanguages(freshLanguageCodes)

    return freshLanguages
  } catch (error) {
    console.error('Error fetching languages:', error)

    // Try to use stale cache as fallback
    const staleCache = getCachedLanguages()
    if (staleCache) {
      console.log('Using stale cache as fallback')
      return transformLanguageCodes(staleCache)
    }

    // Ultimate fallback: English only (matches content/manifest.json)
    const fallbackLanguages = [
      {
        code: DEFAULT_LANGUAGE,
        name: 'English',
        flag: '🇺🇸',
        direction: 'ltr' as const,
      },
    ]

    memoryCache = fallbackLanguages
    memoryCacheTimestamp = now

    console.log(
      '🚨 Using ultimate fallback languages:',
      fallbackLanguages.map((l) => l.code)
    )
    return fallbackLanguages
  }
}

/**
 * Clear all language caches (useful for debugging or manual refresh)
 */
export function clearLanguageCache(): void {
  memoryCache = null
  memoryCacheTimestamp = 0

  if (typeof window !== 'undefined') {
    localStorage.removeItem(CACHE_CONFIG.STORAGE_KEY)
  }

  console.log('Language cache cleared')
}

/**
 * Get language by code from metadata
 */
export function getLanguageByCode(code: string): Language | undefined {
  const metadata = LANGUAGE_METADATA[code]
  if (metadata) {
    return {
      code,
      ...metadata,
    }
  }
  return undefined
}

/**
 * Check if language is RTL
 */
export function isRTLLanguage(langCode: string): boolean {
  const metadata = LANGUAGE_METADATA[langCode]
  return metadata?.direction === 'rtl'
}

/**
 * Get language direction class for Tailwind
 */
export function getDirectionClass(langCode: string): string {
  return isRTLLanguage(langCode) ? 'rtl' : 'ltr'
}

/**
 * Check if we should pass language parameter to API
 * Returns undefined for default language (uses default content files)
 */
export function getLanguageParam(langCode: string): string | undefined {
  return langCode === DEFAULT_LANGUAGE ? undefined : langCode
}
