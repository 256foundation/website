'use client'

import { useEffect, useState } from 'react'

/**
 * Each tagline is split into the lines it should break on, rather than left to
 * wrap on width — the break points are a copy decision, not a layout accident.
 * A line still wraps further if a narrow viewport cannot fit it.
 */
const TAGLINES = [
  ['Building the open-source', 'Bitcoin mining stack.'],
  ['Reverse engineering', 'an industry.'],
  ['The Linux Foundation', 'of Bitcoin mining.'],
]

const ROTATE_MS = 5000

/**
 * The hero tagline, cycling through TAGLINES.
 *
 * All lines render stacked in one grid cell so the block is always as tall as
 * the longest line — swapping text never reflows the page below it. Only the
 * active line is opaque; the rest are transparent and hidden from assistive
 * tech. The first line is what server-renders, so there is no flash of empty
 * space before hydration.
 */
export default function RotatingTagline() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // Rotating text is decorative motion: hold the first line for anyone who
    // has asked the OS to reduce it.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TAGLINES.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <p className="grid font-display font-extrabold text-gray-900 dark:text-white text-3xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase leading-none max-w-3xl mb-5 sm:mb-8">
      {TAGLINES.map((lines, i) => (
        <span
          key={lines.join(' ')}
          aria-hidden={i !== index}
          // The lines share a grid cell, so a plain crossfade leaves both
          // half-opaque and overlapping mid-swap. Delaying only the incoming
          // line lets the outgoing one clear first: out 0-300ms, in 300-600ms.
          className={`col-start-1 row-start-1 transition-opacity duration-300 ${
            i === index ? 'opacity-100 delay-300' : 'opacity-0'
          }`}
        >
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      ))}
    </p>
  )
}
