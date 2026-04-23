import Link from 'next/link'
import type { PillarProject } from '@/types'
import type { GitHubRepoMeta } from '@/lib/github'
import Badge from '@/components/ui/Badge'
import ExternalLink from '@/components/ui/ExternalLink'

interface Props {
  project: PillarProject
  repoMeta?: GitHubRepoMeta | null
}

export default function PillarProjectCard({ project, repoMeta }: Props) {
  return (
    <div className="group bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none overflow-hidden hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:shadow-[0_0_20px_rgba(59,20,69,0.15)] transition-all duration-300 flex flex-col">
      {/* Top accent line */}
      <div className="h-px bg-[#3b1445]/30 dark:bg-[#5c2070]/40" />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <Badge status={project.status} />

          {/* GitHub stats */}
          <div className="flex items-center gap-3">
            {repoMeta ? (
              <div className="flex items-center gap-2.5 font-mono text-xs text-gray-400 dark:text-gray-500">
                <span className="flex items-center gap-1" title="Stars">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
                  </svg>
                  {repoMeta.stars.toLocaleString()}
                </span>
                <span className="flex items-center gap-1" title="Forks">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0zM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0z"/>
                  </svg>
                  {repoMeta.forks}
                </span>
                {repoMeta.openIssues > 0 && (
                  <span className="flex items-center gap-1" title="Open issues">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z"/>
                    </svg>
                    {repoMeta.openIssues}
                  </span>
                )}
              </div>
            ) : null}
          </div>
        </div>

        <h3 className="font-display text-xl text-gray-900 dark:text-white font-bold mb-1 group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors uppercase">
          {project.name}
        </h3>
        <p className="text-[#3b1445]/70 dark:text-[#c084d8]/70 text-xs font-mono mb-3 leading-tight">{project.tagline}</p>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{project.description}</p>

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-[#1f1f1f] flex gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="flex-1 text-center bg-white dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white font-mono font-bold text-xs py-2.5 px-3 rounded-none hover:bg-gray-100 dark:hover:bg-[#222] border border-gray-200 dark:border-[#1f1f1f] transition-colors"
          >
            Project &rarr;
          </Link>
          <ExternalLink
            href={project.githubUrl}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-gray-200 dark:border-[#1f1f1f] text-gray-500 dark:text-gray-400 font-mono text-xs hover:text-[#3b1445] dark:hover:text-[#c084d8] hover:border-[#3b1445]/40 dark:hover:border-[#5c2070]/40 transition-colors"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </ExternalLink>
          <ExternalLink
            href={project.forumCategory}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-gray-200 dark:border-[#1f1f1f] text-gray-500 dark:text-gray-400 font-mono text-xs hover:text-[#3b1445] dark:hover:text-[#c084d8] hover:border-[#3b1445]/40 dark:hover:border-[#5c2070]/40 transition-colors"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            Forum
          </ExternalLink>
        </div>
      </div>
    </div>
  )
}
