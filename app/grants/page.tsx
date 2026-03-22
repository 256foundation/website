import { generatePageMetadata } from '@/lib/metadata'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'

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
      'The 256 Foundation board reviews all applications on a rolling basis. We evaluate technical merit, alignment with the open-source mining mission, and the team\'s ability to execute.',
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
  'Research advancing Bitcoin mining decentralization',
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
      <SectionWrapper className="border-b border-[#1f1f1f]">
        <div className="max-w-3xl">
          <p className="font-mono text-[#7C3AED] text-xs tracking-widest uppercase mb-4">
            Grants Program
          </p>
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase mb-6">
            Fund the Future of Open-Source Mining
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
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
      <SectionWrapper className="border-b border-[#1f1f1f]">
        <h2 className="font-display font-bold text-white text-2xl sm:text-3xl uppercase mb-8">
          Grant Types
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111111] border border-[#7C3AED]/30 rounded-none p-6">
            <div className="font-mono text-[#7C3AED] text-xs tracking-widest uppercase mb-3">
              Core Pillar Grants
            </div>
            <h3 className="font-display font-bold text-white text-lg uppercase mb-3">Foundation-Defined</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              The foundation identifies critical missing pieces of the open-source mining stack,
              defines the scope and deliverables, and selects qualified developers to build them.
              These are currently our four pillar projects: Ember One, Mujina, Libre Board, and Hydrapool.
            </p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-mono border text-[#00FF41] border-[#00FF41]/40 bg-[#00FF41]/10">
              Currently Active
            </span>
          </div>
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-none p-6">
            <div className="font-mono text-[#7C3AED] text-xs tracking-widest uppercase mb-3">
              Open Rolling Grants
            </div>
            <h3 className="font-display font-bold text-white text-lg uppercase mb-3">Community-Driven</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Any developer or researcher can submit a proposal for a project that advances the
              open-source Bitcoin mining ecosystem. We review applications on a rolling basis and
              fund based on merit, alignment, and available capital.
            </p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-mono border text-[#7C3AED] border-[#7C3AED]/40 bg-[#7C3AED]/10">
              Accepting Applications
            </span>
          </div>
        </div>
      </SectionWrapper>

      {/* What we fund */}
      <SectionWrapper className="border-b border-[#1f1f1f]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display font-bold text-white text-xl uppercase mb-6">
              What We Fund
            </h2>
            <ul className="space-y-3">
              {whatWeFund.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-400 text-sm">
                  <span className="text-[#00FF41] mt-0.5 shrink-0">&rarr;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display font-bold text-white text-xl uppercase mb-6">
              What We Don&apos;t Fund
            </h2>
            <ul className="space-y-3">
              {whatWeDontFund.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-400 text-sm">
                  <span className="text-red-500 mt-0.5 shrink-0">&times;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper className="border-b border-[#1f1f1f]">
        <h2 className="font-display font-bold text-white text-2xl sm:text-3xl uppercase mb-8">
          Application Process
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="bg-[#111111] border border-[#1f1f1f] rounded-none p-6">
              <div className="font-mono font-bold text-[#7C3AED] text-3xl mb-4 opacity-50">
                {s.step}
              </div>
              <h3 className="font-display font-bold text-white text-sm uppercase mb-2">{s.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-display font-bold text-white text-2xl uppercase mb-4">
            Ready to Apply?
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
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
