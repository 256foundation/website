type LogoVariant = 'horizontal' | 'secondary' | 'square' | 'vertical' | 'circular'

interface LogoAsset {
  /** Artwork for light backgrounds (dark/purple). */
  dark: string
  /** Artwork for dark backgrounds (white). */
  light: string
  width: number
  height: number
}

const LOGO_ASSETS: Record<LogoVariant, LogoAsset> = {
  horizontal: {
    dark: '/logos/256-logo-horizontal-dark.png',
    light: '/logos/256-logo-horizontal-light.png',
    width: 2600,
    height: 421,
  },
  secondary: {
    dark: '/logos/256-logo-secondary-dark.png',
    light: '/logos/256-logo-secondary-light.png',
    width: 1400,
    height: 449,
  },
  vertical: {
    dark: '/logos/256-logo-vertical-dark.png',
    light: '/logos/256-logo-vertical-light.png',
    width: 1600,
    height: 648,
  },
  square: {
    dark: '/logos/256-logo-square-black.png',
    light: '/logos/256-logo-square-white.png',
    width: 2048,
    height: 2048,
  },
  circular: {
    dark: '/logos/256-logo-rnd-lg-black.png',
    light: '/logos/256-logo-rnd-lg-white.png',
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
  const isPriority = priority ?? height >= 80

  return (
    // Outer className (e.g. "hidden sm:block") controls visibility of the whole unit.
    // The <picture> itself is display:inline-block to avoid extra block spacing.
    <picture
      className={className}
      style={{ lineHeight: 0, flexShrink: 0 }}
    >
      {/* Dark mode: light (white) artwork */}
      <source media="(prefers-color-scheme: dark)" srcSet={asset.light} />
      {/* Light mode fallback: dark (purple) artwork */}
      <img
        src={asset.dark}
        alt={alt}
        width={asset.width}
        height={asset.height}
        className={rounding}
        style={{ height: `${height}px`, width: `${renderedWidth}px`, display: 'block' }}
        loading={isPriority ? 'eager' : 'lazy'}
        // fetchpriority is the browser-level signal that complements loading="eager"
        // and meaningfully boosts LCP for the hero logo.
        fetchPriority={isPriority ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  )
}
