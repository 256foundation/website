import Image from 'next/image'
import { generatePageMetadata } from '@/lib/metadata'
import { founders, board } from '@/data/team'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Eyebrow from '@/components/ui/Eyebrow'
import HeroScrim from '@/components/ui/HeroScrim'
import TeamMemberCard from '@/components/shared/TeamMemberCard'
import PageCTA from '@/components/shared/PageCTA'

export const metadata = generatePageMetadata({
  title: 'Mission',
  description:
    'To decentralize Bitcoin mining by building, funding and stewarding open-source alternatives to every closed layer of the mining stack.',
  path: '/mission',
  ogImage: '/og/og-mission.png',
})

const principles = [
  {
    lead: 'Money from anyone, influence from no one.',
    body: 'We take money from anyone; it has no impact on how we run the organization. No special treatment for any funder.',
  },
  {
    lead: 'No obligation to capture value.',
    body: 'Our non-profit structure removes the incentive to capture value, which is why we can be the neutral home for the ecosystem’s shared dependencies, and never compete with the builders and companies that contribute.',
  },
  {
    lead: 'We started the projects, we don’t own them, and we don’t sell them.',
    body: 'Every core project and grant we fund is released under a recognized open-source licence, no exceptions.',
  },
]

const narrative = [
  {
    lead: 'Bitcoin mining does three jobs.',
    body: 'It issues new coins, settles transactions, and secures the record. All three matter to everyone who holds bitcoin.',
  },
  {
    lead: 'Today, that machinery is closed.',
    body: 'One company controls most of the hardware and software. Closed means unauditable, unfixable, and permissioned.',
  },
  {
    lead: 'To open it, you need the recipes.',
    body: 'A miner is four unique building blocks: a hashboard, a control board, firmware, and a pool. The knowledge to build each was locked away.',
  },
  {
    lead: 'So we wrote them down.',
    body: 'We reverse-engineered every layer, published the designs as open source, and fund the work to commoditize them, so anyone can build, audit, and compete.',
  },
]

export default function MissionPage() {
  return (
    <>
      {/* Hero, full-bleed image with overlaid mission statement (matches Our Work / Grants) */}
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-[#1f1f1f]">
        <Image
          src="/mission-hero.webp"
          alt="Panel discussion on keeping Bitcoin mining decentralized"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <HeroScrim />

        <SectionWrapper className="relative z-10 flex min-h-[560px] lg:min-h-[640px] items-center">
          <div className="max-w-4xl">
            <Eyebrow onDark className="mb-4">Our Mission</Eyebrow>
            <h1 className="font-display font-bold text-white text-2xl sm:text-3xl lg:text-4xl leading-tight uppercase">
              To <span className="text-[#c084d8]">decentralize</span> Bitcoin mining by building,
              funding and stewarding <span className="text-[#c084d8]">open-source</span> alternatives
              to every closed layer of the <span className="text-[#c084d8]">mining stack</span>, so
              that the technology Bitcoin depends on cannot be owned, switched off, or permissioned
              by anyone
            </h1>
          </div>
        </SectionWrapper>
      </section>

      {/* Narrative, numbered story beats that lead into the Vision */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="max-w-3xl space-y-10">
          {narrative.map((point, i) => (
            <div key={point.lead} className="flex gap-5 sm:gap-8">
              <span
                aria-hidden="true"
                className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-2xl sm:text-3xl leading-none pt-1 tabular-nums"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
                <span className="font-bold text-gray-900 dark:text-white">{point.lead}</span>{' '}
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Vision, two large statements */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="max-w-4xl">
          <Eyebrow className="mb-6">Our Vision</Eyebrow>
          <div className="space-y-8 font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl lg:text-4xl leading-tight uppercase">
            <p>
              A mature mining industry: multi-vendor, accessible reference designs, auditable and
              modifiable open software - as building blocks for the whole stack.
            </p>
            <p>
              Issuance, settlement, and record security are truly decentralized and permissionless.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Principles, subtle filler */}
      <SectionWrapper tight className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="max-w-3xl">
          <Eyebrow className="mb-4">Principles</Eyebrow>
          <div className="space-y-5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {principles.map((p) => (
              <p key={p.lead}>
                <span className="font-bold text-gray-900 dark:text-white">{p.lead}</span> {p.body}
              </p>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Founders */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <Eyebrow className="mb-4">Founders</Eyebrow>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {founders.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </SectionWrapper>

      {/* Board */}
      <SectionWrapper>
        <Eyebrow className="mb-4">Board</Eyebrow>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {board.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </SectionWrapper>

      <PageCTA
        kicker="Support the Mission"
        title="Help us keep every layer open."
        body={
          <>
            We take money from anyone and influence from no one.
            <br />
            Fund the work, or reach out and get involved.
          </>
        }
        donateLabel="Donate →"
      />
    </>
  )
}
