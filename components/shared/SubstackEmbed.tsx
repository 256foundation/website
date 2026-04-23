'use client'

import { useEffect, useRef } from 'react'

export default function SubstackEmbed() {
  const ref = useRef<HTMLDivElement>(null)
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current || !ref.current) return
    loaded.current = true

    const anchor = document.createElement('div')
    anchor.setAttribute('data-url', 'https://256foundation.substack.com')
    anchor.setAttribute('data-email-input-placeholder', 'Enter your email...')
    anchor.setAttribute('data-theme', 'dark')
    ref.current.appendChild(anchor)

    const script = document.createElement('script')
    script.src = 'https://substackapi.com/embeds/email-subscribe/universal-embed.js'
    script.async = true
    ref.current.appendChild(script)
  }, [])

  return (
    <div className="min-h-[120px]">
      <div ref={ref} />
      <p className="text-gray-500 text-xs mt-3">
        <a
          href="https://256foundation.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#3b1445] dark:text-[#c084d8] hover:underline"
        >
          Or follow along on Substack &rarr;
        </a>
      </p>
    </div>
  )
}
