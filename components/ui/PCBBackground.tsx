interface PCBBackgroundProps {
  opacity?: number
  animated?: boolean
  className?: string
  /**
   * Optional pattern ID. SVG `<defs>` IDs only need to be unique within a
   * single SVG, so the default works fine even if multiple PCBBackgrounds
   * render on the same page. Override only if a parent needs to reference
   * the pattern from outside the SVG.
   */
  patternId?: string
}

export default function PCBBackground({
  opacity = 0.06,
  animated = false,
  className = '',
  patternId = 'pcb-pattern',
}: PCBBackgroundProps) {

  return (
    <div
      aria-hidden="true"
      className={[
        'absolute inset-0 w-full h-full pointer-events-none overflow-hidden',
        animated ? 'pcb-animated' : '',
        className,
      ].join(' ')}
      style={{ opacity }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal trace */}
            <line x1="0" y1="30" x2="60" y2="30" stroke="#888888" strokeWidth="0.5" />
            {/* Vertical trace */}
            <line x1="30" y1="0" x2="30" y2="60" stroke="#888888" strokeWidth="0.5" />
            {/* Corner traces */}
            <line x1="0" y1="0" x2="15" y2="0" stroke="#666666" strokeWidth="0.4" />
            <line x1="0" y1="0" x2="0" y2="15" stroke="#666666" strokeWidth="0.4" />
            <line x1="60" y1="60" x2="45" y2="60" stroke="#666666" strokeWidth="0.4" />
            <line x1="60" y1="60" x2="60" y2="45" stroke="#666666" strokeWidth="0.4" />
            {/* Pads at intersections */}
            <circle cx="30" cy="30" r="2.5" fill="none" stroke="#888888" strokeWidth="0.5" />
            <circle cx="30" cy="30" r="1" fill="#888888" />
            <circle cx="0" cy="0" r="1.5" fill="#666666" />
            <circle cx="60" cy="0" r="1.5" fill="#666666" />
            <circle cx="0" cy="60" r="1.5" fill="#666666" />
            <circle cx="60" cy="60" r="1.5" fill="#666666" />
            {/* Short traces */}
            <line x1="15" y1="30" x2="22" y2="30" stroke="#777777" strokeWidth="0.4" />
            <line x1="38" y1="30" x2="45" y2="30" stroke="#777777" strokeWidth="0.4" />
            <line x1="30" y1="15" x2="30" y2="22" stroke="#777777" strokeWidth="0.4" />
            <line x1="30" y1="38" x2="30" y2="45" stroke="#777777" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}
