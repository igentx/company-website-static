import type { Metadata, Viewport } from 'next'
import {
  DEFAULT_OG_HEIGHT,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_WIDTH,
} from '@/lib/seo-utils'
import { getSiteBaseUrl } from '@/lib/site-url'

const defaultOgImage = {
  url: DEFAULT_OG_IMAGE,
  alt: 'IGENTX - AI-Driven Web and Digital Products',
  width: DEFAULT_OG_WIDTH,
  height: DEFAULT_OG_HEIGHT,
}

export const metadata: Metadata = {
  title: 'IGENTX - AI-Driven Web & Branding Solutions',
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
  metadataBase: new URL(getSiteBaseUrl()),
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      'x-default': '/',
    },
    types: {
      'application/rss+xml': '/feed.xml',
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
    url: '/',
    title: 'IGENTX - AI-Driven Web & Branding Solutions',
    description:
      'AI-Driven Web & Branding Solutions for Fast-Growing Businesses in the UAE. Modern web development with Next.js, React, and cutting-edge CMS platforms.',
    siteName: 'IGENTX',
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IGENTX - AI-Driven Web & Branding Solutions',
    description:
      'AI-Driven Web & Branding Solutions for Fast-Growing Businesses in the UAE. Modern web development with Next.js, React, and cutting-edge CMS platforms.',
    creator: '@igentx',
    images: [defaultOgImage],
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
