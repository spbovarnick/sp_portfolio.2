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
  allowedDevOrigins: ['192.168.0.103'],
  /* config options here */
};

export default nextConfig;
