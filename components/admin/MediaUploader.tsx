'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadMedia } from '@/lib/storage';

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
    } else {
      setError(res.error || 'Gagal mengunggah file.');
    }
    setUploading(false);
  }

  return (
    <div>
      <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
        {label}
      </label>

      {value ? (
        <div className="mt-2 relative inline-block">
          <div className="relative h-32 w-48 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
            <Image src={value} alt="Preview" fill className="object-cover" sizes="192px" />
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-white shadow hover:bg-rose-600"
            title="Hapus gambar"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div className="mt-2">
          <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-6 text-center cursor-pointer hover:bg-neutral-100 hover:border-indigo-400 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-750">
            {uploading ? (
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
                <span>Mengunggah gambar...</span>
              </div>
            ) : (
              <>
                <Upload className="h-6 w-6 text-neutral-400" />
                <span className="mt-2 text-xs font-medium text-neutral-600 dark:text-neutral-300">
                  Klik untuk upload atau drag file ke sini
                </span>
                <span className="mt-1 text-[11px] text-neutral-400">
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
      <div className="mt-2">
        <input
          type="text"
          placeholder="Atau masukkan URL gambar langsung..."
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
        />
      </div>

      {helperText && <p className="mt-1 text-[11px] text-neutral-400">{helperText}</p>}
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}
