'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Sparkles, Lock, Mail, Loader2, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { adminLogin } from '@/lib/actions';

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set('redirect', redirect);

    try {
      const res = await adminLogin(formData);
      if (res && !res.success) {
        setError(res.error || 'Autentikasi gagal.');
        setLoading(false);
      }
    } catch {
      // Jika berhasil redirect, next navigation akan trigger
    }
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-xl shadow-neutral-200/50 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none">
      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Quick Demo Credentials Info */}
      <div className="mb-6 rounded-xl border border-indigo-100 bg-indigo-50/70 p-4 text-xs text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-200">
        <div className="flex items-center gap-2 font-semibold">
          <Info className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span>Akses Demo / Kredensial Uji Coba:</span>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed">
          Email: <code className="rounded bg-indigo-100 px-1 py-0.5 font-mono dark:bg-indigo-900">admin@example.com</code> | Kata Sandi: <code className="rounded bg-indigo-100 px-1 py-0.5 font-mono dark:bg-indigo-900">admin123</code>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
            Email Administrator
          </label>
          <div className="relative mt-1.5">
            <Mail className="absolute top-3.5 left-3.5 h-4 w-4 text-neutral-400" />
            <input
              type="email"
              name="email"
              required
              defaultValue="admin@example.com"
              placeholder="admin@example.com"
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50 py-3 pr-4 pl-10 text-sm text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
            Kata Sandi
          </label>
          <div className="relative mt-1.5">
            <Lock className="absolute top-3.5 left-3.5 h-4 w-4 text-neutral-400" />
            <input
              type="password"
              name="password"
              required
              defaultValue="admin123"
              placeholder="••••••••"
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50 py-3 pr-4 pl-10 text-sm text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Memverifikasi...</span>
            </>
          ) : (
            <>
              <span>Masuk ke Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 border-t border-neutral-100 pt-5 text-center dark:border-neutral-800">
        <Link
          href="/"
          className="text-xs font-medium text-neutral-500 hover:text-indigo-600 dark:text-neutral-400"
        >
          ← Kembali ke Halaman Publik
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-neutral-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-neutral-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
            <Sparkles className="h-6 w-6" />
          </div>
        </Link>
        <h2 className="mt-6 text-center text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Login ke Panel CMS
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Masuk untuk mengelola konten dan pengaturan Company Profile
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Suspense fallback={
          <div className="flex justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
