import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, getPostBySlug, formatPostDate } from '@/lib/newsroom'
import { generatePageMetadata } from '@/lib/metadata'
import SectionWrapper from '@/components/ui/SectionWrapper'
import DecorativeBg from '@/components/ui/DecorativeBg'
import PostBody from '@/components/newsroom/PostBody'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = getPostBySlug(slug)
  if (!result) return {}
  return generatePageMetadata({
    title: result.meta.title,
    description: result.meta.excerpt,
    path: `/newsroom/${slug}`,
    ogImage: result.meta.ogImage,
  })
}

export default async function NewsroomPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = getPostBySlug(slug)
  if (!result) notFound()

  const { meta, content } = result

  return (
    <SectionWrapper>
      <DecorativeBg glowPosition="50% 0%" gridOpacity={0.07} vignette={false} />
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/newsroom"
          className="inline-flex items-center gap-1.5 font-mono text-[#3b1445] dark:text-[#c084d8] text-xs hover:underline mb-8 block"
        >
          ← Back to Newsroom
        </Link>

        {/* Category + date */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs uppercase tracking-widest">
            {meta.category}
          </span>
          {meta.date && (
            <time className="font-mono text-gray-400 text-xs">
              {formatPostDate(meta.date)}
            </time>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl uppercase leading-tight mb-4">
          {meta.title}
        </h1>

        {/* Author */}
        <p className="font-mono text-gray-400 text-xs mb-8">By {meta.author}</p>

        {/* Cover image */}
        {meta.coverImage && (
          <div className="relative w-full h-64 mb-10 overflow-hidden border border-gray-200 dark:border-[#1f1f1f]">
            <Image
              src={meta.coverImage}
              alt={meta.title}
              fill
              className="object-contain"
              priority
            />
          </div>
        )}

        {/* Article body */}
        <PostBody content={content} />

        {/* Footer divider */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-[#1f1f1f]">
          <Link
            href="/newsroom"
            className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs hover:underline"
          >
            ← Back to Newsroom
          </Link>
        </div>
      </div>
    </SectionWrapper>
  )
}
