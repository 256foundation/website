import { generatePageMetadata } from '@/lib/metadata'
import { teleHashEvents, nextEventDate } from '@/data/telehash'
import SectionWrapper from '@/components/ui/SectionWrapper'
import TeleHashEventCard from '@/components/telehash/TeleHashEventCard'
import CountdownTimer from '@/components/telehash/CountdownTimer'
import SubstackEmbed from '@/components/shared/SubstackEmbed'
import DecorativeBg from '@/components/ui/DecorativeBg'

export const metadata = generatePageMetadata({
  title: 'Telehash',
  description:
    'Telehash is the 256 Foundation\'s semi-annual livestream fundraising event — point your hashrate to our pool for a chance to find a Bitcoin block live on stream.',
  path: '/telehash',
})

const participationSteps = [
  {
    step: '01',
    title: 'Set your Pool URL',
    code: 'stratum+tcp://pool.256foundation.org:3333',
  },
  {
    step: '02',
    title: 'Set your Worker name',
    code: 'your_npub.bitaxe-1',
    note: 'Replace "your_npub" with your Nostr pubkey or any identifier',
  },
  {
    step: '03',
    title: 'Tune into the livestream',
    note: 'Watch live on X (@256FOUNDATION) during the event',
  },
  {
    step: '04',
    title: 'Monitor your contribution',
    note: 'Your miner appears at dash.256f.org',
    link: { label: 'Open HasHDash &rarr;', href: 'https://dash.256f.org' },
  },
]

export default function TelehashPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper decorative className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <DecorativeBg glowPosition="50% 0%" gridOpacity={0.07} />
        <div className="max-w-3xl">
          <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-4">
            Telehash
          </p>
          <h1 className="font-display font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase mb-6">
            Mine for the Mission
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
            Telehash is the 256 Foundation&apos;s semi-annual fundraising event — an 8-hour
            livestream where the global Bitcoin mining community points their hashrate to our
            Hydrapool instance running in solo mining mode.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            If a block is found during the stream, all block reward proceeds go directly to the
            foundation to fund more open-source Bitcoin mining development. On our very first
            Telehash, we found a block — raising the initial ~$300,000 that launched the organization.
          </p>
        </div>
      </SectionWrapper>

      {/* Countdown */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]" tight>
        <div className="max-w-2xl mx-auto">
          <CountdownTimer targetDate={nextEventDate} />
        </div>
      </SectionWrapper>

      {/* How to participate */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-8">
          How to Participate
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mb-6">
          {participationSteps.map((s) => (
            <div key={s.step} className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-5">
              <div className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-2xl opacity-40 mb-3">
                {s.step}
              </div>
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm uppercase mb-2">{s.title}</h3>
              {s.code && (
                <code className="block bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#1f1f1f] rounded-none px-3 py-2 font-mono text-[#00FF41] text-xs mt-2 mb-2 break-all">
                  {s.code}
                </code>
              )}
              {s.note && <p className="text-gray-600 dark:text-gray-400 text-xs">{s.note}</p>}
              {s.link && (
                <a
                  href={s.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs hover:underline mt-1 inline-block"
                  dangerouslySetInnerHTML={{ __html: s.link.label }}
                />
              )}
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Past events */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-8">
          Past Events
        </h2>
        <div className="space-y-8">
          {[...teleHashEvents].reverse().map((event) => (
            <TeleHashEventCard key={event.number} event={event} />
          ))}
        </div>
      </SectionWrapper>

      {/* Stay updated */}
      <SectionWrapper>
        <div className="max-w-lg">
          <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl uppercase mb-4">
            Get Notified About the Next Telehash
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
            Subscribe to the 256 Foundation newsletter or follow us on X to be the first to know
            when the next Telehash event is announced.
          </p>
          <SubstackEmbed />
        </div>
      </SectionWrapper>
    </>
  )
}
