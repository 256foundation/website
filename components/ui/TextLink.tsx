import Link from 'next/link'
import type { ReactNode } from 'react'

interface TextLinkProps {
  children: ReactNode
  href: string
  external?: boolean
  /** Append the standard arrow glyph. Defaults to false. */
  arrow?: boolean
  /** Muted gray treatment for secondary utility links. */
  muted?: boolean
  className?: string
}

/**
 * The single inline text-link style (accent color, hover underline, arrow
 * convention). Use for "back to…", "questions? get in touch", utility links,
 * and anywhere an inline link sits in body copy.
 */
export default function TextLink({
  children,
  href,
  external = false,
  arrow = false,
  muted = false,
  className = '',
}: TextLinkProps) {
  const classes = [
    'inline-flex items-center gap-1 font-mono text-xs transition-colors',
    muted
      ? 'text-gray-500 dark:text-gray-400 hover:text-[#3b1445] dark:hover:text-[#c084d8]'
      : 'text-[#3b1445] dark:text-[#c084d8] hover:underline',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {children}
      {arrow && <span aria-hidden="true">→</span>}
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}
