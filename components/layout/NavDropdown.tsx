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
        className="flex items-center gap-1 text-gray-400 hover:text-white font-display font-semibold text-sm uppercase transition-colors duration-200 px-4 py-2 rounded-sm hover:bg-[#7C3AED]/10"
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
        <div className="absolute top-full left-0 mt-1 w-52 bg-[#111111] border border-[#1f1f1f] rounded-none shadow-xl shadow-black/50 z-50 py-1">
          {item.children?.map((child) => (
            <div key={child.href}>
              {child.divider && (
                <div className="mx-4 my-1 border-t border-[#1f1f1f]" />
              )}
              {child.external ? (
                <a
                  href={child.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={[
                    'block px-4 py-2.5 text-sm font-mono transition-colors duration-150 border-l-2 border-transparent hover:border-[#7C3AED] hover:bg-[#1a1a1a]',
                    child.divider
                      ? 'text-gray-500 hover:text-gray-300'
                      : 'text-gray-300 hover:text-[#7C3AED]',
                  ].join(' ')}
                >
                  {child.label}
                </a>
              ) : (
                <Link
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className={[
                    'block px-4 py-2.5 text-sm font-mono transition-colors duration-150 border-l-2 border-transparent hover:border-[#7C3AED] hover:bg-[#1a1a1a]',
                    child.divider
                      ? 'text-gray-500 hover:text-gray-300'
                      : 'text-gray-300 hover:text-[#7C3AED]',
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
