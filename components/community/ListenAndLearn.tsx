import Image from 'next/image'
import type { SubstackPost, PodcastEpisode } from '@/types'
import { formatPostDate } from '@/lib/newsroomMeta'
import { POD256_URL } from '@/lib/pod256'
import NewsletterSignup from '@/components/shared/NewsletterSignup'

const SUBSTACK_URL = 'https://256foundation.substack.com'

interface ListenAndLearnProps {
  posts: SubstackPost[]
  episodes: PodcastEpisode[]
}

export default function ListenAndLearn({ posts, episodes }: ListenAndLearnProps) {
  const substack = posts[0]
  const episode = episodes[0]

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 bg-[#3b1445] dark:bg-[#c084d8]" />
        <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">
          Listen and Learn
        </span>
      </div>
      <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-3">
        The latest and the loudest
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mb-10">
        Two channels where the work gets explained: the podcast and the newsletter.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assembling Freedom newsletter */}
        <a
          href={substack?.link ?? SUBSTACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#1f1f1f] hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 transition-colors"
        >
          <div className="relative h-36 overflow-hidden bg-white dark:bg-[#1a1a1a]">
            {substack?.image && (
              <Image src={substack.image} alt="" fill className="object-cover" sizes="33vw" />
            )}
          </div>
          <div className="p-5">
            <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-[11px] tracking-widest uppercase">
              Assembling Freedom
            </span>
            <h3 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase leading-snug mt-1.5 line-clamp-2 group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors">
              {substack?.title ?? 'Read the newsletter'}
            </h3>
            {substack?.pubDate && (
              <p className="font-mono text-gray-500 text-xs mt-2">{formatPostDate(substack.pubDate)}</p>
            )}
          </div>
        </a>

        {/* POD256 */}
        <a
          href={episode?.link ?? POD256_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#1f1f1f] hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 transition-colors"
        >
          <div className="relative h-36 overflow-hidden bg-white dark:bg-[#1a1a1a]">
            {episode?.image && (
              <Image src={episode.image} alt="" fill className="object-contain p-4" sizes="33vw" />
            )}
          </div>
          <div className="p-5">
            <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-[11px] tracking-widest uppercase">
              POD256
            </span>
            <h3 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase leading-snug mt-1.5 line-clamp-2 group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors">
              {episode?.title ?? 'Listen to the podcast'}
            </h3>
            {episode?.duration && (
              <p className="font-mono text-gray-500 text-xs mt-2">{episode.duration}</p>
            )}
          </div>
        </a>

        <NewsletterSignup />
      </div>
    </div>
  )
}
