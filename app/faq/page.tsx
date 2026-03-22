import { generatePageMetadata } from '@/lib/metadata'
import { faqItems } from '@/data/faq'
import SectionWrapper from '@/components/ui/SectionWrapper'
import type { FAQItem } from '@/types'

export const metadata = generatePageMetadata({
  title: 'FAQ',
  description:
    'Frequently asked questions about the 256 Foundation, our grants program, donations, and the open-source Bitcoin mining ecosystem.',
  path: '/faq',
})

type Category = FAQItem['category']

const categoryConfig: Record<Category, { label: string; description: string }> = {
  foundation: {
    label: 'About the Foundation',
    description: 'Who we are, what we do, and how we operate',
  },
  donations: {
    label: 'Donations',
    description: 'How to support the mission financially or with hashrate',
  },
  grants: {
    label: 'Grants',
    description: 'How our grants program works and how to apply',
  },
  projects: {
    label: 'Projects & Ecosystem',
    description: 'Our four pillar projects and the broader ecosystem',
  },
  technical: {
    label: 'Technical',
    description: 'Open-source hardware/software and why it matters for Bitcoin',
  },
}

export default function FAQPage() {
  const categories = Object.keys(categoryConfig) as Category[]

  return (
    <>
      {/* Hero */}
      <SectionWrapper className="border-b border-[#1f1f1f]">
        <div className="max-w-2xl">
          <p className="font-mono text-[#7C3AED] text-xs tracking-widest uppercase mb-4">FAQ</p>
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl uppercase mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Everything you need to know about the 256 Foundation, how we operate,
            and how to get involved in the open-source Bitcoin mining movement.
          </p>
        </div>
      </SectionWrapper>

      {/* FAQ categories */}
      {categories.map((category) => {
        const items = faqItems.filter((item) => item.category === category)
        if (items.length === 0) return null
        const config = categoryConfig[category]

        return (
          <SectionWrapper key={category} className="border-b border-[#1f1f1f]">
            <div className="max-w-3xl">
              <h2 className="font-display font-bold text-white text-xl sm:text-2xl uppercase mb-1">
                {config.label}
              </h2>
              <p className="text-gray-500 text-sm mb-8">{config.description}</p>

              <div className="space-y-2">
                {items.map((item, i) => (
                  <details
                    key={i}
                    className="group bg-[#111111] border border-[#1f1f1f] rounded-none overflow-hidden [&[open]]:border-[#7C3AED]/30"
                  >
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-mono text-white text-sm font-bold hover:text-[#7C3AED] transition-colors list-none [&::-webkit-details-marker]:hidden group-open:text-[#7C3AED]">
                      {item.question}
                      <svg
                        className="w-4 h-4 shrink-0 ml-4 transition-transform group-open:rotate-180 text-[#7C3AED]"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 10.5L2.5 5 1 6.5l7 7 7-7L13.5 5z" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-4 pt-1 text-gray-400 text-sm leading-relaxed border-t border-[#1f1f1f]">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </SectionWrapper>
        )
      })}
    </>
  )
}
