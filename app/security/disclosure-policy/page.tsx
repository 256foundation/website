import { generatePageMetadata } from '@/lib/metadata'
import { disclosurePolicy, type DisclosureSection } from '@/data/disclosurePolicy'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Eyebrow from '@/components/ui/Eyebrow'
import DecorativeBg from '@/components/ui/DecorativeBg'
import TextLink from '@/components/ui/TextLink'
import JsonLd from '@/components/shared/JsonLd'
import { breadcrumbJsonLd } from '@/lib/agentSeo'

export const metadata = generatePageMetadata({
  title: disclosurePolicy.title,
  description: `${disclosurePolicy.adopted}. Report vulnerabilities in 256F projects to security@256foundation.org.`,
  path: disclosurePolicy.path,
  ogImage: '/og/og-disclosure.png',
})

function sectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Renders policy text unchanged, with the security address as a mailto link. */
function PolicyText({ text }: { text: string }) {
  const email = disclosurePolicy.contact
  const index = text.indexOf(email)
  if (index === -1) return text
  return (
    <>
      {text.slice(0, index)}
      <a
        href={`mailto:${email}`}
        className="text-[#3b1445] dark:text-[#c084d8] hover:underline"
      >
        {email}
      </a>
      {text.slice(index + email.length)}
    </>
  )
}

function PolicySection({ section }: { section: DisclosureSection }) {
  return (
    <section id={sectionId(section.heading)} className="scroll-mt-24">
      <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl sm:text-2xl uppercase mb-4">
        {section.heading}
      </h2>
      {section.paragraphs?.map((paragraph) => (
        <p
          key={paragraph}
          className={[
            'text-gray-600 dark:text-gray-400 text-base leading-relaxed',
            section.list ? 'mb-3' : 'mb-4 last:mb-0',
          ].join(' ')}
        >
          <PolicyText text={paragraph} />
        </p>
      ))}
      {section.list && (
        <ul className="space-y-2.5">
          {section.list.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-base leading-relaxed"
            >
              <span
                aria-hidden="true"
                className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 bg-[#3b1445] dark:bg-[#c084d8]"
              />
              <span>
                <PolicyText text={item} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function DisclosurePolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: disclosurePolicy.title, path: disclosurePolicy.path }])}
      />

      <SectionWrapper decorative className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <DecorativeBg glowPosition="50% 0%" gridOpacity={0.07} />
        <div className="max-w-3xl">
          <Eyebrow className="mb-4">Policy</Eyebrow>
          <h1 className="font-display font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl uppercase mb-4">
            {disclosurePolicy.title}
          </h1>
          <p className="font-mono text-sm text-[#3b1445] dark:text-[#c084d8] tracking-wide mb-6">
            {disclosurePolicy.adopted}
          </p>
          <TextLink href={disclosurePolicy.pdfPath} external arrow>
            Download PDF
          </TextLink>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <article className="max-w-3xl space-y-10">
          {disclosurePolicy.sections.map((section) => (
            <PolicySection key={section.heading} section={section} />
          ))}
        </article>
        <div className="max-w-3xl mt-12 pt-8 border-t border-gray-200 dark:border-[#1f1f1f] flex flex-wrap gap-x-6 gap-y-3">
          <TextLink href={disclosurePolicy.pdfPath} external arrow>
            Download PDF
          </TextLink>
          <TextLink href="/transparency" muted arrow>
            Transparency
          </TextLink>
        </div>
      </SectionWrapper>
    </>
  )
}
