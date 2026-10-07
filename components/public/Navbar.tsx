'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Monitor, MessageCircle } from 'lucide-react';
import { CompanySettings } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  settings: CompanySettings;
}

export function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/services', label: 'Layanan' },
    { href: '/katalog', label: 'Katalog Produk' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Kontak' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#3584e4] to-indigo-600 text-white shadow-md shadow-[#3584e4]/20 transition-transform duration-150 ease-out group-hover:scale-105">
            <Monitor className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground">
              {settings.company_name || 'CyberTech Computer'}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              Pusat Rakit PC &amp; Servis Komputer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-muted font-semibold text-primary'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden items-center sm:flex">
          <Button asChild size="sm" className="h-9 shadow-sm bg-[#3584e4] hover:bg-[#1c71d8] text-white cursor-pointer">
            <Link href="/contact">
              <MessageCircle className="h-3.5 w-3.5 mr-1" />
              <span>{settings.hero_cta_text || 'Konsultasi Rakit PC'}</span>
            </Link>
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Buka menu navigasi"
          className="md:hidden"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="border-b border-border bg-background/95 px-4 pt-3 pb-6 shadow-xl backdrop-blur-md md:hidden">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-4 py-2.5 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-muted font-semibold text-primary'
                      : 'text-foreground hover:bg-muted/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <Button asChild className="w-full shadow-sm bg-[#3584e4] hover:bg-[#1c71d8] text-white">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <MessageCircle className="h-4 w-4 mr-1.5" />
                <span>{settings.hero_cta_text || 'Konsultasi Rakit PC'}</span>
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
