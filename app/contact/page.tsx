import React from 'react';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { getCompanySettings } from '@/lib/data';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { ContactForm } from '@/components/public/ContactForm';

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description: 'Mulai konsultasi gratis untuk proyek pengembangan web, mobile, cloud, atau AI Anda.',
};


export default async function ContactPage() {
  const settings = await getCompanySettings();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />

      <main className="flex-1 pb-24">
        {/* Header */}
        <section className="bg-gradient-to-b from-neutral-50 via-white to-white py-16 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
              Mulai Kolaborasi
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
              Hubungi Konsultan Kami
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300">
              Diskusikan ide proyek dan tantangan teknologi Anda. Kami siap memberikan masukan arsitektur dan estimasi pelaksanaan.
            </p>
          </div>
        </section>

        {/* Content Grid */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
              {/* Left Contact Information */}
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl border border-neutral-200/90 bg-neutral-50/70 p-8 dark:border-neutral-800 dark:bg-neutral-900">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Kantor Operasional
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Kunjungi kantor kami untuk diskusi tatap muka atau hubungi melalui saluran komunikasi resmi berikut:
                  </p>

                  <div className="mt-6 space-y-5 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-neutral-800 dark:text-indigo-400">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="block text-neutral-900 dark:text-white">Alamat</strong>
                        <span className="text-neutral-600 dark:text-neutral-400">{settings.contact_address}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-neutral-800 dark:text-indigo-400">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="block text-neutral-900 dark:text-white">Telepon Kantor</strong>
                        <a href={`tel:${settings.contact_phone}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                          {settings.contact_phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-neutral-800 dark:text-indigo-400">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="block text-neutral-900 dark:text-white">WhatsApp Bisnis</strong>
                        <a
                          href={`https://wa.me/${settings.contact_whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          {settings.contact_whatsapp}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-neutral-800 dark:text-indigo-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="block text-neutral-900 dark:text-white">Email Resmi</strong>
                        <a href={`mailto:${settings.contact_email}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                          {settings.contact_email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-neutral-800 dark:text-indigo-400">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="block text-neutral-900 dark:text-white">Jam Kerja</strong>
                        <span className="text-neutral-600 dark:text-neutral-400">Senin - Jumat: 08:30 - 17:30 WIB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
