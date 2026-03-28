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
    <div className="h-68 bg-[#111111] border border-[#1f1f1f] rounded-none p-6 hover:border-[#7C3AED]/20 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-3 bg-[#7C3AED]" />
        <span className="font-mono text-[#7C3AED] text-xs tracking-widest uppercase">Newsletter</span>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        Get project updates, grant announcements, and mining ecosystem news delivered to your inbox.
      </p>

      {status === 'success' ? (
        <div className="flex items-start gap-3 bg-[#0a0a0a] border border-[#00FF41]/20 rounded-none p-4">
          <span className="text-[#00FF41] mt-0.5">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 8l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="font-mono text-[#00FF41] text-xs font-bold uppercase tracking-wider">Subscribed</p>
            <p className="text-gray-400 text-xs mt-0.5">Check your inbox to confirm your subscription.</p>
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
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-none px-4 py-2.5 text-sm text-white font-mono placeholder-gray-600 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/30 disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className="w-full bg-white text-[#0a0a0a] font-mono font-bold text-sm rounded-none px-4 py-2.5 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          {status === 'error' && (
            <p className="text-red-400 text-xs font-mono">{errorMsg}</p>
          )}
        </form>
      )}

      <p className="text-gray-600 text-xs mt-3">
        Or{' '}
        <a
          href="https://256foundation.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-[#7C3AED] transition-colors"
        >
          read on Substack &rarr;
        </a>
      </p>
    </div>
  )
}
