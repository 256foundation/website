import { surface } from '@/lib/tokens'
import DecorativeBg from '@/components/ui/DecorativeBg'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'

export default function ApplySection() {
  return (
    <div className={['relative overflow-hidden isolate rounded-none', surface('tinted')].join(' ')}>
      {/* Purple left accent bar */}
      <div className="absolute top-0 left-0 w-1 h-full bg-[#3b1445]" />
      <DecorativeBg glowPosition="100% 50%" glowOpacity={0.06} gridOpacity={0.06} vignette={false} />

      <div className="relative z-10 p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <Eyebrow className="mb-4">General Grant Program</Eyebrow>
            <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4 max-w-2xl uppercase">
              Fund Your Open-Source Mining Project
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xl">
               The 256 Foundation funds community-driven open-source mining projects — open hardware,
               firmware, pool software, research, and tooling. Apply with a scope of your own, or a
               scope of work on one of ours. Follow our channels for updates.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {['Open Hardware', 'Firmware', 'Pool Software', 'Research', 'Education'].map((tag) => (
                <span key={tag} className="font-mono text-xs px-2.5 py-1 border border-[#3b1445]/40 dark:border-[#5c2070]/40 text-[#3b1445]/80 dark:text-[#c084d8]/60 rounded-none">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Button variant="primary" size="lg" href="/grants" className="whitespace-nowrap">
              Learn More →
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
