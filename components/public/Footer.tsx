'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Sparkles, Shield, ArrowUpRight } from 'lucide-react';
import { CompanySettings } from '@/lib/types';

interface FooterProps {
  settings: CompanySettings;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = 2026;

  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300 dark:border-neutral-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-white shadow-md">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {settings.company_name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              {settings.description ||
                'Mitra terpercaya transformasi digital melalui solusi rekayasa web, mobile, dan cloud enterprise berkinerja tinggi.'}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {settings.social_linkedin && (
                <a
                  href={settings.social_linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-neutral-800 p-2 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <span className="text-xs font-semibold">LinkedIn</span>
                </a>
              )}
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
              {settings.social_twitter && (
                <a
                  href={settings.social_twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-neutral-800 p-2 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white"
                  aria-label="X / Twitter"
                >
                  <span className="text-xs font-semibold">X / Twitter</span>
                </a>
              )}
            </div>
          </div>

          {/* Navigasi Utama */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Navigasi
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Tentang Perusahaan
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Layanan & Solusi
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  Portofolio Proyek
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Artikel & Wawasan
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Layanan Unggulan */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Solusi Utama
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Web & SaaS Enterprise
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Aplikasi Mobile iOS & Android
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Arsitektur Cloud & DevOps
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Integrasi Kecerdasan Buatan (AI)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Audit Keamanan Siber
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak & Lokasi */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Kontak Kantor
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                <span className="leading-snug">{settings.contact_address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-indigo-400" />
                <a href={`tel:${settings.contact_phone}`} className="hover:text-white">
                  {settings.contact_phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-indigo-400" />
                <a href={`mailto:${settings.contact_email}`} className="hover:text-white">
                  {settings.contact_email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 sm:flex-row text-xs text-neutral-500">
          <p>© {currentYear} {settings.company_name}. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-6">
            <span>Powered by Next.js & Supabase Serverless</span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-neutral-400 hover:text-indigo-400 transition-colors"
            >
              <Shield className="h-3.5 w-3.5" />
              <span>Admin CMS</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
