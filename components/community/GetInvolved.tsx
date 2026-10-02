import { communityClose } from '@/data/community'
import { surface } from '@/lib/tokens'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import TextLink from '@/components/ui/TextLink'

export default function GetInvolved() {
  return (
    <section className={['border-t border-gray-200 dark:border-[#1f1f1f]', surface('default')].join(' ')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <Eyebrow className="mb-4">Get Involved</Eyebrow>
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase mb-3">
          Building something open-source for Bitcoin mining?
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mb-10">
          The forum is where it starts. The repos are where it lands.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communityClose.map((block) => (
            <div
              key={block.label}
              className={['flex flex-col border p-6', surface('raised')].join(' ')}
            >
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg uppercase mb-2">
                {block.label}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                {block.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {block.links.map((link) => (
                  <Button key={link.href} variant="outlined" size="sm" href={link.href} external={link.external}>
                    {link.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-gray-500 dark:text-gray-400 text-sm font-mono">
          Not sure where you fit?{' '}
          <TextLink href="/contact" arrow>
            Get in touch
          </TextLink>
        </p>
      </div>
    </section>
  )
}
