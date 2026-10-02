import type { ReactNode, ElementType } from 'react'
import { surface, type SurfaceLevel } from '@/lib/tokens'

interface CardProps {
  children: ReactNode
  className?: string
  as?: ElementType
  hover?: boolean
  /** Surface token level. Defaults to the base surface. */
  level?: SurfaceLevel
  onClick?: () => void
}

export default function Card({
  children,
  className = '',
  as: Tag = 'div',
  hover = false,
  level = 'default',
  onClick,
}: CardProps) {
  return (
    <Tag
      onClick={onClick}
      className={[
        surface(level),
        'border rounded-none p-6',
        hover
          ? 'transition-all duration-200 hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:shadow-[0_0_20px_rgba(59,20,69,0.15)] cursor-pointer'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  )
}
