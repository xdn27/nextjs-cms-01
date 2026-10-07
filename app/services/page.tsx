import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { getCompanySettings, getServices } from '@/lib/data';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { DynamicIcon } from '@/components/public/DynamicIcon';

export const metadata: Metadata = {
  title: 'Layanan & Solusi',
  description: 'Eksplorasi rangkaian layanan rekayasa perangkat lunak, cloud architecture, aplikasi mobile, dan AI terapan.',
};


export default async function ServicesPage() {
  const [settings, services] = await Promise.all([
    getCompanySettings(),
    getServices(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-b from-neutral-50 via-white to-white py-16 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
              Kapabilitas Teknis
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
              Solusi Digital Komprehensif
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300">
              Kami memadukan pendekatan rekayasa modern dan strategi bisnis terukur untuk menghadirkan sistem perangkat lunak yang unggul.
            </p>
          </div>
        </section>

        {/* Detailed Services List */}
        <section className="py-12 pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  id={service.slug}
                  className={`scroll-mt-28 flex flex-col gap-8 rounded-3xl border border-neutral-200/90 bg-white p-8 shadow-sm transition-all lg:flex-row lg:items-center lg:justify-between dark:border-neutral-800 dark:bg-neutral-900 ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="max-w-xl">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-neutral-800 dark:text-indigo-400">
                      <DynamicIcon name={service.icon} className="h-7 w-7" />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
                      {service.title}
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                      {service.description || service.summary}
                    </p>

                    <div className="mt-6">
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                      >
                        <span>Konsultasikan Kebutuhan Ini</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="w-full lg:max-w-md rounded-2xl border border-neutral-100 bg-neutral-50/80 p-6 dark:border-neutral-800/80 dark:bg-neutral-950/50">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                      Cakupan & Fitur Utama
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {service.features && service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
