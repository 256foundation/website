import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { pillarProjects } from '@/data/projects'
import { fetchRepoMeta } from '@/lib/github'
import { fetchProjectForumTopics } from '@/lib/discourse'
import SectionWrapper from '@/components/ui/SectionWrapper'
import PCBBackground from '@/components/ui/PCBBackground'
import Button from '@/components/ui/Button'
import StackSubNav from '@/components/projects/StackSubNav'
import StackLayerSection from '@/components/projects/StackLayerSection'

export const revalidate = 3600

export const metadata = generatePageMetadata({
  title: 'Open Mining Stack',
  description:
    'The open-source Bitcoin mining stack: open hash board, control board, firmware, and pool software funded by the 256 Foundation.',
  path: '/projects',
})

const layerLabels: Record<string, string> = {
  'ember-one': 'Hash Board',
  'libre-board': 'Control Board',
  mujina: 'Firmware',
  hydrapool: 'Pool',
}

const layerTransitions: Record<string, string> = {
  'ember-one': 'The silicon. Where hashrate is actually produced.',
  'libre-board': 'The brain. What schedules, powers, and connects the hardware.',
  mujina: 'The software in control. What the machine actually runs.',
  hydrapool: 'The last mile. Where hashrate becomes blocks and payouts.',
}

export default async function OpenMiningStackPage() {
  const layers = pillarProjects.map((p, i) => ({
    slug: p.slug,
    label: layerLabels[p.slug] ?? p.name,
    index: i + 1,
  }))

  const activity = await Promise.all(
    pillarProjects.map(async (p) => {
      const [repoMeta, topics] = await Promise.all([
        fetchRepoMeta(p.githubUrl),
        fetchProjectForumTopics(p.forumCategoryApiUrl, 1),
      ])
      return { repoMeta, forumTopic: topics[0] ?? null }
    }),
  )

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-white dark:bg-[#1a1a1a] py-16 border-b border-gray-200 dark:border-[#1f1f1f] overflow-hidden">
        <PCBBackground opacity={0.06} animated />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,20,69,0.12) 0%, transparent 60%)' }}
        />
        <SectionWrapper className="relative z-10 max-w-3xl">
          <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase mb-4">
            Open Mining Stack
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white uppercase mb-5">
            The Open <span className="text-[#3b1445] dark:text-[#c084d8]">Mining Stack</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Bitcoin mining has four chokepoints: the hash board, the control board, the firmware, and
            the pool. A handful of companies control them all. The 256 Foundation funds the open
            alternative at every layer — built to work as one stack.
          </p>
        </SectionWrapper>
      </section>

      {/* Overview index */}
      <section className="bg-gray-50 dark:bg-[#242424] border-b border-gray-200 dark:border-[#1f1f1f]">
        <SectionWrapper>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl mb-8">
            Four layers, one stack, no black boxes. Each layer is designed to interoperate with the
            next; each is open source and independently maintained.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-[#1f1f1f]">
            {pillarProjects.map((p, i) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="group bg-white dark:bg-[#1a1a1a] p-5 hover:bg-gray-50 dark:hover:bg-[#242424] transition-colors"
              >
                <div className="font-mono text-[11px] tracking-widest uppercase text-gray-400 dark:text-gray-600 mb-2">
                  {String(i + 1).padStart(2, '0')} / {layerLabels[p.slug]}
                </div>
                <div className="font-display font-bold text-gray-900 dark:text-white uppercase group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors">
                  {p.name}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 leading-relaxed">
                  {layerTransitions[p.slug]}
                </p>
              </a>
            ))}
          </div>
        </SectionWrapper>
      </section>

      <StackSubNav layers={layers} />

      {/* Layers */}
      {pillarProjects.map((project, i) => (
        <StackLayerSection
          key={project.slug}
          project={project}
          index={i + 1}
          layerLabel={layerLabels[project.slug]}
          repoMeta={activity[i].repoMeta}
          forumTopic={activity[i].forumTopic}
          alt={i % 2 === 0}
        />
      ))}

      {/* Closing CTA */}
      <section className="bg-white dark:bg-[#1a1a1a]">
        <SectionWrapper className="max-w-3xl text-center">
          <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-4">
            Fund the <span className="text-[#3b1445] dark:text-[#c084d8]">Stack</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            These layers only win if they ship. Your donation pays maintainers, not middlemen.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="primary" size="lg" href="/donate">
              Donate →
            </Button>
            <Button variant="outlined" size="lg" href="https://github.com/256foundation" external>
              GitHub Org
            </Button>
            <Button variant="outlined" size="lg" href="https://forum.256foundation.org" external>
              Forum
            </Button>
          </div>
          <p className="mt-8">
            <Link href="/grants" className="font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors">
              Learn about our grants program →
            </Link>
          </p>
        </SectionWrapper>
      </section>
    </main>
  )
}
