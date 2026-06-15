import { generatePageMetadata } from '@/lib/metadata'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'
import DecorativeBg from '@/components/ui/DecorativeBg'

export const metadata = generatePageMetadata({
  title: 'Grants',
  description:
    'The 256 Foundation funds open-source Bitcoin mining hardware and software. Our four core pillar projects are active. Open grant cycles open when funding allows.',
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
            Funding Open-Source Mining
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
            The 256 Foundation is committed to funding open-source Bitcoin mining hardware and software.
            Our four core pillar projects — Ember One, Mujina, Libre Board, and Hydrapool — are
            foundation-defined initiatives we&apos;re fully dedicated to. When funding allows beyond
            those commitments, we open grant cycles for the broader community.
          </p>
          <div className="inline-flex items-center gap-3 px-4 py-3 border border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-mono text-sm">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            Open grant applications are currently closed. Follow our channels to be notified when the next cycle opens.
          </div>
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
              defines the scope and deliverables, and commits to funding qualified developers to build them.
              These four projects — Ember One, Mujina, Libre Board, and Hydrapool — are our top priority.
              They are not traditional grants; they are dedicated foundation projects.
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
              open-source Bitcoin mining ecosystem. Open grant cycles launch when funding is available
              beyond our core pillar commitments. Follow our channels to know when the next cycle opens.
            </p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-mono border text-yellow-600 dark:text-yellow-400 border-yellow-500/40 bg-yellow-500/10">
              Cycle Closed
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
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase">
            Application Process
          </h2>
        </div>
        <div className="flex items-start gap-3 px-4 py-3 mb-8 border border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-mono text-xs">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          The open grant cycle is currently closed. The steps below describe how the process works when a cycle is active. Follow our channels to be notified when the next cycle opens.
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

      {/* Stay Informed CTA */}
      <SectionWrapper>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl uppercase mb-4">
            Stay Informed
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
            Open grant cycles will be announced on the POD256 podcast, our newsletter, and social channels.
            Follow along so you don&apos;t miss the next round.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="primary" size="lg" href="https://256foundation.substack.com" external>
              Subscribe to Newsletter
            </Button>
            <Button variant="secondary" size="lg" href="https://www.pod256.org" external>
              POD256 Podcast
            </Button>
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <a href="https://x.com/256FOUNDATION" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors">
              X / Twitter →
            </a>
            <a href="https://primal.net/p/nprofile1qqsqhk42dz0exfcsln4yqmdkjys0nvd7dqndgacpsa7w7pt7njq2uuss2u9cq" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors">
              Nostr →
            </a>
            <a href="https://t.me/the256foundation" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors">
              Telegram →
            </a>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
