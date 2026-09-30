'use client'

import { useEffect, useState } from 'react'
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
 * under prefers-reduced-motion, which just leaves the first frame up.
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

  useEffect(() => {
    if (photos.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(() => {
      if (!paused) setIndex((i) => (i + 1) % photos.length)
    }, 6000)
    return () => window.clearInterval(id)
  }, [photos.length, paused])

  return (
    <section
      className="relative overflow-hidden border-b border-gray-200 dark:border-[#1f1f1f]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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

      {/* Dot nav */}
      {photos.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={[
                'h-1.5 w-1.5 rounded-full transition-all',
                i === index ? 'bg-[#c084d8] scale-125' : 'bg-white/40 hover:bg-white/70',
              ].join(' ')}
            />
          ))}
        </div>
      )}
    </section>
  )
}
