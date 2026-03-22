import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "substackcdn.com" },
      { protocol: "https", hostname: "substack-post-media.s3.amazonaws.com" },
      { protocol: "https", hostname: "bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com" },
    ],
  },
};

export default nextConfig;
