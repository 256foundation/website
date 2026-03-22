import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const apiUrl = process.env.HASHDASH_API_URL ?? 'https://dash.256f.org/api/workers'
  const apiKey = process.env.HASHDASH_API_KEY

  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`
  }

  try {
    const res = await fetch(apiUrl, { headers, cache: 'no-store' })
    if (!res.ok) throw new Error(`Upstream ${res.status}`)
    const data = await res.json()
    // Normalize various possible response shapes
    const workers = data.workers ?? data.data ?? data.miners ?? data ?? []
    return NextResponse.json({ workers: Array.isArray(workers) ? workers : [] })
  } catch {
    return NextResponse.json({ error: 'Upstream unavailable' }, { status: 503 })
  }
}
