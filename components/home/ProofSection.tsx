import Link from 'next/link'
import SectionWrapper from '@/components/ui/SectionWrapper'

/** Bitcoin block height found on the first Telehash, from data/telehash.ts. */
const BLOCK_HEIGHT = '881423'

interface ProofSectionProps {
  videoUrl?: string
}

/** The proof: a real block, found in public, and the kit that ran together. */
export default function ProofSection({ videoUrl }: ProofSectionProps) {
  const isPlaceholder = !videoUrl || videoUrl.includes('PLACEHOLDER')

  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Left: the block */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#00FF41]"
              style={{ boxShadow: '0 0 6px #00FF41' }}
            />
            <span className="font-mono text-[#00FF41] text-xs tracking-[0.2em] uppercase">
              Block found
            </span>
          </div>

          <div
            className="font-display font-bold text-[#00FF41] text-6xl sm:text-7xl lg:text-8xl leading-none"
            style={{ textShadow: '0 0 24px rgba(0,255,65,0.5)' }}
          >
            {BLOCK_HEIGHT}
          </div>
          <div className="mt-2 font-mono text-[#00FF41]/70 text-sm">
            Bitcoin block, found by our community
          </div>

          <div className="mt-8 space-y-4 max-w-md">
            <p className="font-display font-bold text-gray-900 dark:text-white text-xl uppercase leading-tight">
              They run.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              In 2026, miners around the world pointed hashrate at our pool and found Bitcoin block
              881423. Nine months later, our four projects ran together as a complete open-source
              mining kit. Real work, in public.
            </p>
          </div>

          <Link
            href="/our-work"
            className="mt-8 inline-flex font-mono text-[#3b1445] dark:text-[#c084d8] text-sm hover:underline transition-colors"
          >
            Our work →
          </Link>
        </div>

        {/* Right: the block-find video */}
        <div className="overflow-hidden border border-gray-200 dark:border-[#1f1f1f] bg-white dark:bg-[#1a1a1a]">
          {isPlaceholder ? (
            <div className="aspect-video flex items-center justify-center bg-gray-50 dark:bg-[#1a1a1a]">
              <div className="text-center">
                <div className="text-[#3b1445] dark:text-[#c084d8] font-mono text-sm mb-2">
                  ▶ Block Find Video
                </div>
                <div className="text-gray-500 text-xs">Video will be embedded here</div>
              </div>
            </div>
          ) : (
            <div className="aspect-video">
              <iframe
                src={videoUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
                title="Telehash 1 - Block Found"
              />
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
