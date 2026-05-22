'use client'

import { useState } from 'react'
import type { TeleHashLeaderboardEntry } from '@/types'

interface LeaderboardTableProps {
  entries: TeleHashLeaderboardEntry[]
}

function formatContributor(entry: TeleHashLeaderboardEntry): string {
  if (entry.name) return entry.name
  const u = entry.user
  if (u.startsWith('npub') || u.startsWith('bc1')) return u.slice(0, 12) + '…'
  return u
}

export default function LeaderboardTable({ entries }: LeaderboardTableProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 dark:border-[#1f1f1f]">
      {/* Toggle header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#1f1f1f] transition-colors group"
      >
        <div className="flex items-center gap-3">
          {/* Podium icon */}
          <svg className="w-3.5 h-3.5 text-[#3b1445] dark:text-[#c084d8] shrink-0" viewBox="0 0 14 14" fill="currentColor">
            <rect x="0" y="6" width="4" height="8" rx="0.5" />
            <rect x="5" y="3" width="4" height="11" rx="0.5" />
            <rect x="10" y="8" width="4" height="6" rx="0.5" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            Official Results
          </span>
          <span className="font-mono text-[10px] text-[#3b1445]/60 dark:text-[#c084d8]/60">
            — {entries.length} contributors
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!open && (
            <span className="font-mono text-[10px] text-gray-400 hidden sm:inline">
              {entries[0]?.name ?? entries[0]?.user} led with {entries[0]?.share}
            </span>
          )}
          <svg
            className={['w-3 h-3 text-gray-400 transition-transform duration-200', open ? 'rotate-180' : ''].join(' ')}
            viewBox="0 0 12 12"
            fill="currentColor"
          >
            <path d="M6 8L1 3h10L6 8z" />
          </svg>
        </div>
      </button>

      {/* Table */}
      {open && (
        <div className="border-t border-gray-200 dark:border-[#1f1f1f]">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#242424] border-b border-gray-200 dark:border-[#1f1f1f]">
                  <th className="text-left px-4 py-2 font-normal text-gray-500 uppercase tracking-wider w-8">#</th>
                  <th className="text-left px-4 py-2 font-normal text-gray-500 uppercase tracking-wider">Contributor</th>
                  <th className="text-right px-4 py-2 font-normal text-gray-500 uppercase tracking-wider">Hashes</th>
                  <th className="text-right px-4 py-2 font-normal text-gray-500 uppercase tracking-wider">Share</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, i) => (
                  <tr
                    key={entry.rank}
                    className={[
                      'border-b border-gray-100 dark:border-[#1f1f1f]',
                      i % 2 === 0 ? 'bg-white dark:bg-[#1a1a1a]' : 'bg-gray-50/50 dark:bg-[#242424]/50',
                      entry.rank <= 3 ? 'opacity-100' : 'opacity-80',
                    ].join(' ')}
                  >
                    <td className="px-4 py-1.5">
                      {entry.rank === 1 ? (
                        <span title="1st place">🥇</span>
                      ) : entry.rank === 2 ? (
                        <span title="2nd place">🥈</span>
                      ) : entry.rank === 3 ? (
                        <span title="3rd place">🥉</span>
                      ) : (
                        <span className="text-gray-400">{entry.rank}</span>
                      )}
                    </td>
                    <td className="px-4 py-1.5 text-gray-700 dark:text-gray-300 max-w-[200px] truncate">
                      {formatContributor(entry)}
                    </td>
                    <td className="px-4 py-1.5 text-right text-[#3b1445] dark:text-[#c084d8]">{entry.hashes}</td>
                    <td className="px-4 py-1.5 text-right">
                      <span className="text-gray-600 dark:text-gray-400">{entry.share}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-white dark:bg-[#1a1a1a] border-t border-gray-100 dark:border-[#1f1f1f] flex items-center justify-between">
            <span className="font-mono text-[10px] text-gray-400">
              {entries.length} unique contributors · TeleHash #4 · May 19, 2026
            </span>
            <a
              href="https://dash.256f.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-[#3b1445] dark:text-[#c084d8] hover:underline"
            >
              Full stats via Hashdash →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
