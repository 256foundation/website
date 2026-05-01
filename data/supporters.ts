import type { Supporter } from '@/types'

// Tier 1 display label: "Block Founders"  — top-tier donors
// Tier 2 display label: "Hash Champions"  — mid-tier donors
// Tier 3 display label: "Satoshi Friends" — community donors
export const supporters: Supporter[] = [
  // Tier 1 — Block Founders
  { name: 'Block #881423', image: '/supporters/tier1/881423.jpg', link: 'https://mempool.space/block/881423', tier: 1 },
  { name: 'HRF', image: '/supporters/tier1/hrf.png', link: 'https://hrf.org', tier: 1 },
  { name: 'OSMU', image: '/supporters/tier1/osmu.png', link: 'https://osmu.wiki', tier: 1 },
  { name: 'OpenSats', image: '/supporters/tier1/opensats.png', link: 'https://opensats.org', tier: 1 },
  { name: 'Proto', image: '/supporters/tier1/proto.png', link: 'https://proto.xyz', tier: 1 },
  { name: 'MARA Foundation', image: '/supporters/tier1/MF.png', link: 'https://foundation.mara.com', tier: 1 },

  // Tier 2 — Hash Champions
  { name: 'Foundry', image: '/supporters/tier2/Foundry.png', link: 'https://foundrydigital.com', tier: 2 },
  { name: 'Heatbit', image: '/supporters/tier2/Heatbit.png', link: 'https://heatbit.com', tier: 2 },
  { name: 'Anonymous', image: '/supporters/tier2/anonymous-001.png', link: '#', tier: 2 },
  { name: 'Anonymous', image: '/supporters/tier2/anonymous-002.png', link: '#', tier: 2 },
  { name: 'Anonymous', image: '/supporters/tier2/anonymous-003.png', link: '#', tier: 2 },

  // Tier 3 — Satoshi Friends
  { name: 'Bitkite', image: '/supporters/tier3/bitkite.png', link: 'https://x.com/bitkite', tier: 3 },
  { name: 'Econoalchemist', image: '/supporters/tier3/econoalchemist.png', link: 'https://econoalchemist.com', tier: 3 },
  { name: 'Exergy', image: '/supporters/tier3/exergy.png', link: 'https://exergyheat.com', tier: 3 },
  { name: 'SoloBlock', image: '/supporters/tier3/soloblock.png', link: 'https://soloblock.io', tier: 3 },
  { name: 'Anonymous', image: '/supporters/tier3/anonymous-004.png', link: '#', tier: 3 },
  { name: 'Anonymous', image: '/supporters/tier3/anonymous-005.png', link: '#', tier: 3 },
  { name: 'Anonymous', image: '/supporters/tier3/anonymous-006.png', link: '#', tier: 3 },
]
