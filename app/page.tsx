import { fetchSubstackPosts } from '@/lib/substack'
import { fetchForumTopics } from '@/lib/discourse'
import { fetchOrgEvents } from '@/lib/github'
import { generatePageMetadata } from '@/lib/metadata'
import { siteStats } from '@/data/stats'
import { supporters } from '@/data/supporters'
import { teleHashEvents } from '@/data/telehash'
import SectionWrapper from '@/components/ui/SectionWrapper'
import HeroSection from '@/components/home/HeroSection'
import DonateCards from '@/components/home/DonateCards'
import WhySection from '@/components/home/WhySection'
import AllocationStats from '@/components/home/AllocationStats'
import ProjectsSection from '@/components/home/ProjectsSection'
import BlocksFound from '@/components/home/BlocksFound'
import StayUpdated from '@/components/home/StayUpdated'
import ApplySection from '@/components/home/ApplySection'
import CommunitySection from '@/components/home/CommunitySection'
import EcosystemSection from '@/components/home/EcosystemSection'
import SupporterShowcase from '@/components/home/SupporterShowcase'
import FAQSection from '@/components/home/FAQSection'
import ContactForm from '@/components/home/ContactForm'
import SectionHeader from '@/components/ui/SectionHeader'
import DecorativeBg from '@/components/ui/DecorativeBg'

export const revalidate = 3600

export const metadata = generatePageMetadata({
  title: '256 Foundation',
  description:
    'Building the open-source Bitcoin mining ecosystem. We fund developers creating open-source Bitcoin mining hardware and software.',
  path: '/',
})

export default async function Home() {
  const [posts, forumTopics, orgEvents] = await Promise.all([
    fetchSubstackPosts(3),
    fetchForumTopics(6),
    fetchOrgEvents('256foundation', 8),
  ])
  const firstEvent = teleHashEvents.find((e) => e.blockFound)

  return (
    <>
      <HeroSection />

      <SectionWrapper>
        <DonateCards />
      </SectionWrapper>

      <SectionWrapper className="border-t border-gray-200 dark:border-[#1f1f1f]">
        <WhySection />
      </SectionWrapper>

      <SectionWrapper className="border-t border-gray-200 dark:border-[#1f1f1f]">
        <AllocationStats stats={siteStats} />
      </SectionWrapper>

      <SectionWrapper className="border-t border-gray-200 dark:border-[#1f1f1f]">
        <ProjectsSection forumTopics={forumTopics} orgEvents={orgEvents} />
      </SectionWrapper>

      <SectionWrapper className="border-t border-gray-200 dark:border-[#1f1f1f]">
        <BlocksFound stats={siteStats} videoUrl={firstEvent?.videoUrl} />
      </SectionWrapper>

      <SectionWrapper id="updates" className="border-t border-gray-200 dark:border-[#1f1f1f]">
        <StayUpdated posts={posts} />
      </SectionWrapper>

      <SectionWrapper className="border-t border-gray-200 dark:border-[#1f1f1f]">
        <ApplySection />
      </SectionWrapper>

      <SectionWrapper className="border-t border-gray-200 dark:border-[#1f1f1f]">
        <CommunitySection />
      </SectionWrapper>

      <SectionWrapper className="border-t border-gray-200 dark:border-[#1f1f1f]">
        <EcosystemSection />
      </SectionWrapper>

      <SectionWrapper className="border-t border-gray-200 dark:border-[#1f1f1f]">
        <SupporterShowcase supporters={supporters} />
      </SectionWrapper>

      <SectionWrapper className="border-t border-gray-200 dark:border-[#1f1f1f]">
        <FAQSection />
      </SectionWrapper>

      <SectionWrapper id="contact" decorative className="border-t border-gray-200 dark:border-[#1f1f1f]">
        <DecorativeBg glowPosition="50% 100%" gridOpacity={0.05} />
        <SectionHeader
          title="Contact Us"
          subtitle="Have a question or want to get involved? We'd love to hear from you."
        />
        <ContactForm />
      </SectionWrapper>
    </>
  )
}
