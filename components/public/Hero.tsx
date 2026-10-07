import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { CompanySettings } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroProps {
  settings: CompanySettings;
}

export function Hero({ settings }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 via-background to-background py-20 lg:py-28">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-1/3 right-10 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-2xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Top Badge */}
          <Badge variant="secondary" className="px-4 py-1.5 text-xs font-semibold shadow-sm border border-primary/20 bg-primary/5 text-primary">
            <Sparkles className="h-3.5 w-3.5 mr-1 text-primary" />
            <span>{settings.tagline || 'Solusi Rekayasa Perangkat Lunak & Cloud Modern'}</span>
          </Badge>

          {/* Headline */}
          <h1 className="mt-8 max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {settings.hero_title || 'Akselerasi Pertumbuhan Bisnis dengan Solusi Digital Andal'}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {settings.hero_subtitle ||
              'Membangun aplikasi web, mobile, dan sistem cloud performa tinggi bersama tim insinyur berpengalaman yang berfokus pada hasil nyata.'}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="h-13 px-8 text-base font-semibold shadow-lg shadow-primary/20 group">
              <Link href={settings.hero_cta_link || '/contact'}>
                <span>{settings.hero_cta_text || 'Mulai Konsultasi'}</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-13 px-8 text-base font-semibold">
              <Link href="/portfolio">
                <span>Lihat Portofolio</span>
              </Link>
            </Button>
          </div>

          {/* Value Highlights */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8 border-t border-border pt-10">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Arsitektur Serverless Latensi Rendah</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Keamanan Standar Industri & RLS</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>CMS Mudah Dikelola Sendiri</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
