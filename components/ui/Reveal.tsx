'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger delay in ms for sibling reveals. */
  delay?: number
}

/**
 * One-time fade/slide-in for a section. Fires once when it enters the
 * viewport, then disconnects. Under `prefers-reduced-motion` the content is
 * shown immediately with no transition, so the page is fully readable with
 * animations off.
 *
 * Wrapped sections stay server components; only this thin wrapper is client.
 */
export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()
  const shown = visible || reduced

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <div
      ref={ref}
      className={[
        'transition-all duration-700 ease-out motion-reduce:transition-none',
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
