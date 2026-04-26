import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strip the X-Powered-By: Next.js response header for a slightly smaller
  // payload and less framework fingerprinting.
  poweredByHeader: false,

  images: {
    // Negotiate AVIF → WebP → original. AVIF is ~50% smaller than WebP for
    // photos but takes longer to encode, so it sits behind a fallback.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
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
