'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: string | null
  endDate?: string | null
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: string): TimeLeft | null {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export default function CountdownTimer({ targetDate, endDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [mounted, setMounted] = useState(false)
  const [concluded, setConcluded] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!targetDate) return

    // Check if event has already ended
    if (endDate && new Date() > new Date(endDate)) {
      setConcluded(true)
      return
    }

    setTimeLeft(getTimeLeft(targetDate))
    const interval = setInterval(() => {
      // Re-check end date on each tick
      if (endDate && new Date() > new Date(endDate)) {
        setConcluded(true)
        clearInterval(interval)
        return
      }
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate, endDate])

  if (!mounted) return null

  // No event scheduled
  if (!targetDate) {
    return (
      <div className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-6 text-center">
        <p className="font-mono text-gray-600 dark:text-gray-400 text-sm mb-2">No event currently scheduled.</p>
        <p className="text-gray-500 text-xs">
          Telehash events are announced via our{' '}
          <a
            href="https://256foundation.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3b1445] dark:text-[#c084d8] hover:underline"
          >
            newsletter
          </a>{' '}
          and{' '}
          <a
            href="https://x.com/256FOUNDATION"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3b1445] dark:text-[#c084d8] hover:underline"
          >
            X account
          </a>
          .
        </p>
      </div>
    )
  }

  // Event has concluded
  if (concluded) {
    return (
      <div className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-6 text-center">
        <p className="font-mono font-bold text-gray-900 dark:text-white text-base mb-1">Event Concluded</p>
        <p className="font-mono text-gray-500 dark:text-gray-400 text-xs mb-3">
          Thanks to everyone who participated. The next Telehash will be announced soon.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs font-mono">
          <a
            href="https://256foundation.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3b1445] dark:text-[#c084d8] hover:underline"
          >
            Subscribe to Newsletter →
          </a>
          <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">·</span>
          <a
            href="https://x.com/256FOUNDATION"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3b1445] dark:text-[#c084d8] hover:underline"
          >
            Follow on X →
          </a>
        </div>
      </div>
    )
  }

  // Event is live (started but not ended)
  if (!timeLeft) {
    return (
      <div className="bg-[#3b1445]/10 dark:bg-[#5c2070]/20 border border-[#3b1445]/40 dark:border-[#5c2070]/40 rounded-none p-6 text-center">
        <p className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-lg">LIVE &mdash; Event In Progress!</p>
        <a
          href="https://x.com/256FOUNDATION"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-gray-900 dark:text-white text-sm mt-2 block hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors"
        >
          Watch live on X &rarr;
        </a>
      </div>
    )
  }

  const blocks = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HRS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes },
    { label: 'SEC', value: timeLeft.seconds },
  ]

  return (
    <div className="bg-gray-50 dark:bg-[#242424] border border-[#3b1445]/30 dark:border-[#5c2070]/30 rounded-none p-6">
      <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase text-center mb-6">
        Next Telehash Event
      </p>
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {blocks.map((b, i) => (
          <div key={b.label} className="flex items-center gap-2 sm:gap-4">
            <div className="text-center">
              <div className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-3xl sm:text-5xl w-16 sm:w-24 text-center bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#1f1f1f] rounded-none py-3">
                {pad(b.value)}
              </div>
              <div className="font-mono text-gray-500 text-xs mt-2">{b.label}</div>
            </div>
            {i < blocks.length - 1 && (
              <span className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-3xl sm:text-5xl countdown-separator pb-4">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
