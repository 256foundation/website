import Link from 'next/link'
import type { SiteStats } from '@/types'

interface BlocksFoundProps {
  stats: SiteStats
  videoUrl?: string
}

export default function BlocksFound({ stats, videoUrl }: BlocksFoundProps) {
  const isPlaceholder = !videoUrl || videoUrl.includes('PLACEHOLDER')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Left: block count + blurb */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-4 bg-[#00FF41]" />
          <span className="font-mono text-[#00FF41] text-xs tracking-[0.2em] uppercase">TeleHash</span>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <span
            className="font-display font-bold text-[#00FF41] text-6xl sm:text-7xl leading-none"
            style={{ textShadow: '0 0 20px #00FF41' }}
          >
            {stats.blocksFound}
          </span>
          <div>
            <div className="font-display font-bold text-gray-900 dark:text-white text-xl uppercase">Bitcoin Block</div>
            <div className="font-mono text-[#00FF41]/70 text-sm">Found by our community</div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
          On our very first TeleHash event &mdash; an 8-hour community livestream &mdash; miners around
          the world pointed their hashrate to our pool. Against the odds, we found a block
          and raised the initial funding that launched the 256 Foundation.
        </p>
        <Link
          href="/telehash"
          className="font-mono text-[#7C3AED] text-sm hover:underline transition-colors inline-flex items-center gap-1"
        >
          Learn About TeleHash &rarr;
        </Link>
      </div>

      {/* Right: YouTube embed */}
      <div className="rounded-none overflow-hidden border border-gray-200 dark:border-[#1f1f1f] bg-white dark:bg-[#1a1a1a]">
        {isPlaceholder ? (
          <div className="aspect-video flex items-center justify-center bg-gray-50 dark:bg-[#242424]">
            <div className="text-center">
              <div className="text-[#7C3AED] font-mono text-sm mb-2">&#9654; Block Find Video</div>
              <div className="text-gray-500 text-xs">Video will be embedded here</div>
            </div>
          </div>
        ) : (
          <div className="aspect-video">
            <iframe
              src={videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title="TeleHash 1 - Block Found"
            />
          </div>
        )}
      </div>
    </div>
  )
}
