import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Nusantara Tech Innovasi',
    default: 'Nusantara Tech Innovasi | Mitra Transformasi Digital & Solusi Enterprise',
  },
  description:
    'Solusi rekayasa perangkat lunak modern, aplikasi web & mobile skala enterprise, arsitektur cloud serverless, dan kecerdasan buatan terapan.',
  keywords: ['software house', 'next.js', 'supabase', 'serverless', 'enterprise solution', 'indonesia'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 font-sans">
        {children}
      </body>
    </html>
  );
}
