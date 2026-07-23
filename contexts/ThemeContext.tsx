'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { getCurrentTheme } from '@/lib/theme-config'

interface ThemeContextType {
  theme: ReturnType<typeof getCurrentTheme>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Get the configured theme (server-side safe)
  const theme = getCurrentTheme()

  const value: ThemeContextType = {
    theme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Custom hook for theme-aware styles
export function useThemeStyles() {
  const { theme } = useTheme()

  return {
    getColorClass: (color: string, shade?: string | number) => {
      const shadeStr = shade ? `-${shade}` : ''
      return `${color}${shadeStr}`
    },
    getFontClass: (fontType: 'primary' | 'secondary' | 'mono' | 'arabic') => {
      return `font-${fontType}`
    },
    theme,
  }
}
