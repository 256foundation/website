import type { ReactNode } from 'react'

type SpacingSize = 'hero' | 'default' | 'tight' | 'compact'

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  className?: string
  /** Named vertical rhythm. Defaults to the standard section spacing. */
  size?: SpacingSize
  /** @deprecated Use `size="tight"`. */
  tight?: boolean
  /** Adds `relative overflow-hidden` — required when using DecorativeBg as a child */
  decorative?: boolean
}

/** The only approved section vertical rhythms. */
const spacing: Record<SpacingSize, string> = {
  hero: 'py-16 lg:py-24',
  default: 'py-16 lg:py-24',
  tight: 'py-10 lg:py-16',
  compact: 'py-8 lg:py-12',
}

export default function SectionWrapper({
  children,
  id,
  className = '',
  size,
  tight = false,
  decorative = false,
}: SectionWrapperProps) {
  const resolved = size ?? (tight ? 'tight' : 'default')
  return (
    <section
      id={id}
      className={[
        'w-full',
        spacing[resolved],
        decorative ? 'relative overflow-hidden isolate' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
