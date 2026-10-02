import { generatePageMetadata } from '@/lib/metadata'
import { teleHashEvents, nextEventDate, nextEventEndDate, nextEventDetails } from '@/data/telehash'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Eyebrow from '@/components/ui/Eyebrow'
import TextLink from '@/components/ui/TextLink'
import Panel from '@/components/ui/Panel'
import TeleHashEventCard from '@/components/telehash/TeleHashEventCard'
import CountdownTimer from '@/components/telehash/CountdownTimer'
import SubstackEmbed from '@/components/shared/SubstackEmbed'
import DecorativeBg from '@/components/ui/DecorativeBg'

export const metadata = generatePageMetadata({
  title: 'Telehash',
  description:
    'Telehash is the 256 Foundation\'s occasional livestream fundraising event — point your hashrate to our pool for a chance to find a Bitcoin block live on stream.',
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
    link: { label: '@256FOUNDATION', href: 'https://x.com/256FOUNDATION' },
  },
  {
    step: '04',
    title: 'Monitor your contribution',
    note: 'Your miner appears on the live leaderboard at dash.256f.org',
    link: { label: 'Open Hashdash', href: 'https://dash.256f.org' },
  },
]

export default function TelehashPage() {
  return (
    <>
      {/* Hero + event status */}
      <SectionWrapper decorative className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <DecorativeBg glowPosition="50% 0%" gridOpacity={0.07} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-stretch">
          <div className="max-w-2xl">
            <Eyebrow className="mb-4">Telehash</Eyebrow>
            <h1 className="font-display font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase mb-6">
              Mine for the Mission
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
              Telehash is the 256 Foundation&apos;s occasional fundraising event: held a few times a
              year, the team gathers in person and livestreams as the global Bitcoin mining community
              points their hashrate to our Hydrapool instance running in solo mining mode.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              If a block is found during the stream, all block reward proceeds go directly to the
              foundation to fund more open-source Bitcoin mining development. On our very first
              Telehash, we found a block — raising the initial ~$300,000 that launched the organization.
            </p>
          </div>

          {/* Event status panel — fills the hero height, anchored header + CTA */}
          <Panel
            label={nextEventDate ? 'Next Event' : 'Event Status'}
            fullHeight
            footer={{ label: 'View Events Calendar', href: 'https://forum.256foundation.org/upcoming-events/', external: true }}
            status={
              nextEventDate ? (
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3b1445] dark:bg-[#c084d8] animate-pulse" />
                  Scheduled
                </span>
              ) : undefined
            }
          >
              {nextEventDate ? (
                <>
                  <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl uppercase mb-4">
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
                  <div className="flex flex-wrap gap-2 mb-6">
                    {nextEventDetails.inPerson && <Badge status="in-person" />}
                    {nextEventDetails.online && <Badge status="online" />}
                  </div>
                  <CountdownTimer targetDate={nextEventDate} endDate={nextEventEndDate} />
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button variant="primary" href={nextEventDetails.meetupUrl} external>
                      RSVP on Meetup →
                    </Button>
                    <Button variant="outlined" href="https://x.com/256FOUNDATION" external>
                      Follow on X →
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 flex-col justify-center">
                  <p className="font-display font-bold text-gray-900 dark:text-white text-xl sm:text-2xl uppercase mb-3">
                    No event scheduled
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
                    Telehash runs a few times a year. Dates are announced on the events calendar,
                    newsletter, and X.
                  </p>
                </div>
              )}
          </Panel>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {participationSteps.map((s) => (
            <Card key={s.step} className="p-4">
              <div className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-2xl opacity-40 mb-3">
                {s.step}
              </div>
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm uppercase mb-2">{s.title}</h3>
              {s.code && (
                <code className="block bg-gray-100 dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#2a2a2a] rounded-none px-2 py-2 font-mono text-gray-800 dark:text-gray-100 text-[9px] mt-2 mb-2 break-all">
                  {s.code}
                </code>
              )}
              {s.note && <p className="text-gray-600 dark:text-gray-400 text-xs">{s.note}</p>}
              {s.link && (
                <TextLink href={s.link.href} external arrow className="mt-1">
                  {s.link.label}
                </TextLink>
              )}
            </Card>
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
          <Button
            variant="outlined"
            href="https://forum.256foundation.org/upcoming-events/"
            external
            className="mb-6"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            View Events Calendar →
          </Button>
          <SubstackEmbed />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" href="/donate">
              Donate →
            </Button>
            <Button variant="outlined" size="lg" href="/contact">
              Get in touch →
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
