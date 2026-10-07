import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  FolderKanban,
  FileText,
  Mail,
  ArrowRight,
  Database,
} from 'lucide-react';
import {
  getCompanySettings,
  getServices,
  getProjects,
  getPosts,
  getInquiries,
} from '@/lib/data';
import { isSupabaseConfigured } from '@/lib/supabase/client';


export default async function AdminDashboardPage() {
  const [settings, services, projects, posts, inquiries] = await Promise.all([
    getCompanySettings(),
    getServices(),
    getProjects(),
    getPosts(),
    getInquiries(),
  ]);

  const unreadInquiries = inquiries.filter((inq) => inq.status === 'unread');
  const supabaseActive = isSupabaseConfigured();

  const stats = [
    {
      title: 'Total Layanan',
      count: services.length,
      href: '/admin/services',
      icon: Briefcase,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400',
    },
    {
      title: 'Proyek Portofolio',
      count: projects.length,
      href: '/admin/portfolio',
      icon: FolderKanban,
      color: 'text-violet-600 bg-violet-50 dark:bg-violet-950/40 dark:text-violet-400',
    },
    {
      title: 'Artikel Blog',
      count: posts.length,
      href: '/admin/blog',
      icon: FileText,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400',
    },
    {
      title: 'Pesan Masuk',
      count: inquiries.length,
      subtext: `${unreadInquiries.length} belum dibaca`,
      href: '/admin/inquiries',
      icon: Mail,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Greeting */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Selamat Datang di Panel CMS
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Kelola seluruh konten website <strong className="text-neutral-700 dark:text-neutral-200">{settings.company_name}</strong> secara langsung.
          </p>
        </div>

        {/* Database Status Indicator */}
        <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <Database className="h-4 w-4 text-neutral-400" />
          <span className="text-neutral-600 dark:text-neutral-300">Database:</span>
          {supabaseActive ? (
            <span className="flex items-center gap-1 font-semibold text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Supabase Terhubung
            </span>
          ) : (
            <span className="flex items-center gap-1 font-semibold text-amber-600">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Demo / Mock Mode
            </span>
          )}
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                  {stat.title}
                </span>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-neutral-900 dark:text-white">
                  {stat.count}
                </span>
                {stat.subtext && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    {stat.subtext}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-1 border-t border-neutral-100 pt-3 text-[11px] font-semibold text-indigo-600 transition-colors group-hover:text-indigo-700 dark:border-neutral-800 dark:text-indigo-400">
                <span>Buka Pengelolaan</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions & Recent Messages */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4 dark:border-neutral-800">
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                Pesan Masuk Terbaru
              </h3>
              <p className="text-xs text-neutral-500">Formulir kontak yang dikirim oleh pengunjung</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Lihat Semua ({inquiries.length})
            </Link>
          </div>

          <div className="mt-4 divide-y divide-neutral-100 dark:divide-neutral-800">
            {inquiries.slice(0, 4).map((inq) => (
              <div key={inq.id} className="py-3.5 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                      {inq.name}
                    </span>
                    <span className="text-xs text-neutral-400">({inq.email})</span>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      inq.status === 'unread'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                    }`}
                  >
                    {inq.status === 'unread' ? 'Belum Dibaca' : 'Sudah Dibaca'}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  {inq.subject}
                </p>
                <p className="mt-1 text-xs text-neutral-500 line-clamp-1">
                  {inq.message}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Shortcut Column */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Pintasan Cepat
            </h3>
            <p className="text-xs text-neutral-500">Aksi langsung untuk memperbarui website</p>

            <div className="mt-4 space-y-2">
              <Link
                href="/admin/settings"
                className="flex items-center justify-between rounded-xl border border-neutral-200 p-3 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                <span>Edit Profil Perusahaan</span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
              </Link>
              <Link
                href="/admin/services"
                className="flex items-center justify-between rounded-xl border border-neutral-200 p-3 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                <span>Tambah / Edit Layanan</span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
              </Link>
              <Link
                href="/admin/portfolio"
                className="flex items-center justify-between rounded-xl border border-neutral-200 p-3 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                <span>Unggah Proyek Baru</span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
              </Link>
              <Link
                href="/admin/blog"
                className="flex items-center justify-between rounded-xl border border-neutral-200 p-3 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                <span>Tulis Artikel Blog</span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
