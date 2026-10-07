import React from 'react';
import type { Metadata } from 'next';
import { Target, Award, CheckCircle2 } from 'lucide-react';
import { getCompanySettings, getTeamMembers } from '@/lib/data';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { TeamSection } from '@/components/public/TeamSection';

export const metadata: Metadata = {
  title: 'Tentang Perusahaan',
  description: 'Mengenal profil, visi & misi, nilai inti, dan tim kepemimpinan di balik Nusantara Tech Innovasi.',
};


export default async function AboutPage() {
  const [settings, team] = await Promise.all([
    getCompanySettings(),
    getTeamMembers(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Header Banner */}
        <section className="bg-gradient-to-b from-neutral-50 via-white to-white py-16 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
              Profil Perusahaan
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
              Membangun Solusi Digital Masa Depan
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300">
              Kami adalah rumah rekayasa teknologi yang berfokus menciptakan produk digital berkinerja tinggi, aman, dan berdampak nyata bagi pertumbuhan klien kami.
            </p>
          </div>
        </section>

        {/* Story & Vision Mission */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-xs font-semibold text-indigo-600 uppercase dark:text-indigo-400">
                  Perjalanan Kami
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  Dari Ide Menjadi Standar Baru Industri
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {settings.company_name} didirikan dengan tekad menjembatani kesenjangan antara strategi bisnis dan keunggulan eksekusi teknis. Kami percaya bahwa software yang hebat bukan sekadar kode yang berfungsi, melainkan produk yang dirancang dengan presisi estetika, performa tanpa cela, dan keamanan data berlapis.
                </p>
                <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Sepanjang perjalanan, kami telah dipercaya oleh berbagai industri mulai dari perbankan, logistik multinasional, telemedisin kesehatan, hingga startup skala internasional.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-6 border-t border-neutral-100 pt-6 dark:border-neutral-800">
                  <div>
                    <h4 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">50+</h4>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Proyek Enterprise Selesai</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">99.9%</h4>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">SLA Ketersediaan Sistem</p>
                  </div>
                </div>
              </div>

              {/* Vision & Mission Cards */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-neutral-200/90 bg-neutral-50/70 p-8 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                      <Target className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Visi Kami</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    Menjadi mitra rekayasa perangkat lunak dan arsitektur cloud terdepan di Asia Tenggara yang mendefinisikan standar keunggulan, kecepatan, dan integritas digital.
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200/90 bg-neutral-50/70 p-8 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
                      <Award className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Misi Kami</h3>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                      <span>Menghadirkan sistem digital dengan standar rekayasa kelas dunia dan performa latensi ultra-rendah.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                      <span>Mengutamakan keamanan data dan keandalan sistem tanpa kompromi.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                      <span>Memberikan dampak bisnis terukur bagi setiap mitra yang bekerja sama dengan kami.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <TeamSection team={team} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
