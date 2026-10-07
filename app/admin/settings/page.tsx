'use client';

import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { updateCompanySettingsAction } from '@/lib/actions';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { initialSettings } from '@/lib/mock-data';
import { CompanySettings } from '@/lib/types';

export default function AdminSettingsPage() {
  const [settings] = useState<CompanySettings>(initialSettings);
  const [logoUrl, setLogoUrl] = useState<string>(initialSettings.logo_url || '');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const formData = new FormData(e.currentTarget);
    formData.set('logo_url', logoUrl);

    try {
      const res = await updateCompanySettingsAction(formData);
      setFeedback(res);
    } catch {
      setFeedback({ success: false, message: 'Gagal memperbarui pengaturan.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Pengaturan Perusahaan & Situs
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Ubah informasi umum, kontak operasional, teks banner utama (hero), dan media sosial perusahaan.
        </p>
      </div>

      {feedback && (
        <div
          className={`flex items-start gap-3 rounded-xl p-4 text-xs ${
            feedback.success
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
              : 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
          }`}
        >
          {feedback.success ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identitas Umum */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white border-b border-neutral-100 pb-2 dark:border-neutral-800">
            Identitas Perusahaan
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                Nama Perusahaan
              </label>
              <input
                type="text"
                name="company_name"
                defaultValue={settings.company_name}
                required
                className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                Slogan / Tagline
              </label>
              <input
                type="text"
                name="tagline"
                defaultValue={settings.tagline}
                className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
              Deskripsi Singkat Profil
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={settings.description}
              className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>

          <MediaUploader
            label="Logo Perusahaan"
            value={logoUrl}
            onChange={(url) => setLogoUrl(url)}
            helperText="Unggah logo format PNG transparan atau SVG untuk hasil terbaik."
          />
        </div>

        {/* Banner Utama (Hero) */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white border-b border-neutral-100 pb-2 dark:border-neutral-800">
            Banner Beranda (Hero Section)
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
              Judul Utama (Headline)
            </label>
            <input
              type="text"
              name="hero_title"
              defaultValue={settings.hero_title}
              required
              className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
              Subjudul (Sub-headline)
            </label>
            <textarea
              name="hero_subtitle"
              rows={2}
              defaultValue={settings.hero_subtitle}
              className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                Teks Tombol CTA
              </label>
              <input
                type="text"
                name="hero_cta_text"
                defaultValue={settings.hero_cta_text}
                className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                Tautan Tombol CTA
              </label>
              <input
                type="text"
                name="hero_cta_link"
                defaultValue={settings.hero_cta_link}
                className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Informasi Kontak */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white border-b border-neutral-100 pb-2 dark:border-neutral-800">
            Kontak & Lokasi Kantor
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                Email Perusahaan
              </label>
              <input
                type="email"
                name="contact_email"
                defaultValue={settings.contact_email}
                required
                className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                Telepon Kantor
              </label>
              <input
                type="text"
                name="contact_phone"
                defaultValue={settings.contact_phone}
                className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                WhatsApp
              </label>
              <input
                type="text"
                name="contact_whatsapp"
                defaultValue={settings.contact_whatsapp}
                className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
              Alamat Lengkap Kantor
            </label>
            <textarea
              name="contact_address"
              rows={2}
              defaultValue={settings.contact_address}
              className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>
        </div>

        {/* Media Sosial */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white border-b border-neutral-100 pb-2 dark:border-neutral-800">
            Tautan Media Sosial
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="social_linkedin"
                defaultValue={settings.social_linkedin || ''}
                className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                Instagram URL
              </label>
              <input
                type="url"
                name="social_instagram"
                defaultValue={settings.social_instagram || ''}
                className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                X / Twitter URL
              </label>
              <input
                type="url"
                name="social_twitter"
                defaultValue={settings.social_twitter || ''}
                className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                Facebook URL
              </label>
              <input
                type="url"
                name="social_facebook"
                defaultValue={settings.social_facebook || ''}
                className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Menyimpan Pengaturan...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Simpan Seluruh Pengaturan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
