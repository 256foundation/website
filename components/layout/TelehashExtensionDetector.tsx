'use client'

import { useEffect } from 'react'

/**
 * Detects the TeleHash Chrome extension's injected topbar (#telehashTopbar)
 * and sets the --ext-offset CSS custom property on :root to its height (115px).
 *
 * This lets the site header, accent line, and main content shift down so both
 * the extension overlay and the site nav are fully visible simultaneously.
 *
 * If the extension is not installed, --ext-offset stays at 0px (the CSS default)
 * and layout is completely unaffected.
 */
export default function TelehashExtensionDetector() {
  useEffect(() => {
    const apply = () => {
      const topbar = document.getElementById('telehashTopbar')
      const offset = topbar ? (topbar.offsetHeight || 115) : 0
      document.documentElement.style.setProperty('--ext-offset', `${offset}px`)
    }

    apply()
    // Extension may inject slightly after DOMContentLoaded — check again shortly
    const t = setTimeout(apply, 400)
    return () => clearTimeout(t)
  }, [])

  return null
}
