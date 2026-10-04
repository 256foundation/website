import Link from 'next/link'
import type { ReactNode } from 'react'
import type { NewsroomPost } from '@/types'
import SectionWrapper from '@/components/ui/SectionWrapper'
import GrantAnnouncementCard from '@/components/grants/GrantAnnouncementCard'

interface FundingAnnouncementsProps {
  posts: NewsroomPost[]
  title: string
  id?: string
  className?: string
  /** Renders the "View all →" link to the archive. Used on the preview only. */
  showViewAll?: boolean
  /** Optional node rendered above the heading, e.g. the archive's back link. */
  backLink?: ReactNode
}

/**
 * The funding log. Newest first, no amounts, no skeleton loaders. The sub-line
 * points to the full grant log and to the newsroom, unless this is the archive
 * itself, which links only to the newsroom. When the log is empty it renders an
 * intentional empty state and drops both links so the empty state carries the
 * only one.
 */
export default function FundingAnnouncements({
  posts,
  title,
  id,
  className = '',
  showViewAll = false,
  backLink,
}: FundingAnnouncementsProps) {
  const isEmpty = posts.length === 0
  const isArchive = Boolean(backLink)
  const linkClass = 'text-[#3b1445] dark:text-[#c084d8] hover:underline'

  return (
    <SectionWrapper id={id} className={className}>
      {backLink && <div className="mb-8">{backLink}</div>}
      <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-3">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">
        Every grant we&apos;ve funded, newest first.
        {!isEmpty && (
          <>
            {' '}
            {isArchive ? (
              <Link href="/newsroom" className={linkClass}>
                See more updates on our newsroom →
              </Link>
            ) : (
              <>
                <Link href="/grants/announcements" className={linkClass}>
                  See the full grant log →
                </Link>
                {' or '}
                <Link href="/newsroom" className={linkClass}>
                  see more updates on our newsroom →
                </Link>
              </>
            )}
          </>
        )}
      </p>

      {isEmpty ? (
        <div className="border border-gray-200 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#1a1a1a] rounded-none p-8 max-w-2xl">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            We announce new funding through our newsroom. When a grant is approved, it&apos;s
            announced here.
          </p>
          <Link
            href="/newsroom"
            className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs hover:underline"
          >
            Visit the newsroom →
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <GrantAnnouncementCard key={post.slug} post={post} />
            ))}
          </div>
          {showViewAll && (
            <div className="mt-6">
              <Link
                href="/grants/announcements"
                className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs hover:underline"
              >
                View all →
              </Link>
            </div>
          )}
        </>
      )}
    </SectionWrapper>
  )
}
