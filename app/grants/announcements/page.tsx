import TextLink from '@/components/ui/TextLink'
import { generatePageMetadata } from '@/lib/metadata'
import { getGrantAnnouncements } from '@/lib/newsroom'
import FundingAnnouncements from '@/components/grants/FundingAnnouncements'
import PageCTA from '@/components/shared/PageCTA'

export const metadata = generatePageMetadata({
  title: 'All funding announcements',
  description:
    'Every grant the 256 Foundation has announced, newest first, drawn from our newsroom.',
  path: '/grants/announcements',
})

export default function GrantAnnouncementsArchivePage() {
  const announcements = getGrantAnnouncements()

  return (
    <>
      <FundingAnnouncements
        title="All funding announcements"
        posts={announcements}
        backLink={
          <TextLink href="/grants#funding-announcements">← Back to Grants</TextLink>
        }
      />

      <PageCTA
        kicker="Fund the Next One"
        title="Every announcement here started as an idea."
        body="Back the work, or bring us the next project worth funding."
        donateLabel="Fund a grant →"
      />
    </>
  )
}
