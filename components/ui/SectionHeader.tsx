interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  label?: string
}

export default function SectionHeader({
  title,
  subtitle,
  align = 'left',
  className = '',
  label,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={['mb-12', alignClass, className].join(' ')}>
      {label && (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-4 bg-[#7C3AED]" />
          <span className="font-mono text-[#7C3AED] text-xs tracking-[0.2em] uppercase">
            {label}
          </span>
        </div>
      )}
      <h2 className="font-display font-bold text-white text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-gray-400 text-base leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
