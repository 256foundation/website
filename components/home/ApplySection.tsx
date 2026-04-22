import Link from 'next/link'
import DecorativeBg from '@/components/ui/DecorativeBg'

export default function ApplySection() {
  return (
    <div className="relative overflow-hidden rounded-none bg-[#f8f2fc] dark:bg-[#1e1028]">
      {/* Purple left accent bar */}
      <div className="absolute top-0 left-0 w-1 h-full bg-[#3b1445]" />
      <DecorativeBg glowPosition="100% 50%" glowOpacity={0.06} gridOpacity={0.06} vignette={false} />

      <div className="relative z-10 p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-4 bg-[#3b1445]" />
              <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">
                Open Rolling Grants
              </span>
            </div>
            <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4 max-w-2xl uppercase">
              Building something for open-source Bitcoin mining?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xl">
              We fund developers and researchers working on open hardware, firmware, pool software,
              educational resources, and tooling. All funded work must be released under an
              approved open-source license.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {['Open Hardware', 'Firmware', 'Pool Software', 'Research', 'Education'].map((tag) => (
                <span key={tag} className="font-mono text-xs px-2.5 py-1 border border-[#3b1445]/40 dark:border-[#5c2070]/40 text-[#3b1445]/80 dark:text-[#c084d8]/60 rounded-none">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              href="/grants"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#3b1445] text-white font-mono font-bold text-base rounded-none hover:bg-[#2d0f36] transition-colors duration-200 whitespace-nowrap"
            >
              Apply for a Grant
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 10h12M12 5l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
