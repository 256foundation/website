import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'

interface PageCTAProps {
  /** Small uppercase label above the heading. */
  kicker?: string
  title: string
  body?: string
  /** Primary action label; defaults to a donate prompt. */
  donateLabel?: string
  /** Secondary action label; defaults to a contact prompt. */
  contactLabel?: string
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
}: PageCTAProps) {
  return (
    <SectionWrapper className="border-t border-gray-200 dark:border-[#1f1f1f]">
      <div className="max-w-2xl">
        <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase mb-4">
          {kicker}
        </p>
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-4">
          {title}
        </h2>
        {body && (
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
            {body}
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="lg" href="/donate">
            {donateLabel}
          </Button>
          <Button variant="outlined" size="lg" href="/contact">
            {contactLabel}
          </Button>
        </div>
      </div>
    </SectionWrapper>
  )
}
