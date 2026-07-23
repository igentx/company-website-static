// Theme Configuration System
// This file defines the structure and available themes for easy client customization

export interface ThemeColors {
  // Primary colors
  primary: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    950: string
  }

  // Secondary colors
  secondary: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    950: string
  }

  // Tertiary colors
  tertiary: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    950: string
  }

  // Neutral colors
  neutral: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    950: string
  }

  // Status colors
  success: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }

  warning: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }

  error: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }

  info: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }

  // Basic colors
  white: string
  black: string
  transparent: string
}

export interface ThemeFonts {
  primary: {
    family: string[]
    weights: number[]
    variable?: string
  }
  secondary: {
    family: string[]
    weights: number[]
    variable?: string
  }
  mono: {
    family: string[]
    weights: number[]
    variable?: string
  }
  arabic: {
    family: string[]
    weights: number[]
    variable?: string
  }
}

export interface Theme {
  name: string
  colors: ThemeColors
  fonts: ThemeFonts
  spacing?: Record<string, string>
  borderRadius?: Record<string, string>
  boxShadow?: Record<string, string>
}

// Theme Configuration - Customize these values for different clients
export const theme: Theme = {
  name: 'default',
  colors: {
    // Primary colors - Main brand colors
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main primary color
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    // Secondary colors - Supporting colors
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b', // Main secondary color
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    // Tertiary colors - Accent colors
    tertiary: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef', // Main tertiary color
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
      950: '#4a044e',
    },
    // Neutral colors - Text and background colors
    neutral: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b',
    },
    // Status colors - Fixed across all clients
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    info: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
    // Basic colors
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
  },
  fonts: {
    // Primary font - For headings and important text
    primary: {
      family: ['Inter', 'system-ui', 'sans-serif'],
      weights: [300, 400, 500, 600, 700, 800],
      variable: '--font-primary',
    },
    // Secondary font - For body text and general content
    secondary: {
      family: ['Roboto', 'Arial', 'sans-serif'],
      weights: [300, 400, 500, 700],
      variable: '--font-secondary',
    },
    // Monospace font - For code and technical content
    mono: {
      family: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      weights: [400, 500, 600],
      variable: '--font-mono',
    },
    // Arabic font - For RTL languages
    arabic: {
      family: ['Noto Sans Arabic', 'Arabic UI Text', 'PingFang Arabic', 'Arial', 'sans-serif'],
      weights: [400, 500, 600, 700],
      variable: '--font-arabic',
    },
  },
  spacing: {
    '18': '4.5rem',
    '88': '22rem',
    '128': '32rem',
  },
  borderRadius: {
    '4xl': '2rem',
    '5xl': '2.5rem',
  },
  boxShadow: {
    soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
    medium: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    strong: '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
}

// Get the theme configuration
export const getCurrentTheme = (): Theme => {
  return theme
}
