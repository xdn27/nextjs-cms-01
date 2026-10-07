'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactInquiry } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

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
        toast.success(res.message || 'Pesan Anda berhasil terkirim!');
      } else {
        toast.error(res.error || 'Gagal mengirim pesan.');
      }
    } catch {
      const err = { success: false, error: 'Terjadi kesalahan sistem saat mengirim pesan.' };
      setResponse(err);
      toast.error(err.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="shadow-sm border-border bg-card">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-xl font-bold">
          Kirimkan Pesan atau Rencana Proyek
        </CardTitle>
        <CardDescription className="text-sm">
          Isi formulir di bawah ini. Tim konsultan kami akan menghubungi Anda dalam waktu 1x24 jam kerja.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8 pt-2">
        {response && (
          <div
            className={`mb-6 flex items-start gap-3 rounded-xl p-4 text-sm border ${
              response.success
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
                : 'bg-destructive/10 text-destructive border-destructive/20'
            }`}
          >
            {response.success ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
            )}
            <p>{response.message || response.error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">
              Nama Lengkap <span className="text-destructive">*</span>
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Contoh: Pratama Wijaya"
              className="h-11"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="email">
                Email Bisnis <span className="text-destructive">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                placeholder="pratama@perusahaan.com"
                className="h-11"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone">
                No. Telepon / WhatsApp
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+62 812 3456 7890"
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subject">Topik Kebutuhan</Label>
            <div className="relative">
              <select
                id="subject"
                name="subject"
                defaultValue="Pengembangan Web & SaaS"
                className="flex h-11 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                <option value="Pengembangan Web & SaaS">Pengembangan Web & SaaS Enterprise</option>
                <option value="Aplikasi Mobile iOS & Android">Aplikasi Mobile iOS & Android</option>
                <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
                <option value="AI & Solusi Kecerdasan Buatan">AI & Solusi Kecerdasan Buatan</option>
                <option value="Desain UI/UX Produk">Desain UI/UX Produk</option>
                <option value="Konsultasi Umum Lainnya">Konsultasi Umum Lainnya</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">
              Deskripsi Kebutuhan / Pesan <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Jelaskan gambaran proyek, target waktu, atau kebutuhan sistem yang ingin Anda diskusikan..."
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-sm font-semibold shadow-md mt-2"
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
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
