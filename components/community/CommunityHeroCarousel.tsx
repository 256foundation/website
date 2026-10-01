'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import SectionWrapper from '@/components/ui/SectionWrapper'

interface CommunityHeroCarouselProps {
  photos: string[]
  kicker: string
  headline: string
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
      {/* Rotating photo layer — crossfades under the copy */}
      <div aria-hidden="true" className="absolute inset-0">
        {photos.map((src, i) => (
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
        ))}
      </div>

      {/* Contrast overlays so the copy stays legible over any frame */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      <SectionWrapper className="relative z-10 flex min-h-[560px] lg:min-h-[640px] items-center">
        <div className="max-w-2xl">
          <p className="font-mono text-[#c084d8] text-xs tracking-[0.2em] uppercase mb-4">
            {kicker}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white uppercase mb-5">
            {headline}
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed mb-8">{sub}</p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#3b1445] text-white font-mono font-bold text-sm rounded-none hover:bg-[#2d0f36] transition-colors"
            >
              {ctaLabel}
            </a>
            {secondaryLabel && secondaryHref && (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white font-mono font-bold text-sm rounded-none hover:border-white/80 hover:bg-white/5 transition-colors"
              >
                {secondaryLabel}
              </a>
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
