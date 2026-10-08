'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Monitor, Clock, MessageCircle } from 'lucide-react';
import { CompanySettings } from '@/lib/types';
import { FloatingWhatsApp } from '@/components/public/FloatingWhatsApp';

interface FooterProps {
  settings: CompanySettings;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = 2026;

  return (
    <footer className="border-t border-[#383838] bg-[#18181b] text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link transitionTypes={['nav-lateral']} href="/" className="flex items-center gap-3">
              {settings.logo_url ? (
                <Image
                  src={settings.logo_url}
                  alt={`Logo ${settings.company_name}`}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-xl object-contain"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#3584e4] to-indigo-600 text-white shadow-md">
                  <Monitor className="h-5 w-5" />
                </div>
              )}
              <span className="text-xl font-bold tracking-tight text-white">
                {settings.company_name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              {settings.description ||
                'Pusat belanja kebutuhan komputer, rakit custom PC gaming & workstation bergaransi resmi, upgrade komponen, dan jasa service laptop/komputer profesional.'}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {settings.social_instagram && (
                <a
                  href={settings.social_instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-neutral-800 p-2 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white"
                  aria-label="Instagram"
                >
                  <span className="text-xs font-semibold">Instagram</span>
                </a>
              )}
              {settings.social_facebook && (
                <a
                  href={settings.social_facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-neutral-800 p-2 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white"
                  aria-label="Facebook"
                >
                  <span className="text-xs font-semibold">Facebook</span>
                </a>
              )}
              {settings.contact_whatsapp && (
                <a
                  href={`https://wa.me/${settings.contact_whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20CyberTech,%20saya%20ingin%20konsultasi`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-[#2ec27e]/20 text-[#2ec27e] p-2 hover:bg-[#2ec27e]/30 transition-colors flex items-center gap-1.5"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">WhatsApp</span>
                </a>
              )}
            </div>
          </div>

          {/* Navigasi Utama */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Menu Navigasi
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link transitionTypes={['nav-lateral']} href="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link transitionTypes={['nav-lateral']} href="/services" className="hover:text-white transition-colors">
                  Layanan &amp; Servis
                </Link>
              </li>
              <li>
                <Link transitionTypes={['nav-lateral']} href="/katalog" className="hover:text-white transition-colors">
                  Katalog Produk
                </Link>
              </li>
              <li>
                <Link transitionTypes={['nav-lateral']} href="/blog" className="hover:text-white transition-colors">
                  Blog &amp; Tips Hardware
                </Link>
              </li>
              <li>
                <Link transitionTypes={['nav-lateral']} href="/contact" className="hover:text-white transition-colors">
                  Kontak &amp; Alamat Toko
                </Link>
              </li>
            </ul>
          </div>

          {/* Kategori Populer */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Katalog &amp; Layanan
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link transitionTypes={['nav-lateral']} href="/katalog" className="hover:text-white transition-colors">
                  PC Gaming &amp; Streaming
                </Link>
              </li>
              <li>
                <Link transitionTypes={['nav-lateral']} href="/katalog" className="hover:text-white transition-colors">
                  Laptop Gaming &amp; Office
                </Link>
              </li>
              <li>
                <Link transitionTypes={['nav-lateral']} href="/services#rakit-pc-gaming-custom" className="hover:text-white transition-colors">
                  Jasa Rakit PC Custom
                </Link>
              </li>
              <li>
                <Link transitionTypes={['nav-lateral']} href="/services#servis-laptop-pc-desktop" className="hover:text-white transition-colors">
                  Servis Laptop &amp; PC
                </Link>
              </li>
              <li>
                <Link transitionTypes={['nav-lateral']} href="/services#cleaning-repaste-laptop-pc" className="hover:text-white transition-colors">
                  Deep Cleaning &amp; Repaste
                </Link>
              </li>
              <li>
                <Link transitionTypes={['nav-lateral']} href="/services#upgrade-ram-ssd-gpu" className="hover:text-white transition-colors">
                  Upgrade RAM &amp; SSD NVMe
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak & Lokasi Toko */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Toko Fisik &amp; Servis
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#3584e4]" />
                <span className="leading-snug">{settings.contact_address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-[#3584e4]" />
                <span className="leading-snug">Senin - Sabtu: 09:00 - 20:00 WIB</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#3584e4]" />
                <a href={`tel:${settings.contact_phone}`} className="hover:text-white">
                  {settings.contact_phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#3584e4]" />
                <a href={`mailto:${settings.contact_email}`} className="hover:text-white">
                  {settings.contact_email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#2e2e34] pt-8 text-xs text-neutral-500 sm:flex-row">
          <p>© {currentYear} {settings.company_name}. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-6">
            <Link transitionTypes={['nav-lateral']} href="/services" className="hover:text-neutral-400">
              Layanan
            </Link>
            <Link transitionTypes={['nav-lateral']} href="/katalog" className="hover:text-neutral-400">
              Katalog
            </Link>
            <Link transitionTypes={['nav-lateral']} href="/contact" className="hover:text-neutral-400">
              Kontak
            </Link>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp
        whatsappNumber={settings.contact_whatsapp}
        companyName={settings.company_name}
      />
    </footer>
  );
}
