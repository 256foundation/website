import Link from 'next/link'
import Button from '@/components/ui/Button'
import PCBBackground from '@/components/ui/PCBBackground'
import Logo from '@/components/ui/Logo'
import RotatingTagline from '@/components/home/RotatingTagline'

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
        {/* Logo + CTA: side-by-side on desktop, stacked (logo → buttons → heading) on mobile */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-8 gap-4 lg:gap-8">
          <h1>
            {/* Horizontal logo at compact height on mobile/tablet, full size on lg+ */}
            <Logo height={52} className="lg:hidden" />
            <Logo height={120} className="hidden lg:block" />
          </h1>

          {/* CTA buttons — right of logo on desktop, below logo on mobile */}
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Button variant="primary" size="lg" href="/mission">
              Our Mission →
            </Button>
            <Button variant="outlined" size="lg" href="/donate">
              Donate →
            </Button>
          </div>
        </div>

        {/* Tagline */}
        <RotatingTagline />

        {/* Stack layer chips */}
        <div className="mb-6 sm:mb-10">
          <p className="font-mono text-gray-400 dark:text-gray-600 text-[11px] tracking-widest uppercase mb-3">
            &rarr; Core Projects
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Firmware', href: '/projects#mujina' },
              { label: 'Pool', href: '/projects#hydrapool' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 font-mono text-xs px-4 py-2 border border-[#3b1445]/60 dark:border-[#c084d8]/60 text-[#3b1445] dark:text-[#c084d8] hover:bg-[#3b1445]/8 dark:hover:bg-[#c084d8]/10 transition-all duration-200"
              >
                {label}
                <span aria-hidden="true">→</span>
              </Link>
            ))}
            {/* Force hardware chips onto their own row on mobile */}
            <div className="basis-full sm:hidden" aria-hidden="true" />
            {[
              { label: 'Hash Board', href: '/projects#ember-one' },
              { label: 'Control Board', href: '/projects#libre-board' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 font-mono text-xs px-4 py-2 border border-[#3b1445]/60 dark:border-[#c084d8]/60 text-[#3b1445] dark:text-[#c084d8] hover:bg-[#3b1445]/8 dark:hover:bg-[#c084d8]/10 transition-all duration-200"
              >
                {label}
                <span aria-hidden="true">→</span>
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
