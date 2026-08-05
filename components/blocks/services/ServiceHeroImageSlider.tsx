'use client'

import { ServiceImage } from '@/lib/types'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

interface ServiceHeroImageSliderProps {
  images: ServiceImage[]
  fallbackAlt?: string
  enableAutoplay?: boolean
  autoplayDelay?: number
}

export default function ServiceHeroImageSlider({
  images,
  fallbackAlt = 'Project preview',
  enableAutoplay = true,
  autoplayDelay = 5000,
}: ServiceHeroImageSliderProps) {
  const slides = images.filter((image) => image.filename)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < slides.length) {
        setCurrentIndex(index)
      }
    },
    [slides.length]
  )

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (slides.length < 2 || !enableAutoplay || isPaused) return

    autoPlayRef.current = setInterval(nextSlide, autoplayDelay)
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [slides.length, enableAutoplay, isPaused, autoplayDelay, nextSlide])

  if (slides.length === 0) return null

  const hasMultiple = slides.length > 1
  const activeSlide = slides[currentIndex]
  const caption = activeSlide.title || activeSlide.alt

  return (
    <div
      className="relative min-w-0 w-full max-w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]"
        role={hasMultiple ? 'region' : undefined}
        aria-label={hasMultiple ? 'Project image gallery' : undefined}
        aria-live={hasMultiple ? 'polite' : undefined}
      >
        {slides.map((image, index) => {
          const isActive = index === currentIndex
          return (
            <div
              key={`${image.filename}-${index}`}
              className={isActive ? 'absolute inset-0' : 'hidden'}
              aria-hidden={!isActive}
            >
              <Image
                src={image.filename}
                alt={image.alt || fallbackAlt}
                fill
                className="object-cover object-top"
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 576px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030a23]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          )
        })}

        {caption && (
          <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-4 sm:px-5 sm:py-5">
            <p className="text-sm sm:text-base font-semibold text-white drop-shadow-md">{caption}</p>
          </div>
        )}

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-black/60 transition-colors"
              aria-label="Previous project image"
            >
              <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-black/60 transition-colors"
              aria-label="Next project image"
            >
              <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((image, index) => (
            <button
              key={`dot-${image.filename}-${index}`}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Show project image ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}
