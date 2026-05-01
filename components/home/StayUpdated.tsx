import Image from 'next/image'
import Link from 'next/link'
import type { SubstackPost, NewsroomPost } from '@/types'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import { formatPostDate } from '@/lib/substack'
import { formatPostDate as formatNewsroomDate } from '@/lib/newsroom'

interface StayUpdatedProps {
  posts: SubstackPost[]
  latestNewsroomPost?: NewsroomPost | null
}

export default function StayUpdated({ posts, latestNewsroomPost }: StayUpdatedProps) {
  const [featured, ...rest] = posts

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 bg-[#3b1445]" />
        <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">Stay Updated</span>
      </div>
      <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl mb-8 uppercase">
        News &amp; Updates
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Blog posts */}
        <div className="lg:col-span-2">
          {/* Latest newsroom post */}
          {latestNewsroomPost && (
            <div className="mb-6">
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-base mb-3 uppercase tracking-wider">Latest Announcement</h3>
              <Link
                href={`/newsroom/${latestNewsroomPost.slug}`}
                className="group flex items-start gap-4 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] p-4 hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:shadow-[0_0_16px_rgba(59,20,69,0.08)] transition-all duration-200"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs uppercase tracking-widest">Newsroom</span>
                    <span className="text-gray-300 dark:text-gray-600 text-xs">·</span>
                    <time className="font-mono text-gray-400 text-xs">{formatNewsroomDate(latestNewsroomPost.date)}</time>
                  </div>
                  <h4 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase leading-snug group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors line-clamp-2 mb-1">
                    {latestNewsroomPost.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-1">{latestNewsroomPost.excerpt}</p>
                </div>
                <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs shrink-0 group-hover:underline mt-0.5">Read →</span>
              </Link>
            </div>
          )}

          <h3 className="font-display font-bold text-gray-900 dark:text-white text-base mb-5 uppercase tracking-wider">Newsletter</h3>

          {posts.length > 0 ? (
            // Single unified grid — featured spans both columns, smaller posts each take one.
            // One gap value controls ALL spacing (horizontal and vertical) so it always forms a perfect + at any width.
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Featured post — spans full width on sm+ */}
              {featured && (
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group sm:col-span-2 flex flex-col bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:shadow-[0_0_24px_rgba(59,20,69,0.1)] transition-all duration-200"
                >
                  {featured.image && (
                    <div className="relative w-full h-48 flex-shrink-0 overflow-hidden">
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="object-cover transition-all duration-500"
                        sizes="(max-width: 640px) 100vw, 66vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#242424] via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    {featured.pubDate && (
                      <time className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase block mb-2">
                        {formatPostDate(featured.pubDate)}
                      </time>
                    )}
                    <h4 className="font-display font-bold text-gray-900 dark:text-white text-xl uppercase leading-tight group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors mb-2">
                      {featured.title}
                    </h4>
                    {featured.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mt-auto">
                        {featured.description}
                      </p>
                    )}
                  </div>
                </a>
              )}

              {/* Remaining posts — one per column, equal height enforced by the shared grid row */}
              {rest.map((post, i) => (
                <a
                  key={i}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:shadow-[0_0_16px_rgba(59,20,69,0.08)] transition-all duration-200"
                >
                  {post.image && (
                    <div className="relative w-full h-32 flex-shrink-0 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-all duration-500"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#242424] via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col">
                    {post.pubDate && (
                      <time className="font-mono text-gray-500 text-xs block mb-1">
                        {formatPostDate(post.pubDate)}
                      </time>
                    )}
                    <h4 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase leading-snug group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    {post.description && (
                      <p className="text-gray-500 text-xs mt-auto pt-1.5 leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm mb-6">
              Subscribe below to get updates from the foundation.
            </p>
          )}

        </div>

        {/* Podcast + Newsletter signup */}
        <div className="flex flex-col h-full gap-4">
          <h3 className="font-display font-bold text-gray-900 dark:text-white text-base mb-1 uppercase tracking-wider">POD256 Podcast</h3>
          <div className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              The weekly 256 Foundation team podcast covering open-source mining developments,
              project updates, and conversations with the builders shaping the future of Bitcoin mining.
            </p>
            <a
              href="https://forum.256foundation.org/upcoming-events/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#1f1f1f] rounded-none px-3 py-2 mb-4 hover:border-[#3b1445]/40 dark:hover:border-[#5c2070]/40 transition-colors group"
            >
              <div>
                <span className="font-mono text-[#00FF41] text-xs">NEXT LIVE:</span>
                <span className="font-mono text-gray-600 dark:text-gray-400 text-xs ml-2">Events Calendar →</span>
              </div>
            </a>
            <a
              href="https://www.pod256.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[#3b1445] dark:text-[#c084d8] text-sm hover:underline transition-colors inline-flex items-center gap-1 mb-4"
            >
              Listen to POD256 &rarr;
            </a>
            <p className="text-gray-500 text-xs">
              Available on{' '}
              <a href="https://fountain.fm" target="_blank" rel="noopener noreferrer" className="text-[#3b1445] dark:text-[#c084d8] hover:underline">Fountain</a>,{' '}
              <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="text-[#3b1445] dark:text-[#c084d8] hover:underline">Spotify</a>,{' '}
              <a href="https://podcasts.apple.com/us/podcast/pod256-bitcoin-mining-freedom-tech-and-awesome-tangents/id1657814571" target="_blank" rel="noopener noreferrer" className="text-[#3b1445] dark:text-[#c084d8] hover:underline">Apple Podcasts</a>, and more.
            </p>
          </div>

          <div className="flex-1">
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </div>
  )
}
