'use client';

import React, { useState, Suspense } from 'react';
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
    <Card className="shadow-xl">
      <CardContent className="p-8">
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-xs text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Demo Credentials Info */}
        <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-foreground">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <Info className="h-4 w-4" />
            <span>Akses Demo / Kredensial Uji Coba:</span>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Email: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">admin@example.com</code> | Kata Sandi: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">admin123</code>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email Administrator</Label>
            <div className="relative">
              <Mail className="absolute top-3 left-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                name="email"
                required
                defaultValue="admin@example.com"
                placeholder="admin@example.com"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Kata Sandi</Label>
            <div className="relative">
              <Lock className="absolute top-3 left-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                name="password"
                required
                defaultValue="admin123"
                placeholder="••••••••"
                className="pl-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 text-sm font-semibold shadow-md"
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

        <div className="mt-6 border-t border-border pt-5 text-center">
          <Link
            href="/"
            className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
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
    <div className="flex min-h-screen flex-col justify-center bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Sparkles className="h-6 w-6" />
          </div>
        </Link>
        <h2 className="mt-6 text-center text-2xl font-extrabold tracking-tight text-foreground">
          Login ke Panel CMS
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Masuk untuk mengelola konten dan pengaturan Company Profile
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Suspense fallback={
          <div className="flex justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
