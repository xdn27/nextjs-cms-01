import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { GalleryItem } from '@/lib/types';
import { GalleryGrid } from '@/components/public/GalleryGrid';

interface GallerySectionProps {
  items: GalleryItem[];
}

export function GallerySection({ items }: GallerySectionProps) {
  // Section tidak dirender bila tidak ada foto unggulan
  if (!items || items.length === 0) return null;

  return (
    <section className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#3584e4] uppercase">
              Galeri Kami
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Dokumentasi Pengerjaan &amp; Suasana Toko
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              Cuplikan hasil rakitan, servis, dan keseharian tim kami.
            </p>
          </div>
          <Link
            href="/galeri"
            transitionTypes={['nav-lateral']}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3584e4] hover:text-[#1c71d8] transition-colors"
          >
            <span>Lihat Semua Galeri</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12">
          <GalleryGrid items={items} />
        </div>
      </div>
    </section>
  );
}
