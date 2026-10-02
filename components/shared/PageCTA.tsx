import type { ReactNode } from 'react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'

interface PageCTAProps {
  /** Small uppercase label above the heading. */
  kicker?: string
  title: string
  body?: string
  /** Primary action label; defaults to a donate prompt. */
  donateLabel?: string
  /** Secondary action label; defaults to a contact prompt. */
  contactLabel?: string
  /** Layout alignment. Centered is the sitewide default so every page ends on the same note. */
  align?: 'left' | 'center'
  /** Extra actions rendered alongside the defaults (e.g. GitHub, Forum). */
  extra?: ReactNode
  /** Node rendered below the actions (e.g. a secondary text link). */
  footnote?: ReactNode
}

/**
 * Contextual closing prompt for pages that don't already end on a CTA: a
 * primary Donate action and a secondary Get in touch action. Copy is passed per
 * page so the ask reads in context rather than as a uniform band.
 */
export default function PageCTA({
  kicker = 'Get Involved',
  title,
  body,
  donateLabel = 'Fund the work →',
  contactLabel = 'Get in touch →',
  align = 'center',
  extra,
  footnote,
}: PageCTAProps) {
  const centered = align === 'center'
  return (
    <SectionWrapper
      className={[
        'border-t border-gray-200 dark:border-[#1f1f1f]',
        centered ? 'text-center' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}>
        <Eyebrow centered={centered} className="mb-4">
          {kicker}
        </Eyebrow>
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-4">
          {title}
        </h2>
        {body && (
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
            {body}
          </p>
        )}
        <div className={['flex flex-wrap gap-3', centered ? 'justify-center' : ''].filter(Boolean).join(' ')}>
          <Button variant="primary" size="lg" href="/donate">
            {donateLabel}
          </Button>
          <Button variant="outlined" size="lg" href="/contact">
            {contactLabel}
          </Button>
          {extra}
        </div>
        {footnote && <div className={centered ? 'mt-8' : 'mt-8'}>{footnote}</div>}
      </div>
    </SectionWrapper>
  )
}
