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
      // URL berbahasa Inggris lama -> URL berbahasa Indonesia
      { source: '/about', destination: '/tentang', permanent: true },
      { source: '/services', destination: '/layanan', permanent: true },
      { source: '/contact', destination: '/kontak', permanent: true },
      { source: '/admin/sliders', destination: '/admin/slider', permanent: true },
      { source: '/admin/services', destination: '/admin/layanan', permanent: true },
      { source: '/admin/portfolio', destination: '/admin/katalog', permanent: true },
      { source: '/admin/settings', destination: '/admin/pengaturan', permanent: true },
      { source: '/admin/testimonials', destination: '/admin/testimoni', permanent: true },
      { source: '/admin/inquiries', destination: '/admin/pesan', permanent: true },
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
