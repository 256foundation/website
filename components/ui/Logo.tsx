import Image from 'next/image'

interface LogoProps {
  /** Rendered height in px — width scales automatically from 1:1 source */
  height?: number
  /** Apply brightness(0) invert(1) filter for use on dark backgrounds */
  inverted?: boolean
  className?: string
  alt?: string
}

export default function Logo({
  height = 32,
  inverted = true,
  className = '',
  alt = '256 Foundation',
}: LogoProps) {
  return (
    <Image
      src="/logo.jpg"
      alt={alt}
      width={1024}
      height={1024}
      className={className}
      style={{
        height: `${height}px`,
        width: 'auto',
        filter: inverted ? 'brightness(0) invert(1)' : 'none',
      }}
      priority={height >= 80}
    />
  )
}
