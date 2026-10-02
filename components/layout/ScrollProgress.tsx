'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

/**
 * Thin scroll-progress line pinned to the bottom edge of the sticky header.
 * Uses rAF-throttled scroll math; under `prefers-reduced-motion` the fill
 * updates instantly instead of easing.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    raf = requestAnimationFrame(update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden">
      <div
        className={[
          'h-full bg-[#3b1445] dark:bg-[#c084d8]',
          reduced ? '' : 'transition-[width] duration-100 ease-linear',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
