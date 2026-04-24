import Link from 'next/link'

export default function WhySection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left: big label */}
      <div className="lg:col-span-3 hidden lg:block">
        <div className="sticky top-24">
          <div
            className="font-display font-extrabold text-gray-500 dark:text-white select-none leading-none uppercase"
            style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1, opacity: 0.15 }}
          >
            WHY
          </div>
        </div>
      </div>

      {/* Right: content */}
      <div className="lg:col-span-9">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-4 bg-[#3b1445]" />
          <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">Why We Exist</span>
        </div>

        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl lg:text-4xl leading-tight mb-8 max-w-2xl uppercase">
          An open protocol should be accessible to anyone at all layers.
        </h2>

        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          <p>
            One large, antagonistic Bitcoin mining company has achieved near-total control over the
            hardware and software that keeps Bitcoin running. They have blocked innovation, denied
            collaboration, and created a single point of failure in Bitcoin&apos;s security model.
          </p>
          <p>
            The 256 Foundation exists to dismantle this proprietary empire &mdash; by funding the
            open-source Bitcoin mining stack that anyone can use, audit, modify, and build upon.
            We believe every layer of Bitcoin infrastructure should be free and open.
          </p>
        </div>

        {/* Pull quote */}
        <blockquote className="mt-8 pl-5 pr-4 border-l-4 border-[#3b1445] dark:border-[#5c2070] bg-[#3b1445]/5 dark:bg-[#3b1445]/10 py-3">
          <p className="font-display font-bold text-[#3b1445] dark:text-[#c084d8] text-sm sm:text-lg leading-snug uppercase">
            &ldquo;Every layer of Bitcoin infrastructure should be free and open.&rdquo;
          </p>
        </blockquote>

        <Link
          href="/mission"
          className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-gray-600 dark:text-gray-400 hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors group"
        >
          Read Our Full Mission
          <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
