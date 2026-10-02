import Eyebrow from '@/components/ui/Eyebrow'

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
      {label && <Eyebrow centered={align === 'center'} className="mb-4">{label}</Eyebrow>}
      <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-gray-600 dark:text-gray-400 text-base leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
