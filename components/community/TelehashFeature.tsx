import { surface } from '@/lib/tokens'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'

/**
 * Featured TeleHash block. The full story lives on /telehash; this is the
 * community-page pointer to it.
 */
export default function TelehashFeature() {
  return (
    <div className={`relative overflow-hidden isolate ${surface('tinted')} border p-8 lg:p-12`}>
      <div aria-hidden="true" className="absolute top-0 left-0 w-1 h-full bg-[#3b1445] dark:bg-[#c084d8]" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8">
          <Eyebrow className="mb-4">Telehash</Eyebrow>
          <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase leading-tight mb-4 max-w-2xl">
            A few times a year, the whole community mines together
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xl">
            Telehash is our occasional in-person mining fundraiser. We get together and livestream
            all day while the global community of supporters points their hashrate at our gamified
            instance of Hydrapool for a chance at a solo block to fund the Foundation. The first
            event found block 881423, seeding the funding for the core projects.
          </p>
        </div>

        <div className="lg:col-span-4 flex lg:justify-end">
          <Button variant="primary" size="lg" href="/telehash" className="whitespace-nowrap">
            About TeleHash →
          </Button>
        </div>
      </div>
    </div>
  )
}
