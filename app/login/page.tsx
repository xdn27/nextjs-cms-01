'use client';

import React, { useState, Suspense, ViewTransition } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Sparkles, Lock, Mail, Loader2, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { adminLogin } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

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
    <Card className="border border-[#383838] bg-[#303030] shadow-2xl rounded-2xl">
      <CardContent className="p-8">
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#e01b24]/30 bg-[#e01b24]/15 p-4 text-xs text-[#ff7b63]">
            <AlertCircle className="h-4 w-4 shrink-0 text-[#e01b24]" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Demo Credentials Info */}
        <div className="mb-6 rounded-xl border border-[#3584e4]/30 bg-[#3584e4]/10 p-4 text-xs text-white">
          <div className="flex items-center gap-2 font-semibold text-[#78aeed]">
            <Info className="h-4 w-4 text-[#3584e4]" />
            <span>Akses Demo / Kredensial Uji Coba:</span>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-[#c0bfbc]">
            Email: <code className="rounded bg-[#242424] px-1.5 py-0.5 font-mono text-white border border-[#383838]">admin@example.com</code> | Kata Sandi: <code className="rounded bg-[#242424] px-1.5 py-0.5 font-mono text-white border border-[#383838]">admin123</code>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[#9a9996]">Email Administrator</Label>
            <div className="relative">
              <Mail className="absolute top-3 left-3.5 h-4 w-4 text-[#9a9996]" />
              <Input
                id="email"
                type="email"
                name="email"
                required
                defaultValue="admin@example.com"
                placeholder="admin@example.com"
                className="pl-10 bg-[#282828] border-[#383838] text-white focus-visible:ring-[#3584e4]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-[#9a9996]">Kata Sandi</Label>
            <div className="relative">
              <Lock className="absolute top-3 left-3.5 h-4 w-4 text-[#9a9996]" />
              <Input
                id="password"
                type="password"
                name="password"
                required
                defaultValue="admin123"
                placeholder="••••••••"
                className="pl-10 bg-[#282828] border-[#383838] text-white focus-visible:ring-[#3584e4]"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 text-sm font-semibold bg-[#3584e4] hover:bg-[#1c71d8] text-white shadow-md cursor-pointer"
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
          </Button>
        </form>

        <div className="mt-6 border-t border-[#383838] pt-5 text-center">
          <Link
            href="/"
            transitionTypes={['nav-back']}
            className="text-xs font-medium text-[#9a9996] hover:text-[#78aeed] transition-colors"
          >
            ← Kembali ke Halaman Publik
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="dark adwaita-dark flex min-h-screen flex-col justify-center bg-[#1e1e1e] text-white px-4 py-12 sm:px-6 lg:px-8 selection:bg-[#3584e4] selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" transitionTypes={['nav-back']} className="flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3584e4] text-white shadow-lg shadow-[#3584e4]/30">
            <Sparkles className="h-6 w-6" />
          </div>
        </Link>
        <h2 className="mt-6 text-center text-2xl font-extrabold tracking-tight text-white">
          Login ke Panel CMS
        </h2>
        <p className="mt-2 text-center text-sm text-[#9a9996]">
          Masuk untuk mengelola konten dan pengaturan Company Profile
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Suspense fallback={
          <ViewTransition exit="slide-down">
            <div className="flex justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin text-[#3584e4]" />
            </div>
          </ViewTransition>
        }>
          <ViewTransition enter="slide-up" default="none">
            <LoginForm />
          </ViewTransition>
        </Suspense>
      </div>
    </div>
  );
}
