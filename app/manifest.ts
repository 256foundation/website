import type { MetadataRoute } from 'next'

/**
 * Web app manifest. The site is installable-lite: no service worker, but the
 * manifest gives the browser a name, icons and theme for bookmarks and
 * "Add to home screen", and some crawlers read it for branding.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '256 Foundation',
    short_name: '256 Foundation',
    description:
      'Building the open-source Bitcoin mining ecosystem. The 256 Foundation funds developers creating open-source Bitcoin mining hardware and software.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a1a',
    theme_color: '#1a1a1a',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
