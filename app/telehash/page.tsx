import { generatePageMetadata } from '@/lib/metadata'
import { teleHashEvents, nextEventDate, nextEventEndDate, nextEventDetails } from '@/data/telehash'
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
    title: 'Set your Stratum Username',
    code: 'username.workername',
    note: 'Replace with your website, X handle, Nostr npub, or any identifier.',
  },
  {
    step: '03',
    title: 'Tune into the livestream',
    note: 'Watch live on X (@256FOUNDATION) during the event',
    link: { label: '@256FOUNDATION &rarr;', href: 'https://x.com/256FOUNDATION' },
  },
  {
    step: '04',
    title: 'Monitor your contribution',
    note: 'Your miner appears on the live leaderboard at dash.256f.org',
    link: { label: 'Open Hashdash &rarr;', href: 'https://dash.256f.org' },
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
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="max-w-2xl mx-auto">
          {nextEventDate && (
            <div className="mb-6">
              <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-3">
                Next Event
              </p>
              <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-4">
                {nextEventDetails.name}
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 shrink-0 text-[#3b1445] dark:text-[#c084d8]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {nextEventDetails.displayDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 shrink-0 text-[#3b1445] dark:text-[#c084d8]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {nextEventDetails.displayTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 shrink-0 text-[#3b1445] dark:text-[#c084d8]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {nextEventDetails.location} · {nextEventDetails.address}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {nextEventDetails.inPerson && (
                  <span className="font-mono text-xs px-2 py-0.5 border border-[#00FF41]/40 text-[#00FF41] bg-[#00FF41]/10">In Person</span>
                )}
                {nextEventDetails.online && (
                  <span className="font-mono text-xs px-2 py-0.5 border border-[#3b1445]/40 dark:border-[#5c2070]/40 text-[#3b1445] dark:text-[#c084d8] bg-[#3b1445]/10 dark:bg-[#5c2070]/10">Online</span>
                )}
              </div>
            </div>
          )}
          <CountdownTimer targetDate={nextEventDate} endDate={nextEventEndDate} />
          {nextEventDate && (
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={nextEventDetails.meetupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#3b1445] text-white font-mono font-bold text-sm px-5 py-2.5 hover:bg-[#2d0f36] transition-colors shadow-[0_0_20px_rgba(59,20,69,0.35)] hover:shadow-[0_0_28px_rgba(59,20,69,0.5)]"
              >
                RSVP on Meetup →
              </a>
              <a
                href="https://dash.256f.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gray-200 dark:border-[#1f1f1f] text-gray-600 dark:text-gray-400 font-mono text-sm px-5 py-2.5 hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors"
              >
                View Hashdash →
              </a>
              <a
                href="https://x.com/256FOUNDATION"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gray-200 dark:border-[#1f1f1f] text-gray-600 dark:text-gray-400 font-mono text-sm px-5 py-2.5 hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors"
              >
                Follow on X for updates
              </a>
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* How to participate */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-4">
          How to Participate
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-2xl mb-8">
          Username and workername can be anything you want. Use a website URL, X handle, or Nostr npub as your username — your profile pic or favicon will show up on the leaderboard.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {participationSteps.map((s) => (
            <div key={s.step} className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-5">
              <div className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-2xl opacity-40 mb-3">
                {s.step}
              </div>
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm uppercase mb-2">{s.title}</h3>
              {s.code && (
                <code className="block bg-[#2d0f36] dark:bg-[#2d0f36] border border-[#5c2070]/50 rounded-none px-3 py-2 font-mono text-[#00FF41] text-xs mt-2 mb-2 break-all">
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
            Stay in the Loop
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">
            Telehash dates, live podcast recordings, and developer calls are all posted to the
            foundation&apos;s events calendar on the forum. It&apos;s the best single place to follow
            for upcoming events.
          </p>
          <a
            href="https://forum.256foundation.org/upcoming-events/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#3b1445]/50 dark:border-[#5c2070]/50 text-[#3b1445] dark:text-[#c084d8] font-mono text-sm px-4 py-2 hover:bg-[#3b1445]/5 dark:hover:bg-[#5c2070]/10 transition-colors mb-6"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            View Events Calendar →
          </a>
          <SubstackEmbed />
        </div>
      </SectionWrapper>
    </>
  )
}
