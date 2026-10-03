'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Eyebrow from '@/components/ui/Eyebrow'
import HeroScrim from '@/components/ui/HeroScrim'
import Button from '@/components/ui/Button'

interface CommunityHeroCarouselProps {
  photos: string[]
  kicker: string
  headline: ReactNode
  sub: string
  ctaLabel: string
  ctaHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

/**
 * Full-bleed hero that crossfades a rolling set of community photos behind the
 * page's single call to action. Autoplay pauses on hover and stops entirely
 * under prefers-reduced-motion, which just leaves the first frame up. Dots and
 * arrows jump/step manually, and any manual move restarts the autoplay timer.
 */
export default function CommunityHeroCarousel({
  photos,
  kicker,
  headline,
  sub,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
}: CommunityHeroCarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  // Bumped on manual navigation so the autoplay interval restarts from now
  // rather than firing right after a click.
  const [resetKey, setResetKey] = useState(0)

  const count = photos.length
  const touchX = useRef<number | null>(null)

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count)
      setResetKey((k) => k + 1)
    },
    [count],
  )

  useEffect(() => {
    if (count < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(() => {
      if (!paused) setIndex((i) => (i + 1) % count)
    }, 6000)
    return () => window.clearInterval(id)
  }, [count, paused, resetKey])

  return (
    <section
      className="relative overflow-hidden border-b border-gray-200 dark:border-[#1f1f1f]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1))
        touchX.current = null
      }}
    >
      {/* Rotating photo layer, crossfades under the copy. Mount only the
          current frame and its two neighbours so /community loads 3 hero
          images instead of 8. */}
      <div aria-hidden="true" className="absolute inset-0">
        {photos.map((src, i) => {
          const distance = Math.min(Math.abs(i - index), count - Math.abs(i - index))
          if (distance > 1) return null
          return (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={[
                'object-cover object-center transition-opacity duration-1000 ease-in-out',
                i === index ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
            />
          )
        })}
      </div>

      {/* Contrast overlays so the copy stays legible over any frame */}
      <HeroScrim />

      <SectionWrapper className="relative z-10 flex min-h-[560px] lg:min-h-[640px] items-center">
        <div className="max-w-2xl">
          <Eyebrow onDark className="mb-4">
            {kicker}
          </Eyebrow>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white uppercase mb-5">
            {headline}
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed mb-8">{sub}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="lg" href={ctaHref} external>
              {ctaLabel}
            </Button>
            {secondaryLabel && secondaryHref && (
              <Button variant="onDarkOutlined" size="lg" href={secondaryHref} external>
                {secondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </SectionWrapper>

      {count > 1 && (
        /* Centered controls: subtle arrows flanking the dots */
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous photo"
            className="text-white/50 transition-colors hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === index}
                className={[
                  'h-1.5 w-1.5 rounded-full transition-all',
                  i === index ? 'bg-[#c084d8] scale-125' : 'bg-white/40 hover:bg-white/70',
                ].join(' ')}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next photo"
            className="text-white/50 transition-colors hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
