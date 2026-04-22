'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import type { NavItem } from '@/types'

interface NavDropdownProps {
  item: NavItem
}

export default function NavDropdown({ item }: NavDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-display font-semibold text-sm uppercase transition-colors duration-200 px-4 py-2 rounded-sm hover:bg-[#3b1445]/10"
      >
        {item.label}
        <svg
          className={['w-3 h-3 transition-transform duration-200', open ? 'rotate-180' : ''].join(' ')}
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M6 8L1 3h10L6 8z" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-52 bg-gray-50 dark:bg-[#1e1028] border border-gray-200 dark:border-[#3b1445]/30 rounded-none shadow-xl shadow-black/10 dark:shadow-black/60 z-50 py-1">
          {item.children?.map((child) => (
            <div key={child.href}>
              {child.divider && (
                <div className="mx-4 my-1 border-t border-gray-200 dark:border-[#3b1445]/20" />
              )}
              {child.external ? (
                <a
                  href={child.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={[
                    'block px-4 py-2.5 text-sm font-mono transition-colors duration-150 border-l-2 border-transparent hover:border-[#3b1445] dark:hover:border-[#5c2070] hover:bg-white dark:hover:bg-[#13091a]',
                    child.divider
                      ? 'text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#3b1445] dark:hover:text-[#c084d8]',
                  ].join(' ')}
                >
                  {child.label}
                </a>
              ) : (
                <Link
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className={[
                    'block px-4 py-2.5 text-sm font-mono transition-colors duration-150 border-l-2 border-transparent hover:border-[#3b1445] dark:hover:border-[#5c2070] hover:bg-white dark:hover:bg-[#13091a]',
                    child.divider
                      ? 'text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#3b1445] dark:hover:text-[#c084d8]',
                  ].join(' ')}
                >
                  {child.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
