import { generatePageMetadata } from '@/lib/metadata'
import { founders, board } from '@/data/team'
import SectionWrapper from '@/components/ui/SectionWrapper'
import TeamMemberCard from '@/components/shared/TeamMemberCard'
import DecorativeBg from '@/components/ui/DecorativeBg'

export const metadata = generatePageMetadata({
  title: 'Mission',
  description:
    'The 256 Foundation exists to build the open-source Bitcoin mining ecosystem — funding developers who are dismantling the proprietary mining empire.',
  path: '/mission',
})

const values = [
  {
    icon: '🔓',
    title: 'Free and Open Development',
    description:
      'Every project funded by this foundation is made available under a recognized open-source license. No closed-source, no proprietary forks, no exceptions.',
  },
  {
    icon: '💯',
    title: '100% Passthrough',
    description:
      'Every dollar donated goes directly to the developers and projects we fund. We take no percentage for overhead or administration.',
  },
  {
    icon: '⚡',
    title: 'Permissionless Innovation',
    description:
      'Bitcoin is permissionless money. The infrastructure that secures it should be permissionless too. Anyone should be able to build on our open stack.',
  },
  {
    icon: '🌐',
    title: 'Community-First Governance',
    description:
      'Decisions are made with the long-term health of the Bitcoin network and the open-source mining community in mind — not the interests of any single company or actor.',
  },
]

export default function MissionPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper decorative className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <DecorativeBg glowPosition="50% 0%" gridOpacity={0.07} vignette={false} />
        <div className="max-w-3xl relative z-10">
          <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-4">
            Our Mission
          </p>
          <h1 className="font-display font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase mb-6">
            Build the Open-Source Bitcoin Mining Ecosystem
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
            The 256 Foundation raises money to fund developers building open-source Bitcoin mining
            hardware and software solutions — dismantling the proprietary mining empire that has
            centralized Bitcoin mining around closed-source hardware and software.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6">
            All Bitcoin miners, large and small, have been negatively affected by one large
            antagonistic hardware company who has blocked innovation, denied collaboration, and
            taken majority control over the hardware and software that keeps Bitcoin running.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            An open protocol should be accessible to anyone at all layers. The open-source
            Bitcoin mining stack we are building achieves this. We believe in free and open
            development and we pledge that every project from this foundation will always be made
            available through free and open-source contributions.
          </p>
        </div>
      </SectionWrapper>

      {/* Vision */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="max-w-3xl">
          <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-4">
            Our Vision
          </p>
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

      {/* Values */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-4">
          Our Values
        </p>
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-8">
          Principles We Build On
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-6 hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 transition-colors"
            >
              <div className="text-2xl mb-3">{v.icon}</div>
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase mb-2">{v.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Founders */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-4">
          Founders
        </p>
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-8">
          Who Started This
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {founders.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </SectionWrapper>

      {/* Board */}
      <SectionWrapper>
        <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-4">
          Board
        </p>
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-8">
          Board of Directors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {board.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
