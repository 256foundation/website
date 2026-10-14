import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle so the site can run as a small
  // container image. Required for the Docker build; harmless elsewhere.
  output: "standalone",
  // Strip the X-Powered-By: Next.js response header for a slightly smaller
  // payload and less framework fingerprinting.
  poweredByHeader: false,
  // Gzip/Deflate text responses at the Node layer. A reverse proxy in front of
  // the container should prefer brotli + HTTP/2 (see README deployment notes).
  compress: true,

  // Response headers. Two concerns:
  //
  // 1. Caching. `public/` files and hashed build assets are content-stable, so
  //    they get a year of immutable caching. Without this Next serves public/
  //    with `max-age=0`, so every navigation revalidates heroes, logos, OG
  //    cards and fonts that never change. HTML/ISR routes keep Next defaults
  //    (only the security block below matches them).
  // 2. Security. Baseline hardening headers applied to every response.
  async headers() {
    return [
      {
        // Any file with a static-asset extension, anywhere in the site.
        source: "/:all*(webp|avif|png|jpg|jpeg|svg|ico|gif|woff2|woff|ttf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Hashed JS/CSS chunks; the filename changes when the bytes change.
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Everything: baseline security headers. HTML/ISR caching is left to
        // Next so `revalidate` keeps working exactly as before.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  // The four standalone pillar project pages were collapsed into the single
  // /projects "Open Mining Stack" page. Their dedicated project sites are the
  // technical/contributor homes now, so send old deep links straight there.
  async redirects() {
    return [
      { source: "/projects/ember-one", destination: "https://emberone.org", permanent: true },
      { source: "/projects/libre-board", destination: "https://libreboard.org", permanent: true },
      { source: "/projects/mujina", destination: "https://mujina.org", permanent: true },
      { source: "/projects/hydrapool", destination: "https://hydrapool.org", permanent: true },
    ];
  },

  images: {
    // Negotiate AVIF → WebP → original. AVIF is ~50% smaller than WebP for
    // photos but takes longer to encode, so it sits behind a fallback.
    formats: ["image/avif", "image/webp"],
    // Optimized variants are content-addressed by source path, and sources only
    // change on deploy, so cache them for a year. The 60s default made every
    // browser re-fetch (and the self-hosted optimizer re-encode) them a minute
    // after first view.
    minimumCacheTTL: 31536000,
    // Drop the 2048/3840 breakpoints: no art on the site is wider than 1920px,
    // so those variants were pure upscales. 1440 matches the source cap applied
    // by scripts/optimize-images.mjs.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "assets.podhome.fm" },
      { protocol: "https", hostname: "substackcdn.com" },
      { protocol: "https", hostname: "substack-post-media.s3.amazonaws.com" },
      { protocol: "https", hostname: "bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com" },
    ],
  },

  experimental: {
    // Tree-shake more aggressively for these libraries — only import what's used.
    optimizePackageImports: ["fast-xml-parser"],
  },
};

export default nextConfig;
