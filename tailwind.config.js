// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getCurrentTheme } = require('./lib/theme-config')

const themeConfig = getCurrentTheme()

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Safelist for dynamic background colors from CMS JSON blocks
    {
      pattern: /^bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
    },
    // Common background colors that might be used
    'bg-white',
    'bg-black',
    'bg-transparent',
    'bg-gray-50',
    'bg-blue-50',
  ],
  theme: {
    extend: {
      // Theme-based colors
      colors: {
        // Background and foreground (for compatibility)
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        // Theme colors - configured in theme-config.ts
        primary: {
          50: themeConfig.colors.primary[50],
          100: themeConfig.colors.primary[100],
          200: themeConfig.colors.primary[200],
          300: themeConfig.colors.primary[300],
          400: themeConfig.colors.primary[400],
          500: themeConfig.colors.primary[500],
          600: themeConfig.colors.primary[600],
          700: themeConfig.colors.primary[700],
          800: themeConfig.colors.primary[800],
          900: themeConfig.colors.primary[900],
          950: themeConfig.colors.primary[950],
          DEFAULT: themeConfig.colors.primary[500],
        },
        secondary: {
          50: themeConfig.colors.secondary[50],
          100: themeConfig.colors.secondary[100],
          200: themeConfig.colors.secondary[200],
          300: themeConfig.colors.secondary[300],
          400: themeConfig.colors.secondary[400],
          500: themeConfig.colors.secondary[500],
          600: themeConfig.colors.secondary[600],
          700: themeConfig.colors.secondary[700],
          800: themeConfig.colors.secondary[800],
          900: themeConfig.colors.secondary[900],
          950: themeConfig.colors.secondary[950],
          DEFAULT: themeConfig.colors.secondary[500],
        },
        tertiary: {
          50: themeConfig.colors.tertiary[50],
          100: themeConfig.colors.tertiary[100],
          200: themeConfig.colors.tertiary[200],
          300: themeConfig.colors.tertiary[300],
          400: themeConfig.colors.tertiary[400],
          500: themeConfig.colors.tertiary[500],
          600: themeConfig.colors.tertiary[600],
          700: themeConfig.colors.tertiary[700],
          800: themeConfig.colors.tertiary[800],
          900: themeConfig.colors.tertiary[900],
          950: themeConfig.colors.tertiary[950],
          DEFAULT: themeConfig.colors.tertiary[500],
        },
        neutral: {
          50: themeConfig.colors.neutral[50],
          100: themeConfig.colors.neutral[100],
          200: themeConfig.colors.neutral[200],
          300: themeConfig.colors.neutral[300],
          400: themeConfig.colors.neutral[400],
          500: themeConfig.colors.neutral[500],
          600: themeConfig.colors.neutral[600],
          700: themeConfig.colors.neutral[700],
          800: themeConfig.colors.neutral[800],
          900: themeConfig.colors.neutral[900],
          950: themeConfig.colors.neutral[950],
          DEFAULT: themeConfig.colors.neutral[500],
        },

        // Status colors
        success: {
          50: themeConfig.colors.success[50],
          100: themeConfig.colors.success[100],
          200: themeConfig.colors.success[200],
          300: themeConfig.colors.success[300],
          400: themeConfig.colors.success[400],
          500: themeConfig.colors.success[500],
          600: themeConfig.colors.success[600],
          700: themeConfig.colors.success[700],
          800: themeConfig.colors.success[800],
          900: themeConfig.colors.success[900],
          DEFAULT: themeConfig.colors.success[500],
        },
        warning: {
          50: themeConfig.colors.warning[50],
          100: themeConfig.colors.warning[100],
          200: themeConfig.colors.warning[200],
          300: themeConfig.colors.warning[300],
          400: themeConfig.colors.warning[400],
          500: themeConfig.colors.warning[500],
          600: themeConfig.colors.warning[600],
          700: themeConfig.colors.warning[700],
          800: themeConfig.colors.warning[800],
          900: themeConfig.colors.warning[900],
          DEFAULT: themeConfig.colors.warning[500],
        },
        error: {
          50: themeConfig.colors.error[50],
          100: themeConfig.colors.error[100],
          200: themeConfig.colors.error[200],
          300: themeConfig.colors.error[300],
          400: themeConfig.colors.error[400],
          500: themeConfig.colors.error[500],
          600: themeConfig.colors.error[600],
          700: themeConfig.colors.error[700],
          800: themeConfig.colors.error[800],
          900: themeConfig.colors.error[900],
          DEFAULT: themeConfig.colors.error[500],
        },
        info: {
          50: themeConfig.colors.info[50],
          100: themeConfig.colors.info[100],
          200: themeConfig.colors.info[200],
          300: themeConfig.colors.info[300],
          400: themeConfig.colors.info[400],
          500: themeConfig.colors.info[500],
          600: themeConfig.colors.info[600],
          700: themeConfig.colors.info[700],
          800: themeConfig.colors.info[800],
          900: themeConfig.colors.info[900],
          DEFAULT: themeConfig.colors.info[500],
        },

        // Basic colors
        white: themeConfig.colors.white,
        black: themeConfig.colors.black,
        transparent: themeConfig.colors.transparent,
      },

      // Theme-based fonts - configured in theme-config.ts
      fontFamily: {
        // Use CSS variables for fonts loaded in layout
        primary: ['var(--font-poppins)', ...themeConfig.fonts.primary.family],
        secondary: ['var(--font-cairo)', ...themeConfig.fonts.secondary.family],
        arabic: ['var(--font-cairo)', ...themeConfig.fonts.arabic.family],
        
        // Legacy support
        sans: ['var(--font-cairo)', ...themeConfig.fonts.primary.family],
        mono: themeConfig.fonts.mono.family,
      },

      // Extended spacing
      spacing: {
        // RTL-friendly spacing utilities
        'rtl-1': '0.25rem',
        'rtl-2': '0.5rem',
        'rtl-3': '0.75rem',
        'rtl-4': '1rem',
        // Theme spacing
        ...themeConfig.spacing,
      },

      // Theme border radius
      borderRadius: {
        ...themeConfig.borderRadius,
      },

      // Theme box shadows
      boxShadow: {
        ...themeConfig.boxShadow,
      },
    },
  },
  plugins: [
    // Add plugin for RTL support
    function ({ addUtilities }) {
      const newUtilities = {
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
        '.space-x-reverse > :not([hidden]) ~ :not([hidden])': {
          '--tw-space-x-reverse': '1',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
