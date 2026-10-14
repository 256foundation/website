'use client'

import { useEffect } from 'react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'

/**
 * Route-level error boundary. Keeps the shell and offers a retry; the error is
 * also surfaced to the console for the Umami-less eyeballs.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <SectionWrapper size="hero" className="text-center">
      <Eyebrow centered className="mb-4">Error</Eyebrow>
      <h1 className="font-display font-bold text-gray-900 dark:text-white text-4xl sm:text-5xl uppercase leading-tight">
        Something broke
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-base mt-4 max-w-xl mx-auto">
        An unexpected error stopped this page from rendering. Reloading usually
        clears it.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => reset()}>Try again →</Button>
        <Button variant="outlined" href="/">
          Back home
        </Button>
      </div>
    </SectionWrapper>
  )
}
