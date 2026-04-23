'use client'

import { useState, useEffect, useCallback } from 'react'

interface Worker {
  identity: string
  hashrate: number
  isNpub: boolean
}

interface LeaderboardData {
  workers: Worker[]
  totalHashrate: number
  activeCount: number
}

function formatHashrate(hps: number): string {
  if (hps >= 1e12) return `${(hps / 1e12).toFixed(2)} TH/s`
  if (hps >= 1e9) return `${(hps / 1e9).toFixed(2)} GH/s`
  if (hps >= 1e6) return `${(hps / 1e6).toFixed(2)} MH/s`
  if (hps >= 1e3) return `${(hps / 1e3).toFixed(2)} KH/s`
  return `${hps.toFixed(0)} H/s`
}

function getRankBadge(rank: number): string {
  if (rank === 1) return 'bg-yellow-500 text-black'
  if (rank === 2) return 'bg-gray-400 text-black'
  if (rank === 3) return 'bg-amber-700 text-white'
  return 'bg-gray-200 dark:bg-[#1f1f1f] text-gray-500'
}

function truncateIdentity(identity: string): string {
  if (!identity.startsWith('npub1')) return identity
  return `${identity.slice(0, 9)}...${identity.slice(-4)}`
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-[#1f1f1f]">
      <div className="h-5 w-5 bg-gray-200 dark:bg-[#1f1f1f] rounded-none animate-pulse flex-shrink-0" />
      <div className="h-3 w-28 bg-gray-200 dark:bg-[#1f1f1f] rounded animate-pulse flex-shrink-0" />
      <div className="flex-1 h-2 bg-gray-200 dark:bg-[#1f1f1f] rounded animate-pulse" />
      <div className="h-4 w-16 bg-gray-200 dark:bg-[#1f1f1f] rounded animate-pulse flex-shrink-0" />
      <div className="h-3 w-8 bg-gray-200 dark:bg-[#1f1f1f] rounded animate-pulse flex-shrink-0" />
    </div>
  )
}

export default function HashrateLeaderboard() {
  const [data, setData] = useState<LeaderboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/hashdash')
      if (!res.ok) throw new Error('Failed')
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setData(json as LeaderboardData)
      setError(false)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [fetchData])

  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-6 text-center">
        <p className="text-gray-500 text-sm mb-2">Unable to load live hashrate data.</p>
        <a
          href="https://dash.256f.org"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[#3b1445] dark:text-[#c084d8] text-sm hover:underline"
        >
          View on Hashdash &rarr;
        </a>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none overflow-hidden">

      {/* Stats header */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-gray-200 dark:border-[#1f1f1f] bg-white dark:bg-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse flex-shrink-0" />
          {loading || !data ? (
            <div className="h-3 w-32 bg-gray-200 dark:bg-[#1f1f1f] rounded animate-pulse" />
          ) : (
            <span className="font-mono text-gray-500 dark:text-gray-400 text-xs">
              {data.activeCount} DONORS ACTIVE
            </span>
          )}
        </div>
        {loading || !data ? (
          <div className="h-3 w-24 bg-gray-200 dark:bg-[#1f1f1f] rounded animate-pulse" />
        ) : (
          <span className="font-mono text-[#00FF41] text-xs font-bold">
            {formatHashrate(data.totalHashrate)} TOTAL
          </span>
        )}
      </div>

      {/* Rows */}
      <div>
        {loading || !data ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        ) : data.workers.length === 0 ? (
          <div className="px-4 py-6 text-center text-gray-500 text-sm">
            No active miners. Be the first to{' '}
            <a href="/donate#hashrate" className="text-[#3b1445] dark:text-[#c084d8] hover:underline">
              donate hashrate
            </a>
            !
          </div>
        ) : (
          data.workers.map((w, i) => {
            const rank = i + 1
            const pct = data.totalHashrate > 0
              ? Math.round((w.hashrate / data.totalHashrate) * 100)
              : 0
            return (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-[#1f1f1f] last:border-0 hover:bg-white dark:hover:bg-[#1a1a1a] transition-colors"
              >
                {/* Rank badge */}
                <span className={`inline-flex items-center justify-center w-5 h-5 text-[10px] font-mono font-bold flex-shrink-0 ${getRankBadge(rank)}`}>
                  {rank}
                </span>

                {/* Identity */}
                <span className="font-mono text-gray-700 dark:text-gray-300 text-xs flex-shrink-0 w-28 truncate">
                  {truncateIdentity(w.identity)}
                </span>

                {/* Relative bar */}
                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-[#2a2a2a] rounded-none overflow-hidden">
                  <div
                    className="h-full bg-[#00FF41]/60 rounded-none transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Hashrate */}
                <span className="font-display font-bold text-[#00FF41] text-xs flex-shrink-0 w-20 text-right">
                  {formatHashrate(w.hashrate)}
                </span>

                {/* Percentage */}
                <span className="font-mono text-gray-400 dark:text-gray-600 text-xs flex-shrink-0 w-8 text-right">
                  {pct}%
                </span>
              </div>
            )
          })
        )}
      </div>

      {/* Footer link */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-[#1f1f1f] bg-white dark:bg-[#1a1a1a] text-center">
        <a
          href="https://dash.256f.org"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs hover:underline transition-colors"
        >
          {data ? `View all ${data.activeCount} donors on Hashdash →` : 'View on Hashdash →'}
        </a>
      </div>
    </div>
  )
}
