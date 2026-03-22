import Image from 'next/image'
import type { SubstackPost } from '@/types'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import { formatPostDate } from '@/lib/substack'

interface StayUpdatedProps {
  posts: SubstackPost[]
}

export default function StayUpdated({ posts }: StayUpdatedProps) {
  const [featured, ...rest] = posts

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 bg-[#7C3AED]" />
        <span className="font-mono text-[#7C3AED] text-xs tracking-[0.2em] uppercase">Stay Updated</span>
      </div>
      <h2 className="font-display font-bold text-white text-2xl sm:text-3xl mb-8 uppercase">
        News &amp; Updates
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Blog posts */}
        <div className="lg:col-span-2">
          <h3 className="font-display font-bold text-white text-base mb-5 uppercase tracking-wider">Newsletter</h3>

          {posts.length > 0 ? (
            <div className="mb-6 space-y-4">
              {/* Featured post — large */}
              {featured && (
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-[#111111] border border-[#1f1f1f] rounded-none hover:border-[#7C3AED]/50 hover:shadow-[0_0_24px_rgba(124,58,237,0.1)] transition-all duration-200"
                >
                  {featured.image && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 66vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="p-5">
                    {featured.pubDate && (
                      <time className="font-mono text-[#7C3AED] text-xs tracking-widest uppercase block mb-2">
                        {formatPostDate(featured.pubDate)}
                      </time>
                    )}
                    <h4 className="font-display font-bold text-white text-xl uppercase leading-tight group-hover:text-[#7C3AED] transition-colors mb-2">
                      {featured.title}
                    </h4>
                    {featured.description && (
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                        {featured.description}
                      </p>
                    )}
                  </div>
                </a>
              )}

              {/* Remaining posts — smaller row */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {rest.map((post, i) => (
                    <a
                      key={i}
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block bg-[#111111] border border-[#1f1f1f] rounded-none hover:border-[#7C3AED]/50 hover:shadow-[0_0_16px_rgba(124,58,237,0.08)] transition-all duration-200"
                    >
                      {post.image && (
                        <div className="relative w-full h-32 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                        </div>
                      )}
                      <div className="p-4">
                        {post.pubDate && (
                          <time className="font-mono text-gray-500 text-xs block mb-1">
                            {formatPostDate(post.pubDate)}
                          </time>
                        )}
                        <h4 className="font-display font-bold text-white text-base uppercase leading-snug group-hover:text-[#7C3AED] transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        {post.description && (
                          <p className="text-gray-500 text-xs mt-1.5 leading-relaxed line-clamp-2">
                            {post.description}
                          </p>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm mb-6">
              Subscribe below to get updates from the foundation.
            </p>
          )}

        </div>

        {/* Podcast + Newsletter signup */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-white text-base mb-5 uppercase tracking-wider">POD256 Podcast</h3>
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-none p-6">
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              The weekly 256 Foundation team podcast covering open-source mining developments,
              project updates, and conversations with the builders shaping the future of Bitcoin mining.
            </p>
            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-none px-3 py-2 mb-4">
              <span className="font-mono text-[#00FF41] text-xs">NEXT LIVE:</span>
              <span className="font-mono text-gray-400 text-xs ml-2">See our X account for schedule</span>
            </div>
            <a
              href="https://www.pod256.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[#7C3AED] text-sm hover:underline transition-colors inline-flex items-center gap-1"
            >
              Listen to POD256 &rarr;
            </a>
          </div>
          <p className="text-gray-500 text-xs px-1">
            Available on{' '}
            <a href="https://fountain.fm" target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] hover:underline">Fountain</a>,{' '}
            <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] hover:underline">Spotify</a>,{' '}
            Apple Podcasts, and more.
          </p>

          <NewsletterSignup />
        </div>
      </div>
    </div>
  )
}
