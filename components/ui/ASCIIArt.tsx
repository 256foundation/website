interface ASCIIArtProps {
  art: string
  className?: string
  size?: 'xs' | 'sm' | 'md'
}

const SIZES = { xs: 'text-[9px]', sm: 'text-xs', md: 'text-sm' }

export const CIRCUIT_ART = `
 ┌──[256 FOUNDATION]──┐
 │  ░░░░░░░░░░░░░░░░  │
 │  ░  ┌──────┐  ░░  │
 │  ░  │ ASIC │  ░░  │
 │  ░  └──────┘  ░░  │
 │  ░░░░░░░░░░░░░░░░  │
 └────────────────────┘
`.trim()

export const BLOCK_ART = `
 ╔══════════════════╗
 ║  BLOCK FOUND!    ║
 ║  HEIGHT: ██████  ║
 ║  HASH:   ░░░░░░  ║
 ║  NONCE:  ██████  ║
 ╚══════════════════╝
`.trim()

export const HASH_ART = `
 > mining...........
 > nonce: 0x████████
 > hash:  0x00000000
 > VALID BLOCK FOUND
 > broadcasting.....
`.trim()

export const MINING_ART = `
 [MINER_01] ████████ 95 TH/s
 [MINER_02] ██████░░ 82 TH/s
 [MINER_03] █████░░░ 71 TH/s
 [POOL]     ████████ 248 TH/s
`.trim()

export default function ASCIIArt({ art, className = '', size = 'xs' }: ASCIIArtProps) {
  return (
    <pre
      aria-hidden="true"
      className={[
        'font-mono text-[#00FF41] opacity-25 leading-tight select-none whitespace-pre',
        SIZES[size],
        className,
      ].join(' ')}
    >
      {art}
    </pre>
  )
}
