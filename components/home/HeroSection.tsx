import Link from 'next/link'
import PCBBackground from '@/components/ui/PCBBackground'
import Logo from '@/components/ui/Logo'
import { siteStats } from '@/data/stats'

export default function HeroSection() {
  return (
    <section className="relative flex flex-col justify-start overflow-hidden bg-white dark:bg-[#1a1a1a]">
      {/* PCB pattern */}
      <PCBBackground animated opacity={0.12} />

      {/* Purple radial gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,20,69,0.18) 0%, transparent 65%)' }} />

      {/* Vignette edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,white_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,#1a1a1a_100%)] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-16 pt-16 lg:pt-24">
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

        {/* Logo + CTA: side-by-side on desktop, stacked (logo → buttons → heading) on mobile */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-8 gap-4 lg:gap-8">
          <h1>
            {/* Horizontal logo at compact height on mobile/tablet, full size on lg+ */}
            <Logo height={130} inverted className="lg:hidden" />
            <Logo height={180} inverted className="hidden lg:block" />
          </h1>

          {/* CTA buttons — right of logo on desktop, below logo on mobile */}
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/mission"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] font-mono font-bold text-sm rounded-none hover:bg-[#333] dark:hover:bg-gray-100 transition-colors duration-200"
            >
              Our Mission
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#3b1445]/50 dark:border-[#5c2070]/50 text-[#3b1445] dark:text-[#c084d8] font-mono font-bold text-sm rounded-none hover:border-[#3b1445] dark:hover:border-[#5c2070] hover:bg-[#3b1445]/5 transition-all duration-200"
            >
              Donate &rarr;
            </Link>
          </div>
        </div>

        {/* Tagline */}
        <p className="font-display font-extrabold text-gray-900 dark:text-white text-3xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase leading-none max-w-3xl mb-5 sm:mb-8">
          Building the open-source Bitcoin mining stack.
        </p>

        {/* Stack layer chips */}
        <div className="mb-6 sm:mb-10">
          <p className="font-mono text-gray-400 dark:text-gray-600 text-[11px] tracking-widest uppercase mb-3">
            &rarr; Core Projects
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Firmware', href: '/projects/mujina', type: 'software' },
              { label: 'Pool', href: '/projects/hydrapool', type: 'software' },
            ].map(({ label, href, type }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 font-mono text-xs px-4 py-2 border transition-all duration-200 group border-[#3b1445] dark:border-[#c084d8] text-[#3b1445] dark:text-[#c084d8] hover:bg-[#3b1445]/8 dark:hover:bg-[#c084d8]/10"
              >
                {label}
                <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 6h8M7 3l3 3-3 3" />
                </svg>
              </Link>
            ))}
            {/* Force hardware chips onto their own row on mobile */}
            <div className="basis-full sm:hidden" aria-hidden="true" />
            {[
              { label: 'Hashboard', href: '/projects/ember-one' },
              { label: 'Control Board', href: '/projects/libre-board' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 font-mono text-xs px-4 py-2 border transition-all duration-200 group border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41]/15"
              >
                {label}
                <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 6h8M7 3l3 3-3 3" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Sub-copy */}
        <p className="text-gray-500 text-sm leading-relaxed max-w-md mb-6 sm:mb-12">
          One company controls Bitcoin&apos;s mining infrastructure. We fund developers dismantling
          it &mdash; open hardware, firmware, and pool software that anyone can use, audit, and build upon.
        </p>

      </div>
    </section>
  )
}
