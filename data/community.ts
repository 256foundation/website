import type { CommunityChannel, CommunityProject } from '@/types'

/**
 * Hero carousel photos for /community. Real community shots, re-encoded to
 * 1920px WebP in /public/community. Add or reorder here, the carousel cycles
 * the array in order. `hero-03` is held out of the rotation: it is a literal
 * Telehash livestream frame, used as the TelehashFeature card background so the
 * reader sees what an event looks like while the pointer to /telehash sits on it.
 */
export const communityHeroPhotos: string[] = [
  '/community/hero-02.webp',
  '/community/hero-01.webp',
  '/community/hero-04.webp',
  '/community/hero-05.webp',
  '/community/hero-06.webp',
  '/community/hero-07.webp',
  '/community/hero-08.webp',
]

/** Stream frame behind the /community Telehash feature. */
export const telehashFeaturePhoto = '/community/hero-03.webp'

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
    description: 'Where open-source mining hardware gets built.',
    detail: [
      'OSMU is the informal network of developers behind most of the open-source mining hardware and software you know: Bitaxe, NerdAxe, AxeOS, Qaxe, Piaxe and more. Designs anyone can build, modify, and manufacture. No membership, no permission; it is a community, not an organization, and that is the point.',
    ],
    href: 'https://osmu.wiki',
    donateHref: 'https://pay.zaprite.com/pl_pZcAXZuXn2',
    logo: '/ecosystem/osmu.webp',
    relationship: 'community-directed',
  },
  {
    name: 'Hashrate Heatpunks',
    abbr: 'HEATPUNKS',
    description: 'Mining heat is a product, not a problem.',
    detail: [
      'Heatpunks are a community of home and business miners proving that the heat a miner produces is worth something. They build the guides, the standards, and the events that turn wasted heat into working heaters: water heating, space heating, dryers. What started as hobbyists piping miner exhaust through greenhouses is becoming a real industry segment, and Heatpunks are the group organizing it.',
    ],
    href: 'https://heatpunks.org',
    donateHref: 'https://pay.zaprite.com/pl_TFoKMotEqk',
    logo: '/ecosystem/heatpunks.webp',
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
    logo: '/ecosystem/bitaxe.webp',
    relationship: 'we-serve',
  },
  {
    name: 'Jua Kali',
    abbr: 'JUA KALI',
    description: 'Open hardware that mines from DC power, solar and batteries, no grid.',
    href: 'https://github.com/GridlessCompute/Jua-Kali-Miner',
    logo: '/ecosystem/jua-kali.webp',
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
    logoDark: '/ecosystem/Hashscope_square_dark.webp',
    logoLight: '/ecosystem/Hashscope_square_light.webp',
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
