import { generatePageMetadata } from '@/lib/metadata'
import { pillarProjects } from '@/data/projects'
import { grantLog } from '@/data/grants'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import PCBBackground from '@/components/ui/PCBBackground'
import PillarProjectCard from '@/components/projects/PillarProjectCard'
import EcosystemCard from '@/components/projects/EcosystemCard'
import GrantLogTable from '@/components/projects/GrantLogTable'

export const metadata = generatePageMetadata({
  title: 'Projects',
  description: 'The 256 Foundation funds four pillar open-source projects building the full Bitcoin mining stack: Ember One, Mujina, Libre Board, and Hydrapool.',
  path: '/projects',
})

const ecosystemProjects = [
  {
    name: 'osmu.wiki',
    description: 'The open-source mining wiki — community-maintained documentation hub for open-source Bitcoin mining hardware and software.',
    url: 'https://osmu.wiki',
    tags: ['documentation', 'community', 'wiki'],
  },
  {
    name: 'Heatpunks',
    description: 'Bitcoin miner heat recapture — turning mining heat into home heating. Practical guides, builds, and community for hashrate heaters.',
    url: 'https://heatpunks.org',
    tags: ['heat recapture', 'DIY', 'hardware'],
  },
  {
    name: 'Bitaxe',
    description: 'Open-source Bitcoin miner by Skot. The Bitaxe project proved that open mining hardware is viable — a direct inspiration for the 256 Foundation.',
    url: 'https://github.com/skot/bitaxe',
    tags: ['open hardware', 'ASIC', 'ESP32'],
  },
  {
    name: 'Public Pool',
    description: 'Fully open-source solo Bitcoin mining pool — no registration, no fees, just you and the network.',
    url: 'https://web.public-pool.io',
    tags: ['mining pool', 'open-source', 'solo'],
  },
]

export default function ProjectsPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative bg-white dark:bg-[#1a1a1a] py-20 border-b border-gray-200 dark:border-[#1f1f1f] overflow-hidden">
        <PCBBackground opacity={0.06} animated />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)' }} />
        <SectionWrapper className="relative z-10 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white uppercase mb-4">
            Open-Source <span className="text-[#3b1445] dark:text-[#c084d8]">Projects</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            The 256 Foundation funds four pillar projects building a complete, open-source Bitcoin mining stack — from silicon to pool software.
          </p>
        </SectionWrapper>
      </section>

      {/* Pillar projects */}
      <SectionWrapper>
        <SectionHeader
          title="Pillar Projects"
          subtitle="Core funded projects building the open Bitcoin mining stack"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillarProjects.map(project => (
            <PillarProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </SectionWrapper>

      {/* Ecosystem */}
      <section className="bg-gray-50 dark:bg-[#242424] py-16 border-y border-gray-200 dark:border-[#1f1f1f]">
        <SectionWrapper>
          <SectionHeader
            title="Ecosystem"
            subtitle="Related open-source projects and community resources we support and recommend"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ecosystemProjects.map(p => (
              <EcosystemCard key={p.name} {...p} />
            ))}
          </div>
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
    </main>
  )
}
