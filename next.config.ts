import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle so the site can run as a small
  // container image. Required for the Docker build; harmless elsewhere.
  output: "standalone",
  // Strip the X-Powered-By: Next.js response header for a slightly smaller
  // payload and less framework fingerprinting.
  poweredByHeader: false,

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
    // so those variants were pure upscales. 1600 matches the source cap applied
    // by scripts/optimize-images.mjs.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
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
