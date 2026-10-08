import React from 'react';
import type { Metadata } from 'next';
import { ShoppingBag } from 'lucide-react';
import { getCompanySettings, getProjects } from '@/lib/data';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { DirectionalTransition } from '@/components/public/DirectionalTransition';
import { ProductCatalogView } from '@/components/public/ProductCatalogView';

export const metadata: Metadata = {
  title: 'Katalog Produk & Komputer',
  description:
    'Katalog lengkap PC Gaming, Laptop, Workstation, Komputer Kasir, dan Monitor bergaransi resmi distributor dengan harga terbaik.',
};

export default async function KatalogPage() {
  const [settings, products] = await Promise.all([
    getCompanySettings(),
    getProjects(),
  ]);

  return (
    <DirectionalTransition>
      <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Header Banner */}
        <section className="bg-gradient-to-b from-muted/50 via-background to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#3584e4]/10 border border-[#3584e4]/20 px-3.5 py-1 text-xs font-semibold text-[#3584e4]">
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Katalog Resmi &amp; Unit Ready Stock</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Katalog Produk &amp; PC Rakitan
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-base text-muted-foreground sm:text-lg">
              Pilihan PC gaming rakitan custom, laptop bergaransi resmi, komputer workstation render, hingga monitor gaming dengan performa maksimal.
            </p>
          </div>
        </section>

        {/* Product Catalog Grid & Filters */}
        <section className="py-8 pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ProductCatalogView products={products} />
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
    </DirectionalTransition>
  );
}
