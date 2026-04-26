import type { Metadata } from 'next'

interface MetadataProps {
  title: string
  description: string
  path: string
  ogImage?: string
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://256foundation.org'

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = '/og/256F-OG.png',
}: MetadataProps): Metadata {
  const url = `${BASE_URL}${path}`
  const fullTitle = path === '/' ? `256 Foundation` : `${title} | 256 Foundation`

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: '256 Foundation',
      images: [
        {
          url: `${BASE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${BASE_URL}${ogImage}`],
      site: '@256FOUNDATION',
    },
    alternates: {
      canonical: url,
    },
  }
}
