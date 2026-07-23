'use client'

import { useEffect, useState } from 'react'
import { BlockRenderer } from '@/lib/blocks'
import { useLanguage } from '@/contexts/LanguageContext'

interface DynamicContentLoaderProps {
  slug: string
  initialContent: Record<string, unknown>
  fallbackContent: Record<string, unknown>
}

export default function DynamicContentLoader({
  slug,
  initialContent,
  fallbackContent,
}: DynamicContentLoaderProps) {
  const { currentLanguage } = useLanguage()
  const [content, setContent] = useState(initialContent)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function loadContent() {
      if (!currentLanguage) return

      setIsLoading(true)
      try {
        // Fetch content for the current language
        const response = await fetch(`/api/story?slug=${slug}&lang=${currentLanguage}`)
        if (response.ok) {
          const data = await response.json()
          setContent(data.content || fallbackContent)
        } else {
          setContent(fallbackContent)
        }
      } catch (error) {
        console.error('Error loading content:', error)
        setContent(fallbackContent)
      } finally {
        setIsLoading(false)
      }
    }

    // Only load if language has changed from initial
    if (currentLanguage && content === initialContent) {
      loadContent()
    }
  }, [currentLanguage, slug, initialContent, fallbackContent, content])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <BlockRenderer blok={content} />
}
