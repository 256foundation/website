import type { Metadata } from 'next'
import { Barlow_Condensed, Space_Mono, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const barlowCondensed = Barlow_Condensed({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: '256 Foundation',
    template: '%s | 256 Foundation',
  },
  description:
    'Building the open-source Bitcoin mining ecosystem. The 256 Foundation funds developers creating open-source Bitcoin mining hardware and software.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://256foundation.org'
  ),
  openGraph: {
    siteName: '256 Foundation',
    type: 'website',
  },
  twitter: {
    site: '@256FOUNDATION',
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL

  return (
    <html lang="en" className={`${barlowCondensed.variable} ${spaceMono.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#0a0a0a] text-gray-100 font-sans antialiased">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />

        {process.env.NODE_ENV === 'production' && umamiId && umamiUrl && (
          <Script
            src={`${umamiUrl}/script.js`}
            data-website-id={umamiId}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
