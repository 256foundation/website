import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outlined'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  href?: string
  external?: boolean
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[#3b1445] text-white font-bold border border-[#3b1445] hover:bg-[#2d0f36] hover:border-[#2d0f36] shadow-[0_0_20px_rgba(59,20,69,0.35)] hover:shadow-[0_0_28px_rgba(59,20,69,0.5)]',
  secondary:
    'bg-transparent text-[#3b1445] dark:text-[#c084d8] font-bold border border-transparent hover:underline',
  outlined:
    'bg-transparent text-[#3b1445] dark:text-[#c084d8] font-bold border border-[#3b1445]/50 dark:border-[#5c2070]/50 hover:border-[#3b1445] dark:hover:border-[#5c2070] hover:bg-[#3b1445]/5',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  disabled,
  loading,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-none font-mono tracking-wide transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#3b1445] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const classes = [base, variantStyles[variant], sizeStyles[size], className].join(' ')

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} disabled={disabled || loading} onClick={onClick} className={classes}>
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}
