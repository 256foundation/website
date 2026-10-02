import { getAllPostsByDate } from '@/lib/newsroom'
import { generatePageMetadata } from '@/lib/metadata'
import SectionWrapper from '@/components/ui/SectionWrapper'
import DecorativeBg from '@/components/ui/DecorativeBg'
import Eyebrow from '@/components/ui/Eyebrow'
import NewsroomIndex from '@/components/newsroom/NewsroomIndex'
import PageCTA from '@/components/shared/PageCTA'

export const dynamic = 'force-static'

export const metadata = generatePageMetadata({
  title: 'Newsroom',
  description: 'Announcements, mission updates, and industry perspectives from the 256 Foundation.',
  path: '/newsroom',
  ogImage: '/og/og-newsroom.png',
})

export default function NewsroomPage() {
  // `featured` only pins a post to the home-page slot; this index is a uniform
  // grid in plain date-descending order, so a featured post never jumps a newer
  // one here.
  const posts = getAllPostsByDate()

  return (
    <>
      <SectionWrapper className="min-h-[60vh]">
        <DecorativeBg glowPosition="50% 0%" gridOpacity={0.07} vignette={false} />
        <Eyebrow className="mb-4">256 Foundation</Eyebrow>
        <h1 className="font-display font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl uppercase mb-2">
          Newsroom
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-10">
          Announcements, perspectives, and updates from the 256 Foundation team.
        </p>

        <NewsroomIndex posts={posts} />
      </SectionWrapper>

      <PageCTA
        kicker="Writing About Us?"
        title="Get the story straight from the source."
        body="Questions on a post, an announcement, or the foundation itself — reach out and we'll help."
      />
    </>
  )
}
