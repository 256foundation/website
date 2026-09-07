import Image from 'next/image'
import Link from 'next/link'
import type { SubstackPost, NewsroomPost, PodcastEpisode } from '@/types'
import { formatPostDate } from '@/lib/substack'
import { formatPostDate as formatNewsroomDate } from '@/lib/newsroom'
import { POD256_URL } from '@/lib/pod256'

const SUBSTACK_URL = 'https://256foundation.substack.com'

interface StayUpdatedProps {
  posts: SubstackPost[]
  newsroomPosts?: NewsroomPost[]
  episodes?: PodcastEpisode[]
}

/**
 * One card shape for all three columns. Only the leading card in each column
 * carries artwork — enough of a visual anchor to lead the eye, without every
 * card turning the section into a wall of pictures.
 */
function UpdateCard({
  href,
  external,
  meta,
  title,
  blurb,
  image,
  /**
   * POD256 art is a round logo on its own ground, so cropping it to fill the
   * frame lops off the circle. Contain keeps it whole; the wide cover images
   * on newsroom and Substack posts still get cover.
   */
  imageFit = 'cover',
}: {
  href: string
  external?: boolean
  meta: string
  title: string
  blurb?: string
  image?: string
  imageFit?: 'cover' | 'contain'
}) {
  const className =
    'group flex flex-col bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] ' +
    'hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 ' +
    'hover:shadow-[0_0_16px_rgba(59,20,69,0.08)] transition-all duration-200'

  const body = (
    <>
      {image && (
        <div className="relative w-full h-36 flex-shrink-0 overflow-hidden bg-white dark:bg-[#1a1a1a]">
          <Image
            src={image}
            alt=""
            fill
            className={imageFit === 'contain' ? 'object-contain p-4' : 'object-cover'}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-4 flex flex-col">
        <span className="font-mono text-gray-500 text-[11px] tracking-widest uppercase mb-1.5">
          {meta}
        </span>
        <h4 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase leading-snug line-clamp-2 group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors">
          {title}
        </h4>
        {blurb && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mt-1.5">{blurb}</p>
        )}
      </div>
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

const FOOTER_LINK =
  'font-mono text-[#3b1445] dark:text-[#c084d8] text-sm hover:underline transition-colors'
const FOOTER_NOTE = 'text-gray-500 text-xs mt-2 leading-relaxed'
const INLINE_LINK = 'text-[#3b1445] dark:text-[#c084d8] hover:underline'

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
              {newsroomPosts.map((post, i) => (
                <UpdateCard
                  key={post.slug}
                  href={`/newsroom/${post.slug}`}
                  meta={formatNewsroomDate(post.date)}
                  title={post.title}
                  blurb={post.excerpt}
                  image={i === 0 ? post.coverImage : undefined}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No posts yet.</p>
          )}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-[#1f1f1f]">
            <Link href="/newsroom" className={FOOTER_LINK}>
              All Announcements &rarr;
            </Link>
          </div>
        </div>

        {/* Podcast */}
        <div className="flex flex-col">
          <ColumnHeader label="Podcast" />
          {episodes.length > 0 ? (
            <div className="flex flex-col gap-3">
              {episodes.map((ep, i) => (
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
                  image={i === 0 ? ep.image : undefined}
                  imageFit="contain"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Episodes are loading — catch them at{' '}
              <a href={POD256_URL} target="_blank" rel="noopener noreferrer" className={INLINE_LINK}>
                pod256.org
              </a>.
            </p>
          )}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-[#1f1f1f]">
            <a href={POD256_URL} target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>
              All Episodes &rarr;
            </a>
            <p className={FOOTER_NOTE}>
              On{' '}
              <a href="https://fountain.fm" target="_blank" rel="noopener noreferrer" className={INLINE_LINK}>Fountain</a>,{' '}
              <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className={INLINE_LINK}>Spotify</a>,{' '}
              <a href="https://podcasts.apple.com/us/podcast/pod256-bitcoin-mining-freedom-tech-and-awesome-tangents/id1657814571" target="_blank" rel="noopener noreferrer" className={INLINE_LINK}>Apple Podcasts</a>, and more.
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col">
          <ColumnHeader label="Newsletter" />
          {posts.length > 0 ? (
            <div className="flex flex-col gap-3">
              {posts.map((post, i) => (
                <UpdateCard
                  key={post.link}
                  href={post.link}
                  external
                  meta={formatPostDate(post.pubDate)}
                  title={post.title}
                  blurb={post.description}
                  image={i === 0 ? post.image : undefined}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No issues yet.</p>
          )}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-[#1f1f1f]">
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>
              All Newsletters &rarr;
            </a>
            <p className={FOOTER_NOTE}>
              Free to{' '}
              <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className={INLINE_LINK}>subscribe on Substack</a>{' '}
              for project updates, grant announcements, and ecosystem news.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
