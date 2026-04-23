import type { GitHubCommit, GitHubRepoMeta } from '@/lib/github'
import { timeAgo } from '@/lib/discourse'
import SectionWrapper from '@/components/ui/SectionWrapper'

interface Props {
  commits: GitHubCommit[]
  meta: GitHubRepoMeta | null
  githubUrl: string
}

export default function GitHubActivitySection({ commits, meta, githubUrl }: Props) {
  return (
    <section className="bg-gray-50 dark:bg-[#242424] border-y border-gray-200 dark:border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full bg-[#00FF41] shrink-0"
              style={{ boxShadow: '0 0 6px #00FF41' }}
            />
            <span className="font-mono text-xs tracking-widest uppercase text-gray-600 dark:text-gray-400">
              GitHub Activity
            </span>
          </div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#3b1445] dark:text-[#c084d8] hover:underline transition-colors"
          >
            View on GitHub →
          </a>
        </div>

        {/* Repo meta strip */}
        {meta && (
          <div className="flex flex-wrap items-center gap-4 mb-5 pb-5 border-b border-gray-200 dark:border-[#1f1f1f]">
            {meta.latestTag && (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs px-2 py-0.5 bg-[#3b1445]/10 dark:bg-[#5c2070]/20 border border-[#3b1445]/30 dark:border-[#5c2070]/40 text-[#3b1445] dark:text-[#c084d8]">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1 7.775V2.75A.75.75 0 0 1 1.75 2h5.025a.75.75 0 0 1 .53.22l6.5 6.5a.75.75 0 0 1 0 1.06l-5.025 5.025a.75.75 0 0 1-1.06 0l-6.5-6.5a.75.75 0 0 1-.22-.53zm3.25-3.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
                {meta.latestTag}
              </span>
            )}
            <span className="font-mono text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
              </svg>
              {meta.stars.toLocaleString()} stars
            </span>
            <span className="font-mono text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0zM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0z"/>
              </svg>
              {meta.forks} forks
            </span>
            {meta.openIssues > 0 && (
              <span className="font-mono text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z"/>
                </svg>
                {meta.openIssues} open {meta.openIssues === 1 ? 'issue' : 'issues'}
              </span>
            )}
            <span className="font-mono text-xs text-gray-400 dark:text-gray-600 ml-auto">
              last push {timeAgo(meta.lastPushedAt)}
            </span>
          </div>
        )}

        {/* Commit list */}
        {commits.length === 0 ? (
          <div className="border border-gray-200 dark:border-[#1f1f1f] p-6 text-center">
            <p className="font-mono text-xs text-gray-400 dark:text-gray-600">
              No recent commits available.{' '}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3b1445] dark:text-[#c084d8] hover:underline"
              >
                View on GitHub →
              </a>
            </p>
          </div>
        ) : (
          <div className="border border-gray-200 dark:border-[#1f1f1f] divide-y divide-gray-200 dark:divide-[#1f1f1f]">
            {commits.map((commit) => (
              <a
                key={commit.sha}
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 sm:p-5 hover:bg-white dark:hover:bg-[#2a2a2a] transition-colors group"
              >
                {/* SHA badge */}
                <span className="font-mono text-[10px] text-gray-400 dark:text-gray-600 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#1f1f1f] px-1.5 py-0.5 shrink-0 mt-0.5 group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] group-hover:border-[#3b1445]/40 dark:group-hover:border-[#5c2070]/40 transition-colors">
                  {commit.shortSha}
                </span>

                {/* Message + meta */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors leading-snug truncate">
                    {commit.message}
                  </p>
                  <p className="font-mono text-[11px] text-gray-400 dark:text-gray-600 mt-0.5">
                    {commit.author}
                    {commit.date && (
                      <>
                        {' '}·{' '}
                        {timeAgo(commit.date)}
                      </>
                    )}
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  className="w-3.5 h-3.5 shrink-0 mt-1 text-gray-300 dark:text-gray-700 group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
