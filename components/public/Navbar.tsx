'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CompanySettings } from '@/lib/types';

interface NavbarProps {
  settings: CompanySettings;
}

export function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/about', label: 'Tentang Kami' },
    { href: '/services', label: 'Layanan' },
    { href: '/portfolio', label: 'Portofolio' },
    { href: '/blog', label: 'Artikel' },
    { href: '/contact', label: 'Kontak' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-md transition-all dark:border-neutral-800 dark:bg-neutral-950/85">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {settings.company_name || 'Nusantara Tech'}
            </span>
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Enterprise Digital Solution
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-neutral-100 font-semibold text-indigo-600 dark:bg-neutral-800/80 dark:text-indigo-400'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Admin Link */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/60 dark:hover:text-neutral-200"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
            <span>CMS Panel</span>
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-600 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            <span>{settings.hero_cta_text || 'Konsultasi'}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Buka menu navigasi"
          className="inline-flex items-center justify-center rounded-xl p-2.5 text-neutral-700 hover:bg-neutral-100 focus:outline-none dark:text-neutral-200 dark:hover:bg-neutral-800 md:hidden"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="border-b border-neutral-200 bg-white/95 px-4 pt-3 pb-6 shadow-xl backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/95 md:hidden">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-4 py-2.5 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-neutral-100 font-semibold text-indigo-600 dark:bg-neutral-800 dark:text-indigo-400'
                      : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 py-2.5 text-sm font-medium text-neutral-700 dark:border-neutral-800 dark:text-neutral-300"
            >
              <ShieldCheck className="h-4 w-4 text-indigo-500" />
              <span>Login ke Panel CMS</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-center text-sm font-semibold text-white shadow-sm"
            >
              <span>{settings.hero_cta_text || 'Konsultasi'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
