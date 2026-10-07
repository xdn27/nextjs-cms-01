import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Zap,
  Cpu,
  PackageCheck,
  Wrench,
  Clock,
  MessageCircle,
} from 'lucide-react';
import {
  getCompanySettings,
  getServices,
  getProjects,
  getPosts,
  getTestimonials,
} from '@/lib/data';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Hero } from '@/components/public/Hero';
import { ServiceCard } from '@/components/public/ServiceCard';
import { ProjectCard } from '@/components/public/ProjectCard';
import { BlogCard } from '@/components/public/BlogCard';
import { TestimonialSection } from '@/components/public/TestimonialSection';

export default async function HomePage() {
  const [settings, services, products, posts, testimonials] = await Promise.all([
    getCompanySettings(),
    getServices(),
    getProjects(),
    getPosts(),
    getTestimonials(),
  ]);

  const featuredProducts = products.filter((p) => p.is_featured).slice(0, 3);
  const recentPosts = posts.slice(0, 3);

  const advantages = [
    {
      title: '100% Komponen Baru & Segel Resmi',
      description: 'Semua prosesor, kartu grafis, motherboard, dan RAM berasal dari distributor resmi bergaransi 1-3 tahun.',
      icon: ShieldCheck,
      color: 'text-[#2ec27e] bg-[#2ec27e]/10 border-[#2ec27e]/20',
    },
    {
      title: 'Cable Management Rapi & Airflow Dingin',
      description: 'Perakitan teliti hingga jalur kabel belakang rapi dan aliran udara lancar demi menjaga temperatur rendah.',
      icon: Zap,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Stress Test 24 Jam & Benchmark Stabil',
      description: 'Setiap PC yang dirakit melewati uji beban FurMark, Cinebench, dan MemTest sebelum diserahkan ke pembeli.',
      icon: Cpu,
      color: 'text-[#3584e4] bg-[#3584e4]/10 border-[#3584e4]/20',
    },
    {
      title: 'Pengecekan Awal Gratis & Terbuka',
      description: 'Konsultasi spesifikasi atau diagnosis kerusakan laptop/PC dilakukan transparan tanpa paksaan bayar.',
      icon: Wrench,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Servis Kilat & Deep Cleaning Cepat',
      description: 'Perawatan ganti pasta termal dan upgrade SSD/RAM bisa ditunggu di toko hanya dalam waktu 30-60 menit.',
      icon: Clock,
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
    },
    {
      title: 'Packing Kayu & Asuransi Pengiriman',
      description: 'Melayani pengiriman aman ke seluruh penjuru Nusantara dengan bubble wrap tebal, packing kayu, dan asuransi penuh.',
      icon: PackageCheck,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  const waNumber = settings.contact_whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero settings={settings} />

        {/* Layanan Unggulan Toko */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-semibold tracking-wider text-[#3584e4] uppercase">
                  Layanan &amp; Solusi Komputer
                </span>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Layanan Servis &amp; Rakit PC Profesional
                </h2>
                <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                  Dikerjakan langsung oleh teknisi berpengalaman dengan peralatan diagnostik modern dan garansi nyata.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3584e4] hover:text-[#1c71d8] transition-colors"
              >
                <span>Lihat Semua Layanan</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Katalog Produk Pilihan / Best Seller */}
        <section className="border-t border-border bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-semibold tracking-wider text-[#3584e4] uppercase">
                  Katalog Unit Pilihan
                </span>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  PC Rakitan &amp; Laptop Siap Pakai
                </h2>
                <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                  Pilihan rig gaming terbaik, workstation editing, dan monitor berkualitas tinggi dengan garansi resmi.
                </p>
              </div>
              <Link
                href="/katalog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3584e4] hover:text-[#1c71d8] transition-colors"
              >
                <span>Buka Semua Katalog Produk</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProjectCard key={product.id} project={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Keunggulan Toko Komputer */}
        <section className="py-20 bg-background border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-semibold tracking-wider text-[#3584e4] uppercase">
                Standar Mutu &amp; Kualitas
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Mengapa Mempercayakan Rakit PC &amp; Servis pada Kami?
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Kami mengutamakan kejujuran diagnosa, kerapian pengerjaan, dan jaminan kepuasan pelanggan di setiap unit.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {advantages.map((adv) => {
                const Icon = adv.icon;
                return (
                  <div
                    key={adv.title}
                    className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-[#3584e4]/40 hover:shadow-md"
                  >
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border ${adv.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-foreground">
                      {adv.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {adv.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Pelanggan */}
        <TestimonialSection testimonials={testimonials} />

        {/* Tips & Blog Hardware Terbaru */}
        {recentPosts.length > 0 && (
          <section className="py-20 bg-background border-t border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-[#3584e4] uppercase">
                    Tips &amp; Edukasi Hardware
                  </span>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                    Panduan &amp; Berita Seputar Komputer
                  </h2>
                  <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                    Pelajari tips memilih komponen, cara merawat laptop agar tidak overheat, dan perbandingan performa SSD.
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3584e4] hover:text-[#1c71d8] transition-colors"
                >
                  <span>Lihat Semua Artikel Blog</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {recentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Global CTA Section */}
        <section className="relative overflow-hidden bg-[#18181b] py-20 text-white">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#3584e4]/30 via-[#18181b] to-indigo-950/40" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#3584e4]/20 border border-[#3584e4]/30 px-3.5 py-1 text-xs font-semibold text-[#78aeed]">
              <Cpu className="h-3.5 w-3.5" />
              <span>Konsultasi Bebas Bottleneck</span>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Siap Merakit PC Impian atau Butuh Servis Komputer Sekarang?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base text-neutral-300 sm:text-lg">
              Hubungi tim teknisi kami lewat WhatsApp untuk konsultasi racikan gratis sesuai alokasi dana atau booking jadwal servis laptop Anda.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`https://wa.me/${waNumber}?text=Halo%20CyberTech,%20saya%20ingin%20konsultasi%20rakit%20PC%20atau%20servis`}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#2ec27e] hover:bg-[#26a269] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#2ec27e]/20 transition-all cursor-pointer"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chat WhatsApp Cepat</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800/80 px-8 py-4 text-base font-semibold text-neutral-200 transition-colors hover:bg-neutral-700 hover:text-white"
              >
                <span>Lihat Alamat Toko Fisik</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
