import Link from 'next/link'
import type { SiteStats } from '@/types'

interface AllocationStatsProps {
  stats: SiteStats
}

interface StatItem {
  value: string
  unit: string
  label: string
  isPurple: boolean
}

export default function AllocationStats({ stats }: AllocationStatsProps) {
  const items: StatItem[] = [
    { value: stats.btcRaised.toFixed(3), unit: 'BTC', label: 'Raised', isPurple: true },
    { value: '$584k', unit: '', label: 'Allocated', isPurple: true },
    { value: String(stats.blocksFound), unit: '', label: 'Blocks Found to Date', isPurple: false },
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1 h-4 bg-[#3b1445]" />
        <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">
          Impact
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3">
        {items.map(({ value, unit, label, isPurple }, i) => (
          <div
            key={i}
            className={[
              'py-6 pr-6',
              i === 0 ? 'pl-0' : 'pl-0 sm:pl-6',
              i < 2 ? 'border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-[#1f1f1f]' : '',
            ].filter(Boolean).join(' ')}
          >
            <div className="mb-1 flex items-baseline gap-1.5 flex-wrap">
              <span className={`font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-none tabular-nums ${isPurple ? 'text-[#3b1445] dark:text-[#c084d8]' : 'text-[#00FF41]'}`}>
                {value}
              </span>
              {unit && (
                <span className={`font-mono font-bold text-base opacity-50 ${isPurple ? 'text-[#3b1445] dark:text-[#c084d8]' : 'text-[#00FF41]'}`}>
                  {unit}
                </span>
              )}
            </div>
            <div className="font-mono text-gray-500 text-xs uppercase tracking-widest leading-relaxed mt-1">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-[#1f1f1f] flex items-center gap-6">
        <Link
          href="/projects"
          className="font-mono text-[#3b1445] dark:text-[#c084d8] text-sm hover:underline transition-colors inline-flex items-center gap-2"
        >
          View All Funded Projects
          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </Link>
        <span className="text-gray-400 dark:text-gray-700 text-xs font-mono">100% passthrough to developers</span>
      </div>
    </div>
  )
}
