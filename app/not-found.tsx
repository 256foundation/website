import SectionWrapper from '@/components/ui/SectionWrapper'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import TextLink from '@/components/ui/TextLink'

/** Branded 404, served from the root layout so header/footer stay in place. */
export default function NotFound() {
  return (
    <SectionWrapper size="hero" className="text-center">
      <Eyebrow centered className="mb-4">404</Eyebrow>
      <h1 className="font-display font-bold text-gray-900 dark:text-white text-4xl sm:text-5xl uppercase leading-tight">
        This page slipped the stack
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-base mt-4 max-w-xl mx-auto">
        The page you were looking for does not exist or has moved. Try the home
        page, or head straight to the work.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href="/">Back home →</Button>
        <Button variant="outlined" href="/projects">
          See the mining stack
        </Button>
      </div>
      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        Looking for something specific?{' '}
        <TextLink href="/contact" arrow>
          Get in touch
        </TextLink>
      </p>
    </SectionWrapper>
  )
}
