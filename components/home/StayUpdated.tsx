import Link from 'next/link'
import type { SubstackPost, NewsroomPost, PodcastEpisode } from '@/types'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import { formatPostDate } from '@/lib/substack'
import { formatPostDate as formatNewsroomDate } from '@/lib/newsroom'
import { POD256_URL } from '@/lib/pod256'

interface StayUpdatedProps {
  posts: SubstackPost[]
  newsroomPosts?: NewsroomPost[]
  episodes?: PodcastEpisode[]
}

/**
 * One card shape for all three columns.
 *
 * The three feeds carry very different imagery — newsroom posts have their own
 * cover art, Substack images vary, and every POD256 episode ships the same
 * show logo — so a picture would make the columns look ranked rather than
 * equal. Meta line, title, one blurb: the columns read as peers at any width.
 */
function UpdateCard({
  href,
  external,
  meta,
  title,
  blurb,
}: {
  href: string
  external?: boolean
  meta: string
  title: string
  blurb?: string
}) {
  const className =
    'group flex flex-col bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] p-4 ' +
    'hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 ' +
    'hover:shadow-[0_0_16px_rgba(59,20,69,0.08)] transition-all duration-200'

  const body = (
    <>
      <span className="font-mono text-gray-500 text-[11px] tracking-widest uppercase mb-1.5">
        {meta}
      </span>
      <h4 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase leading-snug line-clamp-2 group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors">
        {title}
      </h4>
      {blurb && (
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mt-1.5">{blurb}</p>
      )}
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {body}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {body}
    </Link>
  )
}

/** Column heading with the same accent rule the section headers use. */
function ColumnHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-3.5 bg-[#3b1445] dark:bg-[#c084d8]" />
      <h3 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase tracking-wider">
        {label}
      </h3>
    </div>
  )
}

export default function StayUpdated({ posts, newsroomPosts = [], episodes = [] }: StayUpdatedProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 bg-[#3b1445]" />
        <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">Stay Updated</span>
      </div>
      <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl mb-8 uppercase">
        News &amp; Updates
      </h2>

      {/*
        Three peer columns. Stacked below lg and three across at lg — going
        two-across at md would strand the third column on a row of its own.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Newsroom */}
        <div className="flex flex-col">
          <ColumnHeader label="Updates" />
          {newsroomPosts.length > 0 ? (
            <div className="flex flex-col gap-3">
              {newsroomPosts.map((post) => (
                <UpdateCard
                  key={post.slug}
                  href={`/newsroom/${post.slug}`}
                  meta={formatNewsroomDate(post.date)}
                  title={post.title}
                  blurb={post.excerpt}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No posts yet.</p>
          )}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-[#1f1f1f]">
            <Link
              href="/newsroom"
              className="font-mono text-[#3b1445] dark:text-[#c084d8] text-sm hover:underline transition-colors"
            >
              All Announcements &rarr;
            </Link>
          </div>
        </div>

        {/* Podcast */}
        <div className="flex flex-col">
          <ColumnHeader label="Podcast" />
          {episodes.length > 0 ? (
            <div className="flex flex-col gap-3">
              {episodes.map((ep) => (
                <UpdateCard
                  key={ep.link}
                  href={ep.link}
                  external
                  meta={[
                    ep.episode != null ? `EP ${ep.episode}` : null,
                    ep.duration,
                    formatPostDate(ep.pubDate),
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                  title={ep.title}
                  blurb={ep.description}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Episodes are loading — catch them at {' '}
              <a href={POD256_URL} target="_blank" rel="noopener noreferrer" className="text-[#3b1445] dark:text-[#c084d8] hover:underline">
                pod256.org
              </a>.
            </p>
          )}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-[#1f1f1f]">
            <a
              href={POD256_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[#3b1445] dark:text-[#c084d8] text-sm hover:underline transition-colors"
            >
              All Episodes &rarr;
            </a>
            <p className="text-gray-500 text-xs mt-2 leading-relaxed">
              On{' '}
              <a href="https://fountain.fm" target="_blank" rel="noopener noreferrer" className="text-[#3b1445] dark:text-[#c084d8] hover:underline">Fountain</a>,{' '}
              <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="text-[#3b1445] dark:text-[#c084d8] hover:underline">Spotify</a>,{' '}
              <a href="https://podcasts.apple.com/us/podcast/pod256-bitcoin-mining-freedom-tech-and-awesome-tangents/id1657814571" target="_blank" rel="noopener noreferrer" className="text-[#3b1445] dark:text-[#c084d8] hover:underline">Apple Podcasts</a>, and more.
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col">
          <ColumnHeader label="Newsletter" />
          {posts.length > 0 ? (
            <div className="flex flex-col gap-3">
              {posts.map((post) => (
                <UpdateCard
                  key={post.link}
                  href={post.link}
                  external
                  meta={formatPostDate(post.pubDate)}
                  title={post.title}
                  blurb={post.description}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Subscribe below for updates from the foundation.</p>
          )}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-[#1f1f1f]">
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </div>
  )
}
