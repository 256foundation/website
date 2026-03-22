import { fetchSubstackPosts } from '@/lib/substack'
import { generatePageMetadata } from '@/lib/metadata'
import { siteStats } from '@/data/stats'
import { supporters } from '@/data/supporters'
import { teleHashEvents } from '@/data/telehash'
import SectionWrapper from '@/components/ui/SectionWrapper'
import HeroSection from '@/components/home/HeroSection'
import DonateCards from '@/components/home/DonateCards'
import WhySection from '@/components/home/WhySection'
import AllocationStats from '@/components/home/AllocationStats'
import BlocksFound from '@/components/home/BlocksFound'
import StayUpdated from '@/components/home/StayUpdated'
import ApplySection from '@/components/home/ApplySection'
import CommunitySection from '@/components/home/CommunitySection'
import EcosystemSection from '@/components/home/EcosystemSection'
import SupporterShowcase from '@/components/home/SupporterShowcase'
import ContactForm from '@/components/home/ContactForm'
import SectionHeader from '@/components/ui/SectionHeader'

export const revalidate = 3600

export const metadata = generatePageMetadata({
  title: '256 Foundation',
  description:
    'Building the open-source Bitcoin mining ecosystem. We fund developers creating open-source Bitcoin mining hardware and software.',
  path: '/',
})

export default async function Home() {
  const posts = await fetchSubstackPosts(3)
  const firstEvent = teleHashEvents.find((e) => e.blockFound)

  return (
    <>
      <HeroSection />

      <SectionWrapper>
        <DonateCards />
      </SectionWrapper>

      <SectionWrapper className="border-t border-[#1f1f1f]">
        <WhySection />
      </SectionWrapper>

      <SectionWrapper className="border-t border-[#1f1f1f]">
        <AllocationStats stats={siteStats} />
      </SectionWrapper>

      <SectionWrapper className="border-t border-[#1f1f1f]">
        <BlocksFound stats={siteStats} videoUrl={firstEvent?.videoUrl} />
      </SectionWrapper>

      <SectionWrapper id="updates" className="border-t border-[#1f1f1f]">
        <StayUpdated posts={posts} />
      </SectionWrapper>

      <SectionWrapper className="border-t border-[#1f1f1f]">
        <ApplySection />
      </SectionWrapper>

      <SectionWrapper className="border-t border-[#1f1f1f]">
        <CommunitySection />
      </SectionWrapper>

      <SectionWrapper className="border-t border-[#1f1f1f]">
        <EcosystemSection />
      </SectionWrapper>

      <SectionWrapper className="border-t border-[#1f1f1f]">
        <SupporterShowcase supporters={supporters} />
      </SectionWrapper>

      <SectionWrapper id="contact" className="border-t border-[#1f1f1f]">
        <SectionHeader
          title="Contact Us"
          subtitle="Have a question or want to get involved? We'd love to hear from you."
        />
        <ContactForm />
      </SectionWrapper>
    </>
  )
}
