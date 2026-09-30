import Link from 'next/link'
import type { NewsroomPost } from '@/types'
import { formatPostDate } from '@/lib/newsroom'

/**
 * Exact program chip strings. The retired vocabulary ("Core Pillar",
 * "Open Grant", "General Fund") must not appear here. Exported so the tests
 * can assert on the same source the UI renders from.
 */
export const PROGRAM_LABELS: Record<NonNullable<NewsroomPost['program']>, string> = {
  core: 'Core Projects Program',
  general: 'General Grant Program',
}

interface GrantAnnouncementCardProps {
  post: NewsroomPost
}

/**
 * One entry in the grants funding log: date, then project name, program chip,
 * and term on a single meta row, then the one factual line. Never a dollar
 * amount. Every field except the heading degrades away independently.
 *
 * The heading is the project name; when a post omits `project`, the article
 * title stands in so the card is never headless.
 */
export default function GrantAnnouncementCard({ post }: GrantAnnouncementCardProps) {
  const heading = post.project ?? post.title

  return (
    <Link
      href={`/newsroom/${post.slug}`}
      className="group block bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-6 hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:shadow-[0_0_24px_rgba(59,20,69,0.1)] transition-all duration-200"
    >
      {post.date && (
        <time className="block font-mono text-gray-400 text-xs mb-2">{formatPostDate(post.date)}</time>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-3">
        <span className="font-display font-bold text-gray-900 dark:text-white text-lg uppercase leading-tight group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors">
          {heading}
        </span>
        {post.program && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-none font-mono text-[11px] uppercase tracking-wider border border-[#3b1445]/40 dark:border-[#5c2070]/50 text-[#3b1445] dark:text-[#c084d8]">
            {PROGRAM_LABELS[post.program]}
          </span>
        )}
        {post.term && (
          <span className="font-mono text-gray-500 dark:text-gray-400 text-xs">{post.term}</span>
        )}
      </div>

      {post.excerpt && (
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
      )}
    </Link>
  )
}
