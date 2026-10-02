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
})

const principles = [
  {
    lead: 'Money from anyone, influence from no one.',
    body: 'We take money from anyone; it has no impact on how we run the organization. No special treatment for any funder.',
  },
  {
    lead: 'No obligation to capture value.',
    body: 'Our non-profit structure removes the incentive to capture value — which is why we can be the neutral home for the ecosystem’s shared dependencies, and never compete with the builders and companies that contribute.',
  },
  {
    lead: 'We started the projects — we don’t own them, and we don’t sell them.',
    body: 'Every core project and grant we fund is released under a recognized open-source licence, no exceptions.',
  },
]

export default function MissionPage() {
  return (
    <>
      {/* Hero — full-bleed image with overlaid mission statement (matches Our Work / Grants) */}
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
              To decentralize Bitcoin mining by building, funding and stewarding open-source
              alternatives to every closed layer of the mining stack — so that the technology
              Bitcoin depends on cannot be owned, switched off, or permissioned by anyone.
            </h1>
          </div>
        </SectionWrapper>
      </section>

      {/* Narrative — story filler that leads into the Vision */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="max-w-3xl space-y-8 text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
          <p>
            All Bitcoin miners, large and small, have been negatively affected by one large
            antagonistic hardware company who has blocked innovation, denied collaboration, and
            taken majority control over the hardware and software that keeps Bitcoin running.
          </p>
          <p>
            An open protocol should be accessible to anyone at all layers. The open-source Bitcoin
            mining stack we are building achieves this. We believe in free and open development and
            we pledge that every project from this foundation will always be made available through
            free and open-source contributions.
          </p>
        </div>
      </SectionWrapper>

      {/* Vision */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="max-w-3xl">
          <Eyebrow className="mb-4">Our Vision</Eyebrow>
          <blockquote className="border-l-4 border-[#3b1445] pl-6 py-2">
            <p className="font-display text-gray-900 dark:text-white text-xl sm:text-2xl leading-relaxed uppercase">
              &ldquo;An open protocol should be accessible to anyone at all layers — the open-source
              Bitcoin mining stack we are building achieves this.&rdquo;
            </p>
          </blockquote>
          <div className="mt-8 space-y-4 text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            <p>
              We provide the educational resources, tools, and support to demystify Bitcoin and
              freedom technology — empowering individuals to engage with and benefit from this
              revolutionary system.
            </p>
            <p>
              We pledge that every project from this foundation will always be made available
              through free and open-source contributions, specifically by the{' '}
              <a
                href="https://opensource.org/osd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3b1445] dark:text-[#c084d8] hover:underline"
              >
                OSI definition
              </a>{' '}
              as it relates to software, or the{' '}
              <a
                href="https://www.oshwa.org/definition/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3b1445] dark:text-[#c084d8] hover:underline"
              >
                OSHWA definition
              </a>{' '}
              as it relates to hardware and other special-purpose applications.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Principles — subtle filler */}
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
        body="We take money from anyone and influence from no one. Fund the work, or reach out and get involved."
        donateLabel="Donate →"
      />
    </>
  )
}
