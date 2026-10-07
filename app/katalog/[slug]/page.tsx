import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  Zap,
  Cpu,
  PackageCheck,
} from 'lucide-react';
import { getCompanySettings, getProjectBySlug, getProjects } from '@/lib/data';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProjectBySlug(slug);

  if (!product) {
    return { title: 'Produk Tidak Ditemukan' };
  }

  return {
    title: `${product.title} - Katalog Produk`,
    description: product.summary,
  };
}

export async function generateStaticParams() {
  const products = await getProjects();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const [settings, product, allProducts] = await Promise.all([
    getCompanySettings(),
    getProjectBySlug(slug),
    getProjects(),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const waText = encodeURIComponent(
    `Halo CyberTech Computer, saya ingin konsultasi / memesan produk: ${product.title} (${product.client_name || ''})`
  );
  const waUrl = `https://wa.me/6281388997722?text=${waText}`;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />

      <main className="flex-1 pb-24">
        {/* Back Link */}
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>← Kembali ke Semua Katalog Produk</span>
          </Link>
        </div>

        {/* Product Details Header & Grid */}
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Product Image */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-lg">
                {product.cover_image ? (
                  <Image
                    src={product.cover_image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                    Tidak ada gambar
                  </div>
                )}
              </div>

              {/* Trust Badges under Image */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-3 text-center">
                  <ShieldCheck className="h-5 w-5 text-[#2ec27e]" />
                  <span className="mt-1 text-[11px] font-semibold text-foreground">
                    100% Original
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-3 text-center">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <span className="mt-1 text-[11px] font-semibold text-foreground">
                    Stress Test 24 Jam
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-3 text-center">
                  <Cpu className="h-5 w-5 text-[#3584e4]" />
                  <span className="mt-1 text-[11px] font-semibold text-foreground">
                    Bebas Bottleneck
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-3 text-center">
                  <PackageCheck className="h-5 w-5 text-purple-500" />
                  <span className="mt-1 text-[11px] font-semibold text-foreground">
                    Packing Kayu Aman
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Price, Description, Order Button */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="font-semibold text-xs">
                    {product.category}
                  </Badge>
                  {product.is_featured && (
                    <Badge className="bg-[#3584e4] text-white text-xs">
                      Best Seller
                    </Badge>
                  )}
                </div>

                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  {product.title}
                </h1>

                {product.client_name && (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#3584e4]/10 px-4 py-2 text-lg sm:text-xl font-extrabold text-[#3584e4] border border-[#3584e4]/20">
                    <span>{product.client_name}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Ringkasan &amp; Performa
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {product.summary}
                </p>
              </div>

              {product.description && (
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-[#3584e4]" />
                    <span>Rincian Spesifikasi Teknis</span>
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Call to Actions */}
              <div className="space-y-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="w-full h-12 bg-[#2ec27e] hover:bg-[#26a269] text-white text-sm font-bold shadow-lg shadow-[#2ec27e]/20 cursor-pointer"
                >
                  <a href={waUrl} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    <span>Pesan / Konsultasi via WhatsApp</span>
                  </a>
                </Button>

                <p className="text-center text-[11px] text-muted-foreground">
                  Butuh penyesuaian part atau budget khusus? Diskusikan langsung dengan konsultan teknisi kami.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mx-auto max-w-6xl px-4 mt-20 pt-12 border-t border-border sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Produk Pilihan Lainnya
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/katalog/${rel.slug}`}
                  className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-[#3584e4]/50 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted">
                    {rel.cover_image && (
                      <Image
                        src={rel.cover_image}
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform duration-200 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <h3 className="mt-3 text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {rel.title}
                  </h3>
                  <span className="text-[11px] font-semibold text-[#3584e4]">
                    {rel.client_name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer settings={settings} />
    </div>
  );
}
