import type { NavItem } from '@/types'

export const topNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Mission', href: '/mission' },
  {
    label: 'Projects',
    href: '/projects',
    children: [
      { label: 'Ember One', href: '/projects/ember-one' },
      { label: 'Mujina', href: '/projects/mujina' },
      { label: 'Libre Board', href: '/projects/libre-board' },
      { label: 'Hydrapool', href: '/projects/hydrapool' },
      { label: 'Funded Project Log', href: '/projects#log', divider: true },
    ],
  },
  {
    label: 'Community',
    href: '#',
    children: [
      { label: 'Forum', href: 'https://forum.256foundation.org', external: true },
      { label: 'Telegram', href: 'https://t.me/the256foundation', external: true },
      { label: 'Newsletter', href: 'https://256foundation.substack.com', external: true },
      { label: 'POD256', href: 'https://www.pod256.org', external: true },
      { label: 'HasHDash', href: 'https://dash.256f.org', external: true },
      { label: 'TeleHash', href: '/telehash' },
      { label: 'X / Twitter', href: 'https://x.com/256FOUNDATION', external: true },
      { label: 'Nostr', href: 'https://primal.net/p/nprofile1qqsqhk42dz0exfcsln4yqmdkjys0nvd7dqndgacpsa7w7pt7njq2uuss2u9cq', external: true },
    ],
  },
  { label: 'Grants', href: '/grants' },
]

export const footerFoundationLinks: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Mission', href: '/mission' },
  { label: 'Projects', href: '/projects' },
  { label: 'Grants', href: '/grants' },
  { label: 'Donate', href: '/donate' },
  { label: 'TeleHash', href: '/telehash' },
  { label: 'FAQ', href: '/faq' },
]

export const footerCommunityLinks: NavItem[] = [
  { label: 'Forum', href: 'https://forum.256foundation.org', external: true },
  { label: 'Telegram', href: 'https://t.me/the256foundation', external: true },
  { label: 'GitHub', href: 'https://github.com/256foundation', external: true },
  { label: 'HasHDash', href: 'https://dash.256f.org', external: true },
  { label: 'POD256', href: 'https://www.pod256.org', external: true },
  { label: 'Newsletter', href: 'https://256foundation.substack.com', external: true },
]
