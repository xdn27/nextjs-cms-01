import React from 'react';
import Link from 'next/link';
import {
  Wrench,
  ShoppingBag,
  FileText,
  Mail,
  ArrowRight,
  Database,
  Sliders,
} from 'lucide-react';
import {
  getCompanySettings,
  getServices,
  getProjects,
  getPosts,
  getInquiries,
  getAllHeroSlides,
} from '@/lib/data';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function AdminDashboardPage() {
  const [settings, services, products, posts, inquiries, slides] = await Promise.all([
    getCompanySettings(),
    getServices(),
    getProjects(),
    getPosts(),
    getInquiries(),
    getAllHeroSlides(),
  ]);

  const unreadInquiries = inquiries.filter((inq) => inq.status === 'unread');
  const supabaseActive = isSupabaseConfigured();

  const stats = [
    {
      title: 'Slider Hero Banner',
      count: slides.length,
      subtext: `${slides.filter((s) => s.is_active).length} aktif tayang`,
      href: '/admin/slider',
      icon: Sliders,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'Layanan Servis',
      count: services.length,
      href: '/admin/layanan',
      icon: Wrench,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Katalog Produk',
      count: products.length,
      href: '/admin/katalog',
      icon: ShoppingBag,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Tips & Blog',
      count: posts.length,
      href: '/admin/blog',
      icon: FileText,
      color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
    },
    {
      title: 'Pesan & Konsultasi',
      count: inquiries.length,
      subtext: `${unreadInquiries.length} belum dibaca`,
      href: '/admin/pesan',
      icon: Mail,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Greeting */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Panel CMS {settings.company_name}
          </h1>
          <p className="text-xs text-muted-foreground">
            Kelola katalog produk, paket rakitan PC, layanan servis, dan konsultasi pelanggan secara langsung.
          </p>
        </div>

        {/* Database Status Indicator */}
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-xs shadow-sm">
          <Database className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Database:</span>
          {supabaseActive ? (
            <span className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Supabase Terhubung
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-semibold text-destructive">
              <span className="h-2 w-2 rounded-full bg-destructive" />
              Belum Terhubung
            </span>
          )}
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href} className="group">
              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md cursor-pointer">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {stat.title}
                    </span>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${stat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold text-foreground">
                      {stat.count}
                    </span>
                    {stat.subtext && (
                      <Badge variant="secondary" className="font-bold text-[10px]">
                        {stat.subtext}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-1 border-t border-border pt-3 text-[11px] font-semibold text-primary transition-colors group-hover:underline">
                    <span>Buka Pengelolaan</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions & Recent Messages */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Inquiries List */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border p-6 pb-4">
            <div>
              <CardTitle className="text-base font-bold">
                Pesan Masuk Terbaru
              </CardTitle>
              <CardDescription className="text-xs">
                Formulir kontak yang dikirim oleh pengunjung
              </CardDescription>
            </div>
            <Link
              href="/admin/pesan"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Lihat Semua ({inquiries.length})
            </Link>
          </CardHeader>

          <CardContent className="p-6 pt-2 divide-y divide-border">
            {inquiries.slice(0, 4).map((inq) => (
              <div key={inq.id} className="py-3.5 first:pt-2 last:pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">
                      {inq.name}
                    </span>
                    <span className="text-xs text-muted-foreground">({inq.email})</span>
                  </div>
                  <Badge variant={inq.status === 'unread' ? 'destructive' : 'secondary'} className="text-[10px]">
                    {inq.status === 'unread' ? 'Belum Dibaca' : 'Sudah Dibaca'}
                  </Badge>
                </div>
                <p className="mt-1 text-xs font-medium text-foreground">
                  {inq.subject}
                </p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                  {inq.message}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Shortcut Column */}
        <Card className="shadow-sm">
          <CardHeader className="p-6 pb-4 border-b border-border">
            <CardTitle className="text-base font-bold">
              Pintasan Cepat
            </CardTitle>
            <CardDescription className="text-xs">
              Aksi langsung untuk memperbarui website
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 pt-4 space-y-2.5">
            <Link
              href="/admin/pengaturan"
              className="flex items-center justify-between rounded-xl border border-border p-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <span>Edit Profil Perusahaan</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
            <Link
              href="/admin/layanan"
              className="flex items-center justify-between rounded-xl border border-border p-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <span>Tambah / Edit Layanan</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
            <Link
              href="/admin/katalog"
              className="flex items-center justify-between rounded-xl border border-border p-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <span>Unggah Proyek Baru</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center justify-between rounded-xl border border-border p-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <span>Tulis Artikel Blog</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
