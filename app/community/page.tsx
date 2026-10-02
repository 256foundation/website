import { generatePageMetadata } from '@/lib/metadata'
import { fetchSubstackPosts } from '@/lib/substack'
import { fetchPodcastEpisodes } from '@/lib/pod256'
import { getAllPostsByDate } from '@/lib/newsroom'
import { communityHeroPhotos } from '@/data/community'
import SectionWrapper from '@/components/ui/SectionWrapper'
import CommunityHeroCarousel from '@/components/community/CommunityHeroCarousel'
import ConnectGrid from '@/components/community/ConnectGrid'
import CommunityProjects from '@/components/community/CommunityProjects'
import TelehashFeature from '@/components/community/TelehashFeature'
import ListenAndLearn from '@/components/community/ListenAndLearn'
import GetInvolved from '@/components/community/GetInvolved'
import PageCTA from '@/components/shared/PageCTA'

export const revalidate = 3600

export const metadata = generatePageMetadata({
  title: 'Community',
  description:
    "Open-source needs more than code. Review, teaching, forums, dev calls, community niches, and an ecosystem around every project. This is where that work happens and how to be part of it.",
  path: '/community',
  ogImage: '/og/og-community.png',
})

export default async function CommunityPage() {
  const [posts, episodes] = await Promise.all([
    fetchSubstackPosts(1),
    fetchPodcastEpisodes(1),
  ])
  const newsroomPost = getAllPostsByDate()[0]

  return (
    <>
      <CommunityHeroCarousel
        photos={communityHeroPhotos}
        kicker="Community"
        headline={<>The industry doesn&apos;t <span className="text-[#c084d8]">build</span> itself</>}
        sub="Open-source needs more than code. Review, teaching, forums, dev calls, community niches, and an ecosystem around every project. This is where that work happens and how to be part of it."
        ctaLabel="Join the forum →"
        ctaHref="https://forum.256foundation.org"
        secondaryLabel="Dive into the code →"
        secondaryHref="https://github.com/256foundation"
      />

      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <ConnectGrid />
      </SectionWrapper>

      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <CommunityProjects />
      </SectionWrapper>

      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <TelehashFeature />
      </SectionWrapper>

      <SectionWrapper>
        <ListenAndLearn newsroomPost={newsroomPost} posts={posts} episodes={episodes} />
      </SectionWrapper>

      <GetInvolved />

      <PageCTA
        kicker="Back the Builders"
        title="Fund the people behind the stack."
        body="Donations keep core contributors and community programs moving. If you'd rather give time than money, we'll help you find a way in."
        donateLabel="Donate →"
      />
    </>
  )
}
