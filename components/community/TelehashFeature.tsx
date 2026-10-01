import Link from 'next/link'

/**
 * Featured TeleHash block. The full story lives on /telehash; this is the
 * community-page pointer to it.
 */
export default function TelehashFeature() {
  return (
    <div className="relative overflow-hidden isolate bg-[#f8f2fc] dark:bg-[#1e1028] border border-gray-200 dark:border-[#1f1f1f] p-8 lg:p-12">
      <div aria-hidden="true" className="absolute top-0 left-0 w-1 h-full bg-[#3b1445] dark:bg-[#c084d8]" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-4">
            <span aria-hidden="true" className="block w-1.5 h-4 bg-[#3b1445] dark:bg-[#c084d8]" />
            <span className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.28em] uppercase">
              Telehash
            </span>
          </div>
          <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase leading-tight mb-4 max-w-2xl">
            A few times a year, the whole community mines together
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xl">
            Telehash is our occasional in-person mining fundraiser. We get together and livestream
            all day while the global community of supporters points their hashrate at our gamified
            instance of Hydrapool for a chance at a solo block to fund the Foundation. The first
            event found block 881423, seeding the funding for the core projects.
          </p>
        </div>

        <div className="lg:col-span-4 flex lg:justify-end">
          <Link
            href="/telehash"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#3b1445] text-white font-mono font-bold text-base rounded-none hover:bg-[#2d0f36] transition-all duration-200 whitespace-nowrap shadow-[0_0_20px_rgba(59,20,69,0.35)] hover:shadow-[0_0_28px_rgba(59,20,69,0.5)]"
          >
            About TeleHash →
          </Link>
        </div>
      </div>
    </div>
  )
}
