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
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={[
          'fixed top-0 right-0 h-full w-72 bg-white dark:bg-[#13091a] border-l border-gray-200 dark:border-[#3b1445]/30 z-50 transform transition-transform duration-300 ease-in-out lg:hidden',
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
          <div className="p-4">
            <a
              href="/donate"
              onClick={onClose}
              className="block w-full text-center bg-[#3b1445] text-white font-mono font-bold py-3 rounded-none hover:bg-[#2d0f36] transition-colors"
            >
              Donate
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}
