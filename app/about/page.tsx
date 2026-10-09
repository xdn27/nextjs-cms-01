import React from 'react';
import type { Metadata } from 'next';
import { Target, Award, CheckCircle2, Cpu } from 'lucide-react';
import { getCompanySettings } from '@/lib/data';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';

export const metadata: Metadata = {
  title: 'Tentang CyberTech Toko Komputer & Servis',
  description:
    'Profil toko, filosofi perakitan PC gaming bebas bottleneck, komitmen garansi resmi distributor, dan tim teknisi berpengalaman.',
};

export default async function AboutPage() {
  const settings = await getCompanySettings();

  return (
      <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Header Banner */}
        <section className="bg-gradient-to-b from-muted/50 via-background to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#3584e4]/10 border border-[#3584e4]/20 px-3.5 py-1 text-xs font-semibold text-[#3584e4]">
              <Cpu className="h-3.5 w-3.5" />
              <span>Profil Toko &amp; Teknisi Spesialis</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Tentang CyberTech Computer &amp; Gaming
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-base text-muted-foreground sm:text-lg">
              Berkomitmen menghadirkan racikan PC impian yang seimbang, suku cadang 100% original bergaransi resmi, serta layanan servis hardware yang jujur dan transparan.
            </p>
          </div>
        </section>

        {/* Story & Vision Mission */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-xs font-semibold text-[#3584e4] uppercase tracking-wider">
                  Dedikasi Hardware
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                  Perakitan Teliti &amp; Diagnosa Servis Bergaransi
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {settings.company_name} berawal dari kecintaan mendalam terhadap dunia PC gaming dan performa komputasi. Kami memahami frustrasi pengguna saat menghadapi komputer yang lemot, suhu mendidih, atau salah memilih komponen hingga terjadi bottleneck.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Oleh karena itu, setiap PC yang keluar dari workshop kami dirakit dengan standar tertinggi: cable management rapi, sirkulasi udara optimal, pasta termal kelas atas, dan telah lolos uji stabilitas 24 jam non-stop.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6">
                  <div>
                    <h4 className="text-3xl font-black text-[#3584e4]">2.500+</h4>
                    <p className="mt-1 text-xs text-muted-foreground">Unit PC Selesai Dirakit</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-[#2ec27e]">100%</h4>
                    <p className="mt-1 text-xs text-muted-foreground">Garansi Resmi Distributor</p>
                  </div>
                </div>
              </div>

              {/* Vision & Mission Cards */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3584e4] text-white">
                      <Target className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Visi Kami</h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Menjadi pusat solusi komputer terlengkap dan paling terpercaya di Indonesia dengan mengedepankan integritas kejujuran teknis, kerapian pengerjaan, dan kepuasan pelanggan nomor satu.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2ec27e] text-white">
                      <Award className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Misi Kami</h3>
                  </div>
                  <ul className="mt-3 space-y-2.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2ec27e]" />
                      <span>Memberikan konsultasi racikan PC seimbang bebas bottleneck tanpa memaksakan anggaran pelanggan.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2ec27e]" />
                      <span>Menjamin penggunaan suku cadang baru dengan segel resmi distributor nasional.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2ec27e]" />
                      <span>Menyediakan jasa servis laptop dan PC dengan diagnosa awal transparan dan garansi nyata.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer settings={settings} />
    </div>
  );
}
