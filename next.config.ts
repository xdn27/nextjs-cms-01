import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: '/katalog',
        permanent: true,
      },
      {
        source: '/portfolio/:slug',
        destination: '/katalog/:slug',
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true, // Mencegah server proxy error saat offline/mixed-content HTTP/HTTPS
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
