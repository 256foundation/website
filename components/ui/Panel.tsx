import type { ReactNode } from 'react'
import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'

interface PanelFooterLink {
  label: string
  href: string
  external?: boolean
}

interface PanelProps {
  /** Header eyebrow label. */
  label: string
  /** Optional node rendered at the right of the header (e.g. a status pill). */
  status?: ReactNode
  children: ReactNode
  /** Optional primary footer CTA rendered as a filled purple bar. */
  footer?: PanelFooterLink
  /** Stretch to the height of its grid cell. */
  fullHeight?: boolean
  className?: string
}

/**
 * Boxed action panel: header bar, body, optional footer CTA. The motif used by
 * the donate / telehash / faq heroes, extracted so it stays consistent anywhere
 * a hero or section needs a contained box.
 */
export default function Panel({ label, status, children, footer, fullHeight, className = '' }: PanelProps) {
  return (
    <div
      className={[
        'flex flex-col border border-gray-200 dark:border-[#1f1f1f]',
        fullHeight ? 'h-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#1a1a1a] px-6 py-4">
        <Eyebrow>{label}</Eyebrow>
        {status}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">{children}</div>

      {footer && (
        <PanelFooterLink {...footer} />
      )}
    </div>
  )
}

function PanelFooterLink({ label, href, external }: PanelFooterLink) {
  const classes =
    'flex items-center justify-between gap-3 bg-[#3b1445] px-6 py-4 font-mono text-white text-sm uppercase tracking-wider hover:bg-[#2d0f36] transition-colors'
  const inner = (
    <>
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </>
  )
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  )
}
