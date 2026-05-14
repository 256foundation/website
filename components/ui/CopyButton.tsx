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
        border-[#00FF41]/40 text-[#00FF41]/60 hover:border-[#00FF41] hover:text-[#00FF41]
        data-[copied=true]:border-[#00FF41] data-[copied=true]:text-[#00FF41]"
      data-copied={copied}
      aria-label={copied ? 'Copied!' : `Copy ${value}`}
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  )
}
