import type { ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  /** Show the leading accent bar. Defaults to true; closers may omit it. */
  bar?: boolean
  /** Center the bar + label (used by centered closers). */
  centered?: boolean
  /** Light treatment for use over a dark photo hero. */
  onDark?: boolean
  className?: string
}

/**
 * The single eyebrow / kicker used site-wide: a purple accent bar plus a mono
 * uppercase label. Replaces SectionHeader's label, the per-page SectionKicker
 * helpers, and every inline kicker so tracking and sizing stop drifting.
 */
export default function Eyebrow({ children, bar = true, centered = false, onDark = false, className = '' }: EyebrowProps) {
  return (
    <div
      className={[
        'flex items-center gap-3',
        centered ? 'justify-center' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {bar && (
        <span
          aria-hidden="true"
          className={[
            'block w-1 h-4',
            onDark ? 'bg-[#c084d8]' : 'bg-[#3b1445] dark:bg-[#c084d8]',
          ].join(' ')}
        />
      )}
      <span
        className={[
          'font-mono text-xs tracking-[0.2em] uppercase',
          onDark ? 'text-[#c084d8]' : 'text-[#3b1445] dark:text-[#c084d8]',
        ].join(' ')}
      >
        {children}
      </span>
    </div>
  )
}
