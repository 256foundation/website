import type { GitHubRepoMeta } from '@/lib/github'
import type { ForumTopic } from '@/lib/discourse'
import { timeAgo } from '@/lib/discourse'

interface Props {
  repoMeta: GitHubRepoMeta | null
  forumTopic: ForumTopic | null
  githubUrl: string
  forumUrl: string
}

/**
 * Small, fail-soft "signs of life" row: latest repo push + latest forum reply.
 * Each badge links out; if a fetch returned nothing we still render a link.
 */
export default function ActivityBadges({ repoMeta, forumTopic, githubUrl, forumUrl }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* GitHub */}
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 border border-gray-200 dark:border-[#1f1f1f] text-gray-500 dark:text-gray-400 hover:border-[#3b1445]/40 dark:hover:border-[#5c2070]/40 hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors"
      >
        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
        </svg>
        {repoMeta ? (
          <>
            <span>{repoMeta.stars.toLocaleString()} ★</span>
            <span className="text-gray-300 dark:text-gray-700" aria-hidden="true">·</span>
            <span>last push {timeAgo(repoMeta.lastPushedAt)}</span>
          </>
        ) : (
          <span>repository</span>
        )}
      </a>

      {/* Forum */}
      <a
        href={forumUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 border border-gray-200 dark:border-[#1f1f1f] text-gray-500 dark:text-gray-400 hover:border-[#3b1445]/40 dark:hover:border-[#5c2070]/40 hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors"
      >
        <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
        {forumTopic ? (
          <>
            <span>{forumTopic.replyCount} {forumTopic.replyCount === 1 ? 'reply' : 'replies'}</span>
            <span className="text-gray-300 dark:text-gray-700" aria-hidden="true">·</span>
            <span>last reply {timeAgo(forumTopic.lastPostedAt)}</span>
          </>
        ) : (
          <span>discussions</span>
        )}
      </a>
    </div>
  )
}
