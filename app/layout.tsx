import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { getCompanySettings } from '@/lib/data';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getCompanySettings();
  const companyName = settings.company_name || 'CyberTech Computer & Gaming';
  const siteDescription =
    settings.description ||
    'Pusat rakit PC gaming & workstation custom, laptop garansi resmi, upgrade RAM & SSD NVMe super cepat, serta service komputer profesional dengan sparepart original.';

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: {
      template: `%s | ${companyName}`,
      default: `${companyName} | Pusat Rakit PC Gaming, Laptop & Servis Komputer`,
    },
    description: siteDescription,
    keywords: [
      'toko komputer',
      'rakit pc gaming',
      'service laptop',
      'upgrade ssd ram',
      'harco mangga dua',
      'pc workstation',
      'komputer jakarta',
    ],
  };
}

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
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
