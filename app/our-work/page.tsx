import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { pillarProjects } from '@/data/projects'
import {
  ourWorkHero,
  ourWorkThesis,
  ourWorkStatusQuo,
  ourWorkVision,
  ourWorkProof,
  ourWorkPrograms,
  ourWorkClose,
} from '@/data/ourWork'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'

/**
 * First-pass /our-work. Every section of the agreed outline is present but
 * light; copy and art get dialed in later. Claim discipline applies: no
 * amounts, project achievements belong to the projects, exact program names.
 */
export const metadata = generatePageMetadata({
  title: 'Our Work',
  description:
    'We are commoditizing the Bitcoin mining stack. The 256 Foundation funds the open-source stack, because a company cannot do this and a closed industry will not.',
  path: '/our-work',
})

function SectionKicker({ children, centered }: { children: ReactNode; centered?: boolean }) {
  return (
    <div className={['flex items-center gap-3 mb-4', centered ? 'justify-center' : ''].join(' ')}>
      <span aria-hidden="true" className="block w-1.5 h-4 bg-[#3b1445] dark:bg-[#c084d8]" />
      <span className="font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-sm tracking-[0.28em] uppercase">
        {children}
      </span>
    </div>
  )
}

/** One-line layer note per core project, keyed by slug. */
const projectLines: Record<string, string> = {
  'ember-one': 'The open hash board.',
  'libre-board': 'The open control board.',
  mujina: 'The open firmware.',
  hydrapool: 'The open pool.',
}

export default function OurWorkPage() {
  return (
    <>
      {/* Hero — full-bleed image with overlaid copy */}
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-[#1f1f1f]">
        <Image
          src="/mission-background.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        <SectionWrapper className="relative z-10 flex min-h-[560px] lg:min-h-[640px] items-center">
          <div className="max-w-2xl">
            <p className="font-mono text-[#c084d8] text-xs tracking-[0.2em] uppercase mb-4">
              {ourWorkHero.kicker}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white uppercase mb-5">
              We are commoditizing the <span className="text-[#c084d8]">Bitcoin mining stack</span>.
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-8">{ourWorkHero.line}</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" href="/donate">
                Fund the work →
              </Button>
              <Button variant="outlined" size="lg" href="/projects">
                See the stack →
              </Button>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* The thesis */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="max-w-3xl">
          <SectionKicker>{ourWorkThesis.kicker}</SectionKicker>
          <blockquote className="border-l-4 border-[#3b1445] dark:border-[#c084d8] pl-6 py-2 mb-8">
            <p className="font-display text-gray-900 dark:text-white text-xl sm:text-2xl leading-relaxed uppercase">
              &ldquo;{ourWorkThesis.quote}&rdquo;
            </p>
          </blockquote>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            {ourWorkThesis.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* The status quo */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <SectionKicker>{ourWorkStatusQuo.kicker}</SectionKicker>
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed max-w-2xl mb-8">
          {ourWorkStatusQuo.intro}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-[#1f1f1f]">
          {ourWorkStatusQuo.blocks.map((block) => (
            <div key={block.title} className="bg-white dark:bg-[#0d0d0d] p-6">
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase mb-2">
                {block.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{block.body}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-8">
          {ourWorkStatusQuo.ending}{' '}
          <Link href="/projects" className="text-[#3b1445] dark:text-[#c084d8] hover:underline">
            See the stack →
          </Link>
        </p>
      </SectionWrapper>

      {/* The vision */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="max-w-3xl">
          <SectionKicker>{ourWorkVision.kicker}</SectionKicker>
          <p className="font-display text-gray-900 dark:text-white text-xl sm:text-2xl leading-relaxed uppercase">
            {ourWorkVision.body}
          </p>
        </div>
      </SectionWrapper>

      {/* Proof of work */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <SectionKicker>{ourWorkProof.kicker}</SectionKicker>
        <div className="max-w-3xl space-y-4 text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-10">
          {ourWorkProof.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-2xl mb-8">
          {ourWorkProof.kitLine}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-[#1f1f1f]">
          {pillarProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects#${project.slug}`}
              className="group bg-white dark:bg-[#0d0d0d] p-6 hover:bg-gray-50 dark:hover:bg-[#161616] transition-colors"
            >
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors">
                {project.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1.5">
                {projectLines[project.slug]}
              </p>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* How we work */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="max-w-3xl">
          <SectionKicker>How We Work</SectionKicker>
          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6">
            Every grant runs under a written scope, board approval, and a grant agreement that keeps
            the work open-source, paid monthly under renewable terms. There are two doors.
          </p>
          <Link
            href="/grants"
            className="text-[#3b1445] dark:text-[#c084d8] font-mono text-sm hover:underline"
          >
            How grants work →
          </Link>
        </div>
      </SectionWrapper>

      {/* Beyond the kit */}
      <SectionWrapper className="border-b border-gray-200 dark:border-[#1f1f1f]">
        <SectionKicker>{ourWorkPrograms.kicker}</SectionKicker>
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed max-w-2xl mb-10">
          {ourWorkPrograms.intro}
        </p>
        {/* A numbered list rather than a grid: five items never leave an orphaned
            last cell, and it holds at any aspect ratio. */}
        <div className="max-w-3xl border-y border-gray-200 dark:border-[#1f1f1f] divide-y divide-gray-200 dark:divide-[#1f1f1f]">
          {ourWorkPrograms.programs.map((program, i) => (
            <div key={program.name} className="flex flex-col gap-1.5 py-6 sm:flex-row sm:gap-6">
              <span
                aria-hidden="true"
                className="font-mono text-xs text-[#3b1445] dark:text-[#c084d8] opacity-60 sm:w-10 sm:shrink-0 sm:pt-1"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase mb-1.5">
                  {program.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-2xl">
                  {program.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Close */}
      <SectionWrapper className="max-w-3xl mx-auto text-center">
        <SectionKicker centered>{ourWorkClose.kicker}</SectionKicker>
        <p className="font-display text-gray-900 dark:text-white text-xl sm:text-2xl leading-snug uppercase mb-5">
          {ourWorkClose.line}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xl mx-auto mb-8">
          {ourWorkClose.body}
        </p>
        <Button variant="primary" size="lg" href="/donate">
          Become a supporter →
        </Button>
      </SectionWrapper>
    </>
  )
}
