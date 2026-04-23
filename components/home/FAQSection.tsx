import Link from 'next/link'
import { faqItems } from '@/data/faq'

// Curated selection: one from each key conversion moment
const SELECTED = [
  'What does the 256 Foundation do?',
  'How much of my donation goes towards open-source contributors?',
  'Who can apply for a grant?',
  'How can I donate to the 256 Foundation?',
]

export default function FAQSection() {
  const selected = SELECTED.map((q) => faqItems.find((f) => f.question === q)).filter(
    Boolean,
  ) as (typeof faqItems)[number][]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 bg-[#3b1445]" />
        <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">
          FAQ
        </span>
      </div>
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase">
          Common Questions
        </h2>
        <Link
          href="/faq"
          className="font-mono text-[#3b1445] dark:text-[#c084d8] text-sm hover:underline whitespace-nowrap transition-colors"
        >
          See all FAQs →
        </Link>
      </div>

      {/* Accordion */}
      <div className="space-y-2 max-w-3xl">
        {selected.map((item, i) => (
          <details
            key={i}
            className="group bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none overflow-hidden [&[open]]:border-[#3b1445]/50 dark:[&[open]]:border-[#5c2070]/50"
          >
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-mono text-gray-900 dark:text-white text-sm font-bold hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors list-none [&::-webkit-details-marker]:hidden group-open:text-[#3b1445] dark:group-open:text-[#c084d8]">
              {item.question}
              <svg
                className="w-4 h-4 shrink-0 ml-4 transition-transform group-open:rotate-180 text-[#3b1445] dark:text-[#c084d8]"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 10.5L2.5 5 1 6.5l7 7 7-7L13.5 5z" />
              </svg>
            </summary>
            <div className="px-5 pb-4 pt-1 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-200 dark:border-[#1f1f1f] space-y-3">
              {item.answer.split('\n\n').map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
