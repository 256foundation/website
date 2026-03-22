import Link from 'next/link'
import type { SiteStats } from '@/types'

interface AllocationStatsProps {
  stats: SiteStats
}

export default function AllocationStats({ stats }: AllocationStatsProps) {
  const usdFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(stats.usdAllocated)

  const items = [
    { value: stats.btcAllocated.toFixed(1), unit: 'BTC', label: 'Allocated to Grantees', color: '#7C3AED' },
    { value: usdFormatted.replace('$', ''), unit: 'USD', label: 'Dollar Equivalent', color: '#7C3AED' },
    { value: String(stats.totalGrantees), unit: '', label: 'Active Grantees', color: '#7C3AED' },
    { value: String(stats.blocksFound), unit: '', label: 'Blocks Found to Date', color: '#00FF41' },
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1 h-4 bg-[#7C3AED]" />
        <span className="font-mono text-[#7C3AED] text-xs tracking-[0.2em] uppercase">
          Impact
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ value, unit, label, color }, i) => (
          <div
            key={i}
            className={[
              'py-6 pr-6',
              i === 0 ? 'pl-0' : 'pl-0 sm:pl-6',
              i < 3 ? 'border-b sm:border-b-0 border-[#1f1f1f]' : '',
              i === 0 ? 'sm:border-r border-[#1f1f1f]' : '',
              i === 1 ? 'sm:border-r-0 lg:border-r border-[#1f1f1f]' : '',
              i === 2 ? 'sm:border-r border-[#1f1f1f] sm:border-t lg:border-t-0' : '',
              i === 3 ? 'sm:border-t lg:border-t-0' : '',
            ].filter(Boolean).join(' ')}
          >
            <div className="mb-1 flex items-baseline gap-1.5 flex-wrap">
              <span
                className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-none tabular-nums"
                style={{ color }}
              >
                {value}
              </span>
              {unit && (
                <span className="font-mono font-bold text-base" style={{ color, opacity: 0.5 }}>
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

      <div className="mt-10 pt-6 border-t border-[#1f1f1f] flex items-center gap-6">
        <Link
          href="/projects"
          className="font-mono text-[#7C3AED] text-sm hover:underline transition-colors inline-flex items-center gap-2"
        >
          View All Funded Projects
          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </Link>
        <span className="text-gray-700 text-xs font-mono">100% passthrough to developers</span>
      </div>
    </div>
  )
}
