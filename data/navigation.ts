import type { NavItem } from '@/types'

export const topNav: NavItem[] = [
  { label: 'Mission', href: '/mission' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Mining Stack', href: '/projects' },
  { label: 'Grants', href: '/grants' },
  { label: 'Community', href: '/community' },
  { label: 'Newsroom', href: '/newsroom' },
]

export const footerFoundationLinks: NavItem[] = [
  { label: 'Mission', href: '/mission' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Mining Stack', href: '/projects' },
  { label: 'Grants', href: '/grants' },
  { label: 'Community', href: '/community' },
  { label: 'Newsroom', href: '/newsroom' },
]

// Supplemental / utility pages, secondary to the primary foundation sections.
export const footerResourcesLinks: NavItem[] = [
  { label: 'Grant announcements', href: '/grants/announcements' },
  { label: 'Telehash', href: '/telehash' },
  { label: 'FAQ', href: '/faq' },
]

export const footerCommunityLinks: NavItem[] = [
  { label: 'GitHub', href: 'https://github.com/256foundation', external: true },
  { label: 'Forum', href: 'https://forum.256foundation.org', external: true },
  { label: 'Group Chat', href: 'https://t.me/the256foundation', external: true },
  { label: 'Events Calendar', href: 'https://forum.256foundation.org/upcoming-events/', external: true },
  { label: 'Hashdash', href: 'https://dash.256f.org', external: true },
  { label: 'POD256', href: 'https://www.pod256.org', external: true },
  { label: 'Newsletter', href: 'https://256foundation.substack.com', external: true },
  { label: 'X / Twitter', href: 'https://x.com/256FOUNDATION', external: true },
  { label: 'Nostr', href: 'https://primal.net/p/nprofile1qqsqhk42dz0exfcsln4yqmdkjys0nvd7dqndgacpsa7w7pt7njq2uuss2u9cq', external: true },
]
