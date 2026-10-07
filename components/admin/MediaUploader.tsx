'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadMedia } from '@/lib/storage';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';

interface MediaUploaderProps {
  label: string;
  value?: string | null;
  onChange: (url: string) => void;
  helperText?: string;
}

export function MediaUploader({ label, value, onChange, helperText }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const res = await uploadMedia(file);
    if (res.success && res.url) {
      onChange(res.url);
      toast.success('Media berhasil diunggah');
    } else {
      const errMsg = res.error || 'Gagal mengunggah file.';
      setError(errMsg);
      toast.error(errMsg);
    }
    setUploading(false);
  }

  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>

      {value ? (
        <div className="relative inline-block mt-1">
          <div className="relative h-32 w-48 overflow-hidden rounded-xl border border-border shadow-sm">
            <Image src={value} alt="Preview" fill className="object-cover" sizes="192px" />
          </div>
          <button
            type="button"
            onClick={() => {
              onChange('');
              toast.info('Gambar dihapus');
            }}
            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 transition-transform active:scale-90"
            title="Hapus gambar"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div className="mt-1">
          <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-input bg-muted/30 px-4 py-6 text-center cursor-pointer hover:bg-muted/60 hover:border-primary/50 transition-colors">
            {uploading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span>Mengunggah gambar...</span>
              </div>
            ) : (
              <>
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="mt-2 text-xs font-medium text-foreground">
                  Klik untuk upload atau drag file ke sini
                </span>
                <span className="mt-1 text-[11px] text-muted-foreground">
                  PNG, JPG, WebP (Maks. 5MB)
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        </div>
      )}

      {/* Direct URL input fallback */}
      <div className="pt-1">
        <Input
          type="text"
          placeholder="Atau masukkan URL gambar langsung..."
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 text-xs"
        />
      </div>

      {helperText && <p className="text-[11px] text-muted-foreground">{helperText}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
