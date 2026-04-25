import { generatePageMetadata } from '@/lib/metadata'
import { pillarProjects } from '@/data/projects'
import { grantLog } from '@/data/grants'
import { fetchRepoMeta, fetchOrgRepos } from '@/lib/github'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import PCBBackground from '@/components/ui/PCBBackground'
import PillarProjectCard from '@/components/projects/PillarProjectCard'
import EcosystemCard from '@/components/projects/EcosystemCard'
import GrantLogTable from '@/components/projects/GrantLogTable'
import OrgReposSection from '@/components/projects/OrgReposSection'

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
  const [repoMetas, orgRepos] = await Promise.all([
    Promise.all(pillarProjects.map(p => fetchRepoMeta(p.githubUrl))),
    fetchOrgRepos('256foundation'),
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

      {/* All org repos — live from GitHub API */}
      <OrgReposSection repos={orgRepos} />
    </main>
  )
}
