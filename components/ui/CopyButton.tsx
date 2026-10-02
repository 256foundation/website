'use client'

import { useState } from 'react'

interface CopyButtonProps {
  value: string
}

export default function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for browsers without clipboard API
      const el = document.createElement('textarea')
      el.value = value
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="font-mono text-[10px] uppercase tracking-widest border px-2 py-1 transition-all duration-200 shrink-0
        border-gray-300 dark:border-[#3f3f3f] text-gray-600 dark:text-gray-300
        hover:border-[#3b1445] dark:hover:border-[#5c2070] hover:text-[#3b1445] dark:hover:text-[#c084d8]
        data-[copied=true]:border-[#3b1445] data-[copied=true]:text-[#3b1445] dark:data-[copied=true]:border-[#5c2070] dark:data-[copied=true]:text-[#c084d8]"
      data-copied={copied}
      aria-label={copied ? 'Copied!' : `Copy ${value}`}
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  )
}
