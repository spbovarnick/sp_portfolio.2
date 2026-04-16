import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      }
    ]
  },
  turbopack: {
    root: import.meta.dirname,
  },
  /* config options here */
};

export default nextConfig;
