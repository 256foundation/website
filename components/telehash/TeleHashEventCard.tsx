import type { TeleHashEvent } from '@/types'
import PhotoCarousel from './PhotoCarousel'

interface TeleHashEventCardProps {
  event: TeleHashEvent
}

export default function TeleHashEventCard({ event }: TeleHashEventCardProps) {
  const isPlaceholder = !event.videoUrl || event.videoUrl.includes('PLACEHOLDER')

  return (
    <div className={`bg-gray-50 dark:bg-[#242424] rounded-none overflow-hidden border ${event.blockFound ? 'border-[#3b1445]/40 dark:border-[#5c2070]/40' : 'border-gray-200 dark:border-[#1f1f1f]'}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-[#1f1f1f]">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="font-display font-bold text-gray-900 dark:text-white text-xl uppercase">
              Telehash {event.number}
            </h3>
            <time className="font-mono text-gray-500 text-sm">
              {new Date(event.date + 'T12:00:00').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          {event.blockFound && (
            <span className="shrink-0 inline-flex items-center px-3 py-1 rounded-none text-sm font-mono font-bold border text-[#00FF41] border-[#00FF41]/40 bg-[#00FF41]/10">
              Block Found!
            </span>
          )}
        </div>

        {event.btcRaised !== undefined && (
          <div className="flex items-center gap-2 mb-3">
            {event.blockUrl ? (
              <a
                href={event.blockUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[#3b1445] dark:text-[#c084d8] text-2xl font-bold hover:underline"
              >
                {event.btcRaised} BTC
              </a>
            ) : (
              <span className="font-display text-[#3b1445] dark:text-[#c084d8] text-2xl font-bold">
                {event.btcRaised} BTC
              </span>
            )}
            <span className="text-gray-500 text-sm">block reward</span>
          </div>
        )}

        {event.summary && (
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{event.summary}</p>
        )}
      </div>

      {/* Photo carousel */}
      {event.photos && event.photos.length > 0 && (
        <PhotoCarousel photos={event.photos} eventName={`Telehash ${event.number}`} />
      )}

      {/* Video embed */}
      {event.videoUrl && (
        <div className="bg-white dark:bg-[#1a1a1a]">
          {isPlaceholder ? (
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-[#3b1445] dark:text-[#c084d8] font-mono text-sm mb-2">&#9654; Event Video</div>
                <div className="text-gray-500 dark:text-gray-600 text-xs">Video coming soon</div>
              </div>
            </div>
          ) : (
            <div className="aspect-video">
              <iframe
                src={event.videoUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
                title={`Telehash ${event.number}`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
