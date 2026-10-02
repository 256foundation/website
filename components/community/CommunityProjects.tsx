import type { CommunityProject } from '@/types'
import Image from 'next/image'
import { communityDirectedProjects, ecosystemProjects } from '@/data/community'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import TextLink from '@/components/ui/TextLink'

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
      <Image
        src={project.logo}
        alt={project.name}
        fill
        sizes="200px"
        className="object-contain object-left"
      />
    ) : null

  return (
    <div className="group flex flex-col bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#1f1f1f] p-6 hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 transition-colors">
      <div className="relative h-12 mb-4 flex items-center">{logo}</div>
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
      <div className="flex items-center gap-4 mt-4">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs hover:underline"
        >
          Visit →
        </a>
        {project.donateHref && (
          <Button variant="outlined" size="sm" href={project.donateHref} external>
            Donate →
          </Button>
        )}
      </div>
    </div>
  )
}

export default function CommunityProjects() {
  return (
    <div>
      <Eyebrow className="mb-4">Community Projects</Eyebrow>
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
      <Eyebrow className="mb-4">Community-directed, with funds of their own</Eyebrow>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
        {communityDirectedProjects.map((project) => (
          <ProjectCard key={project.abbr} project={project} />
        ))}
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-12">
        We host their infrastructure and steward both the OSMU and Hashrate Heatpunks funds: the
        community directs the work, the board approves every allocation, and donations go to the
        community&apos;s own priorities.{' '}
        <TextLink href="/our-work" arrow>
          More on our work
        </TextLink>
      </p>

      {/* Ecosystem projects we serve */}
      <Eyebrow className="mb-4">Ecosystem projects we serve</Eyebrow>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ecosystemProjects.map((project) => (
          <ProjectCard key={project.abbr} project={project} />
        ))}
      </div>
    </div>
  )
}
