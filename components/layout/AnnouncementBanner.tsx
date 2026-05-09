'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { activeAnnouncement } from '@/data/announcements'

type WrapperProps = { children: React.ReactNode; className?: string }

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!activeAnnouncement) return

    const { id, expiresAt } = activeAnnouncement

    // Check expiry
    if (expiresAt && new Date() > new Date(expiresAt)) return

    // Check dismiss state
    if (localStorage.getItem(`banner_dismissed_${id}`)) return

    setVisible(true)
  }, [])

  if (!activeAnnouncement || !visible) return null

  const { id, label, message, href, external } = activeAnnouncement

  function dismiss() {
    localStorage.setItem(`banner_dismissed_${id}`, '1')
    setVisible(false)
  }

  const LinkOrA = external
    ? ({ children, className }: WrapperProps) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      )
    : ({ children, className }: WrapperProps) => (
        <Link href={href} className={className}>
          {children}
        </Link>
      )

  return (
    <div className="w-full bg-[#3b1445] border-b border-[#5c2070]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-10">

          {/* Left: badge + message (clickable) */}
          <LinkOrA className="flex items-center gap-3 flex-1 min-w-0 group">
            {/* Badge */}
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#00FF41] border border-[#00FF41] px-1.5 py-0.5 shrink-0 leading-none">
              {label}
            </span>

            {/* Message */}
            <span className="font-mono text-xs text-white truncate group-hover:text-[#c084d8] transition-colors">
              {message}
            </span>
          </LinkOrA>

          {/* Right: "View Event →" + dismiss */}
          <div className="flex items-center gap-3 shrink-0">
            <LinkOrA className="font-mono text-xs text-[#c084d8] hover:text-white transition-colors hidden sm:block whitespace-nowrap">
              View Event →
            </LinkOrA>

            <button
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="font-mono text-xs text-[#c084d8] hover:text-white transition-colors leading-none p-1 -mr-1"
            >
              ✕
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
