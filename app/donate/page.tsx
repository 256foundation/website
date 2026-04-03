import { generatePageMetadata } from '@/lib/metadata'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'

export const metadata = generatePageMetadata({
  title: 'Donate',
  description:
    'Support the open-source Bitcoin mining ecosystem. Donate Bitcoin, fiat, or hashrate to the 256 Foundation.',
  path: '/donate',
})

const hashrateSteps = [
  {
    step: '01',
    title: 'Open your miner\'s configuration panel',
    description: 'Access your mining hardware\'s web interface or configuration file.',
  },
  {
    step: '02',
    title: 'Set the Pool URL',
    code: 'stratum+tcp://pool.256foundation.org:3333',
    description: 'Enter this as your primary pool address.',
  },
  {
    step: '03',
    title: 'Set your Worker name',
    code: 'your_npub.bitaxe-1',
    description:
      'Replace "your_npub" with your Nostr public key or any identifier you choose. This is how your contribution shows up on HasHDash.',
  },
  {
    step: '04',
    title: 'Save and restart your miner',
    description: 'Apply your settings and allow your miner to connect to the pool.',
  },
  {
    step: '05',
    title: 'Verify your contribution',
    description: 'Check that your miner appears on HasHDash within a few minutes.',
    link: { label: 'Open HasHDash &rarr;', href: 'https://dash.256f.org' },
  },
]

export default function DonatePage() {
  const zapriteUrl = process.env.NEXT_PUBLIC_ZAPRITE_URL ?? '#'

  return (
    <>
      {/* Hero */}
      <SectionWrapper className="border-b border-[#1f1f1f]">
        <div className="max-w-3xl">
          <p className="font-mono text-[#7C3AED] text-xs tracking-widest uppercase mb-4">
            Donate
          </p>
          <h1 className="font-display font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase mb-6">
            Fund the Open-Source Mining Revolution
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            The 256 Foundation is a 100% passthrough nonprofit. Every dollar you donate goes
            directly to the developers building the open-source Bitcoin mining stack. Nothing is
            taken for overhead or administration.
          </p>
        </div>
      </SectionWrapper>

      {/* 501c3 info */}
      <SectionWrapper className="border-b border-[#1f1f1f]" tight>
        <div className="bg-[#111111] border border-[#7C3AED]/20 rounded-none p-6 max-w-2xl">
          <div className="flex items-start gap-4">
            <div className="text-[#7C3AED] text-2xl shrink-0">&#9878;</div>
            <div>
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase mb-2">
                501(c)(3) Nonprofit — Tax Deductible
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                The 256 Foundation is a fully approved 501(c)(3) nonprofit organization.
                Qualifying financial donations are tax-deductible to the extent permitted by US law.
                Please consult your tax advisor. {/* TODO: Add EIN number here */}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Donate money */}
      <SectionWrapper className="border-b border-[#1f1f1f]">
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-4">
          Donate with Money
        </h2>
        <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-2xl">
          We accept Bitcoin (on-chain and Lightning Network) and credit/debit card payments
          processed securely via Zaprite.
        </p>
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <div className="flex items-center gap-2 bg-[#111111] border border-[#1f1f1f] rounded-none px-4 py-2">
            <span className="text-[#7C3AED]">&#8383;</span>
            <span className="font-mono text-gray-300 text-sm">Bitcoin On-Chain</span>
          </div>
          <div className="flex items-center gap-2 bg-[#111111] border border-[#1f1f1f] rounded-none px-4 py-2">
            <span className="text-[#7C3AED]">&#9889;</span>
            <span className="font-mono text-gray-300 text-sm">Lightning Network</span>
          </div>
          <div className="flex items-center gap-2 bg-[#111111] border border-[#1f1f1f] rounded-none px-4 py-2">
            <span className="text-[#00FF41]">&#128179;</span>
            <span className="font-mono text-gray-300 text-sm">Credit / Debit Card</span>
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
        <p className="text-gray-400 text-base leading-relaxed mb-3 max-w-2xl">
          Point your Bitcoin mining hardware to the 256 Foundation&apos;s Hydrapool instance.
          We run our pool in solo mining mode — if a block is found, all proceeds go directly
          to the foundation. Your hashrate costs you nothing but electricity, and it helps
          secure the network while supporting open-source development.
        </p>
        <p className="text-gray-400 text-sm mb-8 max-w-2xl">
          You can donate hashrate any time — and during{' '}
          <a href="/telehash" className="text-[#7C3AED] hover:underline">TeleHash events</a>,
          the entire community points hashrate together for a chance to find a block live on stream.
        </p>

        <div className="space-y-4 max-w-2xl mb-8">
          {hashrateSteps.map((s) => (
            <div key={s.step} className="flex gap-4 bg-[#111111] border border-[#1f1f1f] rounded-none p-5">
              <span className="font-mono font-bold text-[#7C3AED] text-lg opacity-50 shrink-0 w-8">
                {s.step}
              </span>
              <div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm uppercase mb-1">{s.title}</h3>
                {s.code && (
                  <code className="block bg-[#0a0a0a] border border-[#1f1f1f] rounded-none px-3 py-2 font-mono text-[#00FF41] text-sm my-2">
                    {s.code}
                  </code>
                )}
                <p className="text-gray-400 text-sm">{s.description}</p>
                {s.link && (
                  <a
                    href={s.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[#7C3AED] text-sm hover:underline mt-1 inline-block"
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
            className="inline-flex items-center justify-center px-5 py-2.5 bg-transparent text-[#7C3AED] font-mono font-bold text-sm rounded-none border border-[#7C3AED]/40 hover:border-[#7C3AED] hover:bg-[#7C3AED]/5 transition-all"
          >
            View HasHDash &rarr;
          </a>
          <a
            href="/telehash"
            className="inline-flex items-center justify-center px-5 py-2.5 text-gray-300 font-mono text-sm rounded-none border border-[#1f1f1f] hover:border-[#7C3AED]/40 hover:text-[#7C3AED] transition-all"
          >
            Learn About TeleHash &rarr;
          </a>
        </div>
      </SectionWrapper>
    </>
  )
}
