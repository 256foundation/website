import Image from 'next/image'
import type { PillarProject } from '@/types'
import type { GitHubRepoMeta } from '@/lib/github'
import type { ForumTopic } from '@/lib/discourse'
import { projectTitleFontClasses } from '@/lib/projectTitle'
import ActivityBadges from './ActivityBadges'

interface Props {
  project: PillarProject
  index: number
  layerLabel: string
  repoMeta: GitHubRepoMeta | null
  forumTopic: ForumTopic | null
  /** Alternate section background for visual rhythm. */
  alt?: boolean
}

const linkClass =
  'inline-flex items-center gap-2 font-mono text-xs px-4 py-2.5 border transition-colors'

export default function StackLayerSection({ project, index, layerLabel, repoMeta, forumTopic, alt }: Props) {
  const logoSrc = project.logo?.character ?? project.logo?.icon

  return (
    <section
      id={project.slug}
      style={{ scrollMarginTop: 'calc(150px + var(--ext-offset))' }}
      className={[
        'border-b border-gray-200 dark:border-[#1f1f1f]',
        alt ? 'bg-gray-50 dark:bg-[#1a1a1a]' : 'bg-white dark:bg-[#1a1a1a]',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        {/* Layer kicker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">
            Layer {String(index).padStart(2, '0')} / {layerLabel}
          </span>
          <span className="h-px flex-1 bg-gray-200 dark:bg-[#1f1f1f]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Narrative */}
          <div className="lg:col-span-7 min-w-0">
            <div className="flex items-center gap-4 mb-4">
              {logoSrc && (
                <Image
                  src={logoSrc}
                  alt=""
                  width={project.logo?.character ? 1024 : 1600}
                  height={project.logo?.character ? 1536 : 1600}
                  className={project.logo?.character ? 'h-20 w-auto object-contain' : 'h-12 w-auto object-contain'}
                />
              )}
              <div>
                <h2 className={`${projectTitleFontClasses(project)} text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-none`}>
                  {project.name}
                </h2>
                <p className="text-[#3b1445]/70 dark:text-[#c084d8]/70 font-mono text-xs mt-2">{project.tagline}</p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{project.description}</p>

            <div className="space-y-5 mb-8">
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                <span className="font-mono text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-600 block mb-1.5">
                  The closed problem
                </span>
                {project.whyNecessary}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#3b1445] dark:text-[#c084d8] block mb-1.5">
                  The open answer
                </span>
                {project.whatItDoes}
              </p>
            </div>

            {/* Architect */}
            <p className="font-mono text-xs text-gray-500 dark:text-gray-400 mb-8">
              <span className="text-gray-400 dark:text-gray-600">Funded by 256 · Core Architect &amp; Lead Maintainer — </span>
              <span className="text-gray-900 dark:text-white">{project.architect.name}</span>{' '}
              <a
                href={project.architect.x}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3b1445] dark:text-[#c084d8] hover:underline"
              >
                {project.architect.handle}
              </a>
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} border-[#3b1445] dark:border-[#5c2070] bg-[#3b1445] text-white hover:bg-[#2d0f36] dark:hover:bg-[#5c2070]`}
              >
                {project.name} site →
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} border-gray-200 dark:border-[#1f1f1f] text-gray-600 dark:text-gray-300 hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:text-[#3b1445] dark:hover:text-[#c084d8]`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href={project.forumCategory}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} border-gray-200 dark:border-[#1f1f1f] text-gray-600 dark:text-gray-300 hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:text-[#3b1445] dark:hover:text-[#c084d8]`}
              >
                Forum
              </a>
            </div>

            <div className="mt-5">
              <ActivityBadges
                repoMeta={repoMeta}
                forumTopic={forumTopic}
                githubUrl={project.githubUrl}
                forumUrl={project.forumCategory}
              />
            </div>
          </div>

          {/* Specs + features */}
          <div className="lg:col-span-5">
            <p className="font-mono text-gray-400 dark:text-gray-600 text-[11px] tracking-widest uppercase mb-3">
              Key Specifications
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {project.keySpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#1f1f1f] p-4"
                >
                  <div className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-sm leading-tight mb-1.5">
                    {spec.value}
                  </div>
                  <div className="font-mono text-gray-400 dark:text-gray-600 text-[10px] uppercase tracking-widest">
                    {spec.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="font-mono text-gray-400 dark:text-gray-600 text-[11px] tracking-widest uppercase mb-3">
              Key Features
            </p>
            <ul className="space-y-2">
              {project.keyFeatures.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-[#3b1445] dark:text-[#c084d8] mt-0.5 shrink-0 text-xs">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
