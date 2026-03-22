import Link from 'next/link'
import { footerFoundationLinks, footerCommunityLinks } from '@/data/navigation'
import Logo from '@/components/ui/Logo'

const socialLinks = [
  {
    label: 'X',
    href: 'https://x.com/256FOUNDATION',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.727-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/256foundation',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/the256foundation',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: 'Nostr',
    href: 'https://primal.net/p/nprofile1qqsqhk42dz0exfcsln4yqmdkjys0nvd7dqndgacpsa7w7pt7njq2uuss2u9cq',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#1f1f1f] bg-[#0a0a0a]">
      {/* Purple accent line at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#7C3AED]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="mb-3">
              <Logo height={52} inverted />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mt-3 max-w-xs">
              Building the open-source Bitcoin mining ecosystem.
            </p>
            <p className="font-mono text-gray-700 text-xs mt-4">
              A 501(c)(3) nonprofit organization
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 flex items-center justify-center border border-[#1f1f1f] rounded-sm text-gray-500 hover:text-[#7C3AED] hover:border-[#7C3AED]/40 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Foundation links */}
          <div className="lg:col-span-3">
            <h3 className="font-display font-bold text-white text-xs mb-5 uppercase tracking-[0.15em]">
              Foundation
            </h3>
            <ul className="space-y-3">
              {footerFoundationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-[#7C3AED] text-sm font-mono transition-colors duration-150 group flex items-center gap-1.5"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#7C3AED] transition-all duration-200 overflow-hidden" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community links */}
          <div className="lg:col-span-3">
            <h3 className="font-display font-bold text-white text-xs mb-5 uppercase tracking-[0.15em]">
              Community
            </h3>
            <ul className="space-y-3">
              {footerCommunityLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#7C3AED] text-sm font-mono transition-colors duration-150 group flex items-center gap-1.5"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#7C3AED] transition-all duration-200 overflow-hidden" />
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

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#1f1f1f] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-gray-700 text-xs">
            &copy; 2024&ndash;{year} 256 Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-1 font-mono text-xs text-gray-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]" style={{ boxShadow: '0 0 4px #00FF41' }} />
            <span>Open source. Always.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
