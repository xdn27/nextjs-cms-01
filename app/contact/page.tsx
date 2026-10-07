import React from 'react';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, MessageSquare, MessageCircle, Store } from 'lucide-react';
import { getCompanySettings } from '@/lib/data';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { ContactForm } from '@/components/public/ContactForm';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Kontak & Lokasi Toko Komputer',
  description:
    'Alamat toko fisik, nomor WhatsApp konsultasi rakit PC, cek status servis, dan jam buka CyberTech Computer.',
};

export default async function ContactPage() {
  const settings = await getCompanySettings();
  const waNumber = settings.contact_whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />

      <main className="flex-1 pb-24">
        {/* Header */}
        <section className="bg-gradient-to-b from-muted/50 via-background to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#3584e4]/10 border border-[#3584e4]/20 px-3.5 py-1 text-xs font-semibold text-[#3584e4]">
              <Store className="h-3.5 w-3.5" />
              <span>Toko Fisik &amp; Pusat Servis</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Hubungi &amp; Kunjungi Toko Kami
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-base text-muted-foreground sm:text-lg">
              Konsultasi racikan PC gaming impian, tanyakan ketersediaan stok komponen, atau cek status servis laptop Anda bersama tim teknisi kami.
            </p>
          </div>
        </section>

        {/* Content Grid */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
              {/* Left Contact Information */}
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-foreground">
                    Toko Fisik &amp; Service Center
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Silakan datang langsung untuk cek unit, konsultasi spesifikasi di tempat, atau hubungi kami lewat saluran berikut:
                  </p>

                  <div className="mt-6 space-y-5 text-xs">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#3584e4]/10 text-[#3584e4]">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="block text-foreground">Alamat Toko</strong>
                        <span className="text-muted-foreground leading-relaxed block mt-0.5">
                          {settings.contact_address}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2ec27e]/15 text-[#2ec27e]">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="block text-foreground">WhatsApp Konsultasi</strong>
                        <a
                          href={`https://wa.me/${waNumber}?text=Halo%20CyberTech,%20saya%20mau%20konsultasi`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#2ec27e] font-semibold hover:underline block mt-0.5"
                        >
                          {settings.contact_whatsapp}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#3584e4]/10 text-[#3584e4]">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="block text-foreground">Telepon Toko</strong>
                        <a href={`tel:${settings.contact_phone}`} className="text-[#3584e4] hover:underline block mt-0.5">
                          {settings.contact_phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#3584e4]/10 text-[#3584e4]">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="block text-foreground">Email Penjualan &amp; Garansi</strong>
                        <a href={`mailto:${settings.contact_email}`} className="text-[#3584e4] hover:underline block mt-0.5">
                          {settings.contact_email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="block text-foreground">Jam Operasional Toko</strong>
                        <span className="text-muted-foreground block mt-0.5">Senin - Sabtu: 09:00 - 20:00 WIB</span>
                        <span className="text-muted-foreground block">Minggu: 10:00 - 18:00 WIB</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <Button
                      asChild
                      className="w-full bg-[#2ec27e] hover:bg-[#26a269] text-white text-xs font-bold h-11 shadow-sm cursor-pointer"
                    >
                      <a
                        href={`https://wa.me/${waNumber}?text=Halo%20CyberTech,%20saya%20mau%20konsultasi%20rakit%20PC%20atau%20tanya%20servis`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        <span>Chat WhatsApp Cepat (Respon Cepat)</span>
                      </a>
                    </Button>
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
