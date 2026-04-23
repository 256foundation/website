import type { TeleHashEvent } from '@/types'

export const teleHashEvents: TeleHashEvent[] = [
  {
    number: 1,
    date: '2025-01-29',
    blockFound: true,
    btcRaised: 3.146,
    blockUrl: 'https://mempool.space/block/0000000000000000000269d52c24ea451225613aab095d90d771d4e29aa96cdd',
    videoUrl: 'https://player.vimeo.com/video/1185734750?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1',
    summary:
      'The inaugural TeleHash event was a landmark moment for the 256 Foundation. Over 8 hours of livestreaming, the global mining community rallied behind the foundation, pointing their hashrate to our Hydrapool instance. Against the odds, we found a Bitcoin block — raising the initial ~$300,000 USD that seeded the four core pillar grants.',
  },
  {
    number: 2,
    date: '2025-05-05',
    blockFound: false,
    summary: 'The second TeleHash marked a milestone for the foundation\'s hardware work — it was the first time a working version of Ember One hashed to the competition. Seeing the open-source ASIC board contribute real hashrate live on stream was proof that the core pillar projects were moving from concept to reality.',
  },
  {
    number: 3,
    date: '2026-01-21',
    blockFound: false,
    summary: 'TeleHash #3 was the most significant event yet — the first time all four core pillar projects ran together in a single working system. Ember One hashboards driven by Libre Board, running Mujina firmware, pointed at a self-hosted Hydrapool instance. Lead developers were up until 1am the night before getting everything stable. For the event, the team built a test bench kit using water cooling blocks from CryoByte Labs, converting the mining rig into a sous vide heater. They cooked a steak live on stream, using Mujina firmware to dynamically adjust mining power output and hold a temperature probe at exactly 101°F. The demo made it undeniably real: open-source mining hardware doing useful work in the world.',
    photos: [
      '/telehash/image-1776972467999.jpg',
      '/telehash/image-1776972484026.jpg',
      '/telehash/image-1776972490699.jpg',
      '/telehash/image-1776972495548.jpg',
      '/telehash/image-1776972500588.jpg',
    ],
  },
]

// Set to an ISO date string when the next TeleHash is scheduled, or null if not yet announced
export const nextEventDate: string | null = '2026-05-19T13:00:00-05:00'

export const nextEventDetails = {
  name: 'Telehash #4',
  displayDate: 'May 19, 2026',
  displayTime: '1:00 – 7:30 PM CDT',
  location: 'Bitcoin Park Austin',
  address: '601 Congress Ave, Suite 250 · Austin, TX',
  meetupUrl: 'https://www.meetup.com/bitcoin-park-austin/events/313866866/',
  inPerson: true,
  online: true,
}
