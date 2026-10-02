import { fetchSubstackPosts } from '@/lib/substack'
import { getAllPostsByDate } from '@/lib/newsroom'
import { fetchForumTopics } from '@/lib/discourse'
import { fetchOrgEvents } from '@/lib/github'
import { fetchPodcastEpisodes } from '@/lib/pod256'
import { generatePageMetadata } from '@/lib/metadata'
import { teleHashEvents } from '@/data/telehash'
import Reveal from '@/components/ui/Reveal'
import PageCTA from '@/components/shared/PageCTA'
import HomeHero from '@/components/home/HomeHero'
import ProblemSection from '@/components/home/ProblemSection'
import StackSection from '@/components/home/StackSection'
import ProofSection from '@/components/home/ProofSection'
import FundingBand from '@/components/home/FundingBand'
import CommunitySection from '@/components/home/CommunitySection'
import LatestUpdates from '@/components/home/LatestUpdates'

export const revalidate = 3600

export const metadata = generatePageMetadata({
  title: '256 Foundation',
  description:
    'Bitcoin mining will be open-source, or Bitcoin remains permissioned. The 256 Foundation funds and builds the open-source Bitcoin mining stack.',
  path: '/',
})

const DIVIDER = 'border-t border-gray-200 dark:border-[#1f1f1f]'

export default async function Home() {
  const [posts, forumTopics, orgEvents, episodes] = await Promise.all([
    fetchSubstackPosts(1),
    fetchForumTopics(5),
    fetchOrgEvents('256foundation', 6),
    fetchPodcastEpisodes(1),
  ])
  // Newest first. One card, so a featured post must not jump a newer one here.
  const newsroomPost = getAllPostsByDate()[0]
  const firstEvent = teleHashEvents.find((e) => e.blockFound)

  return (
    <>
      <HomeHero />

      <Reveal className={DIVIDER}>
        <ProblemSection />
      </Reveal>

      <Reveal className={DIVIDER}>
        <StackSection />
      </Reveal>

      <Reveal className={DIVIDER}>
        <ProofSection videoUrl={firstEvent?.videoUrl} />
      </Reveal>

      <Reveal className={DIVIDER}>
        <FundingBand />
      </Reveal>

      <Reveal className={DIVIDER}>
        <CommunitySection forumTopics={forumTopics} orgEvents={orgEvents} />
      </Reveal>

      <Reveal className={DIVIDER}>
        <LatestUpdates newsroomPost={newsroomPost} post={posts[0]} episode={episodes[0]} />
      </Reveal>

      <div id="contact">
        <Reveal>
          <PageCTA
            align="center"
            kicker="Get Involved"
            title="Help us keep every layer open."
            body="Money from anyone. Influence from no one. Every layer of Bitcoin mining, open for good."
            donateLabel="Fund the work →"
            contactLabel="Get in touch →"
          />
        </Reveal>
      </div>
    </>
  )
}
