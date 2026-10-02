import { BITCOIN_ADDRESS, LIGHTNING_ADDRESS, ZAPRITE_URL } from '@/data/donate'
import { surface } from '@/lib/tokens'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import TextLink from '@/components/ui/TextLink'

export default function DonateCards() {
  return (
    <div>
      <Eyebrow className="mb-10">Support the Mission</Eyebrow>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 dark:bg-[#3b1445]/30">
        {/* Panel A -- Money */}
        <div className={`${surface('raised')} p-8 lg:p-10 group hover:shadow-[0_0_28px_rgba(59,20,69,0.2)] dark:hover:shadow-[0_0_28px_rgba(192,132,216,0.12)] transition-all duration-300 relative overflow-hidden`}>
          {/* Corner bracket decoration */}
          <div className="absolute top-0 right-0 w-16 h-[2px] bg-[#3b1445]/40 group-hover:bg-[#3b1445] dark:bg-[#5c2070]/50 dark:group-hover:bg-[#c084d8]/80 transition-colors duration-300" />
          <div className="absolute top-0 right-0 w-[2px] h-16 bg-[#3b1445]/40 group-hover:bg-[#3b1445] dark:bg-[#5c2070]/50 dark:group-hover:bg-[#c084d8]/80 transition-colors duration-300" />

          <div className="text-[#3b1445]/50 dark:text-[#c084d8]/40 mb-6 select-none group-hover:text-[#3b1445]/80 dark:group-hover:text-[#c084d8]/70 transition-colors duration-300">
            <svg viewBox="0 0 24 24" className="w-14 h-14" fill="currentColor" aria-hidden="true">
              <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.415-.614.32.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.236-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z" />
            </svg>
          </div>
          <h3 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-3 uppercase">
            Fund the Mission
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
            Bitcoin on-chain, Lightning, or credit card via Zaprite. Directly funds the core
            contributors building open-source Bitcoin mining infrastructure. Tax-deductible 501(c)(3).
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b1445] dark:bg-[#c084d8]" />
            Tax deductible &middot; BTC + Lightning + Credit Card
          </div>
          <Button variant="outlined" href={ZAPRITE_URL} external>
            Donate Now →
          </Button>
          <TextLink href="/donate#direct" className="mt-4 block">
            Or send Bitcoin directly →
          </TextLink>
        </div>

        {/* Panel B -- Hashrate */}
        <div className={`${surface('raised')} p-8 lg:p-10 group hover:shadow-[0_0_28px_rgba(59,20,69,0.2)] dark:hover:shadow-[0_0_28px_rgba(192,132,216,0.12)] transition-all duration-300 relative overflow-hidden`}>
          {/* Corner bracket decoration */}
          <div className="absolute top-0 right-0 w-16 h-[2px] bg-[#3b1445]/40 group-hover:bg-[#3b1445] dark:bg-[#5c2070]/50 dark:group-hover:bg-[#c084d8]/80 transition-colors duration-300" />
          <div className="absolute top-0 right-0 w-[2px] h-16 bg-[#3b1445]/40 group-hover:bg-[#3b1445] dark:bg-[#5c2070]/50 dark:group-hover:bg-[#c084d8]/80 transition-colors duration-300" />

          <div className="font-mono text-[#3b1445]/30 dark:text-[#c084d8]/25 text-6xl font-bold leading-none mb-6 select-none group-hover:text-[#3b1445]/60 dark:group-hover:text-[#c084d8]/50 transition-colors duration-300">
            &#9889;
          </div>
          <h3 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-3 uppercase">
            Donate Hashrate
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
            Point your Bitcoin miner at our Hydrapool instance. If we find a block, all proceeds
            go to the foundation. Every hash counts toward open-source mining.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b1445] dark:bg-[#c084d8]" />
            No registration &middot; Works with any ASIC &middot; Stratum V1/V2
          </div>
          <Button variant="outlined" href="/donate#hashrate">
            Setup Instructions →
          </Button>
        </div>
      </div>
    </div>
  )
}
