import { generatePageMetadata } from '@/lib/metadata'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'
import DecorativeBg from '@/components/ui/DecorativeBg'
import CopyButton from '@/components/ui/CopyButton'
import { BITCOIN_ADDRESS, LIGHTNING_ADDRESS, ZAPRITE_URL } from '@/data/donate'
import { supporters } from '@/data/supporters'
import SupporterShowcase from '@/components/home/SupporterShowcase'
import PageCTA from '@/components/shared/PageCTA'

export const metadata = generatePageMetadata({
  title: 'Donate',
  description:
    'Support the open-source Bitcoin mining ecosystem. Donate Bitcoin, fiat, or hashrate to the 256 Foundation.',
  path: '/donate',
})

/** Neutral code chip — matches the light gray/purple page instead of a dark terminal. */
const codeClass =
  'block bg-gray-100 dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#2a2a2a] rounded-none px-3 py-2 font-mono text-gray-800 dark:text-gray-100 text-xs mb-3 break-all'

const acceptedMethods = ['Credit / Debit Card', 'Bitcoin On-Chain', 'Lightning']

const hashrateSteps = [
  {
    step: '01',
    title: 'Set your Pool URL',
    code: 'stratum+tcp://pool.256foundation.org:3333',
  },
  {
    step: '02',
    title: 'Set your Stratum Username',
    code: 'username.workername',
    description:
      'Username and workername can be anything. Use a website URL, X handle, or Nostr npub — your profile pic or favicon will show up on the leaderboard.',
  },
  {
    step: '03',
    title: 'Save and restart your miner',
    description: 'Apply your settings and allow your miner to connect to the pool.',
  },
  {
    step: '04',
    title: 'Monitor your contribution',
    description: 'Your miner appears on the live leaderboard at dash.256f.org within a few minutes.',
    link: { label: 'Open Hashdash →', href: 'https://dash.256f.org' },
  },
]

export default function DonatePage() {
  return (
    <>
      {/* Hero + primary action — Zaprite button above the fold */}
      <SectionWrapper decorative tight className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <DecorativeBg glowPosition="50% 0%" gridOpacity={0.07} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
          <div>
            <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-4">
              Donate
            </p>
            <h1 className="font-display font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase mb-5">
              Fund the open-source{' '}
              <span className="text-[#3b1445] dark:text-[#c084d8]">mining stack</span>.
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">
              The 256 Foundation is a 501(c)(3) nonprofit funding the core contributors building
              open-source Bitcoin mining infrastructure. Every donation goes straight to the stack.
            </p>
          </div>

          {/* Action box */}
          <div className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
              Give in seconds
            </p>
            <Button
              variant="primary"
              size="lg"
              href={ZAPRITE_URL}
              external
              className="w-full"
            >
              Donate Bitcoin or Fiat →
            </Button>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
              {acceptedMethods.map((method) => (
                <span
                  key={method}
                  className="inline-flex items-center gap-2 font-mono text-xs text-gray-600 dark:text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3b1445] dark:bg-[#c084d8]" />
                  {method}
                </span>
              ))}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mt-5">
              Processed securely by Zaprite. Prefer no processor?{' '}
              <a href="#direct" className="text-[#3b1445] dark:text-[#c084d8] hover:underline">
                Send Bitcoin directly →
              </a>
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Other ways to give — direct on-chain / Lightning */}
      <SectionWrapper id="direct" className="scroll-mt-[130px] border-b border-gray-200 dark:border-[#1f1f1f]">
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-3">
          Send Bitcoin Directly
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8 max-w-2xl">
          No processor, no middleman. Send on-chain or via Lightning, directly to the foundation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {/* Bitcoin On-Chain */}
          <div className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] p-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#3b1445] dark:text-[#c084d8] text-lg">&#8383;</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Bitcoin On-Chain
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">From any Bitcoin wallet</p>
            <code className={codeClass}>{BITCOIN_ADDRESS}</code>
            <CopyButton value={BITCOIN_ADDRESS} />
          </div>

          {/* Lightning */}
          <div className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] p-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#3b1445] dark:text-[#c084d8] text-lg">&#9889;</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Lightning Address
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">Instant, near-zero fees</p>
            <code className={codeClass}>{LIGHTNING_ADDRESS}</code>
            <CopyButton value={LIGHTNING_ADDRESS} />
          </div>
        </div>
      </SectionWrapper>

      {/* Donate hashrate */}
      <SectionWrapper id="hashrate" className="scroll-mt-[130px] border-b border-gray-200 dark:border-[#1f1f1f]">
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-3">
          Donate Hashrate
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8 max-w-2xl">
          Point your miner at our Hydrapool instance. If we find a block, all proceeds go to the
          foundation — it costs you only electricity. During{' '}
          <a href="/telehash" className="text-[#3b1445] dark:text-[#c084d8] hover:underline">
            Telehash events
          </a>{' '}
          the whole community points hashrate together for a chance to find a block live on stream.
        </p>

        <div className="space-y-4 max-w-2xl mb-8">
          {hashrateSteps.map((s) => (
            <div
              key={s.step}
              className="flex gap-4 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-5"
            >
              <span className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-lg opacity-50 shrink-0 w-8">
                {s.step}
              </span>
              <div className="min-w-0">
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm uppercase mb-1">
                  {s.title}
                </h3>
                {s.code && <code className={codeClass}>{s.code}</code>}
                {s.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{s.description}</p>
                )}
                {s.link && (
                  <a
                    href={s.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[#3b1445] dark:text-[#c084d8] text-sm hover:underline mt-1 inline-block"
                  >
                    {s.link.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <Button variant="outlined" size="md" href="https://dash.256f.org" external>
            View Hashdash →
          </Button>
          <Button variant="outlined" size="md" href="/telehash">
            Learn About Telehash →
          </Button>
        </div>
      </SectionWrapper>

      {/* 501(c)(3) note — kept low so it doesn't push the action down */}
      <SectionWrapper tight className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-2xl">
          The 256 Foundation is a fully approved 501(c)(3) nonprofit. Qualifying financial donations
          are tax-deductible to the extent permitted by US law. Please consult your tax advisor.
        </p>
      </SectionWrapper>

      {/* Supporters — logos and the live hashrate leaderboard */}
      <SectionWrapper>
        <SupporterShowcase supporters={supporters} />
      </SectionWrapper>

      <PageCTA
        kicker="Questions About Donating?"
        title="Large gifts, on-chain, or something else."
        body="If you want to give in a way that isn't covered here, or you'd like to talk it through first, get in touch."
        donateLabel="Donate →"
      />
    </>
  )
}
