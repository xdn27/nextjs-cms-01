import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { CompanySettings } from '@/lib/types';

interface HeroProps {
  settings: CompanySettings;
}

export function Hero({ settings }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-white py-20 lg:py-28 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-600/15" />
      <div className="absolute top-1/3 right-10 -z-10 h-72 w-72 rounded-full bg-violet-500/10 blur-2xl dark:bg-violet-600/10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/70 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur-sm dark:border-indigo-800/60 dark:bg-indigo-950/50 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{settings.tagline || 'Solusi Rekayasa Perangkat Lunak & Cloud Modern'}</span>
          </div>

          {/* Headline */}
          <h1 className="mt-8 max-w-4xl text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl dark:text-white">
            {settings.hero_title || 'Akselerasi Pertumbuhan Bisnis dengan Solusi Digital Andal'}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl dark:text-neutral-300">
            {settings.hero_subtitle ||
              'Membangun aplikasi web, mobile, dan sistem cloud performa tinggi bersama tim insinyur berpengalaman yang berfokus pada hasil nyata.'}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={settings.hero_cta_link || '/contact'}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/35"
            >
              <span>{settings.hero_cta_text || 'Mulai Konsultasi'}</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-7 py-4 text-base font-semibold text-neutral-800 shadow-sm transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
            >
              <span>Lihat Portofolio</span>
            </Link>
          </div>

          {/* Value Highlights */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8 border-t border-neutral-200/80 pt-10 dark:border-neutral-800">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Arsitektur Serverless Latensi Rendah</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Keamanan Standar Industri & RLS</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
              <CheckCircle2 className="h-4 w-4 text-indigo-500" />
              <span>CMS Mudah Dikelola Sendiri</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
