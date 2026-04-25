import { generatePageMetadata } from '@/lib/metadata'
import { pillarProjects } from '@/data/projects'
import { grantLog } from '@/data/grants'
import { fetchRepoMeta, fetchOrgStats } from '@/lib/github'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import PCBBackground from '@/components/ui/PCBBackground'
import PillarProjectCard from '@/components/projects/PillarProjectCard'
import EcosystemCard from '@/components/projects/EcosystemCard'
import GrantLogTable from '@/components/projects/GrantLogTable'

export const revalidate = 3600

export const metadata = generatePageMetadata({
  title: 'Projects',
  description: 'The 256 Foundation funds four pillar open-source projects building the full Bitcoin mining stack: Ember One, Mujina, Libre Board, and Hydrapool.',
  path: '/projects',
})

const ecosystemProjects = [
  {
    name: 'Bitaxe',
    description: 'The world\'s first fully open-source Bitcoin ASIC miner — open hardware, open firmware, open everything. Anyone can build one, modify it, or manufacture it. The direct inspiration for the 256 Foundation.',
    url: 'https://bitaxe.org',
    tags: ['open hardware', 'ASIC', 'firmware'],
  },
  {
    name: 'Open Source Miners United',
    description: 'A global community of developers and builders creating open-source Bitcoin mining hardware and software — including Bitaxe, NerdAxe, AxeOS, Piaxe, and more. Fully open designs that anyone can build, change, and improve.',
    url: 'https://osmu.wiki',
    tags: ['community', 'hardware', 'firmware'],
  },
  {
    name: 'Hashrate Heatpunks',
    description: 'Marrying the Bitcoin mining and heating sectors to accelerate adoption of hashrate heating — building the standards, education, and infrastructure to bring mining back to homes and businesses.',
    url: 'https://heatpunks.org',
    tags: ['heat reuse', 'home mining', 'energy'],
  },
  {
    name: 'Jua Kali',
    description: 'An open-source project that runs Bitcoin ASIC hashboards directly from DC power sources like solar panels and batteries — no AC grid required. Unlocking stranded energy for Bitcoin mining worldwide.',
    url: 'https://github.com/GridlessCompute/Jua-Kali-Miner',
    tags: ['solar', 'off-grid', 'DC power'],
  },
  {
    name: 'ASIC-rs',
    description: 'An open-source Rust library for communicating with Bitcoin mining ASICs. It standardizes the low-level protocol interface so firmware developers can build miner software without reverse-engineering proprietary hardware layers.',
    url: 'https://docs.rs/asic-rs/latest/asic_rs/index.html',
    tags: ['Rust', 'library', 'firmware'],
  },
  {
    name: 'HashScope',
    description: 'An open-source Bitcoin mining analysis platform that sits transparently between miners and pools, capturing every Stratum v1 message in real time — providing a complete picture of how mining pools actually behave.',
    url: 'https://github.com/256foundation/HashScope',
    tags: ['analysis', 'Stratum v1', 'pool testing'],
  },
]

export default async function ProjectsPage() {
  const [repoMetas, orgStats] = await Promise.all([
    Promise.all(pillarProjects.map(p => fetchRepoMeta(p.githubUrl))),
    fetchOrgStats('256foundation'),
  ])

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-white dark:bg-[#1a1a1a] py-12 border-b border-gray-200 dark:border-[#1f1f1f] overflow-hidden">
        <PCBBackground opacity={0.06} animated />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)' }} />
        <SectionWrapper className="relative z-10 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white uppercase mb-4">
            Open-Source <span className="text-[#3b1445] dark:text-[#c084d8]">Projects</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            The 256 Foundation defines and funds four core pillar projects building a complete, open-source Bitcoin mining stack. We may also fund additional open grants as the ecosystem grows. This page is a log of all funded projects.
          </p>
        </SectionWrapper>
      </section>

      {/* Grant log */}
      <SectionWrapper id="log">
        <SectionHeader
          title="Grant Log"
          subtitle="A public record of all grants funded by the 256 Foundation"
        />
        <div className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-6">
          <GrantLogTable grants={grantLog} />
        </div>
        <p className="mt-4 text-sm text-gray-500 font-mono">
          All grants are denominated and disbursed in Bitcoin.{' '}
          <a href="/grants" className="text-[#3b1445] dark:text-[#c084d8] hover:underline">Apply for a grant &rarr;</a>
        </p>
      </SectionWrapper>

      {/* Pillar projects */}
      <SectionWrapper>
        <SectionHeader
          title="Pillar Projects"
          subtitle="Core funded projects building the open Bitcoin mining stack"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillarProjects.map((project, i) => (
            <PillarProjectCard key={project.slug} project={project} repoMeta={repoMetas[i]} />
          ))}
        </div>
      </SectionWrapper>

      {/* Ecosystem */}
      <section className="bg-gray-50 dark:bg-[#242424] py-16 border-y border-gray-200 dark:border-[#1f1f1f]">
        <SectionWrapper>
          <SectionHeader
            title="Ecosystem"
            subtitle="The 256 Foundation is the parent organization for the following open-source projects and communities. They operate independently but are part of the foundation's broader mission to decentralize Bitcoin mining."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ecosystemProjects.map(p => (
              <EcosystemCard key={p.name} {...p} />
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* GitHub org CTA */}
      <section className="bg-white dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-[#1f1f1f] py-16">
        <SectionWrapper>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="max-w-2xl">
              <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-3">256Foundation on GitHub</p>
              <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-4">More Than What&apos;s Funded</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Development in the 256 Foundation ecosystem doesn&apos;t stop at core pillar projects and ecosystem partners.
                Just because a project isn&apos;t actively funded doesn&apos;t mean development has stopped.
                Browse our full organization on GitHub — some are pillar projects, some are ecosystem tools,
                and others are community contributions and experiments pushing the open mining stack forward.
              </p>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-6 shrink-0">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="font-display font-bold text-gray-900 dark:text-white text-3xl">{orgStats.repoCount}</div>
                  <div className="font-mono text-gray-500 dark:text-gray-500 text-xs uppercase tracking-widest mt-1">Repos</div>
                </div>
                <div>
                  <div className="font-display font-bold text-gray-900 dark:text-white text-3xl">{orgStats.totalStars}</div>
                  <div className="font-mono text-gray-500 dark:text-gray-500 text-xs uppercase tracking-widest mt-1">Stars</div>
                </div>
                <div>
                  <div className="font-display font-bold text-gray-900 dark:text-white text-3xl">{orgStats.followers}</div>
                  <div className="font-mono text-gray-500 dark:text-gray-500 text-xs uppercase tracking-widest mt-1">Followers</div>
                </div>
              </div>
              <a
                href="https://github.com/256foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm px-6 py-3 border border-[#3b1445] dark:border-[#5c2070] text-[#3b1445] dark:text-[#c084d8] hover:bg-[#3b1445] hover:text-white dark:hover:bg-[#5c2070] dark:hover:text-white transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                View All Repositories →
              </a>
            </div>
          </div>
        </SectionWrapper>
      </section>
    </main>
  )
}
