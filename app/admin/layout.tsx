'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  Wrench,
  ShoppingBag,
  FileText,
  MessageSquareQuote,
  Mail,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Monitor,
  Shield,
  Sliders,
} from 'lucide-react';
import { adminLogout } from '@/lib/actions';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Ringkasan Dashboard', icon: LayoutDashboard },
    { href: '/admin/slider', label: 'Kelola Slider Hero', icon: Sliders },
    { href: '/admin/pengaturan', label: 'Pengaturan Toko', icon: Settings },
    { href: '/admin/layanan', label: 'Kelola Layanan Servis', icon: Wrench },
    { href: '/admin/katalog', label: 'Kelola Katalog Produk', icon: ShoppingBag },
    { href: '/admin/blog', label: 'Kelola Blog & Tips Hardware', icon: FileText },
    { href: '/admin/testimoni', label: 'Kelola Ulasan Pelanggan', icon: MessageSquareQuote },
    { href: '/admin/pesan', label: 'Pesan & Konsultasi', icon: Mail },
  ];

  return (
    <div className="dark adwaita-dark flex min-h-screen bg-[#1e1e1e] text-[#ffffff] antialiased selection:bg-[#3584e4] selection:text-white">
      {/* Desktop Sidebar (Libadwaita Navigation View) */}
      <aside className="hidden w-64 flex-col border-r border-[#383838] bg-[#242424] md:flex">
        {/* Adwaita Headerbar Segment */}
        <div className="flex h-14 items-center gap-2.5 border-b border-[#383838] px-5 bg-[#242424]">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3584e4] text-white shadow-sm">
            <Monitor className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-tight text-white">
              CyberTech CMS
            </span>
            <span className="text-[10px] font-medium text-[#9a9996]">
              Toko Komputer Admin
            </span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 space-y-0.5 p-3 overflow-y-auto">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#9a9996]">
            Navigasi Panel
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#3584e4] text-white shadow-sm'
                    : 'text-[#c0bfbc] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-[#383838] p-3 space-y-1 bg-[#242424]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-[#c0bfbc] hover:bg-white/5 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              <span>Lihat Website</span>
            </div>
          </Link>

          <form action={adminLogout}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#ff7b63] transition-colors hover:bg-red-500/10 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Keluar (Logout)</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden bg-[#1e1e1e]">
        {/* Libadwaita HeaderBar */}
        <header className="flex h-14 items-center justify-between border-b border-[#383838] bg-[#303030] px-4 sm:px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#c0bfbc] hover:text-white hover:bg-white/10 h-8 w-8"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#3584e4]" />
              <span className="text-xs font-bold text-white">
                Pusat Kendali Konten
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#383838] px-3 py-1.5 text-xs font-semibold text-[#c0bfbc] hover:bg-[#424242] hover:text-white transition-colors"
            >
              <span>Lihat Publik</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3584e4] text-xs font-bold text-white shadow-sm">
              AD
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Dropdown */}
        {mobileMenuOpen && (
          <div className="border-b border-[#383838] bg-[#242424] p-4 shadow-xl md:hidden">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium ${
                      isActive
                        ? 'bg-[#3584e4] text-white'
                        : 'text-[#c0bfbc] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 border-t border-[#383838] pt-3">
              <form action={adminLogout}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#ff7b63]"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Keluar (Logout)</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Page Content View */}
        <main className="flex-1 overflow-y-auto bg-[#1e1e1e] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
