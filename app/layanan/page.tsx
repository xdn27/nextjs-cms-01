import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, MessageCircle, Wrench, ShieldCheck } from 'lucide-react';
import { getCompanySettings, getServices } from '@/lib/data';
import { waLink } from '@/lib/utils';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { DynamicIcon } from '@/components/public/DynamicIcon';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Layanan Servis & Rakit PC Komputer',
  description:
    'Layanan profesional perakitan PC gaming & workstation, servis laptop mati total, deep cleaning thermal paste, upgrade SSD & RAM, serta maintenance kantor.',
};

export default async function ServicesPage() {
  const [settings, services] = await Promise.all([
    getCompanySettings(),
    getServices(),
  ]);

  const workflowSteps = [
    {
      step: '01',
      title: 'Konsultasi & Diagnosis Gratis',
      desc: 'Bicarakan budget rakitan atau keluhan kerusakan laptop/PC Anda secara terbuka tanpa biaya.',
    },
    {
      step: '02',
      title: 'Estimasi Biaya Transparan',
      desc: 'Kami memberikan rincian harga part & biaya jasa yang jelas sebelum pengerjaan dimulai.',
    },
    {
      step: '03',
      title: 'Perakitan & Perbaikan Presisi',
      desc: 'Pengerjaan teliti dengan standar antistatik, cable management estetis, dan pasta termal premium.',
    },
    {
      step: '04',
      title: 'Stress Test & Quality Control',
      desc: 'Uji beban FurMark, Cinebench, dan suhu operasional minimal 24 jam untuk jaminan kestabilan.',
    },
    {
      step: '05',
      title: 'Garansi & Serah Terima Unit',
      desc: 'Unit siap diserahkan atau dikirim dengan packing kayu aman disertai nota garansi resmi toko.',
    },
  ];

  return (
      <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-b from-muted/50 via-background to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#3584e4]/10 border border-[#3584e4]/20 px-3.5 py-1 text-xs font-semibold text-[#3584e4]">
              <Wrench className="h-3.5 w-3.5" />
              <span>Teknisi Berpengalaman &amp; Bergaransi</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Layanan Servis &amp; Rakit PC Profesional
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-base text-muted-foreground sm:text-lg">
              Solusi komprehensif mulai dari perakitan custom PC gaming impian bebas bottleneck hingga perbaikan motherboard laptop dengan komponen original.
            </p>
          </div>
        </section>

        {/* Detailed Services List */}
        <section className="py-12 pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {services.map((service, index) => {
                const waUrl = waLink(
                  settings.contact_whatsapp,
                  `Halo CyberTech, saya ingin konsultasi mengenai layanan: ${service.title}`
                );

                return (
                  <div
                    key={service.id}
                    id={service.slug}
                    className={`scroll-mt-28 flex flex-col gap-8 rounded-3xl border border-border bg-card p-8 shadow-sm transition-all lg:flex-row lg:items-center lg:justify-between ${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="max-w-xl">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3584e4]/10 text-[#3584e4] border border-[#3584e4]/20">
                        <DynamicIcon name={service.icon} className="h-7 w-7" />
                      </div>

                      <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {service.title}
                      </h2>

                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {service.description || service.summary}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Button
                          asChild
                          className="bg-[#2ec27e] hover:bg-[#26a269] text-white text-xs font-semibold h-10 px-5 shadow-sm cursor-pointer"
                        >
                          <a href={waUrl} target="_blank" rel="noreferrer">
                            <MessageCircle className="h-4 w-4 mr-1.5" />
                            <span>Konsultasi via WA</span>
                          </a>
                        </Button>
                        <Button asChild variant="outline" className="text-xs h-10 px-4 cursor-pointer">
                          <Link transitionTypes={['nav-lateral']} href={`/kontak?service=${encodeURIComponent(service.title)}`}>
                            <span>Kirim Formulir</span>
                            <ArrowRight className="h-3.5 w-3.5 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="w-full lg:max-w-md rounded-2xl border border-border bg-muted/40 p-6">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-[#3584e4]" />
                        <span>Cakupan &amp; Keunggulan Layanan</span>
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {service.features &&
                          service.features.map((feat, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-xs text-foreground"
                            >
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2ec27e]" />
                              <span>{feat}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Workflow Process */}
        <section className="border-t border-border bg-muted/20 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-semibold tracking-wider text-[#3584e4] uppercase">
                Alur Pengerjaan
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Standar Operasional Servis &amp; Rakit PC
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Proses terstruktur demi menjaga transparansi, keamanan data Anda, dan ketepatan diagnosa perangkat.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {workflowSteps.map((w) => (
                <div
                  key={w.step}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl font-black text-[#3584e4]">
                      {w.step}
                    </span>
                    <h3 className="mt-3 text-sm font-bold text-foreground">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {w.desc}
                    </p>
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
