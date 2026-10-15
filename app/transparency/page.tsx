import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { transparencyIntro, transparencyCategories } from '@/data/transparency'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Eyebrow from '@/components/ui/Eyebrow'
import DecorativeBg from '@/components/ui/DecorativeBg'
import PageCTA from '@/components/shared/PageCTA'
import JsonLd from '@/components/shared/JsonLd'
import { breadcrumbJsonLd } from '@/lib/agentSeo'

export const metadata = generatePageMetadata({
  title: 'Transparency',
  description:
    'The public record of the 256 Foundation: mission, board, incorporation, IRS status, the Form 990 lookup, the grants timeline, and the key public policies.',
  path: '/transparency',
  ogImage: '/og/og-transparency.png',
})

const linkClass =
  'text-gray-600 dark:text-gray-400 hover:text-[#3b1445] dark:hover:text-[#c084d8] text-sm transition-colors duration-150'

export default function TransparencyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Transparency', path: '/transparency' }])} />

      {/* Hero */}
      <SectionWrapper decorative className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <DecorativeBg glowPosition="50% 0%" gridOpacity={0.07} />
        <div className="max-w-2xl">
          <Eyebrow className="mb-4">{transparencyIntro.eyebrow}</Eyebrow>
          <h1 className="font-display font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl uppercase mb-6">
            {transparencyIntro.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            {transparencyIntro.body}
          </p>
        </div>
      </SectionWrapper>

      {/* Categories */}
      <SectionWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {transparencyCategories.map((category) => (
            <div key={category.title}>
              <h2 className="font-display font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider pb-3 mb-3 border-b border-gray-200 dark:border-[#1f1f1f]">
                {category.title}
              </h2>
              {category.items.length > 0 ? (
                <ul className="space-y-2.5">
                  {category.items.map((item) => (
                    <li key={item.href}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${linkClass} inline-flex items-center gap-1.5`}
                        >
                          {item.label}
                          <svg aria-hidden="true" className="w-2.5 h-2.5 opacity-50" viewBox="0 0 10 10" fill="currentColor">
                            <path d="M8 1H5V0h5v5H9V2L4 7l-.707-.707L8 1zM0 9V4h1v4h4v1H0z" />
                          </svg>
                        </a>
                      ) : (
                        <Link href={item.href} className={linkClass}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">{category.note}</p>
              )}
            </div>
          ))}
        </div>
      </SectionWrapper>

      <PageCTA
        kicker="Go Deeper"
        title="Read the record, then the story."
        body="The filings and policies above are the standing documents. The grants timeline and the newsroom carry the running account."
      />
    </>
  )
}
