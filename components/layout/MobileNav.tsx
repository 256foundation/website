'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { NavItem } from '@/types'
import Logo from '@/components/ui/Logo'

interface MobileNavProps {
  items: NavItem[]
  isOpen: boolean
  onClose: () => void
}

function AccordionItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false)

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-[#3b1445] dark:hover:text-[#c084d8] font-display font-semibold text-sm uppercase border-b border-gray-200 dark:border-[#1f1f1f]"
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div className="border-b border-gray-200 dark:border-[#1f1f1f]">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-[#3b1445] dark:hover:text-[#c084d8] font-display font-semibold text-sm uppercase"
      >
        {item.label}
        <svg
          className={['w-3 h-3 transition-transform', expanded ? 'rotate-180' : ''].join(' ')}
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M6 8L1 3h10L6 8z" />
        </svg>
      </button>
      {expanded && (
        <div className="bg-black/5 dark:bg-black/20 pb-1">
          {item.children.map((child) =>
            child.external ? (
              <a
                key={child.href}
                href={child.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-between px-8 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-[#3b1445] dark:hover:text-[#c084d8] font-mono"
              >
                {child.label}
                <svg className="w-3 h-3 opacity-50 flex-shrink-0 ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 12 12">
                  <path d="M5 2H2v8h8V7M7 1h4v4M10 1L5.5 5.5" />
                </svg>
              </a>
            ) : (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="block px-8 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-[#3b1445] dark:hover:text-[#c084d8] font-mono"
              >
                {child.label}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default function MobileNav({ items, isOpen, onClose }: MobileNavProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 xl:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={[
          'fixed top-0 right-0 h-full w-72 bg-white dark:bg-[#13091a] border-l border-gray-200 dark:border-[#3b1445]/30 z-50 transform transition-transform duration-300 ease-in-out xl:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-[#3b1445]/30">
          <Logo height={36} inverted />
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
          </button>
        </div>

        <nav className="overflow-y-auto h-[calc(100%-60px)]">
          {items.map((item) => (
            <AccordionItem key={item.label} item={item} onClose={onClose} />
          ))}
          <div className="p-4 space-y-2 border-t border-gray-200 dark:border-[#1f1f1f]">
            <div className="grid grid-cols-3 gap-2">
              <a
                href="https://github.com/256foundation"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-gray-300 dark:border-[#3f3f3f] text-gray-700 dark:text-gray-200 font-mono text-xs rounded-none hover:border-[#3b1445] dark:hover:border-[#5c2070] hover:bg-[#3b1445]/10 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://forum.256foundation.org"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-gray-300 dark:border-[#3f3f3f] text-gray-700 dark:text-gray-200 font-mono text-xs rounded-none hover:border-[#3b1445] dark:hover:border-[#5c2070] hover:bg-[#3b1445]/10 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                Forum
              </a>
              <Link
                href="/#contact"
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-gray-300 dark:border-[#3f3f3f] text-gray-700 dark:text-gray-200 font-mono text-xs rounded-none hover:border-[#3b1445] dark:hover:border-[#5c2070] hover:bg-[#3b1445]/10 transition-all"
              >
                Contact
              </Link>
            </div>
            <a
              href="/donate"
              onClick={onClose}
              className="block w-full text-center bg-[#3b1445] text-white font-mono font-bold py-3 rounded-none hover:bg-[#2d0f36] transition-colors"
            >
              ⚡ Donate
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}
