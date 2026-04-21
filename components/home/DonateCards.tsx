import Link from 'next/link'

export default function DonateCards() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1 h-4 bg-[#3b1445]" />
        <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">
          Support the Mission
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 dark:bg-[#1f1f1f]">
        {/* Panel A -- Money */}
        <div className="bg-gray-50 dark:bg-[#242424] p-8 lg:p-10 group hover:shadow-[0_0_20px_rgba(59,20,69,0.15)] transition-all duration-300 relative overflow-hidden">
          {/* Corner bracket decoration */}
          <div className="absolute top-0 right-0 w-16 h-[2px] bg-[#3b1445]/30 group-hover:bg-[#3b1445]/60 transition-colors" />
          <div className="absolute top-0 right-0 w-[2px] h-16 bg-[#3b1445]/30 group-hover:bg-[#3b1445]/60 transition-colors" />

          <div className="font-mono text-[#3b1445]/60 dark:text-[#c084d8]/60 text-6xl font-bold leading-none mb-6 select-none">
            &#8383;
          </div>
          <h3 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-3 uppercase">
            Fund the Mission
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
            Bitcoin on-chain, Lightning, or credit card via Zaprite. 100% passthrough &mdash; every
            satoshi goes directly to developers. Tax-deductible 501(c)(3).
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-600 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]" />
            Tax deductible &middot; BTC + Lightning + Credit Card
          </div>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1a1a1a] font-mono font-bold text-sm rounded-none hover:bg-gray-100 transition-colors duration-200"
          >
            Donate Now
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        {/* Panel B -- Hashrate */}
        <div className="bg-gray-50 dark:bg-[#242424] p-8 lg:p-10 group hover:shadow-[0_0_20px_rgba(59,20,69,0.15)] transition-all duration-300 relative overflow-hidden">
          {/* Corner bracket decoration */}
          <div className="absolute top-0 right-0 w-16 h-[2px] bg-[#3b1445]/30 group-hover:bg-[#3b1445]/60 transition-colors" />
          <div className="absolute top-0 right-0 w-[2px] h-16 bg-[#3b1445]/30 group-hover:bg-[#3b1445]/60 transition-colors" />

          <div className="font-mono text-[#3b1445]/20 dark:text-[#c084d8]/20 text-6xl font-bold leading-none mb-6 select-none">
            &#9889;
          </div>
          <h3 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-3 uppercase">
            Donate Hashrate
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
            Point your Bitcoin miner at our Hydrapool instance. If we find a block, all proceeds
            go to the foundation. Every hash counts toward open-source mining.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-600 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b1445]" />
            No registration &middot; Works with any ASIC &middot; Stratum V1/V2
          </div>
          <Link
            href="/donate#hashrate"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#3b1445]/50 dark:border-[#5c2070]/50 text-[#3b1445] dark:text-[#c084d8] font-mono font-bold text-sm rounded-none hover:border-[#3b1445] dark:hover:border-[#5c2070] hover:bg-[#3b1445]/5 transition-all duration-200"
          >
            Setup Instructions
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
