import TextLink from '@/components/ui/TextLink'
import { generatePageMetadata } from '@/lib/metadata'
import { getGrantLogEntries } from '@/lib/grantLog'
import FundingAnnouncements from '@/components/grants/FundingAnnouncements'
import PageCTA from '@/components/shared/PageCTA'
import JsonLd from '@/components/shared/JsonLd'
import { breadcrumbJsonLd } from '@/lib/agentSeo'

export const metadata = generatePageMetadata({
  title: 'All funding announcements',
  description:
    'Every grant the 256 Foundation has announced, newest first, drawn from our newsroom.',
  path: '/grants/announcements',
  ogImage: '/og/og-grant-announcements.png',
})

export default function GrantAnnouncementsArchivePage() {
  const announcements = getGrantLogEntries()

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Grants', path: '/grants' },
          { name: 'Funding announcements', path: '/grants/announcements' },
        ])}
      />
      <FundingAnnouncements
        title="All funding announcements"
        entries={announcements}
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
