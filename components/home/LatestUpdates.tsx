import Image from 'next/image'
import Link from 'next/link'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Eyebrow from '@/components/ui/Eyebrow'
import type { SubstackPost, NewsroomPost, PodcastEpisode } from '@/types'
import { formatPostDate } from '@/lib/substack'
import { formatPostDate as formatNewsroomDate } from '@/lib/newsroom'

interface LatestUpdatesProps {
  newsroomPost?: NewsroomPost
  post?: SubstackPost
  episode?: PodcastEpisode
}

function LatestCard({
  href,
  external,
  meta,
  title,
  blurb,
  image,
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
    'group flex flex-col bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#1f1f1f] ' +
    'hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 ' +
    'hover:shadow-[0_0_16px_rgba(59,20,69,0.08)] transition-all duration-200'

  const body = (
    <>
      {image && (
        <div className="relative w-full h-40 flex-shrink-0 overflow-hidden bg-white dark:bg-[#1a1a1a]">
          <Image
            src={image}
            alt=""
            fill
            className={imageFit === 'contain' ? 'object-contain p-4' : 'object-cover'}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-5 flex flex-col">
        <span className="font-mono text-gray-500 text-[11px] tracking-widest uppercase mb-2">
          {meta}
        </span>
        <h3 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase leading-snug line-clamp-2 group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors">
          {title}
        </h3>
        {blurb && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mt-2">{blurb}</p>
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

/** One live card each from the newsroom, the podcast, and the newsletter. */
export default function LatestUpdates({ newsroomPost, post, episode }: LatestUpdatesProps) {
  const hasAny = Boolean(newsroomPost || post || episode)
  if (!hasAny) return null

  return (
    <SectionWrapper>
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <Eyebrow className="mb-4">Latest</Eyebrow>
          <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase">
            What&apos;s new.
          </h2>
        </div>
        <Link
          href="/newsroom"
          className="font-mono text-[#3b1445] dark:text-[#c084d8] text-sm hover:underline whitespace-nowrap transition-colors"
        >
          All updates →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsroomPost && (
          <LatestCard
            href={`/newsroom/${newsroomPost.slug}`}
            meta={`Newsroom · ${formatNewsroomDate(newsroomPost.date)}`}
            title={newsroomPost.title}
            blurb={newsroomPost.excerpt}
            image={newsroomPost.coverImage}
          />
        )}
        {episode && (
          <LatestCard
            href={episode.link}
            external
            meta={[
              'POD256',
              episode.episode != null ? `EP ${episode.episode}` : null,
              formatPostDate(episode.pubDate),
            ]
              .filter(Boolean)
              .join(' · ')}
            title={episode.title}
            blurb={episode.description}
            image={episode.image}
            imageFit="contain"
          />
        )}
        {post && (
          <LatestCard
            href={post.link}
            external
            meta={`Newsletter · ${formatPostDate(post.pubDate)}`}
            title={post.title}
            blurb={post.description}
            image={post.image}
          />
        )}
      </div>
    </SectionWrapper>
  )
}
