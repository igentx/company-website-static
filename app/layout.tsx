import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'IGENTX - AI-Driven Web & Branding Solutions',
    template: '%s | IGENTX',
  },
  description:
    'AI-Driven Web & Branding Solutions for Fast-Growing Businesses in the UAE. Modern web development with Next.js, React, and cutting-edge CMS platforms.',
  keywords: [
    'web development UAE',
    'AI-driven web solutions',
    'Next.js development',
    'React development',
    'Storyblok CMS',
    'website design Dubai',
    'digital solutions UAE',
    'branding agency',
    'ecommerce development',
    'multilingual websites',
  ],
  authors: [{ name: 'IGENTX' }],
  creator: 'IGENTX',
  publisher: 'IGENTX',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      ar: '/ar',
    },
  },
  robots: {
    index: process.env.NODE_ENV === 'production',
    follow: process.env.NODE_ENV === 'production',
    googleBot: {
      index: process.env.NODE_ENV === 'production',
      follow: process.env.NODE_ENV === 'production',
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon1.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'icon', url: '/icon0.svg', type: 'image/svg+xml' }],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_AE'],
    url: '/',
    title: 'IGENTX - AI-Driven Web & Branding Solutions',
    description:
      'AI-Driven Web & Branding Solutions for Fast-Growing Businesses in the UAE. Modern web development with Next.js, React, and cutting-edge CMS platforms.',
    siteName: 'IGENTX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IGENTX - AI-Driven Web & Branding Solutions',
    description:
      'AI-Driven Web & Branding Solutions for Fast-Growing Businesses in the UAE. Modern web development with Next.js, React, and cutting-edge CMS platforms.',
    creator: '@igentx',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: 'technology',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // This is a minimal root layout that lets [lang] handle everything
  return children
}
