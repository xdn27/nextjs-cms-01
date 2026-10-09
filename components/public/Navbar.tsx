'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Monitor } from 'lucide-react';
import { CompanySettings } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  settings: CompanySettings;
}

export function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/layanan', label: 'Layanan' },
    { href: '/katalog', label: 'Katalog Produk' },
    { href: '/blog', label: 'Blog' },
    { href: '/kontak', label: 'Kontak' },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md transition-all"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" transitionTypes={['nav-lateral']} className="group flex items-center gap-3">
          {settings.logo_url ? (
            <Image
              src={settings.logo_url}
              alt={`Logo ${settings.company_name}`}
              width={44}
              height={44}
              className="h-11 w-11 rounded-xl object-contain"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#3584e4] to-indigo-600 text-white shadow-md shadow-[#3584e4]/20 transition-transform duration-150 ease-out group-hover:scale-105">
              <Monitor className="h-6 w-6" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground">
              {settings.company_name}
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
                transitionTypes={['nav-lateral']}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'font-semibold text-primary'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                }`}
              >
                {isActive && (
                    <span
                      className="absolute inset-0 rounded-lg bg-muted -z-10"
                      aria-hidden
                    />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => startTransition(() => setIsOpen(!isOpen))}
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
                    transitionTypes={['nav-lateral']}
                    onClick={() => startTransition(() => setIsOpen(false))}
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
          </div>
      )}
    </header>
  );
}
