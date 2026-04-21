'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#2a2a2a] rounded-none px-4 py-3 text-gray-800 dark:text-gray-100 text-sm font-mono placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#3b1445] focus:ring-1 focus:ring-[#3b1445]/30 transition-colors duration-200'

  if (status === 'success') {
    return (
      <div className="bg-gray-50 dark:bg-[#242424] border border-[#00FF41]/30 rounded-none p-8 text-center">
        <div className="text-[#00FF41] text-2xl mb-3">&#10003;</div>
        <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2 uppercase">Message Received</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Thanks for reaching out. We&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 font-mono text-[#3b1445] dark:text-[#c084d8] text-sm hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block font-mono text-gray-600 dark:text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Name / Alias
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Satoshi"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-mono text-gray-600 dark:text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="satoshi@example.com"
            required
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block font-mono text-gray-600 dark:text-gray-400 text-xs mb-2 uppercase tracking-wide">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
          required
          rows={5}
          className={inputClass}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm font-mono">
          Something went wrong. Please try again.
        </p>
      )}

      <Button type="submit" variant="primary" loading={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
