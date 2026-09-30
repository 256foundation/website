import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { getGrantAnnouncements } from '@/lib/newsroom'
import FundingAnnouncements from '@/components/grants/FundingAnnouncements'

export const metadata = generatePageMetadata({
  title: 'All funding announcements',
  description:
    'Every grant the 256 Foundation has announced, newest first, drawn from our newsroom.',
  path: '/grants/announcements',
})

export default function GrantAnnouncementsArchivePage() {
  const announcements = getGrantAnnouncements()

  return (
    <FundingAnnouncements
      title="All funding announcements"
      posts={announcements}
      backLink={
        <Link
          href="/grants#funding-announcements"
          className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs hover:underline"
        >
          ← Back to Grants
        </Link>
      }
    />
  )
}
