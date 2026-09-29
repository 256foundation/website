'use client'

import { useEffect, useState } from 'react'

export interface StackNavLayer {
  slug: string
  label: string
  index: number
}

interface Props {
  layers: StackNavLayer[]
}

/**
 * Sticky layer index for the Open Mining Stack page. Real anchors (works
 * without JS); IntersectionObserver adds the active state once mounted.
 * Offset clears the fixed header (64px) + accent line (3px) + extension topbar.
 */
export default function StackSubNav({ layers }: Props) {
  const [active, setActive] = useState<string>(layers[0]?.slug ?? '')

  useEffect(() => {
    const sections = layers
      .map((l) => document.getElementById(l.slug))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [layers])

  return (
    <nav
      aria-label="Stack layers"
      className="sticky z-40 bg-white/95 dark:bg-[#13091a]/95 backdrop-blur-md border-b border-gray-200 dark:border-[#1f1f1f]"
      style={{ top: 'calc(67px + var(--ext-offset))' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-stretch gap-1 overflow-x-auto">
          {layers.map((layer) => {
            const isActive = active === layer.slug
            return (
              <li key={layer.slug} className="shrink-0">
                <a
                  href={`#${layer.slug}`}
                  className={[
                    'flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest py-3 px-3 border-b-2 transition-colors whitespace-nowrap',
                    isActive
                      ? 'border-[#3b1445] dark:border-[#c084d8] text-[#3b1445] dark:text-[#c084d8] font-bold'
                      : 'border-transparent text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                  ].join(' ')}
                >
                  <span className="text-gray-300 dark:text-gray-700">{String(layer.index).padStart(2, '0')}</span>
                  {layer.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
