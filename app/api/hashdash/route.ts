import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const BASE = 'https://pool.256foundation.org/api/v1/query'

interface PrometheusResult {
  metric: Record<string, string>
  value: [number, string]
}

interface PrometheusResponse {
  status: string
  data: { resultType: string; result: PrometheusResult[] }
}

export async function GET() {
  try {
    const [topRes, totalRes, countRes] = await Promise.all([
      fetch(`${BASE}?query=topk(5,sum by(btcaddress)(rate(worker_shares_valid_total[5m])))`, { cache: 'no-store' }),
      fetch(`${BASE}?query=sum(rate(worker_shares_valid_total[5m]))`, { cache: 'no-store' }),
      fetch(`${BASE}?query=count(sum by(btcaddress)(rate(worker_shares_valid_total[5m])))`, { cache: 'no-store' }),
    ])

    if (!topRes.ok || !totalRes.ok || !countRes.ok) {
      throw new Error('Upstream query failed')
    }

    const [topData, totalData, countData]: PrometheusResponse[] = await Promise.all([
      topRes.json(),
      totalRes.json(),
      countRes.json(),
    ])

    const workers = topData.data.result
      .map((r) => ({
        identity: r.metric.btcaddress ?? 'Unknown',
        hashrate: parseFloat(r.value[1]),
        isNpub: (r.metric.btcaddress ?? '').startsWith('npub1'),
      }))
      .sort((a, b) => b.hashrate - a.hashrate)

    const totalHashrate = parseFloat(totalData.data.result[0]?.value[1] ?? '0')
    const activeCount = parseInt(countData.data.result[0]?.value[1] ?? '0', 10)

    return NextResponse.json({ workers, totalHashrate, activeCount })
  } catch {
    return NextResponse.json({ error: 'Upstream unavailable' }, { status: 503 })
  }
}
