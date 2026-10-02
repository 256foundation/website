import Link from 'next/link'
import SectionWrapper from '@/components/ui/SectionWrapper'

const beats = [
  {
    lead: 'Bitcoin mining does three jobs.',
    body: 'It issues new coins, settles transactions, and secures the record.',
  },
  {
    lead: 'Today, that machinery is closed.',
    body: 'The machines this whole industry runs on are unauditable, unfixable, and permissioned.',
  },
]

/** The problem, as two centered statements that set up everything after. */
export default function ProblemSection() {
  return (
    <SectionWrapper size="tight">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {beats.map((beat) => (
          <div key={beat.lead} className="space-y-2">
            <p className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl leading-tight uppercase">
              {beat.lead}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
              {beat.body}
            </p>
          </div>
        ))}
        <div>
          <Link
            href="/mission"
            className="font-mono text-[#3b1445] dark:text-[#c084d8] text-sm hover:underline transition-colors"
          >
            The full mission →
          </Link>
        </div>
      </div>
    </SectionWrapper>
  )
}
