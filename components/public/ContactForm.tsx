'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactInquiry } from '@/lib/actions';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    try {
      const res = await submitContactInquiry(formData);
      setResponse(res);
      if (res.success) {
        form.reset();
      }
    } catch {
      setResponse({ success: false, error: 'Terjadi kesalahan sistem saat mengirim pesan.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
        Kirimkan Pesan atau Rencana Proyek
      </h3>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Isi formulir di bawah ini. Tim konsultan kami akan menghubungi Anda dalam waktu 1x24 jam kerja.
      </p>

      {response && (
        <div
          className={`mt-6 flex items-start gap-3 rounded-xl p-4 text-sm ${
            response.success
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
              : 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
          }`}
        >
          {response.success ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
          )}
          <p>{response.message || response.error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase">
            Nama Lengkap <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Contoh: Pratama Wijaya"
            className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white dark:focus:border-indigo-400"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase">
              Email Bisnis <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="pratama@perusahaan.com"
              className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white dark:focus:border-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase">
              No. Telepon / WhatsApp
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+62 812 3456 7890"
              className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white dark:focus:border-indigo-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase">
            Topik Kebutuhan
          </label>
          <select
            id="subject"
            name="subject"
            className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white dark:focus:border-indigo-400"
          >
            <option value="Pengembangan Web & SaaS">Pengembangan Web & SaaS Enterprise</option>
            <option value="Aplikasi Mobile iOS & Android">Aplikasi Mobile iOS & Android</option>
            <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
            <option value="AI & Solusi Kecerdasan Buatan">AI & Solusi Kecerdasan Buatan</option>
            <option value="Desain UI/UX Produk">Desain UI/UX Produk</option>
            <option value="Konsultasi Umum Lainnya">Konsultasi Umum Lainnya</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase">
            Deskripsi Kebutuhan / Pesan <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Jelaskan gambaran proyek, target waktu, atau kebutuhan sistem yang ingin Anda diskusikan..."
            className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white dark:focus:border-indigo-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Mengirim Pesan...</span>
            </>
          ) : (
            <>
              <span>Kirimkan Pesan</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
