import { generatePageMetadata } from '@/lib/metadata'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'
import DecorativeBg from '@/components/ui/DecorativeBg'

export const metadata = generatePageMetadata({
  title: 'Grants',
  description:
    'Apply for a 256 Foundation grant to fund your open-source Bitcoin mining hardware or software project.',
  path: '/grants',
})

const steps = [
  {
    step: '01',
    title: 'Submit Your Application',
    description:
      'Fill out our application form via Typeform. Include your project description, technical approach, requested funding amount, timeline, and milestone plan.',
  },
  {
    step: '02',
    title: 'Foundation Review',
    description:
      'The 256 Foundation board reviews applications when a grant cycle opens. We evaluate technical merit, alignment with the open-source mining mission, and the team\'s ability to execute.',
  },
  {
    step: '03',
    title: 'Decision & Onboarding',
    description:
      'Approved grantees are contacted for further discussion. We work with you to finalize scope, milestones, and payment structure.',
  },
  {
    step: '04',
    title: 'Build in Public',
    description:
      'All funded projects are developed in public and released under an approved open-source license. We may feature your work on the foundation website and social channels.',
  },
]

const whatWeFund = [
  'Open-source Bitcoin mining hardware designs (OSHWA-compliant)',
  'Mining firmware and software (OSI-compliant open source)',
  'Mining pool software and infrastructure',
  'Education and documentation resources',
  'Tools and libraries that advance the open-source mining ecosystem',
  'Other projects aligned with the open-source Bitcoin mining mission',
]

const whatWeDontFund = [
  'Closed-source or proprietary projects',
  'Projects unrelated to Bitcoin mining or freedom technology',
  'Duplicate efforts without meaningful differentiation or improvement',
  'Projects that restrict others from using, modifying, or distributing the work',
]

export default function GrantsPage() {
  const typeformUrl = process.env.NEXT_PUBLIC_TYPEFORM_URL ?? '#'

  return (
    <>
      {/* Hero */}
      <SectionWrapper decorative className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <DecorativeBg glowPosition="50% 0%" gridOpacity={0.07} vignette={false} />
        <div className="max-w-3xl">
          <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-4">
            Grants Program
          </p>
          <h1 className="font-display font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase mb-6">
            Fund the Future of Open-Source Mining
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
            The 256 Foundation provides grants to developers and researchers building open-source
            Bitcoin mining hardware and software. If you&apos;re working to dismantle the proprietary
            mining empire — we want to fund you.
          </p>
          <Button variant="primary" size="lg" href={typeformUrl} external={typeformUrl !== '#'}>
            Apply for a Grant
          </Button>
        </div>
      </SectionWrapper>

      {/* Grant types */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-4">
          Grant Types
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-2xl mb-8">
          256 Foundation grants are long-term support initiatives with continued funding — not one-time payments or touch-and-go projects. We commit to sustained collaboration with developers over the full grant period.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-[#242424] border border-[#3b1445]/50 dark:border-[#5c2070]/50 rounded-none p-6">
            <div className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-3">
              Core Pillar Grants
            </div>
            <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg uppercase mb-3">Foundation-Defined</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              The foundation identifies critical missing pieces of the open-source mining stack,
              defines the scope and deliverables, and selects qualified developers to build them.
              These are currently our four pillar projects: Ember One, Mujina, Libre Board, and Hydrapool.
            </p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-mono border text-[#00FF41] border-[#00FF41]/40 bg-[#00FF41]/10">
              Currently Active
            </span>
          </div>
          <div className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-6">
            <div className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-3">
              Open Grants
            </div>
            <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg uppercase mb-3">Community-Driven</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Any developer or researcher can submit a proposal for a project that advances the
              open-source Bitcoin mining ecosystem. We accept applications at any time and review
              them when a grant cycle opens.
            </p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-mono border text-[#3b1445] dark:text-[#c084d8] border-[#3b1445]/50 dark:border-[#5c2070]/50 bg-[#3b1445]/15 dark:bg-[#5c2070]/20">
              Accepting Applications
            </span>
          </div>
        </div>
      </SectionWrapper>

      {/* What we fund */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl uppercase mb-6">
              What We Fund
            </h2>
            <ul className="space-y-3">
              {whatWeFund.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm">
                  <span className="text-[#00FF41] mt-0.5 shrink-0">&rarr;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl uppercase mb-6">
              What We Don&apos;t Fund
            </h2>
            <ul className="space-y-3">
              {whatWeDontFund.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm">
                  <span className="text-red-500 mt-0.5 shrink-0">&times;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase">
            Application Process
          </h2>
          <a
            href="https://forum.256foundation.org/upcoming-events/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Events calendar for upcoming grant Q&amp;A calls →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-6">
              <div className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-3xl mb-4 opacity-50">
                {s.step}
              </div>
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm uppercase mb-2">{s.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl uppercase mb-4">
            Ready to Apply?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
            Submit your application and join the developers building the open-source future of Bitcoin mining.
          </p>
          <Button variant="primary" size="lg" href={typeformUrl} external={typeformUrl !== '#'}>
            Apply for a Grant
          </Button>
        </div>
      </SectionWrapper>
    </>
  )
}
