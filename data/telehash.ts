import type { TeleHashEvent } from '@/types'

export const teleHashEvents: TeleHashEvent[] = [
  {
    number: 1,
    date: '2024-06-01', // TODO: Replace with real date
    blockFound: true,
    btcRaised: 3.0,
    videoUrl: 'https://player.vimeo.com/video/1185734750?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1',
    summary:
      'The inaugural TeleHash event was a landmark moment for the 256 Foundation. Over 8 hours of livestreaming, the global mining community rallied behind the foundation, pointing their hashrate to our Hydrapool instance. Against the odds, we found a Bitcoin block — raising the initial ~$300,000 USD that seeded the four core pillar grants.',
  },
  {
    number: 2,
    date: '2024-12-01', // TODO: Replace with real date
    blockFound: false,
    summary: 'The second TeleHash event brought together an even larger community of hashrate supporters. The event demonstrated the growing momentum behind the open-source mining movement.', // TODO: Update with real results
  },
  {
    number: 3,
    date: '2025-06-01', // TODO: Replace with real date
    blockFound: false,
    summary: 'The third TeleHash event continued to grow the foundation\'s community and hashrate participation.', // TODO: Update with real results
  },
]

// Set to an ISO date string when the next TeleHash is scheduled, or null if not yet announced
export const nextEventDate: string | null = null
