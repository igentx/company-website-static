'use client'

import { useConsent } from '@/contexts/ConsentContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { isRTLLanguage } from '@/lib/languages'
import Link from 'next/link'

/**
 * Cookie Consent Banner Component
 * 
 * GDPR-compliant consent banner for Google Analytics
 * Shows banner until user accepts or declines
 * Stores consent preference in localStorage
 */
export default function CookieConsentBanner() {
  const { showBanner, setConsent } = useConsent()
  const { currentLanguage } = useLanguage()
  const isRTL = isRTLLanguage(currentLanguage)

  // Translations
  const translations = {
    en: {
      title: 'Cookie Consent',
      message:
        'We use cookies to analyze website traffic and optimize your experience. By accepting, you agree to our use of cookies.',
      accept: 'Accept All',
      decline: 'Decline',
      learnMore: 'Learn More',
    },
    ar: {
      title: 'موافقة ملفات تعريف الارتباط',
      message:
        'نستخدم ملفات تعريف الارتباط لتحليل حركة المرور على الموقع وتحسين تجربتك. بالموافقة، أنت توافق على استخدامنا لملفات تعريف الارتباط.',
      accept: 'قبول الكل',
      decline: 'رفض',
      learnMore: 'اعرف المزيد',
    },
  }

  const t = translations[currentLanguage as keyof typeof translations] || translations.en

  if (!showBanner) {
    return null
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg"
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-message"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isRTL ? 'sm:flex-row-reverse' : ''
          }`}
        >
          {/* Content */}
          <div className="flex-1">
            <h3
              id="consent-title"
              className="text-base font-semibold text-gray-900 dark:text-white mb-2"
            >
              {t.title}
            </h3>
            <p
              id="consent-message"
              className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              {t.message}{' '}
              <Link
                href="/privacy"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {t.learnMore}
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div
            className={`flex flex-col sm:flex-row gap-3 w-full sm:w-auto ${
              isRTL ? 'sm:flex-row-reverse' : ''
            }`}
          >
            <button
              onClick={() => setConsent('declined')}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={t.decline}
            >
              {t.decline}
            </button>
            <button
              onClick={() => setConsent('accepted')}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
              aria-label={t.accept}
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

