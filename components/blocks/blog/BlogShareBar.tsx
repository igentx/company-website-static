'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { getSiteBaseUrl } from '@/lib/site-url'

interface BlogShareBarProps {
  title: string
  url?: string
}

/** Public canonical path: strip internal /en prefix used by App Router rewrites. */
function toCanonicalPath(pathname: string): string {
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return pathname.slice(3) || '/'
  }
  return pathname || '/'
}

export default function BlogShareBar({ title, url }: BlogShareBarProps) {
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)

  const shareUrl =
    url ||
    `${getSiteBaseUrl()}${toCanonicalPath(pathname)}`

  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(shareUrl)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 py-6 border-y border-gray-200">
      <span className="text-sm font-medium text-gray-700">Share:</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
        aria-label="Share on LinkedIn"
      >
        LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
        aria-label="Share on X"
      >
        X
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
      >
        {copied ? 'Link copied' : 'Copy link'}
      </button>
    </div>
  )
}
