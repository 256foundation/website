import type { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  className?: string
  tight?: boolean
}

export default function SectionWrapper({
  children,
  id,
  className = '',
  tight = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={[
        'w-full',
        tight ? 'py-10 lg:py-16' : 'py-16 lg:py-24',
        className,
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
