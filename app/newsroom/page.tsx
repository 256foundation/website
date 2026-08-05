import { getAllPosts } from '@/lib/newsroom'
import { generatePageMetadata } from '@/lib/metadata'
import SectionWrapper from '@/components/ui/SectionWrapper'
import DecorativeBg from '@/components/ui/DecorativeBg'
import PostCard from '@/components/newsroom/PostCard'

export const dynamic = 'force-static'

export const metadata = generatePageMetadata({
  title: 'Newsroom',
  description: 'Announcements, mission updates, and industry perspectives from the 256 Foundation.',
  path: '/newsroom',
})

export default function NewsroomPage() {
  const posts = getAllPosts()
  // getAllPosts() already sorts featured first, so a featured post is posts[0].
  const featuredPost = posts.find((post) => post.featured) ?? null
  const recentPosts = featuredPost ? posts.filter((post) => post.slug !== featuredPost.slug) : posts

  return (
    <SectionWrapper className="min-h-[60vh]">
      <DecorativeBg glowPosition="50% 0%" gridOpacity={0.07} vignette={false} />
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 bg-[#3b1445]" />
        <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">
          256 Foundation
        </span>
      </div>
      <h1 className="font-display font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl uppercase mb-2">
        Newsroom
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-10">
        Announcements, perspectives, and updates from the 256 Foundation team.
      </p>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-sm">No posts yet. Check back soon.</p>
      ) : (
        <>
          {featuredPost && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-4 bg-[#3b1445] dark:bg-[#c084d8]" />
                <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">
                  Featured
                </span>
              </div>
              <div className="border border-[#3b1445]/40 dark:border-[#5c2070]/50 rounded-none p-4 sm:p-6">
                <PostCard post={featuredPost} featured />
              </div>
            </div>
          )}

          {recentPosts.length > 0 && (
            <>
              {featuredPost && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-4 bg-gray-300 dark:bg-[#1f1f1f]" />
                  <span className="font-mono text-gray-500 text-xs tracking-[0.2em] uppercase">
                    Recent
                  </span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post, i) => (
                  <PostCard key={post.slug} post={post} featured={!featuredPost && i === 0} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </SectionWrapper>
  )
}
