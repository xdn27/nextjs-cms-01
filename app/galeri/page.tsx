import React from 'react';
import type { Metadata } from 'next';
import { Images } from 'lucide-react';
import { getCompanySettings, getGalleryItems } from '@/lib/data';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { GalleryGrid } from '@/components/public/GalleryGrid';

export const metadata: Metadata = {
  title: 'Galeri',
  description:
    'Dokumentasi hasil rakitan PC, servis, dan suasana toko kami.',
};

export default async function GaleriPage() {
  const [settings, items] = await Promise.all([
    getCompanySettings(),
    getGalleryItems(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-muted/50 via-background to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#3584e4]/10 border border-[#3584e4]/20 px-3.5 py-1 text-xs font-semibold text-[#3584e4]">
              <Images className="h-3.5 w-3.5" />
              <span>Dokumentasi</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Galeri Foto
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-base text-muted-foreground sm:text-lg">
              Hasil rakitan, pengerjaan servis, dan suasana toko {settings.company_name}.
            </p>
          </div>
        </section>

        <section className="py-8 pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {items.length === 0 ? (
              <p className="py-16 text-center text-sm text-muted-foreground">
                Belum ada foto di galeri.
              </p>
            ) : (
              <GalleryGrid items={items} showFilter />
            )}
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
