import Link from 'next/link'
import { footerFoundationLinks, footerResourcesLinks, footerCommunityLinks } from '@/data/navigation'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 dark:border-[#3b1445]/25 bg-white dark:bg-[#1e1028]">
      {/* Purple accent line at top */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#5c2070] to-transparent dark:via-[#3b1445]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="mb-3">
              <Logo variant="secondary" height={52} />
            </div>
            <p className="text-gray-500 dark:text-gray-500 text-sm leading-relaxed mt-3 max-w-xs">
              Open-Sourcing Bitcoin Mining
            </p>
            <p className="font-mono text-gray-400 dark:text-gray-700 text-xs mt-4">
              A 501(c)(3) nonprofit organization
            </p>
            <a
              href="mailto:contact@256foundation.org"
              className="inline-block font-mono text-gray-500 dark:text-gray-500 text-xs mt-2 hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors duration-150"
            >
              contact@256foundation.org
            </a>

            {/* Primary actions */}
            <div className="flex items-center gap-3 mt-6">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[#3b1445] text-white font-mono font-bold text-sm rounded-none hover:bg-[#2d0f36] transition-colors duration-200"
              >
                Donate
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 dark:border-[#3f3f3f] text-gray-700 dark:text-gray-200 font-mono font-bold text-sm rounded-none hover:border-[#3b1445] dark:hover:border-[#5c2070] hover:text-gray-900 dark:hover:text-white hover:bg-[#3b1445]/10 transition-all duration-200"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Link columns, equal width; short labels keep content gaps even */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10">
            {/* Foundation links */}
            <div className="min-w-0">
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-xs mb-5 uppercase tracking-[0.15em] flex items-center gap-2">
                <span className="w-1 h-3 bg-[#3b1445] dark:bg-[#5c2070] inline-block flex-shrink-0" />
                Foundation
              </h3>
              <ul className="space-y-3">
                {footerFoundationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-[#3b1445] dark:hover:text-[#c084d8] text-sm font-mono transition-colors duration-150 group flex items-center gap-1.5"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#3b1445] transition-all duration-200 overflow-hidden" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources, supplemental on-site pages */}
            <div className="min-w-0">
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-xs mb-5 uppercase tracking-[0.15em] flex items-center gap-2">
                <span className="w-1 h-3 border border-[#3b1445] dark:border-[#5c2070] inline-block flex-shrink-0" />
                Resources
              </h3>
              <ul className="space-y-3">
                {footerResourcesLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-[#3b1445] dark:hover:text-[#c084d8] text-sm font-mono transition-colors duration-150 group flex items-center gap-1.5"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#3b1445] transition-all duration-200 overflow-hidden" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Elsewhere, external channels */}
            <div className="min-w-0">
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-xs mb-5 uppercase tracking-[0.15em] flex items-center gap-2">
                <span className="w-1 h-3 bg-[#3b1445] dark:bg-[#5c2070] inline-block flex-shrink-0" />
                Elsewhere
              </h3>
              <ul className="space-y-3">
                {footerCommunityLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#3b1445] dark:hover:text-[#c084d8] text-sm font-mono transition-colors duration-150 group flex items-center gap-1.5"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#3b1445] transition-all duration-200 overflow-hidden" />
                      {link.label}
                      <svg className="w-2.5 h-2.5 opacity-30 group-hover:opacity-60 transition-opacity" viewBox="0 0 10 10" fill="currentColor">
                        <path d="M8 1H5V0h5v5H9V2L4 7l-.707-.707L8 1zM0 9V4h1v4h4v1H0z" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-[#3b1445]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-gray-400 dark:text-gray-700 text-xs">
            &copy; 2024&ndash;{year} 256 Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-1 font-mono text-xs text-gray-400 dark:text-gray-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]" style={{ boxShadow: '0 0 4px #00FF41' }} />
            <span>Open source. Always.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
