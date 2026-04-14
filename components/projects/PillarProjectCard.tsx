import Link from 'next/link'
import type { PillarProject } from '@/types'
import Badge from '@/components/ui/Badge'
import ExternalLink from '@/components/ui/ExternalLink'

interface Props {
  project: PillarProject
}

export default function PillarProjectCard({ project }: Props) {
  const completedCount = project.milestones.filter(m => m.status === 'completed').length
  const totalCount = project.milestones.length
  const progress = Math.round((completedCount / totalCount) * 100)

  return (
    <div className="group bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none overflow-hidden hover:border-[#7C3AED]/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-all duration-300 flex flex-col">
      {/* Top progress bar */}
      <div className="h-px bg-gray-200 dark:bg-[#1f1f1f] relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-[#7C3AED] transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <Badge status={project.status} />
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-gray-500 dark:text-gray-600">{completedCount}/{totalCount} milestones</span>
            <ExternalLink
              href={project.githubUrl}
              className="text-gray-500 dark:text-gray-600 hover:text-[#7C3AED] transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </ExternalLink>
          </div>
        </div>

        <h3 className="font-display text-xl text-gray-900 dark:text-white font-bold mb-1 group-hover:text-[#7C3AED] transition-colors uppercase">
          {project.name}
        </h3>
        <p className="text-[#7C3AED]/70 text-xs font-mono mb-3 leading-tight">{project.tagline}</p>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{project.description}</p>

        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-200 dark:border-[#1f1f1f]">
          <Link
            href={`/projects/${project.slug}`}
            className="flex-1 text-center bg-white text-[#1a1a1a] font-mono font-bold text-xs py-2.5 px-4 rounded-none hover:bg-gray-100 transition-colors"
          >
            View Project &rarr;
          </Link>
          <ExternalLink
            href={project.externalUrl}
            className="px-3 py-2.5 border border-gray-200 dark:border-[#1f1f1f] text-gray-500 hover:text-[#7C3AED] hover:border-[#7C3AED]/40 transition-colors rounded-none"
            aria-label="Website"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </ExternalLink>
        </div>
      </div>
    </div>
  )
}
