'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Language } from '@/lib/types'

interface LanguageSwitcherProps {
  isScrolled?: boolean
  isInfoBar?: boolean
}

export default function LanguageSwitcher({ isScrolled = false, isInfoBar = false }: LanguageSwitcherProps) {
  const { currentLanguage, languages, changeLanguage, isRTL } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; right: number } | null>(null)

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  if (languages.length <= 1) {
    return null
  }

  // Calculate dropdown position when it opens
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + 8, // 8px gap (mt-2)
        left: isRTL ? rect.left : 0,
        right: isRTL ? 0 : window.innerWidth - rect.right,
      })
    } else {
      setDropdownPosition(null)
    }
  }, [isOpen, isRTL])

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Language selector button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded ${isInfoBar
          ? 'text-white hover:text-blue-200 hover:bg-white/20'
          : isScrolled
            ? 'text-gray-700 hover:text-blue-600 hover:bg-white/20'
            : 'text-white hover:text-blue-200 hover:bg-white/20'
          } ${isRTL ? 'space-x-reverse' : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Language selector. Current language: ${currentLang?.name || 'Unknown'}`}
        id="language-button"
      >
        <span className="text-lg flag-emoji" aria-hidden="true">
          {currentLang?.flag}
        </span>
        <span className="hidden sm:block">{currentLang?.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && dropdownPosition && (() => {
        const pos = dropdownPosition
        return (
          <div
            className="fixed z-[100] w-48 rounded-md shadow-xl ring-1 ring-gray-300 focus:outline-none bg-white"
            style={{
              top: `${pos.top}px`,
              ...(isRTL ? { left: `${pos.left}px` } : { right: `${pos.right}px` }),
            }}
            role="listbox"
            aria-labelledby="language-button"
            aria-activedescendant={`language-option-${currentLanguage}`}
          >
            <div className="py-1">
              {languages.map((language: Language) => (
                <button
                  key={language.code}
                  id={`language-option-${language.code}`}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center space-x-3 transition-colors ${language.code === currentLanguage ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    } ${isRTL ? 'space-x-reverse text-right' : ''}`}
                  role="option"
                  aria-selected={language.code === currentLanguage}
                  tabIndex={-1}
                >
                  <span className="text-lg flag-emoji" aria-hidden="true">
                    {language.flag}
                  </span>
                  <span className="flex-1">{language.name}</span>
                  {language.code === currentLanguage && (
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )
      })()}
    </div>
  )
}
