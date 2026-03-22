'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import NavDropdown from './NavDropdown'
import MobileNav from './MobileNav'
import { topNav } from '@/data/navigation'
import Logo from '@/components/ui/Logo'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* Top purple accent line */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-[#7C3AED]" />

      <header
        className={[
          'fixed top-0.5 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1f1f1f]'
            : 'bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-transparent',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group opacity-90 hover:opacity-100 transition-opacity duration-200">
              <Logo height={44} inverted />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {topNav.map((item) =>
                item.children ? (
                  <NavDropdown key={item.label} item={item} />
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-gray-400 hover:text-white font-display font-semibold text-sm uppercase transition-colors duration-200 px-4 py-2 rounded-sm hover:bg-[#7C3AED]/10"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/256foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2 border border-[#3f3f3f] text-gray-200 font-mono text-sm rounded-none hover:border-[#7C3AED] hover:text-white hover:bg-[#7C3AED]/10 transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
              <Link
                href="/donate"
                className="hidden lg:inline-flex items-center justify-center px-5 py-2 bg-white text-[#0a0a0a] font-mono font-bold text-sm rounded-none hover:bg-gray-100 transition-colors duration-200"
              >
                Donate
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 5h14M3 10h14M3 15h14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav
        items={topNav}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  )
}
