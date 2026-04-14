import type { ReactNode, ElementType } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  as?: ElementType
  hover?: boolean
  onClick?: () => void
}

export default function Card({
  children,
  className = '',
  as: Tag = 'div',
  hover = false,
  onClick,
}: CardProps) {
  return (
    <Tag
      onClick={onClick}
      className={[
        'bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-6',
        hover
          ? 'transition-all duration-200 hover:border-[#7C3AED]/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] cursor-pointer'
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
