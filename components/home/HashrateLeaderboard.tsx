'use client'

import { useState, useEffect, useCallback } from 'react'

interface Worker {
  name?: string
  worker?: string
  hashrate?: number
  hashrateStr?: string
  rank?: number
}

function formatHashrate(hps: number): string {
  if (hps >= 1e12) return `${(hps / 1e12).toFixed(2)} TH/s`
  if (hps >= 1e9) return `${(hps / 1e9).toFixed(2)} GH/s`
  if (hps >= 1e6) return `${(hps / 1e6).toFixed(2)} MH/s`
  if (hps >= 1e3) return `${(hps / 1e3).toFixed(2)} KH/s`
  return `${hps} H/s`
}

function getRankBadge(rank: number): string {
  if (rank === 1) return 'bg-yellow-500 text-black'
  if (rank === 2) return 'bg-gray-400 text-black'
  if (rank === 3) return 'bg-amber-700 text-white'
  return 'bg-gray-200 dark:bg-[#1f1f1f] text-gray-500'
}

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-200 dark:border-[#1f1f1f]">
      <td className="px-4 py-3"><div className="h-5 w-5 bg-gray-200 dark:bg-[#1f1f1f] rounded animate-pulse" /></td>
      <td className="px-4 py-3"><div className="h-3 w-32 bg-gray-200 dark:bg-[#1f1f1f] rounded animate-pulse" /></td>
      <td className="px-4 py-3"><div className="h-4 w-20 bg-gray-200 dark:bg-[#1f1f1f] rounded animate-pulse ml-auto" /></td>
    </tr>
  )
}

export default function HashrateLeaderboard() {
  const [workers, setWorkers] = useState<Worker[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/hashdash')
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      const list: Worker[] = Array.isArray(data)
        ? data
        : data.workers ?? data.data ?? data.miners ?? []
      setWorkers(list.slice(0, 10))
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
          View on HasHDash &rarr;
        </a>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-[#1f1f1f]">
            <th className="px-4 py-3 text-left font-mono text-gray-500 text-xs uppercase">#</th>
            <th className="px-4 py-3 text-left font-mono text-gray-500 text-xs uppercase">Worker</th>
            <th className="px-4 py-3 text-right font-mono text-gray-500 text-xs uppercase">Hashrate</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          ) : workers.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-6 text-center text-gray-500 text-sm">
                No active miners. Be the first to{' '}
                <a href="/donate#hashrate" className="text-[#3b1445] dark:text-[#c084d8] hover:underline">
                  donate hashrate
                </a>
                !
              </td>
            </tr>
          ) : (
            workers.map((w, i) => {
              const name = w.name ?? w.worker ?? `Worker ${i + 1}`
              const hr = w.hashrate ? formatHashrate(w.hashrate) : (w.hashrateStr ?? '\u2014')
              const rank = i + 1
              return (
                <tr key={i} className="border-b border-gray-200 dark:border-[#1f1f1f] hover:bg-white dark:hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-none text-xs font-mono font-bold ${getRankBadge(rank)}`}>
                      {rank}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-600 dark:text-gray-300 text-xs">{name}</td>
                  <td className="px-4 py-3 font-display font-bold text-[#00FF41] text-sm text-right">{hr}</td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
