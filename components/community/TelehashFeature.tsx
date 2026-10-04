import Image from 'next/image'
import Link from 'next/link'
import { telehashFeaturePhoto } from '@/data/community'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'

/**
 * Featured TeleHash block. Uses a real livestream frame as the background so
 * the reader sees what an event looks like; the full story lives on /telehash,
 * which this whole card (and its button) points to.
 */
export default function TelehashFeature() {
  return (
    <div className="group relative isolate flex min-h-[360px] sm:min-h-[440px] lg:min-h-[520px] items-center overflow-hidden border border-[#3b1445]/15 dark:border-[#5c2070]/25">
      <Image
        src={telehashFeaturePhoto}
        alt="A Telehash livestream: the team on stream while the Hydrapool dashboard tracks community hashrate"
        fill
        priority
        sizes="(min-width: 1280px) 1216px, 100vw"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
      />

      {/* Base scrim: keeps copy legible on small screens, where it spans the
          full width and sits over the room. */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/55" />
      {/* On wide screens, ease the scrim toward the right so the stream UI and
          the room still read behind the copy. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 lg:bg-gradient-to-r lg:from-black/70 lg:via-black/20 lg:to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20"
      />
      <div aria-hidden="true" className="absolute top-0 left-0 h-full w-1 bg-[#c084d8]" />

      {/* Whole card links to /telehash; the button is the visual affordance. */}
      <Link
        href="/telehash"
        aria-label="About TeleHash"
        className="absolute inset-0 z-20 focus-visible:outline-2 focus-visible:outline-[#c084d8] focus-visible:outline-offset-[-2px]"
      />

      <div className="relative z-10 w-full p-8 lg:p-12">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow onDark className="mb-4">
              Telehash
            </Eyebrow>
            <h2 className="mb-4 max-w-2xl font-display text-2xl font-bold uppercase leading-tight text-white sm:text-3xl">
              A few times a year, the whole community mines together
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-gray-200">
              Telehash is our occasional in-person mining fundraiser. We get together and livestream
              all day while the global community of supporters points their hashrate at our gamified
              instance of Hydrapool for a chance at a solo block to fund the Foundation. The first
              event found block 881423, seeding the funding for the core projects.
            </p>
          </div>

          <div className="flex lg:col-span-4 lg:justify-end">
            <Button variant="onDark" size="lg" href="/telehash" className="whitespace-nowrap">
              About TeleHash →
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
