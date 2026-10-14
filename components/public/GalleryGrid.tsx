'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn } from 'lucide-react';
import { GalleryItem } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface GalleryGridProps {
  items: GalleryItem[];
  /** Tampilkan filter kategori (halaman galeri penuh). */
  showFilter?: boolean;
}

export function GalleryGrid({ items, showFilter = false }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const categories = Array.from(
    new Set(items.map((i) => i.category?.trim()).filter((c): c is string => !!c))
  );

  const visible =
    activeCategory === 'all'
      ? items
      : items.filter((i) => i.category?.trim() === activeCategory);

  return (
    <div>
      {showFilter && categories.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {['all', ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'border-[#3584e4] bg-[#3584e4] text-white'
                  : 'border-border bg-card text-muted-foreground hover:border-[#3584e4]/40 hover:text-foreground'
              }`}
            >
              {cat === 'all' ? 'Semua' : cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#3584e4]/40 cursor-pointer"
            aria-label={`Lihat foto: ${item.title}`}
          >
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 pt-12">
              <span className="block text-sm font-bold text-white">{item.title}</span>
              {item.category && (
                <span className="text-[11px] text-neutral-300">{item.category}</span>
              )}
            </div>
            <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <ZoomIn className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <DialogContent className="max-w-4xl p-4 sm:p-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted">
              <Image
                src={selected.image_url}
                alt={selected.title}
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 896px, 100vw"
              />
            </div>
            <DialogHeader>
              <DialogTitle>{selected.title}</DialogTitle>
              <DialogDescription>
                {selected.caption || selected.category || 'Dokumentasi kami'}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
