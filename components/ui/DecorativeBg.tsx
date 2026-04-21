import PCBBackground from '@/components/ui/PCBBackground'

interface DecorativeBgProps {
  grid?: boolean
  glow?: boolean
  vignette?: boolean
  gridOpacity?: number
  glowOpacity?: number
  /** CSS position string — e.g. '50% 0%' (top-center), '50% 100%' (bottom-center), '100% 50%' (right-center) */
  glowPosition?: string
  className?: string
}

/**
 * Composable decorative background — lower-intensity version of the hero's
 * three-layer treatment (PCB grid + purple radial glow + vignette edge fade).
 * Always static (not animated); place as first child inside a `relative overflow-hidden` container.
 */
export default function DecorativeBg({
  grid = true,
  glow = true,
  vignette = true,
  gridOpacity = 0.05,
  glowOpacity = 0.08,
  glowPosition = '50% 0%',
  className = '',
}: DecorativeBgProps) {
  return (
    <>
      {grid && (
        <PCBBackground opacity={gridOpacity} animated={false} className={className} />
      )}
      {glow && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at ${glowPosition}, rgba(59,20,69,${glowOpacity}) 0%, transparent 60%)`,
          }}
        />
      )}
      {vignette && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,white_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,#1a1a1a_100%)] pointer-events-none"
        />
      )}
    </>
  )
}
