'use client';

import React, { useState, useMemo, useDeferredValue, startTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { Project } from '@/lib/types';
import { waLink } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ProductCatalogViewProps {
  products: Project[];
  whatsappNumber?: string;
}

export function ProductCatalogView({ products, whatsappNumber }: ProductCatalogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ['Semua', ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        selectedCategory === 'Semua' || product.category === selectedCategory;
      const matchSearch =
        product.title.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
        product.summary.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(deferredSearchQuery.toLowerCase()));

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, deferredSearchQuery]);

  return (
    <div className="space-y-10">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => startTransition(() => setSelectedCategory(cat))}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#3584e4] text-white shadow-sm shadow-[#3584e4]/30'
                  : 'bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Cari produk / spesifikasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 text-xs"
          />
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-base font-bold text-foreground">
              Tidak ada produk yang cocok
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Coba ubah kata kunci pencarian atau pilih kategori lain.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                startTransition(() => {
                  setSelectedCategory('Semua');
                  setSearchQuery('');
                });
              }}
              className="mt-4 text-xs"
            >
              Reset Pencarian
            </Button>
          </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const waUrl = waLink(
              whatsappNumber,
              `Halo CyberTech Computer, saya tertarik untuk bertanya/memesan produk: ${product.title} (${product.client_name || ''})`
            );

            return (
              <Card
                key={product.id}
                className="group flex flex-col overflow-hidden transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-[#3584e4]/40"
              >
                {/* Product Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  {product.cover_image ? (
                    <Link href={`/katalog/${product.slug}`} transitionTypes={['nav-forward']}>
                        <Image
                          src={product.cover_image}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-200 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </Link>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                      <span>Gambar Produk</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="secondary"
                      className="bg-background/90 backdrop-blur-md font-semibold text-[11px] shadow-sm"
                    >
                      {product.category}
                    </Badge>
                  </div>
                </div>

                {/* Content & Details */}
                <CardContent className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    {/* Price / Guarantee badge */}
                    {product.client_name && (
                      <div className="inline-block rounded-lg bg-[#3584e4]/10 px-2.5 py-1 text-xs font-bold text-[#3584e4] mb-2">
                        {product.client_name}
                      </div>
                    )}
                    <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug">
                      <Link href={`/katalog/${product.slug}`} transitionTypes={['nav-forward']}>
                        {product.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {product.summary}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-2.5 border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <Button
                        asChild
                        size="sm"
                        className="flex-1 bg-[#2ec27e] hover:bg-[#26a269] text-white font-semibold text-xs h-9 cursor-pointer"
                      >
                        <a href={waUrl} target="_blank" rel="noreferrer">
                          <MessageCircle className="h-3.5 w-3.5 mr-1" />
                          <span>Tanya Stok / WA</span>
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-9 px-3 text-xs cursor-pointer"
                      >
                        <Link href={`/katalog/${product.slug}`} transitionTypes={['nav-forward']}>
                          <span>Spesifikasi</span>
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
