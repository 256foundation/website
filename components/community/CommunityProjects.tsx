import Link from 'next/link'
import type { CommunityProject } from '@/types'
import { communityDirectedProjects, ecosystemProjects } from '@/data/community'

function ProjectCard({ project }: { project: CommunityProject }) {
  const logo =
    project.logoDark && project.logoLight ? (
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet={project.logoDark} />
        <img
          src={project.logoLight}
          alt={project.name}
          className="h-12 w-auto object-contain"
        />
      </picture>
    ) : project.logo ? (
      <img src={project.logo} alt={project.name} className="h-12 w-auto object-contain" />
    ) : null

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] p-6 hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 transition-colors"
    >
      <div className="h-12 mb-4 flex items-center">{logo}</div>
      <h3 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase leading-tight group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors">
        {project.name}
      </h3>
      <p className="text-[#3b1445] dark:text-[#c084d8] text-xs leading-relaxed mt-1.5">
        {project.description}
      </p>
      <div className="flex-1 space-y-3 mt-3">
        {project.detail?.map((para) => (
          <p key={para} className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
            {para}
          </p>
        ))}
      </div>
      <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        Visit →
      </span>
    </a>
  )
}

export default function CommunityProjects() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 bg-[#3b1445] dark:bg-[#c084d8]" />
        <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">
          Community Projects
        </span>
      </div>
      <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-3">
        Built together
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl mb-10">
        Industries have niches. This one has sub-communities: groups of builders who gather around
        one specific piece of the mining world. We don&apos;t run them and we don&apos;t direct them.
        We give them a platform: infrastructure to host, a nonprofit home, and a dedicated fund for
        donations.
      </p>

      {/* Community-directed */}
      <div className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-4">
        Community-directed, with funds of their own
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
        {communityDirectedProjects.map((project) => (
          <ProjectCard key={project.abbr} project={project} />
        ))}
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-12">
        The OSMU Fund and Hashrate Heatpunks Fund are community-directed, with the board approving
        every allocation.{' '}
        <Link
          href="/our-work"
          className="text-[#3b1445] dark:text-[#c084d8] hover:underline"
        >
          More on our work →
        </Link>
      </p>

      {/* Ecosystem projects we serve */}
      <div className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-4">
        Ecosystem projects we serve
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ecosystemProjects.map((project) => (
          <ProjectCard key={project.abbr} project={project} />
        ))}
      </div>
    </div>
  )
}
