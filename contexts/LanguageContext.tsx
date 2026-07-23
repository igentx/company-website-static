'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { LanguageContextType, Language } from '@/lib/types'
import { getSupportedLanguages, DEFAULT_LANGUAGE, isRTLLanguage } from '@/lib/languages'

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
  initialLanguage?: string
}

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    initialLanguage || DEFAULT_LANGUAGE
  )
  const [languages, setLanguages] = useState<Language[]>([])
  const [isLoadingLanguages, setIsLoadingLanguages] = useState(true)

  // Fetch supported languages from static content (with caching)
  useEffect(() => {
    async function loadLanguages() {
      try {
        const supportedLanguages = await getSupportedLanguages()
        setLanguages(supportedLanguages)
      } catch (error) {
        console.error('Failed to load languages:', error)
        // Fallback to English and Arabic
        setLanguages([
          {
            code: DEFAULT_LANGUAGE,
            name: 'English',
            flag: '🇺🇸',
            direction: 'ltr',
          },
          {
            code: 'ar',
            name: 'العربية',
            flag: '🇸🇦',
            direction: 'rtl',
          },
        ])
      } finally {
        setIsLoadingLanguages(false)
      }
    }
    loadLanguages()
  }, [])

  // Initialize language from various sources
  useEffect(() => {
    // Wait for languages to load before initializing language
    if (isLoadingLanguages || languages.length === 0) {
      return
    }

    // Get language from URL path first (e.g., /ar/, /es/)
    const pathSegments = window.location.pathname.split('/').filter(Boolean)
    const urlLang = pathSegments[0] // First segment might be language code

    // Get stored language preference
    const storedLang = localStorage.getItem('preferred-language')

    // Priority: URL path > initialLanguage > stored preference > default
    let langToUse = DEFAULT_LANGUAGE

    if (urlLang && languages.some((lang) => lang.code === urlLang)) {
      langToUse = urlLang
    } else if (initialLanguage && languages.some((lang) => lang.code === initialLanguage)) {
      langToUse = initialLanguage
    } else if (storedLang && languages.some((lang) => lang.code === storedLang)) {
      langToUse = storedLang
    }

    setCurrentLanguage(langToUse)
  }, [initialLanguage, languages, isLoadingLanguages])

  // Update document direction and lang when language changes
  useEffect(() => {
    const html = document.documentElement
    html.lang = currentLanguage
    html.dir = isRTLLanguage(currentLanguage) ? 'rtl' : 'ltr'
  }, [currentLanguage])

  const changeLanguage = (langCode: string) => {
    const isSupported = languages.some((lang) => lang.code === langCode)
    if (!isSupported) {
      console.warn(`Language ${langCode} is not supported`)
      return
    }

    setCurrentLanguage(langCode)

    // Store preference in localStorage and cookie
    localStorage.setItem('preferred-language', langCode)
    document.cookie = `preferred-language=${langCode}; path=/; max-age=31536000` // 1 year

    // Navigate to the appropriate URL based on language
    const currentPath = window.location.pathname
    const currentSearch = window.location.search

    // Remove existing language from path if present
    const pathSegments = currentPath.split('/').filter(Boolean)
    const firstSegment = pathSegments[0]

    // Check if first segment is a language code
    const isFirstSegmentLang = languages.some((lang) => lang.code === firstSegment)

    let basePath = currentPath
    if (isFirstSegmentLang) {
      // Remove language from path: /ar/about -> /about
      basePath = '/' + pathSegments.slice(1).join('/')
    }

    // Normalize base path
    if (basePath === '/') {
      basePath = ''
    }

    let newUrl: string
    if (langCode === DEFAULT_LANGUAGE) {
      // Default language uses clean URLs (/, /about) - redirects handle SEO
      newUrl = basePath || '/'
    } else {
      // Non-default languages get language prefix: /ar/, /ar/about
      newUrl = `/${langCode}${basePath || ''}`
    }

    // Navigate to new URL
    window.location.href = newUrl + currentSearch
  }

  // Helper function to create language-aware URLs
  const createLanguageAwareUrl = (path: string, targetLang?: string) => {
    const langToUse = targetLang || currentLanguage

    // Clean the path (remove leading/trailing slashes for processing)
    const cleanPath = path.replace(/^\/+|\/+$/g, '')

    // For default language, use clean URLs
    if (langToUse === DEFAULT_LANGUAGE) {
      return `/${cleanPath}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
    }

    // For non-default languages, prefix with language code
    return `/${langToUse}${cleanPath ? `/${cleanPath}` : ''}`.replace(/\/+/g, '/')
  }

  // Helper function for programmatic navigation (maintains current language)
  const navigateTo = (path: string) => {
    const languageAwareUrl = createLanguageAwareUrl(path)
    window.location.href = languageAwareUrl
  }

  const contextValue: LanguageContextType = {
    currentLanguage,
    languages,
    changeLanguage,
    isRTL: isRTLLanguage(currentLanguage),
    createLanguageAwareUrl,
    navigateTo,
  }

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export { LanguageContext }
