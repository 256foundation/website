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
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#3b1445] text-white font-mono font-bold text-sm rounded-none hover:bg-[#2d0f36] transition-colors"
          >
            {ctaLabel}
          </a>
        </div>
      </SectionWrapper>

      {count > 1 && (
        <>
          {/* Manual controls — bottom-right, clear of the left-aligned copy */}
          <div className="absolute bottom-4 right-4 sm:right-6 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous photo"
              className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/30 text-white/80 backdrop-blur-sm transition-colors hover:border-white/70 hover:text-white"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-mono text-xs text-white/70 tabular-nums" aria-hidden="true">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next photo"
              className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/30 text-white/80 backdrop-blur-sm transition-colors hover:border-white/70 hover:text-white"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dot nav */}
          <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 gap-2 sm:flex">
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
        </>
      )}
    </section>
  )
}
