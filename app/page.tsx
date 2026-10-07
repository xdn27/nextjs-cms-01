import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
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
  const [settings, services, projects, posts, testimonials] = await Promise.all([
    getCompanySettings(),
    getServices(),
    getProjects(),
    getPosts(),
    getTestimonials(),
  ]);

  const featuredProjects = projects.filter((p) => p.is_featured).slice(0, 3);
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero settings={settings} />

        {/* Services Section */}
        <section className="py-20 bg-white dark:bg-neutral-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                  Layanan & Kapabilitas
                </span>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                  Solusi Terintegrasi untuk Kebutuhan Digital Anda
                </h2>
                <p className="mt-3 max-w-2xl text-base text-neutral-600 dark:text-neutral-400">
                  Dirancang dari awal untuk kecepatan, skalabilitas, dan kehandalan jangka panjang.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
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

        {/* Featured Portfolio Section */}
        <section className="border-t border-neutral-100 bg-neutral-50/60 py-20 dark:border-neutral-900 dark:bg-neutral-900/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                  Portofolio & Studi Kasus
                </span>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                  Proyek Pilihan yang Telah Kami Selesaikan
                </h2>
                <p className="mt-3 max-w-2xl text-base text-neutral-600 dark:text-neutral-400">
                  Lihat bagaimana kami membantu para klien mencapai pertumbuhan bisnis eksponensial.
                </p>
              </div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              >
                <span>Eksplorasi Semua Portofolio</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialSection testimonials={testimonials} />

        {/* Recent Articles / Blog */}
        {recentPosts.length > 0 && (
          <section className="py-20 bg-white dark:bg-neutral-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                    Wawasan & Berita
                  </span>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                    Artikel Teknologi & Rekayasa Terbaru
                  </h2>
                  <p className="mt-3 max-w-2xl text-base text-neutral-600 dark:text-neutral-400">
                    Baca artikel seputar tren teknologi, praktik terbaik keamanan, dan arsitektur modern.
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  <span>Lihat Semua Artikel</span>
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
        <section className="relative overflow-hidden bg-neutral-900 py-20 text-white dark:bg-neutral-950">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-900/50 via-neutral-900 to-violet-950/40" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3.5 py-1 text-xs font-semibold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Mulai Transformasi Hari Ini</span>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Siap Membangun Solusi Digital Masa Depan Bersama Kami?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base text-neutral-300 sm:text-lg">
              Jadwalkan sesi konsultasi gratis tanpa komitmen bersama konsultan teknologi kami untuk membedah kebutuhan sistem Anda.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-indigo-500"
              >
                <span>Hubungi Tim Konsultan</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={`https://wa.me/${settings.contact_whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800/80 px-8 py-4 text-base font-semibold text-neutral-200 transition-colors hover:bg-neutral-700 hover:text-white"
              >
                <span>WhatsApp Langsung</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
