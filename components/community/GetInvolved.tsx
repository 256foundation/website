import Link from 'next/link'
import { communityClose } from '@/data/community'

export default function GetInvolved() {
  return (
    <section className="bg-gray-50 dark:bg-[#242424] border-t border-gray-200 dark:border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-4 bg-[#3b1445] dark:bg-[#c084d8]" />
          <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">
            Get Involved
          </span>
        </div>
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-3">
          Building something open-source for Bitcoin mining?
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mb-10">
          The forum is where it starts. The repos are where it lands.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communityClose.map((block) => (
            <div
              key={block.label}
              className="flex flex-col bg-white dark:bg-[#0d0d0d] border border-gray-200 dark:border-[#1f1f1f] p-6"
            >
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg uppercase mb-2">
                {block.label}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                {block.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {block.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center px-4 py-2 rounded-none text-xs font-mono border border-[#3b1445]/50 dark:border-[#5c2070]/50 text-[#3b1445] dark:text-[#c084d8] hover:border-[#3b1445] dark:hover:border-[#5c2070] hover:bg-[#3b1445]/5 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-gray-500 dark:text-gray-400 text-sm font-mono">
          Not sure where you fit?{' '}
          <Link
            href="/contact"
            className="text-[#3b1445] dark:text-[#c084d8] hover:underline"
          >
            Get in touch →
          </Link>
        </p>
      </div>
    </section>
  )
}
