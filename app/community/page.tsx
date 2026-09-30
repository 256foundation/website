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
    "The stack doesn't build itself. Everything we fund is built in public, by a community of maintainers, miners, and builders. Here's where it lives and how to join.",
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
        sub="Everything we fund is built in public, by a community of maintainers, miners, and builders. Here's where it lives and how to join."
        ctaLabel="Join the forum →"
        ctaHref="https://forum.256foundation.org"
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
