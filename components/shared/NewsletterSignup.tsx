'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('https://256foundation.substack.com/api/v1/free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          first_url: window.location.href,
          first_referrer: document.referrer,
        }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data?.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Unable to connect. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-6 hover:border-[#3b1445]/20 dark:hover:border-[#5c2070]/20 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-3 bg-[#3b1445]" />
        <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase">Newsletter</span>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
        Get project updates, grant announcements, and mining ecosystem news delivered to your inbox.
      </p>

      {status === 'success' ? (
        <div className="flex items-start gap-3 bg-white dark:bg-[#1a1a1a] border border-[#00FF41]/20 rounded-none p-4">
          <span className="text-[#00FF41] mt-0.5">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 8l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="font-mono text-[#00FF41] text-xs font-bold uppercase tracking-wider">Subscribed</p>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-0.5">Check your inbox to confirm your subscription.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={status === 'loading'}
            className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-none px-4 py-2.5 text-sm text-gray-900 dark:text-white font-mono placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#3b1445] focus:ring-1 focus:ring-[#3b1445]/30 disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className="w-full bg-[#3b1445] text-white font-mono font-bold text-sm rounded-none px-4 py-2.5 hover:bg-[#2d0f36] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          {status === 'error' && (
            <p className="text-red-400 text-xs font-mono">{errorMsg}</p>
          )}
        </form>
      )}

      <p className="text-gray-500 dark:text-gray-600 text-xs mt-auto pt-3">
        Or{' '}
        <a
          href="https://256foundation.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors"
        >
          read on Substack &rarr;
        </a>
      </p>
    </div>
  )
}
