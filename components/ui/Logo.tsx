type LogoVariant = 'horizontal' | 'square' | 'vertical' | 'circular'

const LOGO_ASSETS: Record<LogoVariant, { black: string; white: string; width: number; height: number }> = {
  horizontal: {
    black: '/logos/256-logo-horizontal-black.png',
    white: '/logos/256-logo-horizontal-white.png',
    width: 4096,
    height: 1714,
  },
  square: {
    black: '/logos/256-logo-square-black.png',
    white: '/logos/256-logo-square-white.png',
    width: 2048,
    height: 2048,
  },
  vertical: {
    black: '/logos/256-logo-vertical-black.png',
    white: '/logos/256-logo-vertical-white.png',
    width: 2048,
    height: 2048,
  },
  circular: {
    black: '/logos/256-logo-rnd-lg-black.png',
    white: '/logos/256-logo-rnd-lg-white.png',
    width: 1797,
    height: 1797,
  },
}

interface LogoProps {
  variant?: LogoVariant
  height?: number
  /** @deprecated — logo now auto-switches based on prefers-color-scheme */
  dark?: boolean
  /** @deprecated */
  inverted?: boolean
  className?: string
  alt?: string
  priority?: boolean
}

/**
 * Renders the correct logo variant for light/dark mode automatically via
 * a <picture> element — the browser picks dark or light source natively.
 * External className (e.g. "hidden sm:block") is applied to <picture> so
 * responsive visibility works without conflicting with internal display classes.
 */
export default function Logo({
  variant = 'horizontal',
  height = 32,
  className = '',
  alt = '256 Foundation',
  priority,
}: LogoProps) {
  const asset = LOGO_ASSETS[variant]
  const aspectRatio = asset.width / asset.height
  const renderedWidth = Math.round(height * aspectRatio)
  const rounding = variant === 'circular' ? '' : 'rounded-md'

  return (
    // Outer className (e.g. "hidden sm:block") controls visibility of the whole unit.
    // The <picture> itself is display:inline-block to avoid extra block spacing.
    <picture
      className={className}
      style={{ lineHeight: 0, flexShrink: 0 }}
    >
      {/* Dark mode: browser picks this source when prefers-color-scheme: dark */}
      <source media="(prefers-color-scheme: dark)" srcSet={asset.black} />
      {/* Light mode fallback */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset.white}
        alt={alt}
        width={asset.width}
        height={asset.height}
        className={rounding}
        style={{ height: `${height}px`, width: `${renderedWidth}px`, display: 'block' }}
        loading={priority ?? height >= 80 ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  )
}
