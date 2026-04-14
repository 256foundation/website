import Link from 'next/link'
import PCBBackground from '@/components/ui/PCBBackground'
import Logo from '@/components/ui/Logo'
import { siteStats } from '@/data/stats'

export default function HeroSection() {
  const usdFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 0,
  }).format(siteStats.usdAllocated)

  return (
    <section className="relative min-h-screen flex flex-col justify-center sm:justify-end overflow-hidden bg-white dark:bg-[#1a1a1a]">
      {/* PCB pattern */}
      <PCBBackground animated opacity={0.12} />

      {/* Subtle purple radial gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 60%)' }} />

      {/* Vignette edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,white_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,#1a1a1a_100%)] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-16 pt-4 sm:pt-36">
        {/* Status bar */}
        <div className="flex items-center gap-3 mb-5 sm:mb-12">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00FF41]" style={{ boxShadow: '0 0 8px #00FF41' }} />
          <span className="font-mono text-[#00FF41] text-xs tracking-[0.25em] uppercase">
            Funding Active
          </span>
          <span className="font-mono text-gray-400 dark:text-gray-700 text-xs">&mdash;</span>
          <span className="font-mono text-gray-500 text-xs">
            {siteStats.totalGrantees} active grantees
          </span>
        </div>

        {/* Logo -- main hero anchor */}
        <div className="mb-4 sm:mb-8">
          <h1>
            {/* Square logo on mobile, horizontal on sm+ */}
            <Logo variant="square" height={160} inverted className="sm:hidden rounded-xl" />
            <Logo height={180} inverted className="hidden sm:block max-w-[520px] !rounded-xl" />
          </h1>
        </div>

        {/* Tagline */}
        <p className="font-display font-extrabold text-gray-900 dark:text-white text-3xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase leading-none max-w-3xl mb-4 sm:mb-6">
          Building the open-source Bitcoin mining stack.
        </p>

        {/* Sub-copy */}
        <p className="text-gray-500 text-sm leading-relaxed max-w-md mb-6 sm:mb-12">
          One company controls Bitcoin&apos;s mining infrastructure. We fund developers dismantling
          it &mdash; open hardware, firmware, and pool software that anyone can use, audit, and build upon.
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap items-center gap-4 mb-8 sm:mb-16">
          <Link
            href="/mission"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1a1a1a] font-mono font-bold text-sm rounded-none hover:bg-gray-100 transition-colors duration-200"
          >
            Our Mission
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#7C3AED]/40 text-[#7C3AED] font-mono font-bold text-sm rounded-none hover:border-[#7C3AED] hover:bg-[#7C3AED]/5 transition-all duration-200"
          >
            Donate &rarr;
          </Link>
          <Link
            href="/projects"
            className="font-mono text-gray-500 text-sm hover:text-[#7C3AED] transition-colors duration-200"
          >
            View Projects
          </Link>
        </div>

        {/* Bottom metrics strip */}
        <div className="border-t border-gray-200 dark:border-[#1f1f1f] pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: `${siteStats.btcAllocated}`, unit: 'BTC', label: 'Deployed', color: '#7C3AED' },
            { value: usdFormatted, unit: '', label: 'USD Equivalent', color: '#7C3AED' },
            { value: String(siteStats.totalGrantees), unit: '', label: 'Active Projects', color: '#7C3AED' },
            { value: String(siteStats.blocksFound), unit: '', label: 'Blocks Found', color: '#00FF41' },
          ].map(({ value, unit, label, color }) => (
            <div key={label} className="group">
              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-2xl sm:text-3xl" style={{ color }}>
                  {value}
                </span>
                {unit && (
                  <span className="font-mono text-sm" style={{ color, opacity: 0.6 }}>
                    {unit}
                  </span>
                )}
              </div>
              <div className="font-mono text-gray-500 dark:text-gray-600 text-xs uppercase tracking-widest mt-0.5">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
