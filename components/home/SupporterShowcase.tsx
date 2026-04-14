'use client'

import type { Supporter } from '@/types'
import HashrateLeaderboard from './HashrateLeaderboard'

interface SupporterShowcaseProps {
  supporters: Supporter[]
}

const tierConfig = {
  1: { label: 'Tier I', amount: '1 BTC', donateUrl: 'https://pay.zaprite.com/pl_gsOMgGygvA', size: 'w-20 h-20 sm:w-24 sm:h-24' },
  2: { label: 'Tier II', amount: '0.1 BTC', donateUrl: 'https://pay.zaprite.com/pl_CgX4r675ED', size: 'w-16 h-16 sm:w-20 sm:h-20' },
  3: { label: 'Tier III', amount: '0.01 BTC', donateUrl: 'https://pay.zaprite.com/pl_Bjf25F3NEA', size: 'w-14 h-14 sm:w-16 sm:h-16' },
} as const

export default function SupporterShowcase({ supporters }: SupporterShowcaseProps) {
  const tier1 = supporters.filter((s) => s.tier === 1)
  const tier2 = supporters.filter((s) => s.tier === 2)
  const tier3 = supporters.filter((s) => s.tier === 3)

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 bg-[#7C3AED]" />
        <span className="font-mono text-[#7C3AED] text-xs tracking-[0.2em] uppercase">Our Supporters</span>
      </div>
      <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl mb-2 uppercase">
        Community Backers
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-10">
        The individuals and organizations fueling the open-source mining revolution.
      </p>

      {/* Financial supporters */}
      <div className="space-y-10 mb-12">
        {([1, 2, 3] as const).map((tier) => {
          const tierSupporters = tier === 1 ? tier1 : tier === 2 ? tier2 : tier3
          const config = tierConfig[tier]
          if (tierSupporters.length === 0) return null
          return (
            <div key={tier}>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="font-mono text-gray-600 dark:text-gray-400 text-xs uppercase tracking-widest">
                  {config.label}
                </h3>
                <span className="font-mono text-gray-500 dark:text-gray-600 text-xs">{config.amount}</span>
                <a
                  href={config.donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-mono text-[#7C3AED] text-xs hover:underline transition-colors ml-auto"
                >
                  Donate {config.amount} &rarr;
                </a>
              </div>
              <div className="flex flex-wrap gap-4">
                {tierSupporters.map((s, i) => (
                  <a
                    key={i}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 text-center"
                  >
                    <div className={`${config.size} relative overflow-hidden border border-gray-200 dark:border-[#1f1f1f] group-hover:border-[#7C3AED]/50 transition-colors duration-200`}>
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
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
                    <span className="font-mono text-gray-500 text-xs group-hover:text-[#7C3AED] transition-colors leading-tight max-w-[80px] break-words">
                      {s.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Hashrate leaderboard */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm uppercase">
            Live Hashrate Donors
          </h3>
          <a
            href="https://dash.256f.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[#7C3AED] text-xs hover:underline transition-colors"
          >
            View Full Dashboard &rarr;
          </a>
        </div>
        <HashrateLeaderboard />
      </div>
    </div>
  )
}
