import { generatePageMetadata } from '@/lib/metadata'
import { fetchSubstackPosts } from '@/lib/substack'
import { fetchPodcastEpisodes } from '@/lib/pod256'
import { communityHeroPhotos } from '@/data/community'
import SectionWrapper from '@/components/ui/SectionWrapper'
import CommunityHeroCarousel from '@/components/community/CommunityHeroCarousel'
import ConnectGrid from '@/components/community/ConnectGrid'
import CommunityProjects from '@/components/community/CommunityProjects'
import TelehashFeature from '@/components/community/TelehashFeature'
import ListenAndLearn from '@/components/community/ListenAndLearn'
import GetInvolved from '@/components/community/GetInvolved'

export const revalidate = 3600

export const metadata = generatePageMetadata({
  title: 'Community',
  description:
    "Open-source needs more than code. Review, teaching, forums, dev calls, community niches, and an ecosystem around every project. This is where that work happens and how to be part of it.",
  path: '/community',
})

export default async function CommunityPage() {
  const [posts, episodes] = await Promise.all([
    fetchSubstackPosts(1),
    fetchPodcastEpisodes(1),
  ])

  return (
    <>
      <CommunityHeroCarousel
        photos={communityHeroPhotos}
        kicker="Community"
        headline="The stack doesn't build itself."
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
        <ListenAndLearn posts={posts} episodes={episodes} />
      </SectionWrapper>

      <GetInvolved />
    </>
  )
}
