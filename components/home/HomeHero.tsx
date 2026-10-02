import Image from 'next/image'
import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'
import HeroScrim from '@/components/ui/HeroScrim'
import PCBBackground from '@/components/ui/PCBBackground'

/**
 * Full-viewport hero. Full-bleed dark shot of the running Development Kit,
 * mirrored so the hardware sits right and the copy sits over the clean left
 * area. Static PCB texture layered over the scrim.
 */
export default function HomeHero() {
  return (
    <section className="relative flex min-h-[92vh] lg:min-h-screen items-center overflow-hidden">
      <Image
        src="/home-hero.webp"
        alt="The 256 Foundation Development Kit running in the open"
        fill
        priority
        sizes="100vw"
        className="-scale-x-100 object-cover object-center"
      />
      <HeroScrim />
      <div aria-hidden="true" className="absolute inset-0 bg-black/25" />
      <PCBBackground opacity={0.08} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-28 lg:pt-32 lg:pb-32">
        <div className="max-w-2xl">
          <Eyebrow onDark className="mb-5">
            The 256 Foundation
          </Eyebrow>
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase">
            Bitcoin mining will be{' '}
            <span className="block text-[#c084d8]">open-source,</span>
            or Bitcoin remains permissioned
          </h1>
          <p className="mt-5 text-gray-200 text-lg leading-relaxed max-w-xl">
            We&apos;re building the open-source Bitcoin mining stack.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="onDark" size="lg" href="/our-work">
              See our work →
            </Button>
            <Button variant="onDarkOutlined" size="lg" href="/donate">
              Fund the work →
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute z-10 inset-x-0 bottom-6 lg:bottom-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-mono text-xs tracking-wide text-gray-300">
            <span>Here&apos;s why, and what we&apos;re doing about it</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 14 14"
              className="w-3.5 h-3.5 animate-bounce motion-reduce:animate-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 2v10M3 8l4 4 4-4" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
