import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const POOL_BASE = 'https://pool.256foundation.org/api/v1/query'
const PRIMAL_API = 'https://primal.net/api'

// ─── Bech32 decode (npub → hex pubkey) ───────────────────────────────────────
const BECH32_CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'

function npubToHex(npub: string): string {
  const str = npub.toLowerCase()
  const pos = str.lastIndexOf('1')
  const data5: number[] = []
  for (let i = pos + 1; i < str.length - 6; i++) {
    const d = BECH32_CHARSET.indexOf(str[i])
    if (d < 0) throw new Error(`Invalid bech32 char: ${str[i]}`)
    data5.push(d)
  }
  let value = 0, bits = 0
  const bytes: number[] = []
  for (const d of data5) {
    value = (value << 5) | d
    bits += 5
    if (bits >= 8) { bits -= 8; bytes.push((value >> bits) & 0xff) }
  }
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('')
}

// ─── Profile cache (10-min TTL) ───────────────────────────────────────────────
interface CacheEntry { name: string; picture?: string; ts: number }
const profileCache = new Map<string, CacheEntry>()
const CACHE_TTL = 10 * 60 * 1000

interface NostrProfile { name: string; picture?: string }

async function resolveNostrProfile(npub: string): Promise<NostrProfile> {
  const cached = profileCache.get(npub)
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return { name: cached.name, picture: cached.picture }
  }

  try {
    const hex = npubToHex(npub)
    const res = await fetch(PRIMAL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(['user_profile', { pubkey: hex }]),
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`Primal ${res.status}`)

    const events: Array<{ kind: number; content: string }> = await res.json()
    const meta = events.find(e => e.kind === 0)
    if (!meta) throw new Error('No kind:0 event')

    const profile = JSON.parse(meta.content) as {
      name?: string
      display_name?: string
      picture?: string
    }
    const name = profile.display_name?.trim() || profile.name?.trim() || ''
    if (!name) throw new Error('Empty profile name')
    const picture = profile.picture?.trim() || undefined

    profileCache.set(npub, { name, picture, ts: Date.now() })
    return { name, picture }
  } catch {
    // Fall back to truncated npub on any failure
    return { name: `${npub.slice(0, 9)}...${npub.slice(-4)}` }
  }
}

// ─── Prometheus types ─────────────────────────────────────────────────────────
interface PrometheusResult {
  metric: Record<string, string>
  value: [number, string]
}
interface PrometheusResponse {
  status: string
  data: { resultType: string; result: PrometheusResult[] }
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const [topRes, totalRes, countRes] = await Promise.all([
      fetch(`${POOL_BASE}?query=topk(5,sum by(btcaddress)(rate(worker_shares_valid_total[5m])))`, { cache: 'no-store' }),
      fetch(`${POOL_BASE}?query=sum(rate(worker_shares_valid_total[5m]))`, { cache: 'no-store' }),
      fetch(`${POOL_BASE}?query=count(sum by(btcaddress)(rate(worker_shares_valid_total[5m])))`, { cache: 'no-store' }),
    ])

    if (!topRes.ok || !totalRes.ok || !countRes.ok) throw new Error('Pool query failed')

    const [topData, totalData, countData]: PrometheusResponse[] = await Promise.all([
      topRes.json(), totalRes.json(), countRes.json(),
    ])

    // Resolve Nostr display names for npub identities in parallel
    const raw = topData.data.result.map(r => ({
      identity: r.metric.btcaddress ?? 'Unknown',
      hashrate: parseFloat(r.value[1]),
      isNpub: (r.metric.btcaddress ?? '').startsWith('npub1'),
    })).sort((a, b) => b.hashrate - a.hashrate)

    const workers = await Promise.all(
      raw.map(async (w) => {
        if (w.isNpub) {
          const profile = await resolveNostrProfile(w.identity)
          return { ...w, displayName: profile.name, picture: profile.picture ?? null }
        }
        return { ...w, displayName: w.identity, picture: null }
      })
    )

    const totalHashrate = parseFloat(totalData.data.result[0]?.value[1] ?? '0')
    const activeCount = parseInt(countData.data.result[0]?.value[1] ?? '0', 10)

    return NextResponse.json({ workers, totalHashrate, activeCount })
  } catch {
    return NextResponse.json({ error: 'Upstream unavailable' }, { status: 503 })
  }
}
