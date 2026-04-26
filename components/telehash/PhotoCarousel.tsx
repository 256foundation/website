'use client'

import { useState } from 'react'

interface PhotoCarouselProps {
  photos: string[]
  eventName: string
}

export default function PhotoCarousel({ photos, eventName }: PhotoCarouselProps) {
  const [index, setIndex] = useState(0)

  if (photos.length === 0) return null

  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setIndex((i) => (i + 1) % photos.length)

  return (
    <div className="bg-black select-none">
      {/* Main image — only render current ± 1 to avoid loading every photo
          on mount. Adjacent slides preload so prev/next feels instant. */}
      <div className="relative aspect-video overflow-hidden">
        {photos.map((src, i) => {
          const distance = Math.min(
            Math.abs(i - index),
            photos.length - Math.abs(i - index),
          )
          if (distance > 1) return null
          return (
            <img
              key={src}
              src={src}
              alt={`${eventName} photo ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          )
        })}

        {/* Prev / Next buttons */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-0 top-0 h-full w-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/20 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/20 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-3 right-3 font-mono text-xs text-white/60 bg-black/50 px-2 py-0.5">
          {index + 1} / {photos.length}
        </div>
      </div>

      {/* Dot nav */}
      {photos.length > 1 && (
        <div className="flex justify-center gap-1.5 py-2.5 bg-black/80">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === index ? 'bg-[#c084d8] scale-125' : 'bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
