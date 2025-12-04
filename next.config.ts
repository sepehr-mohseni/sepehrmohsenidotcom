import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  
  poweredByHeader: false,
  compress: true,
  
  experimental: {
    mdxRs: false,
  },
  
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
      {
        source: "/:path*.(jpg|jpeg|png|gif|webp|avif|svg|ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=7200, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/_next/image",
        headers: [
          { key: "Cache-Control", value: "public, max-age=7200, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
