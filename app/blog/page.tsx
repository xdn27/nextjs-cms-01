import React from 'react';
import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { getCompanySettings, getPosts } from '@/lib/data';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { DirectionalTransition } from '@/components/public/DirectionalTransition';
import { BlogCard } from '@/components/public/BlogCard';

export const metadata: Metadata = {
  title: 'Blog & Tips Hardware Komputer',
  description:
    'Tips rakit PC gaming, panduan memilih komponen bebas bottleneck, perawatan laptop overheat, dan review hardware.',
};

export default async function BlogPage() {
  const [settings, posts] = await Promise.all([
    getCompanySettings(),
    getPosts(),
  ]);

  return (
    <DirectionalTransition>
      <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-b from-muted/50 via-background to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#3584e4]/10 border border-[#3584e4]/20 px-3.5 py-1 text-xs font-semibold text-[#3584e4]">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Tips &amp; Panduan Hardware</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Blog &amp; Edukasi Seputar Komputer
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-base text-muted-foreground sm:text-lg">
              Pelajari tips memilih racikan PC gaming bebas bottleneck, cara mengatasi laptop cepat panas, dan perbandingan performa komponen langsung dari teknisi kami.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-12 pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
    </DirectionalTransition>
  );
}
