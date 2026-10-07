'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { CompanySettings } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroProps {
  settings: CompanySettings;
}

interface HeroSlide {
  id: string;
  image: string;
  badge: {
    text: string;
    icon: React.ElementType;
    color: string;
  };
  title: string;
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
    icon: React.ElementType;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  highlights: {
    icon: React.ElementType;
    text: string;
    iconColor: string;
  }[];
}

export function Hero({}: HeroProps) {
  const slides: HeroSlide[] = [
    {
      id: 'gaming-pc',
      image: '/images/hero/slide-1-gaming-pc.svg',
      badge: {
        text: 'Spesialis Rakit PC Gaming & Workstation',
        icon: Cpu,
        color: 'border-[#3584e4]/30 bg-[#3584e4]/10 text-[#3584e4]',
      },
      title: 'Rakit PC Gaming & Workstation Bebas Bottleneck',
      subtitle:
        'Konsultasi racikan spesifikasi gratis sesuai alokasi dana, perakitan kabel rapi, dan uji kestabilan stress test 24 jam dengan 100% komponen resmi.',
      primaryCta: {
        text: 'Lihat Katalog Produk',
        href: '/katalog',
        icon: ShoppingBag,
      },
      secondaryCta: {
        text: 'Hubungi Kontak Toko',
        href: '/contact',
      },
      highlights: [
        {
          icon: Zap,
          text: 'Racikan Bebas Bottleneck',
          iconColor: 'text-amber-500',
        },
        {
          icon: ShieldCheck,
          text: '100% Komponen Baru & Resmi',
          iconColor: 'text-[#2ec27e]',
        },
        {
          icon: Cpu,
          text: 'Stress Test & Uji Beban 24 Jam',
          iconColor: 'text-[#3584e4]',
        },
      ],
    },
    {
      id: 'service-workshop',
      image: '/images/hero/slide-2-service-workshop.svg',
      badge: {
        text: 'Layanan Servis & Upgrade Kilat',
        icon: Wrench,
        color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
      },
      title: 'Service Komputer & Laptop Profesional Bergaransi',
      subtitle:
        'Solusi tuntas laptop lambat dan overheat. Upgrade SSD NVMe & RAM instan, penggantian pasta termal berkualitas tinggi, serta perbaikan motherboard terpercaya.',
      primaryCta: {
        text: 'Lihat Layanan Servis',
        href: '/services',
        icon: Wrench,
      },
      secondaryCta: {
        text: 'Cek Alamat & Jadwal Toko',
        href: '/contact',
      },
      highlights: [
        {
          icon: Zap,
          text: 'Pengerjaan Cepat & Transparan',
          iconColor: 'text-amber-500',
        },
        {
          icon: ShieldCheck,
          text: 'Garansi Servis Pasti',
          iconColor: 'text-emerald-500',
        },
        {
          icon: Sparkles,
          text: 'Thermal Paste Premium',
          iconColor: 'text-[#3584e4]',
        },
      ],
    },
    {
      id: 'hardware-catalog',
      image: '/images/hero/slide-3-hardware-catalog.svg',
      badge: {
        text: 'Katalog Komponen & Peripheral Resmi',
        icon: ShoppingBag,
        color: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
      },
      title: 'Pusat Komponen Hardware & Aksesoris Gaming Terlengkap',
      subtitle:
        'Pilihan prosesor Intel & Ryzen terbaru, kartu grafis RTX/Radeon, monitor gaming high-refresh rate, dan periferal bergaransi distributor resmi Indonesia.',
      primaryCta: {
        text: 'Jelajahi Produk Pilihan',
        href: '/katalog',
        icon: ShoppingBag,
      },
      secondaryCta: {
        text: 'Tanya Stok & Spesifikasi',
        href: '/contact',
      },
      highlights: [
        {
          icon: ShieldCheck,
          text: 'Garansi Distributor Resmi',
          iconColor: 'text-purple-400',
        },
        {
          icon: Zap,
          text: 'Packing Kayu Aman Se-Nusantara',
          iconColor: 'text-amber-500',
        },
        {
          icon: Cpu,
          text: 'Harga Kompetitif & Real-Time',
          iconColor: 'text-[#3584e4]',
        },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const currentSlide = slides[currentIndex];
  const BadgeIcon = currentSlide.badge.icon;
  const PrimaryIcon = currentSlide.primaryCta.icon;

  return (
    <section
      className="relative overflow-hidden bg-[#090d16] text-white py-24 lg:py-32 min-h-[660px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Banner Slider"
    >
      {/* Background Image Slider with Crossfade Transition */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
          );
        })}
      </div>

      {/* Atmospheric Vignette & Contrast Overlay */}
      <div className="absolute inset-0 z-[1] bg-[#090d16]/40" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#090d16] via-transparent to-[#090d16]/60" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#090d16]/75 via-transparent to-[#090d16]/75" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
          {/* Animated Slide Content (Fades smoothly on change) */}
          <div
            key={currentIndex}
            className="animate-hero-fade flex flex-col items-center text-center w-full"
          >
            {/* Top Badge (Slide Specific) */}
            <div>
              <Badge
                variant="secondary"
                className={`px-4 py-1.5 text-xs font-semibold shadow-sm border ${currentSlide.badge.color} backdrop-blur-md`}
              >
                <BadgeIcon className="h-3.5 w-3.5 mr-1.5" />
                <span>{currentSlide.badge.text}</span>
              </Badge>
            </div>

            {/* Headline (Slide Specific) */}
            <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15] drop-shadow-sm">
              {currentSlide.title}
            </h1>

            {/* Subtitle (Slide Specific) */}
            <p className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-neutral-300">
              {currentSlide.subtitle}
            </p>

            {/* Action CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center justify-center w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="h-13 px-8 text-base font-semibold shadow-xl shadow-[#3584e4]/30 bg-[#3584e4] hover:bg-[#1c71d8] text-white group cursor-pointer transition-transform duration-150 ease-out hover:scale-105 active:scale-95"
              >
                <Link href={currentSlide.primaryCta.href}>
                  <PrimaryIcon className="h-4 w-4 mr-2" />
                  <span>{currentSlide.primaryCta.text}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 ml-1.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-13 px-8 text-base font-semibold cursor-pointer border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-transform duration-150 ease-out hover:scale-105 active:scale-95"
              >
                <Link href={currentSlide.secondaryCta.href}>
                  <span>{currentSlide.secondaryCta.text}</span>
                </Link>
              </Button>
            </div>

            {/* Value Highlights */}
            <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8 border-t border-white/10 pt-10 w-full">
              {currentSlide.highlights.map((highlight, idx) => {
                const HighlightIcon = highlight.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-center gap-2.5 text-xs sm:text-sm font-medium text-neutral-300"
                  >
                    <HighlightIcon className={`h-4 w-4 shrink-0 ${highlight.iconColor}`} />
                    <span>{highlight.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slider Controls: Dots & Navigation Arrows */}
          <div className="mt-10 flex items-center justify-between w-full max-w-md pt-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              aria-label="Slide sebelumnya"
              className="h-9 w-9 rounded-full border border-white/15 bg-black/40 backdrop-blur-md hover:bg-white/20 text-white transition-transform duration-150 ease-out hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Indicator Pills */}
            <div className="flex items-center gap-2">
              {slides.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Buka slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'w-8 bg-[#3584e4] shadow-md shadow-[#3584e4]/50'
                        : 'w-2.5 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                );
              })}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              aria-label="Slide berikutnya"
              className="h-9 w-9 rounded-full border border-white/15 bg-black/40 backdrop-blur-md hover:bg-white/20 text-white transition-transform duration-150 ease-out hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
