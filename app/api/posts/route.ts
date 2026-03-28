import { fetchSubstackPosts } from '@/lib/substack'
import { NextResponse } from 'next/server'

export const revalidate = 3600

export async function GET() {
  const posts = await fetchSubstackPosts(3)
  return NextResponse.json(posts)
}
