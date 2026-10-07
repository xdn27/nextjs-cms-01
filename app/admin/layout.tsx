'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  Briefcase,
  FolderKanban,
  FileText,
  Users,
  MessageSquareQuote,
  Mail,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Sparkles,
  Shield,
} from 'lucide-react';
import { adminLogout } from '@/lib/actions';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Ringkasan Dashboard', icon: LayoutDashboard },
    { href: '/admin/settings', label: 'Pengaturan Perusahaan', icon: Settings },
    { href: '/admin/services', label: 'Kelola Layanan', icon: Briefcase },
    { href: '/admin/portfolio', label: 'Kelola Portofolio', icon: FolderKanban },
    { href: '/admin/blog', label: 'Kelola Blog & Artikel', icon: FileText },
    { href: '/admin/team', label: 'Kelola Anggota Tim', icon: Users },
    { href: '/admin/testimonials', label: 'Kelola Testimoni', icon: MessageSquareQuote },
    { href: '/admin/inquiries', label: 'Kotak Masuk Pesan', icon: Mail },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-100 dark:bg-neutral-950">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 md:flex">
        {/* Brand */}
        <div className="flex h-16 items-center gap-2.5 border-b border-neutral-200 px-6 dark:border-neutral-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">
              CMS Admin
            </span>
            <span className="text-[10px] font-medium text-neutral-400">
              Personal Company Profile
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-neutral-200 p-4 dark:border-neutral-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              <span>Lihat Website</span>
            </div>
          </Link>

          <form action={adminLogout}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50 dark:hover:bg-rose-950/30"
            >
              <LogOut className="h-4 w-4" />
              <span>Keluar (Logout)</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-900 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 md:hidden dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-indigo-600" />
              <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Pusat Kendali Konten
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
            >
              <span>Lihat Publik</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-neutral-800 dark:text-indigo-400">
              AD
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Dropdown */}
        {mobileMenuOpen && (
          <div className="border-b border-neutral-200 bg-white p-4 shadow-lg md:hidden dark:border-neutral-800 dark:bg-neutral-900">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 border-t border-neutral-100 pt-3 dark:border-neutral-800">
              <form action={adminLogout}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold text-rose-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Keluar (Logout)</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
