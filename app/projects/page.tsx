import Image from 'next/image'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { pillarProjects } from '@/data/projects'
import { fetchRepoMeta } from '@/lib/github'
import { fetchProjectForumTopics } from '@/lib/discourse'
import SectionWrapper from '@/components/ui/SectionWrapper'
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

/** One-line computing analogy per layer, used in the overview index. */
const layerTransitions: Record<string, string> = {
  'ember-one': 'Where hashrate is produced — the GPU of a miner.',
  'libre-board': 'The motherboard. Schedules power, cooling, and network.',
  mujina: 'The operating system. What actually runs the machine.',
  hydrapool: 'The network. Where work becomes blocks and payouts.',
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
      {/* Hero — full-bleed image with overlaid copy */}
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-[#1f1f1f]">
        <Image
          src="/projects/open-mining-stack.webp"
          alt="An open-source Bitcoin mining stack assembled and running"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Contrast overlays so the copy stays legible over the photo */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        <SectionWrapper className="relative z-10 flex min-h-[560px] lg:min-h-[640px] items-center">
          <div className="max-w-2xl">
            <p className="font-mono text-[#c084d8] text-xs tracking-[0.2em] uppercase mb-4">
              The 256 Foundation&rsquo;s Core Projects Program
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white uppercase mb-5">
              The Open <span className="text-[#c084d8]">Mining Stack</span>
            </h1>
            <p className="font-display text-xl sm:text-2xl font-semibold text-white uppercase leading-tight mb-5">
              Bitcoin mining will be open-source, or Bitcoin stays permissioned
            </p>
            <p className="text-gray-200 text-lg leading-relaxed">
              Mining began open — general-purpose CPUs, open operating systems, off-the-shelf
              chips. It matured into a closed stack a handful of vendors control. These are the
              four domain-specific building blocks a modern miner is made of, and the open
              replacement for each.
            </p>
          </div>
        </SectionWrapper>
      </section>

      {/* Overview index */}
      <section className="bg-gray-50 dark:bg-[#242424] border-b border-gray-200 dark:border-[#1f1f1f]">
        <SectionWrapper>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl mb-8">
            Every mature industry runs on commoditized, open inputs — recipes anyone can read, use,
            and improve. Bitcoin mining doesn&apos;t, yet. Four layers make a miner and run the
            network, and each one is undocumented, closed, or concentrated. Open one layer and close
            another and you have rebuilt the cage — so we open all four, and give the work away.
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
          <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase mb-4">
            Fund the Stack
          </p>
          <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-5">
            Together, a Permissionless <span className="text-[#3b1445] dark:text-[#c084d8]">Development Kit</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            An open hash board on an open control board running open firmware, mining to an open
            pool. Four independent projects that combine into one open-source mining development
            kit — free for anyone to study, fork, manufacture, and build a business on.
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
