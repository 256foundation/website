import type { ComponentPropsWithoutRef } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'

interface PostBodyProps {
  content: string
}

/**
 * Posts link out heavily (project sites, GitHub, X threads). Sending those to
 * a new tab keeps the article open behind them; in-site links (/donate,
 * /projects/…) and mailto: stay in place and navigate normally.
 */
const components = {
  a: ({ href = '', ...props }: ComponentPropsWithoutRef<'a'>) => {
    const isExternal = /^https?:\/\//i.test(href)
    return isExternal ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ) : (
      <a href={href} {...props} />
    )
  },
}

export default function PostBody({ content }: PostBodyProps) {
  return (
    <div className="newsroom-body text-gray-700 dark:text-gray-300 leading-relaxed text-base max-w-none">
      <MDXRemote source={content} components={components} />
    </div>
  )
}
