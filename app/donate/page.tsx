import { generatePageMetadata } from '@/lib/metadata'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'
import DecorativeBg from '@/components/ui/DecorativeBg'

export const metadata = generatePageMetadata({
  title: 'Donate',
  description:
    'Support the open-source Bitcoin mining ecosystem. Donate Bitcoin, fiat, or hashrate to the 256 Foundation.',
  path: '/donate',
})

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
    link: { label: 'Open Hashdash &rarr;', href: 'https://dash.256f.org' },
  },
]

export default function DonatePage() {
  const zapriteUrl = process.env.NEXT_PUBLIC_ZAPRITE_URL ?? '#'

  return (
    <>
      {/* Hero */}
      <SectionWrapper decorative className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <DecorativeBg glowPosition="50% 0%" gridOpacity={0.07} />
        <div className="max-w-3xl">
          <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-4">
            Donate
          </p>
          <h1 className="font-display font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase mb-6">
            Fund the Open-Source Mining Revolution
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            The 256 Foundation is a 100% passthrough nonprofit. Every dollar or sat you donate goes
            directly to the developers and project managers building the open-source Bitcoin mining stack.
          </p>
        </div>
      </SectionWrapper>

      {/* 501c3 info */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]" tight>
        <div className="bg-gray-50 dark:bg-[#242424] border border-[#3b1445]/40 dark:border-[#5c2070]/40 rounded-none p-6 max-w-2xl">
          <div className="flex items-start gap-4">
            <div className="text-[#3b1445] dark:text-[#c084d8] text-2xl shrink-0">&#9878;</div>
            <div>
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase mb-2">
                501(c)(3) Nonprofit — Tax Deductible
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                The 256 Foundation is a fully approved 501(c)(3) nonprofit organization.
                Qualifying financial donations are tax-deductible to the extent permitted by US law.
                Please consult your tax advisor. {/* TODO: Add EIN number here */}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Donate money */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-4">
          Donate with Money
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6 max-w-2xl">
          We accept Bitcoin (on-chain and Lightning Network) and credit/debit card payments
          processed securely via Zaprite.
        </p>
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none px-4 py-2">
            <span className="text-[#3b1445] dark:text-[#c084d8]">&#8383;</span>
            <span className="font-mono text-gray-600 dark:text-gray-300 text-sm">Bitcoin On-Chain</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none px-4 py-2">
            <span className="text-[#3b1445] dark:text-[#c084d8]">&#9889;</span>
            <span className="font-mono text-gray-600 dark:text-gray-300 text-sm">Lightning Network</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none px-4 py-2">
            <span className="text-[#00FF41]">&#128179;</span>
            <span className="font-mono text-gray-600 dark:text-gray-300 text-sm">Credit / Debit Card</span>
          </div>
        </div>
        <Button
          variant="primary"
          size="lg"
          href={zapriteUrl}
          external={zapriteUrl !== '#'}
        >
          Donate Now via Zaprite
        </Button>
      </SectionWrapper>

      {/* Donate hashrate */}
      <SectionWrapper id="hashrate">
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-4">
          Donate Hashrate
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-3 max-w-2xl">
          Point your Bitcoin mining hardware to the 256 Foundation&apos;s Hydrapool instance.
          We run our pool in solo mining mode — if a block is found, all proceeds go directly
          to the foundation. Your hashrate costs you nothing but electricity, and it helps
          secure the network while supporting open-source development.
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 max-w-2xl">
          You can donate hashrate any time — and during{' '}
          <a href="/telehash" className="text-[#3b1445] dark:text-[#c084d8] hover:underline">Telehash events</a>,
          the entire community points hashrate together for a chance to find a block live on stream.
        </p>

        <div className="space-y-4 max-w-2xl mb-8">
          {hashrateSteps.map((s) => (
            <div key={s.step} className="flex gap-4 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-5">
              <span className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-lg opacity-50 shrink-0 w-8">
                {s.step}
              </span>
              <div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm uppercase mb-1">{s.title}</h3>
                {s.code && (
                  <code className="block bg-[#2d0f36] border border-[#5c2070]/50 rounded-none px-3 py-2 font-mono text-[#00FF41] text-xs my-2 break-all">
                    {s.code}
                  </code>
                )}
                <p className="text-gray-600 dark:text-gray-400 text-sm">{s.description}</p>
                {s.link && (
                  <a
                    href={s.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[#3b1445] dark:text-[#c084d8] text-sm hover:underline mt-1 inline-block"
                    dangerouslySetInnerHTML={{ __html: s.link.label }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href="https://dash.256f.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-transparent text-[#3b1445] dark:text-[#c084d8] font-mono font-bold text-sm rounded-none border border-[#3b1445]/50 dark:border-[#5c2070]/50 hover:border-[#3b1445] dark:hover:border-[#5c2070] hover:bg-[#3b1445]/5 transition-all"
          >
            View Hashdash &rarr;
          </a>
          <a
            href="/telehash"
            className="inline-flex items-center justify-center px-5 py-2.5 text-gray-600 dark:text-gray-300 font-mono text-sm rounded-none border border-gray-200 dark:border-[#1f1f1f] hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-all"
          >
            Learn About Telehash &rarr;
          </a>
        </div>
      </SectionWrapper>
    </>
  )
}
