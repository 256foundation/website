'use client'

import type { Supporter } from '@/types'
import HashrateLeaderboard from './HashrateLeaderboard'

interface SupporterShowcaseProps {
  supporters: Supporter[]
}

const tierConfig = {
  1: {
    label: 'Tier 1',
    imgSize: 'w-28 h-28 sm:w-36 sm:h-36',
    gridCols: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  },
  2: {
    label: 'Tier 2',
    imgSize: 'w-20 h-20 sm:w-24 sm:h-24',
    gridCols: 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-5',
  },
  3: {
    label: 'Tier 3',
    imgSize: 'w-14 h-14 sm:w-16 sm:h-16',
    gridCols: 'grid-cols-4 sm:grid-cols-5 lg:grid-cols-7',
  },
} as const

const ZAPRITE_URL = process.env.NEXT_PUBLIC_ZAPRITE_URL || '/donate'

export default function SupporterShowcase({ supporters }: SupporterShowcaseProps) {
  const tier1 = supporters.filter((s) => s.tier === 1)
  const tier2 = supporters.filter((s) => s.tier === 2)
  const tier3 = supporters.filter((s) => s.tier === 3)

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 bg-[#3b1445]" />
        <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">Our Supporters</span>
      </div>
      <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl mb-2 uppercase">
        Community Backers
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-10">
        The individuals and organizations fueling the open-source mining revolution.
      </p>

      {/* Financial supporters */}
      <div className="space-y-10 mb-4">
        {([1, 2, 3] as const).map((tier) => {
          const tierSupporters = tier === 1 ? tier1 : tier === 2 ? tier2 : tier3
          const config = tierConfig[tier]
          if (tierSupporters.length === 0) return null
          return (
            <div key={tier}>
              <div className="flex items-center gap-3 mb-5">
                <h3 className="font-mono text-gray-600 dark:text-gray-400 text-xs uppercase tracking-widest">
                  {config.label}
                </h3>
              </div>
              <div className={`grid ${config.gridCols} gap-4`}>
                {tierSupporters.map((s, i) => (
                  <a
                    key={i}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 text-center"
                  >
                    <div
                      className={`${config.imgSize} bg-white dark:bg-[#1e1028]
                        border border-gray-200 dark:border-[#1f1f1f] flex items-center justify-center p-3
                        group-hover:border-[#3b1445]/50 dark:group-hover:border-[#5c2070]/50
                        group-hover:shadow-[0_0_20px_rgba(59,20,69,0.12)]
                        transition-all duration-300`}
                    >
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-full h-full object-contain transition-all duration-300"
                        onError={(e) => {
                          const el = e.target as HTMLImageElement
                          el.style.display = 'none'
                          const parent = el.parentElement
                          if (parent) {
                            parent.style.background = '#1f1f1f'
                            parent.innerHTML = `<span style="color:#4b5563;font-size:10px;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100%">${s.name.slice(0, 2).toUpperCase()}</span>`
                          }
                        }}
                      />
                    </div>
                    <span className="font-mono text-gray-500 text-xs group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors leading-tight max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {s.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Become a Supporter CTA */}
      <div className="mt-10 pt-8 border-t border-gray-200 dark:border-[#1f1f1f] flex items-center justify-between gap-4 flex-wrap">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Want your logo here? Support the open-source Bitcoin mining stack.
        </p>
        <a
          href={ZAPRITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#3b1445] text-white font-mono font-bold text-sm rounded-none hover:bg-[#2d0f36] transition-colors whitespace-nowrap"
        >
          Become a Supporter
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
      </div>

      {/* Hashrate leaderboard */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm uppercase">
            Live Hashrate Donors
          </h3>
          <a
            href="https://dash.256f.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs hover:underline transition-colors"
          >
            View Full Dashboard &rarr;
          </a>
        </div>
        <HashrateLeaderboard />
      </div>
    </div>
  )
}
