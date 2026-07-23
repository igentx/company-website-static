// Theme utility functions for client configuration

import { Theme, getCurrentTheme } from './theme-config'

/**
 * Get theme-aware color with fallback
 */
export function getThemeColor(
  colorName: keyof Theme['colors'],
  shade: string | number = 'DEFAULT',
  fallback?: string
): string {
  const themeConfig = getCurrentTheme()
  const colorGroup = themeConfig.colors[colorName]

  if (typeof colorGroup === 'object' && colorGroup !== null) {
    const color = (colorGroup as Record<string, string>)[shade.toString()]
    return color || fallback || '#000000'
  }

  return (colorGroup as string) || fallback || '#000000'
}

/**
 * Get theme-aware font family
 */
export function getThemeFont(fontType: keyof Theme['fonts']): string[] {
  const themeConfig = getCurrentTheme()
  return themeConfig.fonts[fontType]?.family || ['system-ui', 'sans-serif']
}

/**
 * Generate CSS custom properties for a theme
 */
export function generateThemeCSS(theme: Theme): string {
  const colorEntries = Object.entries(theme.colors)
    .map(([colorName, colorValue]) => {
      if (typeof colorValue === 'object' && colorValue !== null) {
        return Object.entries(colorValue)
          .map(([shade, value]) => {
            // Convert hex to RGB values for CSS custom properties
            const rgb = hexToRgb(value as string)
            return `  --color-${colorName}-${shade}: ${rgb};`
          })
          .join('\n')
      } else {
        const rgb = hexToRgb(colorValue as string)
        return `  --color-${colorName}: ${rgb};`
      }
    })
    .join('\n')

  const fontEntries = Object.entries(theme.fonts)
    .map(([fontType, fontConfig]) => {
      return `  --font-${fontType}: ${fontConfig.family.map((f: string) => `'${f}'`).join(', ')};`
    })
    .join('\n')

  return `
:root {
${colorEntries}
${fontEntries}
}`.trim()
}

/**
 * Convert hex color to RGB values for CSS custom properties
 */
function hexToRgb(hex: string): string {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '')

  // Parse the r, g, b values
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return `${r} ${g} ${b}`
}

/**
 * Create a CSS class string with theme-aware utilities
 */
export function cn(...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Theme-aware utility class generator
 */
export const themeClasses = {
  // Primary colors
  primary: {
    bg: 'bg-primary',
    text: 'text-primary',
    border: 'border-primary',
    hover: 'hover:bg-primary',
  },
  secondary: {
    bg: 'bg-secondary',
    text: 'text-secondary',
    border: 'border-secondary',
    hover: 'hover:bg-secondary',
  },
  tertiary: {
    bg: 'bg-tertiary',
    text: 'text-tertiary',
    border: 'border-tertiary',
    hover: 'hover:bg-tertiary',
  },
  // Status colors
  success: {
    bg: 'bg-success',
    text: 'text-success',
    border: 'border-success',
  },
  warning: {
    bg: 'bg-warning',
    text: 'text-warning',
    border: 'border-warning',
  },
  error: {
    bg: 'bg-error',
    text: 'text-error',
    border: 'border-error',
  },
  info: {
    bg: 'bg-info',
    text: 'text-info',
    border: 'border-info',
  },
  // Fonts
  fonts: {
    primary: 'font-primary',
    secondary: 'font-secondary',
    mono: 'font-mono',
    arabic: 'font-arabic',
  },
} as const

// Define font families
const fonts = {
  primary: 'Poppins, sans-serif',
  secondary: 'Cairo, sans-serif',
}
