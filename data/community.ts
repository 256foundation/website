import type { CommunityChannel, CommunityProject } from '@/types'

/**
 * Hero carousel photos for /community. Seeded with the TeleHash event photos as
 * placeholders — drop real community shots in /public/community and swap these.
 */
export const communityHeroPhotos: string[] = [
  '/community/hero-01.jpg',
  '/community/hero-02.jpg',
  '/community/hero-03.jpg',
  '/community/hero-04.jpg',
  '/community/hero-05.jpg',
]

/** Where the community lives. Every card links out; the page does not mirror content. */
export const communityChannels: CommunityChannel[] = [
  {
    label: 'Forum',
    description: 'Public conversation and project questions.',
    href: 'https://forum.256foundation.org',
    external: true,
  },
  {
    label: 'Developer Calls',
    description: 'Dedicated time with lead maintainers.',
    href: 'https://forum.256foundation.org/upcoming-events/',
    external: true,
  },
  {
    label: 'Group Chat',
    description: 'Real-time community chat.',
    href: 'https://t.me/the256foundation',
    external: true,
  },
  {
    label: 'Nostr',
    description: 'Censorship-resistant feed.',
    href: 'https://primal.net/p/nprofile1qqsqhk42dz0exfcsln4yqmdkjys0nvd7dqndgacpsa7w7pt7njq2uuss2u9cq',
    external: true,
  },
  {
    label: 'X / Twitter',
    description: 'News and announcements.',
    href: 'https://x.com/256FOUNDATION',
    external: true,
  },
  {
    label: 'Hashdash',
    description: 'Live pool and hashrate dashboard.',
    href: 'https://dash.256f.org',
    external: true,
  },
]

/**
 * Community-directed projects run a restricted fund of their own; the community
 * directs it and the board approves every allocation. Funds narrate on /our-work.
 */
export const communityDirectedProjects: CommunityProject[] = [
  {
    name: 'Open Source Miners United',
    abbr: 'OSMU',
    description: 'A global community building open-source mining hardware and software.',
    href: 'https://osmu.wiki',
    logo: '/ecosystem/osmu.png',
    relationship: 'community-directed',
  },
  {
    name: 'Hashrate Heatpunks',
    abbr: 'HEATPUNKS',
    description: 'Mining heat is a product, not a problem.',
    href: 'https://heatpunks.org',
    logo: '/ecosystem/heatpunks.png',
    relationship: 'community-directed',
  },
]

/** Ecosystem projects the Foundation serves but does not direct. */
export const ecosystemProjects: CommunityProject[] = [
  {
    name: 'Bitaxe',
    abbr: 'BITAXE',
    description: 'The first fully open-source Bitcoin ASIC miner.',
    href: 'https://bitaxe.org',
    logo: '/ecosystem/bitaxe.png',
    relationship: 'we-serve',
  },
  {
    name: 'Jua Kali',
    abbr: 'JUA KALI',
    description: 'Open hardware that mines from DC power, solar and batteries, no grid.',
    href: 'https://github.com/GridlessCompute/Jua-Kali-Miner',
    logo: '/ecosystem/jua-kali.jpg',
    relationship: 'we-serve',
  },
  {
    name: 'ASIC-rs',
    abbr: 'ASIC-RS',
    description: 'An open Rust library for talking to mining ASICs.',
    href: 'https://256foundation.github.io/asic-rs/',
    logoDark: '/asic-rs-logo/dark/dark-asicrs-logo-no-text.svg',
    logoLight: '/asic-rs-logo/light/asicrs-logo-no-text.svg',
    relationship: 'we-serve',
  },
  {
    name: 'HashScope',
    abbr: 'HASHSCOPE',
    description: 'An open analyzer for how mining pools behave.',
    href: 'https://github.com/256foundation/HashScope',
    logoDark: '/ecosystem/Hashscope_square_dark.png',
    logoLight: '/ecosystem/Hashscope_square_light.png',
    relationship: 'we-serve',
  },
]

/** The two places the page points: conversation and code. */
export const communityClose = [
  {
    label: 'Conversation',
    description: 'Public conversation and project questions. Support, discussion, and dev-call threads.',
    links: [
      { label: 'Forum →', href: 'https://forum.256foundation.org', external: true },
      { label: 'Telegram →', href: 'https://t.me/the256foundation', external: true },
    ],
  },
  {
    label: 'Code',
    description: 'Code, and anything versioned alongside it. Repos, issues, discussions, and PRs.',
    links: [
      { label: 'GitHub →', href: 'https://github.com/256foundation', external: true },
    ],
  },
]
