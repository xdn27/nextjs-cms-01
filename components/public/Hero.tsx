'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CompanySettings, HeroSlide as DatabaseHeroSlide, HeroSlideHighlight } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DynamicIcon } from '@/components/public/DynamicIcon';

interface HeroProps {
  settings?: CompanySettings;
  initialSlides?: DatabaseHeroSlide[];
}

interface FormattedHeroSlide {
  id: string;
  image: string;
  badge: {
    text: string;
    icon: string;
    color: string;
  };
  title: string;
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
    icon: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  highlights: {
    icon: string;
    text: string;
    iconColor: string;
  }[];
}

const DEFAULT_SLIDES: FormattedHeroSlide[] = [
  {
    id: 'gaming-pc',
    image: '/images/hero/slide-1-gaming-pc.svg',
    badge: {
      text: 'Spesialis Rakit PC Gaming & Workstation',
      icon: 'Cpu',
      color: 'border-[#3584e4]/30 bg-[#3584e4]/10 text-[#3584e4]',
    },
    title: 'Rakit PC Gaming & Workstation Bebas Bottleneck',
    subtitle:
      'Konsultasi racikan spesifikasi gratis sesuai alokasi dana, perakitan kabel rapi, dan uji kestabilan stress test 24 jam dengan 100% komponen resmi.',
    primaryCta: {
      text: 'Lihat Katalog Produk',
      href: '/katalog',
      icon: 'ShoppingBag',
    },
    secondaryCta: {
      text: 'Hubungi Kontak Toko',
      href: '/kontak',
    },
    highlights: [
      {
        icon: 'Zap',
        text: 'Racikan Bebas Bottleneck',
        iconColor: 'text-amber-500',
      },
      {
        icon: 'ShieldCheck',
        text: '100% Komponen Baru & Resmi',
        iconColor: 'text-[#2ec27e]',
      },
      {
        icon: 'Cpu',
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
      icon: 'Wrench',
      color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
    },
    title: 'Service Komputer & Laptop Profesional Bergaransi',
    subtitle:
      'Solusi tuntas laptop lambat dan overheat. Upgrade SSD NVMe & RAM instan, penggantian pasta termal berkualitas tinggi, serta perbaikan motherboard terpercaya.',
    primaryCta: {
      text: 'Lihat Layanan Servis',
      href: '/layanan',
      icon: 'Wrench',
    },
    secondaryCta: {
      text: 'Cek Alamat & Jadwal Toko',
      href: '/kontak',
    },
    highlights: [
      {
        icon: 'Zap',
        text: 'Pengerjaan Cepat & Transparan',
        iconColor: 'text-amber-500',
      },
      {
        icon: 'ShieldCheck',
        text: 'Garansi Servis Pasti',
        iconColor: 'text-emerald-500',
      },
      {
        icon: 'Sparkles',
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
      icon: 'ShoppingBag',
      color: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
    },
    title: 'Pusat Komponen Hardware & Aksesoris Gaming Terlengkap',
    subtitle:
      'Pilihan prosesor Intel & Ryzen terbaru, kartu grafis RTX/Radeon, monitor gaming high-refresh rate, dan periferal bergaransi distributor resmi Indonesia.',
    primaryCta: {
      text: 'Jelajahi Produk Pilihan',
      href: '/katalog',
      icon: 'ShoppingBag',
    },
    secondaryCta: {
      text: 'Tanya Stok & Spesifikasi',
      href: '/kontak',
    },
    highlights: [
      {
        icon: 'ShieldCheck',
        text: 'Garansi Distributor Resmi',
        iconColor: 'text-purple-400',
      },
      {
        icon: 'Zap',
        text: 'Packing Kayu Aman Se-Nusantara',
        iconColor: 'text-amber-500',
      },
      {
        icon: 'Cpu',
        text: 'Harga Kompetitif & Real-Time',
        iconColor: 'text-[#3584e4]',
      },
    ],
  },
];

export function Hero({ initialSlides }: HeroProps) {
  const slides: FormattedHeroSlide[] = useMemo(() => {
    if (initialSlides && initialSlides.length > 0) {
      return initialSlides.map((s) => {
        const rawHighlights = (s.highlights || []) as (HeroSlideHighlight | string)[];
        const parsedHighlights = rawHighlights.map((hl, idx) => {
          if (typeof hl === 'string') {
            const defaultIcons = ['Zap', 'ShieldCheck', 'Cpu'];
            const defaultColors = ['text-amber-500', 'text-[#2ec27e]', 'text-[#3584e4]'];
            return {
              text: hl,
              icon: defaultIcons[idx] || 'ShieldCheck',
              iconColor: defaultColors[idx] || 'text-[#3584e4]',
            };
          }
          return {
            text: hl.text || '',
            icon: hl.icon || 'ShieldCheck',
            iconColor: hl.iconColor || 'text-[#3584e4]',
          };
        });

        return {
          id: s.id,
          image: s.image_url || '/images/hero/slide-1-gaming-pc.svg',
          badge: {
            text: s.badge_text || 'CyberTech Computer',
            icon: s.badge_icon || 'Cpu',
            color: s.badge_color || 'border-[#3584e4]/30 bg-[#3584e4]/10 text-[#3584e4]',
          },
          title: s.title,
          subtitle: s.subtitle,
          primaryCta: {
            text: s.primary_cta_text || 'Lihat Katalog Produk',
            href: s.primary_cta_link || '/katalog',
            icon: 'ShoppingBag',
          },
          secondaryCta: {
            text: s.secondary_cta_text || 'Hubungi Kontak Toko',
            href: s.secondary_cta_link || '/kontak',
          },
          highlights: parsedHighlights.length > 0 ? parsedHighlights : DEFAULT_SLIDES[0].highlights,
        };
      });
    }
    return DEFAULT_SLIDES;
  }, [initialSlides]);

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
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, slides.length]);

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
          {/* Stacked Slides Container: CSS Grid (col-start-1 row-start-1) */}
          {/* Locks container height to the tallest slide at any viewport width so the layout never jumps */}
          <div className="grid grid-cols-1 grid-rows-1 w-full items-start">
            {slides.map((slide, index) => {
              const isActive = index === currentIndex;

              return (
                <div
                  key={slide.id}
                  className={`col-start-1 row-start-1 flex flex-col items-center text-center w-full transition-all duration-700 ease-in-out ${
                    isActive
                      ? 'opacity-100 z-10 translate-y-0 pointer-events-auto'
                      : 'opacity-0 z-0 -translate-y-1 pointer-events-none'
                  }`}
                  aria-hidden={!isActive}
                >
                  {/* Top Badge (Slide Specific) */}
                  <div className="flex items-center justify-center">
                    <Badge
                      variant="secondary"
                      className={`px-4 py-1.5 text-xs font-semibold shadow-sm border ${slide.badge.color} backdrop-blur-md`}
                    >
                      <DynamicIcon name={slide.badge.icon || 'Cpu'} className="h-3.5 w-3.5 mr-1.5" />
                      <span>{slide.badge.text}</span>
                    </Badge>
                  </div>

                  {/* Headline (Slide Specific) - reserved flex container for uniform positioning */}
                  <div className="mt-6 sm:mt-8 flex items-center justify-center min-h-[5.5rem] sm:min-h-[7rem] lg:min-h-[8.5rem] w-full">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15] drop-shadow-sm">
                      {slide.title}
                    </h1>
                  </div>

                  {/* Subtitle (Slide Specific) - reserved flex container for uniform positioning */}
                  <div className="mt-4 sm:mt-6 flex items-center justify-center min-h-[4.5rem] sm:min-h-[4rem] lg:min-h-[3.5rem] max-w-2xl w-full">
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-neutral-300">
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="mt-8 sm:mt-10 flex flex-col gap-4 sm:flex-row sm:items-center justify-center w-full sm:w-auto">
                    <Button
                      asChild
                      size="lg"
                      className="h-13 px-8 text-base font-semibold shadow-xl shadow-[#3584e4]/30 bg-[#3584e4] hover:bg-[#1c71d8] text-white group cursor-pointer transition-transform duration-150 ease-out hover:scale-105 active:scale-95"
                    >
                      <Link transitionTypes={['nav-lateral']} href={slide.primaryCta.href} tabIndex={isActive ? 0 : -1}>
                        <DynamicIcon name={slide.primaryCta.icon || 'ShoppingBag'} className="h-4 w-4 mr-2" />
                        <span>{slide.primaryCta.text}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 ml-1.5" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="h-13 px-8 text-base font-semibold cursor-pointer border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-transform duration-150 ease-out hover:scale-105 active:scale-95"
                    >
                      <Link transitionTypes={['nav-lateral']} href={slide.secondaryCta.href} tabIndex={isActive ? 0 : -1}>
                        <span>{slide.secondaryCta.text}</span>
                      </Link>
                    </Button>
                  </div>

                  {/* Value Highlights */}
                  <div className="mt-12 sm:mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8 border-t border-white/10 pt-8 sm:pt-10 w-full">
                    {slide.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center gap-2.5 text-xs sm:text-sm font-medium text-neutral-300"
                      >
                        <DynamicIcon
                          name={highlight.icon || 'ShieldCheck'}
                          className={`h-4 w-4 shrink-0 ${highlight.iconColor}`}
                        />
                        <span>{highlight.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slider Controls: Dots & Navigation Arrows */}
          <div className="mt-8 sm:mt-10 flex items-center justify-between w-full max-w-md pt-4">
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
