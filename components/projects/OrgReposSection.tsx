import type { GitHubOrgRepo } from '@/lib/github'
import { timeAgo } from '@/lib/discourse'

interface Props {
  repos: GitHubOrgRepo[]
}

const languageColors: Record<string, string> = {
  Rust: '#dea584',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  C: '#555555',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  KiCad: '#314cb0',
  Shell: '#89e051',
}

export default function OrgReposSection({ repos }: Props) {
  if (repos.length === 0) return null

  return (
    <section className="bg-gray-50 dark:bg-[#242424] border-t border-gray-200 dark:border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
          <div>
            <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-2">
              256Foundation on GitHub
            </p>
            <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase">
              All Repositories
            </h2>
          </div>
          <a
            href="https://github.com/256foundation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#3b1445] dark:text-[#c084d8] hover:underline whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            View all {repos.length} repos →
          </a>
        </div>

        {/* Context note */}
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-2xl mb-10">
          Not every repo here is actively funded — but all are maintained under the 256 Foundation&apos;s organizational structure. Some are core pillar projects, others are community contributions and experiments aligned with the open-source mining mission. Dig in.
        </p>

        {/* Repo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#1f1f1f] p-4 hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:shadow-[0_0_16px_rgba(59,20,69,0.12)] transition-all duration-200 flex flex-col gap-3"
            >
              {/* Name + archived badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <svg className="w-3.5 h-3.5 shrink-0 text-gray-400 dark:text-gray-600 group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8zM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2z"/>
                  </svg>
                  <span className="font-mono font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors truncate">
                    {repo.name}
                  </span>
                </div>
                {repo.isArchived && (
                  <span className="font-mono text-[10px] px-1.5 py-0.5 border border-gray-200 dark:border-[#1f1f1f] text-gray-400 shrink-0">
                    archived
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1">
                {repo.description ?? <span className="italic text-gray-400 dark:text-gray-600">No description</span>}
              </p>

              {/* Footer: language + stars + updated */}
              <div className="flex items-center gap-3 font-mono text-[11px] text-gray-400 dark:text-gray-600">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: languageColors[repo.language] ?? '#888' }}
                    />
                    {repo.language}
                  </span>
                )}
                {repo.stars > 0 && (
                  <span className="flex items-center gap-0.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
                    </svg>
                    {repo.stars}
                  </span>
                )}
                <span className="ml-auto">{timeAgo(repo.updatedAt)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
