'use client';

import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { updateCompanySettingsAction } from '@/lib/actions';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { initialSettings } from '@/lib/mock-data';
import { CompanySettings } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';

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
      if (res.success) {
        toast.success(res.message || 'Pengaturan berhasil disimpan');
      } else {
        toast.error(res.message || 'Gagal memperbarui pengaturan.');
      }
    } catch {
      const err = { success: false, message: 'Gagal memperbarui pengaturan.' };
      setFeedback(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Pengaturan Perusahaan & Situs
        </h1>
        <p className="text-xs text-muted-foreground">
          Ubah informasi umum, logo, kontak operasional, dan media sosial perusahaan.
        </p>
      </div>

      {feedback && (
        <div
          className={`flex items-start gap-3 rounded-xl p-4 text-xs border ${
            feedback.success
              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
              : 'bg-destructive/10 text-destructive border-destructive/20'
          }`}
        >
          {feedback.success ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identitas Umum */}
        <Card className="shadow-sm">
          <CardHeader className="p-6 pb-4 border-b border-border">
            <CardTitle className="text-sm font-bold uppercase tracking-wider">
              Identitas Perusahaan
            </CardTitle>
            <CardDescription className="text-xs">
              Nama dan deskripsi umum bisnis
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="company_name">Nama Perusahaan</Label>
                <Input
                  id="company_name"
                  type="text"
                  name="company_name"
                  defaultValue={settings.company_name}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Deskripsi Singkat Profil</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={settings.description}
              />
            </div>

            <MediaUploader
              label="Logo Perusahaan"
              value={logoUrl}
              onChange={(url) => setLogoUrl(url)}
              helperText="Unggah logo format PNG transparan atau SVG untuk hasil terbaik."
            />
          </CardContent>
        </Card>

        {/* Informasi Kontak */}
        <Card className="shadow-sm">
          <CardHeader className="p-6 pb-4 border-b border-border">
            <CardTitle className="text-sm font-bold uppercase tracking-wider">
              Kontak & Lokasi Kantor
            </CardTitle>
            <CardDescription className="text-xs">
              Kanal komunikasi resmi dan alamat operasional
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="contact_email">Email Perusahaan</Label>
                <Input
                  id="contact_email"
                  type="email"
                  name="contact_email"
                  defaultValue={settings.contact_email}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact_phone">Telepon Kantor</Label>
                <Input
                  id="contact_phone"
                  type="text"
                  name="contact_phone"
                  defaultValue={settings.contact_phone}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact_whatsapp">WhatsApp</Label>
                <Input
                  id="contact_whatsapp"
                  type="text"
                  name="contact_whatsapp"
                  defaultValue={settings.contact_whatsapp}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact_address">Alamat Lengkap Kantor</Label>
              <Textarea
                id="contact_address"
                name="contact_address"
                rows={2}
                defaultValue={settings.contact_address}
              />
            </div>
          </CardContent>
        </Card>

        {/* Media Sosial */}
        <Card className="shadow-sm">
          <CardHeader className="p-6 pb-4 border-b border-border">
            <CardTitle className="text-sm font-bold uppercase tracking-wider">
              Tautan Media Sosial
            </CardTitle>
            <CardDescription className="text-xs">
              Tautan ke profil akun resmi di media sosial
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="social_instagram">Instagram URL</Label>
                <Input
                  id="social_instagram"
                  type="url"
                  name="social_instagram"
                  defaultValue={settings.social_instagram || ''}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="social_facebook">Facebook URL</Label>
                <Input
                  id="social_facebook"
                  type="url"
                  name="social_facebook"
                  defaultValue={settings.social_facebook || ''}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="h-11 px-6 shadow-md"
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
          </Button>
        </div>
      </form>
    </div>
  );
}
