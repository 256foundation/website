import { getAllPosts } from '@/lib/newsroom'
import { generatePageMetadata } from '@/lib/metadata'
import SectionWrapper from '@/components/ui/SectionWrapper'
import PostCard from '@/components/newsroom/PostCard'

export const dynamic = 'force-static'

export const metadata = generatePageMetadata({
  title: 'Newsroom',
  description: 'Announcements, mission updates, and industry perspectives from the 256 Foundation.',
  path: '/newsroom',
})

export default function NewsroomPage() {
  const posts = getAllPosts()

  return (
    <SectionWrapper className="min-h-[60vh]">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} featured={i === 0} />
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}
