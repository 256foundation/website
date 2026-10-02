import Image from 'next/image'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { getGrantAnnouncements } from '@/lib/newsroom'
import SectionWrapper from '@/components/ui/SectionWrapper'
import FundingAnnouncements from '@/components/grants/FundingAnnouncements'
import PageCTA from '@/components/shared/PageCTA'

export const metadata = generatePageMetadata({
  title: 'Grants',
  description:
    'Two programs fund open-source Bitcoin mining: the Core Projects Program for projects we scope, and the General Grant Program for projects you scope.',
  path: '/grants',
})

const steps = [
  {
    step: '01',
    title: 'Submit Your Application',
    description:
      'Send us a scoped proposal: the gap, the project, the person, the license, and why it\'s genuinely open source, plus milestones, how you\'ll report progress, and an honest account of the current state.',
  },
  {
    step: '02',
    title: 'Foundation Review',
    description:
      'The board reviews applications as they come in, against written criteria. If it\'s a good idea and funding is available, we\'ll ask for more detail.',
  },
  {
    step: '03',
    title: 'Scope & Agreement',
    description:
      'We finalize scope, term, and milestones with you, and the board approves every grant. Funding runs under a written grant agreement: the work stays open-source, and IP never transfers to the Foundation.',
  },
  {
    step: '04',
    title: 'Build in Public',
    description:
      'Work is paid monthly, and developed in public under the project\'s open-source license, with milestones from the scope document. We may feature it on the website and our channels.',
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

/** How many announcements the on-page log previews before it links to the archive. */
const ANNOUNCEMENT_PREVIEW_LIMIT = 6

/** General Grant Program application form. Core Projects calls are still closed. */
const GENERAL_GRANT_APPLICATION_URL = 'https://form.typeform.com/to/oqyJAntF'

export default function GrantsPage() {
  const allAnnouncements = getGrantAnnouncements()
  const previewAnnouncements = allAnnouncements.slice(0, ANNOUNCEMENT_PREVIEW_LIMIT)

  return (
    <>
      {/* Hero — full-bleed image with overlaid copy (matches Open Mining Stack) */}
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-[#1f1f1f]">
        <Image
          src="/grants-hero-background.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        <SectionWrapper className="relative z-10 flex min-h-[560px] lg:min-h-[640px] items-center">
          <div className="max-w-2xl">
            <p className="font-mono text-[#c084d8] text-xs tracking-[0.2em] uppercase mb-4">
              Grants
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white uppercase mb-5">
              Funding <span className="text-[#c084d8]">Open-Source</span> Mining
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-8">
              Two programs fund open-source Bitcoin mining: the Core Projects Program for work we
              scope, and the General Grant Program for work you scope.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="#grant-programs"
                className="group border border-white/20 bg-black/35 backdrop-blur-sm p-5 hover:border-[#c084d8]/60 hover:bg-black/50 transition-colors"
              >
                <div className="font-display font-bold text-white uppercase mb-1 group-hover:text-[#c084d8] transition-colors">
                  Apply for a Grant
                </div>
                <div className="font-mono text-xs text-gray-300">
                  Core projects or one of your own
                </div>
              </Link>
        <Link
          href="#funding-announcements"
          className="group border border-white/20 bg-black/35 backdrop-blur-sm p-5 hover:border-[#c084d8]/60 hover:bg-black/50 transition-colors"
        >
          <div className="font-display font-bold text-white uppercase mb-1 group-hover:text-[#c084d8] transition-colors">
            Funding announcements
          </div>
          <div className="font-mono text-xs text-gray-300">
            See what we&apos;ve already funded
          </div>
        </Link>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* Grant types */}
      <SectionWrapper id="grant-programs" className="scroll-mt-[130px] border-b border-gray-200 dark:border-[#1f1f1f]">
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-4">
          Grant Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-6">
            <div className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-2">
              We scoped it
            </div>
            <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg uppercase mb-3">Core Projects Program</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
              Recruitment for the four core projects that make our open mining stack: Ember One,
              Libre Board, Mujina &amp; Hydrapool.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Funded with priority, under renewable funding terms, to keep the development kit&apos;s
              work moving.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 rounded-none text-xs font-mono border border-gray-300 dark:border-[#3f3f3f] text-gray-500 dark:text-gray-400"
              >
                Calls currently closed
              </button>
              <Link
                href="/projects"
                className="inline-flex items-center px-3 py-1.5 rounded-none text-xs font-mono border border-[#3b1445]/50 dark:border-[#5c2070]/50 text-[#3b1445] dark:text-[#c084d8] hover:border-[#3b1445] dark:hover:border-[#5c2070] hover:bg-[#3b1445]/5 transition-colors"
              >
                See our Core Projects →
              </Link>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-6">
            <div className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-2">
              You scoped it
            </div>
            <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg uppercase mb-3">General Grant Program</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
              Apply with an idea for your own project, or your own scope of work on one of ours.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              So long as it advances the open-source Bitcoin mining ecosystem, it&apos;s eligible.
            </p>
            <Link
              href={GENERAL_GRANT_APPLICATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-none text-xs font-mono font-bold bg-[#3b1445] text-white hover:bg-[#2d0f36] transition-colors"
            >
              Apply for a Grant →
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* What we fund — subtle filler */}
      <SectionWrapper tight className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-4">
              What We Fund
            </div>
            <ul className="space-y-2">
              {whatWeFund.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  <span className="text-[#00FF41] mt-0.5 shrink-0 text-xs">&rarr;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-4">
              What We Don&apos;t Fund
            </div>
            <ul className="space-y-2">
              {whatWeDontFund.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  <span className="text-red-500 mt-0.5 shrink-0 text-xs">&times;</span>
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
            How a grant runs
          </h2>
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

      {/* Funding announcements */}
      <FundingAnnouncements
        id="funding-announcements"
        className="scroll-mt-[130px]"
        title="Funding announcements"
        posts={previewAnnouncements}
        showViewAll={allAnnouncements.length > ANNOUNCEMENT_PREVIEW_LIMIT}
      />

      <PageCTA
        kicker="Not Sure Where To Start?"
        title="Tell us what you want to build."
        body="If you can't tell which program fits, or you want to discuss a larger or longer commitment, get in touch. We'll help you find the right door."
        donateLabel="Fund a grant →"
      />
    </>
  )
}
