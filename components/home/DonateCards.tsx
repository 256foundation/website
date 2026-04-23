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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 dark:bg-[#3b1445]/30">
        {/* Panel A -- Money */}
        <div className="bg-white dark:bg-[#1e1028] p-8 lg:p-10 group hover:shadow-[0_0_28px_rgba(59,20,69,0.2)] dark:hover:shadow-[0_0_28px_rgba(192,132,216,0.12)] transition-all duration-300 relative overflow-hidden">
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
        <div className="bg-white dark:bg-[#1e1028] p-8 lg:p-10 group hover:shadow-[0_0_28px_rgba(59,20,69,0.2)] dark:hover:shadow-[0_0_28px_rgba(192,132,216,0.12)] transition-all duration-300 relative overflow-hidden">
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
