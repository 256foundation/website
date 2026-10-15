import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'
import { surface } from '@/lib/tokens'

/**
 * Compact funding band between proof and community. Keeps the ask near the
 * proof without spending a full screen on it.
 */
export default function FundingBand() {
  return (
    <SectionWrapper size="compact">
      <div className={`${surface('tinted')} border px-6 py-8 sm:px-8 sm:py-10`}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-4 bg-[#3b1445] dark:bg-[#c084d8]" />
              <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">
                Funding
              </span>
            </div>
            <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl sm:text-2xl uppercase">
              We fund the builders.
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Grants for open-source Bitcoin mining work. Money from anyone, influence from no one.
            </p>
          </div>
          <div className="shrink-0">
            <Button variant="primary" href="/grants">
              See the grants →
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
