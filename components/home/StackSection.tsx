import Link from 'next/link'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import { pillarProjects } from '@/data/projects'

/** Short homepage label + category chip per layer. */
const layerMeta: Record<string, { blurb: string; chip: string }> = {
  'ember-one': { blurb: 'Open hashboard reference design', chip: 'Hardware' },
  'libre-board': { blurb: 'Open control board reference design', chip: 'Hardware' },
  mujina: { blurb: 'Open mining firmware, the Linux OS of Bitcoin mining', chip: 'Firmware' },
  hydrapool: { blurb: 'One-click open-source mining pool', chip: 'Software' },
}

/** The four building blocks, ordered silicon → pool in the data file. */
export default function StackSection() {
  return (
    <SectionWrapper>
      <div className="max-w-2xl">
        <Eyebrow className="mb-4">The Stack</Eyebrow>
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase">
          It takes the recipes.
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mt-3">
          A miner is four unique building blocks. We open-sourced all four.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-[#1f1f1f]">
        {pillarProjects.map((project) => {
          const meta = layerMeta[project.slug]
          const logoSrc = project.logo?.icon ?? project.logo?.character

          return (
            <Link
              key={project.slug}
              href={`/projects#${project.slug}`}
              className="group relative flex flex-col gap-4 bg-white dark:bg-[#0d0d0d] p-6 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-[#161616]"
            >
              <span className="self-start border border-[#3b1445]/40 dark:border-[#5c2070]/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#3b1445] dark:text-[#c084d8]">
                {meta?.chip}
              </span>

              <div className="flex h-20 items-center justify-center py-2">
                {logoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoSrc} alt={project.name} className="max-h-16 max-w-full object-contain" />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center bg-[#3b1445]/10 font-mono text-xl font-bold text-[#3b1445] dark:text-[#c084d8]">
                    {project.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase transition-colors group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8]">
                  {project.name}
                </h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{meta?.blurb}</p>
              </div>

              <span className="font-mono text-xs text-[#3b1445] opacity-0 transition-opacity group-hover:opacity-100 dark:text-[#c084d8]">
                View →
              </span>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Together, the four form the Development Kit.
        </p>
        <Button variant="outlined" href="/projects">
          See the mining stack →
        </Button>
      </div>
    </SectionWrapper>
  )
}
