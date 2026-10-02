import { generatePageMetadata } from '@/lib/metadata'
import SectionWrapper from '@/components/ui/SectionWrapper'
import DecorativeBg from '@/components/ui/DecorativeBg'
import ContactForm from '@/components/home/ContactForm'

export const metadata = generatePageMetadata({
  title: 'Contact',
  description:
    "Get in touch with the 256 Foundation. Questions about our grants, donations, or the open-source Bitcoin mining stack — we'd love to hear from you.",
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper decorative className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <DecorativeBg glowPosition="50% 0%" gridOpacity={0.07} />
        <div className="max-w-2xl">
          <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-widest uppercase mb-4">
            Contact
          </p>
          <h1 className="font-display font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl uppercase mb-6">
            Get in touch
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            Have a question or want to get involved? Whether it&apos;s a grant, a donation, or a
            project you think belongs in the open stack, we&apos;d love to hear from you.
          </p>
        </div>
      </SectionWrapper>

      {/* Form */}
      <SectionWrapper>
        <ContactForm />
        <p className="mt-10 pt-8 border-t border-gray-200 dark:border-[#1f1f1f] text-gray-500 dark:text-gray-400 text-sm font-mono">
          Prefer email?{' '}
          <a
            href="mailto:contact@256foundation.org"
            className="text-[#3b1445] dark:text-[#c084d8] hover:underline"
          >
            contact@256foundation.org
          </a>
        </p>
      </SectionWrapper>
    </>
  )
}
