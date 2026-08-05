'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { activeAnnouncement } from '@/data/announcements'

type BannerLinkProps = {
  href: string
  external?: boolean
  children: React.ReactNode
  className?: string
}

/** Declared at module scope — defining this inside the render remounted the
 *  banner contents on every render and reset their state. */
function BannerLink({ href, external, children, className }: BannerLinkProps) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!activeAnnouncement) return

    const { id, expiresAt } = activeAnnouncement

    // Check expiry
    if (expiresAt && new Date() > new Date(expiresAt)) return

    // Check dismiss state
    if (localStorage.getItem(`banner_dismissed_${id}`)) return

    // localStorage does not exist during SSR, so dismissal can only be resolved
    // after mount. The banner starts hidden and reveals itself here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true)
  }, [])

  if (!activeAnnouncement || !visible) return null

  const { id, label, message, href, external } = activeAnnouncement

  function dismiss() {
    localStorage.setItem(`banner_dismissed_${id}`, '1')
    setVisible(false)
  }

  return (
    <div className="w-full bg-[#3b1445] border-b border-[#5c2070]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-10">

          {/* Left: badge + message (clickable) */}
          <BannerLink
            href={href}
            external={external}
            className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden group"
          >
            {/* Badge */}
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#00FF41] border border-[#00FF41] px-1.5 py-0.5 shrink-0 leading-none">
              {label}
            </span>

            {/* Message — static on desktop, scrolling ticker on mobile */}
            <span className="overflow-hidden flex-1 min-w-0">
              <span className="banner-marquee font-mono text-xs text-white whitespace-nowrap group-hover:text-[#c084d8] transition-colors">
                {message}
                {/* Duplicate for seamless mobile loop — hidden on sm+ */}
                <span className="ml-16 sm:hidden" aria-hidden="true">{message}</span>
              </span>
            </span>
          </BannerLink>

          {/* Right: "View Event →" + dismiss */}
          <div className="flex items-center gap-3 shrink-0">
            <BannerLink
              href={href}
              external={external}
              className="font-mono text-xs text-[#c084d8] hover:text-white transition-colors hidden sm:block whitespace-nowrap"
            >
              View Fundraising Event →
            </BannerLink>

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
