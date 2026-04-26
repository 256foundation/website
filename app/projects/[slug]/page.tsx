import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { pillarProjects } from '@/data/projects'
import { generatePageMetadata } from '@/lib/metadata'
import { fetchProjectForumTopics } from '@/lib/discourse'
import { fetchRepoMeta, fetchRecentCommits } from '@/lib/github'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge from '@/components/ui/Badge'
import ExternalLink from '@/components/ui/ExternalLink'
import PCBBackground from '@/components/ui/PCBBackground'
import ProjectTeamSection from '@/components/projects/ProjectTeamSection'
import ProjectForumSection from '@/components/projects/ProjectForumSection'
import GitHubActivitySection from '@/components/projects/GitHubActivitySection'

export const revalidate = 3600

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
  })
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = pillarProjects.find(p => p.slug === slug)
  if (!project) notFound()

  const [forumTopics, repoMeta, recentCommits] = await Promise.all([
    fetchProjectForumTopics(project.forumCategoryApiUrl, 4),
    fetchRepoMeta(project.githubUrl),
    fetchRecentCommits(project.githubUrl, 6),
  ])

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-white dark:bg-[#1a1a1a] py-12 border-b border-gray-200 dark:border-[#1f1f1f] overflow-hidden">
        <PCBBackground opacity={0.06} animated />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)' }} />
        <SectionWrapper className="relative z-10">
          <div className={project.logo?.character || project.logo?.icon ? 'flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16' : ''}>
            {/* Text content */}
            <div className="flex-1 min-w-0">
              <div className="mb-4">
                <Badge status={project.status} />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white uppercase mb-3">
                {project.name}
              </h1>
              <p className="text-[#3b1445] dark:text-[#c084d8] font-mono text-lg mb-4">{project.tagline}</p>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mb-8">{project.description}</p>
              <div className="flex flex-wrap gap-3">
                <ExternalLink
                  href={project.githubUrl}
                  className="inline-flex items-center gap-2 border border-[#3b1445]/50 dark:border-[#5c2070]/50 text-[#3b1445] dark:text-[#c084d8] font-mono px-5 py-2.5 rounded-none hover:border-[#3b1445] dark:hover:border-[#5c2070] hover:bg-[#3b1445]/5 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </ExternalLink>
                <a
                  href={project.forumCategory}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-gray-200 dark:border-[#1f1f1f] text-gray-600 dark:text-gray-300 font-mono px-5 py-2.5 rounded-none hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors"
                >
                  Forum
                </a>
              </div>
            </div>

            {/* Character / icon logo — floats right on desktop */}
            {project.logo?.character && (
              <div className="flex-shrink-0 flex justify-center lg:justify-end">
                <Image
                  src={project.logo.character}
                  alt={`${project.name} mascot`}
                  width={1024}
                  height={1536}
                  className="h-64 lg:h-80 w-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            )}
            {!project.logo?.character && project.logo?.icon && (
              <div className="flex-shrink-0 flex justify-center lg:justify-end">
                <Image
                  src={project.logo.icon}
                  alt={`${project.name} logo`}
                  width={1600}
                  height={1600}
                  className="h-48 lg:h-64 w-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            )}
          </div>
        </SectionWrapper>

        {/* Banner strip — shown below hero text when a wide banner image exists */}
        {project.logo?.banner && (
          <div className="mt-14 border-t border-gray-200 dark:border-[#1f1f1f]">
            <Image
              src={project.logo.banner}
              alt={`${project.name} banner`}
              width={4000}
              height={2000}
              className="w-full max-h-56 object-cover object-center"
              priority
            />
          </div>
        )}
      </section>

      {/* Why core grant */}
      <SectionWrapper>
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white uppercase mb-4">
            Why This Is a Core <span className="text-[#3b1445] dark:text-[#c084d8]">Grant</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.whyCoreGrant}</p>
        </div>
      </SectionWrapper>

      {/* Why necessary */}
      <section className="bg-gray-50 dark:bg-[#242424] border-y border-gray-200 dark:border-[#1f1f1f]">
        <SectionWrapper>
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white uppercase mb-4">
              Why It&apos;s <span className="text-[#00FF41]">Necessary</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.whyNecessary}</p>
          </div>
        </SectionWrapper>
      </section>

      {/* Technical details */}
      <SectionWrapper>
        <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white uppercase mb-4">
          Technical <span className="text-[#00FF41]">Details</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mb-10">{project.technicalDetails}</p>

        {/* Key specs grid */}
        {project.keySpecs && project.keySpecs.length > 0 && (
          <div className="mb-10">
            <p className="font-mono text-gray-400 dark:text-gray-600 text-[11px] tracking-widest uppercase mb-4">
              Key Specifications
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.keySpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] p-4 hover:border-[#3b1445]/40 dark:hover:border-[#5c2070]/40 transition-colors"
                >
                  <div className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-base leading-tight mb-1.5">
                    {spec.value}
                  </div>
                  <div className="font-mono text-gray-400 dark:text-gray-600 text-[10px] uppercase tracking-widest">
                    {spec.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech feature columns */}
        {project.techFeatures && project.techFeatures.length > 0 && (
          <div>
            <p className="font-mono text-gray-400 dark:text-gray-600 text-[11px] tracking-widest uppercase mb-4">
              Features &amp; Compatibility
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.techFeatures.map((group) => (
                <div key={group.category} className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] p-5">
                  <h3 className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs uppercase tracking-widest mb-3 pb-2 border-b border-gray-200 dark:border-[#1f1f1f]">
                    {group.category}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-[#00FF41] mt-0.5 shrink-0 text-xs">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>

      {/* Community Discussions */}
      <ProjectForumSection topics={forumTopics} categoryUrl={project.forumCategory} />

      {/* GitHub Activity */}
      <GitHubActivitySection commits={recentCommits} meta={repoMeta} githubUrl={project.githubUrl} />

      {/* Team */}
      <SectionWrapper>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white uppercase">
            Project <span className="text-[#3b1445] dark:text-[#c084d8]">Team</span>
          </h2>
          <a
            href="https://forum.256foundation.org/upcoming-events/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Check the events calendar for developer office hours →
          </a>
        </div>
        <ProjectTeamSection team={project.team} />
      </SectionWrapper>
    </main>
  )
}
