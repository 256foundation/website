import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { pillarProjects } from '@/data/projects'
import { generatePageMetadata } from '@/lib/metadata'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge from '@/components/ui/Badge'
import ExternalLink from '@/components/ui/ExternalLink'
import PCBBackground from '@/components/ui/PCBBackground'
import MilestoneTracker from '@/components/projects/MilestoneTracker'
import ProjectTeamSection from '@/components/projects/ProjectTeamSection'

export async function generateStaticParams() {
  return pillarProjects.map(p => ({ slug: p.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = pillarProjects.find(p => p.slug === slug)
  if (!project) return {}
  return generatePageMetadata({
    title: project.name,
    description: project.tagline,
    path: `/projects/${project.slug}`,
    ogImage: project.ogImage,
  })
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = pillarProjects.find(p => p.slug === slug)
  if (!project) notFound()

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative bg-[#0a0a0a] py-20 border-b border-[#1f1f1f] overflow-hidden">
        <PCBBackground opacity={0.06} animated />
        <SectionWrapper className="relative z-10">
          <div className="mb-4">
            <Badge status={project.status} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white uppercase mb-3">
            {project.name}
          </h1>
          <p className="text-[#7C3AED] font-mono text-lg mb-4">{project.tagline}</p>
          <p className="text-gray-400 text-lg max-w-2xl mb-8">{project.description}</p>
          <div className="flex flex-wrap gap-3">
            <ExternalLink
              href={project.externalUrl}
              className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] font-mono font-bold px-5 py-2.5 rounded-none hover:bg-gray-100 transition-colors"
            >
              Visit {project.name}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </ExternalLink>
            <ExternalLink
              href={project.githubUrl}
              className="inline-flex items-center gap-2 border border-[#7C3AED]/40 text-[#7C3AED] font-mono px-5 py-2.5 rounded-none hover:border-[#7C3AED] hover:bg-[#7C3AED]/5 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </ExternalLink>
            <ExternalLink
              href={project.forumCategory}
              className="inline-flex items-center gap-2 border border-[#1f1f1f] text-gray-300 font-mono px-5 py-2.5 rounded-none hover:border-[#7C3AED]/40 hover:text-[#7C3AED] transition-colors"
            >
              Forum
            </ExternalLink>
          </div>
        </SectionWrapper>
      </section>

      {/* Why core grant */}
      <SectionWrapper>
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white uppercase mb-4">
            Why This Is a Core <span className="text-[#7C3AED]">Grant</span>
          </h2>
          <p className="text-gray-300 leading-relaxed">{project.whyCoreGrant}</p>
        </div>
      </SectionWrapper>

      {/* Why necessary */}
      <section className="bg-[#111111] border-y border-[#1f1f1f]">
        <SectionWrapper>
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-white uppercase mb-4">
              Why It&apos;s <span className="text-[#00FF41]">Necessary</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">{project.whyNecessary}</p>
          </div>
        </SectionWrapper>
      </section>

      {/* Technical details */}
      <SectionWrapper>
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white uppercase mb-4">
            Technical <span className="text-[#00FF41]">Details</span>
          </h2>
          <p className="text-gray-300 leading-relaxed">{project.technicalDetails}</p>
        </div>
      </SectionWrapper>

      {/* Milestones */}
      <section className="bg-[#111111] border-y border-[#1f1f1f]">
        <SectionWrapper>
          <h2 className="font-display text-2xl font-bold text-white uppercase mb-8">
            <span className="text-[#7C3AED]">Milestones</span>
          </h2>
          <div className="max-w-4xl overflow-x-auto">
            <MilestoneTracker milestones={project.milestones} />
          </div>
        </SectionWrapper>
      </section>

      {/* Team */}
      <SectionWrapper>
        <h2 className="font-display text-2xl font-bold text-white uppercase mb-8">
          Project <span className="text-[#7C3AED]">Team</span>
        </h2>
        <ProjectTeamSection team={project.team} />
      </SectionWrapper>
    </main>
  )
}
