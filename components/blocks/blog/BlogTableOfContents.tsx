'use client'

import type { TocHeading } from '@/lib/blog-utils'
import { useEffect, useState } from 'react'

interface BlogTableOfContentsProps {
  headings: TocHeading[]
}

export default function BlogTableOfContents({ headings }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    )

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (!headings.length) return null

  const navContent = (
    <nav aria-label="Table of contents">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
        On this page
      </p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm leading-snug transition-colors ${
                heading.level === 'h3' ? 'pl-4' : ''
              } ${
                activeId === heading.id
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <>
      <div className="lg:hidden mb-6">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900"
          aria-expanded={mobileOpen}
        >
          On this page
          <svg
            className={`w-5 h-5 transition-transform ${mobileOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {mobileOpen && (
          <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg">{navContent}</div>
        )}
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-28">{navContent}</div>
      </aside>
    </>
  )
}
