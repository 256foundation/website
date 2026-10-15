import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import {
  transparencyIntro,
  transparencyRecords,
  transparencyPolicies,
  transparencyReport,
} from '@/data/transparency'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Eyebrow from '@/components/ui/Eyebrow'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Panel from '@/components/ui/Panel'
import DecorativeBg from '@/components/ui/DecorativeBg'
import PageCTA from '@/components/shared/PageCTA'
import JsonLd from '@/components/shared/JsonLd'
import { breadcrumbJsonLd } from '@/lib/agentSeo'
import type { TransparencyItem } from '@/types'

export const metadata = generatePageMetadata({
  title: 'Transparency',
  description:
    'The public record of the 256 Foundation: mission, incorporation, IRS status, the Form 990 lookup, the grants timeline, and the key public policies. Already public, gathered in one place.',
  path: '/transparency',
  ogImage: '/og/og-transparency.png',
})

/** One entry: a title link plus the one-line reason it is here. */
function TransparencyCard({ item }: { item: TransparencyItem }) {
  const title = (
    <>
      {item.title}
      {item.external && (
        <svg
          aria-hidden="true"
          className="w-3 h-3 shrink-0"
          viewBox="0 0 10 10"
          fill="currentColor"
        >
          <path d="M8 1H5V0h5v5H9V2L4 7l-.707-.707L8 1zM0 9V4h1v4h4v1H0z" />
        </svg>
      )}
    </>
  )

  const titleClasses =
    'inline-flex items-center gap-2 font-display font-bold text-gray-900 dark:text-white text-lg uppercase hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-colors'

  return (
    <Card className="flex flex-col">
      {item.external ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className={titleClasses}>
          {title}
        </a>
      ) : (
        <Link href={item.href} className={titleClasses}>
          {title}
        </Link>
      )}
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-3">
        {item.description}
      </p>
      {item.note && (
        <p className="font-mono text-gray-500 dark:text-gray-400 text-xs mt-4">{item.note}</p>
      )}
    </Card>
  )
}

export default function TransparencyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Transparency', path: '/transparency' }])} />

      {/* Hero */}
      <SectionWrapper decorative className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <DecorativeBg glowPosition="50% 0%" gridOpacity={0.07} />
        <div className="max-w-3xl">
          <Eyebrow className="mb-4">{transparencyIntro.eyebrow}</Eyebrow>
          <h1 className="font-display font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase mb-6">
            {transparencyIntro.title.replace('by default.', '')}
            <span className="text-[#c084d8]">by default</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
            {transparencyIntro.lead}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mt-4 border-l-2 border-[#3b1445]/40 dark:border-[#5c2070]/50 pl-4">
            {transparencyIntro.money}
          </p>
        </div>
      </SectionWrapper>

      {/* The public record */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="max-w-2xl mb-8">
          <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-2">
            The public record
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Filings, credentials, and history that are already public or already available on
            request.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {transparencyRecords.map((item) => (
            <TransparencyCard key={item.title} item={item} />
          ))}
        </div>
      </SectionWrapper>

      {/* Policies */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="max-w-2xl mb-8">
          <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-2">
            How we operate
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            The key policies that govern how outsiders interact with the Foundation. Not the full
            set, only the six that matter most from the outside.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {transparencyPolicies.map((item) => (
            <TransparencyCard key={item.title} item={item} />
          ))}
        </div>
      </SectionWrapper>

      {/* Transparency report, defined here, published separately */}
      <SectionWrapper>
        <Panel
          label={transparencyReport.eyebrow}
          status={
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b1445] dark:bg-[#c084d8] animate-pulse" />
              {transparencyReport.status}
            </span>
          }
        >
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl sm:text-2xl uppercase mb-4">
              {transparencyReport.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
              {transparencyReport.body}
            </p>
            <ul className="space-y-3">
              {transparencyReport.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-gray-500 dark:text-gray-400 text-sm leading-relaxed"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 block w-1.5 h-1.5 shrink-0 bg-[#3b1445] dark:bg-[#c084d8]"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </SectionWrapper>

      <PageCTA
        kicker="Go Deeper"
        title="Read the record, then the story."
        body="The filings and policies above are the standing documents. The grants timeline and the newsroom carry the running account."
        extra={
          <Button variant="outlined" size="lg" href="/grants/announcements">
            Grants timeline →
          </Button>
        }
      />
    </>
  )
}
